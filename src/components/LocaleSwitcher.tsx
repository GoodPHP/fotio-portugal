'use client';

import { Fragment, useEffect, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import { localizedPath } from '@/lib/urls';

const LOCALE_LABELS: Record<Locale, { short: string; full: string }> = {
  en: { short: 'EN', full: 'English' },
  fr: { short: 'FR', full: 'Français' },
};

/** Where this page lives in `locale`, as published by `buildMetadata`. */
function publishedPath(locale: Locale): string | null {
  if (typeof document === 'undefined') return null;
  const content = document.querySelector<HTMLMetaElement>(
    `meta[name="ylala-alt-${locale}"]`,
  )?.content;
  return content && content.startsWith('/') ? content : null;
}

/**
 * Both languages, side by side, the current one marked.
 *
 * This was a dropdown, which for two options cost a click to discover what it
 * held and rendered as an unstyled select. With two languages there is nothing
 * to hide: showing both is smaller, needs no menu, and makes the switch one
 * click instead of two.
 *
 * The destination is read from the page rather than derived. Slugs are
 * translated — /services/wedding/paris is /fr/photographe/mariage/paris — and
 * "mariage" cannot be computed on the client without shipping the catalogue to
 * it. A page that publishes no path for a language does not exist in that
 * language, and the switcher says so instead of offering a dead link.
 */
export default function LocaleSwitcher() {
  const params = useParams();
  const current = (params.locale as Locale) ?? DEFAULT_LOCALE;
  const [isPending, startTransition] = useTransition();

  // Read after mount, not during render: the server cannot know what the
  // client's DOM says, and disagreeing with it would be a hydration mismatch.
  // Until then every language is offered, which is what the server rendered.
  const [unavailable, setUnavailable] = useState<readonly Locale[]>([]);
  useEffect(() => {
    const published = LOCALES.filter((locale) => publishedPath(locale) !== null);
    // A page that publishes nothing at all — the 404, say — is not evidence
    // that any language is missing.
    setUnavailable(published.length === 0 ? [] : LOCALES.filter((l) => !published.includes(l)));
  }, []);

  function selectLocale(next: Locale) {
    if (next === current) return;
    startTransition(() => {
      // Falls back to that language's home page, which always exists, rather
      // than to a guess at this page's address.
      const path = publishedPath(next) ?? localizedPath(next, '/');
      // The middleware negotiates locale from NEXT_LOCALE, and a plain
      // navigation does not touch it. Without this the cookie still names the
      // old language and the request is redirected straight back — so once you
      // switched to French you could never switch out of it.
      document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
      window.location.assign(path);
    });
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
    >
      {LOCALES.map((locale, i) => {
        const { short, full } = LOCALE_LABELS[locale];
        return (
          <Fragment key={locale}>
            {i > 0 && (
              <span aria-hidden="true" className="text-brand-rule-strong">
                /
              </span>
            )}
            {locale === current ? (
              <span aria-current="true" className="text-brand-dark">
                {short}
              </span>
            ) : unavailable.includes(locale) ? (
              <span aria-disabled="true" className="text-brand-rule-strong">
                {short}
                <span className="sr-only"> — {full} is not available for this page</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => selectLocale(locale)}
                disabled={isPending}
                lang={locale}
                aria-label={full}
                className="text-brand-muted transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep disabled:opacity-50"
              >
                {short}
              </button>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
