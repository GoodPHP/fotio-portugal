import { SITE_URL } from './site';
import { LOCALES, DEFAULT_LOCALE, type Locale } from './locales';
import { pathnames, type AppPathname, type RouteParams } from '@/i18n/pathnames';

const PARAM = /\[(\.\.\.)?(\w+)\]/g;

/**
 * Browser-visible path for a route in a locale, including the locale prefix.
 *
 * Mirrors what next-intl's middleware serves under `localePrefix: 'as-needed'`,
 * but stays pure — no Next, React or request context — so the sitemap generator
 * can call it from plain Node.
 *
 * `params` values must already be the slugs for `locale`.
 */
export function localizedPath(locale: Locale, route: AppPathname, params?: RouteParams): string {
  let path: string = pathnames[route][locale];

  path = path.replace(PARAM, (_match, _rest, key: string) => {
    const value = params?.[key];
    if (value === undefined) {
      throw new Error(`localizedPath: missing param "${key}" for route "${route}"`);
    }
    return encodeURIComponent(value);
  });

  path = path.replace(/\/+$/, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${prefix}${path}` || '/';
}

/** Absolute canonical URL (no trailing slash) for a locale + route. */
export function absoluteUrl(locale: Locale, route: AppPathname, params?: RouteParams): string {
  const path = localizedPath(locale, route, params);
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Which locales a page exists in, and the params it takes in each.
 *
 * Presence of a key is the claim that the page exists in that locale. A service
 * offered only in France has no `en` entry, so no English alternate is ever
 * built for it — the alternative is advertising a URL that 404s.
 */
export type AlternateParams = Partial<Record<Locale, RouteParams>>;

/** Every locale, no dynamic params — the shape static routes use. */
export const ALL_LOCALES_NO_PARAMS: AlternateParams = Object.fromEntries(
  LOCALES.map((locale) => [locale, {}]),
);

/**
 * hreflang map for a route, covering only the locales the page exists in.
 *
 * `x-default` points at English when English exists, and otherwise at the one
 * version there is — never at a URL we do not serve.
 */
export function languageAlternates(
  route: AppPathname,
  alternates: AlternateParams = ALL_LOCALES_NO_PARAMS,
): Record<string, string> | undefined {
  const present = LOCALES.filter((locale) => alternates[locale] !== undefined);
  if (present.length === 0) return undefined;

  const map: Record<string, string> = {};
  for (const locale of present) {
    map[locale] = absoluteUrl(locale, route, alternates[locale]);
  }
  map['x-default'] = map[DEFAULT_LOCALE] ?? map[present[0]];
  return map;
}

/**
 * Root-relative path for each locale the page exists in.
 *
 * Same presence semantics as `languageAlternates`, but relative and emitted
 * even for noindex pages. hreflang cannot serve both jobs: it is withheld from
 * noindex pages on purpose, and it carries absolute production URLs — neither
 * of which suits the language switcher, which needs the answer on every page
 * and must stay on the origin it is running on.
 */
export function localizedPaths(
  route: AppPathname,
  alternates: AlternateParams = ALL_LOCALES_NO_PARAMS,
): Partial<Record<Locale, string>> {
  const map: Partial<Record<Locale, string>> = {};
  for (const locale of LOCALES) {
    const params = alternates[locale];
    if (params !== undefined) map[locale] = localizedPath(locale, route, params);
  }
  return map;
}
