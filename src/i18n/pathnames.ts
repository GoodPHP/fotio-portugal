/**
 * Localized URL segments.
 *
 * The App Router tree is English — one physical set of folders — and next-intl
 * rewrites the Portuguese URLs onto it. So `/pt/fotografo/casamento/lisboa` and
 * `/services/wedding/lisboa` are the same route key,
 * `/services/[service]/[city]`, and there is no `fotografo/` directory anywhere
 * on disk.
 *
 * The segment is data here rather than a literal spread across the pages, for
 * one reason: the canonical URL, the hreflang alternates, the sitemap and every
 * internal link all have to agree on it, and four independent implementations
 * of the same string is three too many.
 *
 * Every segment is ASCII, deliberately. Portuguese words with diacritics are
 * legal in a URL as percent-encoded UTF-8, but they render as `%C3%A7` in a
 * search result, survive copy-paste badly, and have to be decoded before any
 * comparison here can match. `precos`, not `preços`.
 *
 * This module imports nothing. `scripts/generate-sitemap.ts` runs under plain
 * tsx before the Next build, with no request context and no bundler, and it
 * needs these values.
 */

export const pathnames = {
  '/': { en: '/', pt: '/' },

  // "fotógrafo em Lisboa" is the shape of the Portuguese query, so the hub is
  // the profession rather than the abstraction: /fotografo, not /servicos.
  '/services': { en: '/services', pt: '/fotografo' },
  '/services/[service]': { en: '/services/[service]', pt: '/fotografo/[service]' },
  '/services/[service]/[city]': {
    en: '/services/[service]/[city]',
    pt: '/fotografo/[service]/[city]',
  },

  '/cities': { en: '/cities', pt: '/cidades' },
  '/cities/[city]': { en: '/cities/[city]', pt: '/cidades/[city]' },

  '/pricing': { en: '/pricing', pt: '/precos' },
  '/portfolio': { en: '/portfolio', pt: '/portfolio' },
  '/reviews': { en: '/reviews', pt: '/avaliacoes' },
  '/about': { en: '/about', pt: '/sobre' },
  '/contact': { en: '/contact', pt: '/contacto' },
  '/book': { en: '/book', pt: '/reservar' },

  '/blog': { en: '/blog', pt: '/blog' },
  '/blog/[slug]': { en: '/blog/[slug]', pt: '/blog/[slug]' },

  // Legal pages keep the names a Portuguese reader expects in a footer.
  '/legal/notice': { en: '/legal/notice', pt: '/informacao-legal' },
  '/legal/privacy': { en: '/legal/privacy', pt: '/politica-de-privacidade' },
  '/legal/terms': { en: '/legal/terms', pt: '/termos-e-condicoes' },
  '/legal/image-rights': { en: '/legal/image-rights', pt: '/direito-a-imagem' },
  '/legal/photo-credits': { en: '/legal/photo-credits', pt: '/creditos-fotograficos' },
  // Portugal obliges a consumer-facing service provider to publish the
  // electronic complaints book. See `src/lib/legal.ts`.
  '/legal/complaints': { en: '/legal/complaints', pt: '/livro-de-reclamacoes' },
} as const;

/** Every route the site serves, named by its English path. */
export type AppPathname = keyof typeof pathnames;

/** Dynamic segment values for a route, already localized for one locale. */
export type RouteParams = Record<string, string>;
