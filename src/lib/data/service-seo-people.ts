import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the portrait, couple and family services.
 *
 * Written against the catalogue figures — price, duration, photograph count,
 * deliverables — so a claim here can be checked against the card above it on
 * the page. Change one and change the other.
 */
export const PEOPLE_SERVICE_SEO: Record<string, ServiceSeo> = {
  portrait: {
    title: { en: 'Studio Portrait Photographer in France', fr: 'Portrait studio — photographe en France' },
    description: {
      en: 'A one-hour studio portrait in 22 French cities: two lighting set-ups, two backgrounds, 25 retouched frames chosen with you. €160, gallery in 48–72h.',
      fr: 'Portrait studio d’une heure dans 22 villes françaises : deux éclairages, deux fonds, 25 images retouchées choisies avec vous. 160 €, galerie en 48–72 h.',
    },
    heading: { en: 'A portrait is a decision, not a lottery', fr: 'Un portrait est une décision, pas un tirage' },
    paragraphs: {
      en: [
        'A studio session buys you control. The light does not change while you work, the background is whatever you decided it should be, and nothing outside the room can go wrong — which is why this is the session to book when the photograph has a job to do: a profile that has to look current, a press kit, a book, a company page where everyone must match.',
        'The hour is built around two lighting set-ups and two backgrounds, so you leave with more than one register rather than twenty-five versions of a single frame. Expect direction throughout. Almost nobody knows what to do with their hands, and being told is a relief rather than an imposition.',
        'The selection is made together at the end of the session, on screen, before you leave. That is deliberate: you see what was caught while you still remember the moment it was caught in, and you are not left choosing between thumbnails a week later. Twenty-five retouched photographs follow in a private gallery within 48 to 72 hours.',
      ],
      fr: [
        'Une séance en studio, c’est du contrôle. La lumière ne bouge pas pendant que vous travaillez, le fond est celui que vous avez choisi, et rien d’extérieur ne peut mal tourner — c’est donc la séance à réserver quand la photographie a une mission : un profil qui doit être à jour, un dossier de presse, un book, une page d’entreprise où tout le monde doit être homogène.',
        'L’heure s’organise autour de deux éclairages et de deux fonds : vous repartez avec plusieurs registres, pas avec vingt-cinq variantes d’une même image. La direction est constante. Presque personne ne sait quoi faire de ses mains, et se le faire dire est un soulagement plutôt qu’une contrainte.',
        'La sélection se fait ensemble en fin de séance, à l’écran, avant votre départ. C’est voulu : vous voyez les images tant que vous vous souvenez encore du moment, et vous n’avez pas à choisir entre des vignettes une semaine plus tard. Les vingt-cinq photographies retouchées suivent en galerie privée sous 48 à 72 heures.',
      ],
    },
  },

  'lifestyle-portrait': {
    title: { en: 'Lifestyle Portrait Session — Outdoors, 75 min', fr: 'Portrait lifestyle en extérieur — 75 minutes' },
    description: {
      en: 'The same portrait, made outdoors and in motion instead of against a background. Two locations on foot, 30 retouched frames, €170, gallery in 48–72 hours.',
      fr: 'Le même portrait, dehors et en mouvement plutôt que devant un fond. Deux lieux à pied, 30 images retouchées, 170 €, galerie sous 48 à 72 heures.',
    },
    heading: { en: 'When the room is the wrong answer', fr: 'Quand le studio est la mauvaise réponse' },
    paragraphs: {
      en: [
        'Some people photograph badly in a studio and well on a pavement. Standing still against a background asks you to perform stillness; walking, sitting on a step, turning because someone called your name — those give a photographer something real to catch, and they give you something to do other than face a lens.',
        'Seventy-five minutes covers two locations within walking distance of each other, chosen for the hour you book rather than for how they look in a guidebook. A courtyard that is beautiful at ten is a dark well at four, and the photographer has usually stood in both.',
        'This is the session for a personal site, an author photograph, a profile that should not look like a badge, or simply for having a decent photograph of yourself for the first time in a decade. Thirty retouched photographs arrive in a private gallery within 48 to 72 hours.',
      ],
      fr: [
        'Certaines personnes se photographient mal en studio et très bien sur un trottoir. Rester immobile devant un fond, c’est jouer l’immobilité ; marcher, s’asseoir sur une marche, se retourner parce qu’on vous appelle — voilà qui donne au photographe quelque chose de vrai à saisir, et à vous autre chose à faire que d’affronter un objectif.',
        'Soixante-quinze minutes couvrent deux lieux accessibles à pied l’un de l’autre, choisis pour l’heure réservée et non pour leur allure dans un guide. Une cour magnifique à dix heures devient un puits sombre à seize, et le photographe s’est en général tenu dans les deux.',
        'C’est la séance pour un site personnel, une photo d’auteur, un profil qui ne doit pas ressembler à un badge, ou simplement pour avoir enfin une image correcte de soi après dix ans. Trente photographies retouchées arrivent en galerie privée sous 48 à 72 heures.',
      ],
    },
  },

  'book-comedien': {
    title: { en: 'Actor Headshots in France — Casting Formats', fr: 'Book comédien en France — formats casting' },
    description: {
      en: 'Actor headshots in the three registers casting asks for, delivered in the formats agencies and platforms require. €290, 40 retouched frames, gallery in a week.',
      fr: 'Book comédien dans les trois registres attendus au casting, livré aux formats exigés par les agences et plateformes. 290 €, 40 images, galerie en une semaine.',
    },
    heading: { en: 'What a casting director is actually looking for', fr: 'Ce que cherche vraiment un directeur de casting' },
    paragraphs: {
      en: [
        'A book that shows one face in one mood gets you seen for one kind of part. The session is two and a half hours precisely so it can cover three registers — neutral on a plain background, something warmer, something with an edge — because the person reading your file is trying to work out what range you have, not whether you photograph well.',
        'The neutral frames are shot against a clean background, the rest outdoors, and the change of setting does more than vary the picture: it changes how you hold yourself, which is the thing that reads. Forty retouched photographs is enough to build a book without padding it.',
        'Everything is delivered in the crops agencies and casting platforms ask for, which sounds like a detail until a submission is rejected for a wrong aspect ratio. The gallery arrives within a week — longer than our other sessions, because retouching a face that has to stay recognisably yours is slower than retouching a landscape.',
      ],
      fr: [
        'Un book qui montre un seul visage dans une seule humeur vous fait voir pour un seul type de rôle. La séance dure deux heures trente précisément pour couvrir trois registres — neutre sur fond uni, plus chaleureux, plus tendu — parce que la personne qui lit votre dossier cherche votre palette, pas votre photogénie.',
        'Les images neutres sont prises sur fond propre, le reste en extérieur, et le changement de décor fait plus que varier l’image : il change votre maintien, et c’est cela qui se lit. Quarante photographies retouchées suffisent à construire un book sans le remplir.',
        'Tout est livré aux formats demandés par les agences et les plateformes de casting — un détail, jusqu’au jour où une candidature est refusée pour un mauvais ratio. La galerie arrive sous une semaine : plus long que nos autres séances, car retoucher un visage qui doit rester reconnaissable prend plus de temps qu’un paysage.',
      ],
    },
  },

  couple: {
    title: { en: 'Couple Photo Session in France — From €190', fr: 'Séance photo couple en France — dès 190 €' },
    description: {
      en: 'Ninety minutes on foot in 22 French cities, on a route scouted for the hour you book. Direction throughout, 40 retouched frames, private gallery in 48–72h.',
      fr: 'Quatre-vingt-dix minutes à pied dans 22 villes françaises, sur un parcours repéré pour votre heure. Direction constante, 40 images, galerie en 48–72 h.',
    },
    heading: { en: 'Nobody is left to pose themselves', fr: 'Personne n’est laissé à se poser seul' },
    paragraphs: {
      en: [
        'The commonest way a couple session goes wrong is silence: a photographer who says "just be natural" and then waits. Ninety minutes of that produces forty photographs of two people wondering what to do with their arms. Direction runs throughout this session — where to walk, where to stop, what to say to each other — and the results look unposed precisely because they were directed.',
        'The route is scouted for the time of day you book rather than picked off a list. Light moves, crowds move, and a square that is empty and golden at eight is a car park with tourists in it at eleven. Ninety minutes on foot covers enough ground for several backdrops without anyone getting into a car.',
        'It works as well for two people who have been together twenty years as for an engagement or an anniversary, and the same session is what most people book before a wedding to get used to being photographed. Forty retouched photographs arrive in a private gallery within 48 to 72 hours.',
      ],
      fr: [
        'La façon la plus courante de rater une séance couple, c’est le silence : un photographe qui dit « soyez naturels » puis attend. Quatre-vingt-dix minutes de cela donnent quarante photographies de deux personnes qui se demandent quoi faire de leurs bras. Ici la direction est constante — où marcher, où s’arrêter, quoi se dire — et le résultat paraît spontané précisément parce qu’il a été dirigé.',
        'Le parcours est repéré pour l’heure que vous réservez, pas choisi sur une liste. La lumière se déplace, la foule aussi, et une place vide et dorée à huit heures devient un parking à touristes à onze. Quatre-vingt-dix minutes à pied couvrent assez de terrain pour plusieurs décors sans monter en voiture.',
        'Cela fonctionne aussi bien pour deux personnes ensemble depuis vingt ans que pour des fiançailles ou un anniversaire, et c’est la séance que la plupart réservent avant un mariage pour s’habituer à être photographiés. Quarante photographies retouchées arrivent en galerie privée sous 48 à 72 heures.',
      ],
    },
  },

  proposal: {
    title: { en: 'Proposal Photographer in France — Discreet', fr: 'Photographe demande en mariage — discret' },
    description: {
      en: 'Your proposal photographed from a distance on a long lens, then a short couple session once the answer is yes. €250, 35 retouched frames, 22 cities.',
      fr: 'Votre demande photographiée de loin au téléobjectif, puis une courte séance couple une fois le oui prononcé. 250 €, 35 images retouchées, 22 villes.',
    },
    heading: { en: 'The whole job is not being noticed', fr: 'Tout le métier consiste à ne pas être vu' },
    paragraphs: {
      en: [
        'A proposal is photographed once. There is no second take, the light is whatever it is, and the person being asked must not spot a photographer beforehand — which is why most of the work happens before anyone arrives. The exact spot is agreed in advance, along with the angle you will approach from and where you will stand, so the camera is already in position and already far away.',
        'The moment itself is covered on a long lens from a distance, usually from somewhere neither of you would think to look. That is the difference between photographs of a proposal and photographs of a couple being watched by a stranger with a camera.',
        'Once the answer is yes, the photographer comes over and the session turns into a short couple shoot on the spot — the fifteen minutes afterwards, when neither of you has quite come down, are usually the best frames of the day. Thirty-five retouched photographs follow in a private gallery.',
      ],
      fr: [
        'Une demande en mariage se photographie une fois. Pas de seconde prise, la lumière est ce qu’elle est, et la personne à qui l’on demande ne doit pas repérer de photographe — d’où l’essentiel du travail avant l’arrivée de quiconque. Le lieu exact est convenu à l’avance, avec l’angle d’approche et l’endroit où vous vous tiendrez, pour que l’appareil soit déjà en place et déjà loin.',
        'Le moment lui-même est couvert au téléobjectif, à distance, en général depuis un endroit où ni l’un ni l’autre ne penserait à regarder. C’est toute la différence entre des photographies d’une demande et des photographies d’un couple observé par un inconnu avec un appareil.',
        'Une fois le oui prononcé, le photographe se présente et la séance devient une courte séance couple sur place — le quart d’heure qui suit, quand aucun des deux n’est vraiment redescendu, donne d’ordinaire les meilleures images de la journée. Trente-cinq photographies retouchées suivent en galerie privée.',
      ],
    },
  },

  engagement: {
    title: { en: 'Engagement Photos in France — Save-the-Dates', fr: 'Séance engagement en France — faire-part' },
    description: {
      en: 'Ninety minutes across two locations, with frames sized for save-the-dates and the wedding site. €220, 45 retouched photographs, gallery in 48–72 hours.',
      fr: 'Quatre-vingt-dix minutes sur deux lieux, avec des images au format faire-part et site de mariage. 220 €, 45 photographies retouchées, galerie en 48–72 h.',
    },
    heading: { en: 'A rehearsal that happens to produce your save-the-date', fr: 'Une répétition qui produit votre faire-part' },
    paragraphs: {
      en: [
        'Most couples have never been photographed together on purpose before their wedding day, and it shows in the first hour of the wedding gallery. An engagement session is the fix: ninety minutes of being directed, well before the day that matters, so that by the time it does matter the camera has stopped being an event.',
        'Two locations, chosen for the hour and close enough to walk between, give the session more than one look. Forty-five retouched photographs is a deliberate number — enough to choose a save-the-date from, enough to fill a wedding website, and not so many that choosing becomes a chore.',
        'The frames come sized for the things they are actually for: a card that has to crop to a rectangle, a site header that has to crop to a strip. It is the sort of detail nobody thinks about until a printer asks for it. The private gallery arrives within 48 to 72 hours.',
      ],
      fr: [
        'La plupart des couples n’ont jamais été photographiés ensemble volontairement avant leur mariage, et cela se voit dans la première heure de la galerie. La séance d’engagement corrige cela : quatre-vingt-dix minutes de direction, bien avant le jour qui compte, pour qu’à ce moment-là l’appareil ait cessé d’être un événement.',
        'Deux lieux, choisis pour l’heure et assez proches pour être reliés à pied, donnent plusieurs ambiances à la séance. Quarante-cinq photographies retouchées est un nombre voulu : assez pour choisir un faire-part, assez pour remplir un site de mariage, pas assez pour que choisir devienne une corvée.',
        'Les images sont livrées aux formats de leur usage réel : une carte qui doit se recadrer en rectangle, une bannière de site qui doit se recadrer en bandeau. Le genre de détail auquel personne ne pense avant qu’un imprimeur ne le demande. La galerie privée arrive sous 48 à 72 heures.',
      ],
    },
  },

  'riviera-honeymoon': {
    title: { en: 'Riviera Honeymoon Session — The Sunset Hour', fr: 'Séance lune de miel Riviera — heure dorée' },
    description: {
      en: 'Two hours between the old town and the water on the French Riviera, timed to the end of the day when the sea goes flat. €260, 55 frames, gallery in 48h.',
      fr: 'Deux heures entre vieille ville et bord de mer sur la Côte d’Azur, calées en fin de journée quand la mer s’aplatit. 260 €, 55 images, galerie en 48 h.',
    },
    heading: { en: 'Why this one is booked for the last two hours', fr: 'Pourquoi celle-ci se réserve aux deux dernières heures' },
    paragraphs: {
      en: [
        'The Mediterranean does something at the end of the day that it does at no other hour: the wind drops, the surface goes flat, and the water stops being a bright distraction and becomes a mirror. Every other rule on this site says shoot at sunrise. This session says the opposite, and it is booked for the last two hours of light for that reason alone.',
        'The route runs from the old town down to the water, which gives you two entirely different backdrops without a transfer: warm stone and shuttered façades on one side, open sea on the other. Two hours is enough to work both properly rather than rushing one.',
        'It suits honeymoons, anniversaries and the trip taken instead of a wedding. Fifty-five retouched photographs — the largest count of any of our couple sessions, because two hours in good light produces more keepers than ninety minutes in ordinary light — arrive in a private gallery within 48 hours, downloadable from any country.',
      ],
      fr: [
        'La Méditerranée fait en fin de journée ce qu’elle ne fait à aucune autre heure : le vent tombe, la surface s’aplatit, et l’eau cesse d’être une distraction éclatante pour devenir un miroir. Toutes les autres règles de ce site disent de photographier à l’aube. Celle-ci dit l’inverse, et c’est pour cela qu’elle se réserve sur les deux dernières heures de lumière.',
        'Le parcours descend de la vieille ville jusqu’à l’eau, ce qui donne deux décors entièrement différents sans transfert : pierre chaude et façades à volets d’un côté, mer ouverte de l’autre. Deux heures suffisent à travailler les deux correctement plutôt qu’à en bâcler un.',
        'Cela convient aux lunes de miel, aux anniversaires et au voyage fait à la place d’un mariage. Cinquante-cinq photographies retouchées — le plus grand nombre de nos séances couple, car deux heures de belle lumière donnent plus d’images gardées que quatre-vingt-dix minutes de lumière ordinaire — arrivent en galerie privée sous 48 heures.',
      ],
    },
  },

  family: {
    title: { en: 'Family Photographer in France — From €200', fr: 'Photographe famille en France — dès 200 €' },
    description: {
      en: 'An outdoor family session paced around the youngest person in it, on a location chosen for prams, shade and a way out. €200, 40 frames, 22 cities.',
      fr: 'Séance famille en extérieur au rythme du plus jeune, sur un lieu choisi pour poussettes, ombre et sortie rapide. 200 €, 40 images, 22 villes.',
    },
    heading: { en: 'The session runs at the youngest person’s pace', fr: 'La séance suit le rythme du plus jeune' },
    paragraphs: {
      en: [
        'A family session is not a portrait session with more people in it. It is seventy-five minutes governed entirely by whoever is smallest, and everything else — the order of the frames, when the group shot happens, how long anyone is asked to stand still — bends around that. Photographers who fight it get one good photograph and an hour of tears.',
        'The location is chosen on practical grounds before aesthetic ones: can a pram get there, is there shade when the sun is high, and is there a way out within two minutes if it all goes wrong. Those three questions rule out most of the picturesque spots people suggest, and they are the reason the session usually works.',
        'Group frames and loose ones come in whatever order the children allow, which in practice means the posed photograph is taken early, while patience lasts, and the rest of the time is spent letting them be themselves. Forty retouched photographs arrive in a private gallery within 48 to 72 hours.',
      ],
      fr: [
        'Une séance famille n’est pas une séance portrait avec plus de monde. C’est soixante-quinze minutes entièrement gouvernées par le plus petit, et tout le reste — l’ordre des images, le moment de la photo de groupe, la durée d’immobilité demandée — s’y plie. Les photographes qui résistent obtiennent une bonne image et une heure de larmes.',
        'Le lieu est choisi sur des critères pratiques avant les critères esthétiques : une poussette peut-elle y accéder, y a-t-il de l’ombre quand le soleil est haut, et peut-on repartir en deux minutes si tout tourne mal. Ces trois questions éliminent la plupart des endroits pittoresques proposés, et c’est pour cela que la séance fonctionne.',
        'Images de groupe et images libres viennent dans l’ordre que les enfants autorisent, ce qui signifie en pratique que la photo posée est prise tôt, tant que la patience tient, et que le reste du temps les laisse être eux-mêmes. Quarante photographies retouchées arrivent en galerie privée sous 48 à 72 heures.',
      ],
    },
  },

  newborn: {
    title: { en: 'Newborn Photographer in France — At Home', fr: 'Photographe nouveau-né en France — à domicile' },
    description: {
      en: 'At your home, in window light, in the first weeks — two hours booked so feeding and changing are never a problem. €230, 30 retouched photographs.',
      fr: 'Chez vous, à la lumière de la fenêtre, dans les premières semaines — deux heures réservées pour que tétée et change ne posent jamais problème. 230 €, 30 images.',
    },
    heading: { en: 'Two hours booked to use maybe forty minutes', fr: 'Deux heures réservées pour en utiliser quarante minutes' },
    paragraphs: {
      en: [
        'The session is two hours long and the camera is not out for most of it. A newborn feeds, is changed, sleeps and wakes on a schedule nobody controls, and the only way to photograph that honestly is to book enough time that none of it is an interruption. Sessions sold as forty-five minutes are the reason so many parents remember the day as stressful.',
        'It happens at your home rather than in a studio, using window light only — no flash, no lamps, nothing that needs to be carried in and set up around a sleeping baby. Your home also happens to be the setting the photographs will mean something in twenty years from now.',
        'The first weeks are the window. Newborns curl and sleep deeply for a short period and then stop doing both, so the session is best booked before the birth and confirmed once you are home. Thirty retouched photographs arrive in a private gallery within 48 to 72 hours.',
      ],
      fr: [
        'La séance dure deux heures et l’appareil reste rangé une bonne partie du temps. Un nouveau-né tète, se fait changer, dort et se réveille selon un horaire que personne ne maîtrise, et la seule façon de photographier cela honnêtement est de réserver assez de temps pour que rien ne soit une interruption. Les séances vendues quarante-cinq minutes expliquent pourquoi tant de parents gardent le souvenir d’une journée tendue.',
        'Cela se passe chez vous plutôt qu’en studio, à la seule lumière de la fenêtre — pas de flash, pas de lampes, rien à transporter et installer autour d’un bébé qui dort. Votre domicile est d’ailleurs le décor dans lequel ces images auront un sens dans vingt ans.',
        'Les premières semaines sont la fenêtre de tir. Les nouveau-nés se recroquevillent et dorment profondément un court moment, puis cessent de faire les deux : la séance se réserve donc avant la naissance et se confirme au retour à la maison. Trente photographies retouchées arrivent en galerie privée sous 48 à 72 heures.',
      ],
    },
  },

  maternity: {
    title: { en: 'Maternity Photo Session in France — From €190', fr: 'Séance photo grossesse en France — dès 190 €' },
    description: {
      en: 'Indoors or outdoors, your choice, with your partner and older children included at no extra cost. €190, 35 retouched frames, gallery in 48–72 hours.',
      fr: 'En intérieur ou en extérieur, à votre choix, avec conjoint et aînés inclus sans supplément. 190 €, 35 images retouchées, galerie sous 48 à 72 heures.',
    },
    heading: { en: 'Booked for a fortnight, not a date', fr: 'Se réserve sur quinze jours, pas sur une date' },
    paragraphs: {
      en: [
        'The usual window is between about twenty-eight and thirty-four weeks — late enough to be visible, early enough to be comfortable standing for an hour. Beyond that, comfort falls away quickly, and a session booked for a single fixed date three months out often lands in the wrong week. Book a fortnight and settle the day nearer the time.',
        'Indoors or outdoors is genuinely your choice rather than ours. At home in window light is quieter, needs no travel and suits anyone who does not want to be photographed in public while pregnant; outdoors gives more variety and more space. Both are the same price and the same seventy-five minutes.',
        'A partner and older children are included, not charged as extras — a maternity session is frequently the last photograph of a family at the size it currently is, and pricing that as an add-on has always struck us as absurd. Thirty-five retouched photographs arrive within 48 to 72 hours.',
      ],
      fr: [
        'La fenêtre habituelle se situe entre vingt-huit et trente-quatre semaines environ — assez tard pour être visible, assez tôt pour rester à l’aise debout une heure. Au-delà, le confort chute vite, et une séance fixée à une date précise trois mois à l’avance tombe souvent sur la mauvaise semaine. Réservez une quinzaine et arrêtez le jour à l’approche.',
        'Intérieur ou extérieur relève vraiment de votre choix, pas du nôtre. Chez vous à la lumière de la fenêtre, c’est plus calme, sans déplacement, et cela convient à qui ne souhaite pas être photographiée enceinte en public ; l’extérieur donne plus de variété et d’espace. Même tarif, mêmes soixante-quinze minutes.',
        'Le conjoint et les aînés sont inclus, pas facturés en supplément — une séance grossesse est souvent la dernière photographie d’une famille à sa taille du moment, et en faire une option nous a toujours paru absurde. Trente-cinq photographies retouchées arrivent sous 48 à 72 heures.',
      ],
    },
  },

  christening: {
    title: { en: 'Christening Photographer in France — 3 Hours', fr: 'Photographe de baptême en France — 3 heures' },
    description: {
      en: 'Three hours covering the ceremony and the gathering afterwards, with a group portrait of the whole family. €320, 80 retouched frames, gallery in 72 hours.',
      fr: 'Trois heures couvrant la cérémonie et la réception qui suit, avec un portrait de groupe de toute la famille. 320 €, 80 images, galerie sous 72 heures.',
    },
    heading: { en: 'Ask the parish before you book anything', fr: 'Interrogez la paroisse avant de réserver quoi que ce soit' },
    paragraphs: {
      en: [
        'Rules on photography during the rite are set by the parish and vary considerably: some allow free movement, some restrict you to the back, some ask that nothing be taken during specific moments. The photographer contacts the church beforehand rather than discovering the rule mid-ceremony, and adjusts the plan accordingly.',
        'Three hours covers the ceremony and the gathering afterwards, because the second half is where most of the photographs people actually keep are made — the ceremony is formal and short, the lunch is where the family is. Eighty retouched photographs reflect that split.',
        'The group portrait of the whole family is arranged deliberately, usually straight after the ceremony while everyone is still in one place and still dressed. Leave it until later and half the guests have gone. The private gallery follows within 72 hours, ready to share with the family who could not attend.',
      ],
      fr: [
        'Les règles de prise de vue pendant le rite sont fixées par la paroisse et varient beaucoup : certaines autorisent la libre circulation, d’autres cantonnent au fond, d’autres demandent que rien ne soit pris à certains moments. Le photographe contacte l’église en amont plutôt que de découvrir la règle en pleine cérémonie, et adapte le plan.',
        'Trois heures couvrent la cérémonie et la réception qui suit, car c’est dans la seconde moitié que se font la plupart des photographies réellement conservées — la cérémonie est formelle et courte, le déjeuner est là où se trouve la famille. Les quatre-vingts photographies retouchées reflètent ce partage.',
        'Le portrait de groupe de toute la famille est organisé délibérément, en général juste après la cérémonie, quand tout le monde est encore réuni et encore habillé. Repoussez-le et la moitié des invités sera partie. La galerie privée suit sous 72 heures, prête à être partagée avec les absents.',
      ],
    },
  },

  'seance-photo-anniversaire': {
    title: { en: 'Birthday Party Photographer in France', fr: 'Photographe d’anniversaire en France' },
    description: {
      en: 'Two hours of coverage at a birthday — the room, the guests, the moment with the cake. €210, 60 retouched photographs, private gallery in 48–72 hours.',
      fr: 'Deux heures de couverture d’un anniversaire — la salle, les invités, le moment du gâteau. 210 €, 60 photographies retouchées, galerie en 48–72 h.',
    },
    heading: { en: 'Somebody other than the host holding the camera', fr: 'Quelqu’un d’autre que l’hôte tient l’appareil' },
    paragraphs: {
      en: [
        'At almost every birthday the person who organised it ends up photographing it, which means the one person who should be in the pictures is in none of them. Two hours of coverage fixes that, and costs less than most people spend on the catering.',
        'The coverage is built around the fixed points — arrivals, the toast, the cake, whatever has been planned as the moment — with the rest of the time spent on the guests rather than on decorations. Sixty retouched photographs across two hours is roughly one every two minutes, which is coverage rather than a highlights reel.',
        'It works for a child’s party, a fiftieth, or a surprise where the photographer needs to be in position before the guest of honour arrives. Tell us which of those it is when you book, because the three are planned very differently. The private gallery arrives within 48 to 72 hours.',
      ],
      fr: [
        'À presque chaque anniversaire, la personne qui l’a organisé finit par le photographier, ce qui fait que la seule personne qui devrait être sur les images n’y est sur aucune. Deux heures de couverture règlent cela, pour moins que le budget traiteur de la plupart des gens.',
        'La couverture s’articule sur les points fixes — arrivées, toast, gâteau, ce qui a été prévu comme moment — le reste du temps allant aux invités plutôt qu’à la décoration. Soixante photographies retouchées sur deux heures, c’est environ une toutes les deux minutes : de la couverture, pas un condensé.',
        'Cela vaut pour une fête d’enfant, un cinquantième, ou une surprise où le photographe doit être en place avant l’arrivée de l’intéressé. Précisez lequel des trois à la réservation, car ils se préparent très différemment. La galerie privée arrive sous 48 à 72 heures.',
      ],
    },
  },
};
