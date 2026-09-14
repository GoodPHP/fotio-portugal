import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the booking page: SERP title and description, plus the
 * long-form passage that closes the page below the booking widget.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Book a Photo Session in Portugal',
  pt: 'Reservar uma sessão fotográfica em Portugal',
};

export const META_DESCRIPTION: Localized = {
  en: 'Pick a place, a session and a date, and get a fixed price on WhatsApp in minutes. No deposit to request a quote, and nothing is charged until you confirm.',
  pt: 'Escolha o sítio, a sessão e a data, e receba um preço fixo no WhatsApp em minutos. Sem sinal para pedir orçamento e sem nada a pagar até confirmar.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A surprise proposal session in Lisbon, one of the sessions you can book here',
  pt: 'Um pedido de casamento surpresa em Lisboa, uma das sessões que pode reservar aqui',
};

export const SEO_PROSE = {
  eyebrow: { en: 'How booking works', pt: 'Como funciona a reserva' } as Localized,
  heading: {
    en: 'From this form to a confirmed photographer',
    pt: 'Deste formulário a um fotógrafo confirmado',
  } as Localized,
  paragraphs: {
    en: [
      'The form above collects four things — place, session type, date and how to reach you — and that is enough to quote. You are not choosing a package or paying a deposit at this stage; you are asking a question, and the answer arrives on WhatsApp, usually within a couple of hours.',
      'The price you are quoted is the price you pay. It covers the photographer’s time, the editing and a private gallery in full resolution. Options that change it — a longer session, a second photographer, twenty-four-hour delivery — are priced before you agree to anything, not added afterwards.',
      'Once you confirm in writing, the photographer takes over the scheduling. That conversation is where the useful detail happens: what hour the location works, whether a permit is needed and who arranges it, what the tide is doing, where to meet. It is the part a booking form cannot do and the part that decides whether the session works.',
      'If the weather turns, the session moves at no cost. If you need to cancel, say so as early as you can. And if the gallery is not what was promised, you are refunded in full — that guarantee is why the quote can afford to be a fixed number rather than an estimate.',
    ],
    pt: [
      'O formulário acima recolhe quatro coisas — sítio, tipo de sessão, data e como o contactar — e isso chega para orçamentar. Nesta fase não está a escolher um pacote nem a pagar sinal; está a fazer uma pergunta, e a resposta chega por WhatsApp, normalmente em duas horas.',
      'O preço que lhe for indicado é o preço que paga. Cobre o tempo do fotógrafo, a edição e uma galeria privada em resolução máxima. As opções que o alteram — sessão mais longa, segundo fotógrafo, entrega em vinte e quatro horas — são orçamentadas antes de concordar com o que quer que seja, não acrescentadas depois.',
      'Depois de confirmar por escrito, é o fotógrafo que trata do horário. É nessa conversa que aparece o detalhe útil: a que hora o local funciona, se é preciso autorização e quem a trata, o que está a maré a fazer, onde nos encontramos. É a parte que um formulário não faz e a parte que decide se a sessão resulta.',
      'Se o tempo mudar, a sessão passa para outro dia sem custo. Se precisar de cancelar, diga-nos o mais cedo possível. E se a galeria não for o que foi prometido, é reembolsado na totalidade — é essa garantia que permite que o orçamento seja um número fixo e não uma estimativa.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Quote turnaround', value: 'Under 2h' },
      { label: 'Deposit for a quote', value: '€0' },
      { label: 'Gallery delivery', value: '48–72h' },
      { label: 'Weather reschedule', value: 'Free' },
    ],
    pt: [
      { label: 'Resposta ao orçamento', value: 'Menos de 2h' },
      { label: 'Sinal para orçamento', value: '0 €' },
      { label: 'Entrega da galeria', value: '48–72h' },
      { label: 'Remarcação por chuva', value: 'Grátis' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
