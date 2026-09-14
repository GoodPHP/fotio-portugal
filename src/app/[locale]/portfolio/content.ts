import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the portfolio: SERP title and description, plus the
 * long-form passage that sits between the gallery and the reviews.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Photography Portfolio — Real Sessions in France',
  pt: 'PT_TODO: Photography Portfolio — Real Sessions in France',
};

/**
 * The photograph count is read off the filesystem, so it is interpolated rather
 * than typed out: a folder gains images and the description follows it.
 */
const DESCRIPTION_TEMPLATE: Localized = {
  en: 'Browse {count} photographs from real sessions across 22 French cities — weddings, portraits, families, corporate. Filter by category and book the same shoot.',
  pt: 'PT_TODO: Browse {count} photographs from real sessions across 22 Fren',
};

export function metaDescription(locale: Locale, photoCount: number): string {
  return tx(DESCRIPTION_TEMPLATE, locale).replace('{count}', String(photoCount));
}

export const OG_IMAGE_ALT: Localized = {
  en: 'A frame from the Ylala portfolio — real client sessions photographed across France',
  pt: 'PT_TODO: A frame from the Ylala portfolio — real client sessions phot',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About this gallery', pt: 'PT_TODO: About this gallery' } as Localized,
  heading: {
    en: 'Work from the network, not a stock library',
    pt: 'PT_TODO: Work from the network, not a stock library',
  } as Localized,
  paragraphs: {
    en: [
      'Everything above comes from sessions the network actually shot: client work across twenty-two French cities and destinations, grouped by the category it was booked under. Filter by portrait, couple, family, wedding, travel, business, commercial or fashion, and tap any frame to open it full screen.',
      'The gallery is worth reading as a price list in pictures. The look you see is the look the fee buys — the same photographers, the same editing, the same delivery. Colour work is deliberately restrained: skin stays skin, and a Provence afternoon is allowed to look like one. We do not composite skies, slim faces or move people between frames, and nothing here has been retouched beyond what a client received.',
      'It is also the fastest way to brief a session. Most people arrive knowing the occasion but not the treatment, and pointing at three photographs settles more than a paragraph of description will. Note what you like — the hour, the light, how close the camera sits, whether the frame is posed or caught — and send it with your enquiry. The photographer will tell you what it takes to get there in your city, and whether the location works at the time you had in mind.',
      'Every session shown was booked at a fixed price agreed in writing, and delivered as a private online gallery within forty-eight to seventy-two hours.',
    ],
    pt: [
    'PT_TODO: Everything above comes from sessions the network actually sh',
    'PT_TODO: The gallery is worth reading as a price list in pictures. Th',
    'PT_TODO: It is also the fastest way to brief a session. Most people a',
    'PT_TODO: Every session shown was booked at a fixed price agreed in wr',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Photographs shown', value: '{count}' },
      { label: 'Categories', value: '9' },
      { label: 'Cities covered', value: '12' },
      { label: 'Photo credits', value: 'Published' },
    ],
    pt: [
      { label: 'Fotografias mostradas', value: '{count}' },
      { label: 'Categorias', value: '9' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Créditos das fotos', value: 'Publicados' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;

/** SEO_PROSE facts with the live photograph count substituted in. */
export function seoFacts(locale: Locale, photoCount: number) {
  return tx(SEO_PROSE.facts, locale).map((fact) => ({
    ...fact,
    value: fact.value.replace('{count}', String(photoCount)),
  }));
}
