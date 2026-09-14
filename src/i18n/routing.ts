import { defineRouting } from 'next-intl/routing';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/locales';
import { pathnames } from './pathnames';

export { LOCALES, DEFAULT_LOCALE };

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // English (default) serves at "/...", French at "/fr/...".
  localePrefix: 'as-needed',
  pathnames,
  // The middleware would otherwise advertise every configured locale in a
  // `Link:` response header on every request. It cannot know that a service
  // exists in only one language, or that a long-tail page is noindex, so those
  // headers would contradict the <head> we emit. Alternates are built per page
  // in `languageAlternates`, where that knowledge lives.
  alternateLinks: false,
});
