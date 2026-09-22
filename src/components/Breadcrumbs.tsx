import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';

export interface Crumb {
  name: string;
  /** Omitted on the last crumb, which is the current page. */
  href?: ComponentProps<typeof Link>['href'];
}

/**
 * The visible trail, to match the BreadcrumbList every page already emits.
 *
 * Only three templates showed one; the rest described a hierarchy to search
 * engines that a reader could not see or use. Pages pass the same names here
 * as to `breadcrumbNode()`, so the two cannot disagree.
 */
export default function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-brand-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last || !item.href ? (
                <span className="font-medium text-brand-dark" aria-current={last ? 'page' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="py-1 transition-colors hover:text-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
