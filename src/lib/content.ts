import type { City, Service } from './types';
import { type Locale, tx } from './locales';
import { localizedCityName } from './catalog';
import { ptAt, ptOf, ptRegionAt } from './pt-grammar';
import { LEAF_SEO } from './data/leaf-seo';
import { TITLE_MAX } from './seo-text';
import { formatDuration, formatPrice } from './site';
import { SITE_NAME } from './site';

export interface ProgrammaticFAQ {
  question: string;
  answer: string;
}

export interface ProgrammaticContent {
  answerBox: string;
  introParagraph: string;
  sampleRoute: string;
  /** When in the day and the year this combination works. Composed, not copied. */
  timingParagraph: string;
  detailsText: string;
  customFAQs: ProgrammaticFAQ[];
}

/**
 * Composed copy for a `service × city` page.
 *
 * The previous version of this function took the city name, the service name
 * and three numbers and substituted them into a fixed paragraph, which made a
 * hundred and twenty-five pages that differed in two proper nouns. That is the
 * thin content the curated-leaf system exists to avoid, and curating *which*
 * pages get indexed does not help if the copy on them is interchangeable.
 *
 * So this now composes from the authored data that already varies: the city's
 * lede, the names and hours of its photo spots, their permit position, and the
 * service's own deliverables and figures. Two leaves in one city differ by the
 * service's deliverables and by which spots suit it; two cities for one service
 * differ by lede, spots and permits. `LEAF_SEO` overrides the framing paragraph
 * for the combinations we have actually written.
 */
export function generateProgrammaticContent(
  city: City,
  service: Service,
  locale: Locale,
): ProgrammaticContent {
  const cityName = localizedCityName(city, locale);
  const serviceName = tx(service.name, locale);
  const regionName = tx(city.region, locale);
  const startingPrice = service.initialPrice;
  const duration = service.durationMinutes;
  const photoCount = service.editedPhotos;

  const spots = city.spots;
  const keySpot = spots[0];
  const keySpotName = keySpot?.name ?? cityName;
  const secondSpot = spots[1];
  const keySpotTime = keySpot ? tx(keySpot.bestTime, locale) : '';
  // The city's own one-line thesis. Unique per city, and the sentence that
  // explains why a session here is planned the way it is.
  const lede = tx(city.lede, locale);
  const deliverables = tx(service.deliverables, locale);
  // Paid or restricted access is the part a visitor cannot look up; free spots
  // are not worth listing, so only the constraints are named.
  const permitNotes = spots
    .map((s) => ({ name: s.name, cost: tx(s.permitCost, locale) }))
    .filter((s) => !/^(free|gr[aá]tis|gratuito|livre|sem custo)\b/i.test(s.cost));
  const authored = LEAF_SEO[`${service.slug}--${city.slug}`];

  const durationLabel = formatDuration(duration, locale);
  const priceLabel = formatPrice(startingPrice, locale);
  // Anything from four hours up is coverage of an event rather than a walk
  // between two locations, and describing it as a route reads as nonsense.
  const isCoverage = duration >= 240;

  if (locale === 'pt') {
    return {
      answerBox: `${serviceName} ${ptAt(city)} — desde ${priceLabel}. ${durationLabel} no local com um fotógrafo local verificado e ${photoCount} fotografias editadas entregues numa galeria privada em 48 a 72 horas. O preço é acordado antes de reservar e não muda.`,

      introParagraph: authored
        ? tx(authored.angle, locale)
        : `${lede} É isso que decide como se prepara aqui uma sessão de ${serviceName.toLowerCase()}: o fotógrafo que vai consigo vive ${ptAt(city)} e trabalha ${ptRegionAt(regionName)} o ano inteiro, por isso não está a conhecer o sítio ao mesmo tempo que você. Esse conhecimento prévio é a diferença entre uma sessão que cumpre o horário e uma sessão passada à procura de enquadramento.`,

      // Portuguese place names carry their own article — "a Ribeira", "o
      // Miradouro da Graça" — so no preposition can be glued in front of one.
      // Hence "Ponto de partida:" rather than "Começamos em…".
      sampleRoute: isCoverage
        ? `A cobertura dura ${durationLabel} e segue o seu programa, não um percurso fixo. Quando abre um intervalo para fotografias compostas, saímos até ${keySpotName}${secondSpot ? ` ou ${secondSpot.name}` : ''} — poucos minutos a pé, que é outro tanto que não se tira ao dia.`
        : secondSpot
          ? `O percurso habitual dura ${durationLabel} e faz-se a pé. Ponto de partida: ${keySpotName}, depois ${secondSpot.name}. Dois locais em vez de um dão dois fundos distintos sem entrar no carro, e o caminho entre eles produz as fotografias feitas em movimento — muitas vezes as mais verdadeiras do conjunto.`
          : `O percurso habitual dura ${durationLabel} e faz-se a pé. Ponto de partida: ${keySpotName}. Alternamos enquadramentos compostos com sequências mais soltas a andar, para ter vários registos sem mudar de zona nem perder tempo em deslocações.`,

      timingParagraph: keySpotTime
        ? `A hora conta mais do que o sítio. Janela a apanhar para ${keySpotName}: ${keySpotTime.toLowerCase()}. A sessão dura ${durationLabel} e organiza-se à volta dessa janela, não da sua agenda — é a única variável que muda mesmo as fotografias, e não custa nada.`
        : `A hora conta mais do que o sítio. A sessão dura ${durationLabel} e marca-se ${ptAt(city)} ao nascer do dia ou na hora antes do pôr do sol, quando a luz é baixa e há pouca gente.`,

      detailsText: `O pacote de ${serviceName.toLowerCase()} ${ptAt(city)} inclui: ${deliverables.join('; ')}. Não há suplementos depois da sessão. ${
        permitNotes.length > 0
          ? `Autorizações a ter em conta: ${permitNotes.map((p) => `${p.name} — ${p.cost}`).join('; ')}.`
          : `Os locais que usamos são via pública e não exigem autorização paga.`
      }`,

      customFAQs: [
        {
          question: `${serviceName} ${ptAt(city)}: a que horas marcar a sessão?`,
          answer: keySpotTime
            ? `Para ${keySpotName}, aponte para ${keySpotTime.toLowerCase()}. Num local movimentado, duas horas para um lado ou para o outro mudam por completo o que é possível enquadrar.`
            : `Ao nascer do dia, ou na hora antes do pôr do sol. Duas horas para um lado ou para o outro mudam por completo o que é possível enquadrar.`,
        },
        {
          question: `É preciso autorização para fotografar ${ptAt(city)}?`,
          answer:
            permitNotes.length > 0
              ? `Nalguns locais, sim: ${permitNotes.map((p) => `${p.name} (${p.cost})`).join('; ')}. O fotógrafo trata disso e diz-lhe na reserva, não no próprio dia.`
              : `Não nos locais que usamos para esta sessão: são via pública e espaço aberto. Se o seu pedido sair desse âmbito, dizemos-lhe antes de reservar.`,
        },
        {
          question: `O que acontece se chover ${ptAt(city)}?`,
          answer: `Passamos a sessão para outra hora ou outro dia, sem custo. Se estiver cá pouco tempo, mudamos para locais abrigados já reconhecidos em vez de cancelar.`,
        },
        {
          question: `Quando recebemos as fotografias ${ptOf(city)}?`,
          answer: `Em 48 a 72 horas, numa galeria privada online: ${photoCount} imagens editadas, para descarregar em resolução máxima a partir de qualquer país.`,
        },
      ],
    };
  }

  return {
    answerBox: `${serviceName} in ${cityName} — from ${priceLabel}. ${durationLabel} on location with a vetted local photographer, and ${photoCount} edited photos delivered to a private gallery within 48–72 hours. The price is agreed before you book and does not move.`,

    introParagraph: authored
      ? tx(authored.angle, locale)
      : `${lede} That is what decides how a ${serviceName} session is planned here: the photographer you work with lives in ${cityName} and shoots across ${regionName} all year, so they are not seeing the place for the first time alongside you. That prior knowledge is the difference between a session that keeps to its schedule and one spent looking for a frame.`,

    sampleRoute: isCoverage
      ? `Coverage runs ${durationLabel} and follows your schedule rather than a fixed route. When a gap opens for composed frames, we step out to ${keySpotName}${secondSpot ? ` or ${secondSpot.name}` : ''} — a few minutes on foot, which is that much less taken out of the day.`
      : secondSpot
        ? `The typical route runs ${durationLabel} and stays on foot. We start at ${keySpotName} and move on to ${secondSpot.name}. Two locations rather than one give you two distinct backdrops without getting into a car, and the walk between them produces the frames made in motion — frequently the truest of the set.`
        : `The typical route runs ${durationLabel} and stays on foot, around ${keySpotName}. We alternate composed frames with looser walking sequences, so you get several registers without changing neighbourhood or losing time in transit.`,

    timingParagraph: keySpotTime
      ? `The hour matters more than the location. For ${keySpotName}, the window to aim for is ${keySpotTime.toLowerCase()}. The session runs ${durationLabel} and is built around that window rather than around your diary — it is the one variable that genuinely changes the photographs, and it costs nothing.`
      : `The hour matters more than the location. The session runs ${durationLabel}, and in ${cityName} it is booked at first light or in the hour before sunset, when the light is low and the crowds are thin.`,

    detailsText: `The ${serviceName} package in ${cityName} covers: ${deliverables.join('; ')}. Nothing is added to the price after the session. ${
      permitNotes.length > 0
        ? `Permits worth knowing about: ${permitNotes.map((p) => `${p.name} — ${p.cost}`).join('; ')}.`
        : `The locations we use are public streets and need no paid authorisation.`
    }`,

    customFAQs: [
      {
        question: `${serviceName} in ${cityName}: what time should we book?`,
        answer: keySpotTime
          ? `For ${keySpotName}, aim for ${keySpotTime.toLowerCase()}. At a busy location, two hours either way changes what can be framed at all.`
          : `At first light, or in the hour before sunset. Two hours either way changes what can be framed at all.`,
      },
      {
        question: `Do we need a permit to photograph in ${cityName}?`,
        answer:
          permitNotes.length > 0
            ? `At some locations, yes: ${permitNotes.map((p) => `${p.name} (${p.cost})`).join('; ')}. The photographer handles it and tells you at booking, not on the day.`
            : `Not at the locations we use for this session — they are public streets and open spaces. If your request falls outside that, we say so before you book.`,
      },
      {
        question: `What happens if it rains in ${cityName}?`,
        answer: `We move the session to another slot or another day at no cost. If you are only in town briefly, we switch to sheltered locations scouted in advance rather than cancelling.`,
      },
      {
        question: `When do we get the photos from ${cityName}?`,
        answer: `Within 48–72 hours, in a private online gallery: ${photoCount} edited images, downloadable at full resolution from any country.`,
      },
    ],
  };
}

/**
 * SEO title & meta description for the `service × city` leaf pages.
 *
 * Authored in `leaf-seo.ts` for the combinations that carry the most demand;
 * composed from the catalogue for the rest, which are `noindex` anyway and so
 * are never competing on a meta description.
 */
export function getSeoMetadata(
  city: City,
  service: Service,
  locale: Locale,
): { title: string; description: string } {
  const authored = LEAF_SEO[`${service.slug}--${city.slug}`];
  if (authored) {
    return { title: tx(authored.title, locale), description: tx(authored.description, locale) };
  }

  const cityName = localizedCityName(city, locale);
  const serviceName = tx(service.name, locale);
  const priceLabel = formatPrice(service.initialPrice, locale);
  const photoCount = service.editedPhotos;
  const durationLabel = formatDuration(service.durationMinutes, locale);

  if (locale === 'pt') {
    // "Fotógrafo de Fotografia gastronómica no Porto" is both too long and
    // badly written: some service names already begin with the noun. Where the
    // prefix does not fit or would double up, the name carries the title alone
    // — the H1 and the description still say fotógrafo.
    const plain = `${serviceName} ${ptAt(city)} | ${SITE_NAME}`;
    const prefixed = `Fotógrafo de ${serviceName.toLowerCase()} ${ptAt(city)} | ${SITE_NAME}`;
    const doublesUp = /^fot[oó]/i.test(serviceName);
    return {
      title: !doublesUp && prefixed.length <= TITLE_MAX ? prefixed : plain,
      description: `${serviceName} ${ptAt(city)} com um fotógrafo local verificado. Desde ${priceLabel}, ${durationLabel} no local, ${photoCount} fotografias editadas, galeria privada em 48-72 h.`,
    };
  }

  // "Riviera honeymoon session Photographer in Saint-Tropez" reads badly and
  // overruns; the shorter form keeps the city and the service intact, which is
  // what the query actually contains.
  const withPhotographer = `${serviceName} Photographer in ${cityName} | ${SITE_NAME}`;
  return {
    title:
      withPhotographer.length <= TITLE_MAX
        ? withPhotographer
        : `${serviceName} in ${cityName} | ${SITE_NAME}`,
    description: `${serviceName} in ${cityName} with a vetted local photographer. From ${priceLabel}, ${durationLabel} on location, ${photoCount} edited photos, gallery in 48-72h.`,
  };
}
