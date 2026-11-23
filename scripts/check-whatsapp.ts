/**
 * Fails the build if the WhatsApp number is not a real one.
 *
 * WhatsApp is the second conversion on every page — the header, the sticky
 * mobile bar, every hero, the booking confirmation — and all of them go
 * through `/wa`, which redirects to `wa.me/<WHATSAPP_NUMBER>`. A wrong value
 * opens WhatsApp's "choose a contact" screen with the visitor's booking
 * details and nobody to send them to. Nothing throws and nothing looks wrong
 * until someone taps it.
 *
 *   npx tsx scripts/check-whatsapp.ts
 */
import { WHATSAPP_NUMBER } from '../src/lib/site';

// E.164 allows up to 15 digits; anything under 8 is not a phone number.
const problem = !/^[0-9]+$/.test(WHATSAPP_NUMBER)
  ? `must be digits only (${WHATSAPP_NUMBER})`
  : WHATSAPP_NUMBER.length < 8 || WHATSAPP_NUMBER.length > 15
    ? `is not a phone number in international format (${WHATSAPP_NUMBER})`
    : /^3510+$/.test(WHATSAPP_NUMBER)
      ? `is the all-zeros placeholder (${WHATSAPP_NUMBER})`
      : null;

if (problem) {
  console.error(`[check-whatsapp] WHATSAPP_NUMBER in src/lib/site.ts ${problem}.`);
  process.exit(1);
}
console.log(`[check-whatsapp] ok — +${WHATSAPP_NUMBER}`);
