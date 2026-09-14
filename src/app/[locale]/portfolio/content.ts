import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the portfolio: SERP title and description, plus the
 * long-form passage that sits between the gallery and the reviews.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Photography Portfolio, Portugal',
  pt: 'Portefólio de fotografia, Portugal',
};

/**
 * The photograph count is interpolated rather than typed out: a folder gains
 * images and the description follows it.
 */
const DESCRIPTION_TEMPLATE: Localized = {
  en: 'Browse {count} photographs from sessions across twelve places in Portugal — weddings, portraits, families, corporate. Filter by category and book the same shoot.',
  pt: 'Veja {count} fotografias de sessões em doze sítios de Portugal — casamentos, retratos, famílias, empresas. Filtre por categoria e reserve a mesma sessão.',
};

export function metaDescription(locale: Locale, photoCount: number): string {
  return tx(DESCRIPTION_TEMPLATE, locale).replace('{count}', String(photoCount));
}

export const OG_IMAGE_ALT: Localized = {
  en: 'A frame from the portfolio — sessions photographed across Portugal',
  pt: 'Uma imagem do portefólio — sessões fotografadas em todo o Portugal',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About this gallery', pt: 'Sobre esta galeria' } as Localized,
  heading: {
    en: 'Every photograph here is credited',
    pt: 'Todas as fotografias aqui são creditadas',
  } as Localized,
  paragraphs: {
    en: [
      'The gallery is grouped by the kind of session rather than by date, because that is how anyone looking for a photographer actually browses: you want to see couples, or families, or weddings, and you want to see them in the place you are going to be. Filtering by category and tapping any frame opens it full screen.',
      'The credits matter more than a gallery page usually admits. Each image on this site is listed on the photo credits page with its photographer and its licence, and licensed stock is marked as such rather than passed off as client work. A portfolio that will not tell you where its photographs came from is telling you something.',
      'What the gallery is for is calibration, not decoration. Looking at twenty couple sessions from the Algarve tells you what the light does on that coast at the hour those were made, and whether that is what you want. It is a more useful question than whether the photographs are good, because by this point almost everyone’s are.',
      'If you see a frame you want a version of, the service pages say what each session includes, how long it runs and what it costs, and enquiring needs no deposit.',
    ],
    pt: [
      'A galeria está agrupada por tipo de sessão e não por data, porque é assim que quem procura um fotógrafo de facto navega: quer ver casais, ou famílias, ou casamentos, e quer vê-los no sítio onde vai estar. Filtre por categoria e toque numa imagem para a abrir em ecrã inteiro.',
      'Os créditos importam mais do que uma página de galeria costuma admitir. Cada imagem deste site está listada na página de créditos fotográficos com o respectivo autor e licença, e as imagens de stock licenciadas estão identificadas como tal em vez de passarem por trabalho de cliente. Um portefólio que não lhe diz de onde vêm as fotografias está a dizer-lhe alguma coisa.',
      'A galeria serve para calibrar, não para decorar. Ver vinte sessões de casal no Algarve diz-lhe o que a luz faz naquela costa à hora a que foram feitas, e se é isso que quer. É uma pergunta mais útil do que se as fotografias são boas, porque a esta altura as de quase toda a gente são.',
      'Se vir uma imagem de que quer uma versão, as páginas de cada serviço dizem o que a sessão inclui, quanto dura e quanto custa, e pedir orçamento não obriga a sinal nenhum.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Photographs shown', value: '{count}' },
      { label: 'Categories', value: '9' },
      { label: 'Cities covered', value: '12' },
      { label: 'Photo credits', value: 'Published' },
    ],
    pt: [
      { label: 'Fotografias mostradas', value: '{count}' },
      { label: 'Categorias', value: '9' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Créditos das fotos', value: 'Publicados' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;

/** SEO_PROSE facts with the live photograph count substituted in. */
export function seoFacts(locale: Locale, photoCount: number) {
  return tx(SEO_PROSE.facts, locale).map((fact) => ({
    ...fact,
    value: fact.value.replace('{count}', String(photoCount)),
  }));
}
