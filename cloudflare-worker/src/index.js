// Cloudflare Worker — cross-device sync for Bo's Italian study app.
//
// Endpoints:
//   GET  /known?pass=<passphrase>    → { known: [ ... ] }
//   PUT  /known?pass=<passphrase>    body: { known: [ ... ] } → { ok: true, count: N }
//
// The passphrase IS the authentication AND the KV key namespace. Anyone who
// knows it can read/write the list. Use a 16+ char random passphrase.

const ALLOWED_ORIGINS = [
  'https://bodepaoli.github.io',
  'http://127.0.0.1:8091',
  'http://localhost:8091',
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : 'https://bodepaoli.github.io';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);

    if (url.pathname === '/') {
      return new Response('italiano-sync — see /known', { headers: cors });
    }

    const pass = url.searchParams.get('pass') || '';
    if (pass.length < 12) {
      return json({ error: 'passphrase must be at least 12 characters' }, 400, cors);
    }

    // /known — Set<string> of Italian words the user has marked known
    if (url.pathname === '/known') {
      const key = `known:${pass}`;
      if (request.method === 'GET') {
        const stored = await env.KNOWN.get(key, { type: 'json' });
        return json({ known: Array.isArray(stored) ? stored : [] }, 200, cors);
      }
      if (request.method === 'PUT') {
        let body;
        try { body = await request.json(); }
        catch { return json({ error: 'invalid JSON body' }, 400, cors); }
        if (!body || !Array.isArray(body.known)) {
          return json({ error: 'expected { known: [...] }' }, 400, cors);
        }
        const cleaned = body.known.filter(x => typeof x === 'string').slice(0, 10000);
        await env.KNOWN.put(key, JSON.stringify(cleaned));
        return json({ ok: true, count: cleaned.length }, 200, cors);
      }
      return json({ error: 'method not allowed' }, 405, cors);
    }

    // /ai — smart translation via Llama 3.1 70B. Results cached in KV 30 days.
    if (url.pathname === '/ai') {
      if (request.method !== 'POST') {
        return json({ error: 'use POST' }, 405, cors);
      }
      let body;
      try { body = await request.json(); }
      catch { return json({ error: 'invalid JSON body' }, 400, cors); }

      const q = (body.q || '').toString().trim().slice(0, 500);
      if (q.length < 2) return json({ error: 'query too short' }, 400, cors);

      const cacheKey = `ai:${q.toLowerCase()}`;
      const cached = await env.KNOWN.get(cacheKey, { type: 'json' });
      if (cached && cached.translation) {
        return json({ translation: cached.translation, note: cached.note || '', cached: true }, 200, cors);
      }

      const sys = [
        "You are an expert Italian language tutor helping a beginner.",
        "Given an English or Italian phrase, produce an idiomatic translation in the OTHER language (never word-for-word).",
        "Rules:",
        "- English input → translate to Italian. Italian input → translate to English.",
        "- Preserve register (formal Lei vs. informal tu; polite vs. casual).",
        "- Use natural phrasing a native speaker would actually say.",
        "- If the input is ambiguous between English and Italian, prefer English input.",
        "Respond in this EXACT format, on two lines:",
        "TRANSLATION: <the translation, no quotes, no labels>",
        "NOTE: <one short sentence explaining a grammar/idiom/register nuance, or empty if none>"
      ].join('\n');

      try {
        const ai = await env.AI.run('@cf/meta/llama-3.1-70b-instruct', {
          messages: [
            { role: 'system', content: sys },
            { role: 'user', content: q },
          ],
          max_tokens: 220,
          temperature: 0.2,
        });

        const raw = (ai.response || ai.result || '').toString().trim();
        const tMatch = raw.match(/TRANSLATION:\s*(.+?)(?:\n|$)/i);
        const nMatch = raw.match(/NOTE:\s*(.+?)(?:\n|$)/i);
        let translation = (tMatch ? tMatch[1] : raw.split('\n')[0]).trim();
        translation = translation.replace(/^["'“”]+|["'“”]+$/g, '').trim();
        const note = nMatch ? nMatch[1].trim().replace(/^(none|n\/a|empty)\.?$/i, '') : '';

        if (!translation) return json({ error: 'empty AI response' }, 502, cors);

        await env.KNOWN.put(cacheKey, JSON.stringify({ translation, note, at: Date.now() }), {
          expirationTtl: 60 * 60 * 24 * 30,
        });
        return json({ translation, note, cached: false }, 200, cors);
      } catch (e) {
        return json({ error: 'AI call failed: ' + (e.message || 'unknown') }, 500, cors);
      }
    }

    // /custom — user-added vocab entries (objects). Synced across devices.
    if (url.pathname === '/custom') {
      const key = `custom:${pass}`;
      if (request.method === 'GET') {
        const stored = await env.KNOWN.get(key, { type: 'json' });
        return json({ custom: Array.isArray(stored) ? stored : [] }, 200, cors);
      }
      if (request.method === 'PUT') {
        let body;
        try { body = await request.json(); }
        catch { return json({ error: 'invalid JSON body' }, 400, cors); }
        if (!body || !Array.isArray(body.custom)) {
          return json({ error: 'expected { custom: [...] }' }, 400, cors);
        }
        // Validate shape of each entry
        const cleaned = body.custom
          .filter(e => e && typeof e.it === 'string' && typeof e.en === 'string')
          .map(e => ({
            id: typeof e.id === 'string' ? e.id.slice(0, 64) : String(Date.now()),
            it: e.it.slice(0, 500),
            en: e.en.slice(0, 500),
            type: typeof e.type === 'string' ? e.type.slice(0, 20) : 't-phrase',
            cat: typeof e.cat === 'string' ? e.cat.slice(0, 40) : 'Phrases',
            note: typeof e.note === 'string' ? e.note.slice(0, 1000) : '',
            ex: typeof e.ex === 'string' ? e.ex.slice(0, 500) : '',
            createdAt: typeof e.createdAt === 'number' ? e.createdAt : Date.now(),
          }))
          .slice(0, 5000);
        await env.KNOWN.put(key, JSON.stringify(cleaned));
        return json({ ok: true, count: cleaned.length }, 200, cors);
      }
      return json({ error: 'method not allowed' }, 405, cors);
    }

    // /tts — ElevenLabs text-to-speech for Italian. Audio bytes cached in KV 90 days.
    // Required Worker secrets/vars:
    //   ELEVENLABS_API_KEY  (secret)  → set with: wrangler secret put ELEVENLABS_API_KEY
    //   ELEVENLABS_VOICE_ID (var or secret) → ID of an ElevenLabs Italian voice
    //   ELEVENLABS_MODEL_ID (var, optional) → defaults to eleven_multilingual_v2
    if (url.pathname === '/tts') {
      if (request.method !== 'GET') return json({ error: 'use GET' }, 405, cors);
      const text = (url.searchParams.get('text') || '').trim().slice(0, 300);
      if (text.length < 1) return json({ error: 'text required' }, 400, cors);
      if (!env.ELEVENLABS_API_KEY) {
        return json({ error: 'TTS not configured: missing ELEVENLABS_API_KEY' }, 503, cors);
      }
      const voiceId = env.ELEVENLABS_VOICE_ID;
      if (!voiceId) {
        return json({ error: 'TTS not configured: missing ELEVENLABS_VOICE_ID' }, 503, cors);
      }
      const modelId = env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

      const cacheKey = `tts:${voiceId}:${modelId}:${text}`;
      // KV cache hit → return immediately
      const cached = await env.KNOWN.get(cacheKey, { type: 'arrayBuffer' });
      if (cached) {
        return new Response(cached, {
          headers: {
            ...cors,
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=2592000',
            'X-TTS-Cache': 'hit',
          },
        });
      }

      // Cache miss → call ElevenLabs
      try {
        const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': env.ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          body: JSON.stringify({
            text,
            model_id: modelId,
            voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
          }),
        });
        if (!resp.ok) {
          const errText = await resp.text();
          return json({ error: `ElevenLabs ${resp.status}: ${errText.slice(0, 240)}` }, 502, cors);
        }
        const audio = await resp.arrayBuffer();
        // Store in KV for 90 days. ArrayBuffer is supported directly.
        await env.KNOWN.put(cacheKey, audio, { expirationTtl: 60 * 60 * 24 * 90 });
        return new Response(audio, {
          headers: {
            ...cors,
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=2592000',
            'X-TTS-Cache': 'miss',
          },
        });
      } catch (e) {
        return json({ error: 'TTS call failed: ' + (e.message || 'unknown') }, 500, cors);
      }
    }

    return json({ error: 'not found' }, 404, cors);
  }
};
