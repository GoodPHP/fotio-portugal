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

  test('French is served under /fr', async ({ page }) => {
    await page.goto('/fr');
    await expect(page.locator('h1')).toBeVisible();
    expect(await canonical(page)).toContain('/fr');
  });

  test('/en redirects to the unprefixed URL', async ({ page }) => {
    await page.goto('/en/services');
    await expect(page).toHaveURL(/\/services$/);
  });

  test('French segments are translated', async ({ page }) => {
    for (const [path, heading] of [
      ['/fr/photographe', 'h1'],
      ['/fr/villes', 'h1'],
      ['/fr/tarifs', 'h1'],
      ['/fr/a-propos', 'h1'],
    ] as const) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should be 200`).toBe(200);
      await expect(page.locator(heading).first()).toBeVisible();
    }
  });
});

test.describe('translated slugs', () => {
  test('a leaf is reachable in both languages', async ({ page }) => {
    expect((await page.goto('/services/wedding/paris'))?.status()).toBe(200);
    expect((await page.goto('/fr/photographe/mariage/paris'))?.status()).toBe(200);
  });

  test('hreflang between the two is reciprocal', async ({ page }) => {
    await page.goto('/services/wedding/paris');
    const fromEn = await alternates(page);
    await page.goto('/fr/photographe/mariage/paris');
    const fromFr = await alternates(page);

    expect(fromEn.en).toContain('/services/wedding/paris');
    expect(fromEn.fr).toContain('/fr/photographe/mariage/paris');
    // Each side must publish the same cluster, or Google discards both.
    expect(fromFr.en).toBe(fromEn.en);
    expect(fromFr.fr).toBe(fromEn.fr);
    expect(fromEn['x-default']).toBe(fromEn.en);
  });

  test('a French slug under an English path is not a page', async ({ page }) => {
    // Serving it would put one page at two URLs with no canonical between them.
    const response = await page.goto('/services/mariage/paris');
    expect(response?.status()).toBe(404);
  });
});

test.describe('asymmetric catalogue', () => {
  test('an English-only service advertises no French alternate', async ({ page }) => {
    await page.goto('/services/eiffel-tower-session');
    const alt = await alternates(page);
    expect(alt.en).toBeTruthy();
    expect(alt.fr).toBeUndefined();
    expect(alt['x-default']).toBe(alt.en);
  });

  test('a French-only service advertises no English alternate', async ({ page }) => {
    await page.goto('/fr/photographe/evjf');
    const alt = await alternates(page);
    expect(alt.fr).toBeTruthy();
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
    for (const url of ['/services/evjf', '/fr/photographe/eiffel-tower-session']) {
      const response = await request.get(url, {
        headers: { 'Accept-Language': 'en-GB,en;q=0.9' },
        maxRedirects: 0,
      });
      expect(response.status(), `${url} should not be a page`).toBe(404);
    }
  });

  /**
   * A French-speaking visitor who lands on the English URL is sent to the page
   * they can actually use, rather than shown a 404. This is next-intl's locale
   * negotiation and it applies only to requests that carry a language
   * preference, so it never affects what is indexed.
   */
  test('a French-speaking visitor is redirected rather than refused', async ({ request }) => {
    const response = await request.get('/services/evjf', {
      headers: { 'Accept-Language': 'fr-FR,fr;q=0.9' },
      maxRedirects: 0,
    });
    expect(response.status()).toBe(307);
    expect(response.headers()['location']).toBe('/fr/photographe/evjf');
  });
});

test.describe('indexation', () => {
  test('a curated leaf is indexable and fully linked', async ({ page }) => {
    await page.goto('/services/vacation/nice');
    expect(await page.locator('meta[name="robots"]').count()).toBe(0);
    const alt = await alternates(page);
    expect(alt.en).toBeTruthy();
    expect(alt.fr).toBeTruthy();
  });

  test('an uncurated leaf renders but is noindex and unlinked', async ({ page }) => {
    const response = await page.goto('/services/model-portfolio/carcassonne');
    expect(response?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    );
    // follow, so the links out still pass equity to the pages that earned it.
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /follow/);
    expect(await alternates(page)).toEqual({});
    // Its canonical points at itself, not at a different page.
    expect(await canonical(page)).toContain('/services/model-portfolio/carcassonne');
  });

  test('legal pages are noindex', async ({ page }) => {
    await page.goto('/fr/mentions-legales');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('not found', () => {
  test('answers 404 in the reader’s language', async ({ page }) => {
    const en = await page.goto('/no-such-page');
    expect(en?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('Page not found');

    const fr = await page.goto('/fr/aucune-page');
    expect(fr?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('Page introuvable');
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
  const clickTo = async (page: import('@playwright/test').Page, label: string) => {
    const before = page.url();
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForURL((url) => url.href !== before);
  };

  test('round-trips on a curated leaf', async ({ page }) => {
    await page.goto('/services/wedding/paris');
    await clickTo(page, 'Français');
    await expect(page).toHaveURL(/\/fr\/photographe\/mariage\/paris$/);
    await clickTo(page, 'English');
    await expect(page).toHaveURL(/\/services\/wedding\/paris$/);
  });

  test('round-trips on a noindex leaf, which publishes no hreflang', async ({ page }) => {
    await page.goto('/services/portrait/paris');
    expect(await alternates(page)).toEqual({});
    await clickTo(page, 'Français');
    await expect(page).toHaveURL(/\/fr\/photographe\/portrait-studio-book\/paris$/);
    await expect(page.locator('h1')).not.toContainText('introuvable');
    await clickTo(page, 'English');
    await expect(page).toHaveURL(/\/services\/portrait\/paris$/);
  });

  test('stays on the current origin', async ({ page }) => {
    // The regression this guards: reading the destination from hreflang, whose
    // URLs are absolute and built from NEXT_PUBLIC_SITE_URL, sent anyone on a
    // preview deployment or localhost straight to the production site.
    await page.goto('/cities/annecy');
    const origin = new URL(page.url()).origin;
    await clickTo(page, 'Français');
    expect(new URL(page.url()).origin).toBe(origin);
    await expect(page).toHaveURL(/\/fr\/villes\/annecy$/);
  });

  test('offers no dead link for a service that exists in one language only', async ({ page }) => {
    await page.goto('/fr/photographe/evjf');
    await expect(page.getByRole('button', { name: 'English', exact: true })).toHaveCount(0);
    await expect(page.locator('[aria-disabled="true"]')).toContainText('EN');
  });

  test('falls back to the other language’s home from a 404', async ({ page }) => {
    await page.goto('/services/wedding/nowhere-at-all');
    await clickTo(page, 'Français');
    await expect(page).toHaveURL(/\/fr$/);
  });
});
