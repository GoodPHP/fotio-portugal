import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the blog index: SERP title and description, plus the
 * long-form passage that closes the page below the article list.
 *
 * The article count is interpolated from the catalogue rather than typed out,
 * so publishing a post cannot leave the copy claiming an old figure.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Portugal Photography Guides — Spots, Permits, Seasons',
  pt: 'Guias de fotografia em Portugal',
};

const DESCRIPTION_TEMPLATE: Localized = {
  en: '{count} guides from photographers who work these places weekly: Lisbon spots, Sintra permits, Douro harvest dates, Algarve tides, what to wear on calçada.',
  pt: '{count} guias de quem fotografa estes sítios todas as semanas: locais em Lisboa, autorizações em Sintra, datas da vindima, marés no Algarve, o que calçar.',
};

export function metaDescription(locale: Locale, postCount: number): string {
  return tx(DESCRIPTION_TEMPLATE, locale).replace('{count}', String(postCount));
}

export const OG_IMAGE_ALT: Localized = {
  en: 'Lisbon photographed at the hour these guides recommend',
  pt: 'Lisboa fotografada à hora que estes guias recomendam',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these guides', pt: 'Sobre estes guias' } as Localized,
  heading: {
    en: 'Written by the people who shoot these places',
    pt: 'Escritos por quem fotografa estes sítios',
  } as Localized,
  paragraphs: {
    en: [
      'These are working notes rather than travel writing. Each one exists because the same question kept arriving in enquiries, and the answer was long enough to be worth writing down once: which direction a viewpoint faces, what a permit actually costs, which hour a place is still empty.',
      'Several of them save real money. Photography rules in Portugal are set per site rather than nationally, and Sintra alone has two separate regimes because Quinta da Regaleira is not run by Parques de Sintra. Knowing that before you plan a morning around a palace is worth more than any amount of advice about composition.',
      'Others are about timing, which is the thing people most often get wrong and the thing that costs nothing to get right. The Douro harvest is a week nobody can name in March. Madeira’s Fanal only works in fog. The Algarve’s best month is February and its worst is the one everybody books. Lisbon’s miradouros are finished by nine in July.',
      'If your question is not answered here, ask it directly — the answer usually turns into the next article.',
    ],
    pt: [
      'Isto são notas de trabalho e não literatura de viagens. Cada uma existe porque a mesma pergunta continuava a chegar nos pedidos de orçamento, e a resposta era longa o suficiente para valer a pena escrevê-la uma vez: para onde está virado um miradouro, quanto custa de facto uma autorização, a que hora um sítio ainda está vazio.',
      'Várias poupam dinheiro a sério. As regras de fotografia em Portugal são definidas local a local e não a nível nacional, e só Sintra tem dois regimes distintos porque a Quinta da Regaleira não é gerida pela Parques de Sintra. Saber isso antes de planear uma manhã à volta de um palácio vale mais do que qualquer conselho sobre composição.',
      'Outras são sobre horários, que é aquilo em que as pessoas mais se enganam e aquilo que não custa nada acertar. A vindima no Douro é uma semana que ninguém consegue nomear em Março. O Fanal, na Madeira, só resulta com nevoeiro. O melhor mês do Algarve é Fevereiro e o pior é aquele que toda a gente marca. Os miradouros de Lisboa acabam às nove, em Julho.',
      'Se a sua pergunta não estiver aqui respondida, faça-a directamente — a resposta costuma dar o artigo seguinte.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Guides published', value: '{count}' },
      { label: 'Written by', value: 'Network photographers' },
      { label: 'Cities covered', value: '12' },
      { label: 'Sponsored posts', value: 'None' },
    ],
    pt: [
      { label: 'Guias publicados', value: '{count}' },
      { label: 'Escritos por', value: 'Fotógrafos da rede' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Artigos patrocinados', value: 'Nenhum' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;

/** SEO_PROSE facts with the live article count substituted in. */
export function seoFacts(locale: Locale, postCount: number) {
  return tx(SEO_PROSE.facts, locale).map((fact) => ({
    ...fact,
    value: fact.value.replace('{count}', String(postCount)),
  }));
}
