import type { Locale, Localized } from './locales';
import type { PtArticle } from './pt-grammar';
import type { CityThemeId } from './theme';

/** What the light does at a spot in one season. */
export interface SeasonNote {
  season: Localized;
  note: Localized;
}

export interface PhotoSpot {
  /** Proper noun, in Portuguese. Place names are not translated. */
  name: string;
  bestTime: Localized;
  permitCost: Localized;
  description: Localized;
  /**
   * How the light and the crowds change across the year. This is the part a
   * visitor cannot look up and the reason to read the page at all.
   */
  light?: SeasonNote[];
}

export interface CityFAQ {
  question: Localized;
  answer: Localized;
}

/** One photograph in a city's gallery. */
export interface GalleryImage {
  /** Public path, e.g. '/images/gallery/paris/1.jpg'. */
  src: string;
  alt: Localized;
  /**
   * Short label naming the place shown. Present where the photograph was made
   * for us and we know what it is; absent for stock, where inventing a caption
   * would be claiming knowledge we do not have.
   */
  caption?: Localized;
}

export interface City {
  /**
   * URL slug, identity, image path and schedule key. Portuguese and ASCII:
   * `lisboa`, `acores`, `evora`. Shared across locales — unlike a service,
   * a place has one address on this site in every language.
   */
  slug: string;
  /**
   * The Portuguese name, and the canonical one. Used wherever the name is not
   * being shown to a reader: JSON-LD @ids, sorting, the article lookup.
   */
  name: string;
  /**
   * The name as each language writes it, when they differ.
   *
   * France never needed this — Paris is Paris — and the old comment here
   * claimed a proper noun is "written the same in both languages", which is
   * simply false for Portugal: Lisbon and Lisboa, Azores and Açores. Absent
   * when the two agree, which is most of them.
   */
  nameLocalized?: Localized;
  /**
   * What kind of place this is. Drives the JSON-LD `areaServed` type, which
   * was hardcoded to `City` and is wrong for a wine region or an archipelago
   * — a distinction a search engine will forgive and an answer engine reading
   * the graph will not.
   */
  kind?: 'city' | 'region' | 'island';
  /**
   * The definite article the Portuguese name takes: "o Porto", "a Madeira",
   * "os Açores", but plain "Lisboa". Absent for most names, which is why it is
   * optional rather than a required field nobody would fill in correctly.
   * Drives the contractions in `src/lib/pt-grammar.ts` — em + o = no,
   * de + o = do.
   */
  ptArticle?: PtArticle;
  region: Localized;
  /** The article `region` takes, when the region name is not already listed
   * in `PLACE_ARTICLES`. */
  regionArticle?: PtArticle;
  /** The one line that has to earn the rest of the page. */
  lede: Localized;
  narrative: Localized;
  seasonality: Localized;
  /**
   * Surrounding communes covered from here at no travel charge. Listed rather
   * than given pages of their own: there would be nothing to write on them that
   * this page does not already say.
   */
  coveredAreas?: string[];
  /**
   * Optional visual theme. A city with one is rendered in its own palette on
   * its city page and on its service x city pages; everything else keeps the
   * house brand.
   */
  theme?: CityThemeId;
  /**
   * Photographs of the city itself, shown under the hero. Empty for the
   * destinations that have no photography of their own yet — the page renders
   * without the section rather than padding it with pictures of somewhere else.
   */
  gallery?: GalleryImage[];
  spots: PhotoSpot[];
  faqs: CityFAQ[];
  /**
   * A line from the photographer who works here.
   *
   * Optional, and absent until there is a real one. The field exists because
   * the page has a place for it, which is not a reason to invent a named
   * person and attribute a sentence to them.
   */
  quote?: {
    text: Localized;
    author: string;
    role: Localized;
  };
  stats: {
    visitors?: string;
    weddings?: string;
    stays?: string;
  };
  topServices: string[]; // Slugs of priority services for this city
}

export type ServiceCategory =
  | 'individual'
  | 'couples'
  | 'family'
  | 'wedding'
  | 'vacation'
  | 'business'
  | 'blog'
  | 'commercial'
  | 'fashion'
  | 'other';

export interface ServiceFAQ {
  question: Localized;
  answer: Localized;
}

export interface Service {
  /**
   * Stable identity, and the English URL slug. Never localized, never changes:
   * JSON-LD @ids and the publish schedule are keyed on it.
   */
  slug: string;
  /**
   * Per-locale URL slug. A missing locale falls back to `slug`. Values must be
   * unique within a locale — `catalog.ts` asserts that at module load.
   *   wedding -> { pt: 'casamento' }
   */
  slugs?: Partial<Record<Locale, string>>;
  /**
   * Locales this service is offered in. Omit for all of them. A service listed
   * in one locale only emits no hreflang alternate for the other, and never
   * reaches that locale's sitemap or listings.
   */
  availableIn?: readonly Locale[];
  name: Localized;
  category: ServiceCategory;
  initialPrice: number;
  description?: Localized;
  durationMinutes: number;
  editedPhotos: number;
  /**
   * Upper end of the photo count when it is a range — the base package is
   * "15–20 edited photos". Absent when the count is a single number.
   */
  editedPhotosMax?: number;
  /**
   * How long the gallery takes, in hours: a number, or a `[from, to]` window.
   *
   * Structured because the site used to promise "48–72h" for everything,
   * weddings included, while the wedding's own deliverables said three weeks.
   * The value restates the delivery line in `deliverables`, and
   * `promises.test.ts` fails when the two disagree.
   */
  deliveryHours: number | readonly [number, number];
  deliverables: Localized<string[]>;
  faqs?: ServiceFAQ[];
}

export interface BlogFAQ {
  question: Localized;
  answer: Localized;
}

export interface BlogPost {
  slug: string;
  title: Localized;
  date: string;
  /** ISO date of the last substantive revision; emitted as `dateModified`. */
  updated?: string;
  readTime: string;
  /**
   * A named writer, only when there is a real one. Absent means the article
   * is published by the organisation, and is attributed to it.
   */
  author?: string;
  summary: Localized;
  content: Localized;
  /**
   * Image slot for the cover, e.g. 'cities/douro'. A `cities/*` or
   * `services/*` slot also has a 1200×630 share card, so use one of those.
   */
  cover: string;
  /** Localized alt text for the cover image. */
  coverAlt: Localized;
  /** Topic label emitted as `articleSection` in JSON-LD. */
  section?: Localized;
  /** Q&A block rendered after the body and emitted as a FAQPage node. */
  faqs?: BlogFAQ[];
  /** The topic cluster the article belongs to; see `BLOG_CLUSTERS`. */
  cluster?: BlogClusterId;
  /** Place slugs the article is about, linked from its foot. */
  relatedCities?: string[];
  /** Service ids the article sells, linked from its foot. */
  relatedServices?: string[];
}

export type BlogClusterId = 'lisbon' | 'algarve' | 'portugal';

/**
 * A client review, and the client story it can carry.
 *
 * Real only. Every field comes from a client who booked, with their consent
 * to publish; `REVIEWS` stays empty until there are such reviews, and every
 * surface that shows reviews renders nothing while it is. The optional fields
 * turn a review into a client story — session, length, photographer, a few
 * frames from the gallery — and are shown only when present.
 */
export interface Review {
  id: string;
  /** As the client agreed to be named: "Sarah & James", "Ana C." */
  name: string;
  citySlug: string;
  cityName: string;
  stars: number;
  /** ISO date of the session. */
  date: string;
  text: Localized;
  serviceName: Localized;
  /** Service id, to link the story to the session page. */
  serviceSlug?: string;
  durationMinutes?: number;
  /** Photographer slug, once profiles exist. */
  photographerSlug?: string;
  /** Image slots from the client's own gallery, released in writing. */
  gallery?: string[];
}

/**
 * A photographer in the network, with a public profile.
 *
 * EVERY FIELD MUST COME FROM THE PHOTOGRAPHER. Nothing here may be invented,
 * estimated or filled in "for now": a marketplace profile is a claim about a
 * real person, and a made-up rating, session count or credential on one is
 * both misleading and, under consumer-protection law, unlawful. The optional
 * fields are optional precisely so a profile can go live without them; the
 * pages render nothing where a value is absent.
 *
 * The list lives in `src/lib/data/photographers.ts` and is empty until real
 * profiles are supplied. While it is empty every photographer surface — the
 * nav item, the home section, the city blocks, the /photographers routes —
 * is hidden rather than shown with placeholders.
 */
export interface Photographer {
  /** URL slug, ASCII: `ana-silva`. Shared across locales. */
  slug: string;
  /** Name as the photographer wants it shown. */
  name: string;
  /** Image slot for the portrait, e.g. `photographers/ana-silva`. Must be their own photograph. */
  portrait: string;
  /** City slugs they work in — first is their base. Must exist in CITIES. */
  cities: string[];
  /** Service ids they offer. Must exist in SERVICES. */
  services: string[];
  /** Languages they work in, as ISO 639-1 codes: 'en', 'pt', 'es', 'fr'… */
  languages: string[];
  /** Short bio, in their own words or approved by them. */
  bio: Localized;
  /** Image slots of their own published work. */
  portfolio: string[];
  faqs?: { question: Localized; answer: Localized }[];
  /** Only from verified client reviews on this site. Omit otherwise. */
  rating?: { value: number; count: number };
  /** Only a real, countable figure. Omit otherwise. */
  sessionCount?: number;
}
