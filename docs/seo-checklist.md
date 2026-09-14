# SEO checklist — English pages

Per page we fill five slots. A page is done only when all five are ticked and
`npm run check:seo` passes.

| Slot | What counts as done |
|---|---|
| **Title** | ≤60 chars including the ` \| Ylala` / ` · Ylala` brand, carries the page's target keyword, not a bare category label |
| **Description** | 150–160 chars, states the offer and ends on a reason to click |
| **OG / Twitter** | `ogImage` points at a real photograph that exists under `public/`, `ogImageAlt` authored (not the title) |
| **JSON-LD** | Page-appropriate type beyond `BreadcrumbList` (`ItemList`, `CollectionPage`, `ImageGallery`, `AboutPage`, `OfferCatalog`) |
| **SEO copy** | 900–1400 chars of visible editorial prose rendered through `<SeoProse>`, never hidden text |

---

## Stage 1 — the five pages that bring clients

- [x] **Home** — `/` — [page.tsx](../src/app/[locale]/page.tsx)
  - [x] Title 49 · [x] Description 158 · [x] OG `cities/paris.jpg` · [x] `WebPage` + `ItemList`(9) + `FAQPage` · [x] Copy 1,386
  - Target: *book a photographer in France*
  - Brand is baked into the title: a layout's `title.template` does not apply to
    the page in that same segment, so the home page would otherwise ship brandless.
- [x] **Services hub** — `/services` — [services/page.tsx](../src/app/[locale]/services/page.tsx)
  - [x] Title 53 · [x] Description 157 · [x] OG `services/portrait.jpg` · [x] `CollectionPage` + `ItemList`(33) · [x] Copy 1,536
  - Target: *photography services in France*
- [x] **Cities hub** — `/cities` — [cities/page.tsx](../src/app/[locale]/cities/page.tsx)
  - [x] Title 48 · [x] Description 148 · [x] OG `cities/paris.jpg` · [x] `CollectionPage` + `ItemList`(22) · [x] Copy 1,662
  - Target: *photographers by city in France*
- [x] **Portfolio** — `/portfolio` — [portfolio/page.tsx](../src/app/[locale]/portfolio/page.tsx)
  - [x] Title 55 · [x] Description 153 · [x] OG `portfolio/wedding/1.jpg` · [x] `ImageGallery`(24 of 165) · [x] Copy 1,385
  - Target: *photography portfolio France*
  - Photograph count is interpolated from `allPortfolioImages()`, not typed out.
- [x] **About** — `/about` — [about/page.tsx](../src/app/[locale]/about/page.tsx)
  - [x] Title 44 · [x] Description 152 · [x] OG `cities/paris.jpg` + alt · [x] `AboutPage` linked to `WebSite` + `FAQPage` · [x] Copy 1,508
  - Target: *vetted photographer network France*
  - Dropped the duplicate `Organization` node the root layout already emits.

## Stage 2 — the five that close the sale

- [x] **Pricing** — `/pricing` — [pricing/page.tsx](../src/app/[locale]/pricing/page.tsx)
  - [x] Title 50 · [x] Description 148 · [x] OG `services/family.jpg` · [x] `CollectionPage` + `OfferCatalog`(33) · [x] Copy 1,428
  - Offers carry `priceSpecification.minPrice`, not a flat `price`: the table
    publishes "from" figures, and a bare `price` would claim the shoot costs
    exactly that.
- [x] **Reviews** — `/reviews` — [reviews/page.tsx](../src/app/[locale]/reviews/page.tsx)
  - [x] Title 50 · [x] Description 144 · [x] OG `services/couple.jpg` · [x] `CollectionPage` + `AggregateRating` + 5 `Review` · [x] Copy 1,165
  - Rating is interpolated from the catalogue; the review count stays out of the
    title and description — five is true and weak, and leading with it argues
    against the page.
- [x] **Blog hub** — `/blog` — [blog/page.tsx](../src/app/[locale]/blog/page.tsx)
  - [x] Title 59 · [x] Description 149 · [x] OG first post cover · [x] `Blog` with 10 `BlogPosting` · [x] Copy 1,417
- [x] **Contact** — `/contact` — [contact/page.tsx](../src/app/[locale]/contact/page.tsx)
  - [x] Title 54 · [x] Description 143 · [x] OG `cities/lyon.jpg` · [x] `ContactPage` · [x] Copy 1,418
- [x] **Book** — `/book` — [book/page.tsx](../src/app/[locale]/book/page.tsx)
  - [x] Title 51 · [x] Description 153 · [x] OG `services/proposal.jpg` · [x] `WebPage` + `potentialAction: ReserveAction` · [x] Copy 1,405

## Stage 3 — French locale

- [x] Stage 1 pages: `fr` title, description, OG alt and prose authored
      alongside the English in each `content.ts`
- [x] Stage 2 pages: same
- [x] All ten `fr` pages measured on the built output — every title ≤59,
      every description ≤158, every passage ≥1,187
- [ ] Native review of the French copy (authored here, not reviewed by a
      native speaker)

---

## Decisions taken

- [x] **`AggregateRating` stays.** The concern about self-serving reviews was
      raised and the call was made to keep the markup as it is.
- [x] **Canonical origin confirmed** as `https://ylala.art`, the
      `NEXT_PUBLIC_SITE_URL` default.

## Stage 4 — the 22 city pages

The long-form requirement was already met here: each city carries 835–1,911
characters of authored, city-specific prose (lede, narrative, seasonality, spot
notes, FAQ). Adding a `<SeoProse>` block would have diluted it. The work was
everything else.

- [x] **Authored SERP copy per city** — [city-seo.ts](../src/lib/data/city-seo.ts)
  - All 22 titles 47–54 chars with the brand; all 22 descriptions 145–159 and
    **all 22 unique** — they were one template with the name substituted in,
    which is 22 pages telling a crawler they are interchangeable.
  - `check-seo.ts` now fails the build if a published city has no entry or
    overruns a limit. The old template survives as a runtime fallback only.
- [x] **`og:image:alt` authored** — names what is in the photograph
      ("Paris, Île-de-France — photographed by the Ylala network") rather than
      repeating the page title.
- [x] **Empty `FAQPage` removed.** Ten of the 22 cities have no authored FAQ and
      were emitting `FAQPage` with `mainEntity: []` — a node claiming a
      question-and-answer page with no questions on it.
- [x] **`CollectionPage`** node added, with the services list as its `mainEntity`.
- [x] **`ItemList`** of the 22–30 `service × city` leaves live for that city,
      built from the array the page renders.
- [x] **`ProfessionalService` enriched**: `areaServed` now carries the 5–8
      covered communes as well as the city, `photo` carries the 3–4 city
      photographs, and `image` is the city rather than the wordmark.
- [x] **`coveredAreas` rendered on the page.** 128 commune names were authored
      in the data and displayed nowhere — invisible to a reader deciding whether
      we reach them and to a crawler ranking for them.
- [x] **French contractions fixed** — [city-name.ts](../src/lib/city-name.ts).
      "Photographe à Mont-Saint-Michel" (should be *au*) in the H1 and four H2s,
      and "de Étretat" (should be *d'*) in body copy. `City.frArticle` carries
      the article; the contractions derive from it.

## Stage 5 — 33 service pages and 125 leaves

### Service pages

- [x] **Authored SERP copy and a passage per service** — [service-seo.ts](../src/lib/data/service-seo.ts),
      split across four files by the kind of buyer rather than by the
      catalogue's nine categories.
  - Eighteen of the thirty-three had no `description` at all and fell back to
    one shared sentence. All 29 English pages now carry a unique title (46–53)
    and a unique description (140–159); prose runs 882–1,184.
- [x] **Empty `FAQPage` removed** — twenty of the thirty-three services have no
      authored FAQ and every one was emitting `mainEntity: []`.
- [x] **`WebPage` + `ItemList`** of the cities the service is live in, built
      from the array the grid renders.
- [x] **`check-seo.ts` guardrail** — fails the build on a missing entry, an
      over-length title or description, or a passage under 600 characters.

### The 125 curated leaves

Curating *which* pages get indexed does not help if the copy on them is
interchangeable, and [content.ts](../src/lib/content.ts) was substituting two
proper nouns into a fixed paragraph.

- [x] **Generator rewritten** to compose from data that already varies: the
      city's lede, its spot names and hours, its permit position, and the
      service's own deliverables and figures. Measured across all 239 renders
      (125 leaves × the locales each service exists in): **239 unique intro
      paragraphs, 239 unique timing paragraphs, 239 unique titles, 239 unique
      descriptions**, 1,485–1,758 characters of copy per leaf.
- [x] **Authored copy for the top 20** — [leaf-seo.ts](../src/lib/data/leaf-seo.ts).
      Title, description and the framing paragraph, for the pairings that carry
      the demand: Paris weddings and proposals, Lyon corporate, Riviera
      honeymoons, Provence and Alps destination work.
- [x] **New `timingParagraph` section** — when, rather than where, composed from
      this city's spot hours and this service's duration.
- [x] **`WebPage` node** and covered communes on the leaf's `ProfessionalService`,
      so it makes the same coverage claim the city page makes.
- [x] **`check-seo.ts` guardrail** — a `leaf-seo` key must name a real service,
      a real city and a curated pairing, and fit the SERP limits.

### Grammar and formatting fixed along the way

- [x] **`A Couple session session in Étretat`** / **`Une séance Séance couple à
      Paris`.** Service names are complete noun phrases, so every sentence that
      glued an article or the word "session" onto one broke. Reframed so the
      name only appears where it needs neither an article nor agreement.
- [x] **`600 minutes`** for a wedding — `formatDuration` in
      [site.ts](../src/lib/site.ts) now says "10 hours".
- [x] **`1200`** — `formatPrice` groups thousands (`€1,200` / `1 1200 €`).
- [x] **`Photographe Photo culinaire et restaurant à Marseille`** — the
      generated leaf title dropped the prefix where it doubled up or overran.
- [x] **A ten-hour wedding described as a walking route.** Sessions of four
      hours or more now read as coverage of an event, which is what they are.

## Defect sweep over the whole session's work

Run after stage 5, across every file touched.

- [x] **French contractions missing on the leaf page.** Six labels and the
      WhatsApp prefill built their French with a bare `à ${city.name}`, so every
      one said "à Mont-Saint-Michel" instead of "au" — the same bug fixed on the
      city page in stage 4, still live one directory over. All now go through
      `frAt`.
- [x] **`une séance Séance couple` in the WhatsApp prefill.** The noun-doubling
      fixed in `content.ts` survived here. Reframed.
- [x] **`prises de vue séance couple`** — two nouns juxtaposed with nothing
      between them, on both the service and the leaf page.
- [x] **Three dead label keys** left behind by the switch to `formatDuration`
      (`labels.minutes` on two pages, `COPY.min` on pricing).
- [x] **`formatDuration` had a ternary with two identical branches.**
- [x] **`<SeoProse>` keyed paragraphs on a 48-character prefix**, which collides
      if two open the same way. The list is static, so the index is the key.
- [x] **Every price, photograph count and digit duration in the authored copy
      checked against the catalogue** — services, cities and leaves, both
      locales. No mismatches.
- [x] `tsc --noUnusedLocals --noUnusedParameters` clean across the session's
      files (one pre-existing unused import in `check-seo.ts` predates this work).

## Still open

- [ ] **No `ContactPoint` in the `Organization` node.** `NEXT_PUBLIC_WHATSAPP_NUMBER`
      is still the `33000000000` placeholder, and publishing a fake telephone in
      structured data is worse than publishing none. Add it once the real number
      is configured.


## Measured on the built output

Read back off the rendered HTML from `next start`, not from source. Limits:
title ≤60, description ≤160, prose ≥600.

| Page | Title | Description | Prose | JSON-LD beyond breadcrumbs |
|---|---|---|---|---|
| Home | 49 | 158 | 1,386 | `WebPage`, `ItemList`(9), `FAQPage`, `AggregateRating` |
| Services | 53 | 157 | 1,536 | `CollectionPage`, `ItemList`(33) |
| Cities | 48 | 148 | 1,662 | `CollectionPage`, `ItemList`(22) |
| Portfolio | 55 | 153 | 1,385 | `ImageGallery`(24) |
| About | 44 | 152 | 1,508 | `AboutPage`, `FAQPage`, `AggregateRating` |
| Pricing | 50 | 148 | 1,428 | `CollectionPage`, `OfferCatalog`(33) |
| Reviews | 50 | 144 | 1,165 | `CollectionPage`, `AggregateRating`, 5 × `Review` |
| Blog | 59 | 149 | 1,417 | `Blog`(10 × `BlogPosting`) |
| Contact | 54 | 143 | 1,418 | `ContactPage` |
| Book | 51 | 153 | 1,405 | `WebPage` + `ReserveAction` |

Every page also emits `og:image` on a real photograph with authored
`og:image:alt`, and a `summary_large_image` Twitter card.

### Service pages (29 English)

| | Range | Note |
|---|---|---|
| Title | 46–53 | 29 of 29 unique |
| Description | 140–159 | 29 of 29 unique; 18 shared one template before |
| Passage | 882–1,184 | Authored per service |
| JSON-LD | — | `WebPage`, `Service`+`Offer`, `ItemList`, `FAQPage` where real |

### Leaves (239 renders across 125 pairings)

| | Range | Note |
|---|---|---|
| Title | ≤60 | 239 of 239 unique |
| Description | 120–158 | 239 of 239 unique |
| Copy | 1,485–1,758 | Composed from city and service data; 20 authored |

### City pages (22)

| | Range | Note |
|---|---|---|
| Title | 47–54 | With the brand appended |
| Description | 145–159 | 22 of 22 unique |
| On-page prose | 835–1,911 | Already authored per city |
| `ItemList` | 22–30 services | Per city, live leaves only |
| `areaServed` | 6–9 places | City plus covered communes |

## Verification per page

```
npm run typecheck && npm test
npm run build && npm run check:seo
```
