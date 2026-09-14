import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { publishedCities } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, itemListNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { citySlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE } from './content';

/** The city that fronts the directory on social previews. */
const OG_CITY_SLUG = 'paris';
import CityFilter, { type CityFilterItem } from '@/components/CityFilter';

const COPY = {
  title: { en: 'Our cities', pt: 'Onde fotografamos' },
  intro: {
    en: 'Vetted local photographers in twelve Portuguese cities and destinations. They know which hour a place is still empty and what the permits actually cost.',
    pt: 'Fotógrafos locais verificados em doze cidades e destinos portugueses. Sabem a que hora um sítio ainda está vazio e quanto custam de facto as autorizações.',
  },
  eyebrow: { en: 'Nationwide coverage', pt: 'Cobertura nacional' },
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
  // "Our cities" spends eighteen of sixty characters saying nothing a searcher
  // typed. The count and the country are what the query actually contains.
  return buildMetadata({
    locale,
    route: '/cities',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(citySlot(OG_CITY_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function CitiesHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Only list published cities so the directory never links to a 404.
  const cities: CityFilterItem[] = publishedCities().map((city) => ({
    slug: city.slug,
    name: city.name,
    region: tx(city.region, locale),
    blurb: tx(city.narrative, locale),
  }));

  // The directory is the page's subject, so it is described as one: a
  // CollectionPage whose mainEntity is the ItemList of cities. Both are built
  // from `cities`, the array the filter renders, so neither can drift from it.
  const hubUrl = absoluteUrl(locale, '/cities');
  const directoryId = `${hubUrl}#directory`;
  const jsonLd = graph([
    webPageNode({
      url: hubUrl,
      name: tx(META_TITLE, locale),
      description: tx(META_DESCRIPTION, locale),
      locale,
      type: 'CollectionPage',
      image: absoluteOgImage(ogImagePath(citySlot(OG_CITY_SLUG))),
      mainEntityId: directoryId,
    }),
    itemListNode(
      cities.map((city) => ({
        name: city.name,
        url: absoluteUrl(locale, '/cities/[city]', { city: city.slug }),
        image: absoluteOgImage(ogImagePath(citySlot(city.slug))),
        description: city.blurb,
      })),
      { id: directoryId, name: tx(META_TITLE, locale) },
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
        <CityFilter cities={cities} locale={locale} />
      </section>

      <SeoProse
        nested
        headingId="cities-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />
    </main>
  );
}
