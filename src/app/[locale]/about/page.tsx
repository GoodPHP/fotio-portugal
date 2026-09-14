import type { Metadata } from 'next';
import Picture from '@/components/Picture';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import {
  CITIES,
  REVIEWS,
  SERVICES,
  getAggregateRating,
  getCategoryLabel,
  servicesByCategory,
} from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import {
  graph,
  breadcrumbNode,
  faqNode,
  webPageNode,
  aggregateRatingWithReviewsNodes,
} from '@/lib/jsonld';
import { ORG_ID } from '@/lib/jsonld-ids';
import { absoluteUrl } from '@/lib/urls';
import { citySlot, serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import {
  COPY,
  STEPS,
  VALUES,
  GUARANTEES,
  ABOUT_FAQ,
  META_TITLE,
  META_DESCRIPTION,
  OG_IMAGE_ALT,
  SEO_PROSE,
} from './content';
import { cityHref } from '@/lib/routes';

const HERO_CITY = 'paris';
const STORY_SERVICE = 'couple';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // COPY.lead is the on-page opener — 226 characters, written for someone who
  // has already arrived, and clamped to a stub in a SERP. The description is
  // authored separately for the reader who has not arrived yet.
  return buildMetadata({
    locale,
    route: '/about',
    title: tx(META_TITLE, locale),
    description: tx(META_DESCRIPTION, locale),
    ogImage: ogImagePath(citySlot(HERO_CITY)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}


function Stars({ count }: { count: number }) {
  return (
    <div className="flex" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-brand-orange-deep" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 15.9l-5.25 2.76 1-5.86L1.5 7.66l5.9-.86L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { ratingValue, reviewCount } = getAggregateRating();
  const featuredCities = CITIES.slice(0, 8);
  const categories = [...servicesByCategory().entries()].filter(([, services]) => services.length > 0);

  const stats = [
    { value: `${CITIES.length}`, label: { en: 'cities covered' } },
    { value: `${SERVICES.length}+`, label: { en: 'service types' } },
    { value: '48-72h', label: { en: 'gallery delivery' } },
    {
      value: `${ratingValue}/5`,
      label: { en: `${reviewCount} reviews` },
    },
  ];

  const aboutUrl = absoluteUrl(locale, '/about');
  // The Organization node comes from the layout on every page; repeating it
  // here only duplicated bytes under an identical @id.
  const jsonLd = graph([
    {
      // The page is about the organisation, and `webPageNode` supplies the rest
      // — the WebSite link and the hero image the hand-rolled node was missing.
      ...webPageNode({
        url: aboutUrl,
        name: tx(META_TITLE, locale),
        description: tx(META_DESCRIPTION, locale),
        locale,
        type: 'AboutPage',
        image: absoluteOgImage(ogImagePath(citySlot(HERO_CITY))),
        mainEntityId: ORG_ID,
      }),
      about: { '@id': ORG_ID },
    },
    breadcrumbNode([
      { name: tx(COPY.breadcrumbHome, locale), url: absoluteUrl(locale, '/') },
      { name: tx(COPY.title, locale), url: aboutUrl },
    ]),
    faqNode(ABOUT_FAQ.map((f) => ({ question: tx(f.q, locale), answer: tx(f.a, locale) }))),
    ...aggregateRatingWithReviewsNodes(
      ratingValue,
      reviewCount,
      REVIEWS.map((r) => ({
        author: r.name,
        rating: r.stars,
        text: tx(r.text, locale),
        datePublished: r.date,
      })),
    ),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />

      {/* Header + hero image */}
      <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24">
        <FadeIn instant className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange-deep">
            {tx(COPY.eyebrow, locale)}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl">
            {tx(COPY.title, locale)}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-brand-dark">{tx(COPY.lead, locale)}</p>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{tx(COPY.body, locale)}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-card border border-brand-rule sm:aspect-[21/9]">
            <Picture
              slot={citySlot(HERO_CITY)}
              alt="Paris"
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover"
              fill
              priority
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />
          </div>
        </FadeIn>
      </section>

      {/* Stats */}
      <section aria-label="Key facts" className="mx-auto max-w-7xl px-6 py-14">
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.value}>
              <div className="rounded-card border border-brand-rule bg-white p-6 text-center">
                <p className="font-display text-3xl font-bold text-brand-orange-deep">{s.value}</p>
                <p className="mt-1 text-sm text-brand-muted">{tx(s.label, locale)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Story / mission */}
      <section aria-labelledby="story-heading" className="bg-brand-sand py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
              {tx(COPY.storyEyebrow, locale)}
            </p>
            <h2
              id="story-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
            >
              {tx(COPY.storyTitle, locale)}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-dark">{tx(COPY.storyBody1, locale)}</p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">{tx(COPY.storyBody2, locale)}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-brand-rule">
              <Picture
                slot={serviceSlot(STORY_SERVICE)}
                alt={tx(
                { en: 'A couple during a photo session in France' },
                locale,
                )}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                fill
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
            {tx(COPY.valuesEyebrow, locale)}
          </p>
          <h2
            id="values-heading"
            className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
          >
            {tx(COPY.valuesTitle, locale)}
          </h2>
        </FadeIn>
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <StaggerItem key={tx(value.title, 'en')}>
              <div className="bento-card h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-card-sm bg-brand-sand text-xl text-brand-orange-deep" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-brand-dark">{tx(value.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{tx(value.body, locale)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="bg-brand-sand py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
              {tx(COPY.stepsEyebrow, locale)}
            </p>
            <h2
              id="how-heading"
              className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
            >
              {tx(COPY.stepsTitle, locale)}
            </h2>
          </FadeIn>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <StaggerItem key={step.n}>
                <div className="relative h-full rounded-card border border-brand-rule bg-white p-7">
                  <span className="font-mono text-sm font-semibold text-brand-orange-deep">{step.n}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-brand-dark">{tx(step.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{tx(step.body, locale)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why trust us / guarantees */}
      <section aria-labelledby="trust-heading" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
            {tx(COPY.trustEyebrow, locale)}
          </p>
          <h2
            id="trust-heading"
            className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
          >
            {tx(COPY.trustTitle, locale)}
          </h2>
          <p className="mt-3 max-w-xl text-base text-brand-muted">{tx(COPY.trustSub, locale)}</p>
        </FadeIn>
        <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GUARANTEES.map((g) => (
            <StaggerItem key={tx(g.title, 'en')}>
              <div data-surface="dark" className="h-full rounded-card bg-brand-dark p-6 text-white">
                <p className="font-display text-3xl font-bold text-brand-orange-deep">{g.stat}</p>
                <h3 className="mt-3 font-display text-base font-semibold">{tx(g.title, locale)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{tx(g.body, locale)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Where we shoot (coverage) */}
      <section aria-labelledby="coverage-heading" className="bg-brand-sand py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
                {tx(COPY.coverageEyebrow, locale)}
              </p>
              <h2
                id="coverage-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
              >
                {tx(COPY.coverageTitle, locale)}
              </h2>
              <p className="mt-3 max-w-xl text-base text-brand-muted">{tx(COPY.coverageSub, locale)}</p>
            </div>
            <Link
              href="/cities"
              className="text-sm font-semibold text-brand-dark underline-offset-4 hover:text-brand-orange-deep hover:underline"
            >
              {tx(COPY.coverageViewAll, locale)} →
            </Link>
          </FadeIn>
          <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredCities.map((city) => (
              <StaggerItem key={city.slug}>
                <Link
                  href={cityHref(city)}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card-sm border border-brand-rule p-5 text-white transition-all hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                >
                  <Picture
                    slot={citySlot(city.slug)}
                    alt={city.name}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="absolute inset-0 -z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  />
                  <span className="block font-display text-lg font-semibold leading-tight">{city.name}</span>
                  <span className="block text-xs text-white/80">{tx(city.region, locale)}</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What we offer */}
      <section aria-labelledby="offer-heading" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
              {tx(COPY.offerEyebrow, locale)}
            </p>
            <h2
              id="offer-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
            >
              {tx(COPY.offerTitle, locale)}
            </h2>
            <p className="mt-3 max-w-xl text-base text-brand-muted">{tx(COPY.offerSub, locale)}</p>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-dark underline-offset-4 hover:text-brand-orange-deep hover:underline"
          >
            {tx(COPY.offerViewAll, locale)} →
          </Link>
        </FadeIn>
        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map(([category, services]) => (
            <StaggerItem key={category}>
              <Link
                href="/services"
                className="group relative isolate flex aspect-square flex-col justify-end overflow-hidden rounded-card-sm border border-brand-rule p-4 text-white transition-all hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                <Picture
                  slot={serviceSlot(services[0].slug)}
                  alt={getCategoryLabel(category, locale)}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="absolute inset-0 -z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                />
                <span className="block font-display text-sm font-semibold leading-tight">
                  {getCategoryLabel(category, locale)}
                </span>
                <span className="mt-0.5 block text-xs text-white/70">
                  {services.length} {tx({ en: 'services' }, locale)}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Testimonials */}
      {REVIEWS.length > 0 && (
        <section aria-labelledby="reviews-heading" className="bg-brand-sand py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
                {tx(COPY.reviewsEyebrow, locale)}
              </p>
              <h2
                id="reviews-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
              >
                {tx(COPY.reviewsTitle, locale)}
              </h2>
            </FadeIn>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
              {REVIEWS.map((review) => (
                <StaggerItem key={review.id}>
                  <figure className="flex h-full flex-col rounded-card border border-brand-rule bg-white p-7">
                    <Stars count={review.stars} />
                    <span className="sr-only">{tx({ en: `${review.stars} out of 5 stars` }, locale)}</span>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-dark">
                      “{tx(review.text, locale)}”
                    </blockquote>
                    <figcaption className="mt-5 border-t border-brand-rule pt-4">
                      <p className="font-display text-sm font-semibold text-brand-dark">{review.name}</p>
                      <p className="mt-0.5 text-xs text-brand-muted">
                        {tx(review.serviceName, locale)} · {review.cityName}
                      </p>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-6 py-20">
        <FadeIn>
          <h2
            id="faq-heading"
            className="text-center font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
          >
            {tx(COPY.faqTitle, locale)}
          </h2>
        </FadeIn>
        <div className="mt-10 divide-y divide-black/5 rounded-card border border-brand-rule bg-white">
          {ABOUT_FAQ.map((faq) => (
            <details key={tx(faq.q, 'en')} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep">
                {tx(faq.q, locale)}
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-sand text-brand-dark transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{tx(faq.a, locale)}</p>
            </details>
          ))}
        </div>
      </section>

      <SeoProse
        headingId="about-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={tx(SEO_PROSE.facts, locale)}
      />

      {/* CTA */}
      <section aria-labelledby="cta-heading" className="mx-auto max-w-7xl px-6 pb-16">
        <FadeIn>
          <div data-surface="dark" className="relative overflow-hidden rounded-card bg-brand-dark px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden="true"
            />
            <h2 id="cta-heading" className="relative mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {tx(COPY.ctaTitle, locale)}
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-base text-neutral-300">{tx(COPY.ctaSub, locale)}</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-chip bg-brand-orange-deep px-8 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {tx(COPY.cta, locale)}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-chip border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {tx(COPY.ctaContact, locale)}
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
