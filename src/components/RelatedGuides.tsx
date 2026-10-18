import { Link } from '@/i18n/navigation';
import { tx, type Locale } from '@/lib/locales';
import { publishedBlogPosts } from '@/lib/catalog';
import { blogHref } from '@/lib/routes';

const COPY = {
  heading: { en: 'Guides for planning the session', pt: 'Guias para planear a sessão' },
  read: { en: 'read', pt: 'de leitura' },
} as const;

interface RelatedGuidesProps {
  locale: Locale;
  headingId: string;
  /** Show the articles that name this place in `relatedCities`… */
  citySlug?: string;
  /** …or this service in `relatedServices`. */
  serviceId?: string;
}

/**
 * The other half of the article's own "related" block.
 *
 * Every article names the places and sessions it is about, and links to them
 * from its foot. Nothing linked back: the pillar guides were reachable only
 * from the blog index and from each other, which leaves the pages written to
 * be internal-link hubs with almost no internal links of their own. This
 * draws the reverse edge from the same data, so the two cannot disagree.
 * Renders nothing when no article is about this page.
 */
export default function RelatedGuides({ locale, headingId, citySlug, serviceId }: RelatedGuidesProps) {
  const posts = publishedBlogPosts().filter(
    (post) =>
      (citySlug !== undefined && post.relatedCities?.includes(citySlug)) ||
      (serviceId !== undefined && post.relatedServices?.includes(serviceId)),
  );
  if (posts.length === 0) return null;

  return (
    <nav aria-labelledby={headingId} className="mx-auto max-w-[92rem] px-6 py-16">
      <h2 id={headingId} className="font-display text-2xl font-bold text-brand-dark">
        {COPY.heading[locale]}
      </h2>
      <ul className="mt-6 divide-y divide-brand-rule border-y border-brand-rule">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={blogHref(post.slug)}
              className="group block py-4 text-brand-dark transition-colors hover:text-brand-orange-deep"
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-display text-lg font-semibold">{tx(post.title, locale)}</span>
                <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-muted">
                  {post.readTime} {COPY.read[locale]}
                </span>
              </span>
              <span className="mt-1 block text-sm text-brand-muted">{tx(post.summary, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
