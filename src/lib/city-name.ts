import type { City } from './types';

/**
 * French forms of a city name.
 *
 * Almost every city on the site is a bare proper noun — "à Paris", "de Lyon" —
 * and interpolating the name straight into a sentence works. Two things break
 * it, and both were shipping on the page: a name that takes a definite article
 * ("le Mont-Saint-Michel", giving "au" and "du" rather than "à" and "de"), and
 * a name beginning with a vowel, where "de" elides to "d'".
 *
 * These are mechanical once the article is known, so the data carries only
 * `frArticle` and the contractions are derived here.
 *
 * English needs none of this, which is why these functions take no locale: the
 * caller picks them for the French branch of a copy object.
 */

const VOWELS = /^[aeiouyàâäéèêëîïôöùûüh]/i;

/** "le Mont-Saint-Michel" · "Paris" — the name as a sentence subject. */
export function frName(city: City): string {
  return city.frArticle ? `${city.frArticle} ${city.name}` : city.name;
}

/** "au Mont-Saint-Michel" · "à Paris" — location. */
export function frAt(city: City): string {
  if (city.frArticle === 'le') return `au ${city.name}`;
  if (city.frArticle === 'les') return `aux ${city.name}`;
  if (city.frArticle === 'la') return `à la ${city.name}`;
  return `à ${city.name}`;
}

/** "du Mont-Saint-Michel" · "d’Étretat" · "de Paris" — possession. */
export function frOf(city: City): string {
  if (city.frArticle === 'le') return `du ${city.name}`;
  if (city.frArticle === 'les') return `des ${city.name}`;
  if (city.frArticle === 'la') return `de la ${city.name}`;
  return VOWELS.test(city.name) ? `d’${city.name}` : `de ${city.name}`;
}

/**
 * Any other preposition plus the name: "depuis le Mont-Saint-Michel",
 * "sur Paris". The preposition is passed whole because the ones the pages use
 * — depuis, sur, dans — do not contract.
 */
export function frWith(preposition: string, city: City): string {
  return `${preposition} ${frName(city)}`;
}
