# Gaia 🌍 — Client

## Save our planet — reduce your footprint

> “The question that will decide our destiny is not whether we shall expand into space. It is: shall we be one species or a million? A million species will not exhaust the ecological niches that are awaiting the arrival of intelligence.”
> — Freeman Dyson

React client for [Gaia](https://github.com/dvd90/Gaia), a community app for reducing your ecological footprint:

- **Footprint quiz** — find out how many Earths we'd need if everyone lived like your country does.
- **Challenges** — complete eco-challenges (Waste, Energy, Transport) and earn Gaia points.
- **Events** — create and join local eco-events on a Mapbox map.

The UI is designed for **mobile and tablet** screens.

## Tech stack

- React 16 (Create React App) + Redux
- Material-UI
- Mapbox GL for the events map

## Getting started

1. Start the [Gaia API](https://github.com/dvd90/Gaia) first (it runs on `http://localhost:4000` by default).

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure the environment:

   ```bash
   cp .env.example .env
   # set REACT_APP_API_URL (your Gaia API) and REACT_APP_MAP_BOX_KEY
   ```

4. Run the app:

   ```bash
   yarn start
   ```

   Then open it with a mobile-sized viewport (e.g. Chrome DevTools device toolbar).

> **Note:** the npm scripts pass `--openssl-legacy-provider` so that this
> Create-React-App 3 project builds on Node 17+. If you're on Node 16 or
> older, remove that flag from the scripts in `package.json`.

## Authors

Sellam David & Liad Gez
