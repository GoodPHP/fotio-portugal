import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { FadeIn } from './Motion';
import { ArrowIcon } from './Icons';

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  /** One or two sentences under the title. Kept short: this is a signpost. */
  lead?: ReactNode;
  /** A "view all" link on the right of the rule. */
  action?: { href: ComponentProps<typeof Link>['href']; label: string };
  /** White type, for sections on ink. */
  onDark?: boolean;
}

/**
 * The heading every home-page band opens with: eyebrow, title, an optional
 * lead and an optional "view all", over a hairline rule. Written out inline
 * six times on the old home page; here once.
 */
export default function SectionHeading({ id, eyebrow, title, lead, action, onDark = false }: SectionHeadingProps) {
  return (
    <FadeIn className="flex flex-wrap items-end justify-between gap-6 border-b border-brand-rule pb-7">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2
          id={id}
          className={`font-display font-bold leading-[1.0] ${eyebrow ? 'mt-4' : ''} ${onDark ? 'text-white' : 'text-brand-dark'}`}
          style={{ fontSize: 'var(--text-title)' }}
        >
          {title}
        </h2>
        {lead && <p className="measure mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">{lead}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="link-ruled whitespace-nowrap text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange-deep"
        >
          {action.label}
          <ArrowIcon />
        </Link>
      )}
    </FadeIn>
  );
}
