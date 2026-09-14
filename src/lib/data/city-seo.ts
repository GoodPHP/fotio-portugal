import type { Localized } from '../locales';

/**
 * Per-city SERP copy.
 *
 * Kept apart from the city records for one reason: the generated alternative
 * was a single template with the name and region substituted in, which gave
 * twenty-two pages the same meta description and taught a crawler that they
 * were interchangeable. They are not — each city here is sold on the one fact
 * that actually changes how a session there is planned.
 *
 * `check-seo.ts` asserts that every published city has an entry and that both
 * strings fit the SERP limits, so a new city cannot quietly fall back to
 * boilerplate.
 */

export interface CitySeo {
  /** ≤52 chars: the layout appends the brand suffix to reach the 60-char limit. */
  title: Localized;
  /** 150–160 chars. */
  description: Localized;
}

export const CITY_SEO: Record<string, CitySeo> = {
  lisboa: {
    title: { en: 'Photographer in Lisbon', pt: 'Fotógrafo em Lisboa' },
    description: {
      en: 'Book a photographer in Lisbon. The miradouros work at sunrise and the river at sunset — we plan the session around that. Fixed price, gallery in 48–72h.',
      pt: 'Fotógrafo em Lisboa. Os miradouros resultam ao nascer do sol e o rio ao fim da tarde — a sessão planeia-se por aí. Preço fixo, galeria em 48–72 h.',
    },
  },
  porto: {
    title: { en: 'Photographer in Porto', pt: 'Fotógrafo no Porto' },
    description: {
      en: 'Book a photographer in Porto. Gaia lights in the morning, Ribeira in the evening, and which bank you start on decides the rest. Fixed price, gallery in 48–72h.',
      pt: 'Fotógrafo no Porto. Gaia acende de manhã, a Ribeira ao fim da tarde, e a margem por onde começa decide o resto. Preço fixo, galeria em 48–72 h.',
    },
  },
  sintra: {
    title: { en: 'Photographer in Sintra', pt: 'Fotógrafo em Sintra' },
    description: {
      en: 'Book a photographer in Sintra. The palaces are ticketed and need written permission; the forest between them is free and photographs better. Fixed price.',
      pt: 'Fotógrafo em Sintra. Os palácios são a bilhete e exigem autorização; a floresta entre eles é gratuita e fotografa melhor. Preço fixo, galeria em 48–72 h.',
    },
  },
  cascais: {
    title: { en: 'Photographer in Cascais', pt: 'Fotógrafo em Cascais' },
    description: {
      en: 'Book a photographer in Cascais, 33 minutes from Lisbon. A south-facing bay that holds light late into the morning, and Guincho before the wind. Fixed price.',
      pt: 'Fotógrafo em Cascais, a 33 minutos de Lisboa. Uma baía virada a sul que aguenta luz até tarde de manhã, e o Guincho antes da nortada. Preço fixo.',
    },
  },
  algarve: {
    title: { en: 'Photographer in the Algarve', pt: 'Fotógrafo no Algarve' },
    description: {
      en: 'Book a photographer in the Algarve. The cliffs are the subject and the tide is the schedule — we check it when you book, not on the morning. Fixed price.',
      pt: 'Fotógrafo no Algarve. As arribas são o assunto e a maré é o horário — vemos a tabela ao marcar, não na manhã. Preço fixo, galeria em 48–72 h.',
    },
  },
  madeira: {
    title: { en: 'Photographer in Madeira', pt: 'Fotógrafo na Madeira' },
    description: {
      en: 'Book a photographer in Madeira. The photograph is above the cloud at Pico do Arieiro, and the car park fills before dawn. Fixed price, gallery in 48–72h.',
      pt: 'Fotógrafo na Madeira. A fotografia está acima da nuvem no Pico do Arieiro, e o parque enche antes de amanhecer. Preço fixo, galeria em 48–72 h.',
    },
  },
  acores: {
    title: { en: 'Photographer in the Azores', pt: 'Fotógrafo nos Açores' },
    description: {
      en: 'Book a photographer in the Azores. São Miguel gets four seasons in a day, so you book a window rather than a date. Fixed price, gallery in 48–72h.',
      pt: 'Fotógrafo nos Açores. São Miguel tem quatro estações num dia, por isso reserva-se uma janela e não uma data. Preço fixo, galeria em 48–72 h.',
    },
  },
  douro: {
    title: { en: 'Photographer in the Douro', pt: 'Fotógrafo no Douro' },
    description: {
      en: 'Book a photographer in the Douro. The only place where the date matters more than the hour: the harvest runs September to mid-October. Fixed price.',
      pt: 'Fotógrafo no Douro. O único sítio onde a data importa mais do que a hora: a vindima corre de Setembro a meados de Outubro. Preço fixo, galeria em 72 h.',
    },
  },
  evora: {
    title: { en: 'Photographer in Évora', pt: 'Fotógrafo em Évora' },
    description: {
      en: 'Book a photographer in Évora. A walled town you cross in eleven minutes, so one session uses six locations. Not between eleven and six in summer.',
      pt: 'Fotógrafo em Évora. Uma vila intramuros que se atravessa em onze minutos, por isso uma sessão usa seis locais. No Verão, não entre as onze e as seis.',
    },
  },
  coimbra: {
    title: { en: 'Photographer in Coimbra', pt: 'Fotógrafo em Coimbra' },
    description: {
      en: 'Book a photographer in Coimbra. Finalistas sessions in capa e batina around the Queima das Fitas in May and the Latada in October. Fixed price.',
      pt: 'Fotógrafo em Coimbra. Sessões de finalistas de capa e batina à volta da Queima das Fitas em Maio e da Latada em Outubro. Preço fixo, galeria em 72 h.',
    },
  },
  braga: {
    title: { en: 'Photographer in Braga', pt: 'Fotógrafo em Braga' },
    description: {
      en: 'Book a wedding photographer in Braga and the Minho. Saturdays in season go a year ahead, and the church rules are asked before the day. Fixed price.',
      pt: 'Fotógrafo de casamento em Braga e no Minho. Os sábados de época esgotam com um ano de antecedência, e as regras da igreja perguntam-se antes. Preço fixo.',
    },
  },
  comporta: {
    title: { en: 'Photographer in Comporta', pt: 'Fotógrafo na Comporta' },
    description: {
      en: 'Book a photographer in Comporta. Sixty kilometres of empty sand, rice paddies that mirror the sky in spring, and umbrella pines. Fixed price.',
      pt: 'Fotógrafo na Comporta. Sessenta quilómetros de areia vazia, arrozais que espelham o céu na Primavera, e pinhal manso. Preço fixo, galeria em 48–72 h.',
    },
  },
};
