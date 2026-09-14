import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the blog index: SERP title and description, plus the
 * long-form passage that closes the page below the article list.
 *
 * The article count is interpolated from the catalogue rather than typed out,
 * so publishing a post cannot leave the copy claiming an old figure.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'France Photography Guides — Spots, Permits, Seasons',
  pt: 'PT_TODO: France Photography Guides — Spots, Permits, Seasons',
};

const DESCRIPTION_TEMPLATE: Localized = {
  en: '{count} guides from photographers who work these cities weekly: Paris spots, permit rules, Provence lavender dates, Mont-Saint-Michel tides, what to wear.',
  pt: 'PT_TODO: {count} guides from photographers who work these cities week',
};

export function metaDescription(locale: Locale, postCount: number): string {
  return tx(DESCRIPTION_TEMPLATE, locale).replace('{count}', String(postCount));
}

export const OG_IMAGE_ALT: Localized = {
  en: 'Paris photographed at the hour our guides recommend, from the Ylala photography guides',
  pt: 'PT_TODO: Paris photographed at the hour our guides recommend, from th',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these guides', pt: 'PT_TODO: About these guides' } as Localized,
  heading: {
    en: 'Written by the people who shoot these places',
    pt: 'PT_TODO: Written by the people who shoot these places',
  } as Localized,
  paragraphs: {
    en: [
      'These are working notes rather than travel writing. Each guide is written by a photographer in the network who shoots the city or the subject it covers, and the questions they answer are the ones clients actually ask before a session: which hour a location is still empty, what a permit costs and whether you need one, what the weather does to a plan in February.',
      'Several of them save real money. Photography rules in France vary by site and by commune — some châteaux and museums require written authorisation, drone work is restricted almost everywhere, and a commercial shoot on public land is not the same permission as a private one. Reading that before you book beats discovering it on the morning of the shoot.',
      'Others are about timing, which is the thing people most often get wrong. Provence lavender has a window of a few weeks and it moves year to year. The tide decides what Mont-Saint-Michel looks like more than the forecast does. The Riviera in September is a different photograph from the Riviera in July, and quite a different crowd.',
      'The practical guides — what to wear, what to expect from a corporate headshot day, what a château venue decides for you — are there because the same questions arrive in almost every enquiry. If yours is not answered here, ask us directly; the answer usually turns into the next article.',
    ],
    pt: [
    'PT_TODO: These are working notes rather than travel writing. Each gui',
    'PT_TODO: Several of them save real money. Photography rules in France',
    'PT_TODO: Others are about timing, which is the thing people most ofte',
    'PT_TODO: The practical guides — what to wear, what to expect from a c',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Guides published', value: '{count}' },
      { label: 'Written by', value: 'Network photographers' },
      { label: 'Cities covered', value: '12' },
      { label: 'Sponsored posts', value: 'None' },
    ],
    pt: [
      { label: 'Guias publicados', value: '{count}' },
      { label: 'Escritos por', value: 'Fotógrafos da rede' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Artigos patrocinados', value: 'Nenhum' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;

/** SEO_PROSE facts with the live article count substituted in. */
export function seoFacts(locale: Locale, postCount: number) {
  return tx(SEO_PROSE.facts, locale).map((fact) => ({
    ...fact,
    value: fact.value.replace('{count}', String(postCount)),
  }));
}
