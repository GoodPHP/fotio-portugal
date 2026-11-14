/**
 * One "phone or email" field, read as whichever it is.
 *
 * The /book form asks for a single way to reply rather than both: a visitor
 * who would rather not hand over a phone number can still ask. Pure and
 * dependency-free so the client form and its tests share it.
 */

export type ContactInput = { email: string } | { phone: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^\+?[0-9\s().-]+$/;
const MIN_PHONE_DIGITS = 6;
const MAX_PHONE_LENGTH = 30;

/** The email or phone the visitor typed, or null when it is neither. */
export function parseContact(raw: string): ContactInput | null {
  const value = raw.trim();
  if (EMAIL_RE.test(value)) return { email: value };
  const digits = value.replace(/[^0-9]/g, '');
  if (
    PHONE_CHARS_RE.test(value) &&
    digits.length >= MIN_PHONE_DIGITS &&
    value.length <= MAX_PHONE_LENGTH
  ) {
    return { phone: value };
  }
  return null;
}
