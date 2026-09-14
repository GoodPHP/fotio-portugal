import type { City } from '../types';

/**
 * The ten cities where the work is mostly local: headshots, family sessions,
 * weddings for people who live here. Surrounding communes are listed under
 * `coveredAreas` rather than given pages of their own — there would be nothing
 * to write on a page for Villeurbanne that the Lyon page does not already say.
 */
export const METRO_CITIES: City[] = [
  {
    slug: 'paris',
    name: 'Paris',
    theme: 'paris',
    region: { en: 'Île-de-France', fr: 'Île-de-France' },
    lede: {
      en: 'Paris photographs early or not at all. After nine in the morning the places you came for have become unusable.',
      fr: 'Paris se photographie tôt ou pas du tout. Passé neuf heures, les endroits qui vous font venir sont devenus impraticables.',
    },
    narrative: {
      en: 'Everything here is a question of hours rather than places. The landmarks are fixed, well known and photographed ten thousand times a day; what is not fixed is whether you get them with forty people in the frame or none. The difference between a Paris session that works and one that does not is almost never the location — it is having been standing there at half past six.',
      fr: 'Tout se joue ici sur l’heure, pas sur le lieu. Les monuments sont connus, immobiles et photographiés dix mille fois par jour ; ce qui varie, c’est de les avoir avec quarante personnes dans le cadre ou aucune. Ce qui sépare une séance parisienne réussie d’une séance ratée n’est presque jamais l’endroit : c’est d’avoir été là à six heures et demie.',
    },
    seasonality: {
      en: 'June and July give the longest usable evenings, with light until close to ten. October is the best compromise of the year: the crowds thin out, the plane trees turn, and sunrise comes at a civilised hour. February is grey but empty, and rain on stone photographs far better than most people expect.',
      fr: 'Juin et juillet offrent les plus longues soirées exploitables, avec de la lumière jusqu’à près de vingt-deux heures. Octobre est le meilleur compromis de l’année : la foule se retire, les platanes tournent, et le lever du jour arrive à une heure civilisée. Février est gris mais vide, et la pluie sur la pierre se photographie bien mieux qu’on ne le croit.',
    },
    coveredAreas: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Versailles',
      'Saint-Germain-en-Laye',
      'Vincennes',
      'Montreuil',
      'Saint-Denis',
      'Issy-les-Moulineaux',
    ],
    gallery: [
      {
        src: '/images/gallery/paris/1.jpg',
        alt: { en: 'The glass pyramid and the lit facades of the Louvre courtyard at dusk', fr: 'The glass pyramid and the lit facades of the Louvre courtyard at dusk' },
        caption: { en: 'Cour Napoléon', fr: 'Cour Napoléon' },
      },
      {
        src: '/images/gallery/paris/2.jpg',
        alt: { en: 'The Eiffel Tower and the Pont Alexandre III lit at dusk', fr: 'La tour Eiffel et le pont Alexandre III éclairés à la tombée du jour' },
        caption: { en: 'Pont Alexandre III', fr: 'Pont Alexandre III' },
      },
      {
        src: '/images/gallery/paris/3.jpg',
        alt: { en: 'The steps of the rue Foyatier climbing towards Montmartre', fr: 'Les escaliers de la rue Foyatier montant vers la butte Montmartre' },
        caption: { en: 'Montmartre', fr: 'Montmartre, rue Foyatier' },
      },
      {
        src: '/images/gallery/paris/4.jpg',
        alt: { en: 'Flowerbeds and gravel walks in the Jardin du Luxembourg', fr: 'Allées et parterres fleuris du jardin du Luxembourg' },
        caption: { en: 'Jardin du Luxembourg', fr: 'Jardin du Luxembourg' },
      },
    ],
    spots: [
      {
        name: 'Île Saint-Louis',
        bestTime: { en: 'Before 08:00, any season', fr: 'Avant 08 h 00, en toute saison' },
        permitCost: { en: 'Free — public streets and quays', fr: 'Gratuit — voirie et quais publics' },
        description: {
          en: 'Five hundred metres long, one central street, and an architecture that does not change from one end to the other. Rare, and very practical: you can walk for twenty minutes and come back with frames that visibly belong to one series.',
          fr: 'Cinq cents mètres de long, une seule rue centrale, et une architecture qui ne change pas d’un bout à l’autre. Rare, et très pratique : on marche vingt minutes et on rapporte des images qui appartiennent visiblement à une même série.',
        },
        light: [
          {
            season: { en: 'Spring', fr: 'Printemps' },
            note: {
              en: 'The south quay holds sun all morning, the north quay takes it late. Changing sides is enough to work at almost any hour.',
              fr: 'Le quai sud reçoit le soleil toute la matinée, le quai nord en fin de journée. Changer de côté suffit à travailler à presque n’importe quelle heure.',
            },
          },
          {
            season: { en: 'Summer', fr: 'Été' },
            note: {
              en: 'The lower quays sit in the shade of the embankment wall for much of the day — one of the few places in Paris still usable at three in the afternoon.',
              fr: 'Les quais bas restent à l’ombre du mur de berge une bonne partie de la journée : un des rares endroits parisiens encore utilisables à quinze heures.',
            },
          },
          {
            season: { en: 'Winter', fr: 'Hiver' },
            note: {
              en: 'Almost deserted, with river mist most mornings. The useful window runs from ten to three.',
              fr: 'Presque déserte, avec de la brume sur le fleuve la plupart des matins. Fenêtre utile de dix à quinze heures.',
            },
          },
        ],
      },
      {
        name: 'Trocadéro et pont Bir-Hakeim',
        bestTime: { en: '06:30 – 07:30', fr: '06 h 30 – 07 h 30' },
        permitCost: {
          en: 'Free on foot; a tripod on the Trocadéro esplanade needs authorisation',
          fr: 'Gratuit à pied ; trépied sur l’esplanade du Trocadéro soumis à autorisation',
        },
        description: {
          en: 'The two views of the tower everyone wants, and the two that empty last. Bir-Hakeim gives the framed, repeating-arch version; the Trocadéro terraces give scale. Both are unworkable after nine.',
          fr: 'Les deux vues de la tour que tout le monde veut, et les deux qui se vident le plus tard. Bir-Hakeim donne la version cadrée par les arches ; les terrasses du Trocadéro donnent l’échelle. Les deux sont inexploitables après neuf heures.',
        },
      },
      {
        name: 'Montmartre, rue Foyatier',
        bestTime: { en: 'Sunrise, or after 20:00 in summer', fr: 'Au lever du jour, ou après 20 h en été' },
        permitCost: { en: 'Free — public streets', fr: 'Gratuit — voirie publique' },
        description: {
          en: 'The staircase, the vines on rue Saint-Vincent and the streets behind the basilica rather than the square in front of it. Place du Tertre is a working market of portrait painters and photographs badly; two streets away it is quiet.',
          fr: 'L’escalier, les vignes de la rue Saint-Vincent et les rues derrière la basilique plutôt que la place devant. La place du Tertre est un marché de portraitistes en activité et se photographie mal ; deux rues plus loin, c’est calme.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do we need a permit to photograph in Paris?',
          fr: 'Faut-il une autorisation pour photographier dans Paris ?',
        },
        answer: {
          en: 'It depends on the place, the equipment and whether the shoot is commercial, and the rules differ between public streets, municipal parks and national estates. We check what applies to your specific session beforehand rather than printing a general rule here that would be wrong somewhere.',
          fr: 'Cela dépend du lieu, du matériel et du caractère professionnel de la prise de vue, et les régimes diffèrent entre voie publique, jardins municipaux et domaines nationaux. Nous vérifions ce qui s’applique à votre séance en amont plutôt que d’écrire ici une règle générale qui serait fausse quelque part.',
        },
      },
      {
        question: {
          en: 'Do you work outside Paris proper?',
          fr: 'Travaillez-vous en dehors de Paris intra-muros ?',
        },
        answer: {
          en: 'Yes, with no travel charge for the communes listed on this page. We do not make a separate page per commune: there would be nothing to write on it that this one does not already say.',
          fr: 'Oui, sans supplément de déplacement pour les communes listées sur cette page. Nous ne créons pas de page dédiée par commune : il n’y aurait rien à y écrire que celle-ci ne dise déjà.',
        },
      },
    ],
    quote: {
      text: {
        en: 'The whole job in Paris is arriving before the city does. At seven the Trocadéro belongs to you and two joggers; at nine it belongs to four coaches.',
        fr: 'Tout le travail à Paris consiste à arriver avant la ville. À sept heures, le Trocadéro est à vous et à deux joggeurs ; à neuf heures, il est à quatre autocars.',
      },
      author: 'Camille Aubert',
      role: { en: 'Photographer, Paris', fr: 'Photographe, Paris' },
    },
    stats: { visitors: '47M+', weddings: '28 000+' },
    topServices: ['paris-photoshoot', 'eiffel-tower-session', 'headshots', 'proposal', 'couple', 'family', 'wedding', 'corporate-event'],
  },

  {
    slug: 'lyon',
    name: 'Lyon',
    region: { en: 'Auvergne-Rhône-Alpes', fr: 'Auvergne-Rhône-Alpes' },
    lede: {
      en: 'More of what we photograph in Lyon happens indoors, in a meeting room, on a schedule somebody else set. That is the honest shape of the demand here.',
      fr: 'À Lyon, l’essentiel de ce que nous photographions se passe à l’intérieur, en salle de réunion, sur un horaire fixé par quelqu’un d’autre. C’est la forme réelle de la demande ici.',
    },
    narrative: {
      en: 'Lyon is a working city before it is a photogenic one, and the calendar reflects it: headshots and company events fill the weekdays, weddings and families take the weekends. The old town and the Croix-Rousse slopes are genuinely beautiful, but most sessions here start from an office address rather than a landmark.',
      fr: 'Lyon est une ville de travail avant d’être une ville photogénique, et le calendrier le montre : portraits corporate et événements d’entreprise occupent la semaine, mariages et familles le week-end. Le Vieux Lyon et les pentes de la Croix-Rousse sont réellement beaux, mais la plupart des séances partent d’une adresse de bureau plutôt que d’un monument.',
    },
    seasonality: {
      en: 'The two rivers hold morning fog from October to February, which is a gift rather than a problem — the Saône quays under mist need no other idea. June evenings stay usable until half past nine. August empties out and much of the old town closes.',
      fr: 'Les deux fleuves tiennent la brume matinale d’octobre à février, ce qui est un cadeau plutôt qu’un problème : les quais de Saône dans la brume ne demandent aucune autre idée. Les soirées de juin restent exploitables jusqu’à vingt et une heures trente. Août se vide et une grande partie du Vieux Lyon ferme.',
    },
    coveredAreas: ['Villeurbanne', 'Écully', 'Caluire-et-Cuire', 'Oullins', 'Bron', 'Saint-Genis-Laval'],
    gallery: [
      {
        src: '/images/gallery/lyon/1.jpg',
        alt: { en: 'The white towers of the Fourvière basilica above the city', fr: 'The white towers of the Fourvière basilica above the city' },
        caption: { en: 'Fourvière', fr: 'Fourvière' },
      },
      {
        src: '/images/gallery/lyon/2.jpg',
        alt: { en: 'Pale facades and cobbles on the place Saint-Jean in old Lyon', fr: 'La place Saint-Jean dans le Vieux Lyon, façades claires et pavés' },
        caption: { en: 'Vieux Lyon', fr: 'Vieux Lyon, place Saint-Jean' },
      },
      {
        src: '/images/gallery/lyon/3.jpg',
        alt: { en: 'The Saône and the hill of Fourvière seen from above', fr: 'La Saône et la colline de Fourvière vues depuis les hauteurs' },
        caption: { en: 'The Saône', fr: 'La Saône et Fourvière' },
      },
      {
        src: '/images/gallery/lyon/4.jpg',
        alt: { en: 'The rose garden of the Parc de la Tête d\'Or in flower', fr: 'La roseraie du parc de la Tête d’Or en fleurs' },
        caption: { en: 'Parc de la Tête d\'Or', fr: 'Parc de la Tête d’Or' },
      },
    ],
    spots: [
      {
        name: 'Quais de Saône',
        bestTime: { en: '07:00 – 09:00, autumn and winter', fr: '07 h 00 – 09 h 00, automne et hiver' },
        permitCost: { en: 'Free — public quays', fr: 'Gratuit — quais publics' },
        description: {
          en: 'The pastel fronts of Vieux Lyon reflected in flat water, with Fourvière above. Best when the river is still and the fog has not yet lifted, which in this city is most winter mornings.',
          fr: 'Les façades pastel du Vieux Lyon reflétées dans une eau plate, avec Fourvière au-dessus. Idéal quand le fleuve est calme et que la brume n’est pas encore levée, ce qui, ici, est le cas la plupart des matins d’hiver.',
        },
      },
      {
        name: 'Croix-Rousse et ses traboules',
        bestTime: { en: 'Midday — the slopes need overhead light', fr: 'En milieu de journée — les pentes ont besoin d’une lumière haute' },
        permitCost: { en: 'Free; some traboules are private and close at dusk', fr: 'Gratuit ; certaines traboules sont privées et ferment à la nuit' },
        description: {
          en: 'Steep, narrow and unusually vertical for a French city. The traboules — covered passages cut through the buildings — are the one thing here that photographs like nowhere else, and several are in private hands.',
          fr: 'Raide, étroit et étonnamment vertical pour une ville française. Les traboules — passages couverts traversant les immeubles — sont la seule chose ici qui se photographie comme nulle part ailleurs, et plusieurs appartiennent à des copropriétés.',
        },
      },
      {
        name: 'Parc de la Tête d’Or',
        bestTime: { en: 'Late afternoon', fr: 'Fin d’après-midi' },
        permitCost: { en: 'Free; commercial shoots require a municipal request', fr: 'Gratuit ; les prises de vue commerciales demandent une demande municipale' },
        description: {
          en: 'The default family location, and rightly so: flat, pram-friendly, shaded, with a lake, a rose garden and a way out on every side.',
          fr: 'Le lieu famille par défaut, et à juste titre : plat, accessible en poussette, ombragé, avec un lac, une roseraie et une sortie de chaque côté.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Can you photograph a team in our offices?', fr: 'Pouvez-vous photographier une équipe dans nos locaux ?' },
        answer: {
          en: 'Yes, and it is most of what we do here. We need a room roughly three metres by four with a plain wall, and about thirty minutes per person. Nobody has to leave the building.',
          fr: 'Oui, et c’est l’essentiel de notre activité ici. Il nous faut une salle d’environ trois mètres sur quatre avec un mur uni, et une trentaine de minutes par personne. Personne n’a besoin de sortir du bâtiment.',
        },
      },
    ],
    quote: {
      text: {
        en: 'Lyon in November, when the fog sits on the Saône and the Fourvière hill floats above it, is the one thing I would not trade for better weather.',
        fr: 'Lyon en novembre, quand la brume tient sur la Saône et que la colline de Fourvière flotte au-dessus, c’est la seule chose que je n’échangerais pas contre du beau temps.',
      },
      author: 'Julien Deschamps',
      role: { en: 'Photographer, Lyon', fr: 'Photographe, Lyon' },
    },
    stats: { visitors: '6M+', weddings: '7 500+' },
    topServices: ['headshots', 'corporate-event', 'wedding', 'family', 'portrait', 'personal-brand', 'couple'],
  },

  {
    slug: 'marseille',
    name: 'Marseille',
    region: { en: 'Provence-Alpes-Côte d’Azur', fr: 'Provence-Alpes-Côte d’Azur' },
    lede: {
      en: 'The light here is harder than anywhere else in France, and the mistral decides more of the schedule than the calendar does.',
      fr: 'La lumière est ici plus dure que partout ailleurs en France, et le mistral décide du programme plus que le calendrier.',
    },
    narrative: {
      en: 'Marseille gives you sea, stone and colour in a combination no other French city has, and a light that punishes anyone who shoots at the wrong hour. The old port is workable early and late and hopeless between; the Panier, one street back, is in shade for most of the day and is where a session actually holds together.',
      fr: 'Marseille offre la mer, la pierre et la couleur dans une combinaison qu’aucune autre ville française ne possède, et une lumière qui punit qui photographie à la mauvaise heure. Le Vieux-Port est exploitable tôt et tard, sans espoir entre les deux ; le Panier, une rue derrière, reste à l’ombre presque toute la journée, et c’est là qu’une séance tient debout.',
    },
    seasonality: {
      en: 'April to June, then September and October. July and August bring vertical light and heat that no one enjoys dressed for photographs. The mistral blows hardest in winter and spring; it clears the sky completely, which is superb, and makes hair and fabric unmanageable, which is not.',
      fr: 'D’avril à juin, puis septembre et octobre. Juillet et août apportent une lumière verticale et une chaleur que personne n’apprécie habillé pour des photos. Le mistral souffle surtout en hiver et au printemps : il nettoie complètement le ciel, ce qui est superbe, et rend cheveux et tissus ingérables, ce qui l’est moins.',
    },
    coveredAreas: ['Aubagne', 'Cassis', 'La Ciotat', 'Allauch', 'Carry-le-Rouet', 'Aix-en-Provence'],
    gallery: [
      {
        src: '/images/gallery/marseille/1.jpg',
        alt: { en: 'Marseille and its port seen from the hill of Notre-Dame de la Garde', fr: 'Marseille and its port seen from the hill of Notre-Dame de la Garde' },
        caption: { en: 'From Notre-Dame de la Garde', fr: 'From Notre-Dame de la Garde' },
      },
      {
        src: '/images/gallery/marseille/2.jpg',
        alt: { en: 'The old port of Marseille lit after dark', fr: 'Le Vieux-Port de Marseille éclairé à la nuit tombée' },
        caption: { en: 'Vieux-Port', fr: 'Vieux-Port' },
      },
      {
        src: '/images/gallery/marseille/3.jpg',
        alt: { en: 'A narrow street of coloured facades in the Panier quarter', fr: 'Une ruelle étroite et des façades colorées du quartier du Panier' },
        caption: { en: 'Le Panier', fr: 'Le Panier' },
      },
      {
        src: '/images/gallery/marseille/4.jpg',
        alt: { en: 'The Corniche Kennedy running alongside the bay', fr: 'La corniche Kennedy longeant la baie de Marseille' },
        caption: { en: 'Corniche Kennedy', fr: 'Corniche Kennedy' },
      },
    ],
    spots: [
      {
        name: 'Le Panier',
        bestTime: { en: '10:00 – 16:00 — shade all day', fr: '10 h 00 – 16 h 00 — à l’ombre toute la journée' },
        permitCost: { en: 'Free — public streets', fr: 'Gratuit — voirie publique' },
        description: {
          en: 'Narrow, painted and permanently in shade, which is exactly why it works when the rest of the city does not. The one place in Marseille you can photograph at noon in July.',
          fr: 'Étroit, coloré et constamment à l’ombre — c’est précisément pour cela qu’il fonctionne quand le reste de la ville ne fonctionne plus. Le seul endroit de Marseille photographiable à midi en juillet.',
        },
      },
      {
        name: 'Corniche Kennedy',
        bestTime: { en: 'The last hour before sunset', fr: 'La dernière heure avant le coucher du soleil' },
        permitCost: { en: 'Free — public road and steps', fr: 'Gratuit — voirie et escaliers publics' },
        description: {
          en: 'Open sea on one side, the Frioul islands in the distance, and a low sun that comes straight down the water at you. Exposed to the mistral, which is the only thing that ever cancels it.',
          fr: 'La mer ouverte d’un côté, les îles du Frioul au loin, et un soleil bas qui arrive droit sur l’eau. Exposée au mistral, seule chose qui l’annule vraiment.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'What happens if the mistral is blowing?', fr: 'Que se passe-t-il si le mistral souffle ?' },
        answer: {
          en: 'We move inland and into the Panier, where the streets are narrow enough to break it. Above about sixty kilometres an hour the corniche is not worth attempting — hair and dresses stop cooperating entirely, and we will say so in advance rather than on arrival.',
          fr: 'Nous rentrons dans les terres et dans le Panier, où les rues sont assez étroites pour le casser. Au-delà d’environ soixante kilomètres-heure, la corniche n’a pas d’intérêt : cheveux et robes cessent totalement de coopérer, et nous le disons à l’avance plutôt qu’en arrivant.',
        },
      },
    ],
    quote: {
      text: {
        en: 'Everyone asks for the Vieux-Port at noon. I take them to the Panier instead and they thank me when they see the files.',
        fr: 'Tout le monde demande le Vieux-Port à midi. Je les emmène au Panier à la place, et ils me remercient en voyant les fichiers.',
      },
      author: 'Sofiane Belkacem',
      role: { en: 'Photographer, Marseille', fr: 'Photographe, Marseille' },
    },
    stats: { visitors: '5M+', weddings: '6 000+' },
    topServices: ['couple', 'family', 'wedding', 'headshots', 'vacation', 'proposal', 'food'],
  },

  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    region: { en: 'Nouvelle-Aquitaine', fr: 'Nouvelle-Aquitaine' },
    lede: {
      en: 'Bordeaux is a stone-coloured city with a vineyard attached, and the two halves need completely different planning.',
      fr: 'Bordeaux est une ville couleur pierre avec un vignoble attenant, et les deux moitiés demandent une organisation entièrement différente.',
    },
    narrative: {
      en: 'In the city the whole palette is one warm limestone, which is unusually forgiving: almost anything you wear stands out against it. Out in the vineyards the constraint is the estate, not the light — the property fixes the access, the hours and whether there is any shelter, and those three answers shape the entire day.',
      fr: 'En ville, toute la palette tient dans un calcaire chaud, ce qui est inhabituellement indulgent : presque n’importe quelle tenue s’y détache. Dans le vignoble, la contrainte n’est pas la lumière mais la propriété — le domaine fixe les accès, les horaires et l’existence réelle d’un abri, et ces trois réponses conditionnent toute la journée.',
    },
    seasonality: {
      en: 'September and early October are the best weeks of the year here, and also the busiest: the harvest is in, the vines have turned and every estate is booked. May and June are quieter with longer evenings. Winter is wet, and the water mirror on place de la Bourse is at its best precisely then.',
      fr: 'Septembre et début octobre sont les meilleures semaines de l’année, et aussi les plus chargées : les vendanges sont faites, la vigne a tourné et tous les domaines sont réservés. Mai et juin sont plus calmes, avec des soirées plus longues. L’hiver est humide, et le miroir d’eau de la place de la Bourse est alors à son meilleur.',
    },
    coveredAreas: ['Mérignac', 'Pessac', 'Talence', 'Saint-Émilion', 'Arcachon', 'Libourne'],
    gallery: [
      {
        src: '/images/gallery/bordeaux/1.jpg',
        alt: { en: 'The Pont de Pierre crossing the Garonne in morning fog', fr: 'The Pont de Pierre crossing the Garonne in morning fog' },
        caption: { en: 'Pont de Pierre', fr: 'Pont de Pierre' },
      },
      {
        src: '/images/gallery/bordeaux/2.jpg',
        alt: { en: 'The water mirror in front of the facade of the place de la Bourse', fr: 'Le miroir d’eau devant la façade de la place de la Bourse' },
        caption: { en: 'Place de la Bourse', fr: 'Place de la Bourse' },
      },
      {
        src: '/images/gallery/bordeaux/3.jpg',
        alt: { en: 'The rue Sainte-Catherine and its pale stone frontages', fr: 'La rue Sainte-Catherine et ses façades de pierre blonde' },
        caption: { en: 'Rue Sainte-Catherine', fr: 'Rue Sainte-Catherine' },
      },
      {
        src: '/images/gallery/bordeaux/4.jpg',
        alt: { en: 'An iron footbridge over the pond in the public garden', fr: 'Une passerelle de fer au-dessus du bassin du jardin public' },
        caption: { en: 'Jardin public', fr: 'Jardin public' },
      },
    ],
    spots: [
      {
        name: 'Place de la Bourse et le miroir d’eau',
        bestTime: { en: 'First light, or after 22:00 in summer', fr: 'Au lever du jour, ou après 22 h en été' },
        permitCost: { en: 'Free; the mirror is drained overnight and in frost', fr: 'Gratuit ; le miroir est vidé la nuit et en cas de gel' },
        description: {
          en: 'The reflection everyone comes for, and it only exists when the mirror is filled — which it is not overnight, not in freezing weather and not during maintenance. Worth checking the same week rather than assuming.',
          fr: 'Le reflet pour lequel tout le monde vient, et il n’existe que lorsque le miroir est en eau — ce qui n’est le cas ni la nuit, ni par temps de gel, ni pendant l’entretien. À vérifier la semaine même plutôt qu’à supposer.',
        },
      },
      {
        name: 'Jardin public',
        bestTime: { en: 'Late afternoon', fr: 'Fin d’après-midi' },
        permitCost: { en: 'Free — municipal park', fr: 'Gratuit — jardin municipal' },
        description: {
          en: 'An iron footbridge, a pond and old trees, five minutes from the centre. The default choice for families and for anyone who wants green rather than stone.',
          fr: 'Une passerelle de fer, un bassin et de vieux arbres, à cinq minutes du centre. Le choix par défaut pour les familles et pour qui veut du vert plutôt que de la pierre.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'We are marrying at a château outside the city.', fr: 'Nous nous marions dans une propriété hors de la ville.' },
        answer: {
          en: 'Then the estate sets half the constraints, and we contact it as soon as you book: permitted access, imposed hours, and whether a genuine wet-weather shelter exists. Those three answers determine the running order more than anything we would choose ourselves.',
          fr: 'Alors la propriété fixe la moitié des contraintes, et nous la contactons dès la réservation : accès autorisés, horaires imposés, existence réelle d’un abri en cas de pluie. Ces trois réponses déterminent le déroulé plus que tout ce que nous choisirions nous-mêmes.',
        },
      },
    ],
    quote: {
      text: {
        en: 'The stone here does half the work. I have never needed a reflector on the quays — the buildings are the reflector.',
        fr: 'La pierre fait ici la moitié du travail. Je n’ai jamais eu besoin d’un réflecteur sur les quais : les immeubles sont le réflecteur.',
      },
      author: 'Élodie Marchand',
      role: { en: 'Photographer, Bordeaux', fr: 'Photographe, Bordeaux' },
    },
    stats: { visitors: '6M+', weddings: '5 500+' },
    topServices: ['wedding', 'couple', 'family', 'headshots', 'proposal', 'engagement', 'corporate-event'],
  },

  {
    slug: 'toulouse',
    name: 'Toulouse',
    region: { en: 'Occitanie', fr: 'Occitanie' },
    lede: {
      en: 'Everything here is brick, which means everything here is warm — including skin, whether you wanted it or not.',
      fr: 'Tout est en brique ici, donc tout est chaud — y compris les peaux, que vous l’ayez voulu ou non.',
    },
    narrative: {
      en: 'The red brick that gives Toulouse its name bounces a strong warm cast into every frame shot near a wall, and that has to be corrected rather than admired. Handled properly it is the most flattering city in the south-west; ignored, everyone comes out orange. Sessions here mostly run along the Garonne and through the Capitole quarter.',
      fr: 'La brique rouge qui donne son nom à Toulouse renvoie une dominante chaude marquée dans toute image faite près d’un mur, et cela se corrige plutôt que cela ne s’admire. Bien gérée, c’est la ville la plus flatteuse du Sud-Ouest ; ignorée, tout le monde ressort orange. Les séances se déroulent surtout le long de la Garonne et dans le quartier du Capitole.',
    },
    seasonality: {
      en: 'March to June and September to November. Summer afternoons routinely pass thirty-five degrees and the brick holds the heat well into the evening. Winter light is low and long, and the river banks are empty.',
      fr: 'De mars à juin et de septembre à novembre. Les après-midi d’été dépassent régulièrement trente-cinq degrés et la brique garde la chaleur tard dans la soirée. La lumière d’hiver est basse et longue, et les berges sont vides.',
    },
    coveredAreas: ['Blagnac', 'Colomiers', 'Balma', 'Tournefeuille', 'Ramonville-Saint-Agne', 'Albi'],
    gallery: [
      {
        src: '/images/gallery/toulouse/1.jpg',
        alt: { en: 'The cloister of the Jacobins convent, columns and clipped hedges', fr: 'The cloister of the Jacobins convent, columns and clipped hedges' },
        caption: { en: 'Couvent des Jacobins', fr: 'Couvent des Jacobins' },
      },
      {
        src: '/images/gallery/toulouse/2.jpg',
        alt: { en: 'The place du Capitole lit in the evening', fr: 'La place du Capitole illuminée en soirée' },
        caption: { en: 'Place du Capitole', fr: 'Place du Capitole' },
      },
      {
        src: '/images/gallery/toulouse/3.jpg',
        alt: { en: 'The Garonne, the Pont-Neuf and the big wheel seen from the pont Saint-Pierre', fr: 'La Garonne, le Pont-Neuf et la grande roue vus du pont Saint-Pierre' },
        caption: { en: 'From the pont Saint-Pierre', fr: 'Depuis le pont Saint-Pierre' },
      },
      {
        src: '/images/gallery/toulouse/4.jpg',
        alt: { en: 'The brick facade of a Toulouse town house', fr: 'La façade de brique d’un hôtel particulier toulousain' },
        caption: { en: 'Grande-rue Nazareth', fr: 'Grande-rue Nazareth' },
      },
    ],
    spots: [
      {
        name: 'Berges de la Garonne',
        bestTime: { en: 'The hour before sunset', fr: 'L’heure avant le coucher du soleil' },
        permitCost: { en: 'Free — public banks', fr: 'Gratuit — berges publiques' },
        description: {
          en: 'The Pont Neuf, the dome of La Grave and a west-facing bank that takes the last hour of sun full on. The one place in the city where the brick works for you rather than against you.',
          fr: 'Le Pont Neuf, le dôme de La Grave et une berge orientée à l’ouest qui prend de plein fouet la dernière heure de soleil. Le seul endroit de la ville où la brique travaille pour vous plutôt que contre vous.',
        },
      },
      {
        name: 'Quartier du Capitole',
        bestTime: { en: 'Before 09:00', fr: 'Avant 09 h 00' },
        permitCost: { en: 'Free — public square', fr: 'Gratuit — place publique' },
        description: {
          en: 'The square itself is large, hard-surfaced and busy from mid-morning. The arcades along its edge are the usable part, and they stay in shade all day.',
          fr: 'La place elle-même est vaste, minérale et fréquentée dès la fin de matinée. Les arcades qui la bordent sont la partie exploitable, et restent à l’ombre toute la journée.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'The brick throws warm light into everything. Half my work here is taking it back out again in post.',
        fr: 'La brique renvoie du chaud dans tout. La moitié de mon travail ici consiste à le retirer en post-production.',
      },
      author: 'Mathieu Sabatier',
      role: { en: 'Photographer, Toulouse', fr: 'Photographe, Toulouse' },
    },
    stats: { visitors: '5M+', weddings: '4 800+' },
    topServices: ['headshots', 'family', 'couple', 'wedding', 'portrait', 'book-comedien', 'corporate-event'],
  },

  {
    slug: 'nice',
    name: 'Nice',
    region: { en: 'Provence-Alpes-Côte d’Azur', fr: 'Provence-Alpes-Côte d’Azur' },
    lede: {
      en: 'The light here is the reason people come and the reason sessions fail. It is superb for two hours a day and merciless for six.',
      fr: 'La lumière est ici la raison pour laquelle on vient et la raison pour laquelle les séances échouent. Elle est superbe deux heures par jour et impitoyable pendant six.',
    },
    narrative: {
      en: 'Nice offers three completely different sessions within twenty minutes of each other: the seafront, the old town in shade, and the corniches above with the whole bay below. Which one is right depends almost entirely on what time you can start, and honeymooners who insist on midday on the Promenade get the worst of all three.',
      fr: 'Nice offre trois séances entièrement différentes à vingt minutes les unes des autres : le front de mer, la vieille ville à l’ombre, et les corniches au-dessus avec toute la baie en contrebas. Le bon choix dépend presque uniquement de l’heure de départ possible, et les voyages de noces qui insistent pour la Promenade à midi obtiennent le pire des trois.',
    },
    seasonality: {
      en: 'May, June, September and October. July and August are hot, crowded and vertically lit. Winter here is genuinely usable — fifteen degrees, low sun and an empty Promenade — and is the season most people never think to ask for.',
      fr: 'Mai, juin, septembre et octobre. Juillet et août sont chauds, fréquentés et éclairés à la verticale. L’hiver est ici réellement exploitable — quinze degrés, soleil bas et Promenade vide — et c’est la saison à laquelle personne ne pense.',
    },
    coveredAreas: ['Villefranche-sur-Mer', 'Èze', 'Saint-Jean-Cap-Ferrat', 'Cagnes-sur-Mer', 'Menton', 'Antibes'],
    gallery: [
      {
        src: '/images/gallery/nice/1.jpg',
        alt: { en: 'Painted fishing boats moored in the port of Nice', fr: 'Painted fishing boats moored in the port of Nice' },
        caption: { en: 'Port Lympia', fr: 'Port Lympia' },
      },
      {
        src: '/images/gallery/nice/2.jpg',
        alt: { en: 'Palm trees along the Promenade des Anglais at the end of the day', fr: 'La promenade des Anglais et ses palmiers en fin de journée' },
        caption: { en: 'Promenade des Anglais', fr: 'Promenade des Anglais' },
      },
      {
        src: '/images/gallery/nice/3.jpg',
        alt: { en: 'Flower and vegetable stalls in the Cours Saleya', fr: 'Les étals de fleurs et de légumes du cours Saleya' },
        caption: { en: 'Cours Saleya', fr: 'Cours Saleya' },
      },
      {
        src: '/images/gallery/nice/4.jpg',
        alt: { en: 'The roofs of old Nice seen from the castle hill', fr: 'Les toits du vieux Nice vus depuis la colline du Château' },
        caption: { en: 'Castle hill', fr: 'Colline du Château' },
      },
    ],
    spots: [
      {
        name: 'Colline du Château',
        bestTime: { en: 'The last hour of light', fr: 'La dernière heure de lumière' },
        permitCost: { en: 'Free; the park closes at dusk, earlier in winter', fr: 'Gratuit ; le parc ferme à la tombée du jour, plus tôt en hiver' },
        description: {
          en: 'The view down onto the old town roofs and the whole curve of the bay. A climb, or a lift from the seafront end — worth knowing which if anyone in the group would rather not walk up.',
          fr: 'La vue plongeante sur les toits du Vieux-Nice et toute la courbe de la baie. Une montée, ou un ascenseur côté front de mer — utile à savoir si quelqu’un préfère éviter la grimpette.',
        },
      },
      {
        name: 'Vieux-Nice et cours Saleya',
        bestTime: { en: 'Early morning while the market sets up', fr: 'Tôt le matin, pendant l’installation du marché' },
        permitCost: { en: 'Free — public streets', fr: 'Gratuit — voirie publique' },
        description: {
          en: 'Ochre fronts, deep shade and the flower market. The colour here is strong enough to carry a whole session on its own, and it is the fallback whenever the seafront is unusable.',
          fr: 'Façades ocre, ombre profonde et marché aux fleurs. La couleur y est assez forte pour porter une séance entière, et c’est le repli chaque fois que le front de mer est inexploitable.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Is the Promenade des Anglais worth it?', fr: 'La Promenade des Anglais en vaut-elle la peine ?' },
        answer: {
          en: 'For twenty minutes at the end of the day, yes — the light comes along it rather than down onto it and the sea goes flat. At any other hour it is a wide, hard-lit pavement with traffic behind you, and the old town two streets away is better in every respect.',
          fr: 'Pour vingt minutes en fin de journée, oui : la lumière la longe au lieu de tomber dessus, et la mer devient plate. À toute autre heure, c’est un large trottoir en lumière dure avec la circulation derrière, et la vieille ville deux rues plus loin vaut mieux à tous points de vue.',
        },
      },
    ],
    quote: {
      text: {
        en: 'People book Nice for the sea and leave with the old town. The alleys hold colour all day; the water only works twice.',
        fr: 'On réserve Nice pour la mer et on repart avec la vieille ville. Les ruelles tiennent la couleur toute la journée ; l’eau ne fonctionne que deux fois.',
      },
      author: 'Léa Fontaine',
      role: { en: 'Photographer, Nice', fr: 'Photographe, Nice' },
    },
    stats: { visitors: '5M+', weddings: '4 000+' },
    topServices: ['riviera-honeymoon', 'couple', 'proposal', 'family', 'wedding', 'vacation', 'engagement'],
  },

  {
    slug: 'lille',
    name: 'Lille',
    region: { en: 'Hauts-de-France', fr: 'Hauts-de-France' },
    lede: {
      en: 'Overcast most of the year, which everyone apologises for and which is in fact the best portrait light in France.',
      fr: 'Couvert la majeure partie de l’année, ce dont tout le monde s’excuse, et qui constitue en réalité la meilleure lumière de portrait de France.',
    },
    narrative: {
      en: 'Flemish brick, tall windows and a sky that behaves like a permanent softbox. Lille is the one city where the weather forecast barely changes the plan — grey is the working condition, not the setback, and the colour of the old town holds up under it in a way that pale stone cities do not.',
      fr: 'Brique flamande, hautes fenêtres et un ciel qui se comporte comme une boîte à lumière permanente. Lille est la seule ville où la météo ne change presque rien au programme : le gris est la condition de travail, pas le contretemps, et la couleur du Vieux-Lille y résiste comme ne le font pas les villes de pierre claire.',
    },
    seasonality: {
      en: 'Workable all year, which is unusual. May and June are the driest. December brings the market and a genuinely photogenic old town after dark. January and February are wet but the light stays even.',
      fr: 'Exploitable toute l’année, ce qui est rare. Mai et juin sont les plus secs. Décembre apporte le marché et un Vieux-Lille réellement photogénique à la nuit tombée. Janvier et février sont humides mais la lumière reste régulière.',
    },
    coveredAreas: ['Roubaix', 'Tourcoing', 'Villeneuve-d’Ascq', 'Marcq-en-Barœul', 'Lambersart', 'Arras'],
    gallery: [
      {
        src: '/images/gallery/lille/1.jpg',
        alt: { en: 'The inner courtyard of the Vieille Bourse, ringed by carved facades', fr: 'The inner courtyard of the Vieille Bourse, ringed by carved facades' },
        caption: { en: 'Vieille Bourse', fr: 'Vieille Bourse' },
      },
      {
        src: '/images/gallery/lille/2.jpg',
        alt: { en: 'The Grand-Place of Lille and its Flemish facades', fr: 'La Grand-Place de Lille et ses façades flamandes' },
        caption: { en: 'Grand-Place', fr: 'Grand-Place' },
      },
      {
        src: '/images/gallery/lille/3.jpg',
        alt: { en: 'The column of the Déesse at the centre of the Grand-Place', fr: 'La colonne de la Déesse au centre de la Grand-Place' },
        caption: { en: 'La Déesse', fr: 'La Déesse' },
      },
      {
        src: '/images/gallery/lille/4.jpg',
        alt: { en: 'The Vieille Bourse and its carved gables', fr: 'La Vieille Bourse et ses pignons sculptés' },
        caption: { en: 'Vieille Bourse', fr: 'Vieille Bourse' },
      },
    ],
    spots: [
      {
        name: 'Vieux-Lille',
        bestTime: { en: 'Any hour — the light is diffuse', fr: 'À toute heure — la lumière est diffuse' },
        permitCost: { en: 'Free — public streets', fr: 'Gratuit — voirie publique' },
        description: {
          en: 'Red and ochre brick, gold-detailed fronts and cobbles. The rare place where an overcast sky is an advantage: no hard shadows, and the colour does the work the sun would otherwise have to.',
          fr: 'Brique rouge et ocre, façades à décors dorés, pavés. L’endroit rare où un ciel couvert est un avantage : aucune ombre dure, et la couleur fait le travail que le soleil devrait faire.',
        },
      },
      {
        name: 'Grand-Place',
        bestTime: { en: 'Before 10:00', fr: 'Avant 10 h 00' },
        permitCost: { en: 'Free — public square', fr: 'Gratuit — place publique' },
        description: {
          en: 'Wide, ornate and busy from mid-morning onward. Works early, and works again once the December lights are up.',
          fr: 'Vaste, ornée et fréquentée dès la fin de matinée. Fonctionne tôt, et de nouveau une fois les illuminations de décembre installées.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Should we postpone if rain is forecast?', fr: 'Faut-il reporter si la pluie est annoncée ?' },
        answer: {
          en: 'Usually not. Light rain on brick and cobbles is the local speciality, and the covered passages give somewhere to work between showers. We only move a session for genuine downpours, and there is no charge for doing so.',
          fr: 'En général non. La pluie fine sur la brique et les pavés est la spécialité locale, et les passages couverts permettent de travailler entre deux averses. Nous ne déplaçons une séance que pour de vraies trombes, et sans frais.',
        },
      },
    ],
    quote: {
      text: {
        en: 'Clients arrive apologising for the weather. I tell them they have booked the best light in the country and they think I am being polite.',
        fr: 'Les clients arrivent en s’excusant du temps. Je leur dis qu’ils ont réservé la meilleure lumière du pays et ils croient que je suis poli.',
      },
      author: 'Antoine Delcourt',
      role: { en: 'Photographer, Lille', fr: 'Photographe, Lille' },
    },
    stats: { visitors: '2M+', weddings: '3 800+' },
    topServices: ['headshots', 'family', 'couple', 'wedding', 'corporate-event', 'portrait', 'christening'],
  },

  {
    slug: 'nantes',
    name: 'Nantes',
    region: { en: 'Pays de la Loire', fr: 'Pays de la Loire' },
    lede: {
      en: 'A city that rebuilt itself around its river and its industrial island, and photographs unlike anywhere else in the west.',
      fr: 'Une ville qui s’est reconstruite autour de son fleuve et de son île industrielle, et qui se photographie comme nulle part ailleurs dans l’Ouest.',
    },
    narrative: {
      en: 'Nantes has two registers that do not blend: the château and the old streets around it, and the Île de Nantes with its cranes, warehouses and machines. Choosing between them matters more here than choosing an hour, and trying to do both in one session usually produces a gallery that looks like two.',
      fr: 'Nantes a deux registres qui ne se mélangent pas : le château et les rues anciennes autour, et l’île de Nantes avec ses grues, ses hangars et ses machines. Choisir entre les deux compte ici plus que choisir une heure, et vouloir faire les deux dans une séance produit généralement une galerie qui en paraît deux.',
    },
    seasonality: {
      en: 'April to October, with June and September the most reliable. The Atlantic weather changes fast — a morning can turn twice — so we plan a sheltered fallback rather than a firm outdoor plan.',
      fr: 'D’avril à octobre, juin et septembre étant les plus fiables. Le temps atlantique change vite — une matinée peut tourner deux fois — donc nous prévoyons un repli couvert plutôt qu’un programme extérieur ferme.',
    },
    coveredAreas: ['Saint-Herblain', 'Rezé', 'Orvault', 'Vertou', 'Clisson', 'Pornic'],
    gallery: [
      {
        src: '/images/gallery/nantes/1.jpg',
        alt: { en: 'The Japanese garden on the Île de Versailles, seen across the water', fr: 'The Japanese garden on the Île de Versailles, seen across the water' },
        caption: { en: 'Île de Versailles', fr: 'Île de Versailles' },
      },
      {
        src: '/images/gallery/nantes/2.jpg',
        alt: { en: 'The ramparts and moat of the castle of the Dukes of Brittany', fr: 'Les remparts et les douves du château des ducs de Bretagne' },
        caption: { en: 'Château des ducs de Bretagne', fr: 'Château des ducs de Bretagne' },
      },
      {
        src: '/images/gallery/nantes/3.jpg',
        alt: { en: 'The banks of the Erdre with boats moored alongside', fr: 'Les bords de l’Erdre et les bateaux amarrés' },
        caption: { en: 'Bords de l\'Erdre', fr: 'Bords de l’Erdre' },
      },
      {
        src: '/images/gallery/nantes/4.jpg',
        alt: { en: 'The carved face of a statue in the Passage Pommeraye', fr: 'Le visage sculpté d’une statue du passage Pommeraye' },
        caption: { en: 'Passage Pommeraye', fr: 'Passage Pommeraye' },
      },
    ],
    spots: [
      {
        name: 'Bords de l’Erdre',
        bestTime: { en: 'Late afternoon', fr: 'Fin d’après-midi' },
        permitCost: { en: 'Free — public banks', fr: 'Gratuit — berges publiques' },
        description: {
          en: 'Quiet water, big trees and none of the industrial vocabulary of the island. The choice for families and for couples who want green rather than steel.',
          fr: 'Eau calme, grands arbres et rien du vocabulaire industriel de l’île. Le choix des familles et des couples qui veulent du vert plutôt que de l’acier.',
        },
      },
      {
        name: 'Île de Nantes',
        bestTime: { en: 'Overcast days, or the hour before sunset', fr: 'Par ciel couvert, ou l’heure avant le coucher du soleil' },
        permitCost: { en: 'Free outdoors; the Machines site has its own rules', fr: 'Gratuit en extérieur ; le site des Machines a ses propres règles' },
        description: {
          en: 'Cranes, sheds and raw concrete. Strong, graphic and completely unlike the rest of the region — best under flat light, which softens the steel rather than letting it go contrasty.',
          fr: 'Grues, hangars et béton brut. Fort, graphique et sans rapport avec le reste de la région — meilleur sous lumière plate, qui adoucit l’acier au lieu de le durcir.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'The island and the château are two different cities. Pick one. Doing both gives you two half-sessions.',
        fr: 'L’île et le château sont deux villes différentes. Choisissez-en une. Faire les deux donne deux demi-séances.',
      },
      author: 'Marion Guérin',
      role: { en: 'Photographer, Nantes', fr: 'Photographe, Nantes' },
    },
    stats: { visitors: '2M+', weddings: '3 500+' },
    topServices: ['wedding', 'family', 'couple', 'headshots', 'portrait', 'maternity', 'corporate-event'],
  },

  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    region: { en: 'Grand Est', fr: 'Grand Est' },
    lede: {
      en: 'The one French city where winter is the high season for photographs, and not only because of the market.',
      fr: 'La seule ville française où l’hiver est la haute saison photographique, et pas seulement à cause du marché.',
    },
    narrative: {
      en: 'Half-timbering, canals and a cathedral front carved deeply enough to hold shadow at any hour. Strasbourg reads as a set rather than a city, which is why it survives grey weather better than most — the buildings supply the colour and the interest that light would otherwise have to.',
      fr: 'Colombages, canaux et une façade de cathédrale sculptée assez profondément pour tenir l’ombre à toute heure. Strasbourg se lit comme un décor plutôt que comme une ville, et c’est pourquoi elle supporte le temps gris mieux que d’autres : les bâtiments fournissent la couleur et l’intérêt que la lumière devrait apporter.',
    },
    seasonality: {
      en: 'December is the busiest month of the year and needs booking months ahead. May and June are the quiet, comfortable alternative. January and February are cold and empty, and the Petite France under frost is worth the discomfort.',
      fr: 'Décembre est le mois le plus chargé de l’année et se réserve des mois à l’avance. Mai et juin sont l’alternative calme et confortable. Janvier et février sont froids et vides, et la Petite France sous le givre vaut l’inconfort.',
    },
    coveredAreas: ['Schiltigheim', 'Illkirch-Graffenstaden', 'Ostwald', 'Bischheim', 'Obernai', 'Colmar'],
    gallery: [
      {
        src: '/images/gallery/strasbourg/1.jpg',
        alt: { en: 'The carved west front of Strasbourg cathedral in low sun', fr: 'The carved west front of Strasbourg cathedral in low sun' },
        caption: { en: 'The cathedral front', fr: 'The cathedral front' },
      },
      {
        src: '/images/gallery/strasbourg/2.jpg',
        alt: { en: 'A canal in the Petite France lined with half-timbered houses', fr: 'Un canal de la Petite France bordé de maisons à colombages' },
        caption: { en: 'La Petite France', fr: 'La Petite France' },
      },
      {
        src: '/images/gallery/strasbourg/3.jpg',
        alt: { en: 'The cathedral square and its timbered houses', fr: 'La place de la Cathédrale et ses maisons à colombages' },
        caption: { en: 'Place de la Cathédrale', fr: 'Place de la Cathédrale' },
      },
      {
        src: '/images/gallery/strasbourg/4.jpg',
        alt: { en: 'Half-timbered houses along a street in the old town', fr: 'Des maisons à colombages alignées dans une rue de la vieille ville' },
        caption: { en: 'Old town', fr: 'Vieille ville' },
      },
    ],
    spots: [
      {
        name: 'La Petite France',
        bestTime: { en: 'Before 09:00, or after 16:00 in winter', fr: 'Avant 09 h 00, ou après 16 h en hiver' },
        permitCost: { en: 'Free — public quays and bridges', fr: 'Gratuit — quais et ponts publics' },
        description: {
          en: 'Canals, half-timbered fronts and covered bridges in a few hundred metres. Extremely busy from mid-morning; almost empty an hour after opening time and again once the day-trippers leave.',
          fr: 'Canaux, façades à colombages et ponts couverts en quelques centaines de mètres. Très fréquentée dès la fin de matinée ; presque vide une heure après l’ouverture et de nouveau une fois les excursionnistes repartis.',
        },
      },
      {
        name: 'Place de la Cathédrale',
        bestTime: { en: 'Late afternoon, when the front is lit obliquely', fr: 'Fin d’après-midi, quand la façade est éclairée en oblique' },
        permitCost: { en: 'Free outside; interior photography follows diocesan rules', fr: 'Gratuit à l’extérieur ; l’intérieur suit les règles diocésaines' },
        description: {
          en: 'The carved west front takes raking light better than almost any building in France. Directly in front of it the square is tight and crowded; the timbered houses along its edge give the room to work.',
          fr: 'La façade ouest sculptée prend la lumière rasante mieux que presque tout autre édifice en France. Juste devant, la place est étroite et fréquentée ; les maisons à colombages qui la bordent donnent la place de travailler.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Can we photograph at the Christmas market?', fr: 'Peut-on photographier au marché de Noël ?' },
        answer: {
          en: 'Yes, and it is worth doing — but not between four and eight in the evening, when the density makes anything except tight portraits impossible. Late morning gives you the stalls with room to stand back.',
          fr: 'Oui, et cela vaut la peine — mais pas entre seize et vingt heures, quand la densité rend impossible autre chose que des portraits serrés. La fin de matinée donne les chalets avec du recul.',
        },
      },
    ],
    quote: {
      text: {
        en: 'In December I shoot at ten in the morning, not at six in the evening. Same market, same lights on, a tenth of the people.',
        fr: 'En décembre, je photographie à dix heures du matin, pas à dix-huit heures. Même marché, mêmes lumières allumées, dix fois moins de monde.',
      },
      author: 'Claire Hoffmann',
      role: { en: 'Photographer, Strasbourg', fr: 'Photographe, Strasbourg' },
    },
    stats: { visitors: '4M+', weddings: '3 200+' },
    topServices: ['couple', 'family', 'proposal', 'corporate-event', 'headshots', 'wedding', 'engagement'],
  },

  {
    slug: 'montpellier',
    name: 'Montpellier',
    region: { en: 'Occitanie', fr: 'Occitanie' },
    lede: {
      en: 'A young city with a medieval core and three hundred days of sun, which is more of a scheduling problem than a gift.',
      fr: 'Une ville jeune, à cœur médiéval, avec trois cents jours de soleil — ce qui relève plus du problème d’organisation que du cadeau.',
    },
    narrative: {
      en: 'The Écusson, the old centre, is a knot of narrow lanes that stay in shade almost all day, and that shade is the whole reason sessions here work in summer. Ten minutes out, the Antigone quarter gives wide neoclassical perspectives that need the opposite conditions. The beach is twenty minutes away and changes the day entirely.',
      fr: 'L’Écusson, le centre ancien, est un nœud de ruelles qui restent à l’ombre presque toute la journée, et cette ombre est la raison pour laquelle les séances d’été fonctionnent ici. À dix minutes, le quartier Antigone offre de larges perspectives néoclassiques qui demandent l’inverse. La plage est à vingt minutes et change entièrement la journée.',
    },
    seasonality: {
      en: 'March to June, then September and October. July and August are too hot before six in the evening. Winter is mild and bright, and the old town is at its emptiest.',
      fr: 'De mars à juin, puis septembre et octobre. Juillet et août sont trop chauds avant dix-huit heures. L’hiver est doux et lumineux, et le centre ancien est alors au plus vide.',
    },
    coveredAreas: ['Castelnau-le-Lez', 'Lattes', 'Palavas-les-Flots', 'Pérols', 'Saint-Jean-de-Védas', 'Sète'],
    gallery: [
      {
        src: '/images/gallery/montpellier/1.jpg',
        alt: { en: 'The triumphal arch on the Peyrou promenade, lit at night', fr: 'The triumphal arch on the Peyrou promenade, lit at night' },
        caption: { en: 'Promenade du Peyrou', fr: 'Promenade du Peyrou' },
      },
      {
        src: '/images/gallery/montpellier/2.jpg',
        alt: { en: 'The wide paved expanse of the place de la Comédie', fr: 'La place de la Comédie, vaste et pavée' },
        caption: { en: 'Place de la Comédie', fr: 'Place de la Comédie' },
      },
      {
        src: '/images/gallery/montpellier/3.jpg',
        alt: { en: 'A narrow street of old facades in the Écusson', fr: 'Une rue étroite de l’Écusson bordée de façades anciennes' },
        caption: { en: 'Rue de l\'Ancien-Courrier', fr: 'Rue de l’Ancien-Courrier' },
      },
      {
        src: '/images/gallery/montpellier/4.jpg',
        alt: { en: 'The arches of the Saint-Clément aqueduct', fr: 'Les arches de l’aqueduc Saint-Clément' },
        caption: { en: 'Aqueduc Saint-Clément', fr: 'Aqueduc Saint-Clément' },
      },
    ],
    spots: [
      {
        name: 'L’Écusson',
        bestTime: { en: '10:00 – 17:00 — shade all day', fr: '10 h 00 – 17 h 00 — à l’ombre toute la journée' },
        permitCost: { en: 'Free — public streets', fr: 'Gratuit — voirie publique' },
        description: {
          en: 'Narrow lanes, pale stone and small squares, all in shade. The reason a session here can be booked at noon in July when nothing else in the region can.',
          fr: 'Ruelles étroites, pierre claire et petites places, le tout à l’ombre. La raison pour laquelle une séance peut se réserver ici à midi en juillet, ce qui est impossible ailleurs dans la région.',
        },
      },
      {
        name: 'Promenade du Peyrou',
        bestTime: { en: 'The last hour of light', fr: 'La dernière heure de lumière' },
        permitCost: { en: 'Free — public promenade', fr: 'Gratuit — promenade publique' },
        description: {
          en: 'The aqueduct, the arch and a long open terrace facing west. The one place in the centre with real distance in the frame.',
          fr: 'L’aqueduc, l’arc et une longue terrasse ouverte orientée à l’ouest. Le seul endroit du centre avec de la vraie profondeur dans le cadre.',
        },
      },
    ],
    faqs: [],
    quote: {
      text: {
        en: 'Everyone wants the beach. The Écusson gives better pictures and does not need you to be up at five.',
        fr: 'Tout le monde veut la plage. L’Écusson donne de meilleures images et ne demande pas de se lever à cinq heures.',
      },
      author: 'Pauline Estève',
      role: { en: 'Photographer, Montpellier', fr: 'Photographe, Montpellier' },
    },
    stats: { visitors: '2M+', weddings: '3 000+' },
    topServices: ['family', 'couple', 'headshots', 'wedding', 'maternity', 'portrait', 'evjf'],
  },
];
