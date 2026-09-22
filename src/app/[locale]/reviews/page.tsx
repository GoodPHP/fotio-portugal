import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { REVIEWS, getAggregateRating } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, aggregateRatingWithReviewsNodes } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { serviceSlot, absoluteOgImage, ogImagePath } from '@/lib/images';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import GuaranteeBlock from '@/components/GuaranteeBlock';
import { ClientStoryCard } from '@/components/ClientStories';
import { OG_IMAGE_ALT, SEO_PROSE, metaTitle, metaDescription, seoFacts } from './content';
import { SITE_NAME } from '@/lib/site';

/** The session that fronts the review wall on social previews. */
const OG_SERVICE_SLUG = 'couple';

const COPY = {
  title: { en: 'Reviews', pt: 'Avaliações' },
  eyebrow: { en: 'In our clients’ words', pt: 'Nas palavras dos clientes' },
  intro: {
    en: `Couples, families and companies who booked ${SITE_NAME} in Portugal, in their own words — real ratings, real sessions, no selection for flattery.`,
    pt: `Casais, famílias e empresas que reservaram através da ${SITE_NAME} em Portugal, pelas suas próprias palavras — avaliações reais, sessões reais, sem selecção por conveniência.`,
  },
  basedOn: { en: 'based on', pt: 'com base em' },
  reviewsWord: { en: 'reviews', pt: 'avaliações' },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
  empty: {
    en: 'No reviews published yet. They appear here as sessions are delivered — asked for once, published as written.',
    pt: 'Ainda não há avaliações publicadas. Aparecem aqui à medida que as sessões são entregues — pedidas uma vez, publicadas tal como são escritas.',
  },
} as const;

function c(key: keyof typeof COPY, locale: Locale): string {
  return (COPY[key] as Record<Locale, string>)[locale] ?? COPY[key].en;
}

function Stars({ count }: { count: number }) {
  return (
    <span role="img" className="inline-flex text-brand-orange-deep" aria-label={`${count}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} aria-hidden="true" viewBox="0 0 20 20" className={`size-4 ${i < count ? 'fill-current' : 'fill-neutral-300'}`}>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // The rating is the reason to click, so it goes in the title rather than
  // being left for the searcher to discover after arriving.
  const { ratingValue, reviewCount } = getAggregateRating();
  return buildMetadata({
    locale,
    route: '/reviews',
    title: metaTitle(locale, ratingValue, reviewCount),
    description: metaDescription(locale, ratingValue, reviewCount),
    ogImage: ogImagePath(serviceSlot(OG_SERVICE_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { ratingValue, reviewCount } = getAggregateRating();

  const reviewsUrl = absoluteUrl(locale, '/reviews');
  const jsonLd = graph([
    webPageNode({
      url: reviewsUrl,
      name: metaTitle(locale, ratingValue, reviewCount),
      description: metaDescription(locale, ratingValue, reviewCount),
      locale,
      type: 'CollectionPage',
      image: absoluteOgImage(ogImagePath(serviceSlot(OG_SERVICE_SLUG))),
    }),
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
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: reviewsUrl },
    ]),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-[92rem] px-6 pt-8 sm:pt-10">
      <Breadcrumbs items={[{ name: c('breadcrumbHome', locale), href: '/' }, { name: c('title', locale) }]} />
      <header className="mt-8 max-w-3xl">
        <p className="eyebrow">
          {c('eyebrow', locale)}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl">
          {c('title', locale)}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-muted">{c('intro', locale)}</p>

        {/*
          No reviews, no score. "0/5" beside five empty stars is worse than
          saying nothing, and filling the space with invented reviews would be
          worse than both — the same number is emitted as an AggregateRating.
        */}
        {reviewCount > 0 ? (
          <div className="mt-8 inline-flex items-center gap-4 rounded-card-sm border border-brand-rule bg-brand-tile px-6 py-4">
            <span className="font-display text-4xl font-bold text-brand-dark">{ratingValue}</span>
            <span className="h-10 w-px bg-black/10" />
            <span>
              <Stars count={Math.round(ratingValue)} />
              <span className="mt-1 block text-sm text-brand-muted">
                {c('basedOn', locale)} {reviewCount} {c('reviewsWord', locale)}
              </span>
            </span>
          </div>
        ) : (
          <p className="mt-8 rounded-card-sm border border-brand-rule bg-brand-tile px-6 py-4 text-brand-muted">
            {c('empty', locale)}
          </p>
        )}
      </header>

      {REVIEWS.length > 0 && (
        <section className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <ClientStoryCard key={r.id} review={r} locale={locale} />
          ))}
        </section>
      )}
      </div>

      {/* The guarantee does not depend on a review, and is the reason a review
          can be honest: a refund and a bad review can coexist. */}
      <div className="mt-[var(--space-band)]">
        <GuaranteeBlock locale={locale} />
      </div>

      <CtaBand
        headingId="reviews-cta-heading"
        heading={
          reviewCount > 0
            ? { en: 'Ready for your own session?', pt: 'Pronto para a sua sessão?' }[locale]
            : { en: 'Be one of the first stories here', pt: 'Seja uma das primeiras histórias aqui' }[locale]
        }
        text={{
          en: 'Tell us where and when, and we’ll match you with a local photographer. We reply within about 2 hours during the working day.',
          pt: 'Diga-nos onde e quando e encontramos um fotógrafo local. Respondemos em cerca de 2 horas, durante o dia útil.',
        }[locale]}
        locale={locale}
        context="reviews-final"
      />

      <SeoProse
        headingId="reviews-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={seoFacts(locale, ratingValue, reviewCount)}
      />
    </main>
  );
}
