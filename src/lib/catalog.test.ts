import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import type { Service } from './types';
import {
  SERVICES,
  CITIES,
  serviceSlug,
  serviceLocales,
  serviceExistsIn,
  getServiceById,
  isCuratedLeaf,
} from './catalog';
import { CURATED_LEAVES } from './curated';
import { LOCALES } from './locales';

/** A service shaped like the catalogue's, without depending on real content. */
function make(partial: Partial<Service> & Pick<Service, 'slug'>): Service {
  return {
    name: { en: partial.slug },
    category: 'other',
    initialPrice: 100,
    durationMinutes: 60,
    editedPhotos: 20,
    deliverables: { en: [] },
    ...partial,
  } as Service;
}

describe('serviceSlug', () => {
  test('falls back to the canonical slug when a locale has none', () => {
    const s = make({ slug: 'portrait' });
    assert.equal(serviceSlug(s, 'en'), 'portrait');
    assert.equal(serviceSlug(s, 'pt'), 'portrait');
  });

  test('uses the localized slug where one is authored', () => {
    const s = make({ slug: 'wedding', slugs: { pt: 'casamento' } });
    assert.equal(serviceSlug(s, 'en'), 'wedding');
    assert.equal(serviceSlug(s, 'pt'), 'casamento');
  });
});

describe('availability', () => {
  test('a service with no availableIn is offered everywhere', () => {
    assert.deepEqual([...serviceLocales(make({ slug: 'portrait' }))], [...LOCALES]);
  });

  test('availableIn restricts the locales a service is offered in', () => {
    const ptOnly = make({ slug: 'batizado', availableIn: ['pt'] });
    assert.equal(serviceExistsIn(ptOnly, 'pt'), true);
    assert.equal(serviceExistsIn(ptOnly, 'en'), false);
  });
});

describe('the real catalogue', () => {
  test('every service resolves by its stable id', () => {
    for (const s of SERVICES) {
      assert.equal(getServiceById(s.slug)?.slug, s.slug);
    }
  });

  test('slugs are unique within each locale', () => {
    // A collision would put two services on one URL. catalog.ts throws at
    // import time if this ever regresses; assert it here too so the failure
    // names the offending pair rather than just breaking the build.
    for (const locale of LOCALES) {
      const seen = new Map<string, string>();
      for (const s of SERVICES) {
        const slug = serviceSlug(s, locale);
        const clash = seen.get(slug);
        assert.equal(clash, undefined, `"${slug}" is shared by "${clash}" and "${s.slug}" in ${locale}`);
        seen.set(slug, s.slug);
      }
    }
  });

  test('an unknown id resolves to nothing', () => {
    assert.equal(getServiceById('not-a-service'), undefined);
  });
});

describe('curated leaves', () => {
  test('a curated combination is indexable in both locales', () => {
    const [first] = CURATED_LEAVES;
    assert.ok(first, 'expected the curated list to be non-empty');
    assert.equal(isCuratedLeaf(first.service, first.city, 'en'), true);
    assert.equal(isCuratedLeaf(first.service, first.city, 'pt'), true);
  });

  test('a combination nobody wrote is not curated', () => {
    assert.equal(isCuratedLeaf('not-a-service', 'not-a-city', 'en'), false);
  });

  test('the curated set is a strict subset of the full matrix', () => {
    // The whole point: if these were equal we would be back to publishing
    // every combination from a template.
    const full = SERVICES.length * CITIES.length;
    assert.ok(
      CURATED_LEAVES.length < full,
      `curated ${CURATED_LEAVES.length} should be fewer than the ${full} possible`,
    );
  });

  test('every curated leaf points at a real service and city', () => {
    for (const leaf of CURATED_LEAVES) {
      assert.ok(getServiceById(leaf.service), `unknown service "${leaf.service}"`);
      assert.ok(CITIES.some((c) => c.slug === leaf.city), `unknown city "${leaf.city}"`);
    }
  });
});
