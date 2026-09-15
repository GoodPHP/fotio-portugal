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
      className={nested ? 'py-[var(--space-section)]' : 'mx-auto max-w-[92rem] px-6 py-[var(--space-section)]'}
    >
      <FadeIn>
        <div className="grid gap-10 border-t border-brand-rule pt-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2
              id={headingId}
              className="font-display mt-4 text-3xl font-bold leading-[1.05] text-brand-dark sm:text-[2.5rem]"
            >
              {heading}
            </h2>
            {/*
              The figures are a course of tiles rather than a loose two-column
              list: they are the same facts the hero states, and stating them
              twice in two different shapes is how a page stops looking like one
              page.
            */}
            {facts && facts.length > 0 && (
              <dl className="grout grout-tile mt-9 grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label} className="px-4 py-5">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brand-muted">
                      {fact.label}
                    </dt>
                    <dd className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] text-brand-dark">
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
