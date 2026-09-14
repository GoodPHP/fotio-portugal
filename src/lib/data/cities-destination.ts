import type { City } from '../types';

/**
 * The twelve places people travel to in order to be photographed there:
 * weddings, elopements, honeymoons and holiday sessions. The constraint here is
 * rarely the light — it is access, permits, season and, in two cases, the tide.
 */
export const DESTINATION_CITIES: City[] = [
  {
    slug: 'aix-en-provence',
    name: 'Aix-en-Provence',
    region: { en: 'Provence-Alpes-Côte d’Azur', fr: 'Provence-Alpes-Côte d’Azur' },
    lede: {
      en: 'The lavender everyone comes for is cut in the first days of August. Almost every disappointed Provence booking is that one fact, learned late.',
      fr: 'La lavande pour laquelle tout le monde vient est coupée dans les premiers jours d’août. Presque toute réservation déçue en Provence tient à ce seul fait, appris trop tard.',
    },
    narrative: {
      en: 'Aix itself is plane trees, fountains and warm stone, and it works all year. What brings most people is the country around it — the Luberon villages, the ochre of Roussillon, and the lavender plateaus an hour north, which exist on a calendar of about six weeks and not a day longer.',
      fr: 'Aix, c’est des platanes, des fontaines et de la pierre chaude, et cela fonctionne toute l’année. Ce qui fait venir la plupart des gens, c’est la campagne autour — les villages du Luberon, l’ocre de Roussillon, et les plateaux de lavande à une heure au nord, qui existent sur un calendrier d’environ six semaines, pas un jour de plus.',
    },
    seasonality: {
      en: 'Lavender flowers from the last week of June to roughly 20 July on the Valensole plateau, later and shorter at altitude on Sault. September and early October give the best all-round light of the year with no crowds. Winter is clear, cold and completely empty.',
      fr: 'La lavande fleurit de la dernière semaine de juin au 20 juillet environ sur le plateau de Valensole, plus tard et moins longtemps en altitude sur Sault. Septembre et début octobre donnent la meilleure lumière de l’année, sans foule. L’hiver est clair, froid et totalement vide.',
    },
    coveredAreas: ['Gordes', 'Roussillon', 'Lourmarin', 'Valensole', 'Saint-Rémy-de-Provence', 'Cassis'],
    gallery: [
      {
        src: '/images/gallery/aix-en-provence/1.jpg',
        alt: { en: 'A field of lavender' },
      },
      {
        src: '/images/gallery/aix-en-provence/2.jpg',
        alt: { en: 'A courtyard with a fountain in the middle of it' },
      },
      {
        src: '/images/gallery/aix-en-provence/3.jpg',
        alt: { en: 'A couple of people that are walking down a street' },
      },
    ],
    spots: [
      {
        name: 'Plateau de Valensole',
        bestTime: { en: 'Sunrise, late June to 20 July', fr: 'Au lever du jour, de fin juin au 20 juillet' },
        permitCost: {
          en: 'Fields are private working farmland — ask before entering',
          fr: 'Les champs sont des exploitations privées — demander avant d’entrer',
        },
        description: {
          en: 'Rows to the horizon, and by eight in the morning a line of cars along the D6. These are working farms, not a park: walking into a field without asking damages the crop and is increasingly, and reasonably, resented.',
          fr: 'Des rangs jusqu’à l’horizon, et dès huit heures une file de voitures le long de la D6. Ce sont des exploitations agricoles, pas un parc : entrer dans un champ sans demander abîme la récolte et est de plus en plus mal vu, à juste titre.',
        },
      },
      {
        name: 'Cours Mirabeau et le vieil Aix',
        bestTime: { en: 'Morning, under the plane trees', fr: 'Le matin, sous les platanes' },
        permitCost: { en: 'Free — public streets', fr: 'Gratuit — voirie publique' },
        description: {
          en: 'Dappled light through the planes, fountains and shuttered fronts. The reliable fallback when the lavender is over or the mistral has taken the plateau.',
          fr: 'Lumière tachetée à travers les platanes, fontaines et façades à volets. Le repli fiable quand la lavande est passée ou que le mistral a pris le plateau.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'When exactly is the lavender out?', fr: 'À quelle date exacte la lavande est-elle en fleur ?' },
        answer: {
          en: 'On Valensole, from about 25 June to 20 July, and the harvest can start earlier after a hot spring. Sault, higher up, runs a week or two later. We confirm the state of the fields the same week rather than promising a date in advance.',
          fr: 'Sur Valensole, du 25 juin au 20 juillet environ, et la coupe peut démarrer plus tôt après un printemps chaud. Sault, plus haut, décale d’une à deux semaines. Nous confirmons l’état des champs la semaine même plutôt que de promettre une date à l’avance.',
        },
      },
    ],
    quote: {
      text: {
        en: 'Two couples a year arrive in the first week of August expecting lavender. There is nothing I can do for them but photograph the villages beautifully.',
        fr: 'Deux couples par an arrivent la première semaine d’août en espérant la lavande. Je ne peux rien pour eux, sinon photographier magnifiquement les villages.',
      },
      author: 'Baptiste Roux',
      role: { en: 'Photographer, Provence', fr: 'Photographe, Provence' },
    },
    stats: { visitors: '3M+', weddings: '2 400+' },
    topServices: ['provence-destination-wedding', 'wedding', 'couple', 'elopement', 'engagement', 'vacation', 'family'],
  },

  {
    slug: 'avignon',
    name: 'Avignon',
    region: { en: 'Provence-Alpes-Côte d’Azur', fr: 'Provence-Alpes-Côte d’Azur' },
    lede: {
      en: 'A walled city that empties the moment the festival ends, which is exactly when it becomes worth photographing.',
      fr: 'Une ville close qui se vide dès la fin du festival — c’est-à-dire précisément quand elle devient intéressante à photographier.',
    },
    narrative: {
      en: 'The Palais des Papes gives a scale nothing else in Provence has, and the ramparts and the bridge give the frames people recognise. In July the festival fills every street and every hotel; from September the city is quiet, warm and yours.',
      fr: 'Le Palais des Papes offre une échelle qu’aucun autre lieu de Provence ne possède, et les remparts et le pont donnent les images que l’on reconnaît. En juillet, le festival remplit chaque rue et chaque hôtel ; à partir de septembre, la ville est calme, douce et à vous.',
    },
    seasonality: {
      en: 'May, June, September and October. Avoid July entirely unless the festival is the point. The mistral funnels down the Rhône here and can make the bridge and the ramparts unworkable at any season.',
      fr: 'Mai, juin, septembre et octobre. Éviter juillet, sauf si le festival est le sujet. Le mistral s’engouffre ici dans le couloir rhodanien et peut rendre le pont et les remparts inexploitables en toute saison.',
    },
    coveredAreas: ['Villeneuve-lès-Avignon', 'Châteauneuf-du-Pape', 'L’Isle-sur-la-Sorgue', 'Orange', 'Nîmes'],
    gallery: [
      {
        src: '/images/gallery/avignon/1.jpg',
        alt: { en: 'A bridge that is over a body of water' },
      },
      {
        src: '/images/gallery/avignon/2.jpg',
        alt: { en: 'River with a bridge and distant city skyline' },
      },
      {
        src: '/images/gallery/avignon/3.jpg',
        alt: { en: 'A stone bridge over water is seen here' },
      },
    ],
    spots: [
      {
        name: 'Palais des Papes',
        bestTime: { en: 'Early morning, before the square fills', fr: 'Tôt le matin, avant que la place se remplisse' },
        permitCost: {
          en: 'Free on the square; interior and commercial use require the monument’s authorisation',
          fr: 'Gratuit sur la place ; intérieur et usage commercial soumis à autorisation du monument',
        },
        description: {
          en: 'An enormous pale facade that takes early light straight on. The square in front is wide enough to give it scale, which is rare — most great buildings in France cannot be stood back from.',
          fr: 'Une immense façade claire qui prend la lumière du matin de plein fouet. La place devant est assez large pour lui donner son échelle, ce qui est rare : la plupart des grands édifices français ne se regardent pas avec du recul.',
        },
      },
      {
        name: 'Île de la Barthelasse',
        bestTime: { en: 'The last hour before sunset', fr: 'La dernière heure avant le coucher du soleil' },
        permitCost: { en: 'Free — public paths', fr: 'Gratuit — chemins publics' },
        description: {
          en: 'The one place to photograph the city with the bridge and the palace together, from across the water, in warm light. Ten minutes from the walls and almost always empty.',
          fr: 'Le seul endroit pour photographier la ville avec le pont et le palais ensemble, depuis l’autre rive, en lumière chaude. À dix minutes des remparts et presque toujours désert.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'Nobody photographs Avignon from the island, and it is the only angle where the whole city fits.',
        fr: 'Personne ne photographie Avignon depuis l’île, et c’est le seul angle où la ville entière tient dans le cadre.',
      },
      author: 'Baptiste Roux',
      role: { en: 'Photographer, Provence', fr: 'Photographe, Provence' },
    },
    stats: { visitors: '1.5M+', weddings: '1 200+' },
    topServices: ['wedding', 'couple', 'elopement', 'vacation', 'engagement', 'family'],
  },

  {
    slug: 'cannes',
    name: 'Cannes',
    region: { en: 'Provence-Alpes-Côte d’Azur', fr: 'Provence-Alpes-Côte d’Azur' },
    lede: {
      en: 'Two weeks a year the town belongs to the festival. The other fifty it is an unusually photogenic seaside city that nobody books.',
      fr: 'Deux semaines par an, la ville appartient au festival. Les cinquante autres, c’est une ville balnéaire particulièrement photogénique que personne ne réserve.',
    },
    narrative: {
      en: 'La Croisette is the frame people expect and the least interesting one available. Le Suquet, the old quarter climbing behind the port, gives narrow streets, warm stone and a view back over the bay — and it is four minutes away on foot.',
      fr: 'La Croisette est le cadre attendu et le moins intéressant. Le Suquet, le vieux quartier qui grimpe derrière le port, offre des ruelles étroites, de la pierre chaude et une vue en retour sur la baie — à quatre minutes à pied.',
    },
    seasonality: {
      en: 'April to June and September to October. The festival takes the second half of May and makes the seafront impossible and every hotel expensive. August is hot and full.',
      fr: 'D’avril à juin et de septembre à octobre. Le festival occupe la seconde quinzaine de mai, rend le front de mer impraticable et les hôtels hors de prix. Août est chaud et plein.',
    },
    coveredAreas: ['Mougins', 'Antibes', 'Juan-les-Pins', 'Le Cannet', 'Théoule-sur-Mer', 'Grasse'],
    gallery: [
      {
        src: '/images/gallery/cannes/1.jpg',
        alt: { en: 'City buildings near body of water under blue sky during daytime' },
      },
      {
        src: '/images/gallery/cannes/2.jpg',
        alt: { en: 'Aerial photo of houses' },
      },
      {
        src: '/images/gallery/cannes/3.jpg',
        alt: { en: 'A clock tower on top of a building next to palm trees' },
      },
    ],
    spots: [
      {
        name: 'Le Suquet',
        bestTime: { en: 'Late afternoon into sunset', fr: 'De la fin d’après-midi au coucher du soleil' },
        permitCost: { en: 'Free — public streets and steps', fr: 'Gratuit — rues et escaliers publics' },
        description: {
          en: 'Stepped lanes, shutters and the bay opening up behind you as you climb. Steep in places — worth mentioning if anyone is in heels.',
          fr: 'Ruelles en escaliers, volets, et la baie qui s’ouvre derrière soi à mesure qu’on monte. Raide par endroits — à signaler si quelqu’un porte des talons.',
        },
      },
      {
        name: 'Îles de Lérins',
        bestTime: { en: 'Morning, first boat', fr: 'Le matin, au premier bateau' },
        permitCost: { en: 'Ferry ticket; the abbey grounds have their own rules', fr: 'Billet de bateau ; le domaine de l’abbaye a ses propres règles' },
        description: {
          en: 'Pines, clear water and no traffic, fifteen minutes offshore. The boat schedule dictates the session length, so it is planned around the return crossing rather than the light.',
          fr: 'Pins, eau claire et aucune circulation, à quinze minutes du rivage. L’horaire des bateaux fixe la durée de la séance, qui se cale donc sur la traversée retour plutôt que sur la lumière.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'The Croisette is a wide pavement with palm trees. Everything worth photographing in Cannes is uphill from it.',
        fr: 'La Croisette est un large trottoir avec des palmiers. Tout ce qui mérite d’être photographié à Cannes est au-dessus.',
      },
      author: 'Léa Fontaine',
      role: { en: 'Photographer, Côte d’Azur', fr: 'Photographe, Côte d’Azur' },
    },
    stats: { visitors: '3M+', weddings: '1 800+' },
    topServices: ['riviera-honeymoon', 'couple', 'proposal', 'wedding', 'vacation', 'fashion-editorial'],
  },

  {
    slug: 'saint-tropez',
    name: 'Saint-Tropez',
    region: { en: 'Provence-Alpes-Côte d’Azur', fr: 'Provence-Alpes-Côte d’Azur' },
    lede: {
      en: 'In August the village is unworkable and the road in takes two hours. In May it is a small fishing port with extraordinary light.',
      fr: 'En août, le village est inexploitable et la route d’accès prend deux heures. En mai, c’est un petit port de pêche à la lumière extraordinaire.',
    },
    narrative: {
      en: 'The colour here — ochre, rose and faded green around the old port — is genuinely unlike the rest of the coast, and it holds up in photographs without help. Everything else about Saint-Tropez is a logistics problem, and the month you choose solves or creates it.',
      fr: 'La couleur ici — ocre, rose et vert passé autour du vieux port — est réellement différente du reste de la côte, et elle tient en photographie sans aide. Tout le reste, à Saint-Tropez, est un problème de logistique, que le mois choisi règle ou crée.',
    },
    seasonality: {
      en: 'May, June, September. July and August are best avoided entirely: the peninsula has one road in, and it is saturated from mid-morning. Winter is closed but the light on the empty port is the best of the year.',
      fr: 'Mai, juin, septembre. Juillet et août sont à éviter : la presqu’île n’a qu’une route d’accès, saturée dès la fin de matinée. L’hiver est fermé, mais la lumière sur le port vide est la meilleure de l’année.',
    },
    coveredAreas: ['Ramatuelle', 'Gassin', 'Grimaud', 'Sainte-Maxime', 'Port-Grimaud'],
    gallery: [
      {
        src: '/images/gallery/saint-tropez/1.jpg',
        alt: { en: 'A group of people standing on a beach next to a body of water' },
      },
      {
        src: '/images/gallery/saint-tropez/2.jpg',
        alt: { en: 'A group of buildings next to a body of water' },
      },
      {
        src: '/images/gallery/saint-tropez/3.jpg',
        alt: { en: 'Brown and white concrete buildings' },
      },
    ],
    spots: [
      {
        name: 'Le vieux port et la Ponche',
        bestTime: { en: 'Before 09:00', fr: 'Avant 09 h 00' },
        permitCost: { en: 'Free — public quays', fr: 'Gratuit — quais publics' },
        description: {
          en: 'The painted fronts along the quay and the small beach behind them. Early is not a preference here, it is the only option: by ten the quay is a single moving crowd.',
          fr: 'Les façades peintes le long du quai et la petite plage derrière. Le matin tôt n’est pas une préférence ici, c’est la seule option : à dix heures, le quai est une foule continue.',
        },
      },
      {
        name: 'Citadelle',
        bestTime: { en: 'Late afternoon', fr: 'Fin d’après-midi' },
        permitCost: { en: 'Entry ticket for the grounds', fr: 'Billet d’entrée pour le site' },
        description: {
          en: 'Above the village, with the gulf behind. Quiet even in season, because it involves a climb, which is precisely why it stays usable.',
          fr: 'Au-dessus du village, avec le golfe derrière. Calme même en saison, parce qu’il faut monter — ce qui est exactement pourquoi cela reste exploitable.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'I do not accept August bookings here any more. I cannot deliver what people have seen in photographs taken in June.',
        fr: 'Je n’accepte plus de réservations en août ici. Je ne peux pas livrer ce que les gens ont vu sur des photos prises en juin.',
      },
      author: 'Léa Fontaine',
      role: { en: 'Photographer, Côte d’Azur', fr: 'Photographe, Côte d’Azur' },
    },
    stats: { visitors: '2M+', weddings: '900+' },
    topServices: ['riviera-honeymoon', 'couple', 'wedding', 'proposal', 'vacation', 'fashion-editorial'],
  },

  {
    slug: 'annecy',
    name: 'Annecy',
    region: { en: 'Auvergne-Rhône-Alpes', fr: 'Auvergne-Rhône-Alpes' },
    lede: {
      en: 'The lake is the clearest in Europe and photographs turquoise only when the sun is high — the opposite of every other rule on this site.',
      fr: 'Le lac est le plus clair d’Europe et ne rend turquoise que lorsque le soleil est haut — l’inverse de toutes les autres règles de ce site.',
    },
    narrative: {
      en: 'Annecy asks for a compromise no other place does. The old town, with its canals and painted fronts, wants early or late light like anywhere else; the water only shows its colour between about ten and four, when the sun is steep enough to reach the bottom. Doing both well means two short sessions rather than one long one.',
      fr: 'Annecy impose un compromis qu’aucun autre lieu ne demande. La vieille ville, avec ses canaux et ses façades peintes, veut une lumière matinale ou tardive comme partout ; l’eau ne montre sa couleur qu’entre dix et seize heures, quand le soleil est assez haut pour atteindre le fond. Bien faire les deux suppose deux séances courtes plutôt qu’une longue.',
    },
    seasonality: {
      en: 'June to September for the water. October gives the mountains their first snow with the lake still warm-toned. Winter is often clear and cold, with the peaks white behind the old town, and almost nobody there.',
      fr: 'De juin à septembre pour l’eau. Octobre donne aux montagnes leur première neige avec un lac encore chaud de ton. L’hiver est souvent clair et froid, avec les sommets blancs derrière la vieille ville, et presque personne.',
    },
    coveredAreas: ['Talloires', 'Veyrier-du-Lac', 'Menthon-Saint-Bernard', 'Duingt', 'Sévrier', 'La Clusaz'],
    spots: [
      {
        name: 'Pont des Amours et canaux du vieil Annecy',
        bestTime: { en: 'Before 09:00', fr: 'Avant 09 h 00' },
        permitCost: { en: 'Free — public streets and bridges', fr: 'Gratuit — voirie et ponts publics' },
        description: {
          en: 'Painted fronts over green water, and a bridge that carries a steady queue of visitors from mid-morning to dusk. Empty at eight, impossible at eleven.',
          fr: 'Façades peintes au-dessus d’une eau verte, et un pont qui accueille une file continue de visiteurs de la fin de matinée au crépuscule. Vide à huit heures, impossible à onze.',
        },
      },
      {
        name: 'Rives du lac, côté Sévrier',
        bestTime: { en: '11:00 – 15:00, for the colour of the water', fr: '11 h 00 – 15 h 00, pour la couleur de l’eau' },
        permitCost: { en: 'Free — public shore', fr: 'Gratuit — rives publiques' },
        description: {
          en: 'The turquoise only appears with the sun high, which is why this is the one location we book at midday. Mountains behind, and enough shore to work along.',
          fr: 'Le turquoise n’apparaît qu’avec un soleil haut, et c’est pourquoi c’est le seul lieu que nous réservons à midi. Les montagnes derrière, et assez de rive pour travailler.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Can we get the old town and the lake in one session?', fr: 'Peut-on faire la vieille ville et le lac en une seule séance ?' },
        answer: {
          en: 'Only by accepting that one of them will be at the wrong hour. If the turquoise water matters to you, we shoot the lake at midday and the old town at eight the next morning — two short sessions rather than one that compromises both.',
          fr: 'Seulement en acceptant que l’un des deux soit à la mauvaise heure. Si l’eau turquoise compte pour vous, nous faisons le lac à midi et la vieille ville à huit heures le lendemain — deux séances courtes plutôt qu’une qui rate les deux.',
        },
      },
    ],
    quote: {
      text: {
        en: 'Annecy is the only place I ask people to shoot at noon. The lake is worth breaking the rule for.',
        fr: 'Annecy est le seul endroit où je demande de photographier à midi. Le lac justifie qu’on enfreigne la règle.',
      },
      author: 'Thomas Vernet',
      role: { en: 'Photographer, Haute-Savoie', fr: 'Photographe, Haute-Savoie' },
    },
    stats: { visitors: '2.5M+', weddings: '1 500+' },
    topServices: ['couple', 'proposal', 'wedding', 'engagement', 'family', 'vacation', 'elopement'],
  },

  {
    slug: 'chamonix',
    name: 'Chamonix',
    region: { en: 'Auvergne-Rhône-Alpes', fr: 'Auvergne-Rhône-Alpes' },
    lede: {
      en: 'Cloud at altitude is not the problem people expect — it diffuses beautifully. Wind is, and it is what moves a date.',
      fr: 'Le nuage en altitude n’est pas le problème qu’on imagine : il diffuse superbement. Le vent, si — et c’est lui qui déplace une date.',
    },
    narrative: {
      en: 'Everything here is decided by the weather window and the lift schedule, in that order. The valley floor works in almost any conditions; anything above two thousand metres depends on a forecast we read together forty-eight hours out, with a second date already held.',
      fr: 'Tout se décide ici par la fenêtre météo et l’horaire des remontées, dans cet ordre. Le fond de vallée fonctionne dans presque toutes les conditions ; tout ce qui dépasse deux mille mètres dépend d’une prévision que nous lisons ensemble quarante-huit heures avant, avec une seconde date déjà réservée.',
    },
    seasonality: {
      en: 'Late June to September for green valleys and open passes; December to March for snow. October and May are the two dead months — lifts closed, snow patchy, nothing at its best.',
      fr: 'De fin juin à septembre pour les vallées vertes et les cols ouverts ; de décembre à mars pour la neige. Octobre et mai sont les deux mois morts : remontées fermées, neige incertaine, rien à son meilleur.',
    },
    coveredAreas: ['Argentière', 'Les Houches', 'Megève', 'Saint-Gervais-les-Bains', 'Combloux'],
    gallery: [
      {
        src: '/images/gallery/chamonix/1.jpg',
        alt: { en: 'Green grass field near mountain under blue sky during daytime' },
      },
      {
        src: '/images/gallery/chamonix/2.jpg',
        alt: { en: 'Brown wooden houses near green trees and mountain under white clouds during daytime' },
      },
      {
        src: '/images/gallery/chamonix/3.jpg',
        alt: { en: 'A mountain village with a mountain in the background' },
      },
    ],
    spots: [
      {
        name: 'Lac Blanc',
        bestTime: { en: 'Sunrise, July to September', fr: 'Au lever du jour, de juillet à septembre' },
        permitCost: { en: 'Lift ticket plus a two-hour walk', fr: 'Forfait remontée plus deux heures de marche' },
        description: {
          en: 'The Mont Blanc massif reflected in still water at 2,352 metres. Requires the first lift and real walking boots; the reflection only exists before the wind gets up, which is usually before nine.',
          fr: 'Le massif du Mont-Blanc reflété dans une eau immobile à 2 352 mètres. Demande la première benne et de vraies chaussures ; le reflet n’existe qu’avant que le vent se lève, soit généralement avant neuf heures.',
        },
      },
      {
        name: 'Mer de Glace et Montenvers',
        bestTime: { en: 'Morning, any season', fr: 'Le matin, en toute saison' },
        permitCost: { en: 'Rack railway ticket', fr: 'Billet du train à crémaillère' },
        description: {
          en: 'Reached by train rather than on foot, which makes it the choice when the group includes anyone who cannot walk two hours uphill.',
          fr: 'Accessible en train plutôt qu’à pied, ce qui en fait le choix dès que le groupe compte quelqu’un qui ne peut pas marcher deux heures en montée.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'What if the weather turns?', fr: 'Et si le temps tourne ?' },
        answer: {
          en: 'We hold a second date from the moment you book and decide together two days out, not on the morning. Low cloud is usually workable and often better than sun; sustained wind above about forty kilometres an hour is what actually cancels an altitude session.',
          fr: 'Nous réservons une seconde date dès votre réservation et décidons ensemble deux jours avant, pas le matin même. Le plafond bas est généralement exploitable et souvent meilleur que le soleil ; c’est le vent soutenu au-delà d’environ quarante kilomètres-heure qui annule réellement une séance en altitude.',
        },
      },
    ],
    quote: {
      text: {
        en: 'People book sunshine and get cloud, and the cloud pictures are always the ones they print.',
        fr: 'On réserve du soleil, on a des nuages, et ce sont toujours les images de nuages qui finissent imprimées.',
      },
      author: 'Thomas Vernet',
      role: { en: 'Photographer, Haute-Savoie', fr: 'Photographe, Haute-Savoie' },
    },
    stats: { visitors: '2M+', weddings: '700+' },
    topServices: ['french-alps-elopement', 'elopement', 'couple', 'proposal', 'wedding', 'engagement', 'vacation'],
  },

  {
    slug: 'colmar',
    name: 'Colmar',
    region: { en: 'Grand Est', fr: 'Grand Est' },
    lede: {
      en: 'Small enough to cross in fifteen minutes, and saturated enough that no session here has ever needed help with colour.',
      fr: 'Assez petite pour se traverser en quinze minutes, et assez saturée pour qu’aucune séance n’y ait jamais eu besoin d’aide sur la couleur.',
    },
    narrative: {
      en: 'Colmar is compact to the point of being a single location: half-timbered fronts in pink, ochre, blue and green, canals through the middle, and no walking to speak of. It is also, for its size, extremely busy — the useful window is before the coaches arrive and after they leave.',
      fr: 'Colmar est compacte au point de constituer un lieu unique : façades à colombages roses, ocre, bleues et vertes, canaux au milieu, et aucun trajet à parler. Elle est aussi, pour sa taille, extrêmement fréquentée : la fenêtre utile se situe avant l’arrivée des autocars et après leur départ.',
    },
    seasonality: {
      en: 'April to June and September to October for comfort. December for the markets, which are the busiest weeks of the year and need booking far ahead. The town is at its emptiest in January and February and the colour survives grey weather intact.',
      fr: 'D’avril à juin et de septembre à octobre pour le confort. Décembre pour les marchés, semaines les plus chargées de l’année, à réserver très en avance. La ville est au plus vide en janvier et février, et la couleur y résiste intacte au temps gris.',
    },
    coveredAreas: ['Riquewihr', 'Eguisheim', 'Kaysersberg', 'Ribeauvillé', 'Turckheim'],
    gallery: [
      {
        src: '/images/gallery/colmar/1.jpg',
        alt: { en: 'Brown and white concrete buildings beside river under white clouds during daytime' },
      },
      {
        src: '/images/gallery/colmar/2.jpg',
        alt: { en: 'Red flowers in front of white and brown concrete building' },
      },
      {
        src: '/images/gallery/colmar/3.jpg',
        alt: { en: 'Half-timbered houses line a canal with reflections' },
      },
    ],
    spots: [
      {
        name: 'La Petite Venise',
        bestTime: { en: 'Before 09:00 or after 18:00', fr: 'Avant 09 h 00 ou après 18 h' },
        permitCost: { en: 'Free — public quays', fr: 'Gratuit — quais publics' },
        description: {
          en: 'The canal, the flowered balconies and the row of coloured fronts. Perhaps two hundred metres of it, and it carries a full session because the density of detail is so high.',
          fr: 'Le canal, les balcons fleuris et l’alignement de façades colorées. Deux cents mètres tout au plus, qui portent une séance entière tant la densité de détail est forte.',
        },
      },
      {
        name: 'Quartier des Tanneurs',
        bestTime: { en: 'Midday — the lane is narrow enough to stay shaded', fr: 'À midi — la rue est assez étroite pour rester ombragée' },
        permitCost: { en: 'Free — public streets', fr: 'Gratuit — voirie publique' },
        description: {
          en: 'Tall, narrow timbered houses leaning over a single street. Different in character from the canal and thirty seconds away from it.',
          fr: 'Hautes maisons à colombages étroites, penchées sur une seule rue. D’un caractère différent du canal, et à trente secondes de celui-ci.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'Colmar does not need golden hour. The buildings are already the colour everyone else is chasing.',
        fr: 'Colmar n’a pas besoin de golden hour. Les bâtiments ont déjà la couleur que tout le monde poursuit.',
      },
      author: 'Claire Hoffmann',
      role: { en: 'Photographer, Alsace', fr: 'Photographe, Alsace' },
    },
    stats: { visitors: '3.5M+', weddings: '800+' },
    topServices: ['couple', 'proposal', 'engagement', 'vacation', 'family', 'wedding'],
  },

  {
    slug: 'mont-saint-michel',
    name: 'Mont-Saint-Michel',
    frArticle: 'le',
    region: { en: 'Normandy', fr: 'Normandie' },
    lede: {
      en: 'The only place on this site where the tide table decides the hour, and it is not negotiable.',
      fr: 'Le seul lieu de ce site où l’horaire des marées décide de l’heure, et cela ne se négocie pas.',
    },
    narrative: {
      en: 'Everything depends on water. At high spring tide the Mont is an island and the causeway views are extraordinary; at low tide it stands on grey sand and looks like a different building. Neither is better, but they are not interchangeable, and the tide is published years in advance — so this is one session that can be planned exactly.',
      fr: 'Tout dépend de l’eau. À marée haute de vive-eau, le Mont est une île et les vues depuis la digue sont extraordinaires ; à marée basse, il se dresse sur du sable gris et paraît un autre bâtiment. Aucun des deux n’est meilleur, mais ils ne sont pas interchangeables — et la marée est publiée des années à l’avance, donc c’est une séance qui se planifie exactement.',
    },
    seasonality: {
      en: 'April to October for weather, but the tide coefficient matters more than the month. The highest tides follow the new and full moons; a coefficient above 100 surrounds the Mont completely. Winter light on the bay is the best of the year and the crowds are gone.',
      fr: 'D’avril à octobre pour la météo, mais le coefficient de marée compte plus que le mois. Les plus fortes marées suivent la nouvelle et la pleine lune ; un coefficient supérieur à 100 entoure complètement le Mont. La lumière d’hiver sur la baie est la meilleure de l’année, et la foule a disparu.',
    },
    coveredAreas: ['Pontorson', 'Avranches', 'Saint-Malo', 'Cancale', 'Dinard'],
    gallery: [
      {
        src: '/images/gallery/mont-saint-michel/1.jpg',
        alt: { en: 'A large castle sitting on top of a beach next to a body of water' },
      },
      {
        src: '/images/gallery/mont-saint-michel/2.jpg',
        alt: { en: 'A sandy landscape with a stone structure and birds' },
      },
      {
        src: '/images/gallery/mont-saint-michel/3.jpg',
        alt: { en: 'A small island in the middle of a body of water' },
      },
    ],
    spots: [
      {
        name: 'La digue et le barrage du Couesnon',
        bestTime: { en: 'Sunrise, or the hour after sunset', fr: 'Au lever du jour, ou l’heure après le coucher du soleil' },
        permitCost: { en: 'Free; the shuttle and car park are chargeable', fr: 'Gratuit ; la navette et le parking sont payants' },
        description: {
          en: 'The full silhouette with reflection, from a distance that gives it scale. Book a high coefficient and the water comes right up to the causeway.',
          fr: 'La silhouette entière avec son reflet, à une distance qui lui donne son échelle. Choisissez un fort coefficient et l’eau vient jusqu’à la digue.',
        },
      },
      {
        name: 'Baie, côté Genêts',
        bestTime: { en: 'Low tide only, with a guide', fr: 'À marée basse uniquement, avec un guide' },
        permitCost: {
          en: 'Free, but crossing the bay unguided is genuinely dangerous',
          fr: 'Gratuit, mais traverser la baie sans guide est réellement dangereux',
        },
        description: {
          en: 'The Mont seen small across wet sand, which is the frame nobody has. Quicksand and a fast returning tide make this a guided crossing, not a walk.',
          fr: 'Le Mont vu petit à travers le sable mouillé — le cadre que personne n’a. Sables mouvants et marée montante rapide en font une traversée guidée, pas une promenade.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'How do we choose the date?', fr: 'Comment choisir la date ?' },
        answer: {
          en: 'By the tide table rather than the calendar. Tell us whether you want the Mont surrounded by water or standing on the sand, and we pick the days in your window where the coefficient gives it. Both are published years ahead, so this is the one shoot nobody has to guess at.',
          fr: 'Par l’annuaire des marées plutôt que par le calendrier. Dites-nous si vous voulez le Mont entouré d’eau ou posé sur le sable, et nous choisissons dans votre créneau les jours où le coefficient le permet. Les deux sont publiés des années à l’avance : c’est la seule séance où personne n’a à deviner.',
        },
      },
    ],
    quote: {
      text: {
        en: 'I book this one from a tide table, not a diary. Get the coefficient right and the weather almost stops mattering.',
        fr: 'Celle-là, je la réserve sur un annuaire des marées, pas sur un agenda. Avec le bon coefficient, la météo cesse presque de compter.',
      },
      author: 'Guillaume Lefèvre',
      role: { en: 'Photographer, Normandy', fr: 'Photographe, Normandie' },
    },
    stats: { visitors: '3M+', weddings: '400+' },
    topServices: ['couple', 'proposal', 'elopement', 'engagement', 'vacation', 'wedding'],
  },

  {
    slug: 'etretat',
    name: 'Étretat',
    region: { en: 'Normandy', fr: 'Normandie' },
    lede: {
      en: 'The cliffs face west, so this is one of the few places in France where the whole session is built around sunset rather than sunrise.',
      fr: 'Les falaises sont orientées à l’ouest : c’est l’un des rares endroits de France où toute la séance se construit autour du coucher du soleil plutôt que du lever.',
    },
    narrative: {
      en: 'Two arches, a needle of chalk and a pebble beach between them. The light arrives along the cliffs at the end of the day and turns the chalk from grey to gold in about twenty minutes. The climbs on either side are steep and, in wet weather, genuinely slippery — worth knowing before choosing footwear.',
      fr: 'Deux arches, une aiguille de craie et une plage de galets entre les deux. La lumière arrive le long des falaises en fin de journée et fait passer la craie du gris à l’or en une vingtaine de minutes. Les montées de part et d’autre sont raides et, par temps humide, réellement glissantes — à savoir avant de choisir ses chaussures.',
    },
    seasonality: {
      en: 'May to September for reliable evenings. Autumn storms make the sea spectacular and the cliff paths unsafe. Winter days are short but the low sun sits exactly where you want it all afternoon.',
      fr: 'De mai à septembre pour des soirées fiables. Les tempêtes d’automne rendent la mer spectaculaire et les sentiers de falaise dangereux. Les jours d’hiver sont courts, mais le soleil bas se tient exactement où il faut tout l’après-midi.',
    },
    coveredAreas: ['Le Havre', 'Fécamp', 'Honfleur', 'Yport', 'Deauville'],
    gallery: [
      {
        src: '/images/gallery/etretat/1.jpg',
        alt: { en: 'Monochromatic cliffs and natural arch over the ocean' },
      },
      {
        src: '/images/gallery/etretat/2.jpg',
        alt: { en: 'White cliffs, a natural arch, and sea stack at sunset' },
      },
      {
        src: '/images/gallery/etretat/3.jpg',
        alt: { en: 'Coastal cliffs and beach viewed through a natural cave opening' },
      },
    ],
    spots: [
      {
        name: 'Falaise d’Aval et l’Aiguille',
        bestTime: { en: 'The last hour before sunset', fr: 'La dernière heure avant le coucher du soleil' },
        permitCost: { en: 'Free — public cliff path', fr: 'Gratuit — sentier de falaise public' },
        description: {
          en: 'The arch and the needle together, from the golf-course side. A twenty-minute climb, unfenced in places, and not somewhere to take small children near the edge.',
          fr: 'L’arche et l’aiguille ensemble, depuis le côté du golf. Vingt minutes de montée, sans garde-corps par endroits, et pas un lieu où approcher du bord avec de jeunes enfants.',
        },
      },
      {
        name: 'Plage de galets',
        bestTime: { en: 'Low tide, late afternoon', fr: 'À marée basse, en fin d’après-midi' },
        permitCost: { en: 'Free — public beach', fr: 'Gratuit — plage publique' },
        description: {
          en: 'Looking up at the Porte d’Aval from below. Accessible to everyone, no climb, and at low tide there is enough beach to get real distance from the arch.',
          fr: 'La Porte d’Aval vue d’en bas. Accessible à tous, sans montée, et à marée basse il y a assez de plage pour prendre du recul sur l’arche.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'Twenty minutes. That is how long the chalk stays gold, and everything else that day is preparation for it.',
        fr: 'Vingt minutes. C’est le temps pendant lequel la craie reste dorée, et tout le reste de la journée n’est que préparation.',
      },
      author: 'Guillaume Lefèvre',
      role: { en: 'Photographer, Normandy', fr: 'Photographe, Normandie' },
    },
    stats: { visitors: '1.5M+', weddings: '350+' },
    topServices: ['couple', 'proposal', 'elopement', 'engagement', 'vacation', 'family'],
  },

  {
    slug: 'biarritz',
    name: 'Biarritz',
    region: { en: 'Nouvelle-Aquitaine', fr: 'Nouvelle-Aquitaine' },
    lede: {
      en: 'Atlantic weather changes twice in an afternoon here, which is why nothing is booked without a sheltered alternative already chosen.',
      fr: 'Le temps atlantique change deux fois dans un après-midi : c’est pourquoi rien ne se réserve ici sans une alternative couverte déjà choisie.',
    },
    narrative: {
      en: 'Big surf, a rocky headland and Belle Époque frontage, with the Pyrenees visible down the coast on a clear day. The sea state matters as much as the light — a heavy swell on the Côte des Basques is spectacular and makes the lower beach unusable at the same time.',
      fr: 'De grosses vagues, une pointe rocheuse et des façades Belle Époque, avec les Pyrénées visibles au sud par temps clair. L’état de la mer compte autant que la lumière : une forte houle sur la Côte des Basques est spectaculaire et rend en même temps la plage basse impraticable.',
    },
    seasonality: {
      en: 'June to October, with September the most reliable month of the year. Spring is beautiful and unstable. Winter brings the biggest swell and the emptiest beaches, and the light between storms is exceptional.',
      fr: 'De juin à octobre, septembre étant le mois le plus fiable. Le printemps est beau et instable. L’hiver apporte la plus forte houle et les plages les plus vides, et la lumière entre deux tempêtes y est exceptionnelle.',
    },
    coveredAreas: ['Bayonne', 'Anglet', 'Saint-Jean-de-Luz', 'Bidart', 'Guéthary', 'Hendaye'],
    gallery: [
      {
        src: '/images/gallery/biarritz/1.jpg',
        alt: { en: 'A body of water with a castle on the shore' },
      },
      {
        src: '/images/gallery/biarritz/2.jpg',
        alt: { en: 'A house on a cliff overlooking the ocean' },
      },
      {
        src: '/images/gallery/biarritz/3.jpg',
        alt: { en: 'A stone bridge over a body of water' },
      },
    ],
    spots: [
      {
        name: 'Rocher de la Vierge',
        bestTime: { en: 'The hour before sunset', fr: 'L’heure avant le coucher du soleil' },
        permitCost: { en: 'Free; the footbridge closes in heavy weather', fr: 'Gratuit ; la passerelle ferme par gros temps' },
        description: {
          en: 'A footbridge out to a rock in the ocean, with the whole bay behind. Closed when the sea is up, which is exactly when it looks best from the shore.',
          fr: 'Une passerelle vers un rocher dans l’océan, avec toute la baie derrière. Fermée quand la mer est forte — c’est-à-dire exactement quand elle est la plus belle vue de la côte.',
        },
      },
      {
        name: 'Côte des Basques',
        bestTime: { en: 'Low tide, end of the day', fr: 'À marée basse, en fin de journée' },
        permitCost: { en: 'Free — public beach', fr: 'Gratuit — plage publique' },
        description: {
          en: 'A long beach under a green cliff, with surfers in the water year-round. At high tide there is essentially no beach at all, so this one is planned from the tide table.',
          fr: 'Une longue plage sous une falaise verte, avec des surfeurs à l’eau toute l’année. À marée haute, il n’y a pratiquement plus de plage : ce lieu se planifie donc sur l’annuaire des marées.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'I check the swell forecast before the weather one. A metre and a half and the Côte des Basques disappears.',
        fr: 'Je regarde la houle avant la météo. À un mètre cinquante, la Côte des Basques disparaît.',
      },
      author: 'Iñaki Etchegaray',
      role: { en: 'Photographer, Pays basque', fr: 'Photographe, Pays basque' },
    },
    stats: { visitors: '2M+', weddings: '1 100+' },
    topServices: ['couple', 'wedding', 'family', 'proposal', 'vacation', 'engagement', 'elopement'],
  },

  {
    slug: 'carcassonne',
    name: 'Carcassonne',
    region: { en: 'Occitanie', fr: 'Occitanie' },
    lede: {
      en: 'The walls are floodlit at night and photograph better then than at any hour of daylight.',
      fr: 'Les remparts sont illuminés la nuit et se photographient alors mieux qu’à n’importe quelle heure du jour.',
    },
    narrative: {
      en: 'A double ring of towers on a hill above the Aude, restored in the nineteenth century and unlike anything else in France. Inside the walls it is narrow, busy and hard to photograph; outside, from the lower town and the old bridge, it reads as a single silhouette and works from dusk onward.',
      fr: 'Une double enceinte de tours sur une colline au-dessus de l’Aude, restaurée au XIXe siècle et sans équivalent en France. À l’intérieur des murs, c’est étroit, fréquenté et difficile à photographier ; à l’extérieur, depuis la ville basse et le vieux pont, cela se lit comme une silhouette unique et fonctionne dès la tombée du jour.',
    },
    seasonality: {
      en: 'April to June and September to October. July and August are hot and full, and Bastille Day fireworks over the walls are the single busiest evening of the year. Winter is clear, cold and almost deserted.',
      fr: 'D’avril à juin et de septembre à octobre. Juillet et août sont chauds et pleins, et l’embrasement du 14 juillet est la soirée la plus chargée de l’année. L’hiver est clair, froid et presque désert.',
    },
    coveredAreas: ['Trèbes', 'Limoux', 'Lastours', 'Lagrasse', 'Narbonne'],
    gallery: [
      {
        src: '/images/gallery/carcassonne/1.jpg',
        alt: { en: 'Ancient castle stands on a grassy hill' },
      },
      {
        src: '/images/gallery/carcassonne/2.jpg',
        alt: { en: 'An imposing castle stands against a cloudy sky' },
      },
      {
        src: '/images/gallery/carcassonne/3.jpg',
        alt: { en: 'An old castle with a bridge going through it' },
      },
    ],
    spots: [
      {
        name: 'Pont Vieux',
        bestTime: { en: 'Blue hour, once the floodlights come on', fr: 'À l’heure bleue, une fois les projecteurs allumés' },
        permitCost: { en: 'Free — public bridge', fr: 'Gratuit — pont public' },
        description: {
          en: 'The whole citadel above the river, lit. There is a window of about twenty minutes when the sky still holds colour and the floodlights are already on — after that the sky goes black and the contrast is unmanageable.',
          fr: 'La cité entière au-dessus de la rivière, éclairée. Il existe une fenêtre d’environ vingt minutes où le ciel garde encore de la couleur et où les projecteurs sont déjà allumés ; ensuite le ciel devient noir et le contraste devient ingérable.',
        },
      },
      {
        name: 'Lices de la cité',
        bestTime: { en: 'Before 10:00', fr: 'Avant 10 h 00' },
        permitCost: { en: 'Free between the walls; the château keep is ticketed', fr: 'Gratuit entre les enceintes ; le château comtal est payant' },
        description: {
          en: 'The gravel corridor between the two rings of wall — empty early, and the only part of the interior with room to stand back.',
          fr: 'Le couloir de graviers entre les deux enceintes — vide tôt le matin, et la seule partie intérieure offrant du recul.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'Twenty minutes at blue hour from the Pont Vieux is worth more than a whole day inside the walls.',
        fr: 'Vingt minutes à l’heure bleue depuis le Pont Vieux valent mieux qu’une journée entière dans la cité.',
      },
      author: 'Mathieu Sabatier',
      role: { en: 'Photographer, Occitanie', fr: 'Photographe, Occitanie' },
    },
    stats: { visitors: '2M+', weddings: '600+' },
    topServices: ['couple', 'wedding', 'proposal', 'vacation', 'engagement', 'elopement'],
  },

  {
    slug: 'reims',
    name: 'Reims',
    region: { en: 'Grand Est', fr: 'Grand Est' },
    lede: {
      en: 'The cathedral and the chalk cellars are the two subjects, and one of them is eighteen metres underground at a constant ten degrees.',
      fr: 'La cathédrale et les caves de craie sont les deux sujets, et l’un des deux se trouve à dix-huit mètres sous terre, à dix degrés constants.',
    },
    narrative: {
      en: 'Reims runs on the champagne calendar. The great houses open their cellars for photographs by arrangement, and those interiors — chalk galleries, thousands of bottles, no daylight at all — are unlike anything else on this site. Above ground the cathedral front is the finest gothic sculpture in the country and takes low sun exceptionally well.',
      fr: 'Reims vit au rythme du champagne. Les grandes maisons ouvrent leurs caves à la prise de vue sur rendez-vous, et ces intérieurs — galeries de craie, milliers de bouteilles, aucune lumière du jour — ne ressemblent à rien d’autre sur ce site. En surface, la façade de la cathédrale est la plus belle sculpture gothique du pays et prend remarquablement bien le soleil bas.',
    },
    seasonality: {
      en: 'May, June and September. The harvest runs from late August into September and the houses are working — access is harder and the vineyards are full of people. Winter is quiet and the cellars are unaffected by weather entirely.',
      fr: 'Mai, juin et septembre. Les vendanges vont de fin août à septembre et les maisons travaillent : les accès sont plus difficiles et les vignes pleines de monde. L’hiver est calme, et les caves sont totalement indifférentes à la météo.',
    },
    coveredAreas: ['Épernay', 'Hautvillers', 'Aÿ', 'Châlons-en-Champagne', 'Verzenay'],
    gallery: [
      {
        src: '/images/gallery/reims/1.jpg',
        alt: { en: 'Cars parked in front of brown concrete building during daytime' },
      },
      {
        src: '/images/gallery/reims/2.jpg',
        alt: { en: 'Low angle photography of high-rise building' },
      },
      {
        src: '/images/gallery/reims/3.jpg',
        alt: { en: 'Gray concrete cathedral' },
      },
    ],
    spots: [
      {
        name: 'Cathédrale Notre-Dame',
        bestTime: { en: 'Late afternoon, on the west front', fr: 'Fin d’après-midi, sur la façade ouest' },
        permitCost: {
          en: 'Free outside; interior photography follows the diocese’s rules',
          fr: 'Gratuit à l’extérieur ; l’intérieur suit les règles du diocèse',
        },
        description: {
          en: 'Deeply carved and west-facing, so it takes raking light for the last two hours of the day. The square gives enough distance to photograph it whole, which most French cathedrals do not.',
          fr: 'Profondément sculptée et orientée à l’ouest : elle prend la lumière rasante les deux dernières heures du jour. Le parvis offre assez de recul pour la photographier entière, ce que la plupart des cathédrales françaises ne permettent pas.',
        },
      },
      {
        name: 'Caves de craie',
        bestTime: { en: 'Any hour — there is no daylight down there', fr: 'À toute heure — il n’y a aucune lumière du jour' },
        permitCost: { en: 'By arrangement with the house; most charge for a private session', fr: 'Sur accord de la maison ; la plupart facturent une privatisation' },
        description: {
          en: 'Roman chalk quarries turned into cellars, eighteen metres down and ten degrees all year. Entirely artificial light, so the weather outside is irrelevant — which makes this the one guaranteed location in the region.',
          fr: 'Des crayères romaines devenues caves, à dix-huit mètres sous terre et dix degrés toute l’année. Lumière entièrement artificielle : la météo extérieure n’a aucune importance, ce qui en fait le seul lieu garanti de la région.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Can we photograph in a champagne cellar?', fr: 'Peut-on photographier dans une cave de champagne ?' },
        answer: {
          en: 'Yes, by arrangement, and it must be arranged in advance — houses do not accommodate a session on the day. Most charge for private access, and several forbid flash near the bottles. We ask before you book so the price you are given is the real one.',
          fr: 'Oui, sur rendez-vous, et cela se cale à l’avance : les maisons n’accueillent pas une séance le jour même. La plupart facturent la privatisation, et plusieurs interdisent le flash près des bouteilles. Nous posons la question avant votre réservation pour que le prix annoncé soit le vrai.',
        },
      },
    ],
    quote: {
      text: {
        en: 'The cellars are the only place I work where the forecast is irrelevant. Ten degrees, no daylight, every day of the year.',
        fr: 'Les caves sont le seul endroit où je travaille sans regarder la météo. Dix degrés, aucune lumière du jour, tous les jours de l’année.',
      },
      author: 'Claire Hoffmann',
      role: { en: 'Photographer, Grand Est', fr: 'Photographe, Grand Est' },
    },
    stats: { visitors: '1.5M+', weddings: '1 000+' },
    topServices: ['wedding', 'couple', 'corporate-event', 'engagement', 'proposal', 'food', 'elopement'],
  },
];
