import { CITIES, SERVICES, BLOG_POSTS, REVIEWS, CATEGORY_LABELS, PHOTOGRAPHERS } from './data';
import type { City, Service, BlogPost, Review, ServiceCategory, Photographer } from './types';
import { LOCALES, tx, type Locale } from './locales';
import {
  isServicePublished,
  isCityPublished,
  isBlogPostPublished,
  isLeafPublished,
} from './publishSchedule';
import { isIndexableLeaf } from './curated';

export { CITIES, SERVICES, BLOG_POSTS, REVIEWS, CATEGORY_LABELS, PHOTOGRAPHERS };

// ---------------------------------------------------------------------------
// Slug indexes, built once at module load.
//
// A duplicate slug within one locale would make two services share a URL and
// silently render whichever the Map kept. Throwing here fails `next build`
// loudly instead, at the first import.
// ---------------------------------------------------------------------------

const SERVICE_BY_ID: ReadonlyMap<string, Service> = new Map(SERVICES.map((s) => [s.slug, s]));

function byLocale<T>(build: (locale: Locale) => T): Readonly<Record<Locale, T>> {
  const out = {} as Record<Locale, T>;
  for (const locale of LOCALES) out[locale] = build(locale);
  return out;
}

const SERVICES_BY_LOCALE = byLocale<readonly Service[]>((locale) =>
  SERVICES.filter((s) => (s.availableIn ?? LOCALES).includes(locale)),
);

const SERVICE_BY_LOCALE_SLUG = byLocale<ReadonlyMap<string, Service>>((locale) => {
  const map = new Map<string, Service>();
  for (const service of SERVICES_BY_LOCALE[locale]) {
    const slug = service.slugs?.[locale] ?? service.slug;
    const clash = map.get(slug);
    if (clash) {
      throw new Error(
        `Duplicate service slug "${slug}" in locale "${locale}": ` +
          `"${clash.slug}" and "${service.slug}" would share a URL.`,
      );
    }
    map.set(slug, service);
  }
  return map;
});

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/**
 * Look a service up by its stable identity, ignoring language. Use this for
 * JSON-LD @ids, publish-schedule keys and `city.topServices` — anywhere the
 * value came from our own data rather than from a URL.
 */
export function getServiceById(id: string): Service | undefined {
  return SERVICE_BY_ID.get(id);
}

/** The URL slug this service uses in `locale`. */
export function serviceSlug(service: Service, locale: Locale): string {
  return service.slugs?.[locale] ?? service.slug;
}

/** Locales this service is offered in. */
export function serviceLocales(service: Service): readonly Locale[] {
  return service.availableIn ?? LOCALES;
}

export function serviceExistsIn(service: Service, locale: Locale): boolean {
  return serviceLocales(service).includes(locale);
}

/** Whether this service is sold in this place at all — see `Service.onlyIn`. */
export function serviceSoldIn(service: Service, citySlug: string): boolean {
  return !service.onlyIn || service.onlyIn.includes(citySlug);
}

/** Whether `service × city` is a page in `locale`, published or not. */
export function leafExists(service: Service, citySlug: string, locale: Locale): boolean {
  return serviceExistsIn(service, locale) && serviceSoldIn(service, citySlug) && Boolean(getCity(citySlug));
}

/**
 * Resolve a slug taken from a URL, in the locale that URL was served in.
 *
 * Locale-scoped on purpose. `getServiceBySlug('mariage', 'en')` returns
 * undefined so /services/mariage/paris 404s instead of quietly serving the
 * French page's content at an English URL with no canonical between them.
 */
export function getServiceBySlug(slug: string, locale: Locale): Service | undefined {
  return SERVICE_BY_LOCALE_SLUG[locale].get(slug);
}

/**
 * Resolve a slug that arrived without a locale — a form submission, say —
 * by trying every locale. Never use this for routing: a URL always knows the
 * locale it was served in, and must use `getServiceBySlug`.
 */
export function getServiceByAnySlug(slug: string): Service | undefined {
  for (const locale of LOCALES) {
    const found = SERVICE_BY_LOCALE_SLUG[locale].get(slug);
    if (found) return found;
  }
  return undefined;
}

/** Services offered in `locale`, in catalogue order. */
export function servicesFor(locale: Locale): readonly Service[] {
  return SERVICES_BY_LOCALE[locale];
}

/**
 * A city's name as `locale` writes it.
 *
 * `City.name` is the Portuguese form and the canonical one — it keys the
 * JSON-LD @ids, the image paths and the publish schedule — so it cannot also
 * be the thing shown to an English reader who searches for Lisbon, not Lisboa.
 * France never forced this distinction, because Paris is Paris.
 */
export function localizedCityName(city: City, locale: Locale): string {
  return city.nameLocalized ? tx(city.nameLocalized, locale) : city.name;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug);
}

export function getCategoryLabel(category: ServiceCategory, locale: Locale): string {
  return CATEGORY_LABELS[locale][category];
}

/** Services grouped by category, preserving SERVICES order. */
export function servicesByCategory(): Map<ServiceCategory, Service[]> {
  const map = new Map<ServiceCategory, Service[]>();
  for (const service of SERVICES) {
    const list = map.get(service.category) ?? [];
    list.push(service);
    map.set(service.category, list);
  }
  return map;
}

export interface LeafParam {
  service: string;
  city: string;
}

/**
 * Tailored leaf combinations: each city's curated `topServices` intersected with
 * the real SERVICES catalog. These are the prioritized "money pages" we SSG.
 */
export function getTailoredLeafParams(): LeafParam[] {
  const params: LeafParam[] = [];
  for (const city of CITIES) {
    for (const serviceSlug of city.topServices) {
      if (getServiceById(serviceSlug)) {
        params.push({ service: serviceSlug, city: city.slug });
      }
    }
  }
  return params;
}

/** A leaf is valid when both slugs resolve to real catalog entries. */
export function isValidLeaf(serviceSlug: string, citySlug: string): boolean {
  return Boolean(getServiceById(serviceSlug) && getCity(citySlug));
}

/**
 * The counts a trust bar may show, computed rather than typed.
 *
 * The session count is per language. The catalogue holds 22 services but
 * each language offers 18 of them, and "22 session types" on a page that
 * links to 18 is a number the reader can check and find wrong.
 */
export function trustStats(locale: Locale): { places: number; sessionTypes: number } {
  return { places: CITIES.length, sessionTypes: servicesFor(locale).length };
}

export function getReviewsForCity(citySlug: string): Review[] {
  return REVIEWS.filter((r) => r.citySlug === citySlug);
}

export function getAggregateRating(): { ratingValue: number; reviewCount: number } {
  if (REVIEWS.length === 0) {
    return { ratingValue: 0, reviewCount: 0 };
  }
  const total = REVIEWS.reduce((sum, r) => sum + r.stars, 0);
  const ratingValue = Math.round((total / REVIEWS.length) * 10) / 10;
  return { ratingValue, reviewCount: REVIEWS.length };
}

// ---------------------------------------------------------------------------
// Gradual-rollout ("drip publishing") accessors.
//
// These return only the entries whose scheduled publish slot has passed (see
// publishSchedule.ts). Use them anywhere a page is listed, linked, or emitted
// to the sitemap so unpublished pages are never surfaced before their date.
// The raw arrays / getCity-style lookups stay unfiltered; page components do
// their own publish check + notFound() to gate direct requests.
// ---------------------------------------------------------------------------

/**
 * Pass `locale` wherever the result is rendered as links. A service offered in
 * one language only has no page in the other, so an unfiltered list links a
 * Portuguese reader to /fotografo/portrait and an English one to
 * /services/batizado — both 404.
 */
export function publishedServices(locale?: Locale, now?: Date): Service[] {
  return SERVICES.filter(
    (s) => isServicePublished(s.slug, now) && (!locale || serviceExistsIn(s, locale)),
  );
}

export function publishedCities(now?: Date): City[] {
  return CITIES.filter((c) => isCityPublished(c.slug, now));
}

export function publishedBlogPosts(now?: Date): BlogPost[] {
  return BLOG_POSTS.filter((b) => isBlogPostPublished(b.slug, now));
}

/** Published services grouped by category, preserving SERVICES order. */
export function publishedServicesByCategory(locale?: Locale, now?: Date): Map<ServiceCategory, Service[]> {
  const map = new Map<ServiceCategory, Service[]>();
  for (const service of publishedServices(locale, now)) {
    const list = map.get(service.category) ?? [];
    list.push(service);
    map.set(service.category, list);
  }
  return map;
}

/** Tailored leaf params whose leaf page is currently published. */
export function publishedTailoredLeafParams(now?: Date): LeafParam[] {
  return getTailoredLeafParams().filter((p) => isLeafPublished(p.service, p.city, now));
}

/**
 * Every published leaf for one locale, as route params — the prerender list.
 *
 * Wider than the indexable set only while a pairing lacks authored copy, which
 * the build does not allow: `isLeafPublished` is true for any pairing outside
 * the drip schedule, city pages link to all of them, and refusing to render
 * one would 404 the site's own links. Authored copy decides `noindex` and the
 * sitemap; this decides what exists.
 */
export function publishedLeafParams(locale: Locale, now?: Date): LeafParam[] {
  const params: LeafParam[] = [];
  for (const service of SERVICES) {
    if (!serviceExistsIn(service, locale)) continue;
    for (const city of CITIES) {
      if (!serviceSoldIn(service, city.slug)) continue;
      if (!isLeafPublished(service.slug, city.slug, now)) continue;
      params.push({ service: serviceSlug(service, locale), city: city.slug });
    }
  }
  return params;
}

/** Published leaves with authored copy in `locale`, as stable ids — the sitemap's leaf rows. */
export function publishedIndexableLeaves(
  locale: Locale,
  now?: Date,
): Array<{ serviceId: string; city: string }> {
  const out: Array<{ serviceId: string; city: string }> = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      if (!leafExists(service, city.slug, locale)) continue;
      if (!isIndexableLeaf(service.slug, city.slug, locale)) continue;
      if (!isLeafPublished(service.slug, city.slug, now)) continue;
      out.push({ serviceId: service.slug, city: city.slug });
    }
  }
  return out;
}

export { isIndexableLeaf };

/** Cities for which the `service × city` leaf is published (live links only). */
export function publishedCitiesForService(serviceSlug: string, now?: Date): City[] {
  const service = getServiceById(serviceSlug);
  return CITIES.filter(
    (c) => (!service || serviceSoldIn(service, c.slug)) && isLeafPublished(serviceSlug, c.slug, now),
  );
}

/** Services for which the `service × city` leaf is published (live links only). */
export function publishedServicesForCity(citySlug: string, locale?: Locale, now?: Date): Service[] {
  return SERVICES.filter(
    (s) =>
      serviceSoldIn(s, citySlug) &&
      isLeafPublished(s.slug, citySlug, now) &&
      (!locale || serviceExistsIn(s, locale)),
  );
}

// ---------------------------------------------------------------------------
// Photographers.
//
// Validated at module load, like the service slugs: a profile naming a city
// or a service that does not exist would link to a 404 from a page that
// exists only to be trusted.
// ---------------------------------------------------------------------------

export function validatePhotographers(list: readonly Photographer[]): void {
  const seen = new Set<string>();
  for (const p of list) {
    if (seen.has(p.slug)) throw new Error(`Duplicate photographer slug "${p.slug}".`);
    seen.add(p.slug);
    if (p.cities.length === 0) throw new Error(`Photographer "${p.slug}" works in no city.`);
    for (const city of p.cities) {
      if (!getCity(city)) throw new Error(`Photographer "${p.slug}" names unknown city "${city}".`);
    }
    for (const service of p.services) {
      if (!getServiceById(service)) throw new Error(`Photographer "${p.slug}" names unknown service "${service}".`);
    }
  }
}

validatePhotographers(PHOTOGRAPHERS);

/** Whether any photographer surface should be shown at all. */
export function hasPhotographers(): boolean {
  return PHOTOGRAPHERS.length > 0;
}

export function getPhotographer(slug: string): Photographer | undefined {
  return PHOTOGRAPHERS.find((p) => p.slug === slug);
}

export function photographersIn(citySlug: string): Photographer[] {
  return PHOTOGRAPHERS.filter((p) => p.cities.includes(citySlug));
}

export function photographersFor(serviceId: string): Photographer[] {
  return PHOTOGRAPHERS.filter((p) => p.services.includes(serviceId));
}
