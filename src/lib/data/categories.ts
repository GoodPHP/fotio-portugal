import type { Locale } from '../locales';
import type { ServiceCategory } from '../types';

/**
 * Group headings for the service listings.
 *
 * Keyed on `Locale` rather than on a literal union of language codes. The
 * difference matters: with a literal union, adding a locale leaves this table
 * behind silently, `getCategoryLabel` reads `undefined` and every listing falls
 * back to English headings forever. Keyed on `Locale`, the compiler names this
 * file the moment a locale is added.
 */
export const CATEGORY_LABELS: Record<Locale, Record<ServiceCategory, string>> = {
  en: {
    individual: 'Portrait & personal',
    couples: 'Couples & love story',
    family: 'Family',
    wedding: 'Weddings & elopements',
    vacation: 'Travel & holidays',
    business: 'Business & corporate',
    blog: 'Creators & influencers',
    commercial: 'Commercial & food',
    fashion: 'Fashion & lookbook',
    other: 'Everything else',
  },
  fr: {
    individual: 'Portrait & personnel',
    couples: 'Couples & love story',
    family: 'Famille',
    wedding: 'Mariages & elopements',
    vacation: 'Voyage & vacances',
    business: 'Business & corporate',
    blog: 'Créateurs & influenceurs',
    commercial: 'Commercial & culinaire',
    fashion: 'Mode & lookbook',
    other: 'Autres prestations',
  },
};
