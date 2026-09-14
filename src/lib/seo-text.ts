/**
 * SERP-length helpers for titles and meta descriptions.
 *
 * Ahrefs (and Google) flag titles whose rendered width exceeds ~60 chars and
 * descriptions over ~160 chars. These helpers trim at word boundaries so the
 * dynamic part of a templated title/description never blows the limit, while
 * the brand suffix is always preserved. See `buildMetadata` in `seo.ts`.
 */

/** Default SERP limits (characters), matching the Ahrefs audit thresholds. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

const ELLIPSIS = '…';

/**
 * Trim `text` to at most `max` characters at a word boundary. Never cuts a word
 * in half: drops back to the last whole word that fits. Appends an ellipsis only
 * when truncation actually happened (and only if it still fits within `max`).
 */
export function truncateAtWord(
  text: string,
  max: number,
  { ellipsis = ELLIPSIS }: { ellipsis?: string } = {},
): string {
  const trimmed = text.trim();
  if (max <= 0) return '';
  if (trimmed.length <= max) return trimmed;

  // Reserve room for the ellipsis so the final string stays within `max`.
  const budget = Math.max(0, max - ellipsis.length);
  const slice = trimmed.slice(0, budget);
  const lastSpace = slice.lastIndexOf(' ');
  const wordSafe = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  // Strip trailing punctuation/space before the ellipsis for a clean cut.
  const cleaned = wordSafe.replace(/[\s.,;:!?\-–—]+$/u, '');
  return `${cleaned}${ellipsis}`;
}

/** Clamp a meta description to `max` chars at a word boundary. */
export function clampDescription(description: string, max: number = DESCRIPTION_MAX): string {
  return truncateAtWord(description, max);
}

/**
 * Clamp a page title to `max` chars while preserving a trailing brand.
 *
 * Splits on the first brand separator (` | `, ` · `, ` — ` followed by the brand)
 * and truncates only the dynamic part so `"<dynamic> <sep> <brand>"` stays within
 * `max`. When `brandSuffixLen` is given (the brand the layout appends to
 * non-absolute titles), the dynamic part is trimmed so the
 * eventual rendered title — dynamic + that suffix — also fits.
 */
export function clampTitle(
  title: string,
  {
    max = TITLE_MAX,
    brandSuffixLen = 0,
    brand,
  }: { max?: number; brandSuffixLen?: number; brand?: string } = {},
): string {
  const trimmed = title.trim();

  // Case 1: brand already inside the title — preserve the brand, trim the lead.
  if (brand && trimmed.includes(brand)) {
    const sep = findBrandSeparator(trimmed, brand);
    if (sep) {
      const { lead, suffix } = sep; // suffix includes separator + brand
      if (trimmed.length <= max) return trimmed;
      const leadBudget = max - suffix.length;
      if (leadBudget <= 0) return trimmed; // brand alone already ≥ max; leave as-is
      const clampedLead = truncateAtWord(lead, leadBudget);
      return `${clampedLead}${suffix}`;
    }
    // Brand present but no recognizable separator: fall through to plain clamp.
  }

  // Case 2: layout will append a brand suffix to this (non-absolute) title.
  const effectiveMax = max - brandSuffixLen;
  return truncateAtWord(trimmed, Math.max(0, effectiveMax));
}

/** Locate the brand separator and split into lead + "<sep><brand>" suffix. */
function findBrandSeparator(
  title: string,
  brand: string,
): { lead: string; suffix: string } | null {
  const brandIdx = title.lastIndexOf(brand);
  if (brandIdx <= 0) return null;
  // Walk back over the separator characters immediately before the brand.
  const before = title.slice(0, brandIdx);
  const match = before.match(/[\s|·—–-]+$/u);
  if (!match) return null;
  const sepStart = brandIdx - match[0].length;
  return {
    lead: title.slice(0, sepStart).trim(),
    suffix: title.slice(sepStart),
  };
}
