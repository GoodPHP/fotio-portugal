import type { Localized } from '../locales';

/**
 * Per-city SERP copy.
 *
 * Kept apart from the city records for one reason: the generated alternative
 * was a single template with the name and region substituted in, which gave
 * twenty-two pages the same meta description and taught a crawler that they
 * were interchangeable. They are not — each city here is sold on the one fact
 * that actually changes how a session there is planned.
 *
 * `check-seo.ts` asserts that every published city has an entry and that both
 * strings fit the SERP limits, so a new city cannot quietly fall back to
 * boilerplate.
 */

export interface CitySeo {
  /** ≤52 chars: the layout appends " | Ylala" to reach the 60-char limit. */
  title: Localized;
  /** 150–160 chars. */
  description: Localized;
}

export const CITY_SEO: Record<string, CitySeo> = {
  paris: {
    title: {
      en: 'Photographer in Paris — Shoot Before 9am',
      fr: 'Photographe à Paris — photographier avant 9 h',
    },
    description: {
      en: 'Book a Paris photographer who starts at sunrise, while the Île Saint-Louis and the Trocadéro are still empty. Fixed price, private gallery in 48–72h.',
      fr: 'Réservez un photographe à Paris qui commence au lever du jour, quand l’île Saint-Louis et le Trocadéro sont encore vides. Prix fixe, galerie en 48–72 h.',
    },
  },
  lyon: {
    title: {
      en: 'Photographer in Lyon — Headshots & Events',
      fr: 'Photographe à Lyon — portraits pro et événements',
    },
    description: {
      en: 'Corporate headshots, conferences and family sessions in Lyon, shot by a photographer who works the city weekly. Fixed price, gallery in 48–72 hours.',
      fr: 'Portraits corporate, conférences et séances famille à Lyon, par un photographe qui travaille la ville chaque semaine. Prix fixe, galerie en 48–72 h.',
    },
  },
  marseille: {
    title: {
      en: 'Photographer in Marseille — Panier & Corniche',
      fr: 'Photographe à Marseille — Panier et Corniche',
    },
    description: {
      en: 'The light in Marseille is harder than anywhere in France and the mistral sets the schedule. Book a local photographer who plans around both. Fixed price.',
      fr: 'La lumière marseillaise est la plus dure de France et le mistral fixe l’horaire. Réservez un photographe local qui compose avec les deux. Prix fixe.',
    },
  },
  bordeaux: {
    title: {
      en: 'Photographer in Bordeaux — City & Vineyards',
      fr: 'Photographe à Bordeaux — ville et vignoble',
    },
    description: {
      en: 'Bordeaux is a stone city with a vineyard attached, and the two need different planning. Weddings, couples and families, from Saint-Émilion to Arcachon.',
      fr: 'Bordeaux est une ville de pierre doublée d’un vignoble, et les deux se préparent différemment. Mariages, couples et familles, de Saint-Émilion à Arcachon.',
    },
  },
  toulouse: {
    title: {
      en: 'Photographer in Toulouse — Brick & Garonne',
      fr: 'Photographe à Toulouse — brique et Garonne',
    },
    description: {
      en: 'Everything in Toulouse is brick, so everything is warm — skin included. Book a photographer who corrects for it. Headshots, families and couples, fixed price.',
      fr: 'À Toulouse tout est en brique, donc tout est chaud — les carnations comprises. Un photographe qui le corrige. Portraits, familles, couples, prix fixe.',
    },
  },
  nice: {
    title: {
      en: 'Photographer in Nice — Two Good Hours a Day',
      fr: 'Photographe à Nice — deux bonnes heures par jour',
    },
    description: {
      en: 'Riviera light is superb for two hours and merciless for six. Book a Nice photographer who knows which two. Couples, proposals and honeymoons, fixed price.',
      fr: 'La lumière de la Côte est superbe deux heures et impitoyable six. Un photographe niçois qui sait lesquelles. Couples, demandes, lune de miel. Prix fixe.',
    },
  },
  lille: {
    title: {
      en: 'Photographer in Lille — Best Portrait Light',
      fr: 'Photographe à Lille — la meilleure lumière portrait',
    },
    description: {
      en: 'Lille is overcast most of the year, which is the best portrait light in France. Headshots, families and couples in Vieux-Lille. Gallery in 48–72 hours.',
      fr: 'Lille est couverte presque toute l’année : la meilleure lumière portrait de France. Portraits, familles et couples dans le Vieux-Lille. Galerie en 48–72 h.',
    },
  },
  nantes: {
    title: {
      en: 'Photographer in Nantes — Erdre & the Island',
      fr: 'Photographe à Nantes — l’Erdre et l’île',
    },
    description: {
      en: 'A city rebuilt around its river and its industrial island, and it photographs unlike anywhere in the west. Weddings, families and couples at a fixed price.',
      fr: 'Une ville reconstruite autour de son fleuve et de son île industrielle, qui se photographie comme nulle part dans l’Ouest. Mariages, familles, couples.',
    },
  },
  strasbourg: {
    title: {
      en: 'Photographer in Strasbourg — Winter Is Peak',
      fr: 'Photographe à Strasbourg — l’hiver est la saison',
    },
    description: {
      en: 'The one French city where winter is the high season for photographs, and not only for the market. Couples, proposals and families in La Petite France.',
      fr: 'La seule ville française où l’hiver est la haute saison photo, et pas seulement pour le marché. Couples, demandes et familles à la Petite France.',
    },
  },
  montpellier: {
    title: {
      en: 'Photographer in Montpellier — 300 Sunny Days',
      fr: 'Photographe à Montpellier — 300 jours de soleil',
    },
    description: {
      en: 'Three hundred days of sun is a scheduling problem more than a gift. Book a Montpellier photographer who works the Écusson at the right hour. Fixed price.',
      fr: 'Trois cents jours de soleil relèvent plus du casse-tête horaire que du cadeau. Un photographe qui travaille l’Écusson à la bonne heure. Prix fixe.',
    },
  },
  'aix-en-provence': {
    title: {
      en: 'Photographer in Aix — Lavender Cut in August',
      fr: 'Photographe à Aix — lavande coupée en août',
    },
    description: {
      en: 'The lavender everyone comes for is cut in early August. Book a Provence photographer who plans the date around it. Weddings, elopements and couples.',
      fr: 'La lavande pour laquelle on vient est coupée début août. Un photographe provençal qui cale la date dessus. Mariages, elopements et séances couple.',
    },
  },
  avignon: {
    title: {
      en: 'Photographer in Avignon — After the Festival',
      fr: 'Photographe à Avignon — après le festival',
    },
    description: {
      en: 'A walled city that empties when the festival ends, which is exactly when it is worth photographing. Weddings and couples at the Palais des Papes.',
      fr: 'Une ville close qui se vide dès la fin du festival, et c’est précisément là qu’elle mérite d’être photographiée. Mariages et couples au Palais des Papes.',
    },
  },
  cannes: {
    title: {
      en: 'Photographer in Cannes — Le Suquet & Lérins',
      fr: 'Photographe à Cannes — Le Suquet et les Lérins',
    },
    description: {
      en: 'Two weeks a year Cannes belongs to the festival; the other fifty it is an unusually photogenic seaside city nobody books. Couples, proposals, honeymoons.',
      fr: 'Deux semaines par an Cannes appartient au festival ; les cinquante autres, c’est une ville balnéaire très photogénique que personne ne réserve. Prix fixe.',
    },
  },
  'saint-tropez': {
    title: {
      en: 'Photographer in Saint-Tropez — Come in May',
      fr: 'Photographe à Saint-Tropez — venez en mai',
    },
    description: {
      en: 'In August the village is unworkable and the road in takes two hours. In May it is a small fishing port with extraordinary light. Couples and weddings.',
      fr: 'En août le village est impraticable et la route prend deux heures. En mai, c’est un petit port de pêche à la lumière extraordinaire. Couples et mariages.',
    },
  },
  annecy: {
    title: {
      en: 'Photographer in Annecy — Turquoise at Midday',
      fr: 'Photographe à Annecy — turquoise à midi',
    },
    description: {
      en: 'The clearest lake in Europe photographs turquoise only when the sun is high — the opposite of every other rule. Proposals, couples and weddings, fixed price.',
      fr: 'Le lac le plus clair d’Europe ne vire au turquoise que soleil haut — l’inverse de toutes les autres règles. Demandes, couples et mariages. Prix fixe.',
    },
  },
  chamonix: {
    title: {
      en: 'Photographer in Chamonix — Alpine Elopements',
      fr: 'Photographe à Chamonix — elopements alpins',
    },
    description: {
      en: 'Cloud at altitude diffuses beautifully; wind is what moves a date. Book an Alps photographer who reads both. Elopements, proposals and couples at Lac Blanc.',
      fr: 'En altitude le nuage diffuse très bien ; c’est le vent qui déplace une date. Un photographe des Alpes qui lit les deux. Elopements, demandes, couples.',
    },
  },
  colmar: {
    title: {
      en: 'Photographer in Colmar — La Petite Venise',
      fr: 'Photographe à Colmar — la Petite Venise',
    },
    description: {
      en: 'Small enough to cross in fifteen minutes and saturated enough that no session here has needed help with colour. Couples, proposals and holiday sessions.',
      fr: 'Assez petite pour se traverser en quinze minutes, assez saturée pour qu’aucune séance n’ait jamais eu besoin d’aide en couleur. Couples et demandes.',
    },
  },
  'mont-saint-michel': {
    title: {
      en: 'Photographer at Mont-Saint-Michel — Tide Times',
      fr: 'Photographe au Mont-Saint-Michel — les marées',
    },
    description: {
      en: 'The one place where the tide table decides the hour, and it is not negotiable. Book a photographer who plans from it. Couples, proposals and elopements.',
      fr: 'Le seul endroit où l’horaire est fixé par la marée, sans négociation possible. Un photographe qui part de là. Couples, demandes, elopements. Prix fixe.',
    },
  },
  etretat: {
    title: {
      en: 'Photographer in Étretat — Sunset on the Cliffs',
      fr: 'Photographe à Étretat — coucher de soleil',
    },
    description: {
      en: 'The cliffs face west, so the whole session is built around sunset rather than sunrise. Couples, proposals and elopements at the Aiguille. Fixed price.',
      fr: 'Les falaises regardent l’ouest : toute la séance se construit sur le coucher, pas sur l’aube. Couples, demandes et elopements à l’Aiguille. Prix fixe.',
    },
  },
  biarritz: {
    title: {
      en: 'Photographer in Biarritz — Basque Coast',
      fr: 'Photographe à Biarritz — Côte basque',
    },
    description: {
      en: 'Atlantic weather turns twice in an afternoon, so nothing is booked without a sheltered alternative already chosen. Couples, weddings and families, fixed price.',
      fr: 'Le temps atlantique tourne deux fois dans l’après-midi : rien n’est réservé sans repli couvert déjà choisi. Couples, mariages et familles. Prix fixe.',
    },
  },
  carcassonne: {
    title: {
      en: 'Photographer in Carcassonne — Floodlit Walls',
      fr: 'Photographe à Carcassonne — remparts illuminés',
    },
    description: {
      en: 'The walls are floodlit at night and photograph better then than at any hour of daylight. Couples, weddings and proposals at the Pont Vieux. Fixed price.',
      fr: 'Les remparts sont illuminés la nuit et se photographient mieux alors qu’à n’importe quelle heure du jour. Couples, mariages et demandes au Pont Vieux.',
    },
  },
  reims: {
    title: {
      en: 'Photographer in Reims — Cathedral & Cellars',
      fr: 'Photographe à Reims — cathédrale et caves',
    },
    description: {
      en: 'Two subjects here, and one is eighteen metres underground at a constant ten degrees. Weddings, couples and corporate events, from Épernay to Hautvillers.',
      fr: 'Deux sujets ici, dont l’un est à dix-huit mètres sous terre par dix degrés constants. Mariages, couples et événements d’entreprise, d’Épernay à Hautvillers.',
    },
  },
};
