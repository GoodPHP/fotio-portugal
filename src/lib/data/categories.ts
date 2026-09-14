import type { ServiceCategory } from '../types';

/** Group headings for the service listings. */
export const CATEGORY_LABELS: Record<'en' | 'fr', Record<ServiceCategory, string>> = {
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
