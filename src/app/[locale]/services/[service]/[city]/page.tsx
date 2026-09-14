import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {  CITIES,
  getCity,
  getServiceById,
  getServiceBySlug,
  serviceSlug,
  publishedCuratedLeafParams,
  isCuratedLeaf,
} from '@/lib/catalog';
import { isLeafPublished } from '@/lib/publishSchedule';
import { type Locale, isLocale, tx } from '@/lib/locales';
import { SITE_NAME, formatPrice, formatDuration, whatsappLink } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/urls';
import { serviceImage, cityImage, absoluteOgImage } from '@/lib/images';
import { generateProgrammaticContent, getSeoMetadata } from '@/lib/content';
import {  graph,
  professionalServiceNode,
  serviceOfferNode,
  faqNode,
  breadcrumbNode,
  webPageNode,
} from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import { FadeIn } from '@/components/Motion';
import PortfolioGrid from '@/components/PortfolioGrid';
import { portfolioImages } from '@/lib/portfolio';
import { leafAlternateParams, leafHref, serviceHref } from '@/lib/routes';
import { frAt } from '@/lib/city-name';
import CityTheme from '@/components/CityTheme';

export const dynamicParams = true;
// Hourly ISR so a leaf prerendered as 404 (before its drip slot) flips live
// within ~1h of its scheduled publish time.
export const revalidate = 3600;

interface LeafPageProps {
  params: Promise<{ locale: Locale; service: string; city: string }>;
}

/**
 * `[locale]/layout.tsx` declares its own generateStaticParams, so Next runs this
 * once per locale and hands the parent's params in. That matters here: the
 * service slug differs per language, and a locale-blind list would prerender
 * /fr/services/wedding/paris — a path the French middleware never rewrites to,
 * leaving every real French leaf to fall through to on-demand rendering.
 */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return publishedCuratedLeafParams(params.locale);
}

export async function generateMetadata({ params }: LeafPageProps): Promise<Metadata> {
  const { locale, service: serviceParam, city: citySlug } = await params;
  const city = getCity(citySlug);
  const service = getServiceBySlug(serviceParam, locale);
  if (!city || !service) return {};

  const { title, description } = getSeoMetadata(city, service, locale);
  return buildMetadata({
    locale,
    route: '/services/[service]/[city]',
    alternates: leafAlternateParams(service, city),
    // Combinations we have not written for are real pages, but they are
    // composed from templates and do not deserve an index slot.
    noindex: !isCuratedLeaf(service.slug, city.slug, locale),
    title,
    description,
    ogImage: serviceImage(service.slug),
    ogImageAlt: `${tx(service.name, locale)} · ${city.name}`,
  });
}

export default async function LeafPage({ params }: LeafPageProps) {
  const { locale, service: serviceParam, city: citySlug } = await params;
  setRequestLocale(locale);

  const city = getCity(citySlug);
  const service = getServiceBySlug(serviceParam, locale);
  // An unknown slug, or a slug belonging to the other locale, is not a page.
  if (!city || !service) notFound();
  // Not yet at its drip-publish slot → behave as if it does not exist.
  if (!isLeafPublished(service.slug, city.slug)) notFound();

  const serviceName = tx(service.name, locale);
  const region = tx(city.region, locale);
  const content = generateProgrammaticContent(city, service, locale);

  const labels = {
    answerEyebrow: { en: 'In short', fr: 'En bref' }[locale],
    breadcrumbHome: { en: 'Home', fr: 'Accueil' }[locale],
    breadcrumbServices: { en: 'Services', fr: 'Services' }[locale],
    aboutTitle: { en: `Why choose ${serviceName} in ${city.name}?`, fr: `Pourquoi choisir ${serviceName} ${frAt(city)} ?` }[locale],
    routeTitle: { en: `What does the session in ${city.name} look like?`, fr: `Comment se déroule la séance ${frAt(city)} ?` }[locale],
    detailsTitle: { en: 'What does the package include?', fr: 'Que comprend le forfait ?' }[locale],
    faqTitle: { en: `FAQ — ${serviceName} in ${city.name}`, fr: `FAQ — ${serviceName} ${frAt(city)}` }[locale],
    from: { en: 'Starting from', fr: 'À partir de' }[locale],
    duration: { en: 'Duration', fr: 'Durée' }[locale],
    photos: { en: 'Edited photos', fr: 'Photos retouchées' }[locale],
    book: { en: 'Book online', fr: 'Réserver en ligne' }[locale],
    whatsapp: { en: 'Ask on WhatsApp', fr: 'Demander sur WhatsApp' }[locale],
    portfolioEyebrow: { en: 'Portfolio', fr: 'Portfolio' }[locale],
    portfolioTitle: { en: `${serviceName} in ${city.name}`, fr: `${serviceName} ${frAt(city)}` }[locale],
    portfolioSubtitle: { en: `A selection of ${serviceName.toLowerCase()} shots to inspire your session.`, fr: `Une sélection d’images de la catégorie ${serviceName.toLowerCase()}, pour inspirer votre séance.` }[locale],
    relatedServicesTitle: { en: `Other services in ${city.name}`, fr: `Autres services ${frAt(city)}` }[locale],
    nearbyTitle: { en: `${serviceName} in other cities`, fr: `${serviceName} dans d’autres villes` }[locale],
  };

  // WhatsApp prefilled message naming service + city.
  const waMessage = {
    en: `Hi ${SITE_NAME}! I’d like to book ${serviceName} in ${city.name}. Could you share more details?`,
    fr: `Bonjour ${SITE_NAME} ! Je souhaite réserver : ${serviceName} ${frAt(city)}. Pouvez-vous m’en dire plus ?`,
  }[locale];

  // Related: other tailored services in the same city (published leaves only).
  const relatedServices = city.topServices
    .filter((slug) => slug !== service.slug && isLeafPublished(slug, city.slug))
    .map((slug) => getServiceById(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 6);

  // Nearby: same service in other cities that prioritise it, then any others —
  // restricted to leaves that are already published so links never 404.
  const prioritised = CITIES.filter((c) => c.slug !== city.slug && c.topServices.includes(service.slug) && isLeafPublished(service.slug, c.slug));
  const fallbackCities = CITIES.filter((c) => c.slug !== city.slug && !c.topServices.includes(service.slug) && isLeafPublished(service.slug, c.slug));
  const nearbyCities = [...prioritised, ...fallbackCities].slice(0, 6);

  // Per-service portfolio gallery (empty until stock photos are fetched).
  const portfolio = portfolioImages(service.slug);

  const url = absoluteUrl(locale, '/services/[service]/[city]', { service: serviceSlug(service, locale), city: city.slug });
  const { title: metaTitle, description: metaDescription } = getSeoMetadata(city, service, locale);
  const jsonLd = graph([
    webPageNode({
      url,
      name: metaTitle,
      description: metaDescription,
      locale,
      image: absoluteOgImage(serviceImage(service.slug)),
    }),
    professionalServiceNode({
      citySlug: city.slug,
      cityName: city.name,
      region,
      locale,
      url,
      // Same coverage claim as the city page makes, so the two agree.
      coveredAreas: city.coveredAreas,
      image: absoluteOgImage(cityImage(city.slug)),
    }),
    serviceOfferNode({
      serviceSlug: service.slug,
      serviceName,
      description: content.answerBox,
      price: service.initialPrice,
      locale,
      url,
      citySlug: city.slug,
      areaServedName: city.name,
    }),
    faqNode(content.customFAQs),
    breadcrumbNode([
      { name: labels.breadcrumbHome, url: absoluteUrl(locale, '/') },
      { name: labels.breadcrumbServices, url: absoluteUrl(locale, '/services') },
      { name: serviceName, url: absoluteUrl(locale, '/services/[service]', { service: serviceSlug(service, locale) }) },
      { name: city.name, url },
    ]),
  ]);

  return (
    <CityTheme theme={city.theme}>
      <main>
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-7xl px-6 pt-12 lg:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-brand-orange-deep">{labels.breadcrumbHome}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="hover:text-brand-orange-deep">{labels.breadcrumbServices}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={serviceHref(service, locale)} className="hover:text-brand-orange-deep">{serviceName}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-brand-dark" aria-current="page">{city.name}</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-12 pt-6 lg:grid-cols-12">
        {/* Main content */}
        <article className="lg:col-span-7 xl:col-span-8">
          <FadeIn instant>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">{region}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] tracking-tight text-brand-dark sm:text-5xl">
              {serviceName} <span className="text-brand-muted">·</span> {city.name}
            </h1>
          </FadeIn>

          {/* Answer-first highlighted block */}
          <FadeIn instant delay={0.08}>
            <div className="mt-8 rounded-card-sm border border-brand-orange/20 bg-brand-orange/5 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">{labels.answerEyebrow}</p>
              <p className="mt-3 text-lg leading-relaxed text-brand-dark">{content.answerBox}</p>
            </div>
          </FadeIn>

          <FadeIn instant delay={0.05} className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">{labels.aboutTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-dark">{content.introParagraph}</p>
            {/*
              When, rather than where. Composed from this city's spot hours and
              this service's duration, so it differs across the matrix instead of
              repeating one sentence on a hundred and twenty-five pages.
            */}
            <p className="mt-4 text-base leading-relaxed text-brand-dark">{content.timingParagraph}</p>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">{labels.routeTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-dark">{content.sampleRoute}</p>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">{labels.detailsTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-dark">{content.detailsText}</p>
          </FadeIn>

          {/* FAQ */}
          {content.customFAQs.length > 0 && (
            <FadeIn delay={0.05} className="mt-12">
              <h2 className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">{labels.faqTitle}</h2>
              <div className="mt-6 divide-y divide-black/5 rounded-card-sm border border-brand-rule bg-white">
                {content.customFAQs.map((faq) => (
                  <details key={faq.question} className="group px-6 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep">
                      {faq.question}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-sand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </FadeIn>
          )}
        </article>

        {/* Sticky price + CTA */}
        <aside aria-label="Booking" className="lg:col-span-5 xl:col-span-4">
          <div data-surface="dark" className="sticky top-24 rounded-card bg-brand-dark p-8 text-white">
            <p className="text-sm text-brand-muted">{labels.from}</p>
            <p className="mt-1 font-display text-5xl font-bold">{formatPrice(service.initialPrice, locale)}</p>

            <dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-brand-muted">{labels.duration}</dt>
                <dd className="font-semibold">{formatDuration(service.durationMinutes, locale)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-brand-muted">{labels.photos}</dt>
                <dd className="font-semibold">{service.editedPhotos}+</dd>
              </div>
            </dl>

            <Link
              href="/book"
              className="mt-8 flex w-full items-center justify-center rounded-chip bg-brand-orange-deep px-6 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {labels.book}
            </Link>
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-chip border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.05-.5.42-3.15-.66-2.66-1.08-4.31-3.83-4.44-4.01-.13-.18-1.06-1.41-1.06-2.69 0-1.27.67-1.9.91-2.16.24-.26.52-.32.7-.32.17 0 .35 0 .5.01.16.01.38-.06.59.45.24.59.81 2.04.88 2.19.07.15.12.32.02.51-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.24.09 1.55.73 1.81.86.27.13.45.2.51.31.06.11.06.64-.18 1.32z" />
              </svg>
              {labels.whatsapp}
            </a>
          </div>
        </aside>
      </div>

      {/* Service portfolio gallery */}
      <PortfolioGrid
        priorityFeatured
        images={portfolio}
        eyebrow={labels.portfolioEyebrow}
        title={labels.portfolioTitle}
        subtitle={labels.portfolioSubtitle}
        alt={`${serviceName} · ${city.name}`}
        locale={locale}
      />

      {/* Related services in this city */}
      {relatedServices.length > 0 && (
        <section aria-labelledby="related-services-heading" className="bg-brand-sand py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <h2 id="related-services-heading" className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
                {labels.relatedServicesTitle}
              </h2>
            </FadeIn>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={leafHref(related, city, locale)}
                  className="bento-card group flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                >
                  <span>
                    <span className="block font-display text-lg font-semibold text-brand-dark">{tx(related.name, locale)}</span>
                    <span className="block text-sm text-brand-muted">{labels.from} {formatPrice(related.initialPrice, locale)}</span>
                  </span>
                  <span className="text-brand-muted transition-colors group-hover:text-brand-orange-deep" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Same service in nearby cities */}
      {nearbyCities.length > 0 && (
        <section aria-labelledby="nearby-heading" className="mx-auto max-w-7xl px-6 py-16">
          <FadeIn>
            <h2 id="nearby-heading" className="font-display text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
              {labels.nearbyTitle}
            </h2>
          </FadeIn>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {nearbyCities.map((nearby) => (
              <Link
                key={nearby.slug}
                href={leafHref(service, nearby, locale)}
                className="group flex items-center justify-between rounded-chip border border-brand-rule bg-white px-4 py-4 transition-all hover:border-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                <span className="font-display font-semibold text-brand-dark">{nearby.name}</span>
                <span className="text-brand-muted transition-colors group-hover:text-brand-orange-deep" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      </main>
    </CityTheme>
  );
}
