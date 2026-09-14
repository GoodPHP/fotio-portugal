import type { City } from '../types';
import { METRO_CITIES } from './cities-metro';
import { DESTINATION_CITIES } from './cities-destination';

/**
 * Ten cities where the demand is local and ten more where people travel to be
 * photographed, plus two — Aix and Avignon — that are both.
 *
 * Order matters: it drives the drip-publish schedule and the order cities are
 * listed in, so the metros come first.
 */
export const CITIES: City[] = [...METRO_CITIES, ...DESTINATION_CITIES];
