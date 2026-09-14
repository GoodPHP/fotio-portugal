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
  // Lisboa — the largest market for every category at once, and the only city
  // here with both a tourist and a corporate side of any size.
  { service: 'lisbon-photoshoot', city: 'lisboa' },
  { service: 'couple', city: 'lisboa' },
  { service: 'proposal', city: 'lisboa' },
  { service: 'vacation', city: 'lisboa' },
  { service: 'family', city: 'lisboa' },
  { service: 'headshots', city: 'lisboa' },
  { service: 'personal-brand', city: 'lisboa' },
  { service: 'digital-nomad-headshots', city: 'lisboa' },
  { service: 'wedding', city: 'lisboa' },
  { service: 'maternity', city: 'lisboa' },
  { service: 'real-estate', city: 'lisboa' },
  { service: 'food', city: 'lisboa' },
  { service: 'eventos-de-empresa', city: 'lisboa' },

  // Porto — domestic life events and the corporate work of the Norte, plus a
  // graduation season of its own.
  { service: 'couple', city: 'porto' },
  { service: 'wedding', city: 'porto' },
  { service: 'finalistas', city: 'porto' },
  { service: 'family', city: 'porto' },
  { service: 'headshots', city: 'porto' },
  { service: 'proposal', city: 'porto' },
  { service: 'vacation', city: 'porto' },
  { service: 'batizado', city: 'porto' },
  { service: 'food', city: 'porto' },
  { service: 'eventos-de-empresa', city: 'porto' },

  // Sintra — almost entirely inbound: couples who came for the palaces.
  { service: 'couple', city: 'sintra' },
  { service: 'elopement', city: 'sintra' },
  { service: 'proposal', city: 'sintra' },
  { service: 'vacation', city: 'sintra' },
  { service: 'wedding', city: 'sintra' },
  { service: 'destination-wedding', city: 'sintra' },
  { service: 'honeymoon', city: 'sintra' },
  { service: 'family', city: 'sintra' },

  // Cascais — expatriate families and second homes, thirty-three minutes out.
  { service: 'family', city: 'cascais' },
  { service: 'couple', city: 'cascais' },
  { service: 'proposal', city: 'cascais' },
  { service: 'wedding', city: 'cascais' },
  { service: 'maternity', city: 'cascais' },
  { service: 'vacation', city: 'cascais' },
  { service: 'headshots', city: 'cascais' },
  { service: 'real-estate', city: 'cascais' },

  // Algarve — the honeymoon and proposal market, and the Alojamento Local work
  // that the rental stock generates all year.
  { service: 'couple', city: 'algarve' },
  { service: 'honeymoon', city: 'algarve' },
  { service: 'proposal', city: 'algarve' },
  { service: 'vacation', city: 'algarve' },
  { service: 'elopement', city: 'algarve' },
  { service: 'family', city: 'algarve' },
  { service: 'destination-wedding', city: 'algarve' },
  { service: 'wedding', city: 'algarve' },
  { service: 'real-estate', city: 'algarve' },

  // Madeira — couples who flew for the landscape rather than the beach.
  { service: 'couple', city: 'madeira' },
  { service: 'honeymoon', city: 'madeira' },
  { service: 'elopement', city: 'madeira' },
  { service: 'vacation', city: 'madeira' },
  { service: 'proposal', city: 'madeira' },
  { service: 'family', city: 'madeira' },
  { service: 'destination-wedding', city: 'madeira' },
  { service: 'wedding', city: 'madeira' },

  // Açores — small, entirely inbound, and weighted to elopements because the
  // weather makes a large fixed-date wedding a poor bet.
  { service: 'elopement', city: 'acores' },
  { service: 'couple', city: 'acores' },
  { service: 'honeymoon', city: 'acores' },
  { service: 'vacation', city: 'acores' },
  { service: 'proposal', city: 'acores' },
  { service: 'destination-wedding', city: 'acores' },
  { service: 'family', city: 'acores' },

  // Douro — a season rather than a market, and the food work that goes with it.
  { service: 'couple', city: 'douro' },
  { service: 'elopement', city: 'douro' },
  { service: 'wedding', city: 'douro' },
  { service: 'vacation', city: 'douro' },
  { service: 'honeymoon', city: 'douro' },
  { service: 'destination-wedding', city: 'douro' },
  { service: 'proposal', city: 'douro' },
  { service: 'food', city: 'douro' },

  // Évora — destination weddings in the Alentejo, and the food and wine that
  // brings people out from Lisbon for the weekend.
  { service: 'wedding', city: 'evora' },
  { service: 'couple', city: 'evora' },
  { service: 'elopement', city: 'evora' },
  { service: 'vacation', city: 'evora' },
  { service: 'family', city: 'evora' },
  { service: 'proposal', city: 'evora' },
  { service: 'destination-wedding', city: 'evora' },
  { service: 'food', city: 'evora' },

  // Coimbra — one tradition carries the city, and it is a good one.
  { service: 'finalistas', city: 'coimbra' },
  { service: 'couple', city: 'coimbra' },
  { service: 'family', city: 'coimbra' },
  { service: 'wedding', city: 'coimbra' },
  { service: 'batizado', city: 'coimbra' },
  { service: 'proposal', city: 'coimbra' },
  { service: 'headshots', city: 'coimbra' },

  // Braga — the densest domestic wedding market in the country, and the family
  // work that follows a wedding by three years.
  { service: 'wedding', city: 'braga' },
  { service: 'batizado', city: 'braga' },
  { service: 'family', city: 'braga' },
  { service: 'couple', city: 'braga' },
  { service: 'proposal', city: 'braga' },
  { service: 'finalistas', city: 'braga' },
  { service: 'maternity', city: 'braga' },
  { service: 'newborn', city: 'braga' },
  { service: 'eventos-de-empresa', city: 'braga' },

  // Comporta — small, high-value, and almost no English-language competition.
  { service: 'wedding', city: 'comporta' },
  { service: 'destination-wedding', city: 'comporta' },
  { service: 'couple', city: 'comporta' },
  { service: 'elopement', city: 'comporta' },
  { service: 'family', city: 'comporta' },
  { service: 'honeymoon', city: 'comporta' },
  { service: 'vacation', city: 'comporta' },
  { service: 'maternity', city: 'comporta' },
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
