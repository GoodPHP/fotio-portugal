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
  publishedIndexableLeaves,
  leafExists,
  publishedBlogPosts,
  getServiceById,
  serviceSlug,
  serviceExistsIn,
  isIndexableLeaf,
  CITIES,
  SERVICES,
} from '../src/lib/catalog';
import { serviceAlternateParams, leafAlternateParams } from '../src/lib/routes';
import { TITLE_MAX, DESCRIPTION_MAX } from '../src/lib/seo-text';
import { CITY_SEO } from '../src/lib/data/city-seo';
import { SERVICE_SEO } from '../src/lib/data/service-seo';
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

// 4. Every leaf with authored copy must be in the sitemap, in a reciprocal
// hreflang cluster.
for (const locale of LOCALES) {
  for (const { serviceId, city } of publishedIndexableLeaves(locale)) {
    const service = getServiceById(serviceId)!;
    const url = absoluteUrl(locale, '/services/[service]/[city]', {
      service: serviceSlug(service, locale),
      city,
    });
    if (!sitemapUrls.has(url)) fail(`indexable leaf missing from sitemap: ${url}`);
    checkCluster(`leaf ${serviceId}/${city}`, languageAlternates('/services/[service]/[city]', leafAlternateParams(service, getCityOrThrow(city))));
  }
}

function getCityOrThrow(slug: string) {
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) throw new Error(`unknown city ${slug}`);
  return city;
}

// 5. No leaf without authored copy — noindex — may appear in the sitemap, and
// no pairing that is not a page at all.
for (const locale of LOCALES) {
  for (const service of SERVICES) {
    if (!serviceExistsIn(service, locale)) continue;
    for (const city of CITIES) {
      if (leafExists(service, city.slug, locale) && isIndexableLeaf(service.slug, city.slug, locale)) continue;
      const url = absoluteUrl(locale, '/services/[service]/[city]', {
        service: serviceSlug(service, locale),
        city: city.slug,
      });
      if (sitemapUrls.has(url)) fail(`non-indexable leaf listed in sitemap: ${url}`);
    }
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

// 10. Leaf copy — presence, SERP limits, uniqueness — is `check-leaf-copy.ts`.

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
    `${LOCALES.map((l) => `${l} ${publishedIndexableLeaves(l).length} indexable leaves`).join(', ')}`,
);
