import type { BlogPost } from '../types';
import { DESTINATION_WEDDING_FRANCE } from '../blog/destination-wedding-france';
import { PHOTOGRAPHY_PERMITS_FRANCE } from '../blog/photography-permits-france';
import { BLOG_GUIDES } from './blog-guides';

/**
 * The blog exists to answer the questions the money pages cannot, and to link
 * into them. Each supporting post targets one real question and links to the
 * city or service page that sells the answer.
 */
export const BLOG_POSTS: BlogPost[] = [
  // Pillars first: they are the hubs everything else links back to.
  DESTINATION_WEDDING_FRANCE,
  PHOTOGRAPHY_PERMITS_FRANCE,

  {
    slug: 'paris-photo-spots',
    date: '2026-09-08',
    readTime: '8 min',
    author: 'Camille Aubert',
    cover: '/images/cities/paris.jpg',
    coverAlt: {
      en: 'The Eiffel Tower seen through the arches of the Bir-Hakeim bridge at dawn',
      fr: 'La tour Eiffel vue à travers les arches du pont de Bir-Hakeim à l’aube',
    },
    section: { en: 'Locations', fr: 'Lieux' },
    title: {
      en: 'Where to photograph in Paris, and at what hour',
      fr: 'Où photographier à Paris, et à quelle heure',
    },
    summary: {
      en: 'Nine locations in Paris with the hour each one works, why the Trocadéro is unusable after nine, and where to go when it rains.',
      fr: 'Neuf lieux à Paris avec l’heure à laquelle chacun fonctionne, pourquoi le Trocadéro est inexploitable après neuf heures, et où aller sous la pluie.',
    },
    content: {
      en: `In Paris the location matters far less than the hour. Every place below is beautiful; roughly half of them are unusable for most of the day, and the difference between a good session and a wasted one is almost always what time you started.

## The hour, not the place

The city has two usable windows. The first runs from first light to about half past eight, and it is the only time the famous locations are empty. The second is the last hour before sunset, which in June means nine in the evening and in December means half past four.

Between those two the light comes from overhead, the crowds are at their densest, and no amount of skill compensates for either.

## The nine that work

**Île Saint-Louis.** Five hundred metres, one architecture, two levels. Empty before eight even in August. The lower quays sit in shade all day, which makes this the rare Paris location usable at three in the afternoon.

**Pont de Bir-Hakeim.** The tower framed by repeating arches. Extremely popular and worth the early start — by nine there is a queue for the good spot.

**Trocadéro.** Scale, and the only view where the whole tower fits comfortably. Unusable after nine. At seven it is yours.

**Rue Foyatier, Montmartre.** The staircase, not the Place du Tertre, which is a working market of portrait painters and photographs badly.

**Jardin du Palais-Royal.** The columns and the arcades. Shaded, enclosed and quiet, and it opens early.

**Canal Saint-Martin.** Iron footbridges and plane trees. Completely different in register from the monuments, and the choice when you want Paris to look lived in rather than visited.

**Buttes-Chaumont.** Steep, green and genuinely wild for a city park. Good for families because there is room to run.

**Passage des Panoramas and the covered arcades.** Nineteenth-century glass roofs. The answer to rain, and interesting enough to be a first choice rather than a fallback.

**Pont Alexandre III.** Gold, lamps and the Grand Palais behind. Best at blue hour, when the lamps are on and the sky still has colour.

## When it rains

Rain is not a reason to cancel in Paris. The covered arcades, the Palais-Royal colonnade and the quays under the bridges all work wet, and stone with water on it photographs far better than dry stone. What genuinely stops a session is wind — umbrellas and hair both become unmanageable, and there is no location that fixes it.

## Permits

Photography on the public street is free. Municipal parks, national estates and the interiors of monuments each run their own regime, and a tripod changes the answer in several of them. We check what applies to your specific session in advance — see the [Paris page](/cities/paris) for how sessions here are usually planned.`,
      fr: `À Paris, le lieu compte bien moins que l’heure. Chacun des endroits ci-dessous est beau ; la moitié environ est inexploitable une grande partie de la journée, et ce qui sépare une bonne séance d’une séance perdue est presque toujours l’heure de départ.

## L’heure, pas le lieu

La ville a deux fenêtres exploitables. La première va du lever du jour à huit heures et demie environ : c’est le seul moment où les lieux célèbres sont vides. La seconde est la dernière heure avant le coucher du soleil, soit vingt et une heures en juin et seize heures trente en décembre.

Entre les deux, la lumière tombe d’en haut, la foule est à son maximum, et aucune compétence ne compense ni l’un ni l’autre.

## Les neuf qui fonctionnent

**Île Saint-Louis.** Cinq cents mètres, une architecture, deux niveaux. Vide avant huit heures, même en août. Les quais bas restent à l’ombre toute la journée, ce qui en fait le rare lieu parisien utilisable à quinze heures.

**Pont de Bir-Hakeim.** La tour cadrée par les arches. Très fréquenté et qui justifie de se lever tôt : à neuf heures, il y a une file d’attente pour le bon emplacement.

**Trocadéro.** L’échelle, et la seule vue où la tour entière tient confortablement. Inexploitable après neuf heures. À sept heures, il est à vous.

**Rue Foyatier, Montmartre.** L’escalier, pas la place du Tertre, qui est un marché de portraitistes en activité et se photographie mal.

**Jardin du Palais-Royal.** Les colonnes et les arcades. Ombragé, fermé et calme, et il ouvre tôt.

**Canal Saint-Martin.** Passerelles de fer et platanes. D’un registre entièrement différent des monuments, et le choix quand on veut un Paris habité plutôt que visité.

**Buttes-Chaumont.** Escarpé, vert et réellement sauvage pour un parc urbain. Bon pour les familles parce qu’il y a de la place pour courir.

**Passage des Panoramas et les galeries couvertes.** Verrières du XIXe siècle. La réponse à la pluie, et assez intéressantes pour être un premier choix plutôt qu’un repli.

**Pont Alexandre III.** Or, lampadaires et Grand Palais derrière. Meilleur à l’heure bleue, quand les lampes sont allumées et que le ciel garde de la couleur.

## Sous la pluie

La pluie n’est pas une raison d’annuler à Paris. Les galeries couvertes, la colonnade du Palais-Royal et les quais sous les ponts fonctionnent tous mouillés, et la pierre humide se photographie bien mieux que la pierre sèche. Ce qui arrête réellement une séance, c’est le vent : parapluies et cheveux deviennent ingérables, et aucun lieu n’y remédie.

## Autorisations

La prise de vue sur la voie publique est libre. Jardins municipaux, domaines nationaux et intérieurs de monuments relèvent chacun d’un régime propre, et un trépied change la réponse dans plusieurs d’entre eux. Nous vérifions ce qui s’applique à votre séance en amont — voir la [page Paris](/cities/paris) pour la façon dont les séances s’y organisent.`,
    },
    faqs: [
      {
        question: {
          en: 'What time should a Paris session start?',
          fr: 'À quelle heure commencer une séance à Paris ?',
        },
        answer: {
          en: 'Between first light and eight in the morning for anywhere well known, or the last hour before sunset. Between those two windows the light is overhead and the landmarks are crowded, and neither is fixable.',
          fr: 'Entre le lever du jour et huit heures pour tout lieu connu, ou la dernière heure avant le coucher du soleil. Entre ces deux fenêtres, la lumière est verticale et les monuments sont bondés, et ni l’un ni l’autre ne se corrige.',
        },
      },
      {
        question: {
          en: 'Do we need a permit to photograph in Paris?',
          fr: 'Faut-il une autorisation pour photographier à Paris ?',
        },
        answer: {
          en: 'Not on the public street. Municipal parks, national estates and monument interiors each have their own rules, and a tripod changes the answer in several. We check the specific case before the session.',
          fr: 'Pas sur la voie publique. Les jardins municipaux, les domaines nationaux et les intérieurs de monuments ont chacun leurs règles, et un trépied change la réponse dans plusieurs cas. Nous vérifions le cas précis avant la séance.',
        },
      },
    ],
  },

  {
    slug: 'what-to-wear-photo-session',
    date: '2026-09-08',
    readTime: '6 min',
    author: 'Léa Fontaine',
    cover: '/images/services/portrait.jpg',
    coverAlt: {
      en: 'Two people in plain mid-tone clothing photographed against pale stone',
      fr: 'Deux personnes en vêtements unis de tons moyens, photographiées devant une pierre claire',
    },
    section: { en: 'Preparation', fr: 'Préparation' },
    title: {
      en: 'What to wear for a photo session',
      fr: 'Comment s’habiller pour une séance photo',
    },
    summary: {
      en: 'The four rules that actually change the pictures: no fine patterns, no pure white or black, agree a palette, and dress for the walking you will do.',
      fr: 'Les quatre règles qui changent réellement les images : pas de motifs fins, ni blanc pur ni noir, une palette commune, et des chaussures adaptées à la marche prévue.',
    },
    content: {
      en: `Most advice about what to wear is about taste. This is not — these are the four things that visibly change the photographs, and they hold regardless of what you like.

## Avoid fine patterns

Thin stripes, small checks and herringbone interfere with the sensor and produce a shimmering colour pattern that cannot be removed afterwards. It is the one clothing problem with no fix in editing. Plain fabrics, or patterns with elements larger than about a centimetre, are safe.

## Avoid pure white and pure black

Not because they look bad, but because they set the exposure. Pure white forces the whole frame darker to protect it; pure black does the opposite. Either way, faces suffer. Mid-tones — grey, navy, olive, burgundy, camel — let the exposure sit where skin needs it.

## Agree a palette, do not match

A family in five shades of the same blue looks like a uniform. A family in unrelated colours looks like five separate photographs. What works is two or three neighbouring colours, distributed unevenly: mostly navy and cream, one person in rust.

## Dress for the walking

Most sessions cover a couple of kilometres on cobbles, gravel or steps. Fine heels are unusable in the old towns of [Lyon](/cities/lyon), [Colmar](/cities/colmar) or [Nice](/cities/nice), and the cliff path at [Étretat](/cities/etretat) is not somewhere to attempt them at all. Bring them for the frames that need them and walk in something else.

## A few specifics

- **Layers** photograph better than a single garment: a jacket that comes off gives two looks in one session.
- **Denim** works everywhere and is almost impossible to get wrong.
- **Logos** date a photograph in a way nothing else does.
- **Ironing** matters more than the garment. Creases from a suitcase are visible in every frame and are tedious to remove.
- **Shoes are in the picture** more often than people expect, particularly in seated and full-length frames.

> If you only take one thing from this: two or three plain mid-tone colours across the whole group, and shoes you can walk two kilometres in.`,
      fr: `La plupart des conseils vestimentaires relèvent du goût. Pas ceux-ci : voici les quatre éléments qui changent visiblement les photographies, et ils valent quelles que soient vos préférences.

## Évitez les motifs fins

Rayures fines, petits carreaux et chevrons interfèrent avec le capteur et produisent un moirage coloré impossible à retirer ensuite. C’est le seul problème vestimentaire sans solution en retouche. Les tissus unis, ou les motifs dont les éléments dépassent le centimètre, ne posent aucun problème.

## Évitez le blanc pur et le noir pur

Non parce qu’ils sont laids, mais parce qu’ils fixent l’exposition. Le blanc pur force toute l’image vers le sombre pour le préserver ; le noir pur fait l’inverse. Dans les deux cas, les visages en pâtissent. Les tons moyens — gris, marine, olive, bordeaux, camel — laissent l’exposition là où la peau en a besoin.

## Accordez une palette, ne vous assortissez pas

Une famille en cinq nuances du même bleu ressemble à un uniforme. Une famille en couleurs sans rapport ressemble à cinq photographies séparées. Ce qui fonctionne : deux ou trois couleurs voisines, réparties inégalement — majoritairement marine et écru, une personne en rouille.

## Habillez-vous pour la marche

La plupart des séances couvrent deux kilomètres sur des pavés, du gravier ou des escaliers. Les talons fins sont inutilisables dans les vieilles villes de [Lyon](/cities/lyon), [Colmar](/cities/colmar) ou [Nice](/cities/nice), et le sentier de falaise d’[Étretat](/cities/etretat) n’est pas un endroit où les tenter. Apportez-les pour les images qui les demandent et marchez avec autre chose.

## Quelques précisions

- **Les superpositions** se photographient mieux qu’un vêtement seul : une veste qu’on retire donne deux allures dans une même séance.
- **Le denim** fonctionne partout et est presque impossible à rater.
- **Les logos** datent une photographie comme rien d’autre.
- **Le repassage** compte plus que le vêtement. Les plis de valise se voient sur chaque image et sont fastidieux à retirer.
- **Les chaussures sont dans le cadre** plus souvent qu’on ne le croit, surtout en pied et en position assise.

> Si vous ne retenez qu’une chose : deux ou trois couleurs unies de tons moyens pour tout le groupe, et des chaussures qui permettent de marcher deux kilomètres.`,
    },
    faqs: [
      {
        question: {
          en: 'Can we wear white?',
          fr: 'Peut-on porter du blanc ?',
        },
        answer: {
          en: 'Off-white and cream, yes. Pure white forces the exposure down to protect it and darkens faces as a result. The same applies in reverse to pure black.',
          fr: 'Le blanc cassé et l’écru, oui. Le blanc pur force l’exposition vers le bas pour le préserver et assombrit les visages en conséquence. L’inverse vaut pour le noir pur.',
        },
      },
      {
        question: {
          en: 'How many outfits should we bring?',
          fr: 'Combien de tenues faut-il prévoir ?',
        },
        answer: {
          en: 'Two at most for an hour-long session — changing costs ten minutes each time, and that is a sixth of the session. A jacket that comes off gives a second look for free.',
          fr: 'Deux au maximum pour une séance d’une heure : chaque changement coûte dix minutes, soit un sixième de la séance. Une veste qu’on retire offre une seconde allure gratuitement.',
        },
      },
    ],
  },

  {
    slug: 'lavender-season-provence',
    date: '2026-09-08',
    readTime: '5 min',
    author: 'Baptiste Roux',
    cover: '/images/cities/aix-en-provence.jpg',
    coverAlt: {
      en: 'Rows of lavender on the Valensole plateau at sunrise',
      fr: 'Rangs de lavande sur le plateau de Valensole au lever du jour',
    },
    section: { en: 'Seasons', fr: 'Saisons' },
    title: {
      en: 'When the lavender is actually out in Provence',
      fr: 'Quand la lavande est réellement en fleur en Provence',
    },
    summary: {
      en: 'Valensole flowers from late June to about 20 July and is then cut. Sault runs later. Everything else about a lavender session follows from those dates.',
      fr: 'Valensole fleurit de fin juin au 20 juillet environ, puis est coupée. Sault décale. Tout le reste d’une séance lavande découle de ces dates.',
    },
    content: {
      en: `Almost every disappointed Provence booking comes down to one fact learned too late: the lavender is cut in the first days of August, and August is when most people visit.

## The dates

**Valensole plateau**, the one in the photographs: roughly 25 June to 20 July. After a hot spring the harvest starts earlier, sometimes in the second week of July.

**Sault**, higher and cooler: about a fortnight later, into early August. This is the fallback when Valensole has already been cut, and it is a genuinely different landscape — smaller fields, more relief.

**Abbaye de Sénanque**, the famous view: a short season and heavily managed. The abbey is a working monastery and restricts access to the fields entirely at certain times.

Nobody can promise a date in advance. We check the state of the fields the same week and tell you what is actually standing.

## They are farms, not a park

The fields are private working farmland. Walking into one without asking damages the crop, and it is increasingly and reasonably resented — several producers have fenced their fields for exactly this reason. We work from the edges, or with permission obtained beforehand.

## The hour

Sunrise, and not as a preference. By eight in the morning the D6 across Valensole carries a line of parked cars and the good rows have people in them. The light is also better: low sun across the rows separates them, while midday sun flattens the whole plateau into one purple mass.

## If you have missed it

Provence after the harvest is still Provence. The [villages of the Luberon](/cities/aix-en-provence), the ochre of Roussillon, the plane trees of Aix and the vineyards in September all photograph superbly, and September is a better month than July in every respect except lavender.`,
      fr: `Presque toute réservation déçue en Provence tient à un fait appris trop tard : la lavande est coupée dans les premiers jours d’août, et août est le moment où la plupart des gens viennent.

## Les dates

**Plateau de Valensole**, celui des photographies : du 25 juin au 20 juillet environ. Après un printemps chaud, la coupe démarre plus tôt, parfois dès la deuxième semaine de juillet.

**Sault**, plus haut et plus frais : une quinzaine de jours plus tard, jusqu’à début août. C’est le repli quand Valensole est déjà coupée, et c’est un paysage réellement différent — champs plus petits, davantage de relief.

**Abbaye de Sénanque**, la vue célèbre : saison courte et accès très encadré. L’abbaye est un monastère en activité et interdit totalement l’accès aux champs à certaines périodes.

Personne ne peut promettre une date à l’avance. Nous vérifions l’état des champs la semaine même et vous disons ce qui est réellement sur pied.

## Ce sont des exploitations, pas un parc

Les champs sont des terres agricoles privées. Y entrer sans demander abîme la récolte, et c’est de plus en plus mal vu, à juste titre — plusieurs producteurs ont clôturé pour cette raison précise. Nous travaillons depuis les bordures, ou avec une autorisation obtenue en amont.

## L’heure

Le lever du jour, et pas par préférence. Dès huit heures, la D6 qui traverse Valensole porte une file de voitures garées et les beaux rangs sont occupés. La lumière est également meilleure : un soleil bas en travers des rangs les sépare, quand le soleil de midi aplatit tout le plateau en une seule masse violette.

## Si vous l’avez manquée

La Provence après la coupe reste la Provence. Les [villages du Luberon](/cities/aix-en-provence), l’ocre de Roussillon, les platanes d’Aix et les vignes en septembre se photographient superbement, et septembre est un meilleur mois que juillet à tous égards sauf la lavande.`,
    },
    faqs: [
      {
        question: {
          en: 'Is the lavender out in August?',
          fr: 'La lavande est-elle en fleur en août ?',
        },
        answer: {
          en: 'On Valensole, no — it is cut in the first days of the month, and often before. Sault, higher up, can still be standing in the first week. From mid-August there is no lavender anywhere in Provence.',
          fr: 'Sur Valensole, non : elle est coupée dans les premiers jours du mois, souvent avant. Sault, plus haut, peut encore tenir la première semaine. À partir de mi-août, il n’y a plus de lavande nulle part en Provence.',
        },
      },
    ],
  },

  ...BLOG_GUIDES,
];
