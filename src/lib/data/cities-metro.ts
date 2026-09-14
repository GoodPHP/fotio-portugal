import type { City } from '../types';

/**
 * The cities people live and work in: Lisboa, Porto, Cascais, Braga, Coimbra,
 * Évora. The domestic half of the catalogue — weddings, christenings,
 * graduations, corporate work.
 *
 * Emptied in the France-to-Portugal conversion rather than translated. The
 * previous contents were 850 lines of prose making claims about French cities;
 * a key rename would have left French sentences sitting under a `pt` key,
 * which typechecks, passes every gate and ships. `scripts/check-seo.ts` now
 * fails per missing city, which is the worklist.
 */
export const METRO_CITIES: City[] = [];
