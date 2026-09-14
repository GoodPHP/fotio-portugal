import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import { publishedServicesByCategory, getCategoryLabel } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, offerCatalogNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { serviceImage, absoluteOgImage } from '@/lib/images';
import { formatPrice, formatDuration } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { serviceHref } from '@/lib/routes';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The session that fronts the price list on social previews. */
const OG_SERVICE_SLUG = 'family';

const COPY = {
  title: { en: 'Transparent pricing', pt: 'PT_TODO: Transparent pricing' },
  eyebrow: { en: 'No surprises', pt: 'PT_TODO: No surprises' },
  intro: {
    en: 'Indicative "from" prices, tailored to each service. The final cost depends on the type of shoot and is confirmed by our team. No hidden costs.',
    pt: 'PT_TODO: Indicative "from" prices, tailored to each service. The fina',
  },
  includedTitle: { en: 'Always included', pt: 'PT_TODO: Always included' },
  included: {
    en: ['Verified local photographer', 'Professional light & colour editing', 'Private online gallery', 'Delivery in 48-72 hours', '100% money-back guarantee'],
    pt: [
    'PT_TODO: Verified local photographer',
    'PT_TODO: Professional light & colour editing',
    'PT_TODO: Private online gallery',
    'PT_TODO: Delivery in 48-72 hours',
    'PT_TODO: 100% money-back guarantee',
  ],
  },
  addonsTitle: { en: 'Optional add-ons', pt: 'PT_TODO: Optional add-ons' },
  expressLabel: { en: 'Express 24h delivery', pt: 'PT_TODO: Express 24h delivery' },
  secondLabel: { en: 'Second photographer', pt: 'PT_TODO: Second photographer' },
  durationLabel: { en: 'Extended session (1.5x / 2x)', pt: 'PT_TODO: Extended session (1.5x / 2x)' },
  tableService: { en: 'Service', pt: 'PT_TODO: Service' },
  tableDuration: { en: 'Duration', pt: 'PT_TODO: Duration' },
  tablePrice: { en: 'From', pt: 'PT_TODO: From' },
  cta: { en: 'Book now', pt: 'PT_TODO: Book now' },
  ctaSub: { en: 'Custom quote, confirmed within hours.', pt: 'PT_TODO: Custom quote, confirmed within hours.' },
  breadcrumbHome: { en: 'Home', pt: 'PT_TODO: Home' },
} as const;

function c(key: keyof typeof COPY, locale: Locale): string {
  return (COPY[key] as Record<Locale, string>)[locale] ?? COPY[key].en;
}
function cArr(key: 'included', locale: Locale): readonly string[] {
  return (COPY[key] as Record<Locale, readonly string[]>)[locale] ?? COPY[key].en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // "Transparent pricing" is a claim, not a query. What people search for is
  // what a photographer costs, so the title carries the floor price.
  return buildMetadata({
    locale,
    route: '/pricing',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: serviceImage(OG_SERVICE_SLUG),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Only show published services so the pricing table never links to a 404.
  const grouped = publishedServicesByCategory();

  // A price table described only by a BreadcrumbList publishes no prices. The
  // catalogue is built from `grouped`, the same map the table renders, so the
  // markup and the visible figures cannot disagree.
  const pricingUrl = absoluteUrl(locale, '/pricing');
  const catalogueId = `${pricingUrl}#offers`;
  const jsonLd = graph([
    webPageNode({
      url: pricingUrl,
      name: tx(META_TITLE, locale),
      description: tx(META_DESCRIPTION, locale),
      locale,
      type: 'CollectionPage',
      image: absoluteOgImage(serviceImage(OG_SERVICE_SLUG)),
      mainEntityId: catalogueId,
    }),
    offerCatalogNode({
      id: catalogueId,
      name: tx(META_TITLE, locale),
      url: pricingUrl,
      locale,
      offers: [...grouped.entries()].flatMap(([category, services]) =>
        services.map((service) => ({
          name: tx(service.name, locale),
          url: absoluteUrl(locale, '/services/[service]', serviceHref(service, locale).params),
          price: service.initialPrice,
          category: getCategoryLabel(category, locale),
        })),
      ),
    }),
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: pricingUrl },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <JsonLd data={jsonLd} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">
          {c('eyebrow', locale)}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
          {c('title', locale)}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-muted">{c('intro', locale)}</p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section data-surface="dark" className="rounded-card bg-brand-dark p-7 text-white">
          <h2 className="font-display text-xl font-bold">{c('includedTitle', locale)}</h2>
          <ul className="mt-5 space-y-3">
            {cArr('included', locale).map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                <span aria-hidden="true" className="mt-0.5 text-brand-orange-deep">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-card border border-brand-rule bg-white p-7 lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-neutral-900">{c('addonsTitle', locale)}</h2>
          <ul className="mt-5 space-y-3">
            {[c('expressLabel', locale), c('secondLabel', locale), c('durationLabel', locale)].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-medium text-neutral-800">
                <span aria-hidden="true" className="mt-0.5 text-brand-orange-deep">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16 space-y-12">
        {Array.from(grouped.entries()).map(([category, list]) => (
          <div key={category}>
            <h2 className="font-display text-2xl font-bold text-neutral-900">
              {getCategoryLabel(category, locale)}
            </h2>
            <div className="mt-4 overflow-hidden rounded-card border border-brand-rule bg-white">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-brand-rule bg-brand-sand/50 text-xs uppercase tracking-wide text-brand-muted">
                    <th scope="col" className="px-5 py-3 font-semibold">{c('tableService', locale)}</th>
                    <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">{c('tableDuration', locale)}</th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">{c('tablePrice', locale)}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {list.map((s) => (
                    <tr key={s.slug} className="transition hover:bg-brand-sand/30">
                      <th scope="row" className="px-5 py-4 text-left">
                        <Link
                          href={serviceHref(s, locale)}
                          className="font-medium text-neutral-900 underline-offset-4 hover:text-brand-orange-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
                        >
                          {tx(s.name, locale)}
                        </Link>
                      </th>
                      <td className="hidden px-5 py-4 text-sm text-brand-muted sm:table-cell">
                        {formatDuration(s.durationMinutes, locale)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-display text-lg font-bold text-neutral-900">
                          {formatPrice(s.initialPrice, locale)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <SeoProse
        nested
        headingId="pricing-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />

      <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-card bg-brand-orange-deep p-8 text-white sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold">{c('cta', locale)}</h2>
          <p className="mt-1 text-white">{c('ctaSub', locale)}</p>
        </div>
        <Link
          href="/book"
          className="inline-flex items-center rounded-chip bg-white px-7 py-3.5 font-semibold text-brand-dark transition hover:bg-brand-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          {c('cta', locale)}
        </Link>
      </section>
    </main>
  );
}
