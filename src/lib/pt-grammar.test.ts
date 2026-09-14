import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CITIES } from './data/cities';
import {
  articleFor,
  ao,
  de,
  em,
  ptAt,
  ptOf,
  ptName,
  ptRegionAt,
  ptRegionOf,
  ptTo,
  ptWith,
  upperFirst,
} from './pt-grammar';
import type { City } from './types';

/**
 * A stand-in city, so the table below asserts grammar rather than catalogue
 * content. The real catalogue is checked separately, at the bottom.
 */
function city(name: string, ptArticle?: City['ptArticle']): City {
  return { name, ptArticle } as City;
}

/**
 * Every contraction, spelled out.
 *
 * Exact strings on purpose. A Portuguese grammar error is invisible to an
 * English-speaking reviewer and instantly disqualifying to the reader the
 * page is written for, so it has to be a test rather than a convention.
 */
const CASES: [City, { name: string; at: string; of: string; to: string }][] = [
  // No article — the majority.
  [city('Lisboa'), { name: 'Lisboa', at: 'em Lisboa', of: 'de Lisboa', to: 'a Lisboa' }],
  [city('Sintra'), { name: 'Sintra', at: 'em Sintra', of: 'de Sintra', to: 'a Sintra' }],
  [city('Coimbra'), { name: 'Coimbra', at: 'em Coimbra', of: 'de Coimbra', to: 'a Coimbra' }],
  [city('Braga'), { name: 'Braga', at: 'em Braga', of: 'de Braga', to: 'a Braga' }],
  [city('Comporta'), { name: 'Comporta', at: 'em Comporta', of: 'de Comporta', to: 'a Comporta' }],

  // Begins with a vowel. French would elide "de" to "d’"; Portuguese does not.
  [city('Évora'), { name: 'Évora', at: 'em Évora', of: 'de Évora', to: 'a Évora' }],
  [city('Aveiro'), { name: 'Aveiro', at: 'em Aveiro', of: 'de Aveiro', to: 'a Aveiro' }],
  [city('Albufeira'), { name: 'Albufeira', at: 'em Albufeira', of: 'de Albufeira', to: 'a Albufeira' }],

  // Look plural, are not, and take no article. The trap for a non-native.
  [city('Cascais'), { name: 'Cascais', at: 'em Cascais', of: 'de Cascais', to: 'a Cascais' }],
  [city('Lagos'), { name: 'Lagos', at: 'em Lagos', of: 'de Lagos', to: 'a Lagos' }],

  // Masculine singular.
  [city('Porto', 'o'), { name: 'o Porto', at: 'no Porto', of: 'do Porto', to: 'ao Porto' }],
  [city('Douro', 'o'), { name: 'o Douro', at: 'no Douro', of: 'do Douro', to: 'ao Douro' }],
  [city('Funchal', 'o'), { name: 'o Funchal', at: 'no Funchal', of: 'do Funchal', to: 'ao Funchal' }],
  [city('Algarve', 'o'), { name: 'o Algarve', at: 'no Algarve', of: 'do Algarve', to: 'ao Algarve' }],

  // Feminine singular. "a + a" contracts to the grave-accented "à".
  [city('Madeira', 'a'), { name: 'a Madeira', at: 'na Madeira', of: 'da Madeira', to: 'à Madeira' }],
  [city('Nazaré', 'a'), { name: 'a Nazaré', at: 'na Nazaré', of: 'da Nazaré', to: 'à Nazaré' }],

  // Masculine plural. The -es ending reads feminine to a non-native and is not:
  // it is "os Açores", never "as Açores".
  [city('Açores', 'os'), { name: 'os Açores', at: 'nos Açores', of: 'dos Açores', to: 'aos Açores' }],

  // Feminine plural, for completeness of the table.
  [city('Berlengas', 'as'), { name: 'as Berlengas', at: 'nas Berlengas', of: 'das Berlengas', to: 'às Berlengas' }],
];

for (const [subject, expected] of CASES) {
  test(`pt-grammar: ${subject.name}`, () => {
    assert.equal(ptName(subject), expected.name);
    assert.equal(ptAt(subject), expected.at);
    assert.equal(ptOf(subject), expected.of);
    assert.equal(ptTo(subject), expected.to);
  });
}

test('the primitives contract correctly on their own', () => {
  assert.equal(em(undefined), 'em');
  assert.equal(em('o'), 'no');
  assert.equal(em('a'), 'na');
  assert.equal(em('os'), 'nos');
  assert.equal(em('as'), 'nas');

  assert.equal(de(undefined), 'de');
  assert.equal(de('o'), 'do');
  assert.equal(de('a'), 'da');

  assert.equal(ao(undefined), 'a');
  assert.equal(ao('o'), 'ao');
  assert.equal(ao('a'), 'à');
});

test('de never elides before a vowel, the way the French helper did', () => {
  for (const name of ['Évora', 'Aveiro', 'Albufeira', 'Óbidos', 'Ericeira']) {
    const result = ptOf(city(name));
    assert.ok(!result.includes('’'), `"${result}" must not carry an apostrophe`);
    assert.equal(result, `de ${name}`);
  }
});

test('region forms use the region article, not the city one', () => {
  assert.equal(ptRegionAt('Algarve'), 'no Algarve');
  assert.equal(ptRegionAt('Madeira'), 'na Madeira');
  assert.equal(ptRegionAt('Açores'), 'nos Açores');
  assert.equal(ptRegionAt('Alentejo'), 'no Alentejo');
  assert.equal(ptRegionAt('Beira Litoral'), 'na Beira Litoral');
  // A region with no article takes the bare preposition.
  assert.equal(ptRegionAt('Grande Lisboa'), 'em Grande Lisboa');

  assert.equal(ptRegionOf('Algarve'), 'do Algarve');
  assert.equal(ptRegionOf('Madeira'), 'da Madeira');
  assert.equal(ptRegionOf('Serra da Estrela'), 'da Serra da Estrela');
});

test('non-contracting prepositions keep the article separate', () => {
  assert.equal(ptWith('desde', city('Porto', 'o')), 'desde o Porto');
  assert.equal(ptWith('sobre', city('Lisboa')), 'sobre Lisboa');
  assert.equal(ptWith('para', city('Madeira', 'a')), 'para a Madeira');
});

test('upperFirst capitalises a contraction for the start of a sentence', () => {
  assert.equal(upperFirst(ptAt(city('Porto', 'o'))), 'No Porto');
  assert.equal(upperFirst(ptAt(city('Lisboa'))), 'Em Lisboa');
  assert.equal(upperFirst(ptAt(city('Madeira', 'a'))), 'Na Madeira');
  // Idempotent, so a caller that is unsure cannot make it worse.
  assert.equal(upperFirst('No Porto'), 'No Porto');
});

test('every city in the catalogue has had its article decided', () => {
  for (const entry of CITIES) {
    // `undefined` is a legitimate answer — most names take no article — but it
    // has to be an answer, so the value is asserted to be one of the four or
    // absent, catching a typo like 'O' or 'do'.
    assert.ok(
      entry.ptArticle === undefined || ['o', 'a', 'os', 'as'].includes(entry.ptArticle),
      `${entry.slug}: ptArticle "${entry.ptArticle}" is not an article`,
    );
  }
});

test('a city whose name is in PLACE_ARTICLES agrees with its own record', () => {
  for (const entry of CITIES) {
    const listed = articleFor(entry.name);
    if (listed === undefined) continue;
    assert.equal(
      entry.ptArticle,
      listed,
      `${entry.slug}: City.ptArticle is "${entry.ptArticle}" but PLACE_ARTICLES says "${listed}"`,
    );
  }
});
