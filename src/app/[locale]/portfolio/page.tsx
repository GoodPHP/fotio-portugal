import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale, tx } from '@/lib/locales';
import { REVIEWS, getCategoryLabel, publishedServices } from '@/lib/catalog';
import { portfolioImages } from '@/lib/portfolio';
import type { ServiceCategory } from '@/lib/types';
import { buildMetadata } from '@/lib/seo';
import { graph, breadcrumbNode, imageGalleryNode } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/urls';
import { absoluteOgImage, hasImage, imagePath, ogImagePath, serviceSlot } from '@/lib/images';
import { imageCredit } from '@/lib/credits';
import { formatPrice } from '@/lib/site';
import { serviceHref } from '@/lib/routes';
import JsonLd from '@/components/JsonLd';
import SeoProse from '@/components/SeoProse';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaPair from '@/components/CtaPair';
import CtaBand from '@/components/CtaBand';
import TrustBar from '@/components/TrustBar';
import ClientStories from '@/components/ClientStories';
import { FadeIn } from '@/components/Motion';
import PortfolioGallery, { type GalleryCategory, type GalleryPhoto } from '@/components/PortfolioGallery';
import { META_TITLE, OG_IMAGE_ALT, SEO_PROSE, metaDescription, seoFacts } from './content';

/**
 * The frame that fronts the gallery on social previews.
 *
 * This was '/images/portfolio/wedding/1.jpg', a file that has never existed —
 * the pipeline writes hashed AVIF and WebP, plus a JPEG share card per
 * service — so every share of this page previewed a 404.
 */
const OG_SERVICE_SLUG = 'wedding';

/**
 * How many photographs to name in the ImageGallery markup. The page renders
 * every frame; describing all of them would cost several kilobytes on every
 * request to say something a crawler already gets from the first two dozen.
 */
const MARKED_UP_PHOTOS = 24;

const COPY = {
  title: { en: 'Portfolio', pt: 'Portefólio' },
  eyebrow: { en: 'Portfolio', pt: 'Portefólio' },
  heroTitle: {
    en: 'See what your session could look like',
    pt: 'Veja como pode ficar a sua sessão',
  },
  /*
    Honest about what the pictures are. This page used to call them "real
    sessions from across Portugal, made by the photographers in our network"
    under an eyebrow reading "Real work". Every one of them is licensed stock.
  */
  intro: {
    en: 'An illustrative gallery of the sessions you can book, grouped by type. Each photograph is credited to the photographer who took it; client galleries from our network are added as they are published.',
    pt: 'Uma galeria ilustrativa das sessões que pode reservar, agrupadas por tipo. Cada fotografia é creditada a quem a fez; as galerias de clientes da nossa rede são acrescentadas à medida que são publicadas.',
  },
  galleryEyebrow: { en: 'The gallery', pt: 'A galeria' },
  galleryTitle: { en: 'Browse by session', pt: 'Ver por sessão' },
  from: { en: 'from', pt: 'desde' },
  ctaTitle: { en: 'Seen the kind of photos you want?', pt: 'Viu o tipo de fotografias que quer?' },
  ctaText: {
    en: 'Tell us where and when, and we’ll match you with a local photographer. We reply within about 2 hours during the working day.',
    pt: 'Diga-nos onde e quando e encontramos um fotógrafo local. Respondemos em cerca de 2 horas, durante o dia útil.',
  },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
} as const;

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
    description: metaDescription(locale, galleryPhotos(locale).length),
    ogImage: ogImagePath(serviceSlot(OG_SERVICE_SLUG)),
    ogImageAlt: tx(OG_IMAGE_ALT, locale),
  });
}

/**
 * Every portfolio photograph for a session offered in this language, tagged
 * with its session and credit.
 *
 * Only this language's sessions: the gallery used to show all twenty-two
 * services' photographs to both audiences, so an English reader could filter
 * to a category whose sessions have no English page.
 */
function galleryPhotos(locale: Locale): GalleryPhoto[] {
  const services = publishedServices(locale);
  const perService = services.map((service) => ({ service, slots: portfolioImages(service.slug).filter(hasImage) }));
  const photos: GalleryPhoto[] = [];
  // Interleaved — one of each session, then the second of each — so the
  // unfiltered wall shows the range rather than twenty weddings in a row.
  const rounds = Math.max(0, ...perService.map((p) => p.slots.length));
  for (let i = 0; i < rounds; i += 1) {
    for (const { service, slots } of perService) {
      const slot = slots[i];
      if (!slot) continue;
      const name = tx(service.name, locale);
      photos.push({
        src: slot,
        category: service.category,
        alt: name,
        session: {
          name,
          href: serviceHref(service, locale),
          price: `${COPY.from[locale]} ${formatPrice(service.initialPrice, locale)}`,
        },
        credit: imageCredit(slot),
      });
    }
  }
  return photos;
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const photos = galleryPhotos(locale);

  // Categories present in the gallery, in catalogue order.
  const categories: GalleryCategory[] = [];
  for (const photo of photos) {
    if (!categories.some((c) => c.value === photo.category)) {
      categories.push({ value: photo.category, label: getCategoryLabel(photo.category as ServiceCategory, locale) });
    }
  }

  // A gallery page is an ImageGallery, and the photographs on it are the
  // content — a bare BreadcrumbList described the navigation and nothing else.
  const galleryUrl = absoluteUrl(locale, '/portfolio');
  const jsonLd = graph([
    imageGalleryNode({
      url: galleryUrl,
      name: tx(META_TITLE, locale),
      description: metaDescription(locale, photos.length),
      locale,
      images: photos.slice(0, MARKED_UP_PHOTOS).flatMap((photo) => {
        const path = imagePath(photo.src);
        return path ? [{ url: absoluteOgImage(path), caption: photo.alt }] : [];
      }),
    }),
    breadcrumbNode([
      { name: COPY.breadcrumbHome[locale], url: absoluteUrl(locale, '/') },
      { name: COPY.title[locale], url: galleryUrl },
    ]),
  ]);

  return (
    <main>
      <JsonLd data={jsonLd} />

      <section aria-labelledby="portfolio-hero" className="mx-auto max-w-[92rem] px-6 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: COPY.breadcrumbHome[locale], href: '/' }, { name: COPY.title[locale] }]} />
        <FadeIn instant className="mt-8 max-w-3xl">
          <p className="eyebrow">{COPY.eyebrow[locale]}</p>
          <h1
            id="portfolio-hero"
            className="font-display mt-4 font-bold leading-[1.0] text-brand-dark"
            style={{ fontSize: 'var(--text-title)' }}
          >
            {COPY.heroTitle[locale]}
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-brand-muted">{COPY.intro[locale]}</p>
          <CtaPair locale={locale} context="portfolio-hero" className="mt-8" />
        </FadeIn>
      </section>

      <section aria-labelledby="gallery-heading" className="mx-auto max-w-[92rem] px-6 py-[var(--space-band)]">
        <h2 id="gallery-heading" className="sr-only">
          {COPY.galleryTitle[locale]}
        </h2>
        <PortfolioGallery photos={photos} categories={categories} locale={locale} />
      </section>

      <TrustBar locale={locale} />

      {REVIEWS.length > 0 && <ClientStories locale={locale} />}

      <CtaBand
        headingId="portfolio-cta-heading"
        heading={COPY.ctaTitle[locale]}
        text={COPY.ctaText[locale]}
        locale={locale}
        context="portfolio-final"
      />

      <SeoProse
        headingId="portfolio-seo-heading"
        eyebrow={tx(SEO_PROSE.eyebrow, locale)}
        heading={tx(SEO_PROSE.heading, locale)}
        paragraphs={tx(SEO_PROSE.paragraphs, locale)}
        facts={seoFacts(locale, photos.length)}
      />
    </main>
  );
}
