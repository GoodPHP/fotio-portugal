import createNextIntlPlugin from 'next-intl/plugin';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // No `images` config: nothing on this site goes through next/image any more.
  // Every photograph is rendered to AVIF and WebP at build time by
  // `npm run photos:fetch` and served as a content-hashed static asset — see
  // src/components/Picture.tsx for why.
  eslint: {
    // Type-safety is enforced via `tsc` (npm run typecheck); skip lint during builds.
    ignoreDuringBuilds: true,
  },
  // Pin tracing root to this project (stray parent lockfiles otherwise mis-infer it).
  outputFileTracingRoot: import.meta.dirname,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

// Gives `next dev` the Cloudflare bindings declared in wrangler.jsonc,
// so local development and the deployed worker see the same environment.
initOpenNextCloudflareForDev();
