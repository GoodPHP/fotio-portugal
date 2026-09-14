import { notFound } from 'next/navigation';

/**
 * Catch-all inside the locale segment.
 *
 * Without it, /fr/does-not-exist matches no route at all and falls through to
 * the root not-found page, which has no locale and so answers a French reader
 * in English. Calling notFound() from inside [locale] hands the request to
 * [locale]/not-found.tsx, which does.
 */
export default function CatchAllNotFound() {
  notFound();
}
