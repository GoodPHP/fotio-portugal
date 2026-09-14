import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { REVIEWS, getAggregateRating } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, webPageNode, aggregateRatingWithReviewsNodes } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { serviceImage, absoluteOgImage } from '@/lib/images';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { OG_IMAGE_ALT, SEO_PROSE, metaTitle, metaDescription, seoFacts } from './content';
import { SITE_NAME } from '@/lib/site';

/** The session that fronts the review wall on social previews. */
const OG_SERVICE_SLUG = 'couple';

const COPY = {
  title: { en: 'Reviews', pt: 'PT_TODO: Reviews' },
  eyebrow: { en: 'In our clients’ words', pt: 'PT_TODO: In our clients’ words' },
  intro: {
    en: `Couples, families and companies who booked ${SITE_NAME} in France, in their own words — real ratings, real sessions, no selection for flattery.`,
    pt: 'PT_TODO',
  },
  basedOn: { en: 'based on', pt: 'PT_TODO: based on' },
  reviewsWord: { en: 'reviews', pt: 'PT_TODO: reviews' },
  breadcrumbHome: { en: 'Home', pt: 'PT_TODO: Home' },
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
    ogImage: serviceImage(OG_SERVICE_SLUG),
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
      image: absoluteOgImage(serviceImage(OG_SERVICE_SLUG)),
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
    <main className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <JsonLd data={jsonLd} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">
          {c('eyebrow', locale)}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
          {c('title', locale)}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-muted">{c('intro', locale)}</p>

        <div className="mt-8 inline-flex items-center gap-4 rounded-card-sm border border-brand-rule bg-white px-6 py-4">
          <span className="font-display text-4xl font-bold text-neutral-900">{ratingValue}</span>
          <span className="h-10 w-px bg-black/10" />
          <span>
            <Stars count={Math.round(ratingValue)} />
            <span className="mt-1 block text-sm text-brand-muted">
              {c('basedOn', locale)} {reviewCount} {c('reviewsWord', locale)}
            </span>
          </span>
        </div>
      </header>

      <section className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {REVIEWS.map((r) => (
          <article
            key={r.id}
            className="mb-5 break-inside-avoid rounded-card border border-brand-rule bg-white p-6 transition"
          >
            <Stars count={r.stars} />
            <blockquote className="mt-4 text-brand-dark">
              <p>“{tx(r.text, locale)}”</p>
            </blockquote>
            <footer className="mt-5 border-t border-brand-rule pt-4">
              <p className="font-semibold text-neutral-900">{r.name}</p>
              <p className="text-sm text-brand-muted">
                {tx(r.serviceName, locale)} · {r.cityName}
              </p>
            </footer>
          </article>
        ))}
      </section>

      <SeoProse
        nested
        headingId="reviews-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={seoFacts(locale, ratingValue, reviewCount)}
      />
    </main>
  );
}
