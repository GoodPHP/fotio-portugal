import {
  SERVICES,
  getServiceById,
  publishedCities,
  publishedServices,
  serviceSlug,
  serviceExistsIn,
} from '@/lib/catalog';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { absoluteUrl } from '@/lib/urls';
import { LOCALES, DEFAULT_LOCALE, tx, type Locale } from '@/lib/locales';
import { pathnames, type AppPathname } from '@/i18n/pathnames';

// Generated at build time, like the sitemap it sits beside. The two describe
// the same catalogue and must not be able to drift apart by an hour.
export const dynamic = 'force-static';

/**
 * /llms.txt — a plain-text index for AI answer engines.
 *
 * Built from the catalogue and the routing table rather than from literals, so
 * it cannot describe URLs the site does not serve. That matters more here than
 * elsewhere: this file exists to be believed without being crawled.
 */
export function GET(): Response {
  const lines: string[] = [];
  const cities = publishedCities();
  const services = publishedServices();
  const minPrice = Math.min(...SERVICES.map((s) => s.initialPrice));

  const push = (s = '') => lines.push(s);

  push(`# ${SITE_NAME}`);
  push();
  push(
    `> ${SITE_NAME} connects travellers, couples, families and businesses with vetted local ` +
      `photographers across ${cities.length} cities and destinations in France. Fixed prices from ` +
      `€${minPrice}, agreed before booking. Private online gallery delivered in 48–72 hours.`,
  );
  push();

  push('## Languages');
  push(`- English is the default and is served without a prefix: ${SITE_URL}/services`);
  push(`- French is served under /fr with translated segments: ${absoluteUrl('pt', '/services')}`);
  push(
    '- The two are not mirror images. Some services are offered in one language only, because ' +
      'the audiences differ: English covers inbound destination work, French covers domestic ' +
      'life events. A page that exists in one language emits no alternate for the other.',
  );
  push();

  push('## Primary hubs');
  const hubs = [
    ['/', 'overview, how it works, featured cities and services'],
    ['/services', `all ${services.length} session types`],
    ['/cities', `all ${cities.length} cities and destinations`],
    ['/pricing', 'fixed prices for every service'],
    ['/portfolio', 'sample work, filterable by category'],
    ['/reviews', 'client reviews and the aggregate rating'],
    ['/blog', 'guides on locations, seasons, permits and planning'],
    ['/about', 'how the network is vetted and how booking works'],
    ['/contact', 'enquiries'],
    ['/book', 'the booking form'],
  ] as const;
  for (const [route, note] of hubs) {
    push(`- [${route}](${absoluteUrl(DEFAULT_LOCALE, route)}): ${note}`);
  }
  push();

  push('## Cities');
  for (const city of cities) {
    const top = city.topServices
      .map((id) => getServiceById(id))
      .filter((s): s is NonNullable<typeof s> => Boolean(s) && serviceExistsIn(s!, 'en'))
      .slice(0, 4)
      .map((s) => tx(s.name, 'en'))
      .join(', ');
    const spot = city.spots[0]?.name;
    const url = absoluteUrl('en', '/cities/[city]', { city: city.slug });
    push(
      `- [${city.name}](${url}) — ${tx(city.region, 'en')}.` +
        (top ? ` Top: ${top}.` : '') +
        (spot ? ` Key location: ${spot}.` : ''),
    );
  }
  push();

  push('## Services');
  for (const service of services) {
    const only = LOCALES.filter((l) => serviceExistsIn(service, l));
    const scope = only.length === LOCALES.length ? '' : ` (${only.join(', ')} only)`;
    const locale = only.includes('en') ? 'en' : only[0];
    const url = absoluteUrl(locale, '/services/[service]', { service: serviceSlug(service, locale) });
    push(`- [${tx(service.name, locale)}](${url}) — from €${service.initialPrice}${scope}`);
  }
  push();

  push('## URL patterns');
  // Built from the route table rather than through absoluteUrl: these are
  // illustrative patterns, and percent-encoding the braces would make them
  // unreadable as patterns.
  const pattern = (route: AppPathname, locale: Locale) => {
    const path = pathnames[route][locale];
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    return `${SITE_URL}${prefix}${path}`;
  };
  for (const [label, route] of [
    ['City', '/cities/[city]'],
    ['Service', '/services/[service]'],
    ['Service in a city', '/services/[service]/[city]'],
  ] as const) {
    push(`- ${label}: ${pattern(route, 'en')} · ${pattern(route, 'pt')}`);
  }
  push(
    '- Service slugs are translated. /services/wedding/paris and ' +
      '/fr/photographe/mariage/paris are the same page; city slugs are identical in both.',
  );
  push(
    '- Combinations without written copy still render, but carry noindex and are absent from ' +
      'the sitemap. Only the pages listed in /sitemap.xml are intended for indexing.',
  );
  push();

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
