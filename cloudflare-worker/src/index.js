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

    return json({ error: 'not found' }, 404, cors);
  }
};
