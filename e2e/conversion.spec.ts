import { test, expect, type Page } from '@playwright/test';

/**
 * The conversion path, end to end: the two actions, the booking flow, the
 * mobile bar, and the things that must stay hidden until they are real.
 *
 * `/api/lead` is stubbed in every test that submits, so nothing reaches the
 * Telegram bot and the failure path can be forced.
 */

async function fillHomeWidget(page: Page) {
  const widget = page.locator('section[aria-labelledby="find-photographer-heading"]');
  await widget.locator('.choice', { hasText: 'Lisbon' }).click();
  await widget.locator('.choice', { hasText: 'Couple session' }).click();
  await widget.getByLabel('My dates are flexible').check();
  await widget.getByRole('button', { name: /Continue/ }).click();
  await widget.locator('.choice', { hasText: '2 people' }).click();
  await widget.getByLabel('Name').fill('Test Person');
  await widget.getByLabel('WhatsApp number').fill('+44 7700 900000');
  await widget.getByLabel('Email').fill('test@example.com');
  await widget.getByRole('button', { name: /Check availability/ }).click();
  return widget;
}

test.describe('the two actions', () => {
  test('are named the same everywhere, in both languages', async ({ page }) => {
    // English first: visiting /pt sets the locale cookie, after which the
    // middleware sends unprefixed URLs to their Portuguese equivalents.
    for (const [path, primary] of [
      ['/', 'Check availability'],
      ['/pricing', 'Check availability'],
      ['/services/couple', 'Check availability'],
      ['/pt', 'Ver disponibilidade'],
    ] as const) {
      await page.goto(path);
      await expect(page.locator('header').getByRole('link', { name: primary })).toBeVisible();
      const html = await page.content();
      expect(html, `${path} still says "Book now"`).not.toMatch(/>\s*Book now\s*</);
      expect(html, `${path} still says "Check your date"`).not.toContain('Check your date');
    }
  });

  test('the hero WhatsApp link carries a structured message', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('main a[href*="wa.me/"]').first().getAttribute('href');
    const text = decodeURIComponent(href!.split('text=')[1]);
    expect(text).toMatch(/I'd like to book a photography session in Portugal/);
    expect(text).toMatch(/Where:/);
    expect(text).toMatch(/Number of people:/);
  });
});

test.describe('the home booking widget', () => {
  test('submits and says what happens next', async ({ page }) => {
    let payload: Record<string, unknown> | undefined;
    await page.route('**/api/lead', async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.goto('/');
    const widget = await fillHomeWidget(page);
    await expect(widget.getByText(/check photographer availability and get back to you/)).toBeVisible();
    expect(payload).toMatchObject({ citySlug: 'lisboa', serviceSlug: 'couple', groupSize: '2', flexibleDates: true, source: 'quick-match' });
    expect(String(payload!.reference)).toMatch(/^LZ-/);
  });

  test('a failed submission says so and offers WhatsApp', async ({ page }) => {
    await page.route('**/api/lead', (route) => route.fulfill({ status: 502, json: { ok: false } }));
    await page.goto('/');
    const widget = await fillHomeWidget(page);
    await expect(widget.getByRole('alert')).toContainText('couldn’t send');
    await expect(widget.locator('a[data-track-context="booking-failed"]')).toHaveAttribute('href', /wa\.me/);
    await expect(widget.getByText(/get back to you shortly/)).toHaveCount(0);
  });
});

test.describe('/book', () => {
  test('starts at the first unanswered question when the URL answers the rest', async ({ page }) => {
    await page.goto('/book?city=porto&service=family');
    await expect(page.getByRole('heading', { name: 'When?' })).toBeVisible();
  });
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the bottom bar carries both actions, except on the form pages', async ({ page }) => {
    await page.goto('/');
    const bar = page.locator('[data-mobile-cta]');
    await expect(bar).toBeVisible();
    await expect(bar.getByRole('link', { name: 'Check availability' })).toBeVisible();
    await expect(bar.getByRole('link', { name: /WhatsApp/ })).toBeVisible();

    await page.goto('/book');
    await expect(page.locator('[data-mobile-cta]')).toHaveCount(0);
  });

  test('nothing is wider than the screen', async ({ page }) => {
    for (const path of ['/', '/book', '/pricing', '/cities/acores', '/portfolio', '/pt']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} scrolls sideways`).toBeLessThanOrEqual(0);
    }
  });
});

test.describe('nothing invented', () => {
  test('photographer pages do not exist until there are photographers', async ({ request, page }) => {
    for (const path of ['/photographers', '/pt/fotografos', '/photographers/anyone']) {
      expect((await request.get(path)).status(), path).toBe(404);
    }
    await page.goto('/');
    await expect(page.locator('header a[href$="/photographers"]')).toHaveCount(0);
  });

  test('no rating, no review section, no "22 session types"', async ({ page }) => {
    for (const path of ['/', '/portfolio', '/reviews', '/about', '/services']) {
      await page.goto(path);
      const html = await page.content();
      expect(html, path).not.toMatch(/"@type":"AggregateRating"/);
      expect(html, path).not.toMatch(/>22</);
      await expect(page.locator('#stories-heading')).toHaveCount(0);
    }
  });

  test('the portfolio says its photographs are illustrative and credits them', async ({ page }) => {
    await page.goto('/portfolio');
    await expect(page.locator('main')).toContainText('illustrative');
    await expect(page.locator('main')).not.toContainText('Real work');
    await expect(page.locator('figcaption a[href*="unsplash.com"]').first()).toBeVisible();
  });

  test('pricing explains what "from" means', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { name: 'What “from” means' })).toBeVisible();
    await expect(page.locator('main')).not.toContainText('2,200');
  });
});
