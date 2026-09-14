import type { Service } from '../types';

/**
 * The service catalogue.
 *
 * Deliberately asymmetric across the two languages, because the two audiences
 * arrive for different reasons. Someone searching in English is coming to
 * Portugal: an elopement, a honeymoon, a holiday session. Someone searching in
 * Portuguese lives here and wants a batizado, a session of finalistas, a
 * corporate headshot. Publishing each list in the other language would produce
 * pages aimed at nobody, so `availableIn` narrows them.
 *
 * `slug` is identity and the English URL word; `slugs.pt` is the Portuguese
 * one.
 *
 * Emptied in the conversion rather than translated — see `cities-metro.ts`.
 */
export const SERVICES: Service[] = [];
