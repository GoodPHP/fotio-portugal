/**
 * Localized URL segments.
 *
 * The App Router tree is English — one physical set of folders — and next-intl
 * rewrites the French URLs onto it. So `/fr/photographe/mariage/paris` and
 * `/services/wedding/paris` are the same route key, `/services/[service]/[city]`,
 * and there is no `photographe/` directory anywhere on disk.
 *
 * The segment is data here rather than a literal spread across the pages, for
 * one reason: the canonical URL, the hreflang alternates, the sitemap and every
 * internal link all have to agree on it, and four independent implementations
 * of the same string is three too many.
 *
 * This module imports nothing. `scripts/generate-sitemap.ts` runs under plain
 * tsx before the Next build, with no request context and no bundler, and it
 * needs these values.
 */

export const pathnames = {
  '/': { en: '/', fr: '/' },

  '/services': { en: '/services', fr: '/photographe' },
  '/services/[service]': { en: '/services/[service]', fr: '/photographe/[service]' },
  '/services/[service]/[city]': {
    en: '/services/[service]/[city]',
    fr: '/photographe/[service]/[city]',
  },

  '/cities': { en: '/cities', fr: '/villes' },
  '/cities/[city]': { en: '/cities/[city]', fr: '/villes/[city]' },

  '/pricing': { en: '/pricing', fr: '/tarifs' },
  '/portfolio': { en: '/portfolio', fr: '/portfolio' },
  '/reviews': { en: '/reviews', fr: '/avis' },
  '/about': { en: '/about', fr: '/a-propos' },
  '/contact': { en: '/contact', fr: '/contact' },
  '/book': { en: '/book', fr: '/reservation' },

  '/blog': { en: '/blog', fr: '/blog' },
  '/blog/[slug]': { en: '/blog/[slug]', fr: '/blog/[slug]' },

  // Legal pages keep the names French readers expect to see in a footer.
  '/legal/notice': { en: '/legal/notice', fr: '/mentions-legales' },
  '/legal/privacy': { en: '/legal/privacy', fr: '/confidentialite' },
  '/legal/terms': { en: '/legal/terms', fr: '/cgv' },
  '/legal/image-rights': { en: '/legal/image-rights', fr: '/droit-a-l-image' },
  '/legal/photo-credits': { en: '/legal/photo-credits', fr: '/credits-photos' },
} as const;

/** Every route the site serves, named by its English path. */
export type AppPathname = keyof typeof pathnames;

/** Dynamic segment values for a route, already localized for one locale. */
export type RouteParams = Record<string, string>;
