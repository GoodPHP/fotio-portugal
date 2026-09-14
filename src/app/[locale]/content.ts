import type { Localized } from '@/lib/locales';
import { SITE_NAME } from '@/lib/site';

/**
 * Search-facing copy for the home page: the SERP title and description, and the
 * long-form editorial passage that closes the page.
 *
 * Kept out of `page.tsx` for the same reason the About page keeps its own
 * content module — the layout file should not double as a copy deck. The hero
 * strings stay in `messages/*.json` because the header renders them through
 * `next-intl`; everything here is authored prose that no translation pipeline
 * touches.
 *
 * Both languages are authored rather than translated: the English reader is
 * coming to Portugal and the Portuguese reader lives here, and the two pages
 * are selling different things.
 */

/**
 * ≤60 chars, brand included.
 *
 * Every other page lets the layout's `%s | <brand>` template append the brand,
 * but a template does not apply to the page in the same segment as the layout
 * that declares it — so the home page carries the brand itself, and
 * `buildMetadata` recognises it and does not add a second one.
 */
export const META_TITLE: Localized = {
  en: `Book a Photographer in Portugal | ${SITE_NAME}`,
  pt: `Fotógrafo em Portugal — 12 cidades | ${SITE_NAME}`,
};

/** 150–160 chars: what it is, what it costs, why click. */
export const META_DESCRIPTION: Localized = {
  en: 'Vetted local photographers in 12 Portuguese cities and destinations. The price is fixed in writing before you book, and the gallery lands in 48–72 hours.',
  pt: 'Fotógrafos locais verificados em 12 cidades e destinos portugueses. O preço é fixado por escrito antes de reservar e a galeria chega em 48–72 horas.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A photographer’s frame from Lisbon, one of the twelve places covered across Portugal',
  pt: 'Uma fotografia em Lisboa, um dos doze sítios cobertos em todo o Portugal',
};

export const SEO_PROSE = {
  eyebrow: { en: 'Why book this way', pt: 'Porquê reservar assim' } as Localized,
  heading: {
    en: 'Photography in Portugal, booked in the sensible order',
    pt: 'Fotografia em Portugal, reservada pela ordem certa',
  } as Localized,
  paragraphs: {
    en: [
      'Hiring a photographer in a country you are only visiting usually means a week of email, a quote that arrives last, and a portfolio you have no way to verify. This inverts that order. You choose the place and the kind of session, you see the price before you commit to anything, and the photographer who answers already lives and works where you will be standing.',
      'Twelve places are covered: Lisboa, Porto, Sintra, Cascais, Braga, Coimbra and Évora, alongside the Algarve, Madeira, the Açores, the Douro and Comporta. Three of those are not cities at all, which is deliberate — the Algarve is one coastline photographed by the same people on the same mornings, and Madeira is an island whose best hour is at eighteen hundred metres rather than in Funchal.',
      'What a local photographer knows that a visiting one does not is the hour. Lisbon’s miradouros face north-east and hold light until about nine, then go flat; Porto’s Ribeira is in shadow all morning and only lights at the end of the day; an Algarve cove that is a beach at low tide is under water at high. None of that is findable in advance and all of it decides whether a session works.',
      'Sessions run from a forty-five-minute headshot to a full wedding day, and take in couples, families, maternity, graduations, corporate work, property and food. The fee is agreed in writing beforehand, covers the editing, and includes a private gallery delivered within forty-eight to seventy-two hours. Nothing is billed per extra photograph. If the weather turns, the session moves at no cost.',
    ],
    pt: [
      'Contratar um fotógrafo costuma ser uma semana de e-mails, um orçamento que chega em último lugar e um portefólio que não há maneira de verificar. Aqui a ordem é a inversa: escolhe o sítio e o tipo de sessão, vê o preço antes de se comprometer com o que quer que seja, e quem lhe responde já vive e trabalha onde a sessão vai acontecer.',
      'São doze sítios: Lisboa, Porto, Sintra, Cascais, Braga, Coimbra e Évora, mais o Algarve, a Madeira, os Açores, o Douro e a Comporta. Três deles não são cidades, e isso é de propósito — o Algarve é uma costa só, fotografada pelas mesmas pessoas nas mesmas manhãs, e na Madeira a melhor hora está a mil e oitocentos metros e não no Funchal.',
      'O que um fotógrafo local sabe e um fotógrafo de fora não sabe é a hora. Os miradouros de Lisboa estão virados a nordeste e aguentam luz até cerca das nove, depois achatam; a Ribeira do Porto está à sombra toda a manhã e só acende ao fim do dia; uma praia do Algarve que existe com maré baixa está debaixo de água com maré cheia. Nada disso se descobre de antemão e tudo isso decide se a sessão resulta.',
      'As sessões vão de um retrato corporativo de quarenta e cinco minutos a um dia inteiro de casamento, e passam por casais, famílias, gravidez, finalistas, trabalho de empresa, imobiliário e gastronomia. O valor é acordado por escrito antes, cobre a edição e inclui uma galeria privada entregue em quarenta e oito a setenta e duas horas. Não se cobra por fotografia extra. Se o tempo mudar, a sessão muda sem custo.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities covered', value: '12' },
      { label: 'Session types', value: '22' },
      { label: 'Gallery delivery', value: '48–72h' },
      { label: 'Deposit to enquire', value: '€0' },
    ],
    pt: [
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Tipos de sessão', value: '22' },
      { label: 'Entrega da galeria', value: '48–72h' },
      { label: 'Sinal para orçamento', value: '0 €' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
