# Bo's Italian Study App

Personal Italian vocabulary flashcard + quiz PWA. Installable on phone and desktop via GitHub Pages.

**Live:** https://bodepaoli.github.io/italiano/

## Adding new vocabulary

Edit `vocab.js` — each entry follows:

```js
{it:"Italian word", en:"English meaning", type:"t-are", cat:"Verbs", note:"conjugation / grammar", ex:"example sentence"}
```

**Types:** `t-are`, `t-ere`, `t-ire`, `t-ireisc`, `t-irr`, `t-phrase`, `t-adj`, `t-prep`, `t-structure`

**Categories:** `Verbs`, `Phrases`, `Structure`, `Adjectives`, `Colors`, `Prepositions`, `Tricky Pairs`, `Word Patterns`, `FARE Expressions`

Push to `main` and GitHub Pages auto-deploys.

## Install on phone

1. Open the live URL in Safari (iOS) or Chrome (Android)
2. Share → **Add to Home Screen**
3. Works offline after first load (service worker caches everything)

## Local dev

```bash
python3 -m http.server 8091
# open http://127.0.0.1:8091
```

## Structure

- `index.html` — app shell, CSS, and rendering logic
- `vocab.js` — vocabulary data (edit to add words)
- `manifest.json` — PWA manifest
- `sw.js` — service worker (offline cache, bump `CACHE` version on changes)
- `icons/` — PWA icons
