import type { Localized } from '../locales';

/**
 * One in-text link from a city hub to the `service × city` page that search
 * already associates with that city.
 *
 * The services grid links every live leaf, but a grid card is a weak signal
 * next to a sentence in the page's own copy. A city gets an entry here only
 * when Search Console shows the hub ranking for a service query the leaf was
 * written for (Évora: "evora wedding photographer", the site's best query in
 * October 2026, landing on the hub; Lisbon: "lisbon photographer" and
 * "lisbon photoshoot", landing on the hub at positions 20–60; Sintra:
 * "fotógrafo casamento sintra", split between the proposal and couple leaves
 * at position ~45 while the wedding leaf is not indexed). The sentence
 * renders only while the leaf is live in that locale, so it can never point
 * at a 404.
 */

export interface CityFeature {
  service: string;
  before: Localized;
  link: Localized;
  after: Localized;
}

export const CITY_FEATURED_LEAF: Record<string, CityFeature> = {
  evora: {
    service: 'wedding',
    before: {
      en: 'Getting married here? The same short distances make the portraits between ceremony and dinner a walk rather than a drive. How the day is timed around the summer heat, and which stops suit the evening light, is on the page for our ',
      pt: 'Vai casar aqui? As mesmas distâncias curtas fazem dos retratos entre a cerimónia e o jantar um passeio, e não uma viagem de carro. Como se organiza o dia à volta do calor de Verão, e que paragens servem a luz do fim da tarde, está na página do nosso ',
    },
    link: { en: 'wedding photographer in Évora', pt: 'fotógrafo de casamento em Évora' },
    after: { en: '.', pt: '.' },
  },
  lisboa: {
    service: 'lisbon-photoshoot',
    before: {
      en: 'Most people who come for photographs in Lisbon want the same picture: the two of them, or the family, with the whole city below. That is the ',
      pt: 'Quase toda a gente que vem fotografar a Lisboa quer a mesma imagem: os dois, ou a família, com a cidade inteira lá em baixo. É a ',
    },
    link: { en: 'Lisbon photoshoot', pt: 'sessão fotográfica em Lisboa' },
    after: {
      en: ': thirty minutes at Senhora do Monte in the first hour after sunrise, usually before anyone else is there.',
      pt: ': trinta minutos na Senhora do Monte na primeira hora depois do nascer do sol, quase sempre antes de lá chegar mais alguém.',
    },
  },
  sintra: {
    service: 'wedding',
    before: {
      en: 'For a wedding here, the couple portraits usually go to the forest road above the village, which is public, free and quiet; a palace in the frame needs written authorisation from Parques de Sintra, so it is planned early. Timing, permits and the summer traffic on the hill are on the page for our ',
      pt: 'Num casamento aqui, os retratos dos noivos fazem-se quase sempre na estrada da serra acima da vila, que é pública, gratuita e calma; um palácio no enquadramento precisa de autorização escrita da Parques de Sintra, por isso planeia-se cedo. Horários, autorizações e o trânsito de Verão na serra estão na página do nosso ',
    },
    link: { en: 'wedding photographer in Sintra', pt: 'fotógrafo de casamento em Sintra' },
    after: { en: '.', pt: '.' },
  },
};
