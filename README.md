# wedding site

static, zero-build wedding site. withjoy vibes, no withjoy branding/ads/upsells.

## edit
everything lives in `config.js` — names, date, events, travel, registry, faqs, rsvp.
drop photos in `photos/` and reference them (`heroImage`, `story.photos`, `gallery`).

## preview
```
python3 -m http.server 8000   # then open localhost:8000
```

## rsvp
make a free form at formspree.io, paste the endpoint into `rsvp.formEndpoint`.
responses land in your inbox + a formspree dashboard (exportable csv).
blank endpoint = falls back to a mailto link.

## deploy
merge to `main`, then repo settings → pages → source: **GitHub Actions**.
custom domain: add it in pages settings + a CNAME record at your registrar.
(netlify / vercel / cloudflare pages also work — just point them at the repo root.)
