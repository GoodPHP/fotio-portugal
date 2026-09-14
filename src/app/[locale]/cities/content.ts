import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the cities hub: SERP title and description, plus the
 * long-form passage that closes the page below the searchable directory.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Where We Photograph in Portugal',
  pt: 'Onde fotografamos em Portugal',
};

export const META_DESCRIPTION: Localized = {
  en: 'Twelve places across Portugal, from Lisboa and Porto to the Algarve, Madeira, the Açores and the Douro. Local photographers who know the hour, not just the place.',
  pt: 'Doze sítios em Portugal, de Lisboa e Porto ao Algarve, Madeira, Açores e Douro. Fotógrafos locais que sabem a hora, e não apenas o sítio.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A view over Lisbon, one of the twelve places covered across Portugal',
  pt: 'Uma vista sobre Lisboa, um dos doze sítios cobertos em todo o Portugal',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these places', pt: 'Sobre estes sítios' } as Localized,
  heading: {
    en: 'Twelve places, and three of them are not cities',
    pt: 'Doze sítios, e três deles não são cidades',
  } as Localized,
  paragraphs: {
    en: [
      'Six cities people live and work in — Lisboa, Porto, Cascais, Braga, Coimbra and Évora — and six places people travel to: Sintra, the Algarve, Madeira, the Açores, the Douro and Comporta. Three of the second group are not cities at all, and saying so matters: the Algarve is a coastline, Madeira and the Açores are islands, and treating any of them as a town produces the wrong page.',
      'The Algarve is one page rather than six because Lagos and Albufeira are forty minutes apart and sell the same work to the same people on the same mornings. Splitting them would produce two descriptions of one coast, competing with each other for the same search. The same logic makes Madeira the page rather than Funchal: you sleep in Funchal and the photograph is at eighteen hundred metres.',
      'What each page carries is the thing a visiting photographer would not know. Which direction a viewpoint faces and therefore what hour it works. Whether a location needs written permission and from whom — Sintra has two separate regimes, because Quinta da Regaleira is not run by Parques de Sintra. Whether the tide decides if a beach exists. Which week the Douro harvest falls in, which nobody can tell you in March.',
      'Every place is covered by a photographer who lives there, and each page lists the surrounding towns covered from it at no travel charge rather than giving them thin pages of their own.',
    ],
    pt: [
      'Seis cidades onde se vive e trabalha — Lisboa, Porto, Cascais, Braga, Coimbra e Évora — e seis sítios para onde se viaja: Sintra, Algarve, Madeira, Açores, Douro e Comporta. Três do segundo grupo não são cidades, e dizê-lo importa: o Algarve é uma costa, a Madeira e os Açores são ilhas, e tratar qualquer um deles como uma vila dá a página errada.',
      'O Algarve é uma página e não seis porque Lagos e Albufeira estão a quarenta minutos um do outro e vendem o mesmo trabalho às mesmas pessoas nas mesmas manhãs. Separá-los daria duas descrições da mesma costa, a concorrer uma com a outra pela mesma pesquisa. A mesma lógica faz da Madeira a página em vez do Funchal: dorme-se no Funchal e a fotografia é a mil e oitocentos metros.',
      'O que cada página traz é aquilo que um fotógrafo de fora não saberia. Para onde está virado um miradouro e portanto a que hora resulta. Se um local precisa de autorização escrita e de quem — Sintra tem dois regimes distintos, porque a Quinta da Regaleira não é gerida pela Parques de Sintra. Se é a maré que decide se a praia existe. Em que semana cai a vindima no Douro, que ninguém lhe diz em Março.',
      'Cada sítio é coberto por um fotógrafo que lá vive, e cada página lista as localidades cobertas a partir dele sem suplemento de deslocação, em vez de lhes dar páginas próprias sem conteúdo.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities & destinations', value: '12' },
      { label: 'Cities', value: '6' },
      { label: 'Travel destinations', value: '6' },
      { label: 'Travel surcharge', value: 'None' },
    ],
    pt: [
      { label: 'Cidades & destinos', value: '12' },
      { label: 'Cidades', value: '6' },
      { label: 'Destinos de viagem', value: '6' },
      { label: 'Suplemento de deslocação', value: 'Nenhum' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
