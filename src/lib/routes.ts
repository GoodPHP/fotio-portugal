/**
 * Catalogue to route glue.
 *
 * `urls.ts` knows how to build a URL from a route key and some params, but
 * nothing about services or cities. This module bridges the two, so no page has
 * to assemble a `paramsByLocale` object by hand — and, more to the point, so the
 * canonical URL, the hreflang alternates and the internal links to a page are
 * all derived from one function rather than three hand-written literals.
 */
import type { BlogPost, City, Service } from './types';
import { LOCALES, type Locale } from './locales';
import { getServiceById, serviceExistsIn, serviceSlug, serviceLocales } from './catalog';
import type { AlternateParams } from './urls';

/** Locales a service page exists in, with its slug in each. */
export function serviceAlternateParams(service: Service): AlternateParams {
  const out: AlternateParams = {};
  for (const locale of serviceLocales(service)) {
    out[locale] = { service: serviceSlug(service, locale) };
  }
  return out;
}

/**
 * Locales a `service × city` page exists in. Cities are everywhere — their
 * slugs are proper nouns and identical in both languages — so this follows the
 * service's availability.
 */
export function leafAlternateParams(service: Service, city: City): AlternateParams {
  const out: AlternateParams = {};
  for (const locale of serviceLocales(service)) {
    out[locale] = { service: serviceSlug(service, locale), city: city.slug };
  }
  return out;
}

/** City pages exist in every locale. */
export function cityAlternateParams(city: City): AlternateParams {
  return Object.fromEntries(LOCALES.map((locale) => [locale, { city: city.slug }]));
}

/** Blog posts exist in every locale. */
export function blogAlternateParams(post: BlogPost): AlternateParams {
  return Object.fromEntries(LOCALES.map((locale) => [locale, { slug: post.slug }]));
}

// ---------------------------------------------------------------------------
// Typed hrefs for next-intl's <Link>.
//
// With `pathnames` configured, Link takes a route key plus params rather than a
// finished path, and resolves the localized segments itself.
// ---------------------------------------------------------------------------

export function serviceHref(service: Service, locale: Locale) {
  return {
    pathname: '/services/[service]',
    params: { service: serviceSlug(service, locale) },
  } as const;
}

export function leafHref(service: Service, city: City, locale: Locale) {
  return {
    pathname: '/services/[service]/[city]',
    params: { service: serviceSlug(service, locale), city: city.slug },
  } as const;
}

export function cityHref(city: City) {
  return { pathname: '/cities/[city]', params: { city: city.slug } } as const;
}

export function blogHref(slug: string) {
  return { pathname: '/blog/[slug]', params: { slug } } as const;
}

// ---------------------------------------------------------------------------
// Slug-only variants, for client components that receive projected data rather
// than whole catalogue entries. The slug they are given must already be the one
// for the locale being rendered.
// ---------------------------------------------------------------------------

export function serviceHrefBySlug(slug: string) {
  return { pathname: '/services/[service]', params: { service: slug } } as const;
}

export function cityHrefBySlug(slug: string) {
  return { pathname: '/cities/[city]', params: { city: slug } } as const;
}

/** Route keys that take no dynamic segments. */
const STATIC_ROUTES = [
  '/',
  '/services',
  '/cities',
  '/pricing',
  '/portfolio',
  '/reviews',
  '/about',
  '/contact',
  '/book',
  '/blog',
] as const;

type StaticRoute = (typeof STATIC_ROUTES)[number];

function isStaticRoute(path: string): path is StaticRoute {
  return (STATIC_ROUTES as readonly string[]).includes(path);
}

export type ContentHref =
  | StaticRoute
  | ReturnType<typeof serviceHrefBySlug>
  | ReturnType<typeof cityHrefBySlug>
  | ReturnType<typeof leafHref>
  | ReturnType<typeof blogHref>;

/**
 * Resolve a link written inside authored prose — a blog body, say — into a
 * typed route.
 *
 * Content is authored with English paths, because that is what the writer sees
 * in the address bar. Handing that string straight to `<Link>` would send a
 * Portuguese reader to an English URL, so it is parsed back into a route key
 * and params and re-localized at render.
 *
 * Localizing the route key is not enough on its own: the service segment is a
 * catalogue id, and a Portuguese article linking `/services/family` needs
 * `/fotografo/fotografo-de-familia`, not `/fotografo/family`, which 404s.
 *
 * Returns null for anything unrecognized, and for a service with no page in
 * `locale`, which the caller renders as a plain anchor rather than guessing.
 */
export function contentHref(path: string, locale: Locale): ContentHref | null {
  const clean = path.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
  if (isStaticRoute(clean)) return clean;

  const parts = clean.split('/').filter(Boolean);
  if (parts.length === 2 && parts[0] === 'cities') return cityHrefBySlug(parts[1]);
  if (parts.length === 2 && parts[0] === 'blog') return blogHref(parts[1]);
  if (parts[0] !== 'services' || (parts.length !== 2 && parts.length !== 3)) return null;

  const service = getServiceById(parts[1]);
  if (!service || !serviceExistsIn(service, locale)) return null;
  const slug = serviceSlug(service, locale);
  if (parts.length === 2) return serviceHrefBySlug(slug);
  return {
    pathname: '/services/[service]/[city]',
    params: { service: slug, city: parts[2] },
  } as const;
}
