import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the travel, fashion and remaining services.
 *
 * The travel sessions are the ones booked by someone who is already in France
 * with a day to spare, so the copy answers the question they are actually
 * asking: how does this fit into a trip I have already planned.
 */
export const LIFESTYLE_SERVICE_SEO: Record<string, ServiceSeo> = {
  vacation: {
    title: { en: 'Holiday Photo Session in France — One Hour', fr: 'Séance photo vacances en France — une heure' },
    description: {
      en: 'An hour of photographs while you are here, on a route that fits into a day of sightseeing. €180, 30 frames, gallery in 48h from any country.',
      fr: 'Une heure de photographies pendant votre séjour, sur un parcours qui s’insère dans une journée de visite. 180 €, 30 images, galerie sous 48 h.',
    },
    heading: { en: 'Built to fit around the day you already planned', fr: 'Conçue pour s’insérer dans la journée prévue' },
    paragraphs: {
      en: [
        'This is the shortest session on the site and the one most people on a trip actually want. An hour, in the places you came to see, on a route that fits into a day of sightseeing rather than replacing it — you carry on with your afternoon afterwards instead of having given it up.',
        'The hour is placed at either end of the day, because that is when the places you came for are usable. A landmark at eight in the morning belongs to you; the same landmark at eleven belongs to four coach parties. Booking the early slot is the single decision that most changes what the photographs look like.',
        'Thirty retouched photographs arrive in a private gallery within 48 hours, downloadable at full resolution from any country — which matters when you booked in one place, were photographed in another and will be home in a third by the time it lands.',
      ],
      fr: [
        'C’est la séance la plus courte du site et celle que veulent réellement la plupart des voyageurs. Une heure, dans les lieux pour lesquels vous êtes venus, sur un parcours qui s’insère dans une journée de visite au lieu de la remplacer — vous poursuivez votre après-midi ensuite, sans y avoir renoncé.',
        'Cette heure se place à l’un ou l’autre bout de la journée, parce que c’est là que les lieux visés sont praticables. Un monument à huit heures du matin vous appartient ; le même à onze heures appartient à quatre autocars. Choisir le créneau matinal est la décision qui change le plus l’allure des images.',
        'Trente photographies retouchées arrivent en galerie privée sous 48 heures, téléchargeables en pleine résolution depuis n’importe quel pays — ce qui compte quand on a réservé dans un pays, été photographié dans un deuxième et qu’on sera rentré dans un troisième à la livraison.',
      ],
    },
  },

  'city-tour': {
    title: { en: 'Photo Walk in France — Two Hours, Guided', fr: 'Balade photo en France — deux heures guidées' },
    description: {
      en: 'Two hours across several neighbourhoods with a local who knows what is worth the detour. €240, 60 retouched photographs, gallery in 48–72 hours.',
      fr: 'Deux heures à travers plusieurs quartiers avec un local qui sait ce qui vaut le détour. 240 €, 60 photographies retouchées, galerie en 48–72 h.',
    },
    heading: { en: 'Half a photo session, half a walking tour', fr: 'Moitié séance photo, moitié visite guidée' },
    paragraphs: {
      en: [
        'Two hours covers ground a one-hour session cannot: several neighbourhoods rather than one, and the streets between them, which are frequently where the photographs worth keeping happen. The result reads as a record of a day in a city rather than a set of portraits taken in front of things.',
        'What you are also buying is the local knowledge. The photographer lives here and picks the route — which courtyard is open before ten, which street the light runs down at six, which famous square to skip entirely because it is a building site this month. That is not information any amount of trip planning produces.',
        'It suits a first visit, a solo traveller who would like to exist in their own holiday photographs, and anyone who finds a static session uncomfortable — walking gives you something to do. Sixty retouched photographs arrive in a private gallery within 48 to 72 hours.',
      ],
      fr: [
        'Deux heures couvrent un terrain qu’une séance d’une heure ne peut pas : plusieurs quartiers plutôt qu’un seul, et les rues entre eux, où se font souvent les images que l’on garde. Le résultat se lit comme le récit d’une journée dans une ville plutôt que comme une série de portraits devant des monuments.',
        'Ce que vous achetez aussi, c’est la connaissance locale. Le photographe habite ici et choisit le parcours — quelle cour est ouverte avant dix heures, dans quelle rue la lumière descend à dix-huit, quelle place célèbre éviter entièrement parce qu’elle est en travaux ce mois-ci. Aucune préparation de voyage ne produit cette information.',
        'Cela convient à une première visite, à un voyageur seul qui aimerait exister sur ses propres photos de vacances, et à qui trouve une séance statique inconfortable — marcher donne quelque chose à faire. Soixante photographies retouchées arrivent en galerie privée sous 48 à 72 heures.',
      ],
    },
  },

  'paris-photoshoot': {
    title: { en: 'Paris Photoshoot — One Morning, Two Quarters', fr: 'Paris photoshoot — un matin, deux quartiers' },
    description: {
      en: 'Built for someone with two days in Paris and one morning to spare: two or three quarters on foot, booked at first light. €220, 45 frames, gallery in 48h.',
      fr: 'Pensée pour qui a deux jours à Paris et une matinée : deux ou trois quartiers à pied, au lever du jour. 220 €, 45 images, galerie sous 48 h.',
    },
    heading: { en: 'First light is not a preference here', fr: 'Le lever du jour n’est pas une préférence ici' },
    paragraphs: {
      en: [
        'Paris photographs early or not at all. That is the whole logic of this session. After about nine in the morning the places people come for — the Trocadéro, the Louvre courtyard, the steps up to Montmartre — belong to several hundred other people with the same idea, and no amount of skill removes them from a frame.',
        'Ninety minutes at first light covers two or three quarters on foot. On foot matters: Paris rewards the streets between the landmarks far more than the landmarks themselves, and a session spent in taxis is a session spent in traffic.',
        'It is built for someone with two days in the city and one morning to spare, which is why the whole thing is over before most cafés open and your day is still ahead of you. Forty-five retouched photographs arrive in a private gallery within 48 hours, reachable from any country.',
      ],
      fr: [
        'Paris se photographie tôt ou pas du tout. C’est toute la logique de cette séance. Passé neuf heures environ, les lieux pour lesquels on vient — le Trocadéro, la cour du Louvre, les marches de Montmartre — appartiennent à quelques centaines d’autres personnes ayant eu la même idée, et aucun savoir-faire ne les efface d’un cadre.',
        'Quatre-vingt-dix minutes au lever du jour couvrent deux ou trois quartiers à pied. À pied, cela compte : Paris récompense les rues entre les monuments bien plus que les monuments eux-mêmes, et une séance passée en taxi est une séance passée dans les embouteillages.',
        'Elle est pensée pour qui a deux jours en ville et une matinée à consacrer : tout est terminé avant l’ouverture de la plupart des cafés et votre journée est encore entière. Quarante-cinq photographies retouchées arrivent en galerie privée sous 48 heures, accessibles depuis n’importe quel pays.',
      ],
    },
  },

  'eiffel-tower-session': {
    title: { en: 'Eiffel Tower Photo Session — Sunrise, 4 Views', fr: 'Séance photo tour Eiffel — aube, 4 points de vue' },
    description: {
      en: 'The tower from the four places it actually works, all within walking distance, booked at sunrise. By nine the crowd has taken every angle. €240, 45 frames.',
      fr: 'La tour depuis les quatre endroits qui fonctionnent vraiment, à pied, au lever du soleil. À neuf heures la foule occupe tous les angles. 240 €, 45 images.',
    },
    heading: { en: 'Four vantage points, and why not the obvious one', fr: 'Quatre points de vue, et pourquoi pas l’évident' },
    paragraphs: {
      en: [
        'Standing directly underneath the Eiffel Tower produces a photograph of iron girders. The tower needs distance and an angle to read as itself, and there are about four places within walking distance of each other where it genuinely works — a terrace, a bridge, a street that frames it between buildings, and the classic view that everyone knows and almost nobody reaches early enough.',
        'Sunrise is not a stylistic choice. By nine in the morning every one of those four positions has a queue of people photographing each other in it, and the difference between six-thirty and nine is the difference between having the frame and negotiating for it.',
        'Ninety minutes covers all four on foot. Forty-five retouched photographs arrive in a private gallery within 48 hours. If you are in Paris for longer and want more than the tower, the Paris photoshoot covers two or three quarters instead for the same duration.',
      ],
      fr: [
        'Se tenir directement sous la tour Eiffel produit une photographie de poutrelles. La tour a besoin de distance et d’un angle pour se lire comme elle-même, et il existe environ quatre endroits, accessibles à pied les uns des autres, où cela fonctionne vraiment — une terrasse, un pont, une rue qui la cadre entre deux immeubles, et la vue classique que tout le monde connaît et que presque personne n’atteint assez tôt.',
        'Le lever du soleil n’est pas un choix esthétique. À neuf heures, chacune de ces quatre positions est occupée par une file de gens qui s’y photographient, et l’écart entre six heures trente et neuf heures est l’écart entre avoir le cadre et le négocier.',
        'Quatre-vingt-dix minutes couvrent les quatre à pied. Quarante-cinq photographies retouchées arrivent en galerie privée sous 48 heures. Si vous restez plus longtemps et voulez autre chose que la tour, la séance Paris photoshoot couvre deux ou trois quartiers pour la même durée.',
      ],
    },
  },

  'fashion-editorial': {
    title: { en: 'Fashion Editorial Photographer in France', fr: 'Photographe éditorial mode en France' },
    description: {
      en: 'Five hours on location or in studio, retouched to publication standard. €600, 40 frames, gallery within ten days. Lookbooks, campaigns and editorial.',
      fr: 'Cinq heures en extérieur ou en studio, retouche aux standards de publication. 600 €, 40 images, galerie sous dix jours. Lookbook, campagne, éditorial.',
    },
    heading: { en: 'Five hours because a team needs them', fr: 'Cinq heures parce qu’une équipe en a besoin' },
    paragraphs: {
      en: [
        'An editorial shoot is the only session here that routinely involves other people’s schedules — a stylist, hair and make-up, a model whose agency booked a window. Five hours is the length that lets a team work through several looks without the last one being made in a hurry, which is invariably the one that gets dropped.',
        'On location or in studio is your call and mostly depends on the clothes. Studio gives absolute control and a consistent set. Location gives context, weather and the risk of losing an hour to it — worth it when the garments need a world around them, not worth it for a straightforward lookbook.',
        'Forty photographs retouched to publication standard is a smaller count than our other sessions and takes longer to deliver — ten days — because editorial retouching is a different job from correcting colour. Come with a reference deck if you have one; an hour of alignment before the day saves two on it.',
      ],
      fr: [
        'Une prise de vue éditoriale est la seule séance d’ici qui implique régulièrement l’agenda d’autres personnes — styliste, coiffure et maquillage, mannequin dont l’agence a bloqué une fenêtre. Cinq heures, c’est la durée qui permet à une équipe d’enchaîner plusieurs looks sans bâcler le dernier, celui qu’on sacrifie invariablement.',
        'Extérieur ou studio relève de votre choix et dépend surtout des vêtements. Le studio donne un contrôle absolu et une série homogène. L’extérieur donne du contexte, de la météo et le risque d’y perdre une heure — cela vaut le coup quand les pièces ont besoin d’un monde autour d’elles, pas pour un lookbook simple.',
        'Quarante photographies retouchées aux standards de publication : un nombre plus faible que nos autres séances, et un délai plus long — dix jours — car la retouche éditoriale est un autre métier que la correction colorimétrique. Venez avec vos références si vous en avez : une heure de cadrage en amont en économise deux le jour même.',
      ],
    },
  },

  'model-portfolio': {
    title: { en: 'Model Portfolio Photographer in France — €420', fr: 'Book mannequin en France — photographe, 420 €' },
    description: {
      en: 'Four looks across four hours, with digitals shot as agencies require them. €420, 50 retouched photographs, gallery within ten days, 22 French cities.',
      fr: 'Quatre looks en quatre heures, avec des digitals réalisés comme les agences les exigent. 420 €, 50 images retouchées, galerie sous dix jours.',
    },
    heading: { en: 'Digitals are not portfolio photographs', fr: 'Les digitals ne sont pas des photos de book' },
    paragraphs: {
      en: [
        'Agencies ask for two entirely different things and reject portfolios that confuse them. Digitals — sometimes called polaroids — are deliberately plain: no make-up, no retouching, hair down, plain background, full length and close, so an agency can see what you actually look like. Portfolio images are the opposite, and a book made only of the second gets returned.',
        'This session produces both. Four looks across four hours gives the portfolio its range, and the digitals are shot as a separate set to the specification agencies use rather than pulled from the retouched frames afterwards.',
        'Fifty retouched photographs arrive within ten days. If you already have an agency, send us their requirements before the day — they differ on framing and on how much retouching they will accept, and it is easier to shoot to the spec than to argue with it afterwards.',
      ],
      fr: [
        'Les agences demandent deux choses entièrement différentes et refusent les books qui les confondent. Les digitals — parfois appelés polaroïds — sont volontairement bruts : sans maquillage, sans retouche, cheveux détachés, fond uni, en pied et en gros plan, pour que l’agence voie votre apparence réelle. Les images de book sont l’inverse, et un book composé uniquement des secondes est renvoyé.',
        'Cette séance produit les deux. Quatre looks en quatre heures donnent au book son amplitude, et les digitals sont réalisés comme une série à part, selon le cahier des charges des agences, plutôt que tirés après coup des images retouchées.',
        'Cinquante photographies retouchées arrivent sous dix jours. Si vous avez déjà une agence, envoyez-nous ses exigences avant le jour J : elles diffèrent sur le cadrage et sur le niveau de retouche admis, et il est plus simple de photographier selon le cahier des charges que de le discuter ensuite.',
      ],
    },
  },

  evjf: {
    title: { en: 'Hen Party Photographer in France — EVJF, €280', fr: 'Shooting EVJF en France — photographe, 280 €' },
    description: {
      en: 'Two hours with the whole group, outdoors, without forced staging. Group frames and individual portraits, shared with every participant. €280, 70 frames.',
      fr: 'Deux heures avec tout le groupe, en extérieur, sans mise en scène forcée. Images de groupe et portraits individuels, partagés avec chaque participante. 280 €.',
    },
    heading: { en: 'The gallery is shared with everyone in it', fr: 'La galerie est partagée avec toutes celles qui y sont' },
    paragraphs: {
      en: [
        'Two hours outdoors with the whole group, without props, matching sashes or forced staging — unless that is genuinely what you want, in which case say so. The default here is a group of people enjoying a day together, photographed as such, because that is the version most people are happy to look at a year later.',
        'Seventy photographs is a deliberately high count for a two-hour session, and the reason is arithmetic: with ten people you need group frames and an individual portrait of each, and a session that produces thirty images cannot do both.',
        'The private gallery is shared with every participant rather than only with whoever booked. It sounds minor and it is the thing groups mention most afterwards — nobody has to chase the organiser for the photographs, and nobody ends up with a screenshot of a screenshot.',
      ],
      fr: [
        'Deux heures en extérieur avec tout le groupe, sans accessoires, sans écharpes assorties ni mise en scène forcée — sauf si c’est vraiment ce que vous voulez, auquel cas dites-le. Le réglage par défaut ici, c’est un groupe qui passe une bonne journée, photographié comme tel, parce que c’est la version que l’on est content de regarder un an après.',
        'Soixante-dix photographies est un nombre volontairement élevé pour deux heures, et la raison est arithmétique : à dix personnes, il faut des images de groupe et un portrait individuel de chacune, et une séance qui produit trente images ne peut pas faire les deux.',
        'La galerie privée est partagée avec chaque participante, pas seulement avec celle qui a réservé. Cela paraît mineur et c’est ce que les groupes citent le plus souvent après coup : personne n’a à réclamer les photos à l’organisatrice, et personne ne finit avec une capture d’écran de capture d’écran.',
      ],
    },
  },

  'photo-scolaire': {
    title: { en: 'School Photography in France — Consents First', fr: 'Photo scolaire en France — droits à l’image' },
    description: {
      en: 'An individual portrait of every pupil, a class photograph, and an online ordering space for families. Consents collected beforehand. €350, 200 photographs.',
      fr: 'Un portrait individuel par élève, une photo de classe, et un espace de commande en ligne pour les familles. Consentements recueillis en amont. 350 €.',
    },
    heading: { en: 'The consents are collected before the day', fr: 'Les consentements sont recueillis avant le jour J' },
    paragraphs: {
      en: [
        'Photographing minors in a French school is governed by image-rights law, and the paperwork is not an afterthought — it is the first item. Written parental consent is collected beforehand, per pupil, and a child whose form has not come back is not photographed. Schools that discover this on the morning end up with a class photograph they cannot distribute.',
        'The day produces an individual portrait of every pupil and a class photograph. Five hours covers a typical school; tell us the number of classes when you book so the timetable is drawn against your breaks rather than through them.',
        'Families order through an online space of their own rather than through envelopes of cash sent back with children, which is faster for the school office and means a parent in another household can order directly. Two hundred photographs make up the delivery.',
      ],
      fr: [
        'Photographier des mineurs dans une école française relève du droit à l’image, et la paperasse n’est pas un détail de fin de parcours : c’est le premier point. Le consentement parental écrit est recueilli en amont, élève par élève, et un enfant dont l’autorisation n’est pas revenue n’est pas photographié. Les écoles qui le découvrent le matin même se retrouvent avec une photo de classe qu’elles ne peuvent pas distribuer.',
        'La journée produit un portrait individuel par élève et une photo de classe. Cinq heures couvrent un établissement type ; indiquez le nombre de classes à la réservation pour que le planning soit tracé sur vos récréations plutôt qu’à travers elles.',
        'Les familles commandent via un espace en ligne dédié plutôt qu’avec des enveloppes d’espèces confiées aux enfants : c’est plus rapide pour le secrétariat, et un parent d’un autre foyer peut commander directement. Deux cents photographies composent la livraison.',
      ],
    },
  },
};
