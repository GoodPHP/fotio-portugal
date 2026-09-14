import type { CSSProperties, ReactNode } from 'react';

/**
 * Entrance animations, done in CSS and rendered on the server.
 *
 * These used to be framer-motion components, and they cost more than they
 * looked. Each one emitted `opacity: 0` into the server HTML and waited for
 * JavaScript to load, hydrate and run before revealing anything — which made
 * the entrance animation itself the largest contentful paint, measured at
 * roughly 0.9s across the site. The `instant` prop existed to opt the top of
 * each page out of its own animation library.
 *
 * A view-progress timeline removes the trade-off. The element's own position
 * in the scrollport drives the animation, so there is no observer, no state,
 * no hydration and no client bundle; and because the animation fills both
 * ways, an element already on screen when the document is parsed resolves
 * straight to its finished state rather than starting hidden.
 *
 * Browsers without `animation-timeline` (Firefox today) get no animation and
 * fully visible content, which is the correct way for this to fail. The
 * `@supports` guard and the `prefers-reduced-motion` check both live in
 * `globals.css`; see the `.reveal` rules there.
 */

interface RevealStyle extends CSSProperties {
  '--reveal-y'?: string;
}

function revealStyle(y: number): RevealStyle | undefined {
  // 24px is the default in the stylesheet, so the common case sets nothing.
  return y === 24 ? undefined : { '--reveal-y': `${y}px` };
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /**
   * Retained so the ~180 call sites did not all have to change, but it no
   * longer does anything: with a view-progress timeline each element is
   * already sequenced by where it sits on the page, and a fixed time offset
   * fights that rather than adding to it.
   */
  delay?: number;
  /** Vertical travel distance in px (0 fades without moving). */
  y?: number;
  /**
   * Render without the entrance animation.
   *
   * Kept for content above the fold. The LCP argument for it is gone — nothing
   * renders hidden any more — but "the first screenful does not animate" is a
   * deliberate design choice, not a workaround, so it stays honoured.
   */
  instant?: boolean;
}

/** Fades its children in as they scroll into view. */
export function FadeIn({ children, y = 24, className, instant = false }: FadeInProps) {
  if (instant) return <div className={className}>{children}</div>;
  return (
    <div className={className ? `${className} reveal` : 'reveal'} style={revealStyle(y)}>
      {children}
    </div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Retained for API compatibility; the cascade is fixed in the stylesheet. */
  step?: number;
  /** Render without the entrance animation. See `FadeIn.instant`. */
  instant?: boolean;
}

/**
 * Container whose direct children reveal in a cascade.
 *
 * The offset is per child position, set in `globals.css`, rather than passed
 * down — a server component cannot hand each child its index without cloning
 * the element tree, and `:nth-child` already knows.
 */
export function Stagger({ children, className, instant = false }: StaggerProps) {
  if (instant) return <div className={className}>{children}</div>;
  return <div className={className ? `${className} reveal-stagger` : 'reveal-stagger'}>{children}</div>;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

/** A single child of `<Stagger>`. */
export function StaggerItem({ children, className, y = 20 }: StaggerItemProps) {
  return (
    <div className={className ? `${className} reveal` : 'reveal'} style={revealStyle(y)}>
      {children}
    </div>
  );
}
