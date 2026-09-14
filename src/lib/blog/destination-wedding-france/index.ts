import type { BlogPost } from '../../types';
import type { Locale } from '../../locales';
import type { ArticleLocale } from '../types';
import { en } from './en';
import { fr } from './fr';

const CONTENT: Record<Locale, ArticleLocale> = { en, fr };

/** Fold one field of every locale file into a `Localized` value. */
function localized<T>(pick: (content: ArticleLocale) => T) {
  return {
    en: pick(CONTENT.en),
    fr: pick(CONTENT.fr),
  };
}

/**
 * FAQs keyed by position: every locale file lists the same questions in the
 * same order. A locale missing an entry falls back to the English source, so a
 * partial translation can never produce an empty Q&A.
 */
const faqs = en.faqs.map((_, i) => ({
  question: localized((c) => (c.faqs[i] ?? en.faqs[i]).question),
  answer: localized((c) => (c.faqs[i] ?? en.faqs[i]).answer),
}));

/**
 * Pillar article on marrying in France — the hub the wedding money pages
 * (/services/wedding, /services/elopement, the destination city pages) link
 * out from and back to.
 */
export const DESTINATION_WEDDING_FRANCE: BlogPost = {
  slug: 'getting-married-in-france',
  date: '2026-09-08',
  readTime: '14 min',
  author: 'Camille Aubert',
  cover: '/images/services/wedding.jpg',
  title: localized((c) => c.title),
  summary: localized((c) => c.summary),
  coverAlt: localized((c) => c.coverAlt),
  section: localized((c) => c.section),
  content: localized((c) => c.body),
  faqs,
};
