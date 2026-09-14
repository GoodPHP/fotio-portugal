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
export const CURATED_LEAVES: readonly CuratedLeaf[] = [
  // Paris — the largest market for every category at once.
  { service: 'paris-photoshoot', city: 'paris' },
  { service: 'eiffel-tower-session', city: 'paris' },
  { service: 'proposal', city: 'paris' },
  { service: 'couple', city: 'paris' },
  { service: 'engagement', city: 'paris' },
  { service: 'family', city: 'paris' },
  { service: 'headshots', city: 'paris' },
  { service: 'personal-brand', city: 'paris' },
  { service: 'corporate-event', city: 'paris' },
  { service: 'wedding', city: 'paris' },
  { service: 'maternity', city: 'paris' },
  { service: 'real-estate', city: 'paris' },
  { service: 'food', city: 'paris' },
  { service: 'book-comedien', city: 'paris' },
  { service: 'evjf', city: 'paris' },

  // Lyon — weekday corporate demand, weekend family and weddings.
  { service: 'headshots', city: 'lyon' },
  { service: 'corporate-event', city: 'lyon' },
  { service: 'personal-brand', city: 'lyon' },
  { service: 'wedding', city: 'lyon' },
  { service: 'family', city: 'lyon' },
  { service: 'couple', city: 'lyon' },
  { service: 'portrait', city: 'lyon' },
  { service: 'real-estate', city: 'lyon' },
  { service: 'food', city: 'lyon' },

  // Marseille
  { service: 'couple', city: 'marseille' },
  { service: 'family', city: 'marseille' },
  { service: 'wedding', city: 'marseille' },
  { service: 'headshots', city: 'marseille' },
  { service: 'proposal', city: 'marseille' },
  { service: 'food', city: 'marseille' },

  // Bordeaux — château weddings and the city's corporate base.
  { service: 'wedding', city: 'bordeaux' },
  { service: 'couple', city: 'bordeaux' },
  { service: 'engagement', city: 'bordeaux' },
  { service: 'family', city: 'bordeaux' },
  { service: 'headshots', city: 'bordeaux' },
  { service: 'proposal', city: 'bordeaux' },
  { service: 'real-estate', city: 'bordeaux' },

  // Toulouse
  { service: 'headshots', city: 'toulouse' },
  { service: 'family', city: 'toulouse' },
  { service: 'couple', city: 'toulouse' },
  { service: 'wedding', city: 'toulouse' },
  { service: 'book-comedien', city: 'toulouse' },
  { service: 'portrait', city: 'toulouse' },

  // Nice — the inbound honeymoon market.
  { service: 'riviera-honeymoon', city: 'nice' },
  { service: 'couple', city: 'nice' },
  { service: 'proposal', city: 'nice' },
  { service: 'engagement', city: 'nice' },
  { service: 'family', city: 'nice' },
  { service: 'wedding', city: 'nice' },
  { service: 'vacation', city: 'nice' },

  // Lille
  { service: 'headshots', city: 'lille' },
  { service: 'family', city: 'lille' },
  { service: 'couple', city: 'lille' },
  { service: 'wedding', city: 'lille' },
  { service: 'christening', city: 'lille' },
  { service: 'corporate-event', city: 'lille' },

  // Nantes
  { service: 'wedding', city: 'nantes' },
  { service: 'family', city: 'nantes' },
  { service: 'couple', city: 'nantes' },
  { service: 'headshots', city: 'nantes' },
  { service: 'maternity', city: 'nantes' },

  // Strasbourg
  { service: 'couple', city: 'strasbourg' },
  { service: 'proposal', city: 'strasbourg' },
  { service: 'family', city: 'strasbourg' },
  { service: 'corporate-event', city: 'strasbourg' },
  { service: 'headshots', city: 'strasbourg' },
  { service: 'engagement', city: 'strasbourg' },

  // Montpellier
  { service: 'family', city: 'montpellier' },
  { service: 'couple', city: 'montpellier' },
  { service: 'headshots', city: 'montpellier' },
  { service: 'wedding', city: 'montpellier' },
  { service: 'evjf', city: 'montpellier' },
  { service: 'maternity', city: 'montpellier' },

  // Aix-en-Provence — the destination-wedding centre of gravity.
  { service: 'provence-destination-wedding', city: 'aix-en-provence' },
  { service: 'wedding', city: 'aix-en-provence' },
  { service: 'elopement', city: 'aix-en-provence' },
  { service: 'couple', city: 'aix-en-provence' },
  { service: 'engagement', city: 'aix-en-provence' },
  { service: 'vacation', city: 'aix-en-provence' },

  // Avignon
  { service: 'wedding', city: 'avignon' },
  { service: 'couple', city: 'avignon' },
  { service: 'elopement', city: 'avignon' },
  { service: 'vacation', city: 'avignon' },

  // Cannes
  { service: 'riviera-honeymoon', city: 'cannes' },
  { service: 'couple', city: 'cannes' },
  { service: 'proposal', city: 'cannes' },
  { service: 'wedding', city: 'cannes' },
  { service: 'fashion-editorial', city: 'cannes' },

  // Saint-Tropez
  { service: 'riviera-honeymoon', city: 'saint-tropez' },
  { service: 'couple', city: 'saint-tropez' },
  { service: 'wedding', city: 'saint-tropez' },
  { service: 'proposal', city: 'saint-tropez' },

  // Annecy
  { service: 'couple', city: 'annecy' },
  { service: 'proposal', city: 'annecy' },
  { service: 'wedding', city: 'annecy' },
  { service: 'engagement', city: 'annecy' },
  { service: 'family', city: 'annecy' },

  // Chamonix
  { service: 'french-alps-elopement', city: 'chamonix' },
  { service: 'elopement', city: 'chamonix' },
  { service: 'couple', city: 'chamonix' },
  { service: 'proposal', city: 'chamonix' },
  { service: 'wedding', city: 'chamonix' },

  // Colmar
  { service: 'couple', city: 'colmar' },
  { service: 'proposal', city: 'colmar' },
  { service: 'engagement', city: 'colmar' },
  { service: 'vacation', city: 'colmar' },

  // Mont-Saint-Michel
  { service: 'couple', city: 'mont-saint-michel' },
  { service: 'proposal', city: 'mont-saint-michel' },
  { service: 'elopement', city: 'mont-saint-michel' },
  { service: 'vacation', city: 'mont-saint-michel' },

  // Étretat
  { service: 'couple', city: 'etretat' },
  { service: 'proposal', city: 'etretat' },
  { service: 'elopement', city: 'etretat' },
  { service: 'engagement', city: 'etretat' },

  // Biarritz
  { service: 'couple', city: 'biarritz' },
  { service: 'wedding', city: 'biarritz' },
  { service: 'family', city: 'biarritz' },
  { service: 'proposal', city: 'biarritz' },

  // Carcassonne
  { service: 'couple', city: 'carcassonne' },
  { service: 'wedding', city: 'carcassonne' },
  { service: 'proposal', city: 'carcassonne' },

  // Reims — the champagne houses, and the corporate work that follows them.
  { service: 'wedding', city: 'reims' },
  { service: 'couple', city: 'reims' },
  { service: 'corporate-event', city: 'reims' },
  { service: 'food', city: 'reims' },
];

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
