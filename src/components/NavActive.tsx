'use client';

import { useEffect } from 'react';

/**
 * Marks the navigation link for the page being viewed.
 *
 * The one thing in the masthead that genuinely cannot be answered on the
 * server: Next has no server-side pathname, by design, and reading it from
 * headers would opt every page out of static rendering to style one underline.
 *
 * So it is isolated here instead — an effect, no props, no imports beyond
 * React, and nothing rendered. Links are server-rendered with real hrefs and a
 * `data-nav` attribute; this only adds `aria-current` and the active classes
 * afterwards. With JavaScript disabled the navigation works and simply does
 * not highlight, which is a cosmetic loss rather than a functional one.
 *
 * It compares against the href the server already wrote, so translated URL
 * segments need no special handling: the attribute holds whatever was
 * rendered, in whichever language.
 */
export default function NavActive() {
  useEffect(() => {
    const path = window.location.pathname;
    for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-nav]')) {
      const href = link.getAttribute('href');
      if (!href) continue;
      // Prefix match so a leaf page lights up its section, but on a segment
      // boundary — "/services" must not claim "/services-and-pricing".
      if (path !== href && !path.startsWith(`${href}/`)) continue;
      link.setAttribute('aria-current', 'page');
      link.classList.add('nav-link-active');
    }
  }, []);

  return null;
}
