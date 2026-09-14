import { FadeIn } from '@/components/Motion';

export interface SeoProseFact {
  label: string;
  value: string;
}

export interface SeoProseProps {
  /** Small mono label above the heading. */
  eyebrow: string;
  heading: string;
  /**
   * The body copy, one string per paragraph. Authored prose, not keyword
   * filler: it sits in the reading flow of the page and a person has to be
   * willing to read it.
   */
  paragraphs: string[];
  /** Optional figures for the left rail, e.g. cities covered, delivery time. */
  facts?: SeoProseFact[];
  /** Anchor id for the section heading, unique per page. */
  headingId: string;
  /**
   * Set when the parent element already supplies the page gutter and max
   * width, so the block does not apply a second one inside the first.
   */
  nested?: boolean;
}

/**
 * The long-form editorial block that closes a page.
 *
 * Two jobs at once. For a reader it is the colophon: the paragraph that
 * explains what the page actually offers, after the grids have shown it. For a
 * crawler it is the only substantial prose on an otherwise card-driven page —
 * which is why it is rendered as ordinary visible text in a magazine column,
 * never collapsed, never `hidden`, never smaller than the surrounding body.
 *
 * Layout is a left rail (heading + figures) against a right column that splits
 * into two at desktop width, so a 1,000-character passage reads as a magazine
 * spread rather than as a wall.
 */
export default function SeoProse({
  eyebrow,
  heading,
  paragraphs,
  facts,
  headingId,
  nested = false,
}: SeoProseProps) {
  return (
    <section
      aria-labelledby={headingId}
      className={nested ? 'py-20' : 'mx-auto max-w-7xl px-6 py-20'}
    >
      <FadeIn>
        <div className="rule pt-12" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange-deep">
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
            >
              {heading}
            </h2>
            {facts && facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-brand-rule pt-6">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-brand-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-brand-dark">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="text-base leading-relaxed text-brand-muted lg:columns-2 lg:gap-12 [&>p]:break-inside-avoid">
            {/* Static, never reordered, so the index is a safe key. */}
            {paragraphs.map((paragraph, i) => (
              <p key={i} className={i === 0 ? '' : 'mt-5'}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
