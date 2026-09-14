# Ylala

A bilingual photography-services marketplace for France, connecting travellers,
couples, families and businesses with vetted local photographers across 22
cities and destinations.

- **Framework:** Next.js 15 (App Router, React 19, SSG + ISR)
- **i18n:** next-intl — English (default, no URL prefix) and French at `/fr`,
  with translated URL segments *and* translated service slugs
- **Styling:** Tailwind CSS v4 + `next/font`
- **Booking:** WhatsApp click-to-chat, plus lead alerts to a Telegram bot

## Run locally

Requires **Node 22**.

```bash
npm install
cp .env.example .env.local   # every value is optional; the site runs without them
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Generates the sitemap, then builds (~386 pages) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit`, including `scripts/` |
| `npm test` | Unit tests (`node:test`) |
| `npm run test:e2e` | Playwright smoke tests against a production build |
| `npm run check:seo` | Crawl-level invariants; run after `build` |

## Two languages that are not mirror images

English is the default and is served unprefixed; French lives under `/fr` with
translated segments:

| | English | French |
| --- | --- | --- |
| Services | `/services` | `/fr/photographe` |
| A service | `/services/wedding` | `/fr/photographe/mariage` |
| In a city | `/services/wedding/paris` | `/fr/photographe/mariage/paris` |
| Cities | `/cities/nice` | `/fr/villes/nice` |
| Pricing | `/pricing` | `/fr/tarifs` |

Both the static segments and the service slugs are translated. City slugs are
proper nouns and identical in both languages.

**The catalogue is deliberately asymmetric.** Twenty services exist in both
languages; ten do not. English carries inbound destination work (Eiffel Tower
sessions, Provence weddings, Alps elopements); French carries domestic life
events (baptême, EVJF, book comédien, photo scolaire). A service declares its
availability with `availableIn`, and a page that exists in one language emits
**no** hreflang alternate for the other — pointing at a URL that 404s is worse
than pointing at nothing.

## Which pages are indexed

33 services × 22 cities is 726 possible combinations per language. Publishing
all of them from one template is the thin-content pattern this site exists to
avoid, so indexation is a decision recorded per combination in
`src/lib/curated.ts`.

- A **curated** leaf is prerendered, listed in the sitemap, and indexable.
- Every other valid combination still **renders** — a reader following a link
  gets a real page — but carries `noindex, follow`, emits no hreflang, and stays
  out of the sitemap.

Uncurated pages are deliberately *not* disallowed in `robots.txt`: a crawler
that cannot fetch them can never read the `noindex`.

## Gradual rollout

Cities, services and articles go live at launch. Only the curated leaves are
released gradually, spread evenly across a window, so a few hundred
similarly-shaped pages do not appear on one day.

Publication is a pure function of `(page identity, current time)` — no database.
Gating is active in production only.

```
ROLLOUT_ENABLED      'true' / 'false' to force; unset follows NODE_ENV
ROLLOUT_START        ISO date the drip begins — set this to the deploy date
ROLLOUT_WINDOW_DAYS  days over which every leaf releases (default 45)
```

## SEO and AI discoverability

- Canonical, hreflang and the sitemap are all derived from one route table
  (`src/i18n/pathnames.ts`), so they cannot disagree.
- `alternateLinks` is **off** in the middleware. It would otherwise advertise
  every locale in a `Link:` response header, contradicting pages that exist in
  one language or carry `noindex`.
- JSON-LD `@graph` per page type, with locale-stable `@id`s (`src/lib/jsonld.ts`).
- `/sitemap.xml` is a static build artifact; `/robots.txt` allows AI crawlers;
  `/llms.txt` is generated from the catalogue and the route table.
- Titles are clamped to 60 characters and descriptions to 160, centrally.

## Architecture

```
src/
  app/[locale]/        home, services, cities, pricing, portfolio, reviews,
                       blog, about, contact, book, legal/*
  app/api/lead/        Telegram lead endpoint (Zod-validated)
  app/{robots,llms.txt}
  components/          NavBar, Footer, BookingWidget, LeadForm, filters, JsonLd
  i18n/                pathnames (the route table), routing, request, navigation
  lib/
    data/              catalogue: services, cities (metro + destination), blog, reviews
    curated.ts         which service × city pages are indexed
    routes.ts          catalogue → route glue, typed hrefs
    urls.ts            canonical + hreflang, pure and importable from scripts
    seo.ts             one metadata chokepoint
    publishSchedule.ts the drip
messages/{en,fr}.json  UI chrome
e2e/                   Playwright smoke tests
scripts/               generate-sitemap, check-seo, fetch-photos
```

## Content

Copy is authored in English and French rather than translated from one into the
other, and says what is true rather than what sells: that Valensole lavender is
cut in the first days of August, that a legally binding French marriage needs 30
days' residency, that the Promenade des Anglais is worth twenty minutes and no
more. Surrounding communes are listed on their parent city page rather than
given thin pages of their own.

Twelve destination cities currently show a regional placeholder photograph
rather than photography of their own. Each is marked in
`public/images/credits.json` and disclosed on `/legal/photo-credits`. Run
`scripts/fetch-photos.py` (needs `UNSPLASH_KEY`) or commission real work.

## Before going live

- Fill in the `TODO_` placeholders in `src/lib/legal.ts` — company identity,
  SIRET, publication director, host name and address.
- Have a lawyer review the terms of sale, particularly the withdrawal clause.
- Set `ROLLOUT_START` to the deploy date.
- Set `NEXT_PUBLIC_SITE_URL`, the WhatsApp number, and the Telegram credentials.

## Deploy

Push to Git, import in Vercel, set the environment variables above. Security
headers are configured in `next.config.mjs`.
