import type { Metadata } from 'next';
import type { Locale } from './locales';
import { PUBLIC_IMAGES } from './data/public-images';
import { SITE_NAME, SITE_URL } from './site';
import {
  absoluteUrl,
  languageAlternates,
  localizedPaths,
  ALL_LOCALES_NO_PARAMS,
  type AlternateParams,
} from './urls';
import type { AppPathname } from '@/i18n/pathnames';
import { clampTitle, clampDescription, TITLE_MAX } from './seo-text';
import {
  absoluteOgImage,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
} from './images';

export const metadataBase = new URL(SITE_URL);

/**
 * The set of shipped images, for an O(1) membership test.
 *
 * This used to be an `existsSync` against `public/`, which guarded correctly
 * during the build and then quietly answered "no" for every page rendered on
 * demand, because a Cloudflare Worker has no filesystem — putting the brand
 * default on pages that had a real photograph. The manifest is generated at
 * build time by `scripts/generate-public-images.ts`, so the answer is the same
 * wherever the page renders.
 */
const PUBLIC_IMAGE_SET = new Set(PUBLIC_IMAGES);

/**
 * Return `relPath` if that image ships with the site, otherwise the branded
 * default — guards against an `og:image` that 404s for the slugs with no
 * photograph yet.
 */
function resolvePublicImage(relPath: string, fallback: string = DEFAULT_OG_IMAGE): string {
  const normalized = relPath.startsWith('/') ? relPath : `/${relPath}`;
  return PUBLIC_IMAGE_SET.has(normalized) ? relPath : fallback;
}

/** Brand suffix the layout's `%s | Ylala` template appends to non-absolute titles. */
const BRAND_SUFFIX = ` | ${SITE_NAME}`;

export interface BuildMetadataInput {
  locale: Locale;
  /** Route key from the pathnames table, e.g. "/services/[service]/[city]". */
  route: AppPathname;
  /**
   * Which locales this page exists in, and the params it takes in each.
   * Omit for static routes that exist everywhere and take no params.
   */
  alternates?: AlternateParams;
  title: string;
  description: string;
  /** Root-relative or absolute OG image path. Falls back to the branded default. */
  ogImage?: string;
  /** Alt text for the OG/Twitter image; defaults to the page title. */
  ogImageAlt?: string;
  /** Open Graph type. Articles must say so; everything else is a website. */
  ogType?: 'website' | 'article';
  /**
   * Keep the page crawlable and link-equity-passing, but out of the index.
   * Used by the long-tail service x city pages that have no authored copy.
   */
  noindex?: boolean;
}

/**
 * Build a complete Next.js Metadata object with canonical URL, hreflang
 * alternates (5 locales + x-default), Open Graph and Twitter cards.
 *
 * Centralises two SERP guardrails so no page can regress them:
 * - title clamped to ≤60 chars (brand preserved), description to ≤160.
 * - a real `og:image` is always emitted (the page photo when present, else the
 *   branded default), with matching Twitter card.
 */
export function buildMetadata({
  locale,
  route,
  alternates = ALL_LOCALES_NO_PARAMS,
  title,
  description,
  ogImage,
  ogImageAlt,
  ogType = 'website',
  noindex = false,
}: BuildMetadataInput): Metadata {
  const selfParams = alternates[locale];
  if (selfParams === undefined) {
    // The caller is rendering a page in a locale it claims not to exist in.
    // Serving it anyway would put the same content under two URLs with no
    // canonical relationship between them.
    throw new Error(`buildMetadata: route "${route}" is not available in locale "${locale}"`);
  }

  const canonical = absoluteUrl(locale, route, selfParams);
  const clampedDescription = clampDescription(description);
  // A noindex page is excluded from the index, so an hreflang cluster pointing
  // at it is discarded anyway; emitting one only adds Search Console noise.
  const languages = noindex ? undefined : languageAlternates(route, alternates);

  // The same information again, for the language switcher rather than for
  // crawlers: relative, and present even when hreflang is withheld. Without it
  // the switcher has to guess the other locale's URL, and with translated slugs
  // it guesses wrong — /services/portrait/paris would switch to a French prefix
  // still carrying the English slug, which 404s.
  const switcherAlternates = Object.fromEntries(
    Object.entries(localizedPaths(route, alternates)).map(([l, path]) => [`ylala-alt-${l}`, path]),
  );

  // Two title shapes: brand already inside (absolute) vs. layout will append it.
  const hasBrand = title.includes(SITE_NAME);
  const clampedTitle = hasBrand
    ? clampTitle(title, { brand: SITE_NAME, max: TITLE_MAX })
    : clampTitle(title, { brandSuffixLen: BRAND_SUFFIX.length, max: TITLE_MAX });
  // What Next sets as <title>: absolute when brand is baked in, else let the
  // layout template add " | Ylala".
  const resolvedTitle = hasBrand ? { absolute: clampedTitle } : clampedTitle;
  // Full branded title for OG/Twitter (the template doesn't apply to these).
  const ogTitle = hasBrand ? clampedTitle : `${clampedTitle}${BRAND_SUFFIX}`;

  // Always emit a reachable og:image: the page photo if the file exists, else default.
  const relImage = ogImage ? resolvePublicImage(ogImage) : DEFAULT_OG_IMAGE;
  const isDefaultImage = relImage === DEFAULT_OG_IMAGE;
  const imageUrl = absoluteOgImage(relImage);
  const imageAlt = ogImageAlt ?? ogTitle;
  const ogImages = [
    {
      url: imageUrl,
      alt: imageAlt,
      // Dimensions are only known for the branded default; omit for photos.
      ...(isDefaultImage ? { width: DEFAULT_OG_IMAGE_WIDTH, height: DEFAULT_OG_IMAGE_HEIGHT } : {}),
    },
  ];

  return {
    metadataBase,
    title: resolvedTitle,
    description: clampedDescription,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    other: switcherAlternates,
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
    openGraph: {
      type: ogType,
      url: canonical,
      title: ogTitle,
      description: clampedDescription,
      siteName: SITE_NAME,
      locale,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: clampedDescription,
      images: [imageUrl],
    },
  };
}
