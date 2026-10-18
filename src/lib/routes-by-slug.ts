/**
 * Slug-only route helpers, for client components that receive projected data
 * rather than whole catalogue entries. The slug they are given must already be
 * the one for the locale being rendered.
 *
 * This module imports nothing, and that is its reason to exist. `routes.ts`
 * imports the catalogue, and a client component that imported these from there
 * shipped every service, place and leaf's copy to the browser with it: the
 * /services and /cities hubs loaded 621 kB of JavaScript for a filter.
 */

export function serviceHrefBySlug(slug: string) {
  return { pathname: '/services/[service]', params: { service: slug } } as const;
}

export function cityHrefBySlug(slug: string) {
  return { pathname: '/cities/[city]', params: { city: slug } } as const;
}
