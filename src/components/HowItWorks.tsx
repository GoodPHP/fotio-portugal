import type { Locale } from '@/lib/locales';
import SectionHeading from './SectionHeading';
import CtaPair from './CtaPair';

const COPY = {
  eyebrow: { en: 'How it works', pt: 'Como funciona' },
  title: { en: 'Your photography session, made simple.', pt: 'A sua sessão fotográfica, sem complicações.' },
  lead: {
    en: 'No complicated booking process. We handle the photographer matching.',
    pt: 'Sem processos de reserva complicados. Nós tratamos de encontrar o fotógrafo.',
  },
} as const;

const STEPS = [
  {
    title: { en: 'Tell us where and when', pt: 'Diga-nos onde e quando' },
    text: {
      en: 'Choose a place, a session and a date. It takes a minute and costs nothing.',
      pt: 'Escolha o sítio, a sessão e a data. Demora um minuto e não custa nada.',
    },
  },
  {
    title: { en: 'We match you with a photographer', pt: 'Encontramos o seu fotógrafo' },
    text: {
      en: 'A local professional who knows the place. We confirm availability and the price in writing.',
      pt: 'Um profissional local que conhece o sítio. Confirmamos a disponibilidade e o preço por escrito.',
    },
  },
  {
    title: { en: 'Enjoy your session', pt: 'Aproveite a sessão' },
    text: {
      en: 'Meet at the right spot at the right hour, with direction that stays natural.',
      pt: 'Encontro no sítio certo à hora certa, com orientação que se mantém natural.',
    },
  },
  {
    title: { en: 'Receive your edited gallery', pt: 'Receba a galeria editada' },
    text: {
      en: 'Professionally edited photos in a private online gallery — within 48–72 hours for most sessions.',
      pt: 'Fotografias com edição profissional numa galeria privada — em 48 a 72 horas na maioria das sessões.',
    },
  },
] as const;

/**
 * The four-step process, with the anchor the header's "How it works" link
 * points at. Used on the home page and the booking-adjacent pages, so the
 * process is described in one set of words everywhere.
 */
export default function HowItWorks({ locale, withCta = true }: { locale: Locale; withCta?: boolean }) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="mx-auto max-w-[92rem] scroll-mt-24 px-6 py-[var(--space-section)]"
    >
      <SectionHeading id="how-heading" eyebrow={COPY.eyebrow[locale]} title={COPY.title[locale]} lead={COPY.lead[locale]} />
      <ol className="grout grout-tile mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.title.en} className="px-6 py-8 sm:px-7">
            <span
              aria-hidden="true"
              className="font-display block text-5xl font-bold leading-none tracking-[-0.05em] text-brand-orange-deep"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display mt-6 text-xl font-semibold text-brand-dark">{step.title[locale]}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-brand-muted">{step.text[locale]}</p>
          </li>
        ))}
      </ol>
      {withCta && <CtaPair locale={locale} context="how-it-works" className="mt-10" />}
    </section>
  );
}
