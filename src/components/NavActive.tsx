'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Route key of the home link, which must match exactly rather than by prefix. */
const HOME_ROUTE = '/';
const ACTIVE_CLASS = 'nav-link-active';

/**
 * Marks the navigation link for the page being viewed.
 *
 * The one thing in the masthead that genuinely cannot be answered on the
 * server: Next has no server-side pathname, by design, and reading it from
 * headers would opt every page out of static rendering to style one underline.
 *
 * So it is isolated here instead — an effect and nothing rendered. Links are
 * server-rendered with real hrefs and a `data-nav` attribute; this only adds
 * `aria-current` and the active class afterwards. With JavaScript disabled the
 * navigation works and simply does not highlight.
 *
 * The header lives in the layout, which survives client-side navigation, so
 * this re-runs on every pathname change and clears the previous mark first.
 * Running once on mount left the landing page highlighted for the whole visit.
 *
 * It compares against the href the server already wrote, so translated URL
 * segments need no special handling: the attribute holds whatever was
 * rendered, in whichever language. `next/navigation` rather than next-intl's
 * `usePathname`, which would pull the route table into the client bundle.
 */
export default function NavActive() {
  const path = usePathname();

  useEffect(() => {
    for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-nav]')) {
      const href = link.getAttribute('href');
      const isActive = Boolean(href) && matches(path, href!, link.dataset.nav === HOME_ROUTE);
      link.classList.toggle(ACTIVE_CLASS, isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  }, [path]);

  return null;
}

/**
 * Home ("/" or "/pt") is every other path's prefix, so it matches only itself.
 * Sections match on a segment boundary, so a leaf page lights up its section
 * and "/services" does not claim "/services-and-pricing".
 */
function matches(path: string, href: string, isExact: boolean): boolean {
  const current = path.replace(/\/+$/, '') || '/';
  const target = href.replace(/\/+$/, '') || '/';
  if (current === target) return true;
  return !isExact && current.startsWith(`${target}/`);
}
