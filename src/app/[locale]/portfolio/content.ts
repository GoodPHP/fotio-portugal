import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the portfolio: SERP title and description, plus the
 * long-form passage that sits between the gallery and the reviews.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends " | Ylala". */
export const META_TITLE: Localized = {
  en: 'Photography Portfolio — Real Sessions in France',
  fr: 'Portfolio photo — séances réelles en France',
};

/**
 * The photograph count is read off the filesystem, so it is interpolated rather
 * than typed out: a folder gains images and the description follows it.
 */
const DESCRIPTION_TEMPLATE: Localized = {
  en: 'Browse {count} photographs from real sessions across 22 French cities — weddings, portraits, families, corporate. Filter by category and book the same shoot.',
  fr: '{count} photographies de séances réelles dans 22 villes françaises — mariage, portrait, famille, corporate. Filtrez par catégorie et réservez la même séance.',
};

export function metaDescription(locale: Locale, photoCount: number): string {
  return tx(DESCRIPTION_TEMPLATE, locale).replace('{count}', String(photoCount));
}

export const OG_IMAGE_ALT: Localized = {
  en: 'A frame from the Ylala portfolio — real client sessions photographed across France',
  fr: 'Une image du portfolio Ylala — séances clients réelles photographiées en France',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About this gallery', fr: 'À propos de cette galerie' } as Localized,
  heading: {
    en: 'Work from the network, not a stock library',
    fr: 'Le travail du réseau, pas une banque d’images',
  } as Localized,
  paragraphs: {
    en: [
      'Everything above comes from sessions the network actually shot: client work across twenty-two French cities and destinations, grouped by the category it was booked under. Filter by portrait, couple, family, wedding, travel, business, commercial or fashion, and tap any frame to open it full screen.',
      'The gallery is worth reading as a price list in pictures. The look you see is the look the fee buys — the same photographers, the same editing, the same delivery. Colour work is deliberately restrained: skin stays skin, and a Provence afternoon is allowed to look like one. We do not composite skies, slim faces or move people between frames, and nothing here has been retouched beyond what a client received.',
      'It is also the fastest way to brief a session. Most people arrive knowing the occasion but not the treatment, and pointing at three photographs settles more than a paragraph of description will. Note what you like — the hour, the light, how close the camera sits, whether the frame is posed or caught — and send it with your enquiry. The photographer will tell you what it takes to get there in your city, and whether the location works at the time you had in mind.',
      'Every session shown was booked at a fixed price agreed in writing, and delivered as a private online gallery within forty-eight to seventy-two hours.',
    ],
    fr: [
      'Tout ce qui précède provient de séances réellement photographiées par le réseau : des commandes clients dans vingt-deux villes et destinations françaises, regroupées par la catégorie sous laquelle elles ont été réservées. Filtrez par portrait, couple, famille, mariage, voyage, entreprise, commercial ou mode, et touchez une image pour l’ouvrir en plein écran.',
      'Cette galerie se lit comme une grille tarifaire en images. Le rendu que vous voyez est celui que le tarif achète — mêmes photographes, même retouche, même livraison. L’étalonnage est volontairement sobre : la peau reste de la peau, et un après-midi provençal a le droit d’en avoir l’air. Nous ne remplaçons pas les ciels, n’affinons pas les visages et ne déplaçons personne d’une image à l’autre ; rien ici n’a été retouché au-delà de ce qu’un client a reçu.',
      'C’est aussi la façon la plus rapide de préparer une séance. La plupart des gens connaissent l’occasion mais pas le traitement, et montrer trois photographies règle plus de questions qu’un paragraphe de description. Relevez ce qui vous plaît — l’heure, la lumière, la distance de l’appareil, l’image posée ou saisie — et joignez-le à votre demande. Le photographe vous dira ce qu’il faut pour y parvenir dans votre ville, et si le lieu tient à l’heure envisagée.',
      'Chaque séance présentée a été réservée à un prix fixé par écrit et livrée en galerie privée sous quarante-huit à soixante-douze heures.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Photographs shown', value: '{count}' },
      { label: 'Categories', value: '9' },
      { label: 'Cities covered', value: '22' },
      { label: 'Stock imagery', value: 'None' },
    ],
    fr: [
      { label: 'Photographies', value: '{count}' },
      { label: 'Catégories', value: '9' },
      { label: 'Villes couvertes', value: '22' },
      { label: 'Images de banque', value: 'Aucune' },
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
