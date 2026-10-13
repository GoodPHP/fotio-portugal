import type { City, Service } from './types';
import { type Locale, tx } from './locales';
import { localizedCityName } from './catalog';
import { ptAt, ptOf, ptRegionAt } from './pt-grammar';
import { getLeafCopy, type LeafCopy } from './leaf-copy';
import { TITLE_MAX } from './seo-text';
import { formatDelivery, formatDuration, formatPhotoCount, formatPrice } from './site';
import { SITE_NAME } from './site';
import { inPlace } from './cta';

export interface ProgrammaticFAQ {
  question: string;
  answer: string;
}

export interface LeafSection {
  id: 'why' | 'where' | 'when' | 'package';
  heading: string;
  body: string;
}

export interface ProgrammaticContent {
  /** Whether the copy is authored for this pairing — and so whether the page is indexable. */
  authored: boolean;
  h1: string;
  answerBox: string;
  sections: LeafSection[];
  faqTitle: string;
  customFAQs: ProgrammaticFAQ[];
}

/** "fotografia imobiliária e Alojamento Local", not "… alojamento local": only the first letter drops. */
function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/**
 * The headings, H1 included. Shared by every leaf, so they carry the query
 * and nothing else: the uniqueness of a page has to come from its copy.
 */
function headings(city: City, service: Service, locale: Locale) {
  const serviceName = tx(service.name, locale);
  const at = inPlace(city, locale);
  if (locale === 'pt') {
    return {
      h1: `${serviceName} ${at}`,
      why: `Porquê ${lowerFirst(serviceName)} ${at}?`,
      where: `Onde fotografamos ${at}`,
      when: `A melhor altura ${at}`,
      package: 'O que inclui o pacote?',
      faq: `Perguntas frequentes — ${lowerFirst(serviceName)} ${at}`,
    };
  }
  return {
    h1: `${serviceName} ${at}`,
    why: `Why choose ${serviceName} ${at}?`,
    where: `Where we photograph ${at}`,
    when: `The best time ${at}`,
    package: 'What does the package include?',
    faq: `FAQ — ${serviceName} ${at}`,
  };
}

/** The price line every leaf opens with. Figures from the catalogue only. */
function answerBox(city: City, service: Service, locale: Locale): string {
  const serviceName = tx(service.name, locale);
  const priceLabel = formatPrice(service.initialPrice, locale);
  const durationLabel = formatDuration(service.durationMinutes, locale);
  const photoCount = formatPhotoCount(service);
  const delivery = formatDelivery(service.deliveryHours, locale);
  const longerOnRequest = Boolean(service.editedPhotosMax);
  if (locale === 'pt') {
    return `${serviceName} ${ptAt(city)} — desde ${priceLabel}. ${durationLabel} no local com um fotógrafo local verificado e ${photoCount} fotografias editadas entregues numa galeria privada em ${delivery}.${longerOnRequest ? ' Sessões mais longas são orçamentadas a pedido.' : ''} O preço é acordado antes de reservar e não muda.`;
  }
  return `${serviceName} ${inPlace(city, 'en')} — from ${priceLabel}. ${durationLabel} on location with a vetted local photographer, and ${photoCount} edited photos delivered to a private gallery within ${delivery}.${longerOnRequest ? ' Longer sessions are quoted on request.' : ''} The price is agreed before you book and does not move.`;
}

/** What the package holds. The deliverables are the service's; the copy around them is one line. */
function packageText(city: City, service: Service, locale: Locale): string {
  const deliverables = tx(service.deliverables, locale);
  if (locale === 'pt') {
    return `O pacote ${ptAt(city)} inclui: ${deliverables.join('; ')}. Não há suplementos depois da sessão.`;
  }
  return `The package ${inPlace(city, 'en')} covers: ${deliverables.join('; ')}. Nothing is added to the price after the session.`;
}

function fromAuthored(city: City, service: Service, locale: Locale, copy: LeafCopy): ProgrammaticContent {
  const h = headings(city, service, locale);
  return {
    authored: true,
    h1: h.h1,
    answerBox: answerBox(city, service, locale),
    sections: [
      { id: 'why', heading: h.why, body: copy.intro },
      { id: 'where', heading: h.where, body: copy.where },
      { id: 'when', heading: h.when, body: copy.when },
      { id: 'package', heading: h.package, body: packageText(city, service, locale) },
    ],
    faqTitle: h.faq,
    customFAQs: copy.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  };
}

/**
 * Every visible word of the page's main column, in reading order — what the
 * uniqueness check measures. Blocks are separated by newlines so no shingle
 * runs from one block into the next.
 */
export function leafPageText(content: ProgrammaticContent): string {
  return [
    content.h1,
    content.answerBox,
    ...content.sections.flatMap((section) => [section.heading, section.body]),
    content.faqTitle,
    ...content.customFAQs.flatMap((faq) => [faq.question, faq.answer]),
  ].join('\n');
}

/**
 * Copy for a `service × city` page: the authored copy where it exists, and a
 * composition from city and service data where it does not.
 *
 * The composed path is a safety net for a pairing added before its copy is
 * written. Such a page renders but is `noindex`, and
 * `scripts/check-leaf-copy.ts` fails the build while it exists. What follows
 * describes that composition.
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
 * differ by lede, spots and permits.
 */
export function generateProgrammaticContent(
  city: City,
  service: Service,
  locale: Locale,
): ProgrammaticContent {
  const copy = getLeafCopy(service, city.slug, locale);
  if (copy) return fromAuthored(city, service, locale, copy);

  const h = headings(city, service, locale);
  const parts = composedParts(city, service, locale);
  return {
    authored: false,
    h1: h.h1,
    answerBox: parts.answerBox,
    sections: [
      { id: 'why', heading: h.why, body: parts.introParagraph },
      { id: 'where', heading: h.where, body: parts.sampleRoute },
      { id: 'when', heading: h.when, body: parts.timingParagraph },
      { id: 'package', heading: h.package, body: parts.detailsText },
    ],
    faqTitle: h.faq,
    customFAQs: parts.customFAQs,
  };
}

interface ComposedParts {
  answerBox: string;
  introParagraph: string;
  sampleRoute: string;
  timingParagraph: string;
  detailsText: string;
  customFAQs: ProgrammaticFAQ[];
}

function composedParts(city: City, service: Service, locale: Locale): ComposedParts {
  const cityName = localizedCityName(city, locale);
  const serviceName = tx(service.name, locale);
  const regionName = tx(city.region, locale);
  const startingPrice = service.initialPrice;
  const duration = service.durationMinutes;
  const photoCount = formatPhotoCount(service);
  const delivery = formatDelivery(service.deliveryHours, locale);
  // The base package is thirty minutes: one spot, not a walk between two.
  const twoSpots = city.spots.length > 1 && duration >= 60;
  // A session sold as a base package says that more time can be quoted.
  const longerOnRequest = Boolean(service.editedPhotosMax);

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

  const durationLabel = formatDuration(duration, locale);
  const priceLabel = formatPrice(startingPrice, locale);
  // Anything from four hours up is coverage of an event rather than a walk
  // between two locations, and describing it as a route reads as nonsense.
  const isCoverage = duration >= 240;

  if (locale === 'pt') {
    return {
      answerBox: `${serviceName} ${ptAt(city)} — desde ${priceLabel}. ${durationLabel} no local com um fotógrafo local verificado e ${photoCount} fotografias editadas entregues numa galeria privada em ${delivery}.${longerOnRequest ? ' Sessões mais longas são orçamentadas a pedido.' : ''} O preço é acordado antes de reservar e não muda.`,

      introParagraph: `${lede} É isso que decide como se prepara aqui uma sessão de ${serviceName.toLowerCase()}: o fotógrafo que vai consigo vive ${ptAt(city)} e trabalha ${ptRegionAt(regionName)} o ano inteiro, por isso não está a conhecer o sítio ao mesmo tempo que você. Esse conhecimento prévio é a diferença entre uma sessão que cumpre o horário e uma sessão passada à procura de enquadramento.`,

      // Portuguese place names carry their own article — "a Ribeira", "o
      // Miradouro da Graça" — so no preposition can be glued in front of one.
      // Hence "Ponto de partida:" rather than "Começamos em…".
      sampleRoute: isCoverage
        ? `A cobertura dura ${durationLabel} e segue o seu programa, não um percurso fixo. Quando abre um intervalo para fotografias compostas, saímos até ${keySpotName}${secondSpot ? ` ou ${secondSpot.name}` : ''} — poucos minutos a pé, que é outro tanto que não se tira ao dia.`
        : twoSpots && secondSpot
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
          answer: `Em ${delivery}, numa galeria privada online: ${photoCount} imagens editadas, para descarregar em resolução máxima a partir de qualquer país.`,
        },
      ],
    };
  }

  return {
    answerBox: `${serviceName} in ${cityName} — from ${priceLabel}. ${durationLabel} on location with a vetted local photographer, and ${photoCount} edited photos delivered to a private gallery within ${delivery}.${longerOnRequest ? ' Longer sessions are quoted on request.' : ''} The price is agreed before you book and does not move.`,

    introParagraph: `${lede} That is what decides how a ${serviceName} session is planned here: the photographer you work with lives in ${cityName} and shoots across ${regionName} all year, so they are not seeing the place for the first time alongside you. That prior knowledge is the difference between a session that keeps to its schedule and one spent looking for a frame.`,

    sampleRoute: isCoverage
      ? `Coverage runs ${durationLabel} and follows your schedule rather than a fixed route. When a gap opens for composed frames, we step out to ${keySpotName}${secondSpot ? ` or ${secondSpot.name}` : ''} — a few minutes on foot, which is that much less taken out of the day.`
      : twoSpots && secondSpot
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
        answer: `Within ${delivery}, in a private online gallery: ${photoCount} edited images, downloadable at full resolution from any country.`,
      },
    ],
  };
}

/**
 * SEO title & meta description for the `service × city` leaf pages.
 *
 * Authored in `src/lib/data/leaf-copy/` — the title without the brand, which
 * the layout appends. The composed fallback is for a pairing whose copy is not
 * written yet; that page is `noindex`, so it never competes on a description.
 */
export function getSeoMetadata(
  city: City,
  service: Service,
  locale: Locale,
): { title: string; description: string } {
  const authored = getLeafCopy(service, city.slug, locale);
  if (authored) return { title: authored.title, description: authored.description };

  const cityName = localizedCityName(city, locale);
  const serviceName = tx(service.name, locale);
  const priceLabel = formatPrice(service.initialPrice, locale);
  const photoCount = formatPhotoCount(service);
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
      description: `${serviceName} ${ptAt(city)} com um fotógrafo local verificado. Desde ${priceLabel}, ${durationLabel} no local, ${photoCount} fotografias editadas, galeria privada em ${formatDelivery(service.deliveryHours, locale)}.`,
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
    description: `${serviceName} in ${cityName} with a vetted local photographer. From ${priceLabel}, ${durationLabel} on location, ${photoCount} edited photos, gallery in ${formatDelivery(service.deliveryHours, locale)}.`,
  };
}
