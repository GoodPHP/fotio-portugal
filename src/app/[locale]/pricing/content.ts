import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the pricing page: SERP title and description, plus the
 * long-form passage that closes the page below the price table.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends " | Ylala". */
export const META_TITLE: Localized = {
  en: 'Photo Session Prices in France — From €150',
  fr: 'Tarifs séance photo en France — dès 150 €',
};

export const META_DESCRIPTION: Localized = {
  en: 'What a photographer costs in France: from €150 for a portrait to €2,200 for a wedding day. Editing and a private gallery included, no hidden extras.',
  fr: 'Ce que coûte un photographe en France : de 150 € pour un portrait à 2 200 € pour un mariage. Retouche et galerie privée comprises, sans frais cachés.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A family session photographed by the Ylala network, priced from a fixed published rate',
  fr: 'Une séance famille photographiée par le réseau Ylala, à un tarif fixe publié',
};

export const SEO_PROSE = {
  eyebrow: { en: 'How pricing works', fr: 'Comment fonctionnent nos tarifs' } as Localized,
  heading: {
    en: 'What the number covers, and what moves it',
    fr: 'Ce que le prix couvre, et ce qui le fait bouger',
  } as Localized,
  paragraphs: {
    en: [
      'Every figure in the table is a starting price for that session type, and it is the same in all twenty-two cities: a portrait in Lille costs what a portrait in Nice costs. Prices run from €150 for a short portrait or a surprise proposal to €2,200 for a full wedding day, with couples, families, maternity and corporate work in between.',
      'The price covers the photographer’s time on the shoot, the selection, the colour and light editing, and a private online gallery in full resolution with a personal licence to print and share. There is no charge per additional photograph, no retouching sold as an upgrade, and no travel supplement inside the city you booked.',
      'Three things move the number, and all three are agreed before the shoot rather than after it. Length: a session run at one-and-a-half or two times the standard duration is priced accordingly. A second photographer, which most full wedding days want and few other sessions need. And express delivery, if you need the gallery in twenty-four hours rather than the usual forty-eight to seventy-two.',
      'What does not move it is anything discovered on the day. If a location turns out to need a paid authorisation, we say so when you book, not when you arrive. Enquiring costs nothing and requires no deposit, the quote is confirmed in writing, and if you are not satisfied with the work you are refunded in full.',
    ],
    fr: [
      'Chaque montant du tableau est un prix de départ pour ce type de séance, identique dans les vingt-deux villes : un portrait à Lille coûte ce que coûte un portrait à Nice. Les tarifs vont de 150 € pour un portrait court ou une demande en mariage à 2 200 € pour une journée de mariage complète, avec le couple, la famille, la grossesse et le corporate entre les deux.',
      'Le prix couvre le temps du photographe sur la séance, la sélection, le travail de lumière et de couleur, et une galerie privée en pleine résolution assortie d’une licence personnelle d’impression et de partage. Aucune photo supplémentaire n’est facturée, aucune retouche n’est vendue en supplément, et aucun frais de déplacement ne s’ajoute dans la ville réservée.',
      'Trois éléments font varier le montant, et tous les trois sont convenus avant la séance, pas après. La durée : une séance menée sur une fois et demie ou deux fois la durée standard est facturée en conséquence. Un second photographe, que réclament la plupart des journées de mariage et peu d’autres séances. Et la livraison express, si vous voulez la galerie en vingt-quatre heures plutôt qu’en quarante-huit à soixante-douze.',
      'Ce qui ne le fait pas varier, c’est ce que l’on découvrirait le jour même. Si un lieu exige une autorisation payante, nous le disons à la réservation, pas à l’arrivée. La demande est gratuite et sans acompte, le devis est confirmé par écrit, et si le travail ne vous satisfait pas, vous êtes remboursé intégralement.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'From', value: '€150' },
      { label: 'Full wedding day', value: '€2,200' },
      { label: 'Per extra photo', value: '€0' },
      { label: 'Deposit to enquire', value: '€0' },
    ],
    fr: [
      { label: 'À partir de', value: '150 €' },
      { label: 'Journée de mariage', value: '2 200 €' },
      { label: 'Photo supplémentaire', value: '0 €' },
      { label: 'Acompte pour un devis', value: '0 €' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
