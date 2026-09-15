import { getTranslations } from 'next-intl/server';
import { LOCALES, type Locale } from '@/lib/locales';
import { Link } from '@/i18n/navigation';
import { SITE_NAME } from '@/lib/site';
import { localizedPath } from '@/lib/urls';
import LocaleSwitcher from './LocaleSwitcher';
import NavActive from './NavActive';
import TileMark from './TileMark';

const NAV_LINKS = [
  { href: '/', key: 'home' },
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
    LOCALES.map((l) => [l, localizedPath(l, '/')]),
  ) as Record<Locale, string>;

  return (
    /*
      A justified masthead, hung from a grout line.

      Wordmark hard left behind its tile, navigation right-aligned on the same
      baseline, utilities at the far right, and a hairline under all of it at
      every scroll position. The vertical rules between the three groups are
      the same 1px as the grid below — the header is the first course of the
      wall, not a bar sitting on top of it.
    */
    <header className="sticky top-0 z-40 border-b border-brand-rule bg-brand-sand/92 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[92rem] items-center justify-between gap-8 px-6 py-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
          aria-label={`${SITE_NAME} — home`}
        >
          <TileMark className="h-7 w-7 text-brand-orange-deep transition-colors group-hover:text-brand-dark" />
          {/*
            The wordmark drops below 640px and the tile carries the brand alone.

            All four controls — wordmark, switcher, action, menu button — come
            to more than a 390px viewport, and the one pushed off the right edge
            was the menu button: unreachable, on the width where it is the only
            way to navigate. Something had to give, and the mark is legible on
            its own in a way that half a switcher is not. The full name is still
            announced, through the link's aria-label.
          */}
          <span className="font-display hidden text-[1.375rem] font-bold leading-none tracking-[-0.045em] text-brand-dark transition-colors group-hover:text-brand-orange-deep sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        {/* Nav and utilities share the right edge, so there is no centre gap. */}
        <div className="flex items-center gap-6 lg:gap-8">
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-nav={link.href}
                className="nav-link py-1 text-sm text-brand-muted transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* A grout line marks where navigation ends and utilities begin. */}
          <span aria-hidden="true" className="hidden h-5 self-center border-l border-brand-rule-strong lg:block" />

          <div className="flex items-center gap-4 sm:gap-5">
            <LocaleSwitcher current={locale} homeHrefs={homeHrefs} />

            {/*
              The action, at every width. It used to be hidden below 640px,
              which left the phone header with nothing to do.
            */}
            <Link
              href="/book"
              className="btn btn-primary btn-sm shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              {t('book')}
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
            <details className="nav-menu self-center lg:hidden">
              <summary
                aria-label={t('menu')}
                className="flex h-9 w-9 cursor-pointer items-center justify-center border border-brand-rule-strong text-brand-dark transition-colors hover:border-brand-orange-deep hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    className="nav-menu-closed"
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="square"
                  />
                  <path
                    className="nav-menu-open"
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="square"
                  />
                </svg>
              </summary>

              <nav
                aria-label="Mobile navigation"
                className="absolute inset-x-0 top-full border-y border-brand-rule bg-brand-sand"
              >
                <ul className="mx-auto max-w-[92rem] px-6 py-3">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href} className="border-b border-brand-rule last:border-b-0">
                      <Link
                        href={link.href}
                        data-nav={link.href}
                        className="nav-link block py-3.5 pl-5 font-display text-lg font-semibold text-brand-dark transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* The panel is closed by a frieze, so it ends on the motif. */}
                <div className="frieze azulejo border-b-0" aria-hidden="true" />
              </nav>
            </details>
          </div>
        </div>
      </div>

      <NavActive />
    </header>
  );
}
