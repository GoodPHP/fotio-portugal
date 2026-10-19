import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CITY_FEATURED_LEAF } from './data/city-featured';
import { getCity, getServiceById, serviceExistsIn, serviceSoldIn } from './catalog';

test('every featured leaf names a real city and a service sold there, with copy in each locale it exists in', () => {
  for (const [citySlug, feature] of Object.entries(CITY_FEATURED_LEAF)) {
    assert.ok(getCity(citySlug), `${citySlug}: no such city`);
    const service = getServiceById(feature.service);
    assert.ok(service, `${citySlug}: no such service ${feature.service}`);
    assert.ok(serviceSoldIn(service, citySlug), `${citySlug}: ${feature.service} is not sold there`);
    if (serviceExistsIn(service, 'pt')) {
      for (const part of [feature.before, feature.link]) assert.ok(part.pt, `${citySlug}: missing PT copy`);
    }
  }
});
