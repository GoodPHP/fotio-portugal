import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { localizedPath, absoluteUrl, languageAlternates, localizedPaths } from './urls';
import { SITE_URL } from './site';

describe('localizedPath', () => {
  test('leaves the default locale unprefixed', () => {
    assert.equal(localizedPath('en', '/services'), '/services');
  });

  test('prefixes a non-default locale', () => {
    assert.equal(localizedPath('pt', '/services'), '/pt/fotografo');
  });

  test('translates static segments per locale', () => {
    assert.equal(localizedPath('en', '/pricing'), '/pricing');
    assert.equal(localizedPath('pt', '/pricing'), '/pt/precos');
    assert.equal(localizedPath('pt', '/about'), '/pt/sobre');
    assert.equal(localizedPath('pt', '/book'), '/pt/reservar');
    assert.equal(localizedPath('pt', '/legal/complaints'), '/pt/livro-de-reclamacoes');
  });

  test('every localized segment is ASCII', () => {
    // Percent-encoded diacritics are legal and read as %C3%A7 in a search
    // result, so the route table is deliberately unaccented. This catches a
    // "preços" or "avaliações" slipping back in.
    for (const route of ['/pricing', '/reviews', '/about', '/contact', '/legal/privacy'] as const) {
      const path = localizedPath('pt', route);
      assert.ok(/^[\x20-\x7e]*$/.test(path), `"${path}" is not ASCII`);
    }
  });

  test('substitutes dynamic params', () => {
    assert.equal(
      localizedPath('en', '/services/[service]/[city]', { service: 'wedding', city: 'lisboa' }),
      '/services/wedding/lisboa',
    );
  });

  test('substitutes localized slugs into localized segments', () => {
    assert.equal(
      localizedPath('pt', '/services/[service]/[city]', { service: 'casamento', city: 'lisboa' }),
      '/pt/fotografo/casamento/lisboa',
    );
  });

  test('the site root is "/" in the default locale and "/pt" in Portuguese', () => {
    assert.equal(localizedPath('en', '/'), '/');
    assert.equal(localizedPath('pt', '/'), '/pt');
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
      en: { service: 'wedding', city: 'lisboa' },
      pt: { service: 'casamento', city: 'lisboa' },
    });
    assert.deepEqual(alts, {
      en: `${SITE_URL}/services/wedding/lisboa`,
      pt: `${SITE_URL}/pt/fotografo/casamento/lisboa`,
      'x-default': `${SITE_URL}/services/wedding/lisboa`,
    });
  });

  test('omits a locale the page does not exist in', () => {
    // A service sold only to a Portuguese reader must not advertise an English
    // URL: that URL is not served, and pointing hreflang at it invites a soft
    // 404. "batizado" is one — a christening is domestic work.
    const alts = languageAlternates('/services/[service]', { pt: { service: 'batizado' } });
    assert.deepEqual(alts, {
      pt: `${SITE_URL}/pt/fotografo/batizado`,
      'x-default': `${SITE_URL}/pt/fotografo/batizado`,
    });
  });

  test('x-default falls back to the only locale a page exists in', () => {
    const alts = languageAlternates('/services/[service]', { en: { service: 'destination-wedding' } });
    assert.equal(alts?.['x-default'], `${SITE_URL}/services/destination-wedding`);
  });

  test('returns undefined when the page exists nowhere', () => {
    assert.equal(languageAlternates('/services/[service]', {}), undefined);
  });

  test('alternates are reciprocal: each locale computes the same map', () => {
    const params = { en: { city: 'lisboa' }, pt: { city: 'lisboa' } };
    assert.deepEqual(
      languageAlternates('/cities/[city]', params),
      languageAlternates('/cities/[city]', params),
    );
  });
});

describe('localizedPaths', () => {
  test('returns a relative path per locale the page exists in', () => {
    const paths = localizedPaths('/services/[service]/[city]', {
      en: { service: 'wedding', city: 'lisboa' },
      pt: { service: 'casamento', city: 'lisboa' },
    });
    assert.deepEqual(paths, {
      en: '/services/wedding/lisboa',
      pt: '/pt/fotografo/casamento/lisboa',
    });
  });

  test('omits a locale the page does not exist in', () => {
    // The language switcher reads these; an entry here would offer a 404.
    const paths = localizedPaths('/services/[service]', { pt: { service: 'finalistas' } });
    assert.deepEqual(paths, { pt: '/pt/fotografo/finalistas' });
  });

  test('stays relative so the switcher cannot leave the current origin', () => {
    for (const path of Object.values(localizedPaths('/pricing'))) {
      assert.ok(path.startsWith('/'), `expected a relative path, got ${path}`);
    }
  });
});
