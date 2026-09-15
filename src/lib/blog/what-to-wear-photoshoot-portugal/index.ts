import type { BlogPost } from '../../types';
import type { Locale } from '../../locales';
import type { ArticleLocale } from '../types';
import { en } from './en';
import { pt } from './pt';

const CONTENT: Record<Locale, ArticleLocale> = { en, pt };

function localized<T>(pick: (content: ArticleLocale) => T) {
  return { en: pick(CONTENT.en), pt: pick(CONTENT.pt) };
}

const faqs = en.faqs.map((_, i) => ({
  question: localized((c) => (c.faqs[i] ?? en.faqs[i]).question),
  answer: localized((c) => (c.faqs[i] ?? en.faqs[i]).answer),
}));

/** Wardrobe guide for Portuguese pavements, backgrounds and coastal wind, for outdoor and studio sessions. */
export const WHAT_TO_WEAR_PHOTOSHOOT_PORTUGAL: BlogPost = {
  slug: 'what-to-wear-photoshoot-portugal',
  date: '2026-09-10',
  readTime: '8 min',
  cover: 'services/couple',
  title: localized((c) => c.title),
  summary: localized((c) => c.summary),
  coverAlt: localized((c) => c.coverAlt),
  section: localized((c) => c.section),
  content: localized((c) => c.body),
  faqs,
};
