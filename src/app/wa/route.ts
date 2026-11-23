import { whatsappDeepLink } from '@/lib/site';

/**
 * `/wa?text=…` → `https://wa.me/<number>?text=…`.
 *
 * Every WhatsApp button on the site links here instead of to `wa.me`, so the
 * number is not in the page source for scrapers, and changing it is one
 * constant in `site.ts`. A plain 302: nothing here should be cached or
 * indexed, and the message is the visitor's own booking details.
 */
export const dynamic = 'force-dynamic';

const MAX_TEXT = 2000;

export function GET(request: Request): Response {
  const text = (new URL(request.url).searchParams.get('text') ?? '').slice(0, MAX_TEXT);
  return new Response(null, {
    status: 302,
    headers: {
      Location: whatsappDeepLink(text),
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
