import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the wedding, elopement and destination services.
 *
 * These are the highest-value pages on the site and the ones where a vague
 * claim costs the most, so every figure here — hours of coverage, photograph
 * count, delivery window — is the catalogue's, not an approximation of it.
 */
export const WEDDING_SERVICE_SEO: Record<string, ServiceSeo> = {
  wedding: {
    title: { en: 'Wedding Photographer in France — From €1,600', fr: 'Photographe de mariage en France — dès 1 600 €' },
    description: {
      en: 'Ten hours of continuous coverage, the venue contacted beforehand about access and timings, 400 retouched photographs delivered within three weeks. €1,600.',
      fr: 'Dix heures de couverture continue, le lieu contacté en amont sur les accès et le déroulé, 400 photographies livrées sous trois semaines. 1 600 €.',
    },
    heading: { en: 'The work that happens before the day', fr: 'Le travail qui précède le jour J' },
    paragraphs: {
      en: [
        'Ten hours is long enough to cover a wedding as one continuous account rather than as a set of highlights, and that is the point: the photographs people keep are rarely the ones on the schedule. They are the twenty minutes before the ceremony, the face of somebody watching from the third row, the part of the evening nobody planned.',
        'The venue is contacted before the day about access, timings and shelter. It sounds administrative and it is the single thing that most often saves a wedding gallery. Estates have rules about where a photographer may stand during the ceremony, châteaux have curfews, and half the venues in France have one room that is unusable after four in the afternoon. Knowing that in advance changes the schedule; discovering it on the day changes the photographs.',
        'Four hundred retouched photographs arrive as a full private gallery within three weeks. That is longer than our other sessions and deliberately so — a wedding is several thousand frames before selection, and rushing that stage is how galleries end up padded with near-duplicates. The price is agreed in writing beforehand and does not move.',
      ],
      fr: [
        'Dix heures suffisent à couvrir un mariage comme un récit continu plutôt que comme une série de temps forts, et c’est bien l’objectif : les photographies que l’on garde sont rarement celles du programme. Ce sont les vingt minutes avant la cérémonie, le visage de quelqu’un qui regarde depuis le troisième rang, le moment de la soirée que personne n’avait prévu.',
        'Le lieu est contacté avant le jour J au sujet des accès, du déroulé et des abris. Cela paraît administratif et c’est ce qui sauve le plus souvent une galerie de mariage. Les domaines ont des règles sur l’emplacement du photographe pendant la cérémonie, les châteaux ont des heures de fermeture, et la moitié des lieux en France ont une pièce inutilisable après seize heures. Le savoir à l’avance change le déroulé ; le découvrir le jour même change les photographies.',
        'Quatre cents photographies retouchées arrivent en galerie privée complète sous trois semaines. C’est plus long que nos autres séances, et volontairement : un mariage représente plusieurs milliers d’images avant sélection, et bâcler cette étape est ce qui remplit les galeries de quasi-doublons. Le tarif est fixé par écrit à l’avance et ne bouge pas.',
      ],
    },
  },

  elopement: {
    title: { en: 'Elopement Photographer in France — From €750', fr: 'Photographe de mariage intime — dès 750 €' },
    description: {
      en: 'Four hours covering the ceremony and the walk afterwards, with help choosing the hour for the light. €750, 150 retouched frames, gallery in ten days.',
      fr: 'Quatre heures couvrant la cérémonie et la promenade qui suit, avec aide au choix de l’heure pour la lumière. 750 €, 150 images, galerie sous dix jours.',
    },
    heading: { en: 'You choose the hour, and it matters more than the venue', fr: 'Vous choisissez l’heure, et elle compte plus que le lieu' },
    paragraphs: {
      en: [
        'An elopement has a freedom a full wedding does not: almost nothing is fixed by other people’s schedules. No coach to arrive, no ninety guests to seat, no lunch that has to be served at one. Which means the ceremony can be placed at the hour the light is best rather than the hour the caterer needs, and that single decision does more for the photographs than any location choice.',
        'Four hours covers the ceremony and the walk afterwards. The walk is not filler — with two people rather than a hundred, you can leave the ceremony spot entirely and be somewhere quite different twenty minutes later, which is how an elopement gallery ends up with more range than a wedding one despite a fraction of the coverage.',
        'A hundred and fifty retouched photographs arrive within ten days. It works as well for a mairie ceremony followed by an afternoon for two as for a vow exchange with no legal element at all, and it is priced the same either way.',
      ],
      fr: [
        'Un mariage intime a une liberté que n’a pas un mariage complet : presque rien n’est fixé par l’agenda des autres. Pas de car à attendre, pas de quatre-vingt-dix invités à placer, pas de déjeuner à servir à treize heures. La cérémonie peut donc se placer à l’heure où la lumière est la meilleure plutôt qu’à celle qui arrange le traiteur, et cette seule décision fait plus pour les images que n’importe quel choix de lieu.',
        'Quatre heures couvrent la cérémonie et la promenade qui suit. Cette promenade n’est pas du remplissage : à deux plutôt qu’à cent, on peut quitter entièrement le lieu de cérémonie et se retrouver ailleurs vingt minutes plus tard — c’est ainsi qu’une galerie d’elopement finit plus variée qu’une galerie de mariage avec une fraction de la couverture.',
        'Cent cinquante photographies retouchées arrivent sous dix jours. Cela vaut aussi bien pour une cérémonie à la mairie suivie d’un après-midi à deux que pour un échange de vœux sans dimension légale, au même tarif dans les deux cas.',
      ],
    },
  },

  'provence-destination-wedding': {
    title: { en: 'Provence Wedding Photographer — Mas & Château', fr: 'Photographe mariage en Provence — mas et château' },
    description: {
      en: 'Eleven hours from preparations to the end of the evening, with the mas or château contacted about access and curfew. €2,200, 450 frames in three weeks.',
      fr: 'Onze heures des préparatifs à la fin de soirée, le mas ou château contacté sur les accès et le couvre-feu. 2 200 €, 450 images sous trois semaines.',
    },
    heading: { en: 'Heat, curfews and the hour nobody plans for', fr: 'La chaleur, le couvre-feu et l’heure que personne ne prévoit' },
    paragraphs: {
      en: [
        'A Provence wedding is planned around two constraints that do not exist further north. The first is heat: between roughly two and five in the afternoon, an outdoor ceremony is uncomfortable for guests and unflattering under a vertical sun, which is why most couples here move the ceremony to the end of the day and hold the middle of the afternoon empty.',
        'The second is the curfew. Many mas and châteaux in the region operate under a municipal noise restriction that ends the music at a fixed hour, and it is written into the contract rather than negotiable on the night. Eleven hours of coverage is built to run from preparations to that hour, and the venue is contacted in advance so the schedule is drawn against the real one.',
        'Lavender, if that is why you chose the region, is a separate calendar again — the fields are cut in the first days of August, and a September wedding photographed in a lavender field is a photograph of cut stalks. Four hundred and fifty retouched photographs arrive as a full gallery within three weeks.',
      ],
      fr: [
        'Un mariage en Provence se prépare autour de deux contraintes qui n’existent pas plus au nord. La première est la chaleur : entre quatorze et dix-sept heures environ, une cérémonie en extérieur est pénible pour les invités et peu flatteuse sous un soleil vertical — d’où le choix, ici, de déplacer la cérémonie en fin de journée et de laisser le milieu d’après-midi vide.',
        'La seconde est le couvre-feu. Beaucoup de mas et de châteaux de la région relèvent d’un arrêté municipal qui arrête la musique à une heure fixe, inscrite au contrat et non négociable le soir venu. Les onze heures de couverture sont construites pour aller des préparatifs à cette heure-là, et le lieu est contacté en amont pour que le déroulé soit tracé sur le vrai.',
        'La lavande, si c’est pour elle que vous avez choisi la région, relève encore d’un autre calendrier : les champs sont coupés dans les premiers jours d’août, et un mariage de septembre photographié dans un champ de lavande est une photographie de tiges coupées. Quatre cent cinquante photographies retouchées arrivent en galerie complète sous trois semaines.',
      ],
    },
  },

  'loire-chateau-wedding': {
    title: { en: 'Loire Château Wedding Photographer — €2,000', fr: 'Photographe mariage château de la Loire — 2 000 €' },
    description: {
      en: 'Eleven hours of continuous coverage, with access and interior-photography rules agreed with the estate in advance. €2,000, 450 frames within three weeks.',
      fr: 'Onze heures de couverture continue, accès et règles de prise de vue intérieure convenus avec le domaine en amont. 2 000 €, 450 images sous trois semaines.',
    },
    heading: { en: 'The estate decides more than you would expect', fr: 'Le domaine décide plus que vous ne le pensez' },
    paragraphs: {
      en: [
        'A château is not simply a large venue. Many are listed buildings, and the rules that come with that are settled by the estate rather than by you: which interiors may be photographed at all, whether tripods or additional lighting are permitted, where a photographer may stand during a ceremony held in a historic room, and what time the building closes regardless of what your contract says about the party.',
        'All of that is agreed with the estate in advance, in writing, before the schedule is drawn. It is the difference between a plan that survives contact with the day and one that collapses at four in the afternoon when somebody says the gallery is not open to photography.',
        'The other Loire particularity is light. Château interiors are frequently magnificent and very dark, with windows that are enormous and few. That decides when the formal photographs happen more than any preference does, and it is why the eleven hours are laid out around the building rather than around a template. Four hundred and fifty retouched photographs follow within three weeks.',
      ],
      fr: [
        'Un château n’est pas simplement un grand lieu de réception. Beaucoup sont classés, et les règles qui vont avec sont fixées par le domaine, pas par vous : quels intérieurs peuvent être photographiés, si le trépied ou un éclairage d’appoint sont admis, où le photographe peut se tenir pendant une cérémonie dans une salle historique, et à quelle heure le bâtiment ferme quoi que dise votre contrat sur la fête.',
        'Tout cela est convenu avec le domaine en amont, par écrit, avant que le déroulé ne soit tracé. C’est la différence entre un plan qui survit au contact du jour J et un plan qui s’effondre à seize heures quand on vous annonce que la galerie n’est pas ouverte à la prise de vue.',
        'L’autre particularité ligérienne est la lumière. Les intérieurs de château sont souvent magnifiques et très sombres, avec des fenêtres immenses et peu nombreuses. Cela décide de l’heure des photographies formelles bien plus que n’importe quelle préférence, et c’est pourquoi les onze heures s’organisent autour du bâtiment plutôt que sur un modèle. Quatre cent cinquante photographies suivent sous trois semaines.',
      ],
    },
  },

  'french-alps-elopement': {
    title: { en: 'French Alps Elopement Photographer — €950', fr: 'Photographe elopement Alpes françaises — 950 €' },
    description: {
      en: 'Five hours including the walk up and back, a weather call made together 48 hours ahead, and a second date held. €950, 180 frames, gallery in ten days.',
      fr: 'Cinq heures marche comprise, décision météo prise ensemble 48 h avant, et une seconde date réservée. 950 €, 180 images, galerie sous dix jours.',
    },
    heading: { en: 'A second date is held, and that is not optional', fr: 'Une seconde date est réservée, et ce n’est pas optionnel' },
    paragraphs: {
      en: [
        'Mountain weather does not respect a booking. The thing most people expect to ruin an Alpine session is cloud, and cloud is usually a gift — at altitude it diffuses light beautifully and turns a harsh midday into something workable. What actually moves a date is wind, which makes exposed ground unpleasant and sometimes unsafe, and which no forecast reads reliably more than two days out.',
        'So the weather call is made together, forty-eight hours ahead, and a second date is held from the moment you book rather than sought in a panic. That is why this session is priced as it is: the photographer is holding two days for you, not one.',
        'Five hours includes the walk up and back, which is worth saying plainly — a good part of the session is spent moving, and the photographs made on the way are frequently better than the ones made at the destination. Tell us your comfortable walking distance when you book and the spot is chosen to match it. A hundred and eighty retouched photographs arrive within ten days.',
      ],
      fr: [
        'La météo de montagne ne respecte pas une réservation. Ce que l’on croit être la menace d’une séance alpine, c’est le nuage — or le nuage est en général un cadeau : en altitude il diffuse superbement et transforme un midi dur en lumière exploitable. Ce qui déplace réellement une date, c’est le vent, qui rend le terrain exposé désagréable et parfois dangereux, et qu’aucune prévision ne lit correctement au-delà de deux jours.',
        'La décision météo se prend donc ensemble, quarante-huit heures avant, et une seconde date est réservée dès l’engagement plutôt que cherchée dans l’urgence. C’est ce qui explique le tarif : le photographe vous tient deux journées, pas une.',
        'Les cinq heures comprennent la montée et la descente, ce qu’il vaut mieux dire clairement — une bonne part de la séance se passe en marchant, et les images faites en chemin valent souvent mieux que celles faites à l’arrivée. Indiquez votre distance de marche confortable à la réservation et le lieu sera choisi en conséquence. Cent quatre-vingts photographies retouchées arrivent sous dix jours.',
      ],
    },
  },
};
