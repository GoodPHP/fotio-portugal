import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the contact page: SERP title and description, plus the
 * long-form passage that closes the page below the form.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/** ≤60 chars once the layout appends " | Ylala". */
export const META_TITLE: Localized = {
  en: 'Contact a Photographer in France — Reply in 2h',
  fr: 'Contacter un photographe en France — réponse 2 h',
};

export const META_DESCRIPTION: Localized = {
  en: 'Ask about a shoot in any of 22 French cities. Reply within two hours by email or WhatsApp, a written quote, and no deposit to ask the question.',
  fr: 'Posez votre question sur une séance dans 22 villes françaises. Réponse sous deux heures par e-mail ou WhatsApp, devis écrit, sans acompte.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'Lyon, one of the 22 French cities you can enquire about through the Ylala network',
  fr: 'Lyon, l’une des 22 villes françaises sur lesquelles vous pouvez nous interroger',
};

export const SEO_PROSE = {
  eyebrow: { en: 'Before you write', fr: 'Avant d’écrire' } as Localized,
  heading: {
    en: 'What to tell us, and what happens next',
    fr: 'Ce qu’il faut nous dire, et ce qui suit',
  } as Localized,
  paragraphs: {
    en: [
      'Four things get you a real answer instead of a follow-up question: the city, the kind of session, a date or a rough window, and how many people will be in front of the camera. Anything else is useful but optional — a location you have in mind, photographs whose look you like, a time of day that has to work around a ceremony or a toddler’s nap.',
      'What comes back is a written quote with a fixed price, the name of the photographer who would take the session, and their read on what you asked for: whether the location works at that hour, whether it needs an authorisation, and what the alternative is if it does not. If we cannot cover the date, we say so straight away rather than holding the enquiry open.',
      'We reply within two hours during the working day, and WhatsApp is the fastest route if you are already travelling and need an answer between one thing and the next. Nothing in this stage costs anything and nothing commits you: there is no deposit to ask a question, and no charge until a session is confirmed in writing.',
      'For anything outside the standard catalogue — a multi-day assignment, several cities in one trip, a company shoot across offices, or a session for a venue that has its own rules — write rather than use the booking form. Those are quoted individually and are easier to get right in a sentence or two of description.',
    ],
    fr: [
      'Quatre éléments suffisent à obtenir une vraie réponse plutôt qu’une question en retour : la ville, le type de séance, une date ou une période approximative, et le nombre de personnes devant l’objectif. Le reste est utile mais facultatif — un lieu en tête, des photographies dont le rendu vous plaît, une heure imposée par une cérémonie ou la sieste d’un enfant.',
      'Ce qui revient : un devis écrit à prix fixe, le nom du photographe qui prendrait la séance, et son avis sur votre demande — si le lieu fonctionne à cette heure-là, s’il exige une autorisation, et quelle est l’alternative dans le cas contraire. Si nous ne pouvons pas couvrir la date, nous le disons tout de suite plutôt que de laisser la demande ouverte.',
      'Nous répondons sous deux heures en journée, et WhatsApp reste le canal le plus rapide si vous êtes déjà en déplacement et cherchez une réponse entre deux rendez-vous. Rien à ce stade ne coûte quoi que ce soit et rien ne vous engage : aucun acompte pour poser une question, aucun paiement avant qu’une séance ne soit confirmée par écrit.',
      'Pour tout ce qui sort du catalogue standard — mission sur plusieurs jours, plusieurs villes dans un même voyage, prises de vue d’entreprise sur plusieurs sites, ou séance dans un lieu doté de ses propres règles — écrivez-nous plutôt que d’utiliser le formulaire de réservation. Ces demandes sont chiffrées au cas par cas et se traitent mieux en deux phrases de description.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Typical reply', value: 'Under 2h' },
      { label: 'Cities covered', value: '22' },
      { label: 'Deposit to enquire', value: '€0' },
      { label: 'Quote format', value: 'In writing' },
    ],
    fr: [
      { label: 'Réponse type', value: 'Moins de 2 h' },
      { label: 'Villes couvertes', value: '22' },
      { label: 'Acompte pour un devis', value: '0 €' },
      { label: 'Format du devis', value: 'Par écrit' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
