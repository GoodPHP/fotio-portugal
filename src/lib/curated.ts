import type { Locale } from './locales';

/**
 * The `service × city` pages we have actually written.
 *
 * There are 30 services and 20-odd cities, so the full matrix is ~600 pages per
 * language. Publishing all of them from one template is what produced the thin
 * content this site is being rebuilt to avoid: 600 pages that differ only in
 * two proper nouns are 600 pages Google has no reason to index.
 *
 * So indexation is a decision made here, per combination, rather than derived
 * from the matrix. A curated leaf is prerendered, listed in the sitemap and
 * indexable. Every other valid combination still renders — a reader who follows
 * a link to it gets a real page — but carries `noindex, follow`, stays out of
 * the sitemap, and passes its link equity on to the pages that earned it.
 *
 * This is deliberately kept apart from `City.topServices`, which is editorial
 * link priority: which services a city page puts forward. The two overlap today
 * but answer different questions, and conflating them is how a link rail ends
 * up dictating what gets indexed.
 */
export interface CuratedLeaf {
  /** Canonical service id, not a localized slug. */
  service: string;
  /** City slug — identical across locales. */
  city: string;
  /** Locales this page is written in. Omit for every locale the service exists in. */
  locales?: readonly Locale[];
}

/**
 * Chosen by demand rather than by matrix.
 *
 * Each entry is a combination somebody actually searches for: wedding work
 * where the venues are, corporate work where the offices are, honeymoons and
 * proposals where people travel to. The locale-restricted services carry their
 * restriction implicitly — a leaf for an English-only service is only ever
 * built in English, because `serviceExistsIn` filters it.
 */
export const CURATED_LEAVES: readonly CuratedLeaf[] = [];

const CURATED_KEYS: ReadonlySet<string> = new Set(
  CURATED_LEAVES.map((leaf) => `${leaf.service}/${leaf.city}`),
);

const CURATED_LOCALES: ReadonlyMap<string, readonly Locale[] | undefined> = new Map(
  CURATED_LEAVES.map((leaf) => [`${leaf.service}/${leaf.city}`, leaf.locales]),
);

/**
 * Whether this combination has authored copy in `locale` — and so whether it
 * belongs in the index and the sitemap.
 */
export function isCuratedLeaf(serviceId: string, citySlug: string, locale: Locale): boolean {
  const key = `${serviceId}/${citySlug}`;
  if (!CURATED_KEYS.has(key)) return false;
  const locales = CURATED_LOCALES.get(key);
  return locales === undefined || locales.includes(locale);
}

/** Curated leaves for one locale. */
export function curatedLeaves(locale: Locale): readonly CuratedLeaf[] {
  return CURATED_LEAVES.filter((leaf) => leaf.locales === undefined || leaf.locales.includes(locale));
}
