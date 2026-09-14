import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/locales';
import { Link } from '@/i18n/navigation';
import { SITE_NAME } from '@/lib/site';
import { localizedPath } from '@/lib/urls';
import LocaleSwitcher from './LocaleSwitcher';
import NavActive from './NavActive';

const NAV_LINKS = [
  { href: '/services', key: 'services' },
  { href: '/cities', key: 'cities' },
  { href: '/pricing', key: 'pricing' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/blog', key: 'blog' },
  { href: '/about', key: 'about' },
] as const;

/**
 * The masthead — a server component.
 *
 * It was a client component paying for four things, three of which turned out
 * not to need JavaScript at all:
 *
 * - a scroll listener toggling the background. The header is sticky with a
 *   hairline under it at every position, so the "floating" look it was
 *   protecting had already been designed away; the background is now
 *   unconditional.
 * - `useState` for the mobile menu, now a <details> element. It works with
 *   JavaScript disabled, which the button never did, and it closes on
 *   navigation by itself rather than through an effect watching the pathname.
 * - `useTranslations`, now `getTranslations`. This was the only client-side
 *   consumer of next-intl in the whole tree, so removing it let
 *   NextIntlClientProvider — and the serialized message catalogue it puts in
 *   the RSC payload — come out of the layout as well.
 *
 * What genuinely needs the client is knowing which link is the current page,
 * and that is isolated in <NavActive>, twenty lines that import nothing.
 */
export default async function NavBar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  // Resolved here so the switcher does not have to import the route table.
  // That import was the single largest thing it contributed to the bundle.
  const homeHrefs = Object.fromEntries(
    (['en', 'fr'] as const).map((l) => [l, localizedPath(l, '/')]),
  ) as Record<Locale, string>;

  return (
    /*
      A justified masthead. Wordmark hard left, navigation right-aligned on the
      same baseline, utilities at the far right, and a hairline under all of it
      at every scroll position.
    */
    <header className="sticky top-0 z-40 border-b border-brand-rule bg-brand-sand/92 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[92rem] items-baseline justify-between gap-8 px-6 py-5">
        <Link
          href="/"
          className="group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
          aria-label={`${SITE_NAME} — home`}
        >
          <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-brand-dark transition-colors group-hover:text-brand-orange-deep">
            {SITE_NAME}
          </span>
        </Link>

        {/* Nav and utilities share the right edge, so there is no centre gap. */}
        <div className="flex items-baseline gap-6 lg:gap-9">
          <nav aria-label="Main navigation" className="hidden items-baseline gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-nav={link.href}
                className="nav-link border-b border-transparent py-1 text-sm text-brand-muted transition-colors hover:border-brand-rule-strong hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* A hairline marks where navigation ends and utilities begin. */}
          <span aria-hidden="true" className="hidden self-stretch border-l border-brand-rule lg:block" />

          <div className="flex items-baseline gap-5 sm:gap-6">
            <LocaleSwitcher current={locale} homeHrefs={homeHrefs} />

            {/*
              The action, at every width. It used to be hidden below 640px,
              which left the phone header with nothing to do.
            */}
            <Link
              href="/book"
              className="group flex shrink-0 items-baseline gap-1.5 border-b-2 border-brand-dark pb-1 font-display text-sm font-semibold text-brand-dark transition-colors hover:border-brand-orange-deep hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
            >
              {t('book')}
              <svg
                className="h-3 w-3 self-center transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/*
              The mobile menu. <details> rather than a button and a state hook:
              the browser already owns "a disclosure that opens and closes", it
              works without JavaScript, and a navigation away resets it with no
              effect watching for the route to change.
            */}
            <details className="nav-menu -mb-1 self-center lg:hidden">
              <summary
                aria-label={t('menu')}
                className="cursor-pointer text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    className="nav-menu-closed"
                    d="M4 8h16M4 16h16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    className="nav-menu-open"
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>

              <nav
                aria-label="Mobile navigation"
                className="absolute inset-x-0 top-full border-t border-brand-rule bg-brand-sand"
              >
                <ul className="mx-auto max-w-[92rem] px-6 py-2">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        data-nav={link.href}
                        className="nav-link block border-b border-brand-rule py-3.5 font-display text-lg text-brand-dark transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </div>

      <NavActive />
    </header>
  );
}
