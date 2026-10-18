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
  // The URL alone decides the language. With detection on, a visitor whose
  // browser asks for Portuguese — or who once opened a /pt page and so carries
  // the NEXT_LOCALE cookie — is 307-redirected from every English URL to the
  // /pt prefix with the English slug still in it: /services/wedding/lisboa
  // became /pt/fotografo/wedding/lisboa, which 404s, and English-only services
  // have no Portuguese page to land on at all. Google also advises against
  // redirecting on Accept-Language; hreflang and the language switcher are
  // how a reader reaches the other version.
  localeDetection: false,
});
