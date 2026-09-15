import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { contentHref } from './routes';

describe('contentHref', () => {
  test('static routes and cities pass through in any locale', () => {
    assert.equal(contentHref('/book', 'pt'), '/book');
    assert.deepEqual(contentHref('/cities/lisboa', 'pt'), { pathname: '/cities/[city]', params: { city: 'lisboa' } });
  });

  test('an English article keeps the English service slug', () => {
    assert.deepEqual(contentHref('/services/family', 'en'), {
      pathname: '/services/[service]',
      params: { service: 'family' },
    });
  });

  test('a Portuguese article gets the Portuguese service slug', () => {
    // Prose is authored with /services/family; /fotografo/family 404s.
    assert.deepEqual(contentHref('/services/family', 'pt'), {
      pathname: '/services/[service]',
      params: { service: 'fotografo-de-familia' },
    });
  });

  test('a service × city link is localized the same way', () => {
    assert.deepEqual(contentHref('/services/wedding/lisboa', 'pt'), {
      pathname: '/services/[service]/[city]',
      params: { service: 'casamento', city: 'lisboa' },
    });
  });

  test('a service with no page in the reader’s language is not a route', () => {
    assert.equal(contentHref('/services/honeymoon', 'pt'), null);
    assert.equal(contentHref('/services/batizado/braga', 'en'), null);
  });

  test('an unknown path is not a route', () => {
    assert.equal(contentHref('/services/not-a-service', 'en'), null);
    assert.equal(contentHref('/somewhere/else', 'en'), null);
  });
});
