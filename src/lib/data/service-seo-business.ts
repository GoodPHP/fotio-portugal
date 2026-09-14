import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the corporate and commercial services.
 *
 * These pages are read by someone spending a company's money, so the copy
 * answers procurement questions — what it costs per head, what formats come
 * out, when it lands — rather than describing a mood.
 */
export const BUSINESS_SERVICE_SEO: Record<string, ServiceSeo> = {
  headshots: {
    title: { en: 'Corporate Headshots in France — €150 a Head', fr: 'Photo corporate LinkedIn en France — 150 €' },
    description: {
      en: 'One consistent set of team headshots, shot on your premises in a single visit. Thirty minutes each, 8 retouched frames per person, square and 16:9 crops.',
      fr: 'Une série homogène de portraits d’équipe, réalisée chez vous en une seule visite. Trente minutes par personne, 8 images retouchées, formats carré et 16:9.',
    },
    heading: { en: 'Consistency is the whole deliverable', fr: 'L’homogénéité est le vrai livrable' },
    paragraphs: {
      en: [
        'A team page fails when the photographs do not match. Twelve people shot by twelve photographers over three years give you twelve different backgrounds, twelve exposures and twelve crops, and no amount of good individual portraits fixes how that reads on one screen. One lighting set-up, one visit, one operator is the entire point of this session.',
        'It happens on your premises rather than in a studio, at thirty minutes per person, which is enough to get someone past the first awkward five minutes and still move a department through in a day. A meeting room with any window at all is usually sufficient; the set-up travels.',
        'Eight retouched photographs per person are delivered in square and 16:9 crops, because a headshot has to work as a circle on an internal directory, a square on LinkedIn and a wide banner on a proposal deck. Supplying one aspect ratio and leaving the marketing team to crop it is how people end up with their foreheads cut off.',
      ],
      fr: [
        'Une page équipe échoue quand les photographies ne s’accordent pas. Douze personnes photographiées par douze photographes sur trois ans donnent douze fonds, douze expositions et douze cadrages différents, et aucun portrait individuel réussi ne rattrape ce que cela donne sur un même écran. Un seul éclairage, une seule visite, un seul opérateur : c’est tout l’objet de cette séance.',
        'Cela se passe dans vos locaux plutôt qu’en studio, à raison de trente minutes par personne — assez pour dépasser les cinq premières minutes de gêne tout en faisant passer un service dans la journée. Une salle de réunion avec une fenêtre suffit en général ; le matériel se déplace.',
        'Huit photographies retouchées par personne sont livrées en formats carré et 16:9, car un portrait doit fonctionner en rond dans un annuaire interne, en carré sur LinkedIn et en bandeau large dans une présentation. Ne fournir qu’un seul ratio et laisser le marketing recadrer, c’est ainsi qu’on se retrouve avec des fronts coupés.',
      ],
    },
  },

  'personal-brand': {
    title: { en: 'Personal Branding Photography in France', fr: 'Photographe personal branding en France' },
    description: {
      en: 'Three hours across two or three settings: portraits, at-work frames and details. Enough material for a year of posting. €380, 60 retouched photographs.',
      fr: 'Trois heures sur deux ou trois lieux : portraits, images au travail et détails. De quoi publier pendant un an. 380 €, 60 photographies retouchées.',
    },
    heading: { en: 'Sixty photographs is a year of posting', fr: 'Soixante photographies, c’est un an de publications' },
    paragraphs: {
      en: [
        'Anyone who publishes regularly runs out of pictures of themselves long before they run out of things to say. The point of a three-hour session across two or three settings is not to produce one perfect portrait; it is to produce a library varied enough that you are not posting the same face against the same wall every fortnight for a year.',
        'That means a deliberate mix: portraits that work as a profile, at-work frames that show what you actually do, and detail shots — hands, tools, a desk, a workshop — that carry a post without a face in it at all. The details are the ones people underestimate and the ones that get used most.',
        'Three hours is enough to change clothes, change setting and change register without rushing. Bring more than one outfit. Sixty retouched photographs arrive in a private gallery, and the licence covers printing and posting them wherever you publish.',
      ],
      fr: [
        'Qui publie régulièrement manque d’images de soi bien avant de manquer de choses à dire. L’objectif de trois heures sur deux ou trois lieux n’est pas de produire un portrait parfait : c’est de constituer une banque assez variée pour ne pas publier le même visage devant le même mur tous les quinze jours pendant un an.',
        'Cela suppose un mélange voulu : des portraits qui font profil, des images au travail qui montrent ce que vous faites réellement, et des plans de détail — mains, outils, bureau, atelier — qui portent une publication sans aucun visage. Ce sont ces détails que l’on sous-estime et que l’on utilise le plus.',
        'Trois heures suffisent à changer de tenue, de décor et de registre sans précipitation. Prévoyez plusieurs tenues. Soixante photographies retouchées arrivent en galerie privée, avec une licence couvrant l’impression et la publication partout où vous publiez.',
      ],
    },
  },

  'corporate-event': {
    title: { en: 'Corporate Event Photographer in France — €450', fr: 'Photographe événement d’entreprise — 450 €' },
    description: {
      en: 'Four hours of coverage with a same-evening selection for press and social, and the full gallery within 72 hours. €450, 150 retouched photographs.',
      fr: 'Quatre heures de couverture avec une sélection le soir même pour la presse et les réseaux, galerie complète sous 72 heures. 450 €, 150 images.',
    },
    heading: { en: 'The selection that goes out the same evening', fr: 'La sélection qui part le soir même' },
    paragraphs: {
      en: [
        'A conference photographed beautifully and delivered a week later has missed the only window that mattered. Communications teams need something to publish while the event is still happening or the same evening at the latest, which is why a first selection is sent that night rather than with the full gallery.',
        'Four hours of coverage is planned against your run of show, not against a generic template. Keynote, panels, the networking that is often where the usable photographs actually are, and — if you tell us in advance — the specific people who must appear because a sponsor or a board expects it. That last request arrives after the event surprisingly often, when it is too late.',
        'A hundred and fifty retouched photographs make up the full gallery within 72 hours. Conference rooms are the hardest lighting on this site: mixed colour temperatures, a lit stage against a dark room, and screens that fight every exposure. It is worth booking someone who has worked one before.',
      ],
      fr: [
        'Une conférence magnifiquement photographiée et livrée une semaine plus tard a raté la seule fenêtre qui comptait. Les services communication ont besoin de publier pendant l’événement ou le soir même au plus tard : une première sélection part donc dans la soirée, sans attendre la galerie complète.',
        'Les quatre heures de couverture se construisent sur votre déroulé, pas sur un modèle générique. Plénière, tables rondes, temps de réseautage — souvent là que se trouvent les images réellement utilisables — et, si vous le signalez en amont, les personnes précises qui doivent figurer parce qu’un sponsor ou un conseil l’attend. Cette dernière demande arrive étonnamment souvent après l’événement, quand il est trop tard.',
        'Cent cinquante photographies retouchées composent la galerie complète sous 72 heures. Les salles de conférence offrent l’éclairage le plus difficile de ce site : températures de couleur mélangées, scène éclairée dans une salle sombre, écrans qui contrarient toute exposition. Mieux vaut réserver quelqu’un qui en a déjà couvert une.',
      ],
    },
  },

  event: {
    title: { en: 'Event Photographer in France — Four Hours', fr: 'Photographe d’événement en France — quatre heures' },
    description: {
      en: 'Four hours of coverage for a launch, a party, an opening or a private celebration. €400, 130 retouched photographs, private gallery within 72 hours.',
      fr: 'Quatre heures de couverture pour un lancement, une fête, une inauguration ou une célébration privée. 400 €, 130 images, galerie privée sous 72 heures.',
    },
    heading: { en: 'Tell us the three photographs you must have', fr: 'Dites-nous les trois images indispensables' },
    paragraphs: {
      en: [
        'Every event has a handful of photographs that have to exist — the ribbon, the speech, the founder with the person who flew in for it — and a much larger number that are nice to have. Naming the first group before the day is the single most useful thing a client can do, because a photographer who knows the three non-negotiables will be standing in the right place ten minutes early.',
        'Four hours covers a launch, an opening, a party or a private celebration. It is generic on purpose: if your event is a conference with a run of show and a press deadline, the corporate event session is built for that instead and includes a same-evening selection.',
        'A hundred and thirty retouched photographs arrive in a private gallery within 72 hours, with a licence to use them however you need. If the event runs longer than four hours, say so when you book rather than extending on the night — it is cheaper agreed in advance.',
      ],
      fr: [
        'Chaque événement comporte une poignée de photographies qui doivent exister — le ruban, le discours, le fondateur avec la personne venue exprès — et un bien plus grand nombre qui seraient agréables à avoir. Nommer le premier groupe avant le jour J est la chose la plus utile qu’un client puisse faire : un photographe qui connaît les trois incontournables sera en place dix minutes à l’avance.',
        'Quatre heures couvrent un lancement, une inauguration, une fête ou une célébration privée. C’est générique à dessein : si votre événement est une conférence avec un déroulé et une échéance presse, la séance événement d’entreprise est faite pour cela et comprend une sélection le soir même.',
        'Cent trente photographies retouchées arrivent en galerie privée sous 72 heures, avec une licence d’utilisation libre selon vos besoins. Si l’événement dépasse quatre heures, signalez-le à la réservation plutôt que de prolonger le soir venu : convenu à l’avance, c’est moins cher.',
      ],
    },
  },

  product: {
    title: { en: 'Product Photography in France — Packshots', fr: 'Photo produit et packshot en France' },
    description: {
      en: 'Packshots cut out on pure white for marketplaces, plus context frames for your own site, delivered in the crops each platform requires. €320, 30 frames.',
      fr: 'Packshots détourés sur blanc pur pour les marketplaces, plus des images en contexte pour votre site, aux formats exigés par chaque plateforme. 320 €.',
    },
    heading: { en: 'Two jobs, and marketplaces only accept one', fr: 'Deux usages, et les marketplaces n’en acceptent qu’un' },
    paragraphs: {
      en: [
        'Product photography is really two different jobs sold as one. Marketplaces want a cut-out on pure white with the product filling a specified proportion of the frame, and they reject anything else automatically. Your own site wants the opposite: the product in a setting, with a surface, a shadow and something to give it scale.',
        'The session covers both in a single visit, so you are not paying twice or matching two photographers’ colour later. Thirty retouched photographs split between clean packshots and context frames, with the split agreed before we start based on how many listings you are filling.',
        'Everything is delivered in the crops each platform requires. Amazon, Etsy, Shopify and Google Shopping all specify different things, and a listing rejected for a wrong background costs more in time than the photograph cost to make. Send us the list of channels when you book and the export is set up for them.',
      ],
      fr: [
        'La photographie de produit recouvre en réalité deux métiers vendus comme un seul. Les marketplaces veulent un détourage sur blanc pur avec le produit occupant une proportion imposée du cadre, et rejettent automatiquement tout le reste. Votre site veut l’inverse : le produit dans un décor, avec une surface, une ombre et de quoi donner l’échelle.',
        'La séance couvre les deux en une visite : vous ne payez pas deux fois et n’avez pas à raccorder ensuite la couleur de deux photographes. Trente photographies retouchées réparties entre packshots propres et images en contexte, la répartition étant convenue avant de commencer selon le nombre de fiches à remplir.',
        'Tout est livré aux formats exigés par chaque plateforme. Amazon, Etsy, Shopify et Google Shopping imposent des choses différentes, et une fiche refusée pour un fond non conforme coûte plus de temps que la photographie n’a coûté d’argent. Envoyez la liste de vos canaux à la réservation et l’export est réglé pour eux.',
      ],
    },
  },

  food: {
    title: { en: 'Restaurant & Food Photographer in France', fr: 'Photographe culinaire et restaurant en France' },
    description: {
      en: 'Dishes, room and team in one visit, shot during your closed hours, delivered in formats for the menu, your site and the delivery platforms. €350, 40 frames.',
      fr: 'Plats, salle et équipe en une visite, pendant votre fermeture, livrés aux formats carte, site et plateformes de livraison. 350 €, 40 images retouchées.',
    },
    heading: { en: 'Shot during service is shot badly', fr: 'Photographier pendant le service, c’est mal photographier' },
    paragraphs: {
      en: [
        'The session is booked during your closed hours, and that is not a convenience — it is the only way it works. A kitchen mid-service cannot plate for a camera, a dining room mid-service cannot be lit or moved, and a dish photographed after two minutes on a pass is a dish that has already collapsed. Four hours between services gets you all three subjects properly.',
        'Those three subjects are the deliverable: the dishes, the room, and the team. Most restaurants photograph the food and forget the other two, then wonder why their site looks like a menu. The room is what people book a table on, and a photograph of the person who cooks is worth more on a local listing than another plate.',
        'Forty retouched photographs come in the formats the channels want — a menu print, a website header, and the square crops that Uber Eats and Deliveroo apply whether or not your photograph survives them. Composing for that crop in advance is why the delivery listings do not end up showing half a plate.',
      ],
      fr: [
        'La séance se réserve pendant votre fermeture, et ce n’est pas un confort : c’est la seule façon d’y arriver. Une cuisine en plein service ne peut pas dresser pour un appareil, une salle en plein service ne peut être ni éclairée ni déplacée, et un plat photographié après deux minutes au passe est un plat déjà affaissé. Quatre heures entre deux services permettent de traiter correctement les trois sujets.',
        'Ces trois sujets sont le livrable : les plats, la salle, l’équipe. La plupart des restaurants photographient la nourriture et oublient les deux autres, puis s’étonnent que leur site ressemble à une carte. La salle est ce sur quoi on réserve une table, et une photographie de la personne qui cuisine vaut plus sur une fiche locale qu’une assiette de plus.',
        'Quarante photographies retouchées arrivent aux formats attendus par les canaux — impression de carte, bandeau de site, et les recadrages carrés qu’Uber Eats et Deliveroo appliquent que votre image y survive ou non. Composer pour ce recadrage à l’avance, c’est ce qui évite les fiches de livraison montrant une demi-assiette.',
      ],
    },
  },

  'real-estate': {
    title: { en: 'Real Estate Photographer in France — €220', fr: 'Photographe immobilier en France — 220 €' },
    description: {
      en: 'Interiors shot with the windows still readable and the verticals corrected, booked for the hour light enters the main rooms. 25 frames, delivered next morning.',
      fr: 'Intérieurs avec fenêtres lisibles et verticales redressées, à l’heure où la lumière entre dans les pièces principales. 25 images, livrées le lendemain matin.',
    },
    heading: { en: 'A blown-out window is a lost viewing', fr: 'Une fenêtre brûlée, c’est une visite perdue' },
    paragraphs: {
      en: [
        'The commonest fault in property photography is a window that has gone pure white. It happens because the room is far darker than the daylight outside it, and the easy fix — exposing for the room — throws away the view, the garden and any sense of where the property sits. Every frame here is made so the window still reads.',
        'Verticals are corrected as a matter of course. A wall that leans in a photograph makes a room look smaller and the listing look amateur, and it is one of the few things a viewer notices without being able to say why.',
        'The session is booked for the hour light actually enters the main rooms, which depends on which way the property faces and is worth two minutes of conversation before we set a time. Twenty-five retouched photographs are delivered the next morning — listings are a race, and a gallery that arrives three days later has already cost you the first weekend.',
      ],
      fr: [
        'Le défaut le plus courant en photographie immobilière est une fenêtre devenue blanche. Cela vient de ce que la pièce est bien plus sombre que la lumière du jour à l’extérieur, et la solution facile — exposer pour la pièce — sacrifie la vue, le jardin et toute idée de l’environnement du bien. Ici, chaque image est faite pour que la fenêtre reste lisible.',
        'Les verticales sont redressées systématiquement. Un mur penché sur une photographie rapetisse la pièce et fait amateur, et c’est l’un des rares défauts qu’un visiteur remarque sans savoir le nommer.',
        'La séance se cale sur l’heure où la lumière entre réellement dans les pièces principales, ce qui dépend de l’orientation du bien et mérite deux minutes de discussion avant de fixer un créneau. Vingt-cinq photographies retouchées sont livrées le lendemain matin : une annonce est une course, et une galerie qui arrive trois jours plus tard vous a déjà coûté le premier week-end.',
      ],
    },
  },

  'hotel-airbnb': {
    title: { en: 'Hotel & Airbnb Photographer in France — €260', fr: 'Photographe hôtel et location courte durée — 260 €' },
    description: {
      en: 'Rooms, common areas and the view, cropped for Airbnb, Booking and your own site, delivered the next morning. €260, 30 retouched photographs, 22 cities.',
      fr: 'Chambres, espaces communs et vue, recadrés pour Airbnb, Booking et votre site, livrés le lendemain matin. 260 €, 30 images retouchées, 22 villes.',
    },
    heading: { en: 'The cover photograph does most of the work', fr: 'La photo de couverture fait presque tout le travail' },
    paragraphs: {
      en: [
        'On Airbnb and Booking, one photograph decides whether anyone reads the rest of the listing, and it is displayed in a crop the platform chooses rather than the one you uploaded. Shooting with that crop in mind is the difference between a cover image that sells the room and one with a lamp cut in half down the middle.',
        'Thirty photographs cover the rooms, the common areas and the view. The common areas are the ones owners skip and guests search for — a breakfast room, a terrace, where the bicycles go — and on a competitive street they are frequently the only thing separating two similar apartments.',
        'The set is delivered in crops for Airbnb, Booking and your own site, and it arrives the next morning. Two and a half hours on site is enough for a small hotel or a large apartment; tell us the room count when you book so the time is right.',
      ],
      fr: [
        'Sur Airbnb et Booking, une seule photographie décide si quelqu’un lira le reste de l’annonce, et elle s’affiche dans un recadrage choisi par la plateforme, pas par vous. Photographier en anticipant ce recadrage, c’est la différence entre une couverture qui vend la chambre et une couverture où une lampe est coupée en deux.',
        'Trente photographies couvrent les chambres, les espaces communs et la vue. Les espaces communs sont ce que les propriétaires négligent et ce que les voyageurs cherchent — salle de petit-déjeuner, terrasse, local à vélos — et dans une rue concurrentielle, c’est souvent la seule chose qui sépare deux appartements comparables.',
        'La série est livrée aux formats Airbnb, Booking et site personnel, le lendemain matin. Deux heures trente sur place suffisent pour un petit hôtel ou un grand appartement ; indiquez le nombre de chambres à la réservation pour ajuster la durée.',
      ],
    },
  },
};
