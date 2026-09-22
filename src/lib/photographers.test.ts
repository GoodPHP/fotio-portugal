import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import type { Photographer } from './types';
import { PHOTOGRAPHERS, hasPhotographers, validatePhotographers } from './catalog';

const profile = (partial: Partial<Photographer> = {}): Photographer => ({
  slug: 'a',
  name: 'A',
  portrait: 'photographers/a',
  cities: ['lisboa'],
  services: ['couple'],
  languages: ['en'],
  bio: { en: 'Bio' },
  portfolio: [],
  ...partial,
});

describe('photographers', () => {
  /*
   * Deliberately empty until real profiles exist. If this fails, someone has
   * added a profile — make sure it is a real person, with their consent, and
   * then update this test.
   */
  test('ships with no profiles, and every surface is hidden', () => {
    assert.equal(PHOTOGRAPHERS.length, 0);
    assert.equal(hasPhotographers(), false);
  });

  test('a valid profile passes', () => {
    assert.doesNotThrow(() => validatePhotographers([profile()]));
  });

  test('rejects a duplicate slug, an unknown place and an unknown session', () => {
    assert.throws(() => validatePhotographers([profile(), profile()]), /Duplicate/);
    assert.throws(() => validatePhotographers([profile({ cities: ['paris'] })]), /unknown city/);
    assert.throws(() => validatePhotographers([profile({ services: ['boudoir'] })]), /unknown service/);
    assert.throws(() => validatePhotographers([profile({ cities: [] })]), /no city/);
  });
});
