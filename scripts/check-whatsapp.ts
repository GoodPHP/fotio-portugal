/**
 * Fails the build while the WhatsApp number is a placeholder.
 *
 * WhatsApp is the second conversion on every page — the header, the sticky
 * mobile bar, every hero, the booking confirmation — and `.env.production`
 * ships `NEXT_PUBLIC_WHATSAPP_NUMBER=TODO_WHATSAPP`. `site.ts` strips the
 * non-digits, which leaves an empty string, so every one of those buttons
 * opens `https://wa.me/?text=…`: WhatsApp's own "choose a contact" screen,
 * with the visitor's booking details and nobody to send them to. Nothing
 * throws and nothing looks wrong until someone taps it.
 *
 * Reads the env the way `next build` will, via @next/env, so the value
 * checked is the value that gets inlined. ALLOW_WHATSAPP_TODO=1 downgrades
 * the failure to a warning for previews; the deploy script does not set it.
 *
 *   npx tsx scripts/check-whatsapp.ts
 */
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');

const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const digits = raw.replace(/[^0-9]/g, '');

// E.164 allows up to 15 digits; anything under 8 is not a phone number, and
// the old fallback 351000000000 is a placeholder that happens to be digits.
const problem =
  raw.trim() === ''
    ? 'is not set'
    : /TODO/i.test(raw)
      ? `is a placeholder (${raw})`
      : digits.length < 8 || digits.length > 15
        ? `is not a phone number in international format (${raw})`
        : /^3510+$/.test(digits)
          ? `is the all-zeros placeholder (${raw})`
          : null;

if (!problem) {
  console.log(`[check-whatsapp] ok — +${digits}`);
  process.exit(0);
}

const lenient = process.env.ALLOW_WHATSAPP_TODO === '1';
const log = lenient ? console.warn : console.error;
log(`[check-whatsapp] NEXT_PUBLIC_WHATSAPP_NUMBER ${problem}.`);
log('Every "Chat on WhatsApp" button would open WhatsApp with no recipient.');
log('Set it in .env.production, e.g. NEXT_PUBLIC_WHATSAPP_NUMBER=351912345678.');

if (lenient) {
  console.warn('\n[check-whatsapp] ALLOW_WHATSAPP_TODO=1 — continuing anyway. Do not deploy like this.');
  process.exit(0);
}
process.exit(1);
