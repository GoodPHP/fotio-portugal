import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, reserveActionNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import { bookingOptions } from '@/lib/booking-options';
import { REPLY_TIME, MATCHING } from '@/lib/promises';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import BookingFlow from '@/components/BookingFlow';
import Breadcrumbs from '@/components/Breadcrumbs';
import HowItWorks from '@/components/HowItWorks';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The session that fronts the booking page on social previews. */
const OG_SERVICE_SLUG = 'proposal';

const COPY = {
  title: { en: 'Check photographer availability', pt: 'Ver disponibilidade de fotógrafos' },
  eyebrow: { en: 'Photographer matching', pt: 'Escolha do fotógrafo' },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
  breadcrumb: { en: 'Check availability', pt: 'Ver disponibilidade' },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    route: '/book',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(serviceSlot(OG_SERVICE_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

/**
 * Checking availability: the page every primary button on the site leads to.
 *
 * It is framed as what actually happens — a person matching the request to a
 * photographer and replying with a confirmed price — rather than as "book
 * your session", which promised an instant booking the business does not
 * offer and made the form below read like a checkout.
 */
export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // The page's whole purpose is an action a crawler cannot perform, so it is
  // declared rather than left to be inferred from a form.
  const bookUrl = absoluteUrl(locale, '/book');
  const crumbs = [
    { name: COPY.breadcrumbHome[locale], url: absoluteUrl(locale, '/') },
    { name: COPY.breadcrumb[locale], url: bookUrl },
  ];
  const jsonLd = graph([
    {
      ...webPageNode({
        url: bookUrl,
        name: tx(META_TITLE, locale),
        description: tx(META_DESCRIPTION, locale),
        locale,
        image: absoluteOgImage(ogImagePath(serviceSlot(OG_SERVICE_SLUG))),
      }),
      potentialAction: reserveActionNode({
        url: bookUrl,
        name: tx(META_TITLE, locale),
        description: tx(META_DESCRIPTION, locale),
      }),
    },
    breadcrumbNode(crumbs),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-[92rem] px-6 pb-[var(--space-band)] pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: crumbs[0].name, href: '/' }, { name: crumbs[1].name }]} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{COPY.eyebrow[locale]}</p>
          <h1
            className="font-display mt-4 font-bold leading-[1.0] text-brand-dark"
            style={{ fontSize: 'var(--text-title)' }}
          >
            {COPY.title[locale]}
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-brand-muted">
            {tx(MATCHING.promise, locale)} {tx(REPLY_TIME, locale)} {tx(MATCHING.noPayment, locale)}
          </p>
        </header>

        <section aria-label={COPY.title[locale]} className="mt-10">
          <BookingFlow options={bookingOptions(locale)} locale={locale} variant="full" readQuery />
        </section>
      </div>

      <HowItWorks locale={locale} withCta={false} />

      <SeoProse
        headingId="book-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />
    </main>
  );
}
