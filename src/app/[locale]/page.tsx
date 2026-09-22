import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Picture from '@/components/Picture';
import {
  CITIES,
  REVIEWS,
  getAggregateRating,
  localizedCityName,
  publishedCities,
  publishedServices,
} from '@/lib/catalog';
import { type Locale, tx } from '@/lib/locales';
import { citySlot, ogImagePath, absoluteOgImage, hasImage } from '@/lib/images';
import { buildMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/urls';
import { graph, faqNode, webPageNode, itemListNode, aggregateRatingWithReviewsNodes } from '@/lib/jsonld';
import { DELIVERY_TYPICAL, FROM_PRICE } from '@/lib/promises';
import { bookingOptions } from '@/lib/booking-options';
import { serviceHref } from '@/lib/routes';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import Faq from '@/components/Faq';
import CtaPair from '@/components/CtaPair';
import BookingFlow from '@/components/BookingFlow';
import TrustBar from '@/components/TrustBar';
import SectionHeading from '@/components/SectionHeading';
import SessionCard from '@/components/SessionCard';
import DestinationCard from '@/components/DestinationCard';
import PricingCard from '@/components/PricingCard';
import HowItWorks from '@/components/HowItWorks';
import GuaranteeBlock from '@/components/GuaranteeBlock';
import Photographers from '@/components/Photographers';
import ClientStories from '@/components/ClientStories';
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import { CheckMark } from '@/components/Icons';
import { META_TITLE, META_DESCRIPTION, OG_IMAGE_ALT, SEO_PROSE, homeFaqs } from './content';

/**
 * Lisboa leads the network and carries the hero photograph and the OG card.
 *
 * This was `'paris'` until the redesign — a slug left behind by the site this
 * one was rebuilt from. Nothing broke visibly, because the lookup falls back
 * to the first published city, which is why it survived: the hero showed a
 * photograph and the OG card showed an image, just never the intended ones.
 */
const HERO_CITY_SLUG = 'lisboa';

/**
 * The six sessions the home page leads with, and the one line each is sold
 * on. A session missing from the reader's language is replaced by the next
 * in `FALLBACK_SESSIONS`, so the grid never shows a gap or a dead link.
 */
const FEATURED_SESSIONS: Record<string, { en: string; pt: string }> = {
  couple: { en: 'Romantic photos during your Portugal trip.', pt: 'Fotografias a dois, num sítio que diga alguma coisa.' },
  proposal: { en: 'Capture the moment you ask the question.', pt: 'O momento do pedido, sem que ninguém dê por nada.' },
  honeymoon: { en: 'Beautiful memories from your first trip as newlyweds.', pt: 'A primeira viagem a dois depois do casamento.' },
  family: { en: 'Natural family photography without stiff poses.', pt: 'Fotografia de família natural, sem poses rígidas.' },
  vacation: { en: 'Professional photos from your Portugal adventure.', pt: 'Fotografias profissionais das suas férias.' },
  wedding: { en: 'Local photographers for your special day.', pt: 'Fotógrafos locais para o dia do seu casamento.' },
};
const FALLBACK_SESSIONS = ['maternity', 'lifestyle-portrait'];

/** The prices the home page quotes, before the link to the full list. */
const PRICING_TEASER = ['couple', 'family', 'proposal', 'wedding'];

/**
 * One photograph per kind of session, for the portfolio strip — picked by
 * hand rather than "the first of each", because several of the illustrative
 * frames have a skyline that is plainly not Portugal, and the strip sits
 * under a promise about photographing Portugal.
 */
const PORTFOLIO_TEASER: Array<[service: string, slot: string]> = [
  ['couple', 'portfolio/couple/2'],
  ['proposal', 'portfolio/proposal/3'],
  ['family', 'portfolio/family/1'],
  ['vacation', 'portfolio/vacation/1'],
  ['wedding', 'portfolio/wedding/1'],
  ['lifestyle-portrait', 'portfolio/lifestyle-portrait/1'],
];

/** The hero's two supporting frames: a traveller over Lisbon, a couple on the coast. */
const HERO_FRAMES = ['portfolio/vacation/3', 'portfolio/honeymoon/1'];

const COPY = {
  heroImageAlt: {
    en: 'A photographer’s frame from one of the places we cover in Portugal',
    pt: 'Uma fotografia de um dos sítios que cobrimos em Portugal',
  },
  heroPoints: {
    en: ['Local photographers', 'Transparent prices', `${tx(DELIVERY_TYPICAL.value, 'en')} delivery for most sessions`],
    pt: ['Fotógrafos locais', 'Preços transparentes', `Entrega em ${tx(DELIVERY_TYPICAL.value, 'pt')} na maioria das sessões`],
  },
  sessionsEyebrow: { en: 'Sessions', pt: 'Sessões' },
  sessionsTitle: { en: 'What are you looking for?', pt: 'O que procura?' },
  sessionsAll: { en: 'All sessions', pt: 'Todas as sessões' },
  destinationsEyebrow: { en: 'Destinations', pt: 'Destinos' },
  destinationsTitle: { en: 'Find a photographer in Portugal', pt: 'Encontre um fotógrafo em Portugal' },
  destinationsLead: {
    en: 'Cities, coast and islands — each with photographers who know which hour a place is at its best.',
    pt: 'Cidades, costa e ilhas — cada uma com fotógrafos que sabem a que hora o sítio está no seu melhor.',
  },
  destinationsAll: { en: 'All destinations', pt: 'Todos os destinos' },
  portfolioEyebrow: { en: 'Portfolio', pt: 'Portefólio' },
  portfolioTitle: { en: 'What your gallery could look like', pt: 'Como pode ser a sua galeria' },
  portfolioNote: {
    en: 'Illustrative photography while client galleries are being added.',
    pt: 'Fotografia ilustrativa enquanto acrescentamos galerias de clientes.',
  },
  portfolioAll: { en: 'See the portfolio', pt: 'Ver o portefólio' },
  pricingEyebrow: { en: 'Pricing', pt: 'Preços' },
  pricingTitle: { en: 'Simple, transparent pricing', pt: 'Preços simples e transparentes' },
  pricingAll: { en: 'All prices', pt: 'Todos os preços' },
  faqEyebrow: { en: 'Before you book', pt: 'Antes de reservar' },
  faqTitle: { en: 'Frequently asked questions', pt: 'Perguntas frequentes' },
  ctaEyebrow: { en: 'Next step', pt: 'Próximo passo' },
  ctaTitle: {
    en: 'Tell us where and when. We’ll find your photographer.',
    pt: 'Diga-nos onde e quando. Nós encontramos o fotógrafo.',
  },
  ctaSub: {
    en: 'Checking availability is free and commits you to nothing. We reply within about 2 hours during the working day.',
    pt: 'Ver disponibilidade é gratuito e não o compromete a nada. Respondemos em cerca de 2 horas, durante o dia útil.',
  },
} as const;

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  // The SERP title is not the H1: the headline sells, the title tag has to say
  // what the page is and where, inside sixty characters.
  return buildMetadata({
    locale,
    route: '/',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(citySlot(HERO_CITY_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

/**
 * The home page, in the order a first-time visitor needs it.
 *
 * Five seconds: what this is (the hero). Fifteen: what can be booked, where,
 * for roughly how much, and why to trust it (the widget, the trust bar,
 * sessions, places, prices). A minute: a way to check availability without
 * paying, which is on the page twice before the first scroll ends. The long
 * editorial passage that used to sit mid-page is kept for search, at the
 * bottom, where it no longer stands between a visitor and the form.
 *
 * Photographers and client stories get their sections here when there are
 * real ones to show; see `src/lib/data/photographers.ts` and `reviews.ts`.
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const rating = getAggregateRating();
  const cities = publishedCities();
  const heroCity = cities.find((c) => c.slug === HERO_CITY_SLUG) ?? cities[0] ?? CITIES[0];
  const services = publishedServices(locale);
  const offered = (id: string) => services.find((s) => s.slug === id);
  const present = <T,>(x: T | undefined): x is T => Boolean(x);

  const featured = [...Object.keys(FEATURED_SESSIONS), ...FALLBACK_SESSIONS].map(offered).filter(present).slice(0, 6);
  // Places a session is actually offered in, from each city's curated list —
  // named on the card as examples, never made up.
  const placesFor = (serviceId: string) => cities.filter((c) => c.topServices.includes(serviceId)).slice(0, 3);

  const pricing = PRICING_TEASER.map(offered).filter(present);
  const portfolio = PORTFOLIO_TEASER.map(([id, slot]) => ({ service: offered(id), slot }))
    .filter((p): p is { service: NonNullable<typeof p.service>; slot: string } => Boolean(p.service) && hasImage(p.slot));

  // The collage: the lead city and two people in Portugal — the place and the
  // session, which is the whole offer in three frames.
  const collage = [citySlot(heroCity.slug), ...HERO_FRAMES].filter(hasImage);

  const faqs = homeFaqs(locale);

  const url = absoluteUrl(locale, '/');
  const citiesListId = `${url}#cities`;
  const jsonLd = graph([
    webPageNode({
      url,
      name: tx(META_TITLE, locale),
      description: tx(META_DESCRIPTION, locale),
      locale,
      image: absoluteOgImage(ogImagePath(citySlot(heroCity.slug))),
      mainEntityId: citiesListId,
    }),
    itemListNode(
      cities.map((city) => ({
        name: localizedCityName(city, locale),
        url: absoluteUrl(locale, '/cities/[city]', { city: city.slug }),
        image: absoluteOgImage(ogImagePath(citySlot(city.slug))),
        description: tx(city.narrative, locale),
      })),
      { id: citiesListId, name: COPY.destinationsTitle[locale] },
    ),
    faqNode(faqs),
    ...aggregateRatingWithReviewsNodes(
      rating.ratingValue,
      rating.reviewCount,
      REVIEWS.map((r) => ({
        author: r.name,
        rating: r.stars,
        datePublished: r.date,
        text: tx(r.text, locale),
      })),
    ),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />

      {/*
        Hero.

        Type beside the photographs rather than on top of them — no scrim, no
        contrast compromise. The collage is three frames rather than one
        because the offer is two things at once: a place, and a kind of session
        in it. On a phone it collapses to the lead frame alone.
      */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div
          className="azulejo azulejo-fade pointer-events-none absolute -left-24 top-0 hidden h-[34rem] w-[44rem] opacity-60 lg:block"
          style={{ ['--azulejo-cell' as string]: '46px' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-[92rem] items-center gap-y-10 px-6 pb-[var(--space-band)] pt-10 lg:grid-cols-12 lg:gap-x-12 lg:pt-16">
          <FadeIn instant y={20} className="lg:col-span-6">
            <p className="eyebrow">{t('heroEyebrow')}</p>
            <h1
              id="hero-heading"
              className="font-display-tight mt-6 font-bold text-brand-dark"
              style={{ fontSize: 'var(--text-display)' }}
            >
              {t('heroTitle')}
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-brand-muted sm:text-xl">{t('heroSubtitle')}</p>
            <ul className="mt-7 flex flex-col gap-2.5 text-[0.9375rem] font-medium text-brand-dark sm:flex-row sm:flex-wrap sm:gap-x-6">
              {COPY.heroPoints[locale].map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <CheckMark className="h-4 w-4" />
                  {point}
                </li>
              ))}
            </ul>
            <CtaPair locale={locale} context="hero" className="mt-9" />
          </FadeIn>

          <FadeIn instant y={20} className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {collage.map((slot, i) => (
                <figure
                  key={slot}
                  className={`relative overflow-hidden border border-brand-rule ${
                    i === 0
                      ? 'col-span-5 aspect-[4/3] sm:col-span-3 sm:row-span-2 sm:aspect-auto sm:min-h-[26rem] lg:min-h-[32rem]'
                      : 'hidden sm:col-span-2 sm:block'
                  }`}
                >
                  <Picture
                    slot={slot}
                    alt={i === 0 ? COPY.heroImageAlt[locale] : ''}
                    sizes={i === 0 ? '(max-width: 640px) 100vw, 30vw' : '20vw'}
                    className="object-cover"
                    fill
                    priority={i === 0}
                  />
                </figure>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The shortest way in, straight under the promise. */}
      <section aria-labelledby="find-photographer-heading" className="mx-auto max-w-[92rem] px-6">
        <BookingFlow options={bookingOptions(locale)} locale={locale} variant="compact" />
      </section>

      <TrustBar locale={locale} />

      <section aria-labelledby="sessions-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
        <SectionHeading
          id="sessions-heading"
          eyebrow={COPY.sessionsEyebrow[locale]}
          title={COPY.sessionsTitle[locale]}
          action={{ href: '/services', label: COPY.sessionsAll[locale] }}
        />
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <StaggerItem key={service.slug}>
              <SessionCard
                service={service}
                locale={locale}
                pitch={FEATURED_SESSIONS[service.slug]?.[locale]}
                places={placesFor(service.slug)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-labelledby="destinations-heading" className="bg-brand-cream/60 py-[var(--space-section)]">
        <div className="mx-auto max-w-[92rem] px-6">
          <SectionHeading
            id="destinations-heading"
            eyebrow={COPY.destinationsEyebrow[locale]}
            title={COPY.destinationsTitle[locale]}
            lead={COPY.destinationsLead[locale]}
            action={{ href: '/cities', label: COPY.destinationsAll[locale] }}
          />
          <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city) => (
              <StaggerItem key={city.slug}>
                <DestinationCard city={city} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Both render nothing until there are real profiles and real reviews. */}
      <Photographers locale={locale} />
      <ClientStories locale={locale} />

      {portfolio.length > 0 && (
        <section aria-labelledby="portfolio-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
          <SectionHeading
            id="portfolio-heading"
            eyebrow={COPY.portfolioEyebrow[locale]}
            title={COPY.portfolioTitle[locale]}
            action={{ href: '/portfolio', label: COPY.portfolioAll[locale] }}
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {portfolio.map(({ service, slot }) => (
              <li key={slot}>
                <Link
                  href={serviceHref(service, locale)}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
                  data-track="portfolio_interaction"
                  data-track-service={service.slug}
                >
                  <figure className="relative aspect-[3/4] overflow-hidden border border-brand-rule">
                    <Picture
                      slot={slot}
                      alt=""
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                      fill
                    />
                  </figure>
                  <p className="mt-2.5 font-display text-base font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep">
                    {tx(service.name, locale)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-brand-muted">{COPY.portfolioNote[locale]}</p>
        </section>
      )}

      {pricing.length > 0 && (
        <section aria-labelledby="pricing-heading" className="border-t border-brand-rule bg-brand-cream/60 py-[var(--space-section)]">
          <div className="mx-auto max-w-[92rem] px-6">
            <SectionHeading
              id="pricing-heading"
              eyebrow={COPY.pricingEyebrow[locale]}
              title={COPY.pricingTitle[locale]}
              lead={
                <>
                  {tx(FROM_PRICE.body, locale)}{' '}
                  <strong className="font-semibold text-brand-dark">{tx(FROM_PRICE.noHiddenFees, locale)}</strong>
                </>
              }
              action={{ href: '/pricing', label: COPY.pricingAll[locale] }}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pricing.map((service) => (
                <PricingCard key={service.slug} service={service} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <HowItWorks locale={locale} />

      <GuaranteeBlock locale={locale} />

      <div id="faq" className="scroll-mt-20">
        <Faq headingId="faq-heading" eyebrow={COPY.faqEyebrow[locale]} title={COPY.faqTitle[locale]} entries={faqs} />
      </div>

      <section aria-labelledby="cta-heading" className="mx-auto max-w-[92rem] px-6 pt-[var(--space-section)]">
        <FadeIn>
          <div data-surface="dark" className="relative overflow-hidden bg-brand-dark px-7 py-[var(--space-band)] sm:px-16">
            <div
              className="azulejo azulejo-fade-r pointer-events-none absolute inset-y-0 right-0 w-full max-w-3xl opacity-80"
              style={{
                ['--azulejo-cell' as string]: '52px',
                maskImage: 'linear-gradient(to left, #000 20%, transparent 85%)',
                WebkitMaskImage: 'linear-gradient(to left, #000 20%, transparent 85%)',
              }}
              aria-hidden="true"
            />
            <div className="relative max-w-2xl">
              <p className="eyebrow">{COPY.ctaEyebrow[locale]}</p>
              <h2
                id="cta-heading"
                className="font-display mt-4 font-bold leading-[1.02] text-white"
                style={{ fontSize: 'var(--text-title)' }}
              >
                {COPY.ctaTitle[locale]}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-muted">{COPY.ctaSub[locale]}</p>
              <CtaPair locale={locale} context="final" onDark className="mt-9" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/*
        Long-form close, for search. It used to sit mid-page between the FAQ
        and the call to action; it now follows both, so nobody has to read it
        to reach the form.
      */}
      <SeoProse
        headingId="seo-prose-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />
    </main>
  );
}
