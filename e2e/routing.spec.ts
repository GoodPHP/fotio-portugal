import { test, expect, type Page } from '@playwright/test';

/** Every <link rel="alternate"> on the page, as hreflang -> href. */
async function alternates(page: Page): Promise<Record<string, string>> {
  return page.$$eval('link[rel="alternate"][hreflang]', (links) =>
    Object.fromEntries(
      links.map((l) => [l.getAttribute('hreflang')!, (l as HTMLLinkElement).href]),
    ),
  );
}

const canonical = (page: Page) =>
  page.$eval('link[rel="canonical"]', (l) => (l as HTMLLinkElement).href);

test.describe('locale routing', () => {
  test('English is served without a prefix', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
    expect(await canonical(page)).not.toContain('/en/');
  });

  test('Portuguese is served under /pt', async ({ page }) => {
    await page.goto('/pt');
    await expect(page.locator('h1')).toBeVisible();
    expect(await canonical(page)).toContain('/pt');
  });

  test('/en redirects to the unprefixed URL', async ({ page }) => {
    await page.goto('/en/services');
    await expect(page).toHaveURL(/\/services$/);
  });

  test('Portuguese segments are translated', async ({ page }) => {
    for (const path of [
      '/pt/fotografo',
      '/pt/cidades',
      '/pt/precos',
      '/pt/sobre',
      '/pt/reservar',
      '/pt/politica-de-privacidade',
      '/pt/livro-de-reclamacoes',
    ] as const) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should be 200`).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('no URL the site publishes carries a percent escape', async ({ page }) => {
    // Accented segments are legal as percent-encoded UTF-8 and render as
    // %C3%A7 in a search result, so the route table is deliberately ASCII.
    await page.goto('/pt/precos');
    expect(await canonical(page)).not.toContain('%');
    for (const href of Object.values(await alternates(page))) {
      expect(href).not.toContain('%');
    }
  });
});

test.describe('translated slugs', () => {
  test('a leaf is reachable in both languages', async ({ page }) => {
    expect((await page.goto('/services/wedding/lisboa'))?.status()).toBe(200);
    expect((await page.goto('/pt/fotografo/casamento/lisboa'))?.status()).toBe(200);
  });

  test('hreflang between the two is reciprocal', async ({ page }) => {
    await page.goto('/services/wedding/lisboa');
    const fromEn = await alternates(page);
    await page.goto('/pt/fotografo/casamento/lisboa');
    const fromPt = await alternates(page);

    expect(fromEn.en).toContain('/services/wedding/lisboa');
    expect(fromEn.pt).toContain('/pt/fotografo/casamento/lisboa');
    // Each side must publish the same cluster, or Google discards both.
    expect(fromPt.en).toBe(fromEn.en);
    expect(fromPt.pt).toBe(fromEn.pt);
    expect(fromEn['x-default']).toBe(fromEn.en);
    expect(fromEn['x-default']).not.toContain('/pt/');
  });

  test('a Portuguese slug under an English path is not a page', async ({ page }) => {
    // Serving it would put one page at two URLs with no canonical between them.
    const response = await page.goto('/services/casamento/lisboa');
    expect(response?.status()).toBe(404);
  });
});

test.describe('asymmetric catalogue', () => {
  test('an English-only service advertises no Portuguese alternate', async ({ page }) => {
    await page.goto('/services/destination-wedding');
    const alt = await alternates(page);
    expect(alt.en).toBeTruthy();
    expect(alt.pt).toBeUndefined();
    expect(alt['x-default']).toBe(alt.en);
  });

  test('a Portuguese-only service advertises no English alternate', async ({ page }) => {
    await page.goto('/pt/fotografo/finalistas');
    const alt = await alternates(page);
    expect(alt.pt).toBeTruthy();
    expect(alt.en).toBeUndefined();
  });

  /**
   * A crawler carries no locale cookie and asks for English, so it must see a
   * 404 rather than a page — the whole point of the asymmetry is that these
   * URLs do not exist. `request` is used rather than `page` because the browser
   * accumulates a NEXT_LOCALE cookie across navigations, which is exactly what
   * the next test covers.
   */
  test('the missing half of the catalogue is 404 to a crawler', async ({ request }) => {
    for (const url of ['/services/finalistas', '/pt/fotografo/destination-wedding']) {
      const response = await request.get(url, {
        headers: { 'Accept-Language': 'en-GB,en;q=0.9' },
        maxRedirects: 0,
      });
      expect(response.status(), `${url} should not be a page`).toBe(404);
    }
  });

  /**
   * A Portuguese-speaking visitor who lands on the English URL is sent to the
   * page they can actually use, rather than shown a 404. This is next-intl's
   * locale negotiation and it applies only to requests carrying a language
   * preference, so it never affects what is indexed.
   */
  test('a Portuguese-speaking visitor is redirected rather than refused', async ({ request }) => {
    const response = await request.get('/services/finalistas', {
      headers: { 'Accept-Language': 'pt-PT,pt;q=0.9' },
      maxRedirects: 0,
    });
    expect(response.status()).toBe(307);
    expect(response.headers()['location']).toBe('/pt/fotografo/finalistas');
  });
});

test.describe('indexation', () => {
  test('a curated leaf is indexable and fully linked', async ({ page }) => {
    await page.goto('/services/couple/porto');
    expect(await page.locator('meta[name="robots"]').count()).toBe(0);
    const alt = await alternates(page);
    expect(alt.en).toBeTruthy();
    expect(alt.pt).toBeTruthy();
  });

  test('an uncurated leaf renders but is noindex and unlinked', async ({ page }) => {
    const response = await page.goto('/services/portrait/lisboa');
    expect(response?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    // follow, so the links out still pass equity to the pages that earned it.
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /follow/);
    expect(await alternates(page)).toEqual({});
    // Its canonical points at itself, not at a different page.
    expect(await canonical(page)).toContain('/services/portrait/lisboa');
  });

  test('legal pages are noindex', async ({ page }) => {
    await page.goto('/pt/informacao-legal');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('not found', () => {
  test('answers 404 in the reader’s language', async ({ page }) => {
    const en = await page.goto('/no-such-page');
    expect(en?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('Page not found');

    const pt = await page.goto('/pt/nenhuma-pagina');
    expect(pt?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('não encontrada');
  });
});

test.describe('language switch', () => {
  /*
   * Every one of these round trips has been broken at some point: the switcher
   * once read hreflang, which is absolute (so it jumped to production), absent
   * on noindex pages (so it guessed, and with translated slugs guessed wrong),
   * and it never updated NEXT_LOCALE (so the middleware redirected the visitor
   * straight back to the language they were leaving).
   */
  // Waits for the navigation itself, not for the network to fall quiet: a page
  // rendered on demand keeps a connection open long enough that 'networkidle'
  // never arrives, and the switch it is meant to be observing has by then
  // already happened.
  const clickTo = async (page: Page, label: string) => {
    const before = page.url();
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForURL((url) => url.href !== before);
  };

  test('round-trips on a curated leaf', async ({ page }) => {
    await page.goto('/services/wedding/lisboa');
    await clickTo(page, 'Português');
    await expect(page).toHaveURL(/\/pt\/fotografo\/casamento\/lisboa$/);
    await clickTo(page, 'English');
    await expect(page).toHaveURL(/\/services\/wedding\/lisboa$/);
  });

  test('round-trips on a noindex leaf, which publishes no hreflang', async ({ page }) => {
    await page.goto('/services/portrait/lisboa');
    expect(await alternates(page)).toEqual({});
    await clickTo(page, 'Português');
    await expect(page).toHaveURL(/\/pt\/fotografo\/retrato-estudio\/lisboa$/);
    await expect(page.locator('h1')).not.toContainText('não encontrada');
    await clickTo(page, 'English');
    await expect(page).toHaveURL(/\/services\/portrait\/lisboa$/);
  });

  test('stays on the current origin', async ({ page }) => {
    // The regression this guards: reading the destination from hreflang, whose
    // URLs are absolute and built from NEXT_PUBLIC_SITE_URL, sent anyone on a
    // preview deployment or localhost straight to the production site.
    await page.goto('/cities/madeira');
    const origin = new URL(page.url()).origin;
    await clickTo(page, 'Português');
    expect(new URL(page.url()).origin).toBe(origin);
    await expect(page).toHaveURL(/\/pt\/cidades\/madeira$/);
  });

  test('offers no dead link for a service that exists in one language only', async ({ page }) => {
    await page.goto('/pt/fotografo/finalistas');
    await expect(page.getByRole('button', { name: 'English', exact: true })).toHaveCount(0);
    await expect(page.locator('[aria-disabled="true"]')).toContainText('EN');
  });

  test('falls back to the other language’s home from a 404', async ({ page }) => {
    await page.goto('/services/wedding/nowhere-at-all');
    await clickTo(page, 'Português');
    await expect(page).toHaveURL(/\/pt$/);
  });
});

test.describe('what the server sends', () => {
  /**
   * The regression this exists to prevent cost roughly 0.9s of LCP for months.
   * The entrance animations used to be a client library that emitted
   * `opacity: 0` into the server HTML and waited for hydration to reveal
   * anything, which made the animation itself the largest contentful paint.
   */
  test('no page renders hidden content in the server HTML', async ({ request }) => {
    for (const url of ['/', '/pt', '/cities/lisboa', '/services/wedding/lisboa']) {
      const html = await (await request.get(url)).text();
      expect(html, `${url} must not ship hidden content`).not.toMatch(
        /opacity:\s*0[^.\d]|visibility:\s*hidden/,
      );
    }
  });

  /**
   * A legal obligation, and exactly the kind of thing a footer refactor drops
   * without anyone noticing: a provider of services to consumers in Portugal
   * must make the electronic complaints book available.
   */
  test('the complaints book is linked from every page', async ({ page }) => {
    for (const url of ['/', '/pt', '/cities/porto', '/pt/precos']) {
      await page.goto(url);
      const link = page.locator('footer a[href$="livro-de-reclamacoes"], footer a[href$="/legal/complaints"]');
      await expect(link, `${url} must link the complaints book`).toHaveCount(1);
    }
  });

  /**
   * Every `{'@id': x}` reference in the structured data has to resolve to a
   * node that is actually defined, on the page or in the site-wide graph the
   * layout emits. A dangling reference is a graph a machine cannot follow.
   */
  test('every JSON-LD @id reference resolves', async ({ page }) => {
    for (const url of ['/', '/cities/lisboa', '/services/wedding/lisboa', '/pt/avaliacoes']) {
      await page.goto(url);
      const blocks = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
        nodes.map((n) => n.textContent ?? ''),
      );
      const defined = new Set<string>();
      const referenced: string[] = [];

      const walk = (value: unknown, isRef: boolean): void => {
        if (Array.isArray(value)) {
          for (const item of value) walk(item, false);
          return;
        }
        if (!value || typeof value !== 'object') return;
        const node = value as Record<string, unknown>;
        const id = typeof node['@id'] === 'string' ? node['@id'] : undefined;
        if (id) {
          // A bare {'@id': …} is a reference; anything else defines the node.
          if (Object.keys(node).length === 1 || isRef) referenced.push(id);
          else defined.add(id);
        }
        for (const [key, child] of Object.entries(node)) {
          if (key === '@id') continue;
          walk(child, false);
        }
      };

      for (const block of blocks) walk(JSON.parse(block), false);

      for (const id of referenced) {
        expect(defined.has(id), `${url}: @id "${id}" is referenced but never defined`).toBe(true);
      }
    }
  });
});
