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

/** ≤60 chars once the layout appends " | Ylala". */
export const META_TITLE: Localized = {
  en: 'France Photography Guides — Spots, Permits, Seasons',
  fr: 'Guides photo France — lieux, autorisations, saisons',
};

const DESCRIPTION_TEMPLATE: Localized = {
  en: '{count} guides from photographers who work these cities weekly: Paris spots, permit rules, Provence lavender dates, Mont-Saint-Michel tides, what to wear.',
  fr: '{count} guides de photographes qui travaillent ces villes chaque semaine : lieux parisiens, autorisations, lavande en Provence, marées, quoi porter.',
};

export function metaDescription(locale: Locale, postCount: number): string {
  return tx(DESCRIPTION_TEMPLATE, locale).replace('{count}', String(postCount));
}

export const OG_IMAGE_ALT: Localized = {
  en: 'Paris photographed at the hour our guides recommend, from the Ylala photography guides',
  fr: 'Paris photographiée à l’heure recommandée par nos guides photo Ylala',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these guides', fr: 'À propos de ces guides' } as Localized,
  heading: {
    en: 'Written by the people who shoot these places',
    fr: 'Écrits par ceux qui photographient ces lieux',
  } as Localized,
  paragraphs: {
    en: [
      'These are working notes rather than travel writing. Each guide is written by a photographer in the network who shoots the city or the subject it covers, and the questions they answer are the ones clients actually ask before a session: which hour a location is still empty, what a permit costs and whether you need one, what the weather does to a plan in February.',
      'Several of them save real money. Photography rules in France vary by site and by commune — some châteaux and museums require written authorisation, drone work is restricted almost everywhere, and a commercial shoot on public land is not the same permission as a private one. Reading that before you book beats discovering it on the morning of the shoot.',
      'Others are about timing, which is the thing people most often get wrong. Provence lavender has a window of a few weeks and it moves year to year. The tide decides what Mont-Saint-Michel looks like more than the forecast does. The Riviera in September is a different photograph from the Riviera in July, and quite a different crowd.',
      'The practical guides — what to wear, what to expect from a corporate headshot day, what a château venue decides for you — are there because the same questions arrive in almost every enquiry. If yours is not answered here, ask us directly; the answer usually turns into the next article.',
    ],
    fr: [
      'Ce sont des notes de travail, pas de la littérature de voyage. Chaque guide est écrit par un photographe du réseau qui photographie la ville ou le sujet traité, et répond aux questions que les clients posent réellement avant une séance : à quelle heure un lieu est encore vide, ce que coûte une autorisation et s’il en faut une, ce que février fait à un plan de séance.',
      'Plusieurs font économiser de l’argent. Les règles de prise de vue varient en France selon le site et la commune — certains châteaux et musées exigent une autorisation écrite, le drone est restreint presque partout, et une prise de vue commerciale sur le domaine public n’est pas la même démarche qu’une séance privée. Mieux vaut le lire avant de réserver que le découvrir le matin même.',
      'D’autres portent sur le calendrier, ce que l’on se rate le plus souvent. La lavande de Provence tient sur quelques semaines et se décale d’une année à l’autre. La marée décide de l’allure du Mont-Saint-Michel bien plus que la météo. La Côte d’Azur en septembre n’est pas la même photographie qu’en juillet, ni la même foule.',
      'Les guides pratiques — quoi porter, à quoi ressemble une journée de portraits corporate, ce qu’un château impose — existent parce que les mêmes questions reviennent dans presque chaque demande. Si la vôtre n’a pas sa réponse ici, posez-la : elle devient en général l’article suivant.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Guides published', value: '{count}' },
      { label: 'Written by', value: 'Network photographers' },
      { label: 'Cities covered', value: '22' },
      { label: 'Sponsored posts', value: 'None' },
    ],
    fr: [
      { label: 'Guides publiés', value: '{count}' },
      { label: 'Écrits par', value: 'Nos photographes' },
      { label: 'Villes couvertes', value: '22' },
      { label: 'Articles sponsorisés', value: 'Aucun' },
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
