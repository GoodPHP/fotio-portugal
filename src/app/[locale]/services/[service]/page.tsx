import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  getServiceBySlug,
  getCategoryLabel,
  publishedServices,
  publishedCitiesForService,
  serviceSlug,
  serviceExistsIn,
} from '@/lib/catalog';
import { isServicePublished } from '@/lib/publishSchedule';
import { type Locale, isLocale, tx } from '@/lib/locales';
import { SITE_NAME, formatPrice, formatDuration } from '@/lib/site';
import { serviceImage, absoluteOgImage } from '@/lib/images';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/urls';
import {
  graph,
  serviceOfferNode,
  faqNode,
  breadcrumbNode,
  webPageNode,
  itemListNode,
} from '@/lib/jsonld';
import { SERVICE_SEO } from '@/lib/data/service-seo';
import type { Service } from '@/lib/types';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import PortfolioGrid from '@/components/PortfolioGrid';
import { portfolioImages } from '@/lib/portfolio';
import { leafHref, serviceAlternateParams } from '@/lib/routes';

// Fully prerendered — see the note on the leaf route. Releasing the next batch
// of drip-published pages is a rebuild, not a revalidation.
export const dynamic = 'force-static';
export const dynamicParams = false;

interface ServicePageProps {
  params: Promise<{ locale: Locale; service: string }>;
}

// Prerender only currently-published services; the rest render on demand
// (dynamicParams defaults to true) once their slot passes.
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  if (!isLocale(locale)) return [];
  return publishedServices()
    .filter((s) => serviceExistsIn(s, locale))
    .map((s) => ({ service: serviceSlug(s, locale) }));
}

/**
 * SERP copy for a service, authored in `service-seo.ts`.
 *
 * The fallbacks below are what shipped before: a title that named the service
 * and nothing else, and — for the eighteen services with no `description` — one
 * shared sentence. They stay so a newly added service renders rather than
 * throws; `check-seo.ts` fails the build if a published service uses them.
 */
function serviceMetaTitle(service: Service, name: string, locale: Locale): string {
  const authored = SERVICE_SEO[service.slug]?.title;
  if (authored) return tx(authored, locale);
  return { en: `${name} — Photographer in Portugal`, pt: `${name} — fotógrafo em Portugal` }[locale];
}

function serviceMetaDescription(service: Service, name: string, locale: Locale): string {
  const authored = SERVICE_SEO[service.slug]?.description;
  if (authored) return tx(authored, locale);
  return serviceDescription(name, locale, tx(service.description ?? { en: '' }, locale) || undefined);
}

function serviceDescription(name: string, locale: Locale, fallback?: string): string {
  if (fallback) return fallback;
  return {
    en: `Professional ${name} photography with vetted local photographers. Fixed pricing and private gallery in 48-72h.`,
    pt: `Fotografia de ${name.toLowerCase()} com fotógrafos locais verificados. Preço fixo e galeria privada em 48-72 h.`,
  }[locale];
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, service: serviceParam } = await params;
  const service = getServiceBySlug(serviceParam, locale);
  if (!service) return {};

  const name = tx(service.name, locale);

  return buildMetadata({
    locale,
    route: '/services/[service]',
    alternates: serviceAlternateParams(service),
    title: serviceMetaTitle(service, name, locale),
    description: serviceMetaDescription(service, name, locale),
    ogImage: serviceImage(service.slug),
    ogImageAlt: {
      en: `A ${name.toLowerCase()} photographed by the ${SITE_NAME} network in Portugal`,
      pt: `Uma sessão de ${name.toLowerCase()} fotografada pela rede ${SITE_NAME} em Portugal`,
    }[locale],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, service: serviceParam } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(serviceParam, locale);
  if (!service) notFound();
  // Not yet at its drip-publish slot → behave as if it does not exist.
  if (!isServicePublished(service.slug)) notFound();

  const name = tx(service.name, locale);
  const description = serviceDescription(name, locale, tx(service.description ?? { en: '' }, locale) || undefined);
  const deliverables = tx(service.deliverables, locale);
  const categoryLabel = getCategoryLabel(service.category, locale);
  // Per-service portfolio gallery (empty until stock photos are fetched).
  const portfolio = portfolioImages(service.slug);
  // Only link to leaf pages (service × city) that are already published, so the
  // grid never points at a 404.
  const cities = publishedCitiesForService(service.slug);

  const labels = {
    breadcrumbHome: { en: 'Home', pt: 'Início' }[locale],
    breadcrumbServices: { en: 'Services', pt: 'Serviços' }[locale],
    includedTitle: { en: 'What’s included', pt: 'O que está incluído' }[locale],
    citiesTitle: { en: `Book ${name} in your city`, pt: `Reservar ${name.toLowerCase()} na sua cidade` }[locale],
    citiesIntro: { en: `Available in ${cities.length} Portuguese cities and destinations. Choose yours.`, pt: `Disponível em ${cities.length} cidades e destinos portugueses. Escolha o seu.` }[locale],
    faqTitle: { en: `Frequently asked questions about ${name}`, pt: `Perguntas frequentes sobre ${name.toLowerCase()}` }[locale],
    portfolioEyebrow: { en: 'Portfolio', pt: 'Portefólio' }[locale],
    portfolioTitle: { en: `${name} portfolio`, pt: `Portefólio de ${name.toLowerCase()}` }[locale],
    portfolioSubtitle: { en: `A selection of ${name.toLowerCase()} shots to inspire your shoot.`, pt: `Uma selecção de fotografias de ${name.toLowerCase()} para inspirar a sua sessão.` }[locale],
    from: { en: 'Starting from', pt: 'Desde' }[locale],
    duration: { en: 'Duration', pt: 'Duração' }[locale],
    photos: { en: 'Edited photos', pt: 'Fotografias editadas' }[locale],
    book: { en: 'Book now', pt: 'Reservar' }[locale],
  };

  const faqEntries = (service.faqs ?? []).map((f) => ({
    question: tx(f.question, locale),
    answer: tx(f.answer, locale),
  }));

  const url = absoluteUrl(locale, '/services/[service]', { service: serviceSlug(service, locale) });
  const citiesListId = `${url}#cities`;
  const jsonLd = graph([
    webPageNode({
      url,
      name: serviceMetaTitle(service, name, locale),
      description: serviceMetaDescription(service, name, locale),
      locale,
      image: absoluteOgImage(serviceImage(service.slug)),
      mainEntityId: citiesListId,
    }),
    serviceOfferNode({
      serviceSlug: service.slug,
      serviceName: name,
      description,
      price: service.initialPrice,
      locale,
      url,
    }),
    // Built from `cities`, the array the grid renders, so the list cannot
    // advertise a leaf the page does not link to.
    itemListNode(
      cities.map((city) => ({
        name: city.name,
        url: absoluteUrl(locale, '/services/[service]/[city]', {
          ...leafHref(service, city, locale).params,
        }),
      })),
      { id: citiesListId, name: labels.citiesTitle },
    ),
    // Twenty of the thirty-three services have no authored FAQ, and every one
    // of them was emitting an FAQPage with an empty mainEntity.
    ...(faqEntries.length > 0 ? [faqNode(faqEntries)] : []),
    breadcrumbNode([
      { name: labels.breadcrumbHome, url: absoluteUrl(locale, '/') },
      { name: labels.breadcrumbServices, url: absoluteUrl(locale, '/services') },
      { name, url },
    ]),
  ]);
  const seoProse = SERVICE_SEO[service.slug];

  return (
    <main>
      <JsonLd data={jsonLd} />

      {/* Hero + price card */}
      <section aria-labelledby="service-heading" className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-12 pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link href="/" className="hover:text-brand-orange-deep">{labels.breadcrumbHome}</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className="hover:text-brand-orange-deep">{labels.breadcrumbServices}</Link></li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-brand-dark" aria-current="page">{name}</li>
              </ol>
            </nav>

            <FadeIn instant className="mt-6">
              <div className="relative isolate mb-7 flex aspect-[16/9] flex-col justify-end overflow-hidden rounded-card p-6 text-white sm:p-8">
                <Image
                  src={serviceImage(service.slug)}
                  alt={name}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="absolute inset-0 -z-10 object-cover"
                />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <span className="font-mono text-xs uppercase tracking-widest text-brand-cream">{categoryLabel}</span>
              </div>
              <h1 id="service-heading" className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-brand-dark sm:text-6xl">
                {name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-dark">{description}</p>
            </FadeIn>

            {/* What's included */}
            <FadeIn instant delay={0.1} className="mt-10">
              <h2 className="font-display text-2xl font-bold tracking-tight text-brand-dark">{labels.includedTitle}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-card-sm border border-brand-rule bg-white px-4 py-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange-deep" aria-hidden="true">
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="text-sm leading-snug text-brand-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Price card */}
          <FadeIn instant delay={0.15} className="lg:col-span-5">
            <aside data-surface="dark" aria-label="Pricing" className="sticky top-24 rounded-card bg-brand-dark p-8 text-white">
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
            </aside>
          </FadeIn>
        </div>
      </section>

      {/* Service portfolio gallery */}
      <PortfolioGrid
        images={portfolio}
        eyebrow={labels.portfolioEyebrow}
        title={labels.portfolioTitle}
        subtitle={labels.portfolioSubtitle}
        alt={name}
        locale={locale}
      />

      {/* Cities grid */}
      <section aria-labelledby="service-cities-heading" className="bg-brand-sand py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 id="service-cities-heading" className="font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              {labels.citiesTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-brand-muted">{labels.citiesIntro}</p>
          </FadeIn>

          <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <StaggerItem key={city.slug}>
                <Link
                  href={leafHref(service, city, locale)}
                  className="group flex items-center justify-between rounded-card-sm border border-brand-rule bg-white px-5 py-5 transition-all hover:border-brand-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                >
                  <span>
                    <span className="block font-display text-lg font-semibold text-brand-dark">{city.name}</span>
                    <span className="block text-xs text-brand-muted">{tx(city.region, locale)}</span>
                  </span>
                  <span className="text-brand-muted transition-colors group-hover:text-brand-orange-deep" aria-hidden="true">→</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {seoProse && (
        <SeoProse
          headingId="service-seo-heading"
          eyebrow={{ en: 'About this session', pt: 'Sobre esta sessão' }[locale]}
          heading={tx(seoProse.heading, locale)}
          paragraphs={tx(seoProse.paragraphs, locale)}
          facts={[
            { label: labels.from, value: formatPrice(service.initialPrice, locale) },
            { label: labels.duration, value: formatDuration(service.durationMinutes, locale) },
            { label: labels.photos, value: `${service.editedPhotos}` },
            {
              label: { en: 'Cities', pt: 'Cidades' }[locale],
              value: `${cities.length}`,
            },
          ]}
        />
      )}

      {/* FAQ */}
      {faqEntries.length > 0 && (
        <section aria-labelledby="service-faq-heading" className="mx-auto max-w-3xl px-6 py-16">
          <FadeIn>
            <h2 id="service-faq-heading" className="text-center font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              {labels.faqTitle}
            </h2>
          </FadeIn>
          <div className="mt-8 divide-y divide-black/5 rounded-card border border-brand-rule bg-white">
            {faqEntries.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep">
                  {faq.question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-sand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
