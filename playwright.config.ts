import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT ?? 3000);
const baseURL = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

/**
 * Smoke tests against a production build.
 *
 * These cover the things unit tests cannot reach: that the middleware actually
 * serves the translated French URLs, that hreflang is reciprocal in the
 * rendered HTML, and that a page we deliberately excluded from the index says
 * so. `next start` is used rather than `next dev` because the routing under
 * test — prerendering, ISR, the locale rewrite — behaves differently in dev.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL, trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        // Builds as well as serves: a page whose drip slot has not passed is
        // prerendered as a 404 and stays cached as one, so gating has to be off
        // for the build too, not only for the server.
        command: 'npm run build:e2e && npm run start:e2e',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 300_000,
      },
});
