import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the services hub: SERP title and description, plus the
 * long-form passage that closes the page below the filterable catalogue.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Photography Services in Portugal',
  pt: 'Serviços de fotografia em Portugal',
};

export const META_DESCRIPTION: Localized = {
  en: '22 session types across Portugal: portraits, couples, families, weddings, corporate and food. The price is agreed before you book, the gallery in 48–72h.',
  pt: '22 tipos de sessão em Portugal: retrato, casal, família, casamento, empresa e gastronomia. O preço é acordado antes de reservar, a galeria em 48–72 h.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A portrait session — one of twenty-two photography services available across Portugal',
  pt: 'Uma sessão de retrato — um dos vinte e dois serviços disponíveis em todo o Portugal',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these services', pt: 'Sobre estes serviços' } as Localized,
  heading: {
    en: 'One catalogue, one price list, twenty-two kinds of session',
    pt: 'Um catálogo, uma tabela de preços, vinte e dois tipos de sessão',
  } as Localized,
  paragraphs: {
    en: [
      'The catalogue above is the whole of what is shot, grouped into nine families: portrait and personal branding, couples and proposals, family and newborn, weddings and elopements, travel and holidays, business and corporate, commercial and food, fashion, and the sessions that fit nowhere else.',
      'The list is deliberately not the same in both languages. English carries the work people fly here for — destination weddings, honeymoons, a morning in Lisbon — and Portuguese carries the work people book because they live here: batizados, finalistas, corporate events. Publishing each list in the other language would produce pages aimed at nobody.',
      'Each service carries a starting price, and that price is the number you pay. It covers the photographer’s time, the selection and the colour work afterwards, and a private gallery in full resolution with a licence to print and post. There is no per-image charge, no retouching upsell and no travel supplement inside the area you booked.',
      'What separates the categories is time and coordination rather than equipment. A forty-five-minute headshot needs one photographer and a location scouted at the right hour. A wedding day needs a schedule agreed weeks ahead and someone who has already worked the venue. Corporate headshots need consistency across a team rather than one flattering frame, which is a different craft again.',
    ],
    pt: [
      'O catálogo acima é tudo o que se fotografa, agrupado em nove famílias: retrato e personal branding, casais e pedidos de casamento, família e recém-nascido, casamentos e casamentos íntimos, viagem e férias, empresas e corporativo, comercial e gastronomia, moda, e as sessões que não cabem em mais lado nenhum.',
      'A lista não é propositadamente a mesma nas duas línguas. Em inglês está o trabalho para quem vem de avião — casamentos de destino, luas de mel, uma manhã em Lisboa — e em português está o trabalho de quem cá vive: batizados, finalistas, eventos de empresa. Publicar cada lista na outra língua daria páginas dirigidas a ninguém.',
      'Cada serviço tem um preço de partida, e esse preço é o que paga. Cobre o tempo do fotógrafo, a selecção e o tratamento de cor, e uma galeria privada em resolução máxima com licença para imprimir e publicar. Não há cobrança por imagem, não há retoque vendido à parte e não há suplemento de deslocação dentro da área que reservou.',
      'O que separa as categorias é tempo e coordenação, não equipamento. Um retrato corporativo de quarenta e cinco minutos precisa de um fotógrafo e de um local reconhecido à hora certa. Um dia de casamento precisa de um horário acordado semanas antes e de alguém que já tenha trabalhado naquela quinta. Retratos de equipa precisam de coerência entre quarenta pessoas e não de uma fotografia bonita, o que é outro ofício.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Session types', value: '22' },
      { label: 'Categories', value: '9' },
      { label: 'Cities covered', value: '12' },
      { label: 'Gallery delivery', value: '48–72h' },
    ],
    pt: [
      { label: 'Tipos de sessão', value: '22' },
      { label: 'Categorias', value: '9' },
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Entrega da galeria', value: '48–72h' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
