import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the contact page: SERP title and description, plus the
 * long-form passage that closes the page below the form.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Contact a Photographer in Portugal',
  pt: 'Contactar um fotógrafo em Portugal',
};

export const META_DESCRIPTION: Localized = {
  en: 'Ask about a session in any of twelve places across Portugal. Reply within two hours by email or WhatsApp, a written quote, and no deposit to ask.',
  pt: 'Pergunte sobre uma sessão em qualquer um dos doze sítios em Portugal. Resposta em duas horas por e-mail ou WhatsApp, orçamento por escrito, sem sinal.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'Porto, one of the twelve places across Portugal you can enquire about',
  pt: 'Porto, um dos doze sítios de Portugal sobre os quais pode perguntar',
};

export const SEO_PROSE = {
  eyebrow: { en: 'Before you write', pt: 'Antes de escrever' } as Localized,
  heading: {
    en: 'What to tell us, and what happens next',
    pt: 'O que nos dizer, e o que acontece a seguir',
  } as Localized,
  paragraphs: {
    en: [
      'Three things make a quote possible in one exchange rather than four: where, roughly when, and what kind of session. Everything else can be decided later. If the date is not fixed yet, say which week — for several places on this site that is the more useful answer anyway, because the Açores and the Douro are booked as a window rather than as a day.',
      'Replies come within about two hours during the working day, by email or on WhatsApp, whichever you used. The quote is written down, it covers the editing and the gallery, and it does not move afterwards. Asking costs nothing and commits you to nothing.',
      'For anything outside the standard catalogue — a multi-day assignment, several places in one trip, a company shoot across offices, or a session somewhere with its own rules — write rather than use the booking form. Those are quoted individually and are far easier to get right from a sentence or two of description.',
      'If your question is about whether a location is possible at all — a palace interior in Sintra, a working quinta during the Douro harvest, a levada on Madeira — ask before you plan around it. Those answers change, and getting the current one is the point of asking a local.',
    ],
    pt: [
      'Três coisas tornam possível orçamentar numa só troca de mensagens em vez de quatro: onde, mais ou menos quando, e que tipo de sessão. O resto decide-se depois. Se a data ainda não estiver marcada, diga a semana — para vários sítios deste site essa é aliás a resposta mais útil, porque os Açores e o Douro reservam-se por janela e não por dia.',
      'Respondemos em cerca de duas horas durante o dia útil, por e-mail ou WhatsApp, consoante o que tiver usado. O orçamento fica por escrito, cobre a edição e a galeria, e não muda depois. Perguntar não custa nada e não o compromete a nada.',
      'Para tudo o que saia do catálogo normal — um trabalho de vários dias, vários sítios na mesma viagem, uma sessão de empresa em vários escritórios, ou uma sessão num local com regras próprias — escreva em vez de usar o formulário de reserva. Esses são orçamentados caso a caso e é muito mais fácil acertar a partir de duas frases de descrição.',
      'Se a sua dúvida for se um local é sequer possível — um interior de palácio em Sintra, uma quinta em plena vindima no Douro, uma levada na Madeira — pergunte antes de planear à volta disso. Essas respostas mudam, e obter a actual é precisamente a razão para perguntar a quem está cá.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Typical reply', value: 'Under 2h' },
      { label: 'Cities covered', value: '12' },
      { label: 'Deposit to enquire', value: '€0' },
      { label: 'Quote format', value: 'In writing' },
    ],
    pt: [
      { label: 'Resposta habitual', value: 'Menos de 2h' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Sinal para orçamento', value: '0 €' },
      { label: 'Orçamento', value: 'Por escrito' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
