import type { Service } from '../types';

/**
 * The service catalogue.
 *
 * Twenty services are offered in both languages. Ten are not, and that is
 * deliberate rather than an omission: the two audiences arrive for different
 * reasons. Someone searching in English is usually coming to France and wants
 * the Eiffel Tower, a château in the Loire or a wedding in Provence. Someone
 * searching in French lives here and wants a baptême, an EVJF or a book
 * comédien. Publishing each list in the other language would produce twenty
 * pages aimed at nobody.
 *
 * `slug` is identity and the English URL word. `slugs.fr` is the French URL
 * word. `pricingId` lets two services quote from one price where they are the
 * same shoot sold to different people.
 */
export const SERVICES: Service[] = [
  // ---------------------------------------------------------------- portrait
  {
    slug: 'portrait',
    slugs: { fr: 'portrait-studio-book' },
    name: { en: 'Studio portrait', fr: 'Portrait studio' },
    category: 'individual',
    initialPrice: 160,
    durationMinutes: 60,
    editedPhotos: 25,
    description: {
      en: 'A controlled-light portrait session for a profile, a press kit or a book.',
      fr: 'Une séance en lumière maîtrisée pour un profil, un dossier de presse ou un book.',
    },
    deliverables: {
      en: [
        '25 retouched photographs',
        'Two lighting set-ups and two backgrounds',
        'Selection made together at the end of the session',
        'Private gallery within 48–72 hours',
      ],
      fr: [
        '25 photographies retouchées',
        'Deux schémas de lumière et deux fonds',
        'Sélection faite ensemble en fin de séance',
        'Galerie privée sous 48 à 72 heures',
      ],
    },
    faqs: [
      {
        question: { en: 'What should I bring?', fr: 'Que faut-il apporter ?' },
        answer: {
          en: 'Two or three tops in plain colours, and whatever you actually wear to work. Fine stripes and small checks flicker on screen; solid mid-tones do not.',
          fr: 'Deux ou trois hauts unis, et ce que vous portez réellement pour travailler. Les fines rayures et les petits carreaux moirent à l’écran, pas les tons unis.',
        },
      },
    ],
  },
  {
    slug: 'lifestyle-portrait',
    slugs: { fr: 'portrait-lifestyle' },
    name: { en: 'Lifestyle portrait', fr: 'Portrait lifestyle' },
    category: 'individual',
    initialPrice: 170,
    durationMinutes: 75,
    editedPhotos: 30,
    description: {
      en: 'The same portrait, made outdoors and in motion rather than against a background.',
      fr: 'Le même portrait, dehors et en mouvement plutôt que devant un fond.',
    },
    deliverables: {
      en: ['30 retouched photographs', 'Two locations within walking distance', 'Private gallery within 48–72 hours'],
      fr: ['30 photographies retouchées', 'Deux lieux accessibles à pied', 'Galerie privée sous 48 à 72 heures'],
    },
    faqs: [],
  },

  // ----------------------------------------------------------------- couples
  {
    slug: 'couple',
    slugs: { fr: 'seance-photo-couple' },
    name: { en: 'Couple session', fr: 'Séance couple' },
    category: 'couples',
    initialPrice: 190,
    durationMinutes: 90,
    editedPhotos: 40,
    description: {
      en: 'A walking session for two, built around where the light is at that hour.',
      fr: 'Une séance à deux, en marchant, construite autour de la lumière de l’heure choisie.',
    },
    deliverables: {
      en: [
        '40 retouched photographs',
        'A route scouted for the time of day you book',
        'Direction throughout — nobody is left to pose themselves',
        'Private gallery within 48–72 hours',
      ],
      fr: [
        '40 photographies retouchées',
        'Un parcours repéré pour l’heure réservée',
        'Direction tout au long — personne n’est laissé à poser seul',
        'Galerie privée sous 48 à 72 heures',
      ],
    },
    faqs: [
      {
        question: { en: 'Neither of us is comfortable in front of a camera.', fr: 'Nous ne sommes à l’aise ni l’un ni l’autre devant un appareil.' },
        answer: {
          en: 'That is the normal case, and it is why the session is built around walking rather than standing still. The first twenty minutes are usually unusable and we plan for that; you stop noticing the camera somewhere in the third quarter of an hour.',
          fr: 'C’est le cas courant, et c’est pourquoi la séance se fait en marchant plutôt qu’à l’arrêt. Les vingt premières minutes sont rarement exploitables et c’est prévu : on cesse de penser à l’appareil vers le troisième quart d’heure.',
        },
      },
    ],
  },
  {
    slug: 'proposal',
    slugs: { fr: 'demande-en-mariage' },
    name: { en: 'Proposal', fr: 'Demande en mariage' },
    category: 'couples',
    initialPrice: 250,
    durationMinutes: 60,
    editedPhotos: 35,
    description: {
      en: 'Your proposal photographed without being noticed, then a short session once the answer is yes.',
      fr: 'Votre demande photographiée sans être vue, puis une courte séance une fois la réponse donnée.',
    },
    deliverables: {
      en: [
        'Scouting of the exact spot, the angle and your approach',
        'Discreet coverage of the moment itself, on a long lens',
        'A short couple session immediately afterwards',
        '35 retouched photographs in a private gallery',
      ],
      fr: [
        'Repérage du lieu exact, de l’angle et de votre arrivée',
        'Couverture discrète du moment lui-même, au téléobjectif',
        'Une courte séance de couple juste après',
        '35 photographies retouchées en galerie privée',
      ],
    },
    faqs: [
      {
        question: { en: 'What if they spot you first?', fr: 'Et s’ils vous repèrent avant ?' },
        answer: {
          en: 'Distance solves that, not cleverness. We work from a position agreed during scouting, well off your line of approach, on a long lens. In a busy place a person with a camera is invisible; in an empty one they are the only thing to look at, which is why the spot matters more than the gear.',
          fr: 'C’est la distance qui règle cela, pas l’astuce. Nous travaillons depuis une position validée au repérage, à l’écart de votre trajectoire, au téléobjectif. Dans un lieu fréquenté, une personne avec un appareil est invisible ; dans un lieu vide, c’est la seule chose à regarder — d’où l’importance du lieu plus que du matériel.',
        },
      },
      {
        question: { en: 'What if the answer is no?', fr: 'Et si la réponse est non ?' },
        answer: {
          en: 'We stop photographing immediately, we do not introduce ourselves, and you receive nothing. The booking still stands. It has happened, and it is handled quietly.',
          fr: 'Nous arrêtons immédiatement, nous ne nous présentons pas, et vous ne recevez rien. La réservation reste due. Cela est déjà arrivé, et cela se gère sans bruit.',
        },
      },
    ],
  },
  {
    slug: 'engagement',
    slugs: { fr: 'seance-engagement' },
    name: { en: 'Engagement session', fr: 'Séance engagement' },
    category: 'couples',
    initialPrice: 220,
    durationMinutes: 90,
    editedPhotos: 45,
    deliverables: {
      en: ['45 retouched photographs', 'Two locations', 'Images sized for save-the-dates', 'Private gallery within 48–72 hours'],
      fr: ['45 photographies retouchées', 'Deux lieux', 'Images formatées pour un faire-part', 'Galerie privée sous 48 à 72 heures'],
    },
    faqs: [],
  },

  // ------------------------------------------------------------------ family
  {
    slug: 'family',
    slugs: { fr: 'photographe-famille' },
    name: { en: 'Family session', fr: 'Séance famille' },
    category: 'family',
    initialPrice: 200,
    durationMinutes: 75,
    editedPhotos: 40,
    description: {
      en: 'An outdoor family session paced around the youngest person in it.',
      fr: 'Une séance famille en extérieur, au rythme du plus jeune du groupe.',
    },
    deliverables: {
      en: [
        '40 retouched photographs',
        'A location chosen for prams, shade and a way out',
        'Group frames and loose ones, in whatever order the children allow',
        'Private gallery within 48–72 hours',
      ],
      fr: [
        '40 photographies retouchées',
        'Un lieu choisi pour la poussette, l’ombre et une sortie proche',
        'Photos de groupe et images libres, dans l’ordre que les enfants autorisent',
        'Galerie privée sous 48 à 72 heures',
      ],
    },
    faqs: [
      {
        question: { en: 'Our toddler will not sit still.', fr: 'Notre petit ne tiendra pas en place.' },
        answer: {
          en: 'None of them do, and a session that depends on it is badly planned. We get the one group frame early, while attention lasts, and spend the rest of the hour on images that do not need anyone to look at the camera.',
          fr: 'Aucun ne tient en place, et une séance qui en dépend est mal pensée. On fait la photo de groupe tôt, tant que l’attention tient, et le reste de l’heure sur des images qui ne demandent à personne de regarder l’objectif.',
        },
      },
    ],
  },
  {
    slug: 'newborn',
    slugs: { fr: 'photographe-nouveau-ne' },
    name: { en: 'Newborn session', fr: 'Séance nouveau-né' },
    category: 'family',
    initialPrice: 230,
    durationMinutes: 120,
    editedPhotos: 30,
    description: {
      en: 'At home, in daylight, in the first weeks — paced entirely around feeding and sleep.',
      fr: 'À domicile, en lumière du jour, dans les premières semaines — au rythme des tétées et du sommeil.',
    },
    deliverables: {
      en: [
        '30 retouched photographs',
        'At your home, using window light only',
        'Two hours booked so feeding and changing are not a problem',
        'Private gallery within 48–72 hours',
      ],
      fr: [
        '30 photographies retouchées',
        'À votre domicile, en lumière de fenêtre uniquement',
        'Deux heures réservées pour que tétées et changes ne posent pas de problème',
        'Galerie privée sous 48 à 72 heures',
      ],
    },
    faqs: [
      {
        question: { en: 'When should we book it for?', fr: 'À quel moment faut-il la prévoir ?' },
        answer: {
          en: 'Between the sixth and the eighteenth day if you want the curled-up, deeply asleep frames. After a month a baby is more awake and the session changes character — not worse, but different, and worth knowing before you choose the date.',
          fr: 'Entre le sixième et le dix-huitième jour pour les images recroquevillées, en sommeil profond. Après un mois, le bébé est plus éveillé et la séance change de nature — pas moins bien, mais différente, et autant le savoir avant de choisir la date.',
        },
      },
    ],
  },
  {
    slug: 'maternity',
    slugs: { fr: 'seance-photo-grossesse' },
    name: { en: 'Maternity session', fr: 'Séance grossesse' },
    category: 'family',
    initialPrice: 190,
    durationMinutes: 75,
    editedPhotos: 35,
    deliverables: {
      en: ['35 retouched photographs', 'Indoors or outdoors, your choice', 'Partner and older children included', 'Private gallery within 48–72 hours'],
      fr: ['35 photographies retouchées', 'En intérieur ou en extérieur, au choix', 'Conjoint et aînés inclus', 'Galerie privée sous 48 à 72 heures'],
    },
    faqs: [],
  },
  {
    slug: 'christening',
    slugs: { fr: 'photographe-bapteme' },
    name: { en: 'Christening', fr: 'Baptême' },
    category: 'family',
    initialPrice: 320,
    durationMinutes: 180,
    editedPhotos: 80,
    deliverables: {
      en: ['80 retouched photographs', 'Ceremony and the gathering afterwards', 'Group portrait of the whole family', 'Private gallery within 72 hours'],
      fr: ['80 photographies retouchées', 'Cérémonie et réception qui suit', 'Portrait de groupe de toute la famille', 'Galerie privée sous 72 heures'],
    },
    faqs: [],
  },

  // ---------------------------------------------------------------- weddings
  {
    slug: 'wedding',
    slugs: { fr: 'mariage' },
    name: { en: 'Wedding', fr: 'Mariage' },
    category: 'wedding',
    initialPrice: 1200,
    durationMinutes: 600,
    editedPhotos: 400,
    description: {
      en: 'Full-day coverage, scouted in advance, delivered as one continuous account of the day.',
      fr: 'Couverture de la journée entière, repérée en amont, livrée comme un récit continu.',
    },
    deliverables: {
      en: [
        '400 retouched photographs',
        'Ten hours of continuous coverage',
        'Contact with the venue beforehand about access, timings and shelter',
        'Full private gallery within three weeks',
      ],
      fr: [
        '400 photographies retouchées',
        'Dix heures de couverture continue',
        'Contact préalable avec le lieu sur les accès, les horaires et l’abri',
        'Galerie privée complète sous trois semaines',
      ],
    },
    faqs: [
      {
        question: { en: 'Do we need a second photographer?', fr: 'Faut-il un second photographe ?' },
        answer: {
          en: 'Above about a hundred and twenty guests, or when the couple get ready in two different places, yes. Below that it usually buys duplication rather than coverage, and we will say so rather than sell it.',
          fr: 'Au-delà d’environ cent vingt invités, ou quand les préparatifs se font en deux endroits, oui. En dessous, cela achète surtout de la redondance, et nous le disons plutôt que de le vendre.',
        },
      },
    ],
  },
  {
    slug: 'elopement',
    slugs: { fr: 'mariage-intime' },
    name: { en: 'Elopement', fr: 'Mariage intime' },
    category: 'wedding',
    initialPrice: 750,
    durationMinutes: 240,
    editedPhotos: 150,
    deliverables: {
      en: ['150 retouched photographs', 'Four hours covering ceremony and the walk after', 'Help choosing the hour for the light', 'Private gallery within ten days'],
      fr: ['150 photographies retouchées', 'Quatre heures : cérémonie et balade qui suit', 'Aide au choix de l’heure pour la lumière', 'Galerie privée sous dix jours'],
    },
    faqs: [],
  },

  // ------------------------------------------------------------------ travel
  {
    slug: 'vacation',
    slugs: { fr: 'seance-photo-vacances' },
    name: { en: 'Holiday session', fr: 'Séance vacances' },
    category: 'vacation',
    initialPrice: 180,
    durationMinutes: 60,
    editedPhotos: 30,
    description: {
      en: 'An hour of photographs while you are here, in the places you came to see.',
      fr: 'Une heure de photographies pendant votre séjour, dans les lieux pour lesquels vous êtes venus.',
    },
    deliverables: {
      en: ['30 retouched photographs', 'A route that fits into a day of sightseeing', 'Private gallery within 48 hours, reachable from any country'],
      fr: ['30 photographies retouchées', 'Un parcours qui s’intègre à une journée de visite', 'Galerie privée sous 48 heures, accessible depuis tout pays'],
    },
    faqs: [],
  },
  {
    slug: 'city-tour',
    slugs: { fr: 'visite-photo-guidee' },
    name: { en: 'Photo walk', fr: 'Balade photo' },
    category: 'vacation',
    initialPrice: 240,
    durationMinutes: 120,
    editedPhotos: 60,
    deliverables: {
      en: ['60 retouched photographs', 'Two hours across several neighbourhoods', 'A local who knows what is worth the detour', 'Private gallery within 48–72 hours'],
      fr: ['60 photographies retouchées', 'Deux heures à travers plusieurs quartiers', 'Un local qui sait ce qui vaut le détour', 'Galerie privée sous 48 à 72 heures'],
    },
    faqs: [],
  },

  // ---------------------------------------------------------------- business
  {
    slug: 'headshots',
    slugs: { fr: 'photo-corporate-linkedin' },
    name: { en: 'Corporate headshots', fr: 'Photo corporate LinkedIn' },
    category: 'business',
    initialPrice: 150,
    durationMinutes: 30,
    editedPhotos: 8,
    description: {
      en: 'One consistent set of headshots for a team, shot on site in a single visit.',
      fr: 'Un jeu de portraits homogène pour une équipe, réalisé sur place en une seule venue.',
    },
    deliverables: {
      en: [
        '8 retouched photographs per person',
        'Thirty minutes per person, on your premises',
        'One lighting set-up so the whole team matches',
        'Square and 16:9 crops for every platform',
      ],
      fr: [
        '8 photographies retouchées par personne',
        'Trente minutes par personne, dans vos locaux',
        'Un seul schéma de lumière pour que toute l’équipe s’accorde',
        'Recadrages carré et 16:9 pour chaque plateforme',
      ],
    },
    faqs: [
      {
        question: { en: 'Can you match people photographed later?', fr: 'Pouvez-vous raccorder des personnes photographiées plus tard ?' },
        answer: {
          en: 'Yes — the lighting set-up and the background are recorded, so someone joining in six months sits in the same directory without looking pasted in.',
          fr: 'Oui : le schéma de lumière et le fond sont notés, donc une personne arrivée six mois plus tard s’intègre au trombinoscope sans effet de collage.',
        },
      },
    ],
  },
  {
    slug: 'personal-brand',
    slugs: { fr: 'personal-branding' },
    name: { en: 'Personal branding', fr: 'Personal branding' },
    category: 'business',
    initialPrice: 380,
    durationMinutes: 180,
    editedPhotos: 60,
    deliverables: {
      en: ['60 retouched photographs', 'Three hours across two or three settings', 'A mix of portraits, at-work frames and details', 'Enough material for a year of posting'],
      fr: ['60 photographies retouchées', 'Trois heures sur deux ou trois décors', 'Portraits, images au travail et détails', 'De quoi alimenter un an de publications'],
    },
    faqs: [],
  },
  {
    slug: 'corporate-event',
    slugs: { fr: 'photographe-evenement-entreprise' },
    name: { en: 'Corporate event', fr: 'Événement d’entreprise' },
    category: 'business',
    initialPrice: 450,
    durationMinutes: 240,
    editedPhotos: 150,
    deliverables: {
      en: ['150 retouched photographs', 'Four hours of coverage', 'A same-evening selection for press or social', 'Full gallery within 72 hours'],
      fr: ['150 photographies retouchées', 'Quatre heures de couverture', 'Une sélection le soir même pour la presse ou les réseaux', 'Galerie complète sous 72 heures'],
    },
    faqs: [],
  },
  {
    slug: 'event',
    slugs: { fr: 'photographe-evenement' },
    name: { en: 'Event coverage', fr: 'Couverture d’événement' },
    category: 'business',
    initialPrice: 400,
    durationMinutes: 240,
    editedPhotos: 130,
    deliverables: {
      en: ['130 retouched photographs', 'Four hours of coverage', 'Private gallery within 72 hours'],
      fr: ['130 photographies retouchées', 'Quatre heures de couverture', 'Galerie privée sous 72 heures'],
    },
    faqs: [],
  },

  // -------------------------------------------------------------- commercial
  {
    slug: 'product',
    slugs: { fr: 'photo-produit-packshot' },
    name: { en: 'Product photography', fr: 'Photo produit et packshot' },
    category: 'commercial',
    initialPrice: 320,
    durationMinutes: 240,
    editedPhotos: 30,
    description: {
      en: 'Packshots on white and in context, cut out and sized for the channels you sell on.',
      fr: 'Packshots sur fond blanc et en situation, détourés et formatés pour vos canaux de vente.',
    },
    deliverables: {
      en: [
        '30 retouched photographs',
        'Cut-outs on pure white for marketplaces',
        'Context frames for your own site',
        'Delivered in the crops each platform requires',
      ],
      fr: [
        '30 photographies retouchées',
        'Détourage sur blanc pur pour les marketplaces',
        'Images en situation pour votre propre site',
        'Livrées aux formats exigés par chaque plateforme',
      ],
    },
    faqs: [],
  },
  {
    slug: 'food',
    slugs: { fr: 'photo-culinaire-restaurant' },
    name: { en: 'Food & restaurant', fr: 'Photo culinaire et restaurant' },
    category: 'commercial',
    initialPrice: 350,
    durationMinutes: 240,
    editedPhotos: 40,
    deliverables: {
      en: ['40 retouched photographs', 'Dishes, room and team in one visit', 'Shot during your closed hours', 'Formats for menu, site and delivery platforms'],
      fr: ['40 photographies retouchées', 'Plats, salle et équipe en une seule venue', 'Réalisée pendant la fermeture', 'Formats carte, site et plateformes de livraison'],
    },
    faqs: [],
  },
  {
    slug: 'real-estate',
    slugs: { fr: 'photographe-immobilier' },
    name: { en: 'Real estate', fr: 'Photographie immobilière' },
    category: 'commercial',
    initialPrice: 220,
    durationMinutes: 120,
    editedPhotos: 25,
    description: {
      en: 'Interiors shot with the windows still readable, delivered the next morning.',
      fr: 'Des intérieurs où les fenêtres restent lisibles, livrés le lendemain matin.',
    },
    deliverables: {
      en: [
        '25 retouched photographs',
        'Verticals corrected, windows exposed rather than blown out',
        'Booked for the hour the light enters the main rooms',
        'Delivered the next morning',
      ],
      fr: [
        '25 photographies retouchées',
        'Verticales redressées, fenêtres exposées et non brûlées',
        'Programmée à l’heure où la lumière entre dans les pièces principales',
        'Livraison le lendemain matin',
      ],
    },
    faqs: [],
  },
  {
    slug: 'hotel-airbnb',
    slugs: { fr: 'photo-hotel-airbnb' },
    name: { en: 'Hotel & short-let', fr: 'Hôtel et location courte durée' },
    category: 'commercial',
    initialPrice: 260,
    durationMinutes: 150,
    editedPhotos: 30,
    deliverables: {
      en: ['30 retouched photographs', 'Rooms, common areas and the view', 'Cropped for Airbnb, Booking and your own site', 'Delivered the next morning'],
      fr: ['30 photographies retouchées', 'Chambres, parties communes et vue', 'Recadrées pour Airbnb, Booking et votre site', 'Livraison le lendemain matin'],
    },
    faqs: [],
  },

  // ----------------------------------------------------------------- fashion
  {
    slug: 'fashion-editorial',
    slugs: { fr: 'editorial-mode' },
    name: { en: 'Fashion editorial', fr: 'Éditorial mode' },
    category: 'fashion',
    initialPrice: 600,
    durationMinutes: 300,
    editedPhotos: 40,
    deliverables: {
      en: ['40 retouched photographs', 'Five hours, on location or in studio', 'Full retouching to publication standard', 'Gallery within ten days'],
      fr: ['40 photographies retouchées', 'Cinq heures, en extérieur ou en studio', 'Retouche complète aux standards de publication', 'Galerie sous dix jours'],
    },
    faqs: [],
  },
  {
    slug: 'model-portfolio',
    slugs: { fr: 'book-mannequin' },
    name: { en: 'Model portfolio', fr: 'Book mannequin' },
    category: 'fashion',
    initialPrice: 420,
    durationMinutes: 240,
    editedPhotos: 50,
    deliverables: {
      en: ['50 retouched photographs', 'Four looks across four hours', 'Digitals as agencies require them', 'Gallery within ten days'],
      fr: ['50 photographies retouchées', 'Quatre tenues sur quatre heures', 'Digitales au format demandé par les agences', 'Galerie sous dix jours'],
    },
    faqs: [],
  },

  // ------------------------------------------- English only: inbound visitors
  {
    slug: 'paris-photoshoot',
    availableIn: ['en'],
    name: { en: 'Paris photoshoot' },
    category: 'vacation',
    initialPrice: 220,
    durationMinutes: 90,
    editedPhotos: 45,
    description: {
      en: 'A session built for someone with two days in Paris and one morning to spare.',
    },
    deliverables: {
      en: [
        '45 retouched photographs',
        'A route through two or three quarters, on foot',
        'Booked at first light, which is the only hour the landmarks are yours',
        'Private gallery within 48 hours, reachable from any country',
      ],
    },
    faqs: [
      {
        question: { en: 'We are only here for two days.' },
        answer: {
          en: 'That is the normal case and the session is built for it. We scout without you and send a single line telling you where to stand at what time. You are not asked to come and look at anything in advance.',
        },
      },
    ],
  },
  {
    slug: 'eiffel-tower-session',
    availableIn: ['en'],
    name: { en: 'Eiffel Tower session' },
    category: 'vacation',
    initialPrice: 240,
    durationMinutes: 90,
    editedPhotos: 45,
    description: {
      en: 'The tower, photographed from the four places it actually works, at the hour it works.',
    },
    deliverables: {
      en: [
        '45 retouched photographs',
        'Four vantage points, all within walking distance',
        'Booked at sunrise — by nine the crowd has taken every angle',
        'Private gallery within 48 hours',
      ],
    },
    faqs: [
      {
        question: { en: 'Is there a rule about photographing the tower?' },
        answer: {
          en: 'The tower itself is out of copyright; its night-time lighting installation is not, which is why commercial use of illuminated night shots is restricted. Daytime and blue-hour frames are unaffected, and those are the ones we shoot anyway.',
        },
      },
    ],
  },
  {
    slug: 'provence-destination-wedding',
    availableIn: ['en'],
    name: { en: 'Provence destination wedding' },
    category: 'wedding',
    initialPrice: 2200,
    durationMinutes: 660,
    editedPhotos: 450,
    deliverables: {
      en: [
        '450 retouched photographs',
        'Eleven hours, from preparations to the end of the evening',
        'Contact with the mas or château about access and curfew',
        'Full private gallery within three weeks',
      ],
    },
    faqs: [
      {
        question: { en: 'When is the light best in Provence?' },
        answer: {
          en: 'Late September into early October. July delivers a hard vertical light until well past seven in the evening and heat that no guest enjoys in formal clothes; lavender, if that is why you are coming, is cut from the first days of August.',
        },
      },
    ],
  },
  {
    slug: 'loire-chateau-wedding',
    availableIn: ['en'],
    name: { en: 'Loire château wedding' },
    category: 'wedding',
    initialPrice: 2000,
    durationMinutes: 660,
    editedPhotos: 450,
    deliverables: {
      en: [
        '450 retouched photographs',
        'Eleven hours of continuous coverage',
        'Access and interior-photography rules agreed with the estate in advance',
        'Full private gallery within three weeks',
      ],
    },
    faqs: [
      {
        question: { en: 'Can we photograph inside the château?' },
        answer: {
          en: 'It depends entirely on the estate, and the answer is written into your hire contract rather than set by any general rule. Several allow the ceremony but not the state rooms; some forbid flash anywhere indoors. We confirm it with them before the day rather than discovering it on it.',
        },
      },
    ],
  },
  {
    slug: 'french-alps-elopement',
    availableIn: ['en'],
    name: { en: 'French Alps elopement' },
    category: 'wedding',
    initialPrice: 950,
    durationMinutes: 300,
    editedPhotos: 180,
    deliverables: {
      en: [
        '180 retouched photographs',
        'Five hours including the walk up and back',
        'A weather call made together 48 hours ahead, with a second date held',
        'Private gallery within ten days',
      ],
    },
    faqs: [
      {
        question: { en: 'What happens if the weather closes in?' },
        answer: {
          en: 'We hold a second date from the start, and make the call together two days out rather than on the morning. Cloud at altitude is not the problem people expect — it diffuses beautifully. Wind above about forty kilometres an hour is, and that is what moves the day.',
        },
      },
    ],
  },
  {
    slug: 'riviera-honeymoon',
    availableIn: ['en'],
    name: { en: 'Riviera honeymoon session' },
    category: 'couples',
    initialPrice: 260,
    durationMinutes: 120,
    editedPhotos: 55,
    deliverables: {
      en: [
        '55 retouched photographs',
        'Two hours between the old town and the water',
        'Timed to the end of the day, when the sea goes flat',
        'Private gallery within 48 hours',
      ],
    },
    faqs: [],
  },

  // -------------------------------------------- French only: domestic demand
  {
    slug: 'evjf',
    availableIn: ['fr'],
    name: { fr: 'Shooting EVJF', en: 'Shooting EVJF' },
    category: 'other',
    initialPrice: 280,
    durationMinutes: 120,
    editedPhotos: 70,
    description: {
      fr: 'Deux heures avec le groupe, en extérieur, sans mise en scène forcée.',
      en: 'Two hours with the group, outdoors, without forced staging.',
    },
    deliverables: {
      fr: [
        '70 photographies retouchées',
        'Deux heures avec l’ensemble du groupe',
        'Photos de groupe et portraits individuels',
        'Galerie privée partagée avec toutes les participantes',
      ],
      en: [
        '70 retouched photographs',
        'Two hours with the whole group',
        'Group frames and individual portraits',
        'Private gallery shared with every participant',
      ],
    },
    faqs: [
      {
        question: { fr: 'Combien de personnes au maximum ?', en: 'How many people at most?' },
        answer: {
          fr: 'Douze reste confortable. Au-delà, le temps passe en organisation plutôt qu’en photographie, et il vaut mieux prévoir une demi-heure de plus que de serrer le programme.',
          en: 'Twelve stays comfortable. Beyond that the time goes into organising rather than photographing, and it is better to add half an hour than to compress the plan.',
        },
      },
    ],
  },
  {
    slug: 'photo-scolaire',
    availableIn: ['fr'],
    name: { fr: 'Photo scolaire', en: 'School photography' },
    category: 'other',
    initialPrice: 350,
    durationMinutes: 300,
    editedPhotos: 200,
    deliverables: {
      fr: [
        'Portrait individuel de chaque élève',
        'Photo de classe',
        'Espace de commande en ligne pour les familles',
        'Conformité au droit à l’image : autorisations recueillies en amont',
      ],
      en: [
        'An individual portrait of every pupil',
        'A class photograph',
        'An online ordering space for families',
        'Image-rights compliance: consents collected beforehand',
      ],
    },
    faqs: [],
  },
  {
    slug: 'book-comedien',
    availableIn: ['fr'],
    name: { fr: 'Book comédien', en: 'Actor headshots' },
    category: 'individual',
    initialPrice: 290,
    durationMinutes: 150,
    editedPhotos: 40,
    deliverables: {
      fr: [
        '40 photographies retouchées',
        'Trois registres de jeu, fond neutre et extérieur',
        'Formats attendus par les agences et les plateformes de casting',
        'Galerie privée sous une semaine',
      ],
      en: [
        '40 retouched photographs',
        'Three registers, on a neutral background and outdoors',
        'The formats agencies and casting platforms ask for',
        'Private gallery within a week',
      ],
    },
    faqs: [],
  },
  {
    slug: 'seance-photo-anniversaire',
    availableIn: ['fr'],
    name: { fr: 'Séance anniversaire', en: 'Birthday session' },
    category: 'family',
    initialPrice: 210,
    durationMinutes: 120,
    editedPhotos: 60,
    deliverables: {
      fr: ['60 photographies retouchées', 'Deux heures de couverture', 'Galerie privée sous 48 à 72 heures'],
      en: ['60 retouched photographs', 'Two hours of coverage', 'Private gallery within 48–72 hours'],
    },
    faqs: [],
  },
];
