import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { FadeIn, Stagger, StaggerItem } from '@/components/Motion';
import type { LandingPoint } from '@/lib/data/service-landing';

/**
 * The sections that sit between a service's price card and its closing
 * passage: who books it, how it runs, how to prepare, and the last call to
 * book. Presentational only — the page resolves every string into the reader's
 * language and passes it in, and the copy itself lives in
 * `src/lib/data/service-landing*.ts`.
 *
 * Numbering is monospaced and in the accent, the one place a figure is
 * allowed to be decorative: a buyer skimming the page reads "01 02 03 04" as a
 * process before reading a word of it.
 */

type Href = ComponentProps<typeof Link>['href'];

const pad = (n: number): string => String(n).padStart(2, '0');

const FOCUS_ON_DARK = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.05-.5.42-3.15-.66-2.66-1.08-4.31-3.83-4.44-4.01-.13-.18-1.06-1.41-1.06-2.69 0-1.27.67-1.9.91-2.16.24-.26.52-.32.7-.32.17 0 .35 0 .5.01.16.01.38-.06.59.45.24.59.81 2.04.88 2.19.07.15.12.32.02.51-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.24.09 1.55.73 1.81.86.27.13.45.2.51.31.06.11.06.64-.18 1.32z" />
    </svg>
  );
}

/** The reassurances beside the first call to action, as a quiet inline list. */
export function TrustList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-brand-dark">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-brand-orange-deep" />
          {item}
        </li>
      ))}
    </ul>
  );
}

interface SectionHeading {
  headingId: string;
  eyebrow: string;
  heading: string;
}

export function ServiceAudience({ headingId, eyebrow, heading, points }: SectionHeading & { points: LandingPoint[] }) {
  if (points.length === 0) return null;
  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-[92rem] px-6 py-[var(--space-band)]">
      <FadeIn>
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={headingId}
          className="font-display mt-4 max-w-3xl text-3xl font-bold leading-[1.05] text-brand-dark sm:text-[2.5rem]"
        >
          {heading}
        </h2>
      </FadeIn>
      <Stagger className="grout grout-tile mt-10 sm:grid-cols-3">
        {points.map((point, i) => (
          <StaggerItem key={point.title} className="flex flex-col p-7 sm:p-8">
            <span className="font-mono text-xs font-semibold tabular-nums tracking-[0.16em] text-brand-orange-deep">
              {pad(i + 1)}
            </span>
            <h3 className="font-display mt-6 text-xl font-bold leading-snug text-brand-dark">{point.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-brand-muted">{point.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function ServiceProcess({
  headingId,
  eyebrow,
  heading,
  steps,
  cta,
}: SectionHeading & {
  steps: LandingPoint[];
  cta: { href: Href; label: string; note: string };
}) {
  if (steps.length === 0) return null;
  return (
    <section
      aria-labelledby={headingId}
      data-surface="dark"
      className="bg-brand-dark py-[var(--space-section)] text-white"
    >
      <div className="mx-auto max-w-[92rem] px-6">
        <FadeIn>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="font-display mt-4 max-w-3xl text-3xl font-bold leading-[1.05] sm:text-[2.75rem]">
            {heading}
          </h2>
        </FadeIn>

        {/* One hairline grid rather than four boxes: the steps are a sequence, not a menu. */}
        <ol className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-brand-dark p-7 sm:p-8">
              <span
                aria-hidden="true"
                className="font-display block text-5xl font-bold tabular-nums tracking-[-0.04em] text-brand-orange"
              >
                {pad(i + 1)}
              </span>
              <h3 className="font-display mt-6 text-lg font-bold leading-snug">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link href={cta.href} className={`btn btn-primary shrink-0 ${FOCUS_ON_DARK}`}>
            {cta.label}
          </Link>
          <p className="max-w-xl text-sm leading-relaxed text-white/70">{cta.note}</p>
        </div>
      </div>
    </section>
  );
}

export function ServicePrepare({
  headingId,
  eyebrow,
  heading,
  intro,
  items,
}: SectionHeading & { intro: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-[92rem] px-6 py-[var(--space-section)]">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="font-display mt-4 text-3xl font-bold leading-[1.05] text-brand-dark sm:text-[2.5rem]">
            {heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted">{intro}</p>
        </FadeIn>
        <FadeIn className="lg:col-span-8">
          <ul className="grout grout-tile">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-4 px-6 py-5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-brand-orange-deep text-white"
                >
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="leading-relaxed text-brand-dark">{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

export function ServiceCtaBand({
  headingId,
  heading,
  text,
  bookHref,
  bookLabel,
  whatsappHref,
  whatsappLabel,
}: {
  headingId: string;
  heading: string;
  text: string;
  bookHref: Href;
  bookLabel: string;
  whatsappHref: string;
  whatsappLabel: string;
}) {
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link href={bookHref} className={`btn btn-primary ${FOCUS_ON_DARK}`}>
              {bookLabel}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline ${FOCUS_ON_DARK}`}
            >
              <WhatsAppIcon />
              {whatsappLabel}
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
