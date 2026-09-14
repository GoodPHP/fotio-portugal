import type { Localized } from '@/lib/locales';

/**
 * Search-facing copy for the pricing page: SERP title and description, plus the
 * long-form passage that closes the page below the price table.
 *
 * Both languages are authored rather than translated.
 */

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'Photography Prices in Portugal',
  pt: 'Preços de fotografia em Portugal',
};

export const META_DESCRIPTION: Localized = {
  en: 'Published starting prices for every session type, from €150. The quote is confirmed in writing before you book and does not move afterwards. No deposit to ask.',
  pt: 'Preços de partida publicados para cada tipo de sessão, desde 150 €. O orçamento é confirmado por escrito antes de reservar e não muda depois.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A family session photographed in Portugal, priced from a fixed published rate',
  pt: 'Uma sessão de família fotografada em Portugal, a partir de um preço fixo publicado',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About the pricing', pt: 'Sobre os preços' } as Localized,
  heading: {
    en: 'Why the price is published at all',
    pt: 'Porque é que o preço está publicado',
  } as Localized,
  paragraphs: {
    en: [
      'Most photography is quoted after a conversation, which means the number depends on what the photographer thinks you will pay. Publishing a starting price for every session removes that, and it is the reason the figures here are lower than they would be if you had to ask: a published price has to be defensible to everyone reading it, not just to the person in front of you.',
      'The starting price covers the photographer’s time on the session, the selection, the colour work, and a private gallery in full resolution with a licence to print and post. The number of edited photographs is stated per service rather than described as "a selection". There is no per-image charge and no retouching sold separately afterwards.',
      'What moves the price is time and scope rather than anything hidden. A longer session, a second photographer, twenty-four-hour delivery: each of those is listed as an option and quoted before you book. Travel inside the area you booked is included, and the towns covered from each place are listed on its page so there is nothing to discover afterwards.',
      'Nothing is due to get a quote. If the weather turns, the session moves at no cost; if what you receive is not what was described, you are refunded. Those two sentences are the whole of the guarantee and they are not conditional on anything.',
    ],
    pt: [
      'A maior parte da fotografia é orçamentada depois de uma conversa, o que quer dizer que o valor depende do que o fotógrafo acha que você paga. Publicar um preço de partida para cada sessão elimina isso, e é a razão por que estes números são mais baixos do que seriam se tivesse de perguntar: um preço publicado tem de se justificar perante toda a gente que o lê, e não só perante quem está à frente.',
      'O preço de partida cobre o tempo do fotógrafo na sessão, a selecção, o tratamento de cor e uma galeria privada em resolução máxima com licença para imprimir e publicar. O número de fotografias editadas está indicado em cada serviço, em vez de se falar numa "selecção". Não há cobrança por imagem nem retoque vendido à parte no fim.',
      'O que faz mexer o preço é tempo e âmbito, não coisas escondidas. Uma sessão mais longa, um segundo fotógrafo, entrega em vinte e quatro horas: cada uma dessas opções está listada e é orçamentada antes de reservar. A deslocação dentro da área reservada está incluída, e as localidades cobertas a partir de cada sítio estão na respectiva página, para não haver nada a descobrir depois.',
      'Pedir um orçamento não custa nada. Se o tempo mudar, a sessão passa para outro dia sem custo; se o que receber não for o que foi descrito, é reembolsado. Estas duas frases são toda a garantia e não dependem de mais nada.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'From', value: '€150' },
      { label: 'Full wedding day', value: '€2,200' },
      { label: 'Per extra photo', value: '€0' },
      { label: 'Deposit to enquire', value: '€0' },
    ],
    pt: [
      { label: 'Desde', value: '150 €' },
      { label: 'Dia completo de casamento', value: '2 200 €' },
      { label: 'Por fotografia extra', value: '0 €' },
      { label: 'Sinal para orçamento', value: '0 €' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
