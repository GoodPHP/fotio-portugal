'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { SITE_NAME } from '@/lib/site';
import LocaleSwitcher from './LocaleSwitcher';

const NAV_LINKS = [
  { href: '/services', key: 'services' },
  { href: '/cities', key: 'cities' },
  { href: '/pricing', key: 'pricing' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/blog', key: 'blog' },
  { href: '/about', key: 'about' },
] as const;

export default function NavBar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    /*
      A justified masthead. Wordmark hard left, navigation right-aligned on the
      same baseline, utilities at the far right, and a hairline under all of it
      at every scroll position — the header used to float with no edge until you
      scrolled, so it never separated from the page it sat on.
    */
    <header
      className={`sticky top-0 z-40 border-b border-brand-rule transition-colors duration-300 ${
        scrolled ? 'bg-brand-sand/92 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[92rem] items-baseline justify-between gap-8 px-6 py-5">
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
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`border-b py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep ${
                  isActive(link.href)
                    ? 'border-brand-dark font-medium text-brand-dark'
                    : 'border-transparent text-brand-muted hover:border-brand-rule-strong hover:text-brand-dark'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* A hairline marks where navigation ends and utilities begin. */}
          <span aria-hidden="true" className="hidden self-stretch border-l border-brand-rule lg:block" />

          <div className="flex items-baseline gap-5 sm:gap-6">
            <LocaleSwitcher />

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

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              className="-mb-1 self-center text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep lg:hidden"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-brand-rule bg-brand-sand lg:hidden"
        >
          <ul className="mx-auto max-w-[92rem] px-6 py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block border-b border-brand-rule py-3.5 font-display text-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep ${
                    isActive(link.href)
                      ? 'font-semibold text-brand-orange-deep'
                      : 'text-brand-dark hover:text-brand-orange-deep'
                  }`}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}

          </ul>
        </nav>
      )}
    </header>
  );
}
