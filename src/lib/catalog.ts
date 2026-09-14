import { CITIES, SERVICES, BLOG_POSTS, REVIEWS, CATEGORY_LABELS } from './data';
import type { City, Service, BlogPost, Review, ServiceCategory } from './types';
import { LOCALES, tx, type Locale } from './locales';
import {
  isServicePublished,
  isCityPublished,
  isBlogPostPublished,
  isLeafPublished,
} from './publishSchedule';
import { curatedLeaves, isCuratedLeaf } from './curated';

export { CITIES, SERVICES, BLOG_POSTS, REVIEWS, CATEGORY_LABELS };

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

export function publishedServices(now?: Date): Service[] {
  return SERVICES.filter((s) => isServicePublished(s.slug, now));
}

export function publishedCities(now?: Date): City[] {
  return CITIES.filter((c) => isCityPublished(c.slug, now));
}

export function publishedBlogPosts(now?: Date): BlogPost[] {
  return BLOG_POSTS.filter((b) => isBlogPostPublished(b.slug, now));
}

/** Published services grouped by category, preserving SERVICES order. */
export function publishedServicesByCategory(now?: Date): Map<ServiceCategory, Service[]> {
  const map = new Map<ServiceCategory, Service[]>();
  for (const service of publishedServices(now)) {
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
 * Curated, published leaves for one locale, with the service slug already
 * localized — the exact set to prerender and to put in the sitemap.
 *
 * There is no accessor for "every valid combination" on purpose. The long tail
 * is reachable and rendered on demand, but it is noindex, and an enumeration of
 * it is only ever useful for putting it somewhere it does not belong.
 */
export function publishedCuratedLeafParams(locale: Locale, now?: Date): LeafParam[] {
  const params: LeafParam[] = [];
  for (const leaf of curatedLeaves(locale)) {
    const service = getServiceById(leaf.service);
    if (!service || !serviceExistsIn(service, locale)) continue;
    if (!getCity(leaf.city)) continue;
    if (!isLeafPublished(leaf.service, leaf.city, now)) continue;
    params.push({ service: serviceSlug(service, locale), city: leaf.city });
  }
  return params;
}

/** Curated, published leaves for one locale, as stable ids. */
export function publishedCuratedLeaves(
  locale: Locale,
  now?: Date,
): Array<{ serviceId: string; city: string }> {
  const out: Array<{ serviceId: string; city: string }> = [];
  for (const leaf of curatedLeaves(locale)) {
    const service = getServiceById(leaf.service);
    if (!service || !serviceExistsIn(service, locale)) continue;
    if (!getCity(leaf.city)) continue;
    if (!isLeafPublished(leaf.service, leaf.city, now)) continue;
    out.push({ serviceId: leaf.service, city: leaf.city });
  }
  return out;
}

export { isCuratedLeaf };

/** Cities for which the `service × city` leaf is published (live links only). */
export function publishedCitiesForService(serviceSlug: string, now?: Date): City[] {
  return CITIES.filter((c) => isLeafPublished(serviceSlug, c.slug, now));
}

/** Services for which the `service × city` leaf is published (live links only). */
export function publishedServicesForCity(citySlug: string, now?: Date): Service[] {
  return SERVICES.filter((s) => isLeafPublished(s.slug, citySlug, now));
}
