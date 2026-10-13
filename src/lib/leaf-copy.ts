import type { Service } from './types';
import type { Locale } from './locales';
import { formatDelivery, formatDuration, formatPhotoCount, formatPrice } from './site';
import { LEAF_COPY } from './data/leaf-copy';

/**
 * Authored copy for one `service × city` page in one language.
 *
 * Written per pairing, not composed: two pages that share a city or a service
 * may share facts, never sentences. `scripts/check-leaf-copy.ts` measures that
 * and fails the build when a page drops under 70% unique.
 *
 * Figures that live in the catalogue — price, duration, photograph count,
 * delivery — are never typed into the copy. They are written as tokens
 * (`{price}`, `{duration}`, `{photos}`, `{delivery}`) and filled from
 * `services.ts` at render, so a price change cannot leave four hundred pages
 * quoting the old one.
 */
export interface LeafCopy {
  /** The brand is appended by the layout. ≤52 characters after tokens. */
  title: string;
  /** 130–160 characters after tokens. */
  description: string;
  /** Why this session in this place — the reason the pairing works. */
  intro: string;
  /** Which of the place's spots suit this session, and why those. */
  where: string;
  /** The hour and the season for this session here. */
  when: string;
  /** Three questions people ask before booking this session here. */
  faqs: readonly LeafFaq[];
}

export interface LeafFaq {
  question: string;
  answer: string;
}

const TOKENS: Record<string, (service: Service, locale: Locale) => string> = {
  '{price}': (service, locale) => formatPrice(service.initialPrice, locale),
  '{duration}': (service, locale) => formatDuration(service.durationMinutes, locale),
  '{photos}': (service) => formatPhotoCount(service),
  '{delivery}': (service, locale) => formatDelivery(service.deliveryHours, locale),
};

const TOKEN_PATTERN = /\{[a-z]+\}/g;

/** Replace catalogue tokens with this service's figures, formatted for `locale`. */
export function fillLeafTokens(text: string, service: Service, locale: Locale): string {
  return text.replace(TOKEN_PATTERN, (token) => TOKENS[token]?.(service, locale) ?? token);
}

/** Tokens in `text` that `fillLeafTokens` would leave in place. */
export function unknownLeafTokens(text: string): string[] {
  return [...text.matchAll(TOKEN_PATTERN)].map((m) => m[0]).filter((token) => !(token in TOKENS));
}

export function leafCopyKey(serviceId: string, citySlug: string): string {
  return `${serviceId}--${citySlug}`;
}

/** The authored copy for this pairing in `locale`, with tokens filled. */
export function getLeafCopy(service: Service, citySlug: string, locale: Locale): LeafCopy | undefined {
  const raw = LEAF_COPY[locale][leafCopyKey(service.slug, citySlug)];
  if (!raw) return undefined;
  const fill = (text: string) => fillLeafTokens(text, service, locale);
  return {
    title: fill(raw.title),
    description: fill(raw.description),
    intro: fill(raw.intro),
    where: fill(raw.where),
    when: fill(raw.when),
    faqs: raw.faqs.map((faq) => ({ question: fill(faq.question), answer: fill(faq.answer) })),
  };
}

/** Whether this pairing has authored copy in `locale`, which is what makes it indexable. */
export function hasLeafCopy(serviceId: string, citySlug: string, locale: Locale): boolean {
  return Boolean(LEAF_COPY[locale][leafCopyKey(serviceId, citySlug)]);
}
