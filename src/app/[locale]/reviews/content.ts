import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the reviews page: SERP title and description, plus the
 * long-form passage that closes the page below the review wall.
 *
 * The rating and the review count are interpolated from the catalogue rather
 * than typed out, so a new review cannot leave the copy claiming an old figure.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/**
 * The count stays out of the title and description on purpose: five reviews is
 * a true number and a weak one, and a SERP entry that leads with it argues
 * against itself. The rating carries the claim; the count is on the page.
 */
const TITLE_TEMPLATE: Localized = {
  en: 'Photographer Reviews in France — Rated {rating}/5',
  fr: 'Avis sur nos photographes en France — {rating}/5',
};

const DESCRIPTION_TEMPLATE: Localized = {
  en: 'What couples, families and companies said after their session in France, rated {rating}/5. Every review names the city and the type of shoot it covers.',
  fr: 'Ce que couples, familles et entreprises ont dit après leur séance en France, noté {rating}/5. Chaque avis précise la ville et le type de séance.',
};

function fill(template: Localized, locale: Locale, rating: number, count: number): string {
  return tx(template, locale)
    .replace('{rating}', String(rating))
    .replace('{count}', String(count));
}

export function metaTitle(locale: Locale, rating: number, count: number): string {
  return fill(TITLE_TEMPLATE, locale, rating, count);
}

export function metaDescription(locale: Locale, rating: number, count: number): string {
  return fill(DESCRIPTION_TEMPLATE, locale, rating, count);
}

export const OG_IMAGE_ALT: Localized = {
  en: 'A couple session on the French Riviera, one of the shoots reviewed on this page',
  fr: 'Une séance couple sur la Côte d’Azur, l’une des séances commentées sur cette page',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these reviews', fr: 'À propos de ces avis' } as Localized,
  heading: {
    en: 'Published as written, including the awkward ones',
    fr: 'Publiés tels quels, y compris les moins flatteurs',
  } as Localized,
  paragraphs: {
    en: [
      'Every review on this page comes from someone who booked and paid for a session through the network. We ask once, after the gallery has been delivered, and we publish what comes back — we do not select for flattery, and we do not remove a review because it is critical.',
      'Each one names the city and the type of shoot, because that is what makes a review useful. "Great photographer" tells you nothing; a family session in Marseille in August, or a corporate headshot day for a team of twelve in Lyon, tells you whether the experience resembles the one you are about to book.',
      'Ratings feed the aggregate score shown at the top of the page, and that score is arithmetic rather than editorial: it moves when the reviews move. If a photographer’s work slips, it shows here before it shows anywhere else, which is precisely why the number is published rather than summarised.',
      'If your own session did not go the way it should have, tell us rather than the internet first — the money-back guarantee is not conditional on staying quiet, and a refund and an honest review can perfectly well coexist.',
    ],
    fr: [
      'Chaque avis de cette page provient d’une personne qui a réservé et payé une séance via le réseau. Nous demandons une fois, après la livraison de la galerie, et nous publions ce qui revient — sans trier pour flatter, et sans retirer un avis parce qu’il est critique.',
      'Chacun précise la ville et le type de séance, car c’est ce qui rend un avis utile. « Super photographe » ne dit rien ; une séance famille à Marseille en août, ou une journée de portraits corporate pour une équipe de douze à Lyon, vous dit si l’expérience ressemble à celle que vous vous apprêtez à réserver.',
      'Les notes alimentent le score global affiché en haut de page, et ce score relève de l’arithmétique, pas de l’éditorial : il bouge quand les avis bougent. Si le travail d’un photographe faiblit, cela se voit ici avant ailleurs — raison précise pour laquelle le chiffre est publié plutôt que résumé.',
      'Si votre séance ne s’est pas passée comme elle aurait dû, dites-le-nous avant de le dire à internet : la garantie de remboursement n’est pas conditionnée à votre silence, et un remboursement et un avis honnête peuvent parfaitement coexister.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Average rating', value: '{rating}/5' },
      { label: 'Reviews published', value: '{count}' },
      { label: 'Removed for criticism', value: '0' },
      { label: 'Money-back guarantee', value: '100%' },
    ],
    fr: [
      { label: 'Note moyenne', value: '{rating}/5' },
      { label: 'Avis publiés', value: '{count}' },
      { label: 'Retirés pour critique', value: '0' },
      { label: 'Garantie remboursement', value: '100 %' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;

/** SEO_PROSE facts with the live rating and review count substituted in. */
export function seoFacts(locale: Locale, rating: number, count: number) {
  return tx(SEO_PROSE.facts, locale).map((fact) => ({
    ...fact,
    value: fact.value.replace('{rating}', String(rating)).replace('{count}', String(count)),
  }));
}
