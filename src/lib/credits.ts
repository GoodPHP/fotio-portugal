import credits from '../../public/images/credits.json';

interface CreditEntry {
  photographer: string;
  photographerUrl: string;
}

/**
 * Who took the photograph in a slot, for a visible credit under it.
 *
 * Read from `public/images/credits.json`, which the photo pipeline writes.
 * Server-side only, and kept out of `images.ts` because two client
 * components import that module and would otherwise ship this file.
 * The portfolio used to promise that licensed stock was "credited and marked
 * as such" while the only place that did so — the photo-credits page — was
 * hidden with the rest of the legal pages. The credit now travels with the
 * image.
 */
export function imageCredit(slot: string): { name: string; url: string } | undefined {
  const entry = (credits.photos as Record<string, CreditEntry | undefined>)[slot];
  return entry ? { name: entry.photographer, url: entry.photographerUrl } : undefined;
}
