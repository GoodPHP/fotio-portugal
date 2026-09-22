import type { ComponentProps } from 'react';
import { FadeIn } from './Motion';
import CtaPair from './CtaPair';

type CtaPairProps = ComponentProps<typeof CtaPair>;

interface CtaBandProps extends Omit<CtaPairProps, 'onDark' | 'className'> {
  headingId: string;
  heading: string;
  text: string;
}

/**
 * The closing call to action of an inner page: a heading, one sentence, and
 * the two actions, on ink. Every inner page ends on one, so the last thing on
 * any page is the next step rather than the footer.
 */
export default function CtaBand({ headingId, heading, text, ...cta }: CtaBandProps) {
  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-[92rem] px-6 py-[var(--space-band)]">
      <FadeIn>
        <div
          data-surface="dark"
          className="bg-brand-dark px-7 py-10 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12"
        >
          <div className="max-w-2xl">
            <h2 id={headingId} className="font-display text-3xl font-bold leading-[1.05] sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">{text}</p>
          </div>
          <CtaPair {...cta} onDark className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
      </FadeIn>
    </section>
  );
}
