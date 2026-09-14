# Photography booking, Portugal

A bilingual photography-booking site for Portugal, connecting travellers,
couples, families and businesses with local photographers across twelve places.

- **Framework:** Next.js 15 (App Router, React 19), fully prerendered
- **i18n:** next-intl — English (default, no URL prefix) and Portuguese at `/pt`,
  with translated URL segments *and* translated service slugs
- **Styling:** Tailwind CSS v4 + `next/font`
- **Booking:** WhatsApp click-to-chat, plus lead alerts to a Telegram bot
- **Hosting:** Cloudflare Workers via `@opennextjs/cloudflare`

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
| `npm run build` | Gates, sitemap, then the Cloudflare build |
| `npm run typecheck` | `tsc --noEmit`, including `scripts/` |
| `npm test` | Unit tests (`node:test`) |
| `npm run test:e2e` | Playwright, against a production build |
| `npm run check:seo` | Crawl-level invariants; run after a build |

## Two languages that are not mirror images

English is the default and is served unprefixed; Portuguese lives under `/pt`
with translated segments:

| | English | Portuguese |
| --- | --- | --- |
| Services | `/services` | `/pt/fotografo` |
| A service | `/services/wedding` | `/pt/fotografo/casamento` |
| In a place | `/services/wedding/lisboa` | `/pt/fotografo/casamento/lisboa` |
| Places | `/cities/porto` | `/pt/cidades/porto` |
| Pricing | `/pricing` | `/pt/precos` |

Every Portuguese segment is ASCII on purpose. Accented segments are legal as
percent-encoded UTF-8 and render as `%C3%A7` in a search result; a test asserts
none survives.

**The catalogue is deliberately asymmetric.** English carries the work people
fly here for — destination weddings, honeymoons, a morning in Lisbon, remote-work
headshots. Portuguese carries what people book because they live here: batizados,
finalistas, book de modelo, corporate events. A service declares its availability
with `availableIn`, and a page that exists in one language emits **no** hreflang
alternate for the other — pointing at a URL that 404s is worse than pointing at
nothing.

Place names differ between the languages (Lisbon/Lisboa, Azores/Açores), which
France never exposed. `City.nameLocalized` carries the display name; `City.name`
stays canonical for `@id`s, image slots and schedule keys.

Portuguese contracts its prepositions with the definite article, and the article
belongs to the name: "em Lisboa" but "no Porto", "na Madeira", "nos Açores".
`src/lib/pt-grammar.ts` derives every contraction from `City.ptArticle`, and
`pt-grammar.test.ts` asserts the exact strings. One thing from the French module
it replaced must never come back: French elides `de` to `d'` before a vowel and
Portuguese does not.

## Which pages are indexed

22 services × 12 places is a few hundred combinations per language. Publishing
all of them from one template is the thin-content pattern this site exists to
avoid, so indexation is a decision recorded per combination in
`src/lib/curated.ts`.

- A **curated** leaf is listed in the sitemap and indexable.
- Every other valid combination still **renders** — a reader following a link
  gets a real page — but carries `noindex, follow` and stays out of the sitemap.

Uncurated pages are deliberately *not* disallowed in `robots.txt`: a crawler
that cannot fetch them can never read the `noindex`.

Curation is not a prerender list. Every published combination is prerendered;
curation decides only indexation.

## Photography

Three commands, and the split is the point:

```bash
npm run photos:search   # spends Unsplash API quota, caches by query
npm run photos:select   # PURE — reads the cache, writes the manifest, free
npm run photos:fetch    # renders AVIF/WebP derivatives. No quota.
```

Selection is a pure function over the cache, so the scoring can be tuned and
re-run in a second. It penalises popularity explicitly — `- 0.8 * log10(likes)`
— because the most relevant photograph of a famous place is, by construction,
the one every other site already has. A photo id may be assigned to exactly one
slot site-wide, and no photographer may appear more than twice in one gallery.
The choice is committed to `public/images/images.manifest.json`.

Needs `UNSPLASH_KEY`. A demo key allows 50 requests an hour and the search
command resumes cleanly; a production key allows 5,000 and requires the
attribution and download-trigger compliance this pipeline already implements.

Images are served as content-hashed AVIF and WebP through `<Picture>`, not
`next/image` — see the note in `src/components/Picture.tsx`.

## SEO and AI discoverability

- Canonical, hreflang and the sitemap all derive from one route table
  (`src/i18n/pathnames.ts`), so they cannot disagree.
- `alternateLinks` is **off** in the middleware. It would otherwise advertise
  every locale in a `Link:` header, contradicting pages that exist in one
  language or carry `noindex`.
- JSON-LD `@graph` per page type with locale-stable `@id`s (`src/lib/jsonld.ts`);
  an e2e test asserts every `@id` reference resolves.
- `/sitemap.xml` is a build artifact; `/robots.txt` allows AI crawlers;
  `/llms.txt` is generated from the catalogue and the route table.
- Titles are clamped to 60 characters and descriptions to 160, centrally.

## Build gates

Each one exists because the thing it checks failed silently at least once.

| Gate | Refuses |
| --- | --- |
| `check-brand` | the brand name or the old domain outside `src/lib/site.ts` |
| `check-pt-todo` | an untranslated string left by the locale codemod |
| `check-legal` | a `TODO_` placeholder in a legal document |
| `check-seo` | a published place or service with no authored SERP copy |

`ALLOW_LEGAL_TODO=1` downgrades the legal gate to a warning for pre-launch
builds. The deploy script does not set it.

## Gradual rollout

Curated leaves are released gradually, spread evenly across a window, so a few
hundred similarly-shaped pages do not appear on one day. Publication is a pure
function of `(page identity, current time)` — no database.

Because every route is `force-static`, the next batch goes live on the next
**build**, not the next revalidation, so a daily scheduled rebuild is what moves
it.

```
ROLLOUT_ENABLED      'true' / 'false' to force; unset follows NODE_ENV
ROLLOUT_START        ISO date the drip begins — set this to the launch date
ROLLOUT_WINDOW_DAYS  days over which every leaf releases (default 45)
```

## Before going live

- Set `SITE_NAME` in `src/lib/site.ts`, and the domain in `.env.production` and
  `wrangler.jsonc`. `check-brand` guarantees there is nowhere else to change.
- Fill every `TODO_` in `src/lib/legal.ts` — NIF/NIPC, registered office,
  commercial registry, IVA status, host, and the RAL body required by
  DL 144/2015. `npm run check:legal` lists them.
- Have a Portuguese lawyer read the terms of sale, particularly the
  DL 24/2014 art. 17(1)(l) carve-out the fixed-date booking model rests on.
- Set `ROLLOUT_START` to the launch date.
- Set `NEXT_PUBLIC_SITE_URL`, the WhatsApp number, the Telegram credentials and
  the Cloudflare Web Analytics token.
- Run the photo pipeline with a real `UNSPLASH_KEY`.

## Deploy

```bash
npm run deploy    # builds and pushes to Cloudflare Workers
```

Secrets are not in the repository. `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
are set with `wrangler secret put` and read at runtime. Security headers are
configured in `next.config.mjs`.
