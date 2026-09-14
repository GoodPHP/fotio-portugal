import type { Locale, Localized } from './locales';
import type { CityThemeId } from './theme';

/** What the light does at a spot in one season. */
export interface SeasonNote {
  season: Localized;
  note: Localized;
}

export interface PhotoSpot {
  /** Proper noun — written the same in both languages. */
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
  slug: string;
  /** Proper noun — written the same in both languages. */
  name: string;
  /**
   * The definite article the French name takes: "le Mont-Saint-Michel", but
   * plain "Paris". Absent for almost every city, which is why it is optional
   * rather than a required field nobody would fill in correctly. Drives the
   * contractions in `src/lib/city-name.ts` — à + le = au, de + le = du.
   */
  frArticle?: 'le' | 'la' | 'les';
  region: Localized;
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
  quote: {
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
   *   wedding -> { fr: 'mariage' }
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
  author: string;
  summary: Localized;
  content: Localized;
  /** Root-relative cover image path, e.g. '/images/cities/paris.jpg'. */
  cover: string;
  /** Localized alt text for the cover image. */
  coverAlt: Localized;
  /** Topic label emitted as `articleSection` in JSON-LD. */
  section?: Localized;
  /** Q&A block rendered after the body and emitted as a FAQPage node. */
  faqs?: BlogFAQ[];
}

export interface Review {
  id: string;
  name: string;
  citySlug: string;
  cityName: string;
  stars: number;
  date: string;
  text: Localized;
  serviceName: Localized;
}
