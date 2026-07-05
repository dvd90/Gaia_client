# Gaia 🌍 — Client

## Save our planet — reduce your footprint

> “The question that will decide our destiny is not whether we shall expand into space. It is: shall we be one species or a million? A million species will not exhaust the ecological niches that are awaiting the arrival of intelligence.”
> — Freeman Dyson

React client for [Gaia](https://github.com/dvd90/Gaia), a community app for reducing your ecological footprint:

- **Footprint quiz** — find out how many Earths we'd need if everyone lived like your country does.
- **Challenges** — complete eco-challenges (Waste, Energy, Transport) and earn Gaia points.
- **Events** — create and join local eco-events on a Mapbox map.

Fully responsive — works on mobile, tablet and desktop.

## Tech stack

- Vite + React 18
- React Router 7
- Context-based state (auth, toasts, confirm dialogs)
- Mapbox GL for the events map (lazy-loaded)
- Vitest + Testing Library test suite (80% coverage enforced)

## Getting started

1. Start the [Gaia API](https://github.com/dvd90/Gaia) first (it runs on `http://localhost:4000` by default).

2. Install dependencies (Node 20+):

   ```bash
   npm install
   ```

3. Configure the environment:

   ```bash
   cp .env.example .env
   # set VITE_API_URL (your Gaia API) and VITE_MAPBOX_TOKEN
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

## Tests

Vitest + Testing Library, with a **minimum 80% coverage threshold** enforced
(currently ~99% statements):

```bash
npm test           # run all tests with coverage report
npm run test:watch
```

## Deploying to Railway

This repo ships with a `railway.json`. The production build is a static site
served by [`serve`](https://www.npmjs.com/package/serve) (SPA fallback
included). To deploy:

1. Create a new Railway project → **Deploy from GitHub repo** → pick this repo.
2. Set the service variables:
   - `VITE_API_URL` — the public URL of your deployed Gaia API
   - `VITE_MAPBOX_TOKEN` — your Mapbox token
3. Deploy. Railway runs `npm run build` and then `npm start`, which serves the
   `dist/` folder on the injected `PORT`.

> Vite inlines `VITE_*` variables at **build time** — if you change them,
> trigger a redeploy so the site is rebuilt.

Remember to set `CLIENT_ORIGIN` on the API service to this site's URL so CORS
allows the requests.

## Authors

Sellam David & Liad Gez
