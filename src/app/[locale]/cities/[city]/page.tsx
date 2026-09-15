import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Picture from '@/components/Picture';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  getCity,
  getServiceById,
  localizedCityName,
  publishedCities,
  publishedServicesForCity,
} from '@/lib/catalog';
import { isCityPublished } from '@/lib/publishSchedule';
import type { City } from '@/lib/types';
import { type Locale, tx } from '@/lib/locales';
import { SITE_NAME, formatPrice } from '@/lib/site';
import { citySlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/urls';
import {
  graph,
  professionalServiceNode,
  faqNode,
  breadcrumbNode,
  webPageNode,
  itemListNode,
} from '@/lib/jsonld';
import { CITY_SEO } from '@/lib/data/city-seo';
import { ptName, ptAt, ptOf, ptWith, upperFirst } from '@/lib/pt-grammar';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import { cityAlternateParams, leafHref } from '@/lib/routes';
import CityTheme from '@/components/CityTheme';

interface CityPageProps {
  params: Promise<{ locale: Locale; city: string }>;
}

// Fully prerendered — see the note on the leaf route. Releasing the next batch
// of drip-published pages is a rebuild, not a revalidation.
export const dynamic = 'force-static';
export const dynamicParams = false;

// Prerender only currently-published cities; the rest render on demand once
// their slot passes (dynamicParams defaults to true).
export function generateStaticParams() {
  return publishedCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { locale, city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};

  return buildMetadata({
    locale,
    route: '/cities/[city]',
    alternates: cityAlternateParams(city),
    title: cityMetaTitle(city, locale),
    description: cityMetaDescription(city, locale),
    ogImage: ogImagePath(citySlot(city.slug)),
    ogImageAlt: cityOgImageAlt(city, locale),
  });
}

/**
 * SERP copy for a city, authored in `city-seo.ts`.
 *
 * The fallback is the old generated template, which said the same thing on all
 * twenty-two pages. It exists so a newly added city renders rather than throws;
 * `check-seo.ts` fails the build if any published city is actually using it.
 */
function cityMetaTitle(city: City, locale: Locale): string {
  const authored = CITY_SEO[city.slug]?.title;
  return authored ? tx(authored, locale) : cityHeading(city, locale);
}

function cityMetaDescription(city: City, locale: Locale): string {
  const authored = CITY_SEO[city.slug]?.description;
  if (authored) return tx(authored, locale);
  const region = tx(city.region, locale);
  return {
    en: `Find a professional photographer in ${localizedCityName(city, 'en')} (${region}). Fixed pricing, private gallery in 48-72h and the best local photo spots.`,
    pt: `Encontre um fotógrafo profissional ${ptAt(city)} (${region}). Preço fixo, galeria privada em 48-72 h e os melhores locais para fotografar.`,
  }[locale];
}

/** Alt text for the share card: names what is in the photograph, not the page. */
function cityOgImageAlt(city: City, locale: Locale): string {
  const region = tx(city.region, locale);
  return {
    en: `${localizedCityName(city, 'en')}, ${region} — photographed by the ${SITE_NAME} network`,
    pt: `${city.name}, ${region} — fotografado pela rede ${SITE_NAME}`,
  }[locale];
}

function cityHeading(city: City, locale: Locale): string {
  return {
    en: `Photographer in ${localizedCityName(city, 'en')}`,
    // "Fotógrafo em Porto" is wrong; `ptAt` contracts it to "no Porto", and
    // "na Madeira", "nos Açores" for the places that are not cities at all.
    pt: `Fotógrafo ${ptAt(city)}`,
  }[locale];
}

export default async function CityPage({ params }: CityPageProps) {
  const { locale, city: citySlug } = await params;
  setRequestLocale(locale);

  const city = getCity(citySlug);
  if (!city) notFound();
  // Not yet at its drip-publish slot → behave as if it does not exist.
  if (!isCityPublished(city.slug)) notFound();

  const heading = cityHeading(city, locale);
  const region = tx(city.region, locale);

  // Services whose `service × city` leaf is published (live links only), ordered
  // with this city's curated topServices first, then the rest of the catalog.
  const topSet = new Set(city.topServices);
  const liveServices = publishedServicesForCity(city.slug, locale);
  const liveSet = new Set(liveServices.map((s) => s.slug));
  const orderedServices = [
    ...city.topServices
      .filter((slug) => liveSet.has(slug))
      .map((slug) => getServiceById(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    ...liveServices.filter((s) => !topSet.has(s.slug)),
  ];

  const name = localizedCityName(city, locale);

  const labels = {
    spotsTitle: { en: 'The best photo spots', pt: 'Os melhores locais para fotografar' }[locale],
    spotsIntro: {
      en: `Here is where to shoot in ${name}, with ideal times and permit notes.`,
      pt: `Onde fotografar ${ptAt(city)}, com as horas certas e as autorizações a ter em conta.`,
    }[locale],
    bestTime: { en: 'Best time', pt: 'Melhor hora' }[locale],
    permit: { en: 'Permits', pt: 'Autorizações' }[locale],
    galleryTitle: { en: 'Photographs of this city', pt: 'Fotografias deste sítio' }[locale],
    seasonTitle: {
      en: `When to visit ${name} for photos?`,
      pt: `Quando vir ${ptWith('a', city)} para fotografar?`,
    }[locale],
    servicesTitle: {
      en: `Photography services in ${name}`,
      pt: `Serviços de fotografia ${ptAt(city)}`,
    }[locale],
    faqTitle: {
      en: `Frequently asked questions about ${name}`,
      pt: `Perguntas frequentes sobre ${ptName(city)}`,
    }[locale],
    coverageTitle: {
      en: `Also covered from ${name}`,
      pt: `${upperFirst(ptOf(city))}, também cobrimos`,
    }[locale],
    coverageIntro: {
      en: `These come under the ${name} rate: a photographer travels out from the city at no extra charge, and the session is priced exactly as it would be in ${name} itself.`,
      pt: `Ficam ao preço ${ptOf(city)}: o fotógrafo desloca-se sem custo adicional e a sessão custa exactamente o mesmo que custaria ${ptAt(city)}.`,
    }[locale],
    breadcrumbHome: { en: 'Home', pt: 'Início' }[locale],
    breadcrumbCities: { en: 'Cities', pt: 'Cidades' }[locale],
    from: { en: 'from', pt: 'desde' }[locale],
    popular: { en: 'Popular', pt: 'Popular' }[locale],
  };

  const faqEntries = city.faqs.map((f) => ({
    question: tx(f.question, locale),
    answer: tx(f.answer, locale),
  }));

  const cityUrl = absoluteUrl(locale, '/cities/[city]', { city: city.slug });
  const servicesListId = `${cityUrl}#services`;
  const jsonLd = graph([
    webPageNode({
      url: cityUrl,
      name: cityMetaTitle(city, locale),
      description: cityMetaDescription(city, locale),
      locale,
      type: 'CollectionPage',
      image: absoluteOgImage(ogImagePath(citySlot(city.slug))),
      mainEntityId: servicesListId,
    }),
    professionalServiceNode({
      citySlug: city.slug,
      cityName: city.name,
      region,
      locale,
      url: cityUrl,
      // The communes are covered but have no pages, so this is the only place
      // the coverage is stated in a machine-readable form.
      coveredAreas: city.coveredAreas,
      image: absoluteOgImage(ogImagePath(citySlot(city.slug))),
      photos: (city.gallery ?? []).map((shot) => absoluteOgImage(shot.src)),
    }),
    // Built from `orderedServices`, the same array the section renders, so the
    // list can never advertise a leaf that is not linked on the page.
    itemListNode(
      orderedServices.map((service) => ({
        name: tx(service.name, locale),
        url: absoluteUrl(locale, '/services/[service]/[city]', {
          ...leafHref(service, city, locale).params,
        }),
      })),
      { id: servicesListId, name: labels.servicesTitle },
    ),
    // A city with no authored FAQ emitted an empty FAQPage — a node claiming a
    // question-and-answer page with no questions on it, which is invalid.
    ...(faqEntries.length > 0 ? [faqNode(faqEntries)] : []),
    breadcrumbNode([
      { name: labels.breadcrumbHome, url: absoluteUrl(locale, '/') },
      { name: labels.breadcrumbCities, url: absoluteUrl(locale, '/cities') },
      { name, url: cityUrl },
    ]),
  ]);

  return (
    <CityTheme theme={city.theme}>
      <main>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section aria-labelledby="city-heading" className="relative">
        <div className="mx-auto max-w-[92rem] px-6 pt-12 lg:pt-16">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-orange-deep">{labels.breadcrumbHome}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/cities" className="hover:text-brand-orange-deep">{labels.breadcrumbCities}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-brand-dark" aria-current="page">{name}</li>
            </ol>
          </nav>

          {/*
            The title above the photograph rather than on top of it.

            It used to sit inside the frame over a black gradient covering the
            lower two-thirds of the image — a scrim that exists only to rescue
            contrast, and that costs most of the photograph to do it. On a page
            whose subject is what this city looks like, that is the wrong
            trade. Ink on the page ground reads at full contrast and the
            photograph is seen whole.
          */}
          <FadeIn instant className="mt-8">
            <p className="eyebrow">{region}</p>
            <h1
              id="city-heading"
              className="font-display-tight mt-4 max-w-4xl font-bold text-brand-dark"
              style={{ fontSize: 'var(--text-title)' }}
            >
              {heading}
            </h1>
          </FadeIn>

          <FadeIn instant delay={0.05} className="mt-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-brand-rule sm:aspect-[21/9]">
              <Picture
                slot={citySlot(city.slug)}
                alt={heading}
                sizes="(max-width: 1472px) 100vw, 1472px"
                className="object-cover"
                fill
                priority
              />
            </div>
          </FadeIn>

          <FadeIn instant delay={0.05} className="measure mt-8">
            <p className="text-lg leading-relaxed text-brand-dark">{tx(city.narrative, locale)}</p>
          </FadeIn>

          {(city.stats.visitors || city.stats.weddings || city.stats.stays) && (
            <FadeIn instant delay={0.1} className="mt-8 flex flex-wrap gap-4 pb-4">
              {city.stats.visitors && <StatPill value={city.stats.visitors} label={{ en: 'visitors/year', pt: 'visitantes/ano' }[locale]} />}
              {city.stats.weddings && <StatPill value={city.stats.weddings} label={{ en: 'weddings/year', pt: 'casamentos/ano' }[locale]} />}
              {city.stats.stays && <StatPill value={city.stats.stays} label={{ en: 'stays/year', pt: 'dormidas/ano' }[locale]} />}
            </FadeIn>
          )}
        </div>
      </section>

      {/*
        The city, photographed. An uneven strip so it reads as a spread rather
        than a row of thumbnails, with the caption under each frame where we
        know what it shows.
      */}
      {city.gallery && city.gallery.length > 0 && (
        <section aria-labelledby="gallery-heading" className="mx-auto max-w-[92rem] px-6 pt-[var(--space-band)]">
          <h2 id="gallery-heading" className="sr-only">
            {labels.galleryTitle}
          </h2>
          <Stagger className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-12">
            {city.gallery.slice(0, 4).map((shot, i) => {
              // 7/5 · 5/7 — the row breaks the other way each time.
              const span = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'][i % 4];
              const wide = span.endsWith('7');
              return (
                <StaggerItem key={shot.src} className={`col-span-1 ${span}`}>
                  <figure>
                    <div className={`relative overflow-hidden ${wide ? 'aspect-[3/2]' : 'aspect-[4/5]'}`}>
                      <Picture
                        slot={shot.src}
                        alt={tx(shot.alt, locale)}
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover"
                        fill
                      />
                    </div>
                    {shot.caption && (
                      <figcaption className="mt-2.5 border-t border-brand-rule pt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand-muted">
                        {tx(shot.caption, locale)}
                      </figcaption>
                    )}
                  </figure>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      {/* Seasonality */}
      <section aria-labelledby="season-heading" className="mx-auto max-w-[92rem] px-6 py-12">
        <FadeIn className="rounded-card-sm border border-brand-rule bg-brand-tile p-8 sm:p-10">
          <h2 id="season-heading" className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
            {labels.seasonTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-dark">{tx(city.seasonality, locale)}</p>
        </FadeIn>
      </section>

      {/* Photo spots */}
      <section aria-labelledby="spots-heading" className="bg-brand-sand py-16">
        <div className="mx-auto max-w-[92rem] px-6">
          <FadeIn>
            <h2 id="spots-heading" className="font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              {labels.spotsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-brand-muted">{labels.spotsIntro}</p>
          </FadeIn>

          <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
            {city.spots.map((spot) => (
              <StaggerItem key={spot.name}>
                <article className="h-full rounded-card-sm border border-brand-rule bg-brand-tile p-7">
                  <h3 className="font-display text-xl font-semibold text-brand-dark">{spot.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{tx(spot.description, locale)}</p>
                  <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-chip bg-brand-sand px-4 py-3">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-brand-muted">{labels.bestTime}</dt>
                      <dd className="mt-1 text-sm font-semibold text-brand-dark">{tx(spot.bestTime, locale)}</dd>
                    </div>
                    <div className="rounded-chip bg-brand-sand px-4 py-3">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-brand-muted">{labels.permit}</dt>
                      <dd className="mt-1 text-sm font-semibold text-brand-dark">{tx(spot.permitCost, locale)}</dd>
                    </div>
                  </dl>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Services in this city */}
      <section aria-labelledby="city-services-heading" className="mx-auto max-w-[92rem] px-6 py-16">
        <FadeIn>
          <h2 id="city-services-heading" className="font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            {labels.servicesTitle}
          </h2>
        </FadeIn>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedServices.map((service) => {
            const isTop = topSet.has(service.slug);
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={leafHref(service, city, locale)}
                  className="bento-card group flex h-full flex-col justify-between gap-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-brand-dark">{tx(service.name, locale)}</h3>
                      {isTop && (
                        <span className="font-mono shrink-0 bg-brand-orange-deep px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white">
                          {labels.popular}
                        </span>
                      )}
                    </div>
                    {service.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-muted">{tx(service.description, locale)}</p>
                    )}
                  </div>
                  <span className="text-sm text-brand-muted">
                    {labels.from} <strong className="text-brand-dark">{formatPrice(service.initialPrice, locale)}</strong>
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/*
        Covered communes. Authored on every city but rendered nowhere until now:
        a hundred-odd place names that we genuinely serve, invisible to both a
        reader deciding whether we reach them and a crawler ranking for them.
      */}
      {city.coveredAreas && city.coveredAreas.length > 0 && (
        <section aria-labelledby="coverage-heading" className="mx-auto max-w-[92rem] px-6 pb-16">
          <FadeIn>
            <div className="rule pt-10">
              <h2
                id="coverage-heading"
                className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl"
              >
                {labels.coverageTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-muted">
                {labels.coverageIntro}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {city.coveredAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-chip border border-brand-rule bg-brand-tile px-4 py-2 text-sm text-brand-dark"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Quote — only where a real one exists; see City.quote. */}
      {city.quote && (
      <section aria-label="Photographer note" className="bg-brand-sand py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <figure data-surface="dark" className="rounded-card bg-brand-dark px-8 py-12 text-white sm:px-12">
              <svg className="h-9 w-9 text-brand-orange-deep" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.5 6C6.5 7.5 5 10 5 13v5h6v-6H8c0-2 .8-3.5 2.5-4.5L9.5 6zm9 0C15.5 7.5 14 10 14 13v5h6v-6h-3c0-2 .8-3.5 2.5-4.5L18.5 6z" />
              </svg>
              <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed sm:text-2xl">
                “{tx(city.quote.text, locale)}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-brand-muted">
                <span className="font-semibold text-white">{city.quote.author}</span> — {tx(city.quote.role, locale)}
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>
      )}

      <Faq headingId="city-faq-heading" title={labels.faqTitle} entries={faqEntries} />
      </main>
    </CityTheme>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-brand-rule bg-brand-tile px-5 py-3.5">
      <span className="font-display block text-2xl font-bold tracking-[-0.03em] text-brand-dark">{value}</span>
      <span className="font-mono mt-1 block text-[0.625rem] uppercase tracking-[0.16em] text-brand-muted">
        {label}
      </span>
    </div>
  );
}
