# italiano-sync — Cloudflare Worker

Tiny proxy that stores your "known words" list in Cloudflare KV so the app syncs across devices.

## One-time deploy (5 minutes)

### 1. Install wrangler + login

```bash
npm install -g wrangler
wrangler login                  # opens browser, authenticate your Cloudflare account
```

(A free Cloudflare account is enough. Free tier = 100k reads/day, 1k writes/day — way more than personal use needs.)

### 2. Create the KV namespace

```bash
cd cloudflare-worker
wrangler kv namespace create KNOWN
```

Wrangler prints something like:

```
[[kv_namespaces]]
binding = "KNOWN"
id = "abc123def456..."
```

Copy that `id` value.

### 3. Paste the id into `wrangler.toml`

Open `wrangler.toml`, replace `REPLACE_WITH_KV_NAMESPACE_ID` with the id from step 2.

### 4. Deploy

```bash
wrangler deploy
```

Wrangler prints the Worker URL, e.g.:

```
https://italiano-sync.bodepaoli.workers.dev
```

### 5. Test it

```bash
# Replace PASS with any 16-char string you'll use as your sync passphrase
PASS="pick-a-long-phrase-here"

curl -X PUT "https://italiano-sync.bodepaoli.workers.dev/known?pass=$PASS" \
  -H "Content-Type: application/json" \
  -d '{"known":["ciao","grazie"]}'

curl "https://italiano-sync.bodepaoli.workers.dev/known?pass=$PASS"
# → {"known":["ciao","grazie"]}
```

### 6. Configure the app

1. Open https://bodepaoli.github.io/italiano/
2. Click the ⚙ gear in the top-right corner
3. Paste your Worker URL and passphrase
4. Hit **Save** — the app pushes/pulls from then on
5. Repeat on your phone with the SAME passphrase

That's it. Every time you mark a word known / unknown, the change syncs.

## Updating the Worker

Edit `src/index.js`, then:

```bash
wrangler deploy
```

## Notes

- The passphrase is both authentication and the storage key. Anyone who guesses it can read/write your list. Use 16+ random characters.
- No PII is stored — just a list of Italian word strings.
- Free tier is plenty. A study session of 50 marks/day uses ~50 writes vs. the 1,000/day limit.
