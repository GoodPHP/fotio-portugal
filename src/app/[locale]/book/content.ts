import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the booking page: SERP title and description, plus the
 * long-form passage that closes the page below the booking widget.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends " | Ylala". */
export const META_TITLE: Localized = {
  en: 'Book a Photo Session in France — Free Quote',
  fr: 'Réserver une séance photo en France — devis gratuit',
};

export const META_DESCRIPTION: Localized = {
  en: 'Pick a city, a session and a date, and get a fixed price on WhatsApp in minutes. No deposit to request a quote, and nothing is charged until you confirm.',
  fr: 'Choisissez une ville, une séance et une date : prix fixe sur WhatsApp en quelques minutes. Aucun acompte pour un devis, rien n’est facturé avant confirmation.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A surprise proposal session in Paris, one of the shoots you can book through Ylala',
  fr: 'Une demande en mariage surprise à Paris, l’une des séances réservables via Ylala',
};

export const SEO_PROSE = {
  eyebrow: { en: 'How booking works', fr: 'Comment se passe la réservation' } as Localized,
  heading: {
    en: 'From this form to a confirmed photographer',
    fr: 'De ce formulaire à un photographe confirmé',
  } as Localized,
  paragraphs: {
    en: [
      'The form above collects four things — city, session type, date and group size — and turns them into a quote. You are not booking a slot at this point and nothing is charged: what you get back is a fixed price and the name of the photographer who would take the session, usually within a couple of hours on a working day.',
      'The price you are quoted is the price you pay. It covers the shoot, the editing, and a private online gallery in full resolution delivered within forty-eight to seventy-two hours, with a licence to print and share it. Extra photographs are not billed separately. The only things that change the figure are ones you choose in advance: a longer session, a second photographer, or express twenty-four-hour delivery.',
      'Once you confirm in writing, the photographer takes over the practical side — where to meet, which hour suits the location, whether an authorisation is needed and who obtains it. They live in the city they shoot, so this is settled from experience rather than researched from somewhere else.',
      'If the weather turns, the session moves at no cost. If you need to cancel, tell us as early as you can and we will work with it. And if the gallery is not what you were promised, you are refunded in full — the guarantee is why the quote can afford to be a fixed number rather than an estimate.',
    ],
    fr: [
      'Le formulaire ci-dessus recueille quatre éléments — ville, type de séance, date et nombre de personnes — et les transforme en devis. Vous ne réservez pas encore de créneau et rien n’est facturé : ce qui revient, c’est un prix fixe et le nom du photographe qui prendrait la séance, en général en quelques heures un jour ouvré.',
      'Le prix annoncé est celui que vous payez. Il couvre la séance, la retouche et une galerie privée en pleine résolution livrée sous quarante-huit à soixante-douze heures, avec le droit de l’imprimer et de la partager. Les photos supplémentaires ne sont pas facturées à part. Seuls font varier le montant des choix faits à l’avance : séance plus longue, second photographe, ou livraison express en vingt-quatre heures.',
      'Une fois la confirmation écrite, le photographe prend le relais sur la logistique — où se retrouver, quelle heure convient au lieu, s’il faut une autorisation et qui l’obtient. Il habite la ville qu’il photographie : cela se règle par expérience plutôt que par recherche à distance.',
      'Si le temps tourne, la séance est déplacée sans frais. Si vous devez annuler, prévenez-nous au plus tôt et nous nous adapterons. Et si la galerie n’est pas celle qui vous a été promise, vous êtes remboursé intégralement — cette garantie est ce qui permet au devis d’être un prix ferme plutôt qu’une estimation.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Quote turnaround', value: 'Under 2h' },
      { label: 'Deposit for a quote', value: '€0' },
      { label: 'Gallery delivery', value: '48–72h' },
      { label: 'Weather reschedule', value: 'Free' },
    ],
    fr: [
      { label: 'Devis sous', value: '2 h' },
      { label: 'Acompte pour un devis', value: '0 €' },
      { label: 'Livraison galerie', value: '48–72 h' },
      { label: 'Report météo', value: 'Gratuit' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
