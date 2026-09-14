import type { City, Service } from './types';
import { type Locale, tx } from './locales';
import { frAt, frOf } from './city-name';
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
  const cityName = city.name;
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
    .filter((s) => !/^(free|gratuit)\b/i.test(s.cost));
  const authored = LEAF_SEO[`${service.slug}--${city.slug}`];

  const durationLabel = formatDuration(duration, locale);
  const priceLabel = formatPrice(startingPrice, locale);
  // Anything from four hours up is coverage of an event rather than a walk
  // between two locations, and describing it as a route reads as nonsense.
  const isCoverage = duration >= 240;

  if (locale === 'fr') {
    return {
      answerBox: `${serviceName} ${frAt(city)} : à partir de ${priceLabel}. ${durationLabel} sur place avec un photographe local vérifié, et ${photoCount} photos retouchées livrées dans une galerie privée sous 48 à 72 heures. Le tarif est annoncé avant la réservation et ne bouge pas.`,

      introParagraph: authored
        ? tx(authored.angle, locale)
        : `${lede} C’est ce qui décide de la façon dont une séance ${serviceName} se prépare ici : le photographe qui vous accompagne habite ${cityName} et travaille en ${regionName} toute l’année, il ne découvre donc pas le lieu en même temps que vous. Cette connaissance préalable sépare une séance qui tient son horaire d’une séance passée à chercher un cadre.`,

      // Spot names carry their own articles — "Le Panier", "La Petite France" —
      // so no preposition can be glued in front of them. Hence "Point de départ".
      sampleRoute: isCoverage
        ? `La couverture s’étend sur ${durationLabel} et suit votre déroulé plutôt qu’un parcours fixe. Quand un créneau se libère pour des images posées, nous sortons vers ${keySpotName}${secondSpot ? ` ou ${secondSpot.name}` : ''} : quelques minutes de marche suffisent, et c’est autant de temps qui n’est pas pris sur la journée.`
        : secondSpot
          ? `Le parcours type dure ${durationLabel} et reste à pied. Point de départ : ${keySpotName}, puis ${secondSpot.name}. Deux lieux plutôt qu’un donnent deux arrière-plans distincts sans trajet en voiture, et le passage de l’un à l’autre fournit les images prises en marchant — souvent les plus justes de la série.`
          : `Le parcours type dure ${durationLabel} et reste à pied. Point de départ : ${keySpotName}. Nous alternons des cadres composés et des séquences plus libres en marchant, de façon à obtenir plusieurs registres sans changer de quartier ni perdre de temps en trajet.`,

      timingParagraph: keySpotTime
        ? `L’heure compte plus que le lieu. Créneau à viser pour ${keySpotName} : ${keySpotTime}. La séance dure ${durationLabel} et se cale sur ce créneau plutôt que sur votre agenda — c’est la seule variable qui change vraiment les images, et elle est gratuite.`
        : `L’heure compte plus que le lieu. La séance dure ${durationLabel} et se place ${frAt(city)} au lever du jour ou dans l’heure qui précède le coucher du soleil, quand la lumière est basse et la fréquentation faible.`,

      detailsText: `Le forfait ${serviceName} ${frAt(city)} comprend : ${deliverables.join(' ; ')}. Aucun supplément n’apparaît après la séance. ${
        permitNotes.length > 0
          ? `Autorisations à connaître : ${permitNotes.map((p) => `${p.name} — ${p.cost}`).join(' ; ')}.`
          : `Les lieux retenus sont sur voirie publique et n’exigent aucune autorisation payante.`
      }`,

      customFAQs: [
        {
          question: `${serviceName} ${frAt(city)} : à quelle heure prévoir la séance ?`,
          answer: keySpotTime
            ? `Pour ${keySpotName}, visez ${keySpotTime.toLowerCase()}. Sur un lieu fréquenté, deux heures d’écart changent complètement ce qu’il est possible de cadrer.`
            : `Au lever du jour ou dans l’heure qui précède le coucher du soleil. Deux heures d’écart changent complètement ce qu’il est possible de cadrer.`,
        },
        {
          question: `Faut-il une autorisation pour photographier ${frAt(city)} ?`,
          answer:
            permitNotes.length > 0
              ? `Sur certains lieux, oui : ${permitNotes.map((p) => `${p.name} (${p.cost})`).join(' ; ')}. Le photographe s’en occupe et vous le dit à la réservation, pas le jour même.`
              : `Pas sur les lieux que nous utilisons pour cette séance : ils sont sur voirie ou espace public libre d’accès. Si votre demande sort de ce cadre, nous vous le disons avant de réserver.`,
        },
        {
          question: `Que se passe-t-il s’il pleut ${frAt(city)} ?`,
          answer: `Nous décalons la séance à un autre créneau ou à un autre jour, sans frais. Si vous n’êtes sur place que peu de temps, nous basculons sur des lieux couverts repérés à l’avance plutôt que d’annuler.`,
        },
        {
          question: `Quand recevons-nous les photos ${frOf(city)} ?`,
          answer: `Sous 48 à 72 heures, dans une galerie privée en ligne : ${photoCount} images retouchées, téléchargeables en pleine résolution depuis n’importe quel pays.`,
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

  const cityName = city.name;
  const serviceName = tx(service.name, locale);
  const priceLabel = formatPrice(service.initialPrice, locale);
  const photoCount = service.editedPhotos;
  const durationLabel = formatDuration(service.durationMinutes, locale);

  if (locale === 'fr') {
    // "Photographe Photo culinaire et restaurant à Marseille" is both too long
    // and badly written: some service names already begin with the noun. Where
    // the prefix does not fit or would double up, the name carries the title
    // alone — the H1 and the description still say photographe.
    const suffix = `${serviceName} ${frAt(city)} | ${SITE_NAME}`;
    const prefixed = `Photographe ${suffix}`;
    const doublesUp = /^photo/i.test(serviceName);
    return {
      title: !doublesUp && prefixed.length <= TITLE_MAX ? prefixed : suffix,
      description: `${serviceName} ${frAt(city)} avec un photographe local vérifié. Dès ${priceLabel}, ${durationLabel} sur place, ${photoCount} photos retouchées, galerie privée sous 48-72 h.`,
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
