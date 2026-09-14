/**
 * Build-time sitemap generator.
 *
 * Emits a plain static `public/sitemap.xml` (served verbatim by the CDN at
 * https://pavaphotos.com/sitemap.xml) instead of a Next.js dynamic/ISR metadata
 * route. A flat static file removes every moving part Google's fetcher can trip
 * on: no edge function, no on-demand revalidation, no `Vary` negotiation —
 * just `200 application/xml`.
 *
 * Format is deliberately minimal — the most universally accepted shape: one
 * `<url>` per localized canonical URL (every locale variant is a first-class
 * `<loc>` entry), carrying only `<loc>` + `<lastmod>`. Embedded `xhtml:link`
 * hreflang is intentionally omitted: every page already emits reciprocal
 * hreflang + canonical in its `<head>` via src/lib/seo.ts, so duplicating it
 * here adds nothing Google reads. `<changefreq>`/`<priority>` are dropped too
 * (Google ignores both).
 *
 * Reuses the same data + drip-publish + URL helpers the app uses. Runs on every
 * deploy via the `build` script. NOTE: because it is build-time, drip-published
 * pages enter the sitemap at the next build/deploy.
 *
 * Drip gating mirrors the app: it honours ROLLOUT_ENABLED / ROLLOUT_START /
 * ROLLOUT_WINDOW_DAYS and is active when NODE_ENV=production (as on Vercel).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  publishedServices,
  publishedCities,
  publishedBlogPosts,
  publishedCuratedLeaves,
  getServiceById,
  serviceSlug,
  serviceExistsIn,
} from '../src/lib/catalog';
import { LOCALES, type Locale } from '../src/lib/locales';
import { absoluteUrl } from '../src/lib/urls';
import type { AppPathname, RouteParams } from '../src/i18n/pathnames';
import {
  servicePublishDate,
  cityPublishDate,
  blogPublishDate,
  leafPublishDate,
  latestPublishDate,
} from '../src/lib/publishSchedule';

/**
 * One sitemap row. Locale-bearing, because a service offered in only one
 * language must not appear under the other, and because translated slugs mean
 * the params differ per locale.
 */
interface Entry {
  locale: Locale;
  route: AppPathname;
  params?: RouteParams;
  lastModified: Date;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const STATIC_ROUTES: AppPathname[] = [
  '/',
  '/services',
  '/cities',
  '/pricing',
  '/portfolio',
  '/reviews',
  '/about',
  '/contact',
  '/blog',
  '/book',
];

function buildEntries(): Entry[] {
  const hubLastmod = latestPublishDate();
  const entries: Entry[] = [];

  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({ locale, route, lastModified: hubLastmod });
    }

    for (const service of publishedServices()) {
      if (!serviceExistsIn(service, locale)) continue;
      entries.push({
        locale,
        route: '/services/[service]',
        params: { service: serviceSlug(service, locale) },
        lastModified: servicePublishDate(service.slug),
      });
    }

    for (const city of publishedCities()) {
      entries.push({
        locale,
        route: '/cities/[city]',
        params: { city: city.slug },
        lastModified: cityPublishDate(city.slug),
      });
    }

    for (const post of publishedBlogPosts()) {
      entries.push({
        locale,
        route: '/blog/[slug]',
        params: { slug: post.slug },
        lastModified: blogPublishDate(post.slug),
      });
    }

    // Curated leaves only. The long tail renders on demand but is noindex, and
    // a sitemap entry for a noindex page is a contradiction Google reports back.
    for (const { serviceId, city } of publishedCuratedLeaves(locale)) {
      const entity = getServiceById(serviceId);
      if (!entity) continue;
      entries.push({
        locale,
        route: '/services/[service]/[city]',
        params: { service: serviceSlug(entity, locale), city },
        lastModified: leafPublishDate(serviceId, city),
      });
    }
  }

  return entries;
}

/**
 * One `<url>` block per locale variant of a route, so every localized canonical
 * URL is a first-class sitemap entry. Carries only `<loc>` + `<lastmod>`.
 */
function renderUrls(entry: Entry): string {
  return [
    '<url>',
    `<loc>${esc(absoluteUrl(entry.locale, entry.route, entry.params))}</loc>`,
    // Date-only W3C format — matches Google's documented examples (no milliseconds).
    `<lastmod>${ymd(entry.lastModified)}</lastmod>`,
    '</url>',
  ].join('\n');
}

/** W3C date-only (YYYY-MM-DD), the most universally accepted `<lastmod>` form. */
function ymd(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function renderSitemap(entries: Entry[]): string {
  const body = entries.map(renderUrls).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    '</urlset>',
    '',
  ].join('\n');
}

function main(): void {
  const entries = buildEntries();
  const outDir = join(process.cwd(), 'public');
  mkdirSync(outDir, { recursive: true });

  writeFileSync(join(outDir, 'sitemap.xml'), renderSitemap(entries), 'utf8');

  // Entries are already locale-bearing — one row is one URL.
  const perLocale = LOCALES.map(
    (locale) => `${locale} ${entries.filter((e) => e.locale === locale).length}`,
  ).join(', ');
  console.log(`[sitemap] wrote ${entries.length} URLs (${perLocale}) → public/sitemap.xml`);
}

main();
