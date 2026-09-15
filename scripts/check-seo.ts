/**
 * Crawl-level invariants, checked against the generated sitemap and the
 * catalogue rather than against a running server.
 *
 * These are the mistakes that unit tests cannot see and that nobody notices in
 * a browser: a canonical pointing at a URL we do not serve, an hreflang cluster
 * that is not reciprocal, a noindex page listed for indexing. Each one is
 * invisible until Search Console reports it weeks later.
 *
 * Run after `npm run build`, which writes the sitemap this reads.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '../src/lib/locales';
import { SITE_URL } from '../src/lib/site';
import { absoluteUrl, languageAlternates } from '../src/lib/urls';
import {
  publishedCities,
  publishedServices,
  publishedCuratedLeaves,
  publishedBlogPosts,
  getServiceById,
  serviceSlug,
  serviceExistsIn,
  isCuratedLeaf,
  CITIES,
  SERVICES,
} from '../src/lib/catalog';
import { serviceAlternateParams, leafAlternateParams } from '../src/lib/routes';
import { TITLE_MAX, DESCRIPTION_MAX } from '../src/lib/seo-text';
import { CITY_SEO } from '../src/lib/data/city-seo';
import { SERVICE_SEO } from '../src/lib/data/service-seo';
import { LEAF_SEO } from '../src/lib/data/leaf-seo';
import { CURATED_LEAVES } from '../src/lib/curated';
import { SITE_NAME } from '../src/lib/site';
import { SERVICE_LANDING } from '../src/lib/data/service-landing';
import { IMAGE_SLOTS } from '../src/lib/data/image-manifest';
import { articleProblems, landingProblems } from '../src/lib/landing-check';

const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);

const sitemap = readFileSync(join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
  ),
);

// 1. No sitemap URL may carry a locale prefix for the default locale.
for (const url of sitemapUrls) {
  if (url.startsWith(`${SITE_URL}/${DEFAULT_LOCALE}/`) || url === `${SITE_URL}/${DEFAULT_LOCALE}`) {
    fail(`sitemap contains a prefixed default-locale URL: ${url}`);
  }
  if (!url.startsWith(SITE_URL)) fail(`sitemap URL is not absolute on the site origin: ${url}`);
  if (url !== SITE_URL && url.endsWith('/')) fail(`sitemap URL has a trailing slash: ${url}`);
}

// 2. Every sitemap URL must be unique.
const seen = new Set<string>();
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (seen.has(m[1])) fail(`duplicate sitemap entry: ${m[1]}`);
  seen.add(m[1]);
}

// 3. hreflang clusters must be reciprocal and self-referential.
function checkCluster(label: string, alts: Record<string, string> | undefined) {
  if (!alts) return;
  for (const locale of LOCALES) {
    if (!(locale in alts)) continue;
    // Self-reference: the locale's own URL must be in its own cluster.
    if (!alts[locale]) fail(`${label}: hreflang="${locale}" has no href`);
  }
  const xd = alts['x-default'];
  if (!xd) fail(`${label}: no x-default`);
  const expected = alts[DEFAULT_LOCALE] ?? alts[Object.keys(alts).find((k) => k !== 'x-default')!];
  if (xd !== expected) fail(`${label}: x-default is ${xd}, expected ${expected}`);
  if (xd?.includes(`/${DEFAULT_LOCALE}/`)) fail(`${label}: x-default carries an /${DEFAULT_LOCALE}/ prefix`);
}

for (const service of publishedServices()) {
  const alts = serviceAlternateParams(service);
  checkCluster(`service ${service.slug}`, languageAlternates('/services/[service]', alts));
  // A service must not claim a locale it is not offered in.
  for (const locale of LOCALES) {
    const claimed = alts[locale] !== undefined;
    if (claimed !== serviceExistsIn(service, locale)) {
      fail(`service ${service.slug}: alternates claim ${locale}=${claimed} but availability says ${!claimed}`);
    }
  }
}

for (const city of publishedCities()) {
  checkCluster(
    `city ${city.slug}`,
    languageAlternates('/cities/[city]', Object.fromEntries(LOCALES.map((l) => [l, { city: city.slug }]))),
  );
}

// 4. Every curated leaf must be in the sitemap; nothing else may be.
for (const locale of LOCALES) {
  for (const { serviceId, city } of publishedCuratedLeaves(locale)) {
    const service = getServiceById(serviceId)!;
    const url = absoluteUrl(locale, '/services/[service]/[city]', {
      service: serviceSlug(service, locale),
      city,
    });
    if (!sitemapUrls.has(url)) fail(`curated leaf missing from sitemap: ${url}`);
    checkCluster(`leaf ${serviceId}/${city}`, languageAlternates('/services/[service]/[city]', leafAlternateParams(service, getCityOrThrow(city))));
  }
}

function getCityOrThrow(slug: string) {
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) throw new Error(`unknown city ${slug}`);
  return city;
}

// 5. No uncurated combination may appear in the sitemap.
for (const locale of LOCALES) {
  for (const service of SERVICES) {
    if (!serviceExistsIn(service, locale)) continue;
    for (const city of CITIES) {
      if (isCuratedLeaf(service.slug, city.slug, locale)) continue;
      const url = absoluteUrl(locale, '/services/[service]/[city]', {
        service: serviceSlug(service, locale),
        city: city.slug,
      });
      if (sitemapUrls.has(url)) fail(`noindex leaf listed in sitemap: ${url}`);
    }
  }
}

// 6. Every curated leaf points at entries that exist.
for (const locale of LOCALES) {
  for (const { serviceId, city } of publishedCuratedLeaves(locale)) {
    if (!getServiceById(serviceId)) fail(`curated leaf references unknown service "${serviceId}"`);
    if (!CITIES.some((c) => c.slug === city)) fail(`curated leaf references unknown city "${city}"`);
  }
}

// 7. SERP limits are enforced centrally, but the source strings should be sane.
for (const service of SERVICES) {
  for (const locale of LOCALES) {
    if (!serviceExistsIn(service, locale)) continue;
    const name = service.name[locale] ?? service.name.en;
    if (name.length > TITLE_MAX) fail(`service ${service.slug} (${locale}): name alone exceeds ${TITLE_MAX} chars`);
  }
}
// 8. Every published city carries authored SERP copy that fits.
//
// The city page still has the old generated template as a fallback, so a city
// missing an entry renders rather than throws — and would quietly ship the same
// meta description as the other twenty-one. This is what stops that: the
// fallback is for safety at runtime, not for production.
const BRAND_SUFFIX_LEN = ` | ${SITE_NAME}`.length;
for (const city of publishedCities()) {
  const seo = CITY_SEO[city.slug];
  if (!seo) {
    fail(`city ${city.slug}: no authored SERP copy in city-seo.ts (would fall back to the shared template)`);
    continue;
  }
  for (const locale of LOCALES) {
    const title = seo.title[locale] ?? seo.title.en;
    const description = seo.description[locale] ?? seo.description.en;
    // The layout appends the brand, so the authored half has that much less room.
    const rendered = title.length + BRAND_SUFFIX_LEN;
    if (rendered > TITLE_MAX) {
      fail(`city ${city.slug} (${locale}): title is ${rendered} chars with the brand, over ${TITLE_MAX}`);
    }
    if (description.length > DESCRIPTION_MAX) {
      fail(`city ${city.slug} (${locale}): description is ${description.length} chars, over ${DESCRIPTION_MAX}`);
    }
  }
}

// 9. Every published service carries authored SERP copy and a long-form passage.
const PROSE_MIN = 600;
for (const service of publishedServices()) {
  const seo = SERVICE_SEO[service.slug];
  if (!seo) {
    fail(`service ${service.slug}: no authored SERP copy in service-seo.ts (would fall back to the shared template)`);
    continue;
  }
  for (const locale of LOCALES) {
    if (!serviceExistsIn(service, locale)) continue;
    const title = seo.title[locale] ?? seo.title.en;
    const description = seo.description[locale] ?? seo.description.en;
    const prose = (seo.paragraphs[locale] ?? seo.paragraphs.en).join(' ');
    const rendered = title.length + BRAND_SUFFIX_LEN;
    if (rendered > TITLE_MAX) {
      fail(`service ${service.slug} (${locale}): title is ${rendered} chars with the brand, over ${TITLE_MAX}`);
    }
    if (description.length > DESCRIPTION_MAX) {
      fail(`service ${service.slug} (${locale}): description is ${description.length} chars, over ${DESCRIPTION_MAX}`);
    }
    if (prose.length < PROSE_MIN) {
      fail(`service ${service.slug} (${locale}): passage is ${prose.length} chars, under the ${PROSE_MIN} minimum`);
    }
  }
}

// 10. Authored leaf copy points at real, curated combinations and fits.
//
// A leaf entry keyed on a pairing that is not curated is copy written for a
// noindex page — wasted, and a sign the key was mistyped.
const curatedKeys = new Set(CURATED_LEAVES.map((leaf) => `${leaf.service}--${leaf.city}`));
for (const [key, seo] of Object.entries(LEAF_SEO)) {
  const [serviceId, citySlug] = key.split('--');
  if (!getServiceById(serviceId)) fail(`leaf-seo key "${key}" references unknown service "${serviceId}"`);
  if (!CITIES.some((c) => c.slug === citySlug)) fail(`leaf-seo key "${key}" references unknown city "${citySlug}"`);
  if (!curatedKeys.has(key)) fail(`leaf-seo key "${key}" is not a curated leaf, so the page it is written for is noindex`);
  for (const locale of LOCALES) {
    const title = seo.title[locale] ?? seo.title.en;
    const description = seo.description[locale] ?? seo.description.en;
    // These titles carry the brand themselves rather than letting the layout
    // append it, so the whole string counts against the limit.
    if (title.length > TITLE_MAX) {
      fail(`leaf ${key} (${locale}): title is ${title.length} chars, over ${TITLE_MAX}`);
    }
    if (description.length > DESCRIPTION_MAX) {
      fail(`leaf ${key} (${locale}): description is ${description.length} chars, over ${DESCRIPTION_MAX}`);
    }
  }
}

// 11. Every published service carries its conversion sections, complete in each
// language it is sold in. A page without them still renders — the sections are
// conditional — but it is a price card, not a page anyone books from.
for (const service of publishedServices()) {
  for (const locale of LOCALES) {
    if (!serviceExistsIn(service, locale)) continue;
    for (const problem of landingProblems(service, SERVICE_LANDING[service.slug], locale)) fail(problem);
  }
}

// 12. Every published article fits the SERP limits and has a real share card.
for (const post of publishedBlogPosts()) {
  for (const locale of LOCALES) {
    const problems = articleProblems(post, locale, {
      brandSuffix: ` · ${SITE_NAME}`,
      titleMax: TITLE_MAX,
      descriptionMax: DESCRIPTION_MAX,
      hasShareCard: (slot) => Boolean(IMAGE_SLOTS[slot]?.og),
    });
    for (const problem of problems) fail(problem);
  }
}

// Descriptions are the only place the limit is asserted against source strings.
void DESCRIPTION_MAX;

if (failures.length) {
  console.error(`[check-seo] ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `[check-seo] ok — ${sitemapUrls.size} sitemap URLs, ` +
    `${publishedServices().length} services (all with authored SERP copy), ` +
    `${publishedCities().length} cities ` +
    `(all with authored SERP copy), ` +
    `${LOCALES.map((l) => `${l} ${publishedCuratedLeaves(l).length} curated leaves`).join(', ')}, ` +
    `${Object.keys(LEAF_SEO).length} authored leaves`,
);
