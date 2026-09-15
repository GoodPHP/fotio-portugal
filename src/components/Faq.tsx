import { FadeIn } from '@/components/Motion';

export interface FaqEntry {
  question: string;
  answer: string;
}

interface FaqProps {
  /** The questions, already resolved into the reader's language. */
  entries: FaqEntry[];
  /** Section heading, e.g. "Frequently asked questions". */
  title: string;
  /** Small label above the heading. Omitted on pages that already carry one. */
  eyebrow?: string;
  /** Anchor id for the heading, unique per page. */
  headingId: string;
}

/**
 * The questions block, once.
 *
 * This markup existed five times — the home page and four templates — and had
 * drifted into four variants: two different container radii, two different
 * heading sizes, and a `+` marker that was a circle on a site with no circles
 * in it. Each copy also re-implemented the `<details>` disclosure, so fixing
 * the marker meant finding all five.
 *
 * The layout is a two-column spread: the heading holds the left rail while the
 * questions run down the right, which reads as an index rather than as a stack
 * of boxes and gives a long list somewhere to go on a wide screen. Rows are
 * separated by grout lines rather than being boxed, because a question is not
 * a card.
 *
 * It stays a plain `<details>`: the disclosure is the browser's, so it works
 * before hydration and with JavaScript off, and a crawler reading the FAQ
 * markup finds the answer text in the document either way.
 */
export default function Faq({ entries, title, eyebrow, headingId }: FaqProps) {
  if (entries.length === 0) return null;

  return (
    <section
      aria-labelledby={headingId}
      className="border-y border-brand-rule bg-brand-cream/60 py-[var(--space-section)]"
    >
      <div className="mx-auto grid max-w-[92rem] gap-10 px-6 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-4">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2
            id={headingId}
            className={`font-display font-bold leading-[1.0] text-brand-dark ${eyebrow ? 'mt-4' : ''}`}
            style={{ fontSize: 'var(--text-title)' }}
          >
            {title}
          </h2>
        </FadeIn>

        <div className="lg:col-span-8">
          <div className="border-t border-brand-rule">
            {entries.map((entry) => (
              <details key={entry.question} className="disclosure group border-b border-brand-rule">
                <summary className="flex items-center justify-between gap-6 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange-deep">
                  <span className="font-display text-lg font-semibold text-brand-dark transition-colors group-hover:text-brand-orange-deep sm:text-xl">
                    {entry.question}
                  </span>
                  {/* A square that rotates into a cross. The old marker was a
                      circle, which is the one shape this system does not use. */}
                  <span className="disclosure-mark" aria-hidden="true">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </span>
                </summary>
                <p className="measure pb-6 text-[0.9375rem] leading-relaxed text-brand-muted">
                  {entry.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
