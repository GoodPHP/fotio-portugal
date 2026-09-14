import type { BlogPost } from '../types';

/**
 * Shorter guides. Each answers one question people actually ask before booking,
 * and links into the city or service page that sells the answer — which is also
 * how the money pages get more than one inbound link apiece.
 */
export const BLOG_GUIDES: BlogPost[] = [
  {
    slug: 'french-riviera-when-to-go',
    date: '2026-09-08',
    readTime: '5 min',
    author: 'Léa Fontaine',
    cover: '/images/cities/nice.jpg',
    coverAlt: {
      en: 'The bay of Nice from the castle hill at the end of the day',
      fr: 'La baie de Nice depuis la colline du Château en fin de journée',
    },
    section: { en: 'Seasons', fr: 'Saisons' },
    title: {
      en: 'When to photograph the French Riviera',
      fr: 'Quand photographier la Côte d’Azur',
    },
    summary: {
      en: 'May, June, September and October. Why July and August are the worst months for photographs, and why winter on the Riviera is the season nobody books.',
      fr: 'Mai, juin, septembre et octobre. Pourquoi juillet et août sont les pires mois pour les photos, et pourquoi l’hiver azuréen est la saison que personne ne réserve.',
    },
    content: {
      en: `The Riviera has a reputation for light, and it deserves it — for about two hours a day. For the other six it is as harsh as anywhere in Europe, and the months most people choose are the months when that is most true.

## The four good months

**May and June.** Warm without being punishing, the sea already worth swimming in, and evenings long enough that a session can start at seven and still finish in daylight. The lavender inland is coming, which matters if you are combining the coast with Provence.

**September and October.** The best of the year. The heat has broken, the crowds have gone home, the sea is at its warmest, and the sun sets early enough that golden hour is a civilised hour rather than a late one.

## The two to avoid

July and August bring vertical light from ten in the morning until six in the evening, temperatures over thirty, and a coastline at capacity. Saint-Tropez in August has one road in and it is saturated by mid-morning. Nothing about a photograph improves in those conditions, and quite a lot gets worse — squinting, sweat, and a background of other people.

If August is when you are here, we shoot at first light. There is no second option.

## Winter, which nobody books

Fifteen degrees, low sun all day, an empty Promenade and old towns you can actually walk through. The sea is a deeper blue in January than in July. Everything is open because the coast is not a summer resort — people live there.

The only real constraint is the short day: sunset around half past five, so a session runs mid-afternoon rather than evening.

## Where, once you have the month

The seafront works for about twenty minutes at the end of the day. The old towns — [Nice](/cities/nice), [Cannes](/cities/cannes) — hold shade and colour all day and are where most of a session actually happens. The corniches above give the whole bay, and are the one place worth a car.

The [honeymoon session](/services/riviera-honeymoon) is built around exactly that sequence.`,
      fr: `La Côte d’Azur a une réputation de lumière, et elle la mérite — environ deux heures par jour. Les six autres, elle est aussi dure que partout ailleurs en Europe, et les mois que la plupart des gens choisissent sont ceux où c’est le plus vrai.

## Les quatre bons mois

**Mai et juin.** Chaud sans être pénible, la mer déjà baignable, et des soirées assez longues pour commencer une séance à dix-neuf heures et finir de jour. La lavande arrive à l’intérieur, ce qui compte si vous associez la côte à la Provence.

**Septembre et octobre.** Le meilleur de l’année. La chaleur est retombée, la foule est repartie, la mer est au plus chaud, et le soleil se couche assez tôt pour que la golden hour tombe à une heure civilisée.

## Les deux à éviter

Juillet et août apportent une lumière verticale de dix heures à dix-huit heures, plus de trente degrés, et un littoral saturé. Saint-Tropez en août n’a qu’une route d’accès, engorgée dès la fin de matinée. Rien dans une photographie ne s’améliore dans ces conditions, et beaucoup s’y dégrade — yeux plissés, transpiration, et un arrière-plan de monde.

Si août est votre seule possibilité, nous photographions au lever du jour. Il n’y a pas de seconde option.

## L’hiver, que personne ne réserve

Quinze degrés, un soleil bas toute la journée, une Promenade vide et des vieilles villes réellement praticables. La mer est d’un bleu plus profond en janvier qu’en juillet. Tout est ouvert, parce que la côte n’est pas une station estivale : des gens y vivent.

La seule vraie contrainte est la brièveté du jour : coucher vers dix-sept heures trente, donc une séance en milieu d’après-midi plutôt qu’en soirée.

## Où, une fois le mois choisi

Le front de mer fonctionne une vingtaine de minutes en fin de journée. Les vieilles villes — [Nice](/cities/nice), [Cannes](/cities/cannes) — tiennent l’ombre et la couleur toute la journée, et c’est là que l’essentiel d’une séance se passe. Les corniches au-dessus donnent la baie entière, et sont le seul endroit qui justifie une voiture.

La [séance voyage de noces](/services/riviera-honeymoon) est construite exactement sur cette séquence.`,
    },
    faqs: [
      {
        question: { en: 'Is August really that bad?', fr: 'Août est-il vraiment si mauvais ?' },
        answer: {
          en: 'For photographs, yes. Vertical light from ten to six, heat that shows in every frame, and a coast at capacity. A sunrise session still works well; anything else is a compromise we would rather name in advance than deliver.',
          fr: 'Pour les photographies, oui. Lumière verticale de dix à dix-huit heures, une chaleur qui se voit sur chaque image, et une côte saturée. Une séance au lever du jour fonctionne toujours ; le reste est un compromis que nous préférons annoncer plutôt que livrer.',
        },
      },
    ],
  },

  {
    slug: 'corporate-headshots-what-to-expect',
    date: '2026-09-08',
    readTime: '5 min',
    author: 'Julien Deschamps',
    cover: '/images/services/headshots.jpg',
    coverAlt: {
      en: 'A corporate portrait session set up in a meeting room',
      fr: 'Une séance de portraits corporate installée dans une salle de réunion',
    },
    section: { en: 'Business', fr: 'Entreprise' },
    title: {
      en: 'Corporate headshots: what a session actually involves',
      fr: 'Photos corporate : ce qu’une séance implique réellement',
    },
    summary: {
      en: 'What we need from you, how long each person takes, what to wear, and how someone who joins in six months ends up matching the rest of the directory.',
      fr: 'Ce dont nous avons besoin, le temps par personne, quoi porter, et comment une personne arrivée six mois plus tard s’accorde au reste du trombinoscope.',
    },
    content: {
      en: `A team shoot is the most logistically constrained thing we do and the least visually complicated. Most of the work is scheduling.

## What we need from you

**A room, roughly three metres by four**, with a plain wall on one side and somewhere to put two lights. A meeting room is ideal. It does not need a window; we bring the light.

**Thirty minutes per person**, back to back, on a list. Not "whenever they're free" — a booked slot per name, or the day slips by an hour before lunch and never recovers.

**One person who knows everyone.** Someone has to say "that's not Marc, Marc is in the other room", and it should not be the photographer.

## What happens in the thirty minutes

Five minutes of getting comfortable, twenty of shooting, five to choose. We show the frames on a screen at the end and you pick yours — nobody leaves without having seen what they look like, which removes the single most common complaint about corporate portraits.

## What to wear

What you actually wear to work, not what you think a portrait requires. Someone photographed in an unaccustomed suit looks exactly like someone photographed in an unaccustomed suit.

Avoid fine stripes and small checks — they shimmer on screen and cannot be fixed afterwards. Solid mid-tones sit best. There is more on this in [what to wear](/blog/what-to-wear-photo-session).

## Matching people who join later

The lighting positions, the distance and the background are recorded at the end of the session. When someone joins six months later, they are photographed into the same set-up and drop into the directory without looking pasted in.

This is the part most teams do not think to ask about and the part that matters most two years in, when half the page was shot at a different time from the other half.

## Where

On your premises, in [Paris](/cities/paris), [Lyon](/cities/lyon), [Bordeaux](/cities/bordeaux) or anywhere else we cover. See [corporate headshots](/services/headshots) for what a session includes.`,
      fr: `Une séance d’équipe est ce que nous faisons de plus contraint logistiquement et de moins compliqué visuellement. L’essentiel du travail est du planning.

## Ce dont nous avons besoin

**Une salle d’environ trois mètres sur quatre**, avec un mur uni d’un côté et de la place pour deux sources. Une salle de réunion est idéale. Pas besoin de fenêtre : nous apportons la lumière.

**Trente minutes par personne**, à la suite, sur une liste. Pas « quand ils seront libres » : un créneau réservé par nom, sinon la journée prend une heure de retard avant midi et ne la rattrape jamais.

**Une personne qui connaît tout le monde.** Quelqu’un doit pouvoir dire « ce n’est pas Marc, Marc est dans l’autre salle », et ce ne doit pas être le photographe.

## Ce qui se passe pendant les trente minutes

Cinq minutes pour se mettre à l’aise, vingt de prise de vue, cinq pour choisir. Nous montrons les images sur un écran à la fin et chacun choisit la sienne — personne ne repart sans avoir vu de quoi il a l’air, ce qui supprime la plainte la plus fréquente sur les portraits d’entreprise.

## Comment s’habiller

Ce que vous portez réellement pour travailler, pas ce qu’un portrait semble exiger. Une personne photographiée dans un costume inhabituel ressemble exactement à une personne photographiée dans un costume inhabituel.

Évitez les rayures fines et les petits carreaux : ils moirent à l’écran et ne se corrigent pas ensuite. Les tons moyens unis fonctionnent le mieux. Plus de détail dans [comment s’habiller](/blog/what-to-wear-photo-session).

## Raccorder les personnes arrivées plus tard

Les positions de lumière, la distance et le fond sont notés en fin de séance. Une personne arrivée six mois plus tard est photographiée dans le même dispositif et s’intègre au trombinoscope sans effet de collage.

C’est la partie à laquelle la plupart des équipes ne pensent pas à demander, et celle qui compte le plus deux ans après, quand la moitié de la page a été faite à une autre époque que l’autre.

## Où

Dans vos locaux, à [Paris](/cities/paris), [Lyon](/cities/lyon), [Bordeaux](/cities/bordeaux) ou partout ailleurs où nous intervenons. Voir [photo corporate](/services/headshots) pour le contenu d’une séance.`,
    },
    faqs: [
      {
        question: { en: 'How many people can you photograph in a day?', fr: 'Combien de personnes par jour ?' },
        answer: {
          en: 'Twelve to fourteen comfortably, at thirty minutes each with breaks. More is possible at twenty minutes a head, but the selection at the end gets rushed and that is the part people remember.',
          fr: 'Douze à quatorze confortablement, à trente minutes chacune avec des pauses. Davantage est possible à vingt minutes, mais la sélection finale devient expéditive — et c’est ce dont les gens se souviennent.',
        },
      },
    ],
  },

  {
    slug: 'chateau-wedding-what-the-venue-decides',
    date: '2026-09-08',
    readTime: '6 min',
    author: 'Élodie Marchand',
    cover: '/images/services/wedding.jpg',
    coverAlt: {
      en: 'The courtyard of a French estate set for a wedding at the end of the day',
      fr: 'La cour d’une propriété française dressée pour un mariage en fin de journée',
    },
    section: { en: 'Weddings', fr: 'Mariages' },
    title: {
      en: 'A château wedding: what the venue decides, not you',
      fr: 'Mariage au château : ce que le lieu décide, pas vous',
    },
    summary: {
      en: 'Four questions to ask a French estate before signing, because the answers set the running order of your day more than any choice you will make.',
      fr: 'Quatre questions à poser à un domaine avant de signer : les réponses fixent le déroulé de votre journée plus que tout autre choix.',
    },
    content: {
      en: `Couples choose a venue for how it looks. What it does to the day is decided by four things in the hire contract, and none of them are visible on a visit.

## 1. The curfew

Rural communes routinely require amplified music to stop at midnight or one. It is a condition of the venue's own licence, not something the estate can waive for you, and it moves everything: if the music stops at midnight, dinner cannot start at ten.

Ask for it in writing. "It's usually fine" is not an answer.

## 2. What may be photographed indoors

Several estates permit the ceremony but not the state rooms. Many forbid flash anywhere inside, for conservation rather than nuisance. Some allow interiors only outside opening hours, which for a monument that receives visitors means after five.

This changes where the preparations happen and whether a wet-weather plan exists at all. It is in your contract, and it is worth reading before you sign rather than after.

## 3. The wet-weather plan

Ask what happens if it rains, and require a specific answer. "There's the orangery" is a real answer. "We'd find something" is not, and in September in the Loire it is a coin toss.

The question behind the question: is there a covered space that holds all your guests, and is it included or hired separately?

## 4. Access and timings

When can suppliers arrive? When must everyone be off the site? Are the gardens open to you after dinner, or locked at nine?

That last one catches people. An estate that closes its gardens at nine has quietly removed the possibility of night portraits, which is often the reason the couple chose it.

## Why we ask before the day

We contact the venue as soon as a wedding is booked, for exactly these four answers, because they determine the running order more than anything we would choose ourselves. A ceremony at five with golden light at eight is a different day from a ceremony at two with a garden that locks at nine.

More on planning in [getting married in France](/blog/getting-married-in-france), and on the paperwork side in [photography permits](/blog/photography-permits-france).`,
      fr: `Les couples choisissent un lieu pour son allure. Ce que ce lieu fait à la journée est décidé par quatre éléments du contrat de location, et aucun n’est visible lors d’une visite.

## 1. Le couvre-feu

Les communes rurales imposent régulièrement l’arrêt de la musique amplifiée à minuit ou une heure. C’est une condition de l’autorisation du lieu, pas quelque chose que le domaine peut lever pour vous, et cela déplace tout : si la musique s’arrête à minuit, le dîner ne peut pas commencer à vingt-deux heures.

Demandez-le par écrit. « En général ça passe » n’est pas une réponse.

## 2. Ce qui peut être photographié en intérieur

Plusieurs domaines autorisent la cérémonie mais pas les pièces d’apparat. Beaucoup interdisent le flash à l’intérieur, pour la conservation et non pour la nuisance. Certains n’ouvrent les intérieurs qu’en dehors des horaires de visite, ce qui, pour un monument qui reçoit du public, signifie après dix-sept heures.

Cela change le lieu des préparatifs et l’existence même d’un plan pluie. C’est dans votre contrat, et mieux vaut le lire avant de signer qu’après.

## 3. Le plan pluie

Demandez ce qui se passe s’il pleut, et exigez une réponse précise. « Il y a l’orangerie » est une vraie réponse. « On trouvera » n’en est pas une, et en septembre en Loire c’est un pile ou face.

La question derrière la question : existe-t-il un espace couvert qui accueille tous vos invités, et est-il compris ou facturé à part ?

## 4. Accès et horaires

Quand les prestataires peuvent-ils arriver ? Quand tout le monde doit-il avoir quitté le site ? Les jardins vous sont-ils ouverts après le dîner, ou fermés à vingt et une heures ?

Ce dernier point surprend. Un domaine qui ferme ses jardins à vingt et une heures a discrètement supprimé la possibilité de portraits de nuit — souvent la raison pour laquelle le couple l’avait choisi.

## Pourquoi nous demandons en amont

Nous contactons le lieu dès la réservation, précisément pour ces quatre réponses, parce qu’elles déterminent le déroulé plus que tout ce que nous choisirions. Une cérémonie à dix-sept heures avec une lumière dorée à vingt heures, ce n’est pas la même journée qu’une cérémonie à quatorze heures dans un jardin qui ferme à vingt et une.

Plus sur l’organisation dans [se marier en France](/blog/getting-married-in-france), et sur les formalités dans [autorisations de prise de vue](/blog/photography-permits-france).`,
    },
    faqs: [
      {
        question: { en: 'What is the single most useful question to ask a venue?', fr: 'Quelle est la question la plus utile à poser à un lieu ?' },
        answer: {
          en: 'What time must amplified music stop. It is fixed by the commune rather than the estate, it cannot be negotiated on the day, and it decides when dinner starts — which decides everything else.',
          fr: 'À quelle heure la musique amplifiée doit s’arrêter. C’est fixé par la commune et non par le domaine, cela ne se négocie pas le jour même, et cela détermine l’heure du dîner — donc tout le reste.',
        },
      },
    ],
  },

  {
    slug: 'mont-saint-michel-tides',
    date: '2026-09-08',
    readTime: '4 min',
    author: 'Guillaume Lefèvre',
    cover: '/images/cities/mont-saint-michel.jpg',
    coverAlt: {
      en: 'Mont-Saint-Michel surrounded by water at high tide',
      fr: 'Le Mont-Saint-Michel entouré d’eau à marée haute',
    },
    section: { en: 'Locations', fr: 'Lieux' },
    title: {
      en: 'Mont-Saint-Michel: choosing the date from a tide table',
      fr: 'Mont-Saint-Michel : choisir la date sur les marées',
    },
    summary: {
      en: 'The tide decides whether the Mont is an island or a building on grey sand. Both are published years ahead, which makes this the one session nobody has to guess at.',
      fr: 'La marée décide si le Mont est une île ou un bâtiment posé sur du sable gris. Les deux sont publiées des années à l’avance : la seule séance où personne n’a à deviner.',
    },
    content: {
      en: `This is the only place we photograph where the calendar matters less than a number published by the hydrographic service.

## Two completely different subjects

**High spring tide.** The water comes right up to the causeway and the Mont is an island, reflected, with nothing around it. This is the photograph people have in mind.

**Low tide.** It stands on a plain of grey sand you can walk out onto, small in a very large space. Quieter, stranger, and arguably the better picture — but not the one anyone books expecting.

Neither is better. They are not interchangeable, and choosing between them is the first decision.

## The coefficient

French tide tables publish a coefficient from 20 to 120. Above **100**, the water surrounds the Mont completely. The highest tides follow the new and full moons by 36 to 48 hours, and the biggest of the year fall around the equinoxes in March and September.

Below about 70, the causeway view is water somewhere in the middle distance rather than around the walls.

All of this is published years ahead. Tell us which version you want and we pick the days in your window that give it.

## The hour, once you have the day

Sunrise from the causeway, or the hour after sunset when the walls are lit and the sky still holds colour. In the middle of the day the Mont is backlit from the causeway side and full of people.

## Walking out onto the sand

The bay has quicksand and a tide that returns faster than you can walk. Crossing it is done with a licensed guide, always, and that is not caution — people die there. Booked in advance, it gives the frame nobody else has: the Mont small, across wet sand, with the whole sky.

See the [Mont-Saint-Michel page](/cities/mont-saint-michel) for how sessions there are planned.`,
      fr: `C’est le seul endroit où nous photographions où le calendrier compte moins qu’un nombre publié par le service hydrographique.

## Deux sujets entièrement différents

**Marée haute de vive-eau.** L’eau vient jusqu’à la digue et le Mont est une île, avec son reflet et rien autour. C’est la photographie que les gens ont en tête.

**Marée basse.** Il se dresse sur une plaine de sable gris sur laquelle on peut marcher, petit dans un très grand espace. Plus calme, plus étrange, et sans doute la meilleure image — mais pas celle qu’on réserve en s’y attendant.

Aucune n’est meilleure. Elles ne sont pas interchangeables, et choisir entre les deux est la première décision.

## Le coefficient

Les annuaires de marées publient un coefficient de 20 à 120. Au-dessus de **100**, l’eau entoure complètement le Mont. Les plus fortes marées suivent la nouvelle et la pleine lune de 36 à 48 heures, et les plus grandes de l’année tombent autour des équinoxes, en mars et en septembre.

En dessous de 70 environ, la vue depuis la digue montre de l’eau quelque part au loin plutôt qu’autour des remparts.

Tout cela est publié des années à l’avance. Dites-nous quelle version vous voulez et nous choisissons dans votre créneau les jours qui la donnent.

## L’heure, une fois le jour choisi

Au lever du jour depuis la digue, ou l’heure qui suit le coucher du soleil quand les remparts sont éclairés et que le ciel garde de la couleur. En milieu de journée, le Mont est à contre-jour depuis la digue et plein de monde.

## Marcher sur le sable

La baie compte des sables mouvants et une marée qui revient plus vite qu’on ne marche. La traversée se fait avec un guide agréé, toujours, et ce n’est pas de la prudence excessive : on y meurt. Réservée à l’avance, elle donne le cadre que personne d’autre n’a : le Mont petit, à travers le sable mouillé, avec tout le ciel.

Voir la [page Mont-Saint-Michel](/cities/mont-saint-michel) pour l’organisation des séances.`,
    },
    faqs: [
      {
        question: { en: 'Which tide should we choose?', fr: 'Quelle marée choisir ?' },
        answer: {
          en: 'A coefficient above 100 if you want the Mont surrounded by water; below 70 if you want the sand. Both are published years ahead, so unlike almost everything else in photography, this one can be decided exactly.',
          fr: 'Un coefficient supérieur à 100 pour le Mont entouré d’eau, inférieur à 70 pour le sable. Les deux sont publiés des années à l’avance : contrairement à presque tout en photographie, cela se décide exactement.',
        },
      },
    ],
  },

  {
    slug: 'winter-photo-sessions-france',
    date: '2026-09-08',
    readTime: '5 min',
    author: 'Claire Hoffmann',
    cover: '/images/cities/colmar.jpg',
    coverAlt: {
      en: 'A canal in Colmar with frost on the timbered houses',
      fr: 'Un canal de Colmar avec du givre sur les maisons à colombages',
    },
    section: { en: 'Seasons', fr: 'Saisons' },
    title: {
      en: 'Winter sessions: the season nobody books',
      fr: 'Séances d’hiver : la saison que personne ne réserve',
    },
    summary: {
      en: 'Short days, low sun all afternoon, empty landmarks and half-price venues. What winter costs you and what it gives back.',
      fr: 'Journées courtes, soleil bas tout l’après-midi, monuments vides et lieux à moitié prix. Ce que l’hiver coûte et ce qu’il rend.',
    },
    content: {
      en: `Almost nobody asks for December to February, and the reasons they give — it will be grey, it will be cold, the days are short — are only two-thirds wrong.

## What you actually gain

**The sun stays low all day.** In June, good light is two windows of an hour each. In January the sun never climbs high enough to be a problem, so from ten in the morning until it sets you are working in light that in summer you would have to get up at five for.

**The places are empty.** [Colmar](/cities/colmar) in February, the [Petite France](/cities/strasbourg) at nine in the morning, [Étretat](/cities/etretat) with nobody on the cliff path. In August none of those sentences are possible.

**Venues are half price.** For a small wedding or an elopement this is not a minor point. A château in January with a fire lit costs a fraction of the same château in June and photographs better than the same château in a heatwave.

## What it costs you

**The day is short.** Sunset around half past four in December, so a session runs early afternoon and there is no evening option. Everything has to happen in one block.

**Grey is likely, and mostly fine.** An overcast sky is a very large soft light source, which is why [Lille](/cities/lille) is one of the best portrait cities in France. It flattens landscapes and flatters faces, which is the trade.

**Cold is real.** An hour outdoors at four degrees is genuinely uncomfortable in wedding clothes, and it shows. Winter sessions are shorter and built around somewhere to go inside.

## Where winter is best

**Alsace.** [Colmar](/cities/colmar) and [Strasbourg](/cities/strasbourg) are at their peak: markets in December, frost and empty streets in January, and buildings coloured enough to carry a grey sky without help.

**The Riviera.** Fifteen degrees, blue sea, low sun and an empty Promenade — see [when to photograph the Riviera](/blog/french-riviera-when-to-go).

**The Alps.** Snow from December, which is the whole point of [Chamonix](/cities/chamonix).

**Normandy.** The best light of the year on the bay, and [Mont-Saint-Michel](/cities/mont-saint-michel) without the crowds.`,
      fr: `Presque personne ne demande décembre à février, et les raisons invoquées — il fera gris, il fera froid, les jours sont courts — ne sont fausses qu’aux deux tiers.

## Ce que vous y gagnez

**Le soleil reste bas toute la journée.** En juin, la bonne lumière tient en deux fenêtres d’une heure. En janvier, le soleil ne monte jamais assez haut pour poser problème : de dix heures jusqu’au coucher, vous travaillez dans une lumière pour laquelle il faudrait se lever à cinq heures en été.

**Les lieux sont vides.** [Colmar](/cities/colmar) en février, la [Petite France](/cities/strasbourg) à neuf heures, [Étretat](/cities/etretat) sans personne sur le sentier. En août, aucune de ces phrases n’est possible.

**Les lieux sont à moitié prix.** Pour un petit mariage ou un élopement, ce n’est pas un détail. Un château en janvier avec une cheminée allumée coûte une fraction du même château en juin et se photographie mieux que le même château en canicule.

## Ce que cela coûte

**La journée est courte.** Coucher vers seize heures trente en décembre : la séance se fait en début d’après-midi et il n’y a pas d’option en soirée. Tout doit tenir dans un seul bloc.

**Le gris est probable, et le plus souvent sans importance.** Un ciel couvert est une très grande source douce, et c’est pourquoi [Lille](/cities/lille) est l’une des meilleures villes de portrait de France. Cela aplatit les paysages et flatte les visages : c’est l’échange.

**Le froid est réel.** Une heure dehors à quatre degrés est franchement inconfortable en tenue de mariage, et cela se voit. Les séances d’hiver sont plus courtes et construites autour d’un endroit où rentrer.

## Où l’hiver est le meilleur

**L’Alsace.** [Colmar](/cities/colmar) et [Strasbourg](/cities/strasbourg) sont à leur sommet : marchés en décembre, givre et rues vides en janvier, et des bâtiments assez colorés pour porter un ciel gris sans aide.

**La Côte d’Azur.** Quinze degrés, mer bleue, soleil bas et Promenade vide — voir [quand photographier la Côte d’Azur](/blog/french-riviera-when-to-go).

**Les Alpes.** La neige à partir de décembre, ce qui est tout l’intérêt de [Chamonix](/cities/chamonix).

**La Normandie.** La meilleure lumière de l’année sur la baie, et le [Mont-Saint-Michel](/cities/mont-saint-michel) sans la foule.`,
    },
    faqs: [
      {
        question: { en: 'Will a grey day ruin the photographs?', fr: 'Un jour gris gâche-t-il les photographies ?' },
        answer: {
          en: 'No. An overcast sky is a very large soft light source and is the best light there is for faces. It does flatten a landscape, so a winter session leans on architecture and detail rather than on distant views.',
          fr: 'Non. Un ciel couvert est une très grande source douce et la meilleure lumière qui soit pour les visages. Il aplatit en revanche les paysages : une séance d’hiver s’appuie donc sur l’architecture et le détail plutôt que sur les vues lointaines.',
        },
      },
    ],
  },
];
