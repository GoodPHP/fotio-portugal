import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { SERVICES, CITIES } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, reserveActionNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The session that fronts the booking page on social previews. */
const OG_SERVICE_SLUG = 'proposal';
import BookingWidget, {
  type BookingServiceOption,
  type BookingCityOption,
} from '@/components/BookingWidget';

const COPY = {
  title: { en: 'Book your session', pt: 'Reserve a sua sessão' },
  eyebrow: { en: 'Free quote', pt: 'Orçamento gratuito' },
  intro: {
    en: 'Tell us about your session and we’ll send a tailored price on WhatsApp within minutes. Every quote is personalised.',
    pt: 'Conte-nos como imagina a sessão e enviamos um preço à medida pelo WhatsApp em poucos minutos. Cada orçamento é personalizado.',
  },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
} as const;

function c(key: keyof typeof COPY, locale: Locale): string {
  return (COPY[key] as Record<Locale, string>)[locale] ?? COPY[key].en;
}

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

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services: BookingServiceOption[] = SERVICES.map((s) => ({
    slug: s.slug,
    name: tx(s.name, locale),
    price: s.initialPrice,
  }));
  const cities: BookingCityOption[] = CITIES.map((city) => ({ slug: city.slug, name: city.name }));

  // The page's whole purpose is an action a crawler cannot perform, so it is
  // declared rather than left to be inferred from a form.
  const bookUrl = absoluteUrl(locale, '/book');
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
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: bookUrl },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <JsonLd data={jsonLd} />
      <header className="max-w-3xl">
        <p className="eyebrow">
          {c('eyebrow', locale)}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl">
          {c('title', locale)}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-muted">{c('intro', locale)}</p>
      </header>

      <section className="mt-12">
        <BookingWidget services={services} cities={cities} locale={locale} />
      </section>

      <SeoProse
        nested
        headingId="book-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />
    </main>
  );
}
