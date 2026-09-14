import type { Localized } from '../locales';

/**
 * Authored copy for the `service × city` combinations that carry real demand.
 *
 * There are 125 curated leaves. Writing all of them by hand is a different
 * project; writing the twenty that people actually search for is an afternoon,
 * and those twenty are where the money is — weddings where the venues are,
 * corporate work where the offices are, proposals and honeymoons where people
 * travel to. Everything else composes from the city and service data in
 * `content.ts`, which since the rewrite varies by lede, spots, permits and
 * deliverables rather than by two proper nouns.
 *
 * Keyed `${service.slug}--${city.slug}` on canonical slugs, never localized
 * ones, so a French URL change cannot orphan an entry.
 */
export interface LeafSeo {
  /** Brand included, ≤60 chars. */
  title: Localized;
  /** 150–160 chars. */
  description: Localized;
  /** Replaces the composed opening paragraph. Says why *this* pairing. */
  angle: Localized;
}

export const LEAF_SEO: Record<string, LeafSeo> = {
  'wedding--paris': {
    title: { en: 'Wedding Photographer in Paris | Ylala', fr: 'Photographe de mariage à Paris | Ylala' },
    description: {
      en: 'A Paris wedding is a logistics problem before it is a photographic one. Ten hours of coverage, the venue and the traffic planned around. From €1,600.',
      fr: 'Un mariage parisien est d’abord un problème logistique. Dix heures de couverture, le lieu et la circulation anticipés. À partir de 1 600 €.',
    },
    angle: {
      en: 'A Paris wedding is a logistics problem before it is a photographic one. The distance between the mairie, the church and the reception is rarely walkable, the traffic between them is not predictable, and the twenty minutes lost in a car are twenty minutes taken from the only part of the day nobody can reshoot. A photographer who works here plans the couple portraits around a location within walking distance of where you already are, rather than around the view they would prefer.',
      fr: 'Un mariage parisien est d’abord un problème logistique, ensuite un problème photographique. La distance entre la mairie, l’église et la réception se fait rarement à pied, la circulation entre les deux n’est pas prévisible, et les vingt minutes perdues en voiture sont prises sur la seule partie de la journée que personne ne peut refaire. Un photographe qui travaille ici cale les portraits de couple sur un lieu accessible à pied depuis là où vous êtes déjà, plutôt que sur la vue qu’il préférerait.',
    },
  },

  'proposal--paris': {
    title: { en: 'Proposal Photographer in Paris | Ylala', fr: 'Photographe demande en mariage Paris | Ylala' },
    description: {
      en: 'Photographed from a distance on a long lens, at the hour the Trocadéro is still empty. Scouted in advance, then a short couple session. €250, 35 frames.',
      fr: 'Photographiée de loin au téléobjectif, à l’heure où le Trocadéro est encore vide. Repérage en amont, puis courte séance couple. 250 €, 35 images.',
    },
    angle: {
      en: 'Paris is the most proposed-in city in the world and that is exactly the difficulty: at the Trocadéro after nine in the morning there are already four other people on one knee and a hundred phones pointed at them. The scouting therefore settles two things — the hour, which is early, and the exact spot, which is usually a few metres from the obvious one. Photographed on a long lens from somewhere neither of you would think to look, so the moment stays yours.',
      fr: 'Paris est la ville où l’on demande le plus en mariage au monde, et c’est précisément la difficulté : au Trocadéro passé neuf heures, il y a déjà quatre autres personnes à genoux et cent téléphones braqués dessus. Le repérage règle donc deux choses — l’heure, tôt, et l’endroit exact, en général à quelques mètres de l’évident. Photographié au téléobjectif depuis un point où ni l’un ni l’autre ne penserait à regarder, pour que le moment reste le vôtre.',
    },
  },

  'couple--paris': {
    title: { en: 'Couple Photo Session in Paris | Ylala', fr: 'Séance photo couple à Paris | Ylala' },
    description: {
      en: 'Ninety minutes on foot from the Île Saint-Louis, booked before nine when the quays are still yours. €190, 40 retouched frames, gallery in 48–72 hours.',
      fr: 'Quatre-vingt-dix minutes à pied depuis l’île Saint-Louis, avant neuf heures quand les quais sont encore à vous. 190 €, 40 images retouchées.',
    },
    angle: {
      en: 'Everything in Paris is a question of hours rather than places. The Île Saint-Louis is five hundred metres long with one central street and an architecture that does not change from end to end, which makes it the most efficient couple session in the city — twenty minutes of walking gives you frames that visibly belong to one series. At half past six it is yours. At ten it is a queue.',
      fr: 'Tout se joue à Paris sur l’heure, pas sur le lieu. L’île Saint-Louis fait cinq cents mètres de long, avec une seule rue centrale et une architecture qui ne change pas d’un bout à l’autre : c’est la séance couple la plus efficace de la ville — vingt minutes de marche donnent des images qui appartiennent visiblement à une même série. À six heures et demie elle est à vous. À dix heures, c’est une file d’attente.',
    },
  },

  'headshots--paris': {
    title: { en: 'Corporate Headshots in Paris | Ylala', fr: 'Photo corporate LinkedIn à Paris | Ylala' },
    description: {
      en: 'A team shot on your premises in one visit, one lighting set-up, so the whole page matches. €150 a head, 8 retouched frames each, square and 16:9 crops.',
      fr: 'Une équipe photographiée chez vous en une visite, un seul éclairage, pour une page homogène. 150 € par personne, 8 images, formats carré et 16:9.',
    },
    angle: {
      en: 'Paris offices are the reason this session travels rather than asking a team to come to a studio: moving twenty people across the city for thirty minutes each costs more in their time than the photography costs at all. The set-up fits in a meeting room with one window, runs at thirty minutes a head, and produces one consistent set — which is the whole deliverable, because a team page fails on mismatch long before it fails on quality.',
      fr: 'Les bureaux parisiens expliquent pourquoi cette séance se déplace au lieu de faire venir une équipe en studio : déplacer vingt personnes à travers la ville pour trente minutes chacune coûte, en temps de travail, plus cher que la photographie elle-même. L’installation tient dans une salle de réunion avec une fenêtre, tourne à trente minutes par personne, et produit une série homogène — c’est tout le livrable, car une page équipe échoue sur l’hétérogénéité bien avant d’échouer sur la qualité.',
    },
  },

  'family--paris': {
    title: { en: 'Family Photographer in Paris | Ylala', fr: 'Photographe famille à Paris | Ylala' },
    description: {
      en: 'A family session paced around the youngest, in a Paris park chosen for prams, shade and a quick way out. €200, 40 retouched frames, gallery in 48–72h.',
      fr: 'Séance famille au rythme du plus jeune, dans un parc parisien choisi pour poussettes, ombre et sortie rapide. 200 €, 40 images retouchées.',
    },
    angle: {
      en: 'The Paris landmarks make poor family sessions and the parks make excellent ones, for reasons that have nothing to do with beauty: a pram can get in, there is shade when the sun is high, and you can be out in two minutes when it stops being fun. The Luxembourg gardens and the Buttes-Chaumont both work; the Trocadéro with a three-year-old at eleven in the morning does not, whatever the photograph would have looked like.',
      fr: 'Les monuments parisiens font de mauvaises séances famille et les parcs d’excellentes, pour des raisons sans rapport avec la beauté : une poussette y accède, il y a de l’ombre quand le soleil est haut, et l’on peut repartir en deux minutes quand ce n’est plus drôle. Le Luxembourg et les Buttes-Chaumont fonctionnent ; le Trocadéro avec un enfant de trois ans à onze heures, non, quelle qu’eût été l’image.',
    },
  },

  'eiffel-tower-session--paris': {
    title: { en: 'Eiffel Tower Photo Session, Paris | Ylala', fr: 'Séance photo tour Eiffel à Paris | Ylala' },
    description: {
      en: 'The tower from the four places it actually works, on foot, at sunrise. By nine the crowd has taken every angle. €240, 45 frames, gallery in 48 hours.',
      fr: 'La tour depuis les quatre endroits qui fonctionnent, à pied, au lever du soleil. À neuf heures la foule occupe tous les angles. 240 €, 45 images.',
    },
    angle: {
      en: 'Standing underneath the Eiffel Tower produces a photograph of iron girders; it needs distance and an angle to read as itself. There are about four positions within walking distance where it genuinely works — the Trocadéro terrace, the Bir-Hakeim bridge, a street that frames it between two buildings, and the Champ de Mars from far enough back. Ninety minutes covers all four, and only before nine, because after that each one has its own queue.',
      fr: 'Se tenir sous la tour Eiffel produit une photographie de poutrelles ; il lui faut de la distance et un angle pour se lire. Il existe environ quatre positions accessibles à pied où cela fonctionne vraiment — la terrasse du Trocadéro, le pont de Bir-Hakeim, une rue qui la cadre entre deux immeubles, et le Champ-de-Mars depuis assez loin. Quatre-vingt-dix minutes couvrent les quatre, et seulement avant neuf heures : après, chacune a sa file.',
    },
  },

  'paris-photoshoot--paris': {
    title: { en: 'Paris Photoshoot — One Morning | Ylala', fr: 'Paris photoshoot — une matinée | Ylala' },
    description: {
      en: 'For two days in Paris and one morning to spare: two or three quarters on foot at first light, done before the cafés open. €220, 45 frames, gallery in 48h.',
      fr: 'Pour deux jours à Paris et une matinée : deux ou trois quartiers à pied au lever du jour, fini avant l’ouverture des cafés. 220 €, 45 images.',
    },
    angle: {
      en: 'This is the session for someone who has two days in the city and does not want to spend one of them being photographed. Ninety minutes at first light covers two or three quarters on foot — Île Saint-Louis to the Marais, or Montmartre before the funicular starts — and it is finished before most cafés open, which leaves your actual day intact. Paris rewards the streets between the landmarks far more than the landmarks themselves.',
      fr: 'C’est la séance pour qui a deux jours en ville et ne veut pas en consacrer un à se faire photographier. Quatre-vingt-dix minutes au lever du jour couvrent deux ou trois quartiers à pied — de l’île Saint-Louis au Marais, ou Montmartre avant le démarrage du funiculaire — et tout est fini avant l’ouverture de la plupart des cafés, ce qui laisse votre journée intacte. Paris récompense les rues entre les monuments bien plus que les monuments.',
    },
  },

  'headshots--lyon': {
    title: { en: 'Corporate Headshots in Lyon | Ylala', fr: 'Photo corporate LinkedIn à Lyon | Ylala' },
    description: {
      en: 'Most of what we photograph in Lyon happens indoors on somebody else’s schedule. One visit, one set-up, 8 retouched frames a head. €150 per person.',
      fr: 'L’essentiel de ce que nous photographions à Lyon se passe en intérieur, sur l’agenda d’un autre. Une visite, un éclairage, 8 images par personne. 150 €.',
    },
    angle: {
      en: 'More of what we photograph in Lyon happens indoors, in a meeting room, on a schedule somebody else set — that is the honest shape of the demand here, and it is why this is the most-booked session in the city. Part-Dieu and Confluence run on quarterly cycles, and headshot days tend to land when a team page or a funding announcement forces one. Book the room for the day rather than the hour; thirty minutes a head adds up faster than people expect.',
      fr: 'L’essentiel de ce que nous photographions à Lyon se passe en intérieur, dans une salle de réunion, sur un horaire fixé par quelqu’un d’autre — c’est la forme honnête de la demande ici, et c’est pourquoi c’est la séance la plus réservée de la ville. Part-Dieu et Confluence fonctionnent par cycles trimestriels, et les journées portraits tombent quand une page équipe ou une annonce de levée l’impose. Réservez la salle à la journée plutôt qu’à l’heure : trente minutes par personne s’additionnent plus vite qu’on ne le croit.',
    },
  },

  'corporate-event--lyon': {
    title: { en: 'Corporate Event Photographer, Lyon | Ylala', fr: 'Photographe événement d’entreprise Lyon | Ylala' },
    description: {
      en: 'Four hours of coverage with a selection sent the same evening for press and social, full gallery in 72 hours. €450, 150 retouched photographs.',
      fr: 'Quatre heures de couverture, sélection envoyée le soir même pour la presse et les réseaux, galerie complète sous 72 h. 450 €, 150 images.',
    },
    angle: {
      en: 'Lyon runs a serious congress calendar, and a conference photographed beautifully and delivered a week later has missed the only window that mattered. The first selection goes out the same evening, while the hashtag is still moving. The rooms themselves are the hardest lighting we work in — a lit stage against a dark hall, mixed colour temperatures, screens fighting every exposure — which is a reason to book someone who has covered one before.',
      fr: 'Lyon tient un vrai calendrier de congrès, et une conférence magnifiquement photographiée mais livrée une semaine plus tard a raté la seule fenêtre qui comptait. La première sélection part le soir même, tant que le hashtag tourne encore. Les salles offrent l’éclairage le plus difficile que nous rencontrions — scène éclairée dans un hall sombre, températures de couleur mélangées, écrans qui contrarient toute exposition — raison de plus pour réserver quelqu’un qui en a déjà couvert.',
    },
  },

  'wedding--lyon': {
    title: { en: 'Wedding Photographer in Lyon | Ylala', fr: 'Photographe de mariage à Lyon | Ylala' },
    description: {
      en: 'Ten hours of coverage across two rivers and a hill, with the venue contacted beforehand about access and timings. €1,600, 400 frames in three weeks.',
      fr: 'Dix heures de couverture entre deux fleuves et une colline, le lieu contacté en amont sur les accès et le déroulé. 1 600 €, 400 images.',
    },
    angle: {
      en: 'Lyon weddings are shaped by geography: two rivers, a hill, and a old town whose streets are too narrow for a coach. Where the group portrait happens is decided by where the cars can stop, not by which quay looks best, and the traboules — the covered passages people always ask about — are mostly private and close at dusk. All of that is settled with the venue weeks before rather than negotiated on the pavement at five in the afternoon.',
      fr: 'Les mariages lyonnais sont dessinés par la géographie : deux fleuves, une colline, et un vieux quartier aux rues trop étroites pour un car. L’endroit de la photo de groupe est décidé par là où les voitures peuvent s’arrêter, pas par le quai le plus joli, et les traboules — que l’on demande toujours — sont pour la plupart privées et ferment à la tombée du jour. Tout cela se règle avec le lieu des semaines avant, plutôt que sur le trottoir à dix-sept heures.',
    },
  },

  'riviera-honeymoon--nice': {
    title: { en: 'Honeymoon Photo Session in Nice | Ylala', fr: 'Séance lune de miel à Nice | Ylala' },
    description: {
      en: 'Two hours from the old town down to the water, timed to the end of the day when the sea goes flat. €260, 55 retouched frames, gallery in 48 hours.',
      fr: 'Deux heures de la vieille ville jusqu’à l’eau, en fin de journée quand la mer s’aplatit. 260 €, 55 images retouchées, galerie sous 48 heures.',
    },
    angle: {
      en: 'The light in Nice is the reason people come and the reason sessions fail: it is superb for about two hours a day and merciless for six. This is the one session on the site booked deliberately for the end of the day rather than the start, because the Mediterranean does something in the last two hours that it does at no other time — the wind drops and the surface goes flat, and the water stops being a bright distraction and becomes a mirror.',
      fr: 'La lumière niçoise est la raison pour laquelle on vient et la raison pour laquelle les séances ratent : superbe environ deux heures par jour, impitoyable six. C’est la seule séance du site réservée délibérément en fin de journée plutôt qu’au début, car la Méditerranée fait dans les deux dernières heures ce qu’elle ne fait à aucun autre moment — le vent tombe, la surface s’aplatit, et l’eau cesse d’être une distraction éclatante pour devenir un miroir.',
    },
  },

  'proposal--nice': {
    title: { en: 'Proposal Photographer in Nice | Ylala', fr: 'Photographe demande en mariage Nice | Ylala' },
    description: {
      en: 'Scouted on the Colline du Château at the hour the light works, photographed from a distance, then a short couple session. €250, 35 retouched frames.',
      fr: 'Repérée sur la colline du Château à l’heure où la lumière fonctionne, photographiée de loin, puis courte séance couple. 250 €, 35 images.',
    },
    angle: {
      en: 'The Colline du Château gives you the whole bay from above, which is why almost every proposal here happens on it — and why the hour matters more than the spot. Late in the day the bay is lit and the terrace has thinned out; at midday it is full and the light is flat off the water. The scouting settles the exact position, the angle you arrive from, and where the photographer waits, which is always further away than people expect.',
      fr: 'La colline du Château donne toute la baie vue d’en haut, ce qui explique que presque toutes les demandes s’y fassent — et pourquoi l’heure compte plus que l’endroit. En fin de journée la baie est éclairée et la terrasse s’est vidée ; à midi elle est pleine et la lumière est plate sur l’eau. Le repérage arrête la position exacte, l’angle par lequel vous arrivez, et le point d’attente du photographe, toujours plus loin qu’on ne l’imagine.',
    },
  },

  'wedding--bordeaux': {
    title: { en: 'Wedding Photographer in Bordeaux | Ylala', fr: 'Photographe de mariage à Bordeaux | Ylala' },
    description: {
      en: 'City and vineyard need different planning, and a Saint-Émilion château is forty minutes out. Ten hours, venue contacted beforehand. From €1,600.',
      fr: 'Ville et vignoble se préparent différemment, et un château à Saint-Émilion est à quarante minutes. Dix heures, lieu contacté en amont. Dès 1 600 €.',
    },
    angle: {
      en: 'Bordeaux is a stone-coloured city with a vineyard attached, and the two halves need completely different planning. A ceremony in the city and a reception at a Saint-Émilion château is forty minutes of driving in each direction, and that transfer is the thing most likely to eat the golden hour. The alternative — everything at the estate — trades the miroir d’eau for a working vineyard, which is a real choice rather than an obvious one.',
      fr: 'Bordeaux est une ville de pierre doublée d’un vignoble, et les deux moitiés se préparent tout à fait différemment. Une cérémonie en ville et une réception dans un château de Saint-Émilion, c’est quarante minutes de route dans chaque sens, et ce transfert est ce qui risque le plus de dévorer l’heure dorée. L’alternative — tout au domaine — échange le miroir d’eau contre un vignoble en activité : un vrai choix, pas une évidence.',
    },
  },

  'provence-destination-wedding--aix-en-provence': {
    title: { en: 'Provence Wedding Photographer, Aix | Ylala', fr: 'Photographe mariage en Provence, Aix | Ylala' },
    description: {
      en: 'The lavender is cut in early August and the mas has a curfew — both settled before the schedule is drawn. Eleven hours, 450 frames. €2,200.',
      fr: 'La lavande est coupée début août et le mas a un couvre-feu — réglés avant le déroulé. Onze heures, 450 images. 2 200 €.',
    },
    angle: {
      en: 'Almost every disappointed Provence booking comes down to one fact learned late: the lavender everyone comes for is cut in the first days of August. A September wedding photographed on the Valensole plateau is a wedding photographed among cut stalks. The second fact is the curfew — most mas and châteaux here operate under a municipal noise restriction written into the contract — and the third is the heat, which empties the middle of the afternoon whatever the schedule says.',
      fr: 'Presque chaque réservation provençale déçue tient à un fait appris trop tard : la lavande pour laquelle on vient est coupée dans les premiers jours d’août. Un mariage de septembre photographié sur le plateau de Valensole est un mariage photographié parmi des tiges coupées. Le deuxième fait est le couvre-feu — la plupart des mas et châteaux relèvent ici d’un arrêté municipal inscrit au contrat — et le troisième est la chaleur, qui vide le milieu d’après-midi quoi que dise le programme.',
    },
  },

  'french-alps-elopement--chamonix': {
    title: { en: 'Alps Elopement Photographer, Chamonix | Ylala', fr: 'Photographe elopement à Chamonix | Ylala' },
    description: {
      en: 'Wind moves the date, not cloud. A weather call made together 48 hours ahead and a second date held from booking. €950, five hours, 180 frames.',
      fr: 'C’est le vent qui déplace la date, pas le nuage. Décision météo à 48 h et seconde date réservée dès l’engagement. 950 €, cinq heures, 180 images.',
    },
    angle: {
      en: 'Cloud at altitude is not the problem people expect — it diffuses beautifully and rescues a harsh midday. Wind is the problem, and it is what actually moves a date: exposed ground above the treeline becomes unpleasant and sometimes unsafe, and no forecast reads it reliably more than two days out. So the call is made together forty-eight hours ahead, and a second date is held from the moment you book rather than hunted for in a panic.',
      fr: 'Le nuage en altitude n’est pas le problème attendu : il diffuse superbement et sauve un midi trop dur. Le problème, c’est le vent, et c’est lui qui déplace réellement une date — le terrain exposé au-dessus de la forêt devient désagréable et parfois dangereux, et aucune prévision ne le lit correctement au-delà de deux jours. La décision se prend donc ensemble quarante-huit heures avant, et une seconde date est réservée dès l’engagement plutôt que cherchée dans l’urgence.',
    },
  },

  'couple--marseille': {
    title: { en: 'Couple Photo Session in Marseille | Ylala', fr: 'Séance photo couple à Marseille | Ylala' },
    description: {
      en: 'The hardest light in France and a mistral that sets the schedule. Ninety minutes between Le Panier and the Corniche, planned around both. €190.',
      fr: 'La lumière la plus dure de France et un mistral qui fixe l’horaire. Quatre-vingt-dix minutes entre le Panier et la Corniche. 190 €.',
    },
    angle: {
      en: 'The light in Marseille is harder than anywhere else in France, and the mistral decides more of the schedule than the calendar does. Both are workable if you plan for them: Le Panier’s narrow streets hold shade when the Corniche is unusable, and the wind that ruins a seafront session at two in the afternoon has usually dropped by six. What does not work is booking a fixed hour a month ahead and hoping.',
      fr: 'La lumière marseillaise est la plus dure de France, et le mistral décide de l’horaire plus que le calendrier. Les deux sont gérables si on les anticipe : les ruelles du Panier gardent de l’ombre quand la Corniche est inutilisable, et le vent qui ruine une séance en bord de mer à quatorze heures est en général tombé à dix-huit. Ce qui ne marche pas, c’est de fixer une heure un mois à l’avance en espérant.',
    },
  },

  'riviera-honeymoon--cannes': {
    title: { en: 'Honeymoon Photo Session in Cannes | Ylala', fr: 'Séance lune de miel à Cannes | Ylala' },
    description: {
      en: 'Fifty weeks a year Cannes is an unusually photogenic seaside city nobody books. Two hours from Le Suquet to the water, at the end of the day. €260.',
      fr: 'Cinquante semaines par an, Cannes est une ville balnéaire très photogénique que personne ne réserve. Deux heures du Suquet à l’eau, en fin de journée. 260 €.',
    },
    angle: {
      en: 'Two weeks a year the town belongs to the festival, and for the other fifty it is an unusually photogenic seaside city that almost nobody thinks to book. That is the opportunity: Le Suquet has the old-town stone and the height, the Croisette has the water, and outside May you will have both largely to yourselves. Avoid the festival fortnight entirely — hotels triple and the seafront is closed to everything but the red carpet.',
      fr: 'Deux semaines par an la ville appartient au festival ; les cinquante autres, c’est une ville balnéaire très photogénique que presque personne ne pense à réserver. C’est là l’occasion : le Suquet a la pierre de la vieille ville et la hauteur, la Croisette a l’eau, et hors mai vous aurez les deux à peu près pour vous. Évitez entièrement la quinzaine du festival : les hôtels triplent et le front de mer est fermé à tout sauf au tapis rouge.',
    },
  },

  'proposal--annecy': {
    title: { en: 'Proposal Photographer in Annecy | Ylala', fr: 'Photographe demande en mariage Annecy | Ylala' },
    description: {
      en: 'The lake photographs turquoise only when the sun is high, so this one is booked at midday — the opposite of every other rule here. €250, 35 frames.',
      fr: 'Le lac ne vire au turquoise que soleil haut : celle-ci se réserve à midi — l’inverse de toutes nos autres règles. 250 €, 35 images retouchées.',
    },
    angle: {
      en: 'Annecy breaks the rule the rest of this site is built on. The lake is the clearest in Europe and it photographs turquoise only when the sun is high enough to reach the bottom — which means the middle of the day, not the golden hour. A proposal at the Pont des Amours at seven in the evening is a proposal in front of grey water. Book it at midday, and accept that the old-town canals will be busy in exchange for a lake that is the colour you came for.',
      fr: 'Annecy casse la règle sur laquelle repose tout le reste de ce site. Le lac est le plus clair d’Europe et ne se photographie turquoise que si le soleil est assez haut pour en atteindre le fond — donc en milieu de journée, pas à l’heure dorée. Une demande au pont des Amours à dix-neuf heures est une demande devant de l’eau grise. Réservez à midi, et acceptez des canaux fréquentés en échange d’un lac de la couleur pour laquelle vous êtes venus.',
    },
  },

  'couple--mont-saint-michel': {
    title: { en: 'Couple Session at Mont-Saint-Michel | Ylala', fr: 'Séance couple au Mont-Saint-Michel | Ylala' },
    description: {
      en: 'The tide table decides the hour and it is not negotiable. Ninety minutes on the causeway and in the bay, planned from the tables. €190, 40 frames.',
      fr: 'La marée fixe l’heure, sans négociation possible. Quatre-vingt-dix minutes sur la digue et dans la baie, planifiées sur les tables. 190 €, 40 images.',
    },
    angle: {
      en: 'This is the only place on the site where the hour is decided by something that ignores light entirely. A high spring tide surrounds the Mount with water and gives you the photograph everyone has in mind; at low tide it stands in a plain of wet sand, which is a quite different and arguably better picture, but it is not the one people booked for. The tables are published years ahead, so the date is chosen from them rather than from your calendar.',
      fr: 'C’est le seul endroit du site où l’heure est fixée par quelque chose qui ignore totalement la lumière. Une grande marée entoure le Mont d’eau et donne la photographie que tout le monde a en tête ; à marée basse il se dresse dans une plaine de sable mouillé — image très différente et sans doute plus belle, mais pas celle pour laquelle on a réservé. Les tables sont publiées des années à l’avance : la date se choisit dessus, pas sur votre agenda.',
    },
  },

  'couple--etretat': {
    title: { en: 'Couple Photo Session in Étretat | Ylala', fr: 'Séance photo couple à Étretat | Ylala' },
    description: {
      en: 'The cliffs face west, so the whole session is built around sunset rather than sunrise — one of the few places in France where that is true. €190.',
      fr: 'Les falaises regardent l’ouest : toute la séance se construit sur le coucher, pas sur l’aube — rare en France. 190 €, 40 images retouchées.',
    },
    angle: {
      en: 'Étretat is one of the few places in France where the whole session is built around sunset rather than sunrise, and the reason is simply that the cliffs face west. At dawn the Aiguille and the Falaise d’Aval are in their own shadow and the sea behind them is flat and grey; in the last hour of light the chalk goes warm and the arch is lit from the front. Book the evening, and add half an hour for the climb — the view that sells the place is at the top.',
      fr: 'Étretat est l’un des rares endroits de France où toute la séance se construit sur le coucher de soleil plutôt que sur l’aube, et la raison est simple : les falaises regardent l’ouest. À l’aube, l’Aiguille et la falaise d’Aval sont dans leur propre ombre et la mer derrière est plate et grise ; dans la dernière heure de lumière, la craie se réchauffe et l’arche est éclairée de face. Réservez le soir, et prévoyez une demi-heure pour la montée : la vue qui vend le lieu est en haut.',
    },
  },
};
