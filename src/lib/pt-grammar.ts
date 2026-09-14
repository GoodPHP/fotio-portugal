import type { City } from './types';

/**
 * Portuguese forms of a place name.
 *
 * Portuguese contracts its prepositions with the definite article, and the
 * article is a property of the name rather than of the sentence: it is "em
 * Lisboa" but "no Porto", "na Madeira", "nos Açores". Getting this wrong is
 * invisible to an English reviewer and immediately disqualifying to a
 * Portuguese reader, which is why the data carries only the article and every
 * contraction is derived here, with a test asserting the exact strings.
 *
 * This replaced a French equivalent, and one thing in it must not be carried
 * over: French elides `de` to `d’` before a vowel. Portuguese does not. It is
 * "de Évora", "de Aveiro", "de Albufeira" — never an apostrophe. A mechanical
 * translation of the old module would have shipped `d’Évora` on every page
 * about Évora.
 */

/** The definite article a place name takes, when it takes one at all. */
export type PtArticle = 'o' | 'a' | 'os' | 'as';

// em + o = no · em + a = na · de + o = do · a + o = ao · a + a = à
const EM = { o: 'no', a: 'na', os: 'nos', as: 'nas' } as const;
const DE = { o: 'do', a: 'da', os: 'dos', as: 'das' } as const;
const AO = { o: 'ao', a: 'à', os: 'aos', as: 'às' } as const;

/** "no" · "na" · "em" — location. */
export const em = (article?: PtArticle): string => (article ? EM[article] : 'em');
/** "do" · "da" · "de" — possession or origin. */
export const de = (article?: PtArticle): string => (article ? DE[article] : 'de');
/** "ao" · "à" · "a" — direction. */
export const ao = (article?: PtArticle): string => (article ? AO[article] : 'a');

/**
 * Articles for places that have no `City` record of their own.
 *
 * Regions appear in `City.region`, and `coveredAreas` lists towns that are
 * covered from a city without having a page. Both end up inside sentences, so
 * both need the same treatment. Keyed on the name as written.
 *
 * Only places that take an article are listed; anything absent takes none,
 * which is the majority. Braga, Guimarães, Óbidos, Peniche, Setúbal, Faro,
 * Tavira, Viseu, Coimbra, Évora, Sintra, Cascais and Lagos are all bare — and
 * Cascais and Lagos are the trap, because they look plural and are not.
 */
export const PLACE_ARTICLES: Readonly<Record<string, PtArticle>> = {
  Algarve: 'o',
  Alentejo: 'o',
  Minho: 'o',
  Ribatejo: 'o',
  Douro: 'o',
  'Porto': 'o',
  'Funchal': 'o',
  Madeira: 'a',
  // Masculine plural, despite the -es ending: os Açores, nos Açores.
  Açores: 'os',
  'Beira Litoral': 'a',
  Estremadura: 'a',
  'Serra da Estrela': 'a',
  'Costa Vicentina': 'a',
  'Costa Azul': 'a',
  Nazaré: 'a',
  Ericeira: 'a',
  Comporta: 'a',
  Covilhã: 'a',
  Guarda: 'a',
  'Figueira da Foz': 'a',
  'Póvoa de Varzim': 'a',
};

/** The article a bare place name takes, if any. */
export function articleFor(place: string): PtArticle | undefined {
  return PLACE_ARTICLES[place];
}

/** "o Porto" · "Lisboa" · "os Açores" — the name as a sentence subject. */
export function ptName(city: City): string {
  return city.ptArticle ? `${city.ptArticle} ${city.name}` : city.name;
}

/** "Porto" · "Lisboa" — the name alone, for a heading or after a preposition. */
export function ptNameBare(city: City): string {
  return city.name;
}

/** "no Porto" · "em Lisboa" · "na Madeira" · "nos Açores" — location. */
export function ptAt(city: City): string {
  return `${em(city.ptArticle)} ${city.name}`;
}

/** "do Porto" · "de Lisboa" · "da Madeira" — possession. Never "d’". */
export function ptOf(city: City): string {
  return `${de(city.ptArticle)} ${city.name}`;
}

/** "ao Porto" · "a Lisboa" · "à Madeira" — direction. */
export function ptTo(city: City): string {
  return `${ao(city.ptArticle)} ${city.name}`;
}

/**
 * Any other preposition plus the name: "desde o Porto", "sobre Lisboa".
 *
 * The preposition is passed whole because the ones the pages use — desde,
 * sobre, para, entre — do not contract with the article.
 */
export function ptWith(preposition: string, city: City): string {
  return `${preposition} ${ptName(city)}`;
}

/** "no Algarve" · "na Madeira" — the city's region, as a location. */
export function ptRegionAt(region: string): string {
  return `${em(articleFor(region))} ${region}`;
}

/** "do Algarve" · "da Madeira" — the city's region, as possession. */
export function ptRegionOf(region: string): string {
  return `${de(articleFor(region))} ${region}`;
}

/**
 * Capitalise the first letter.
 *
 * Not optional, and the reason it is an explicit call rather than something
 * `ptAt` does for you: mid-sentence the article is lower case ("trabalhamos no
 * Porto"), sentence-initially it is not ("No Porto, …"). The old French module
 * had the same latent bug and no way to express the difference, so every
 * heading built from it was quietly wrong.
 */
export function upperFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
