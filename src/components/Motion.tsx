'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  /** Vertical travel distance in px (set 0 to fade only). */
  y?: number;
  /**
   * Render without the entrance animation.
   *
   * Set this above the fold. These wrappers emit `opacity: 0` into the server
   * HTML, so anything in the first screenful stays invisible until JavaScript
   * has loaded, hydrated and run the animation — which makes the entrance
   * animation itself the largest contentful paint. Measured at roughly 0.9s of
   * LCP across this site, for content the reader is looking at anyway.
   */
  instant?: boolean;
}

/**
 * Thin scroll-triggered fade-in wrapper. Respects prefers-reduced-motion by
 * rendering content statically, and only animates compositor-friendly props.
 */
export function FadeIn({ children, delay = 0, y = 24, className, instant = false }: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || instant) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Gap between each child's reveal, in seconds. */
  step?: number;
  /** Render without the entrance animation. See `FadeIn.instant`. */
  instant?: boolean;
}

/** Container that staggers the reveal of its direct <FadeIn> children. */
export function Stagger({ children, className, step = 0.08, instant = false }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || instant) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

/** A single staggered child for use inside <Stagger>. */
export function StaggerItem({ children, className, y = 20 }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
      }}
    >
      {children}
    </motion.div>
  );
}
