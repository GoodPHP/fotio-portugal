import type { Localized } from '../locales';

/**
 * One in-text link from a city hub to the `service × city` page that search
 * already associates with that city.
 *
 * The services grid links every live leaf, but a grid card is a weak signal
 * next to a sentence in the page's own copy. A city gets an entry here only
 * when Search Console shows the hub ranking for a service query the leaf was
 * written for (Évora: "evora wedding photographer", the site's best query in
 * October 2026, landing on the hub). The sentence renders only while the leaf
 * is live in that locale, so it can never point at a 404.
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
};
