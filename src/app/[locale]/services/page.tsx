import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { getCategoryLabel, publishedServices, publishedServicesByCategory } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, itemListNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import { serviceHref } from '@/lib/routes';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The card that fronts the catalogue on social previews. */
const OG_SERVICE_SLUG = 'portrait';
import ServiceFilter, {
  type ServiceFilterItem,
  type ServiceFilterCategory,
} from '@/components/ServiceFilter';

const COPY = {
  title: { en: 'Photography services', pt: 'Serviços de fotografia' },
  intro: {
    en: 'From individual portraits to weddings, corporate to food: choose the perfect service at a fixed, locked price. Private gallery delivered in 48-72 hours.',
    pt: 'Do retrato individual ao casamento, do corporativo à gastronomia: escolha o serviço certo a um preço fixo e fechado. Galeria privada em 48-72 horas.',
  },
  eyebrow: { en: 'Full catalogue', pt: 'Catálogo completo' },
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
  // "Photography services" alone spends the title on a category label and
  // names neither the country nor the promise. Both belong in the sixty chars.
  return buildMetadata({
    locale,
    route: '/services',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(serviceSlot(OG_SERVICE_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Only list published services so the catalogue never links to a 404.
  const grouped = publishedServicesByCategory();
  const categories: ServiceFilterCategory[] = Array.from(grouped.keys()).map((cat) => ({
    value: cat,
    label: getCategoryLabel(cat, locale),
  }));

  const services: ServiceFilterItem[] = publishedServices().map((s) => ({
    slug: s.slug,
    name: tx(s.name, locale),
    category: s.category,
    price: s.initialPrice,
    categoryLabel: getCategoryLabel(s.category, locale),
  }));

  // A hub that lists things is a CollectionPage whose subject is the list —
  // saying so is what makes the catalogue eligible for a rich result instead of
  // reading as an unremarkable page with links on it. The ItemList is derived
  // from `services`, the same array the filter renders, so the two cannot drift.
  const hubUrl = absoluteUrl(locale, '/services');
  const catalogueId = `${hubUrl}#catalogue`;
  const jsonLd = graph([
    webPageNode({
      url: hubUrl,
      name: tx(META_TITLE, locale),
      description: tx(META_DESCRIPTION, locale),
      locale,
      type: 'CollectionPage',
      image: absoluteOgImage(ogImagePath(serviceSlot(OG_SERVICE_SLUG))),
      mainEntityId: catalogueId,
    }),
    itemListNode(
      publishedServices().map((service) => ({
        name: tx(service.name, locale),
        url: absoluteUrl(locale, '/services/[service]', serviceHref(service, locale).params),
        image: absoluteOgImage(ogImagePath(serviceSlot(service.slug))),
      })),
      { id: catalogueId, name: tx(META_TITLE, locale) },
    ),
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: hubUrl },
    ]),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
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

      <section className="mt-14">
        <ServiceFilter services={services} categories={categories} locale={locale} />
      </section>

      <SeoProse
        nested
        headingId="services-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />
    </main>
  );
}
