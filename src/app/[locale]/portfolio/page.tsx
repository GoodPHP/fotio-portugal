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
  title: { en: 'Portfolio', pt: 'Portefólio' },
  eyebrow: { en: 'Real work', pt: 'Trabalho real' },
  heroTitle: {
    en: 'Every frame is a story we can capture for you too',
    pt: 'Cada imagem é uma história que também podemos fazer para si',
  },
  intro: {
    en: 'Real sessions from across Portugal, made by the photographers in our network. Filter by category and tap any image to see it full screen.',
    pt: 'Sessões reais feitas por todo o Portugal, pelos fotógrafos da nossa rede. Filtre por categoria e toque numa imagem para a ver em ecrã inteiro.',
  },
  book: { en: 'Book now', pt: 'Reservar' },
  whatsapp: { en: 'Chat on WhatsApp', pt: 'Falar no WhatsApp' },
  trustLine: {
    en: 'Flat transparent pricing · 48-72h delivery · 100% money-back guarantee',
    pt: 'Preço fixo e anunciado · entrega em 48-72 h · garantia de reembolso a 100%',
  },
  galleryEyebrow: { en: 'The gallery', pt: 'A galeria' },
  galleryTitle: { en: 'Browse all of our work', pt: 'Veja todo o nosso trabalho' },
  reviewsEyebrow: { en: 'Reviews', pt: 'Avaliações' },
  reviewsTitle: { en: 'Clients across Portugal', pt: 'Clientes em todo o Portugal' },
  ctaTitle: { en: 'Ready to create your own gallery?', pt: 'Pronto para criar a sua própria galeria?' },
  ctaText: {
    en: 'Tell us your idea and we’ll match you with the right photographer in your city — flat price, no surprises.',
    pt: 'Diga-nos o que tem em mente e encontramos o fotógrafo certo na sua cidade — preço fixo, sem surpresas.',
  },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
  statRating: { en: 'Average rating', pt: 'Avaliação média' },
  statReply: { en: 'Reply time', pt: 'Tempo de resposta' },
  statCities: { en: 'Cities covered', pt: 'Cidades cobertas' },
  statServices: { en: 'Session types', pt: 'Tipos de sessão' },
  statDelivery: { en: 'Avg delivery', pt: 'Entrega média' },
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
      pt: `Olá ${SITE_NAME}! Vi o vosso portefólio e gostaria de reservar uma sessão fotográfica.`,
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

  /*
    The first tile used to fall back to a hardcoded "5.0★".

    REVIEWS is empty and is meant to be — the catalogue module says so, because
    an aggregate rating assembled from invented reviews is a claim that is not
    true. The fallback printed exactly that claim on every build anyway, in the
    largest type on the page, which is the same falsehood by a shorter route.
    Until there are real ratings the tile carries a promise the site can keep.
  */
  const stats = [
    rating.ratingValue
      ? { value: `${rating.ratingValue.toFixed(1)}★`, label: c('statRating', locale) }
      : { value: '2h', label: c('statReply', locale) },
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
        <div className="mx-auto max-w-[92rem] px-6 py-20 text-center sm:py-28">
          <FadeIn instant>
            <p className="eyebrow">
              {c('eyebrow', locale)}
            </p>
            <h1
              id="portfolio-hero"
              className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl"
            >
              {c('heroTitle', locale)}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
              {c('intro', locale)}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="btn btn-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                {c('book', locale)}
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                {c('whatsapp', locale)}
              </a>
            </div>
            <p className="mt-6 text-sm font-medium text-brand-muted">{c('trustLine', locale)}</p>
          </FadeIn>
        </div>
      </section>

      {/* Trust stats, as the same course of tiles the home page opens with. */}
      <section aria-label={c('eyebrow', locale)} className="mx-auto max-w-[92rem] px-6 pb-[var(--space-band)]">
        <dl className="grout grout-tile grid-cols-2 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-5 py-7 sm:px-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display block text-3xl font-bold leading-none tracking-[-0.04em] text-brand-dark sm:text-[2.75rem]">
                  {stat.value}
                </span>
                <span className="font-mono mt-3 block text-[0.6875rem] uppercase tracking-[0.16em] text-brand-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="mx-auto max-w-[92rem] px-6 py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">
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
        <div className="mx-auto max-w-[92rem] px-6">
          <FadeIn>
            <p className="eyebrow">
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
                <figure className="flex h-full flex-col rounded-card border border-brand-rule bg-brand-tile p-6">
                  <div role="img" className="flex gap-0.5" aria-label={`${review.stars} / 5`}>
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-dark">
                    “{tx(review.text, locale)}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-brand-rule pt-4">
                    <p className="font-semibold text-brand-dark">{review.name}</p>
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
      <section className="mx-auto max-w-[92rem] px-6 py-16 sm:py-20">
        <div data-surface="dark" className="relative overflow-hidden rounded-card bg-brand-dark px-8 py-16 text-center">
          <div
            aria-hidden="true"
          />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            {c('ctaTitle', locale)}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-brand-muted">{c('ctaText', locale)}</p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="btn btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {c('book', locale)}
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
