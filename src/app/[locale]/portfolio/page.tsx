import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type Locale, tx } from '@/lib/locales';
import { CITIES, SERVICES, REVIEWS, getServiceById, getCategoryLabel, getAggregateRating } from '@/lib/catalog';
import { allPortfolioImages } from '@/lib/portfolio';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, imageGalleryNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { absoluteOgImage } from '@/lib/images';
import { SITE_NAME, whatsappLink } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import { META_TITLE, OG_IMAGE_ALT, SEO_PROSE, metaDescription, seoFacts } from './content';

/** The frame that fronts the gallery on social previews. */
const OG_PHOTO = '/images/portfolio/wedding/1.jpg';

/**
 * How many photographs to name in the ImageGallery markup. The page renders
 * every frame; describing all 165 would cost several kilobytes on every request
 * to say something a crawler already gets from the first two dozen.
 */
const MARKED_UP_PHOTOS = 24;
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import PortfolioGallery, { type GalleryCategory } from '@/components/PortfolioGallery';
import PortfolioStickyCta from '@/components/PortfolioStickyCta';

const COPY = {
  title: { en: 'Portfolio', pt: 'PT_TODO: Portfolio' },
  eyebrow: { en: 'Real work', pt: 'PT_TODO: Real work' },
  heroTitle: {
    en: 'Every frame is a story we can capture for you too',
    pt: 'PT_TODO: Every frame is a story we can capture for you too',
  },
  intro: {
    en: 'Real sessions from across France, made by the photographers in our network. Filter by category and tap any image to see it full screen.',
    pt: 'PT_TODO: Real sessions from across France, made by the photographers',
  },
  book: { en: 'Book now', pt: 'PT_TODO: Book now' },
  whatsapp: { en: 'Chat on WhatsApp', pt: 'PT_TODO: Chat on WhatsApp' },
  trustLine: {
    en: 'Flat transparent pricing · 48-72h delivery · 100% money-back guarantee',
    pt: 'PT_TODO: Flat transparent pricing · 48-72h delivery · 100% money-back',
  },
  galleryEyebrow: { en: 'The gallery', pt: 'PT_TODO: The gallery' },
  galleryTitle: { en: 'Browse all of our work', pt: 'PT_TODO: Browse all of our work' },
  reviewsEyebrow: { en: 'Reviews', pt: 'PT_TODO: Reviews' },
  reviewsTitle: { en: 'Clients across France', pt: 'PT_TODO: Clients across France' },
  ctaTitle: { en: 'Ready to create your own gallery?', pt: 'PT_TODO: Ready to create your own gallery?' },
  ctaText: {
    en: 'Tell us your idea and we’ll match you with the right photographer in your city — flat price, no surprises.',
    pt: 'PT_TODO: Tell us your idea and we’ll match you with the right photogr',
  },
  breadcrumbHome: { en: 'Home', pt: 'PT_TODO: Home' },
  statRating: { en: 'Average rating', pt: 'PT_TODO: Average rating' },
  statCities: { en: 'Cities covered', pt: 'PT_TODO: Cities covered' },
  statServices: { en: 'Session types', pt: 'PT_TODO: Session types' },
  statDelivery: { en: 'Avg delivery', pt: 'PT_TODO: Avg delivery' },
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
  // "Portfolio" alone is a nav label, not a title tag: it names no subject, no
  // country and nothing a searcher types.
  return buildMetadata({
    locale,
    route: '/portfolio',
    title: tx(META_TITLE, locale),
    description: metaDescription(locale, allPortfolioImages().length),
    ogImage: OG_PHOTO,
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

/** One filled review star. Inline so the site carries no icon package. */
function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-brand-orange text-brand-orange-deep"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const rating = getAggregateRating();
  const wa = whatsappLink(
    {
      en: `Hi ${SITE_NAME}! I saw your portfolio and would like to book a photo session.`,
      pt: 'PT_TODO',
    }[locale],
  );

  // All photos, tagged with localized alt + category for the filter.
  const photos = allPortfolioImages().map((photo) => {
    const service = getServiceById(photo.serviceSlug);
    return {
      src: photo.src,
      category: photo.category,
      alt: service ? `${tx(service.name, locale)} — ${SITE_NAME}` : SITE_NAME,
    };
  });

  // Categories present in the gallery, in SERVICES order, deduped.
  const seen = new Set<string>();
  const categories: GalleryCategory[] = [];
  for (const service of SERVICES) {
    if (!seen.has(service.category) && photos.some((p) => p.category === service.category)) {
      seen.add(service.category);
      categories.push({ value: service.category, label: getCategoryLabel(service.category, locale) });
    }
  }

  const stats = [
    { value: rating.ratingValue ? `${rating.ratingValue.toFixed(1)}★` : '5.0★', label: c('statRating', locale) },
    { value: `${CITIES.length}`, label: c('statCities', locale) },
    { value: `${SERVICES.length}`, label: c('statServices', locale) },
    { value: '48-72h', label: c('statDelivery', locale) },
  ];

  // A gallery page is an ImageGallery, and the photographs on it are the
  // content — a bare BreadcrumbList described the navigation and nothing else.
  // Captions come from `photos`, so the markup says what the alt text says.
  const galleryUrl = absoluteUrl(locale, '/portfolio');
  const jsonLd = graph([
    imageGalleryNode({
      url: galleryUrl,
      name: tx(META_TITLE, locale),
      description: metaDescription(locale, photos.length),
      locale,
      images: photos.slice(0, MARKED_UP_PHOTOS).map((photo) => ({
        url: absoluteOgImage(photo.src),
        caption: photo.alt,
      })),
    }),
    breadcrumbNode([
      { name: c('breadcrumbHome', locale), url: absoluteUrl(locale, '/') },
      { name: c('title', locale), url: galleryUrl },
    ]),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section aria-labelledby="portfolio-hero" className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:py-28">
          <FadeIn instant>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange-deep">
              {c('eyebrow', locale)}
            </p>
            <h1
              id="portfolio-hero"
              className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl"
            >
              {c('heroTitle', locale)}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
              {c('intro', locale)}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="rounded-chip bg-brand-dark px-8 py-3.5 font-semibold text-white transition-colors hover:bg-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                {c('book', locale)}
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-chip border border-brand-rule bg-white px-8 py-3.5 font-semibold text-neutral-800 transition-colors hover:border-brand-orange/40 hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                {c('whatsapp', locale)}
              </a>
            </div>
            <p className="mt-6 text-sm font-medium text-brand-muted">{c('trustLine', locale)}</p>
          </FadeIn>
        </div>
      </section>

      {/* Trust stats */}
      <section aria-label={c('eyebrow', locale)} className="border-y border-brand-rule bg-brand-sand">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
            {c('galleryEyebrow', locale)}
          </p>
          <h2
            id="gallery-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
          >
            {c('galleryTitle', locale)}
          </h2>
        </FadeIn>
        <div className="mt-12">
          <PortfolioGallery photos={photos} categories={categories} locale={locale} />
        </div>
      </section>

      <SeoProse
        headingId="portfolio-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={seoFacts(locale, photos.length)}
      />

      {/* Testimonials */}
      <section aria-labelledby="reviews-heading" className="bg-brand-sand py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
              {c('reviewsEyebrow', locale)}
            </p>
            <h2
              id="reviews-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
            >
              {c('reviewsTitle', locale)}
            </h2>
          </FadeIn>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <StaggerItem key={review.id}>
                <figure className="flex h-full flex-col rounded-card border border-brand-rule bg-white p-6">
                  <div role="img" className="flex gap-0.5" aria-label={`${review.stars} / 5`}>
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-dark">
                    “{tx(review.text, locale)}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-brand-rule pt-4">
                    <p className="font-semibold text-neutral-900">{review.name}</p>
                    <p className="text-sm text-brand-muted">
                      {tx(review.serviceName, locale)} · {review.cityName}
                    </p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div data-surface="dark" className="relative overflow-hidden rounded-card bg-brand-dark px-8 py-16 text-center">
          <div
            aria-hidden="true"
          />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            {c('ctaTitle', locale)}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-neutral-300">{c('ctaText', locale)}</p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="rounded-chip bg-brand-orange-deep px-8 py-3.5 font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {c('book', locale)}
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-chip border border-white/20 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {c('whatsapp', locale)}
            </a>
          </div>
        </div>
      </section>

      <PortfolioStickyCta
        bookLabel={c('book', locale)}
        whatsappHref={wa}
        whatsappLabel={c('whatsapp', locale)}
      />
    </main>
  );
}
