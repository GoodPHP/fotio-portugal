import type { Locale } from './locales';
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from './site';
import { ORG_ID, WEBSITE_ID, businessId, serviceNodeId, offerId } from './jsonld-ids';

type Node = Record<string, unknown>;

/** Wrap nodes into a single JSON-LD @graph document. */
export function graph(nodes: Node[]): Node {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export function organizationNode(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    // Omit `sameAs` entirely when no social URLs are configured, rather than
    // emitting an empty array (which validators flag).
    ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS } : {}),
  };
}

export function websiteNode(locale: Locale): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbNode(items: BreadcrumbItem[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqNode(faqs: FaqEntry[]): Node {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export interface ProfessionalServiceInput {
  citySlug: string;
  cityName: string;
  region: string;
  locale: Locale;
  url: string;
  priceRange?: string;
  /**
   * Surrounding communes covered from this city at no travel charge. They have
   * no pages of their own, so `areaServed` is the only place the coverage is
   * stated in a form a crawler can read.
   */
  coveredAreas?: string[];
  /** Absolute URLs of photographs of the city itself. */
  photos?: string[];
  /** Absolute URL of the city's hero photograph. */
  image?: string;
}

export function professionalServiceNode({
  citySlug,
  cityName,
  region,
  locale,
  url,
  priceRange = '€€',
  coveredAreas = [],
  photos = [],
  image,
}: ProfessionalServiceInput): Node {
  const served = [
    {
      '@type': 'City',
      name: cityName,
      containedInPlace: { '@type': 'AdministrativeArea', name: region },
    },
    ...coveredAreas.map((area) => ({
      '@type': 'Place',
      name: area,
      containedInPlace: { '@type': 'AdministrativeArea', name: region },
    })),
  ];
  return {
    '@type': 'ProfessionalService',
    '@id': businessId(citySlug),
    name: `${SITE_NAME} — ${cityName}`,
    url,
    // The city photograph identifies the business better than the wordmark;
    // fall back to the logo where a city has no photography of its own yet.
    image: image ?? `${SITE_URL}/logo.png`,
    ...(photos.length > 0
      ? { photo: photos.map((contentUrl) => ({ '@type': 'ImageObject', contentUrl })) }
      : {}),
    inLanguage: locale,
    priceRange,
    parentOrganization: { '@id': ORG_ID },
    areaServed: served,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: region,
      addressCountry: 'FR',
    },
  };
}

export interface ServiceOfferInput {
  serviceSlug: string;
  serviceName: string;
  description: string;
  price: number;
  locale: Locale;
  url: string;
  citySlug?: string;
  areaServedName?: string;
}

export function serviceOfferNode({
  serviceSlug,
  serviceName,
  description,
  price,
  locale,
  url,
  citySlug,
  areaServedName,
}: ServiceOfferInput): Node {
  return {
    '@type': 'Service',
    '@id': serviceNodeId(serviceSlug, citySlug),
    name: serviceName,
    description,
    serviceType: serviceName,
    url,
    inLanguage: locale,
    provider: { '@id': ORG_ID },
    ...(areaServedName ? { areaServed: { '@type': 'City', name: areaServedName } } : {}),
    offers: {
      '@type': 'Offer',
      '@id': offerId(serviceSlug, citySlug),
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url,
    },
  };
}

export interface ReviewLike {
  author: string;
  rating: number;
  text: string;
  datePublished: string;
}

export function aggregateRatingWithReviewsNodes(
  ratingValue: number,
  reviewCount: number,
  reviews: ReviewLike[],
): Node[] {
  // An AggregateRating with a reviewCount of zero is not a modest claim, it is
  // an invalid one: Google rejects it, and a rating averaged over no reviews is
  // structured data asserting something nobody said. Emit nothing instead.
  if (reviewCount === 0) return [];

  const aggregate: Node = {
    '@type': 'AggregateRating',
    '@id': `${ORG_ID}-rating`,
    itemReviewed: { '@id': ORG_ID },
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
  const reviewNodes: Node[] = reviews.map((r) => ({
    '@type': 'Review',
    itemReviewed: { '@id': ORG_ID },
    author: { '@type': 'Person', name: r.author },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    reviewBody: r.text,
    datePublished: r.datePublished,
  }));
  return [aggregate, ...reviewNodes];
}

export interface ArticleInput {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  author: string;
  locale: Locale;
  /** Absolute URL of the article cover image. */
  image?: string;
  /** ISO date of the last substantive revision. */
  dateModified?: string;
  /** Topic label, e.g. "Matrimoni". */
  section?: string;
  /** Approximate body length in words. */
  wordCount?: number;
}

export function articleNode({
  headline,
  description,
  url,
  datePublished,
  author,
  locale,
  image,
  dateModified,
  section,
  wordCount,
}: ArticleInput): Node {
  return {
    '@type': 'BlogPosting',
    headline,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    // Google reads `dateModified` for freshness; fall back to the publish date
    // so the field is never absent or newer than the article itself.
    dateModified: dateModified ?? datePublished,
    inLanguage: locale,
    ...(image ? { image } : {}),
    ...(section ? { articleSection: section } : {}),
    ...(wordCount && wordCount > 0 ? { wordCount } : {}),
    author: { '@type': 'Person', name: author },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/** Schema.org page subtypes we distinguish. Everything else is a plain WebPage. */
export type WebPageType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';

export interface WebPageInput {
  url: string;
  name: string;
  description: string;
  locale: Locale;
  type?: WebPageType;
  /** Absolute URL of the page's primary image. */
  image?: string;
  /** `@id` of the node this page principally describes, e.g. an ItemList. */
  mainEntityId?: string;
}

/**
 * The page itself, typed. A hub that lists things is a `CollectionPage`, not a
 * `WebPage` — the distinction is what lets a crawler treat the accompanying
 * `ItemList` as the page's subject rather than as incidental markup.
 */
export function webPageNode({
  url,
  name,
  description,
  locale,
  type = 'WebPage',
  image,
  mainEntityId,
}: WebPageInput): Node {
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', contentUrl: image } } : {}),
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
  };
}

export interface ListEntry {
  name: string;
  url: string;
  /** Absolute URL of a representative image. */
  image?: string;
  description?: string;
}

/**
 * An ordered list of the pages a hub links to. Position is 1-based and must
 * match the visible order, which is why callers pass the same array they render.
 */
export function itemListNode(
  items: ListEntry[],
  { id, name }: { id?: string; name?: string } = {},
): Node {
  return {
    '@type': 'ItemList',
    ...(id ? { '@id': id } : {}),
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.image ? { image: item.image } : {}),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export interface GalleryImage {
  /** Absolute URL of the photograph. */
  url: string;
  caption: string;
}

/**
 * A gallery page and the photographs on it. `ImageGallery` is a `CollectionPage`
 * subtype, so this replaces `webPageNode` rather than accompanying it.
 *
 * Callers pass a representative subset: the markup describes what the page is,
 * and inlining every photograph would cost more bytes than it earns.
 */
export function imageGalleryNode({
  url,
  name,
  description,
  locale,
  images,
}: {
  url: string;
  name: string;
  description: string;
  locale: Locale;
  images: GalleryImage[];
}): Node {
  return {
    '@type': 'ImageGallery',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    associatedMedia: images.map((image) => ({
      '@type': 'ImageObject',
      contentUrl: image.url,
      caption: image.caption,
      creditText: SITE_NAME,
    })),
  };
}

export interface CatalogOffer {
  name: string;
  url: string;
  /** Starting price in EUR. */
  price: number;
  /** Category label the offer is grouped under on the page. */
  category?: string;
}

/**
 * A price list, described as one.
 *
 * Prices on the page are "from" figures, so every offer carries
 * `priceSpecification.minPrice` rather than a flat `price` — the distinction
 * matters, because an `Offer` with a bare `price` claims the shoot costs
 * exactly that, and a wedding quoted from €2,200 does not.
 */
export function offerCatalogNode({
  id,
  name,
  url,
  locale,
  offers,
}: {
  id: string;
  name: string;
  url: string;
  locale: Locale;
  offers: CatalogOffer[];
}): Node {
  return {
    '@type': 'OfferCatalog',
    '@id': id,
    name,
    url,
    inLanguage: locale,
    numberOfItems: offers.length,
    provider: { '@id': ORG_ID },
    itemListElement: offers.map((offer, i) => ({
      '@type': 'Offer',
      position: i + 1,
      name: offer.name,
      url: offer.url,
      availability: 'https://schema.org/InStock',
      ...(offer.category ? { category: offer.category } : {}),
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: offer.price,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: true,
      },
    })),
  };
}

export interface BlogPostSummary {
  headline: string;
  url: string;
  datePublished: string;
  author: string;
  description?: string;
  /** Absolute URL of the cover image. */
  image?: string;
  section?: string;
}

/**
 * The blog index and the posts on it. Each entry is a real `BlogPosting` node
 * rather than a bare `ListItem`, so the index states authorship and publication
 * dates for the whole archive instead of only inside each article.
 */
export function blogNode({
  url,
  name,
  description,
  locale,
  posts,
}: {
  url: string;
  name: string;
  description: string;
  locale: Locale;
  posts: BlogPostSummary[];
}): Node {
  return {
    '@type': 'Blog',
    '@id': `${url}#blog`,
    url,
    name,
    description,
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.headline,
      url: post.url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
      datePublished: post.datePublished,
      author: { '@type': 'Person', name: post.author },
      publisher: { '@id': ORG_ID },
      inLanguage: locale,
      ...(post.description ? { description: post.description } : {}),
      ...(post.image ? { image: post.image } : {}),
      ...(post.section ? { articleSection: post.section } : {}),
    })),
  };
}

/**
 * The booking action a page offers. Attached as a WebPage's `potentialAction`,
 * it names the page as the place a reservation is started rather than leaving a
 * crawler to infer it from a form it cannot submit.
 */
export function reserveActionNode({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}): Node {
  return {
    '@type': 'ReserveAction',
    name,
    target: {
      '@type': 'EntryPoint',
      urlTemplate: url,
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform',
      ],
    },
    result: {
      '@type': 'Reservation',
      name,
      description,
      provider: { '@id': ORG_ID },
    },
  };
}
