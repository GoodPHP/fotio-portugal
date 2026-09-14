import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { localizedPath, absoluteUrl, languageAlternates, localizedPaths } from './urls';
import { SITE_URL } from './site';

describe('localizedPath', () => {
  test('leaves the default locale unprefixed', () => {
    assert.equal(localizedPath('en', '/services'), '/services');
  });

  test('prefixes a non-default locale', () => {
    assert.equal(localizedPath('fr', '/services'), '/fr/photographe');
  });

  test('translates static segments per locale', () => {
    assert.equal(localizedPath('en', '/pricing'), '/pricing');
    assert.equal(localizedPath('fr', '/pricing'), '/fr/tarifs');
    assert.equal(localizedPath('fr', '/about'), '/fr/a-propos');
    assert.equal(localizedPath('fr', '/book'), '/fr/reservation');
  });

  test('substitutes dynamic params', () => {
    assert.equal(
      localizedPath('en', '/services/[service]/[city]', { service: 'wedding', city: 'paris' }),
      '/services/wedding/paris',
    );
  });

  test('substitutes localized slugs into localized segments', () => {
    assert.equal(
      localizedPath('fr', '/services/[service]/[city]', { service: 'mariage', city: 'paris' }),
      '/fr/photographe/mariage/paris',
    );
  });

  test('the site root is "/" in the default locale and "/fr" in French', () => {
    assert.equal(localizedPath('en', '/'), '/');
    assert.equal(localizedPath('fr', '/'), '/fr');
  });

  test('throws rather than emitting a URL with an unfilled segment', () => {
    assert.throws(
      () => localizedPath('en', '/cities/[city]'),
      /missing param "city"/,
    );
  });
});

describe('absoluteUrl', () => {
  test('has no trailing slash at the root', () => {
    assert.equal(absoluteUrl('en', '/'), SITE_URL);
  });

  test('is absolute and never carries an /en prefix', () => {
    const url = absoluteUrl('en', '/services');
    assert.equal(url, `${SITE_URL}/services`);
    assert.ok(!url.includes('/en/'));
  });
});

describe('languageAlternates', () => {
  test('emits every locale plus x-default for a page in both', () => {
    const alts = languageAlternates('/services/[service]/[city]', {
      en: { service: 'wedding', city: 'paris' },
      fr: { service: 'mariage', city: 'paris' },
    });
    assert.deepEqual(alts, {
      en: `${SITE_URL}/services/wedding/paris`,
      fr: `${SITE_URL}/fr/photographe/mariage/paris`,
      'x-default': `${SITE_URL}/services/wedding/paris`,
    });
  });

  test('omits a locale the page does not exist in', () => {
    // A service offered only in France must not advertise an English URL:
    // that URL is not served, and pointing hreflang at it invites a soft 404.
    const alts = languageAlternates('/services/[service]', { fr: { service: 'bapteme' } });
    assert.deepEqual(alts, {
      fr: `${SITE_URL}/fr/photographe/bapteme`,
      'x-default': `${SITE_URL}/fr/photographe/bapteme`,
    });
  });

  test('x-default falls back to the only locale a page exists in', () => {
    const alts = languageAlternates('/services/[service]', { en: { service: 'eiffel-tower-session' } });
    assert.equal(alts?.['x-default'], `${SITE_URL}/services/eiffel-tower-session`);
  });

  test('returns undefined when the page exists nowhere', () => {
    assert.equal(languageAlternates('/services/[service]', {}), undefined);
  });

  test('alternates are reciprocal: each locale computes the same map', () => {
    const params = { en: { city: 'paris' }, fr: { city: 'paris' } };
    assert.deepEqual(
      languageAlternates('/cities/[city]', params),
      languageAlternates('/cities/[city]', params),
    );
  });
});

describe('localizedPaths', () => {
  test('returns a relative path per locale the page exists in', () => {
    const paths = localizedPaths('/services/[service]/[city]', {
      en: { service: 'wedding', city: 'paris' },
      fr: { service: 'mariage', city: 'paris' },
    });
    assert.deepEqual(paths, {
      en: '/services/wedding/paris',
      fr: '/fr/photographe/mariage/paris',
    });
  });

  test('omits a locale the page does not exist in', () => {
    // The language switcher reads these; an entry here would offer a 404.
    const paths = localizedPaths('/services/[service]', { fr: { service: 'evjf' } });
    assert.deepEqual(paths, { fr: '/fr/photographe/evjf' });
  });

  test('stays relative so the switcher cannot leave the current origin', () => {
    for (const path of Object.values(localizedPaths('/pricing'))) {
      assert.ok(path.startsWith('/'), `expected a relative path, got ${path}`);
    }
  });
});
