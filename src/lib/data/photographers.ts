import type { Photographer } from '../types';

/**
 * Photographer profiles.
 *
 * Empty on purpose. The redesign built the whole profile system — cards,
 * `/photographers/[slug]`, the blocks on city and service pages — but there
 * are no profiles to fill it with yet, and a marketplace of invented people
 * is worse than no marketplace. Every surface that lists photographers checks
 * this array and renders nothing while it is empty.
 *
 * To publish one, add an entry with real data only (see the `Photographer`
 * type for what each field must be), add its portrait and portfolio slots to
 * the photo pipeline, and run the build: `catalog.ts` rejects a profile that
 * names a city or service that does not exist.
 */
export const PHOTOGRAPHERS: Photographer[] = [];
