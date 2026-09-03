# Polar India

A public science outreach portal and knowledge repository for India's **National Centre for Polar and
Ocean Research (NCPOR)**, Ministry of Earth Sciences.

Built as a hackathon demo prototype. No backend, no database, no authentication — all content is served
from typed local data files.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for page and component animation
- **react-leaflet + Leaflet** for the map (no API key required)
- **Recharts** for data visualisation
- **lucide-react** for icons

## Pages

| Route | What it does |
|---|---|
| `/` | Landing page — hero, animated counters, station cards, module previews, EN/हिंदी toggle |
| `/atlas` | **Centrepiece.** Dark Leaflet map of both poles with a 1981–2026 timeline slider that filters stations and expeditions, an animated station detail panel, and an expeditions-per-decade chart |
| `/research` | Knowledge repository — live search, research-area and year-range filters, live result counts, publication detail modal |
| `/expeditions` | Vertical scroll-animated archive of every Indian Scientific Expedition to Antarctica, filterable by decade |
| `/learn` | Schools outreach — curriculum cards for Classes 6–8, 9–10, 11–12, plus an interactive explainer on polar ice and the Indian monsoon |
| `/admin` | Mock CMS dashboard showing how NCPOR staff would maintain content after handover (non-functional by design) |

## Data

All content lives in `src/data/`:

- `stations.ts` — Dakshin Gangotri, Maitri, Bharati, Himadri with real coordinates, dates and status
- `expeditions.ts` — the ISEA timeline, with verified milestones (1st, 2nd, 3rd, 7th, 20th, 42nd, 44th, 45th) and plausible generated entries filling the remaining years
- `publications.ts` — 15 verified NCPOR publications (flagged `verified: true` and badged in the UI) plus generated entries to populate the repository grid
- `learn.ts` — schools resources
- `translations.ts` — the English/Hindi dictionary powering the navbar language toggle

`polar-data.md` at the project root is the research source file the data was built from, with citations.

## Images

`public/images/` holds 14 photographs sourced from **Wikimedia Commons** (freely licensed): the four
stations, Antarctic landscapes, icebergs, the aurora, ORV Sagar Kanya, the 1983 First Indian Antarctic
Expedition commemorative stamp, and a Second Expedition team photograph.

## Notes

- The map uses Esri's free dark canvas basemap (no API key), which needs an internet connection.
  Everything else — data, images, interactions — runs entirely offline. CARTO's basemaps were tried
  first but now stamp "API KEY REQUIRED" across every tile.
- **Do not run `npm run build` while `npm run dev` is running.** Both write to the same `.next`
  directory, and the build replaces the dev server's compiled assets, which makes every CSS and JS
  file 404 until you stop dev, delete `.next`, and restart.
- Expedition leaders and publications not marked as verified are realistic generated placeholders. The
  verified NCPOR publications carry a badge in the UI.
