import { tx, type Locale, type Localized } from '@/lib/locales';

/**
 * Search-facing copy for the reviews page: SERP title and description, plus the
 * long-form passage that closes the page below the review wall.
 *
 * The rating and the review count are interpolated from the catalogue rather
 * than typed out, so a new review cannot leave the copy claiming an old figure.
 *
 * English is authored; French falls back to it via `tx()` until translated.
 */

/**
 * Two shapes, because the honest copy at zero reviews is not the copy at
 * fifty. A SERP entry claiming "Rated 0/5" is worse than one that makes no
 * rating claim at all, and a page that invents reviews to avoid the problem is
 * worse than both — an aggregate rating is structured data, and a false one is
 * a false statement to a search engine and to a consumer regulator.
 */
const TITLE_TEMPLATE: Localized = {
  en: 'Photographer Reviews in Portugal — {rating}/5',
  pt: 'Avaliações de fotógrafos em Portugal — {rating}/5',
};

const TITLE_EMPTY: Localized = {
  en: 'Photographer Reviews in Portugal',
  pt: 'Avaliações de fotógrafos em Portugal',
};

const DESCRIPTION_TEMPLATE: Localized = {
  en: 'What couples, families and companies said after their session in Portugal, rated {rating}/5. Every review names the place and the type of session.',
  pt: 'O que casais, famílias e empresas disseram depois da sessão em Portugal, com {rating}/5. Cada avaliação indica o sítio e o tipo de sessão.',
};

const DESCRIPTION_EMPTY: Localized = {
  en: 'Reviews from clients photographed across Portugal. Published as written, including the awkward ones — and nothing is published before it exists.',
  pt: 'Avaliações de clientes fotografados em todo o Portugal. Publicadas tal como são escritas — e nada é publicado antes de existir.',
};

function fill(template: Localized, locale: Locale, rating: number, count: number): string {
  return tx(template, locale)
    .replace('{rating}', String(rating))
    .replace('{count}', String(count));
}

export function metaTitle(locale: Locale, rating: number, count: number): string {
  return count === 0 ? tx(TITLE_EMPTY, locale) : fill(TITLE_TEMPLATE, locale, rating, count);
}

export function metaDescription(locale: Locale, rating: number, count: number): string {
  return count === 0
    ? tx(DESCRIPTION_EMPTY, locale)
    : fill(DESCRIPTION_TEMPLATE, locale, rating, count);
}

export const OG_IMAGE_ALT: Localized = {
  en: 'A couple session on the Algarve coast, one of the sessions reviewed on this page',
  pt: 'Uma sessão de casal na costa do Algarve, uma das sessões avaliadas nesta página',
};

export const SEO_PROSE = {
  eyebrow: { en: 'About these reviews', pt: 'Sobre estas avaliações' } as Localized,
  heading: {
    en: 'Published as written, including the awkward ones',
    pt: 'Publicadas tal como são escritas, incluindo as incómodas',
  } as Localized,
  paragraphs: {
    en: [
      'Every review on this page comes from someone who booked and paid for a session. We ask once, after the gallery has been delivered, and we publish what comes back — we do not select for flattery and we do not remove a review because it is critical.',
      'Each one names the place and the type of session, because that is what makes a review useful. "Great photographer" tells you nothing; a family session in the Algarve in August, or a headshot day for a team of twelve in Porto, tells you whether the experience resembles the one you are about to book.',
      'Ratings feed the aggregate score, and that score is arithmetic rather than editorial: it moves when the reviews move. If work slips, it shows here before it shows anywhere else, which is precisely why the number is published rather than summarised. Where there are no reviews yet, no score is shown and none is claimed — an aggregate rating invented to fill a space is a false statement to a search engine as much as to a reader.',
      'If your own session did not go the way it should have, tell us rather than the internet first — the money-back guarantee is not conditional on staying quiet, and a refund and an honest review can perfectly well coexist.',
    ],
    pt: [
      'Todas as avaliações desta página são de alguém que reservou e pagou uma sessão. Perguntamos uma vez, depois de a galeria estar entregue, e publicamos o que vem — não seleccionamos pelo elogio e não removemos uma avaliação por ser crítica.',
      'Cada uma indica o sítio e o tipo de sessão, porque é isso que torna uma avaliação útil. "Excelente fotógrafo" não diz nada; uma sessão de família no Algarve em Agosto, ou um dia de retratos para uma equipa de doze pessoas no Porto, diz-lhe se a experiência se parece com aquela que está prestes a reservar.',
      'As classificações alimentam a nota agregada, e essa nota é aritmética e não editorial: mexe quando as avaliações mexem. Se o trabalho piorar, vê-se aqui antes de se ver em qualquer outro lado, e é precisamente por isso que o número é publicado em vez de resumido. Onde ainda não há avaliações, não se mostra nota nenhuma nem se reclama nenhuma — uma nota agregada inventada para preencher um espaço é uma falsidade dita a um motor de busca tanto como a um leitor.',
      'Se a sua sessão não tiver corrido como devia, diga-nos a nós antes de dizer à internet — a garantia de reembolso não depende de ficar calado, e um reembolso e uma avaliação honesta podem perfeitamente coexistir.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Average rating', value: '{rating}/5' },
      { label: 'Reviews published', value: '{count}' },
      { label: 'Removed for criticism', value: '0' },
      { label: 'Money-back guarantee', value: '100%' },
    ],
    pt: [
      { label: 'Avaliação média', value: '{rating}/5' },
      { label: 'Avaliações publicadas', value: '{count}' },
      { label: 'Removidas por serem críticas', value: '0' },
      { label: 'Garantia de reembolso', value: '100%' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;

/** SEO_PROSE facts with the live rating and review count substituted in. */
export function seoFacts(locale: Locale, rating: number, count: number) {
  return tx(SEO_PROSE.facts, locale).map((fact) => ({
    ...fact,
    value: fact.value.replace('{rating}', String(rating)).replace('{count}', String(count)),
  }));
}
