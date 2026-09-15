import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the blog index: SERP title and description, plus the
 * long-form passage that closes the page below the article list.
 *
 * The article count is interpolated from the catalogue rather than typed out,
 * so publishing a post cannot leave the copy claiming an old figure. The
 * passage describes what the guides are *for* rather than listing articles, so
 * it stays true as the list grows.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Portugal Photography Guides — Seasons, Spots, Style',
  pt: 'Guias de fotografia em Portugal',
};

const DESCRIPTION_TEMPLATE: Localized = {
  en: '{count} guides from photographers who work Portugal every week: the month each place is at its best, what to wear on calçada, the hour a viewpoint is empty.',
  pt: '{count} guias de quem fotografa Portugal todas as semanas: o melhor mês para cada sítio, o que vestir na calçada, a hora em que o miradouro está vazio.',
};

export function metaDescription(locale: Locale, postCount: number): string {
  return tx(DESCRIPTION_TEMPLATE, locale).replace('{count}', String(postCount));
}

export const OG_IMAGE_ALT: Localized = {
  en: 'Portugal photographed at the hour these guides recommend',
  pt: 'Portugal fotografado à hora que estes guias recomendam',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these guides', pt: 'Sobre estes guias' } as Localized,
  heading: {
    en: 'Written by the people who shoot these places',
    pt: 'Escritos por quem fotografa estes sítios',
  } as Localized,
  paragraphs: {
    en: [
      'These are working notes rather than travel writing. Each one exists because the same question kept arriving in enquiries, and the answer was long enough to be worth writing down once: which direction a viewpoint faces, which month a place is at its best, which hour it is still empty.',
      'They start with the two questions that arrive most often — when to come, and what to wear. Both sound like matters of taste and both are mostly logistics. A July session in Lisbon is finished by nine in the morning, and a heel on polished calçada is a twisted ankle waiting for the first staircase.',
      'None of it is general advice about composition. Photography rules in Portugal are set site by site rather than nationally, the Douro harvest is a week nobody can name in March, and Madeira’s Fanal only works in fog. That is the kind of detail that decides whether a morning is worth planning around, and it is what these guides are for.',
      'If your question is not answered here, ask it directly — the answer usually turns into the next article.',
    ],
    pt: [
      'Isto são notas de trabalho e não literatura de viagens. Cada uma existe porque a mesma pergunta continuava a chegar nos pedidos de orçamento, e a resposta era longa o suficiente para valer a pena escrevê-la uma vez: para onde está virado um miradouro, em que mês um sítio está no seu melhor, a que hora ainda está vazio.',
      'Começam pelas duas perguntas que mais chegam — quando vir, e o que vestir. Ambas parecem questões de gosto e ambas são sobretudo logística. Uma sessão em Lisboa em Julho acaba às nove da manhã, e um salto na calçada polida é um tornozelo torcido à espera da primeira escadaria.',
      'Nada disto é conselho genérico sobre composição. As regras de fotografia em Portugal são definidas local a local e não a nível nacional, a vindima no Douro é uma semana que ninguém consegue nomear em Março, e o Fanal, na Madeira, só resulta com nevoeiro. É esse o tipo de pormenor que decide se vale a pena planear uma manhã, e é para isso que estes guias servem.',
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
