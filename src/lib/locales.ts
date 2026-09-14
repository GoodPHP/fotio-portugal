export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * A localized value. English is required — it is the authored source of truth
 * and the default locale. Every other locale is optional and falls back to it.
 */
export type Localized<T = string> = { en: T } & Partial<Record<Locale, T>>;

/**
 * Resolve a localized value for a locale, falling back to English when that
 * locale has no authored value.
 */
export function tx<T>(field: Localized<T>, locale: Locale): T {
  return field[locale] ?? field.en;
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
