import type { Locale } from './locales';
import { hasLeafCopy } from './leaf-copy';

/**
 * Which `service × city` pages are indexed, and the order the first of them
 * were released in.
 *
 * Indexation follows the copy. A pairing is indexable in a language when it
 * has authored copy in that language (`src/lib/data/leaf-copy/`), and only
 * then: a page composed from a template differs from its siblings in two
 * proper nouns, and that is the thin content this site is built to avoid.
 * Every valid pairing now has copy in both languages, and
 * `scripts/check-leaf-copy.ts` fails the build when one is missing or drops
 * under 70% unique against the rest of the site — so a new service or city
 * cannot quietly ship a hundred template pages into the index.
 *
 * The list below is no longer the index. It is the drip order of the first
 * wave — the pairings people search for most, released one by one through
 * `publishSchedule.ts` rather than in a single bulk drop. A pairing absent from
 * it is live from launch.
 */
export interface DripLeaf {
  /** Canonical service id, not a localized slug. */
  service: string;
  /** City slug — identical across locales. */
  city: string;
}

/**
 * Chosen by demand: wedding work where the venues are, corporate work where
 * the offices are, honeymoons and proposals where people travel to.
 */
export const DRIP_LEAVES: readonly DripLeaf[] = [
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

/** Whether this pairing has authored copy in `locale` — and so belongs in the index and the sitemap. */
export function isIndexableLeaf(serviceId: string, citySlug: string, locale: Locale): boolean {
  return hasLeafCopy(serviceId, citySlug, locale);
}
