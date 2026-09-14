import type { Localized } from '@/lib/locales';

/**
 * Localized copy and structured content for the About (chi-siamo) page.
 * Kept out of the page component to keep that file focused on layout.
 *
 * Prose is authored in English and French; `tx()` falls back to English where a
 * locale has no authored value (see src/lib/locales.ts), matching the catalogue
 * convention used across the site.
 */

export const COPY = {
  eyebrow: { en: 'Our story' },
  title: { en: 'About us' },
  lead: {
    en: 'Ylala began with one complaint we kept hearing: booking a photographer in a city you do not live in is slow, opaque and priced after the fact. We fixed the order — the price is agreed first, in writing, and it does not move.',
  },
  body: {
    en: 'We hand-pick local photographers who know each city inside out. We set a clear price from the start and guarantee gallery delivery in 48-72 hours. If you are not satisfied, we refund you 100%.',
  },

  // Our story / mission
  storyEyebrow: { en: 'Our mission' },
  storyTitle: { en: 'Travel photography, without compromise' },
  storyBody1: {
    en: 'It started on a trip. Finding someone reliable in an unfamiliar city meant three days of email, no clear price and no idea whether the person had ever worked there before. So we built the opposite: a vetted network across France, and a booking that takes minutes rather than a week.',
  },
  storyBody2: {
    en: 'Every photographer on the network lives in the city they shoot in. That is the whole point: they know which hour a place is still empty, what the local permit regime actually is, and where to move when the weather turns. None of that can be researched from somewhere else.',
  },

  // Values
  valuesEyebrow: { en: 'What we stand for' },
  valuesTitle: { en: 'Three principles, zero exceptions' },

  // How it works
  stepsEyebrow: { en: 'How it works' },
  stepsTitle: { en: 'From booking to gallery' },

  // Trust / guarantees
  trustEyebrow: { en: 'Our guarantees' },
  trustTitle: { en: 'Why trust us' },
  trustSub: {
    en: 'Concrete promises, in black and white. No hidden clauses.',
  },

  // Coverage
  coverageEyebrow: { en: 'Where we shoot' },
  coverageTitle: { en: 'Twenty-two cities and destinations' },
  coverageSub: {
    en: 'From the alleys of Rome to sunsets over Lake Como, our local photographers are ready for you.',
  },
  coverageViewAll: { en: 'All cities' },

  // What we offer
  offerEyebrow: { en: 'What we offer' },
  offerTitle: { en: 'A service for every moment' },
  offerSub: {
    en: 'Portraits, couples, families, weddings, business and much more — pick the category that fits you.',
  },
  offerViewAll: { en: 'All services' },

  // Reviews
  reviewsEyebrow: { en: 'In their words' },
  reviewsTitle: { en: 'Real stories, real shots' },

  // FAQ
  faqTitle: { en: 'Frequently asked questions' },

  // CTA
  ctaTitle: { en: 'Ready to start?' },
  ctaSub: {
    en: 'Lock your price, choose your city and trust a local photographer. We reply within 2 hours.',
  },
  cta: { en: 'Book now' },
  ctaContact: { en: 'Talk to us' },
  breadcrumbHome: { en: 'Home', pt: 'PT_TODO: Home' },
} satisfies Record<string, Localized>;

export interface Step {
  n: string;
  title: Localized;
  body: Localized;
}

export const STEPS: Step[] = [
  {
    n: '01',
    title: { en: 'Choose & book' },
    body: {
      en: 'Pick a service, city and date. The price locks instantly — no quotes needed.',
    },
  },
  {
    n: '02',
    title: { en: 'Shoot with a local' },
    body: {
      en: 'A verified photographer guides you to the best spots, at the right hour, with natural posing.',
    },
  },
  {
    n: '03',
    title: { en: 'Get your gallery' },
    body: {
      en: 'Edited photos in a private gallery within 48-72 hours. 100% satisfaction guarantee.',
    },
  },
];

export interface ValueCard {
  icon: string;
  title: Localized;
  body: Localized;
}

export const VALUES: ValueCard[] = [
  {
    icon: '◇',
    title: { en: 'Total transparency' },
    body: {
      en: 'The price you see is the price you pay. Locked at booking, with no hidden fees and no last-minute surprises.',
    },
  },
  {
    icon: '◎',
    title: { en: 'Vetted local talent' },
    body: {
      en: 'Every photographer is hand-picked and knows their city by heart: the light, the angles and the perfect timing.',
    },
  },
  {
    icon: '✦',
    title: { en: 'Quality that lasts' },
    body: {
      en: 'Carefully edited photos, delivered fast, made to be printed, shared and remembered.',
    },
  },
];

export interface Guarantee {
  stat: string;
  title: Localized;
  body: Localized;
}

export const GUARANTEES: Guarantee[] = [
  {
    stat: '2h',
    title: { en: 'Fast response' },
    body: { en: 'We get back to you within 2 hours of your request.' },
  },
  {
    stat: '€',
    title: { en: 'Fixed price' },
    body: { en: 'Locked at booking. Zero surprises.' },
  },
  {
    stat: '48-72h',
    title: { en: 'Fast delivery' },
    body: { en: 'Private gallery with edited photos in 48-72 hours.' },
  },
  {
    stat: '100%',
    title: { en: 'Money-back guarantee' },
    body: { en: 'Not happy? We refund you 100%.' },
  },
];

export interface AboutFaq {
  q: Localized;
  a: Localized;
}

export const ABOUT_FAQ: AboutFaq[] = [
  {
    q: { en: 'How do you choose your photographers?' },
    a: {
      en: 'We hand-pick local professionals, reviewing portfolio, experience and reviews. Only those who truly know the city and keep high standards join the Ylala network.',
    },
  },
  {
    q: { en: 'Is the price really fixed?' },
    a: {
      en: 'Yes. The price locks the moment you book and includes the shoot and edited photos. No hidden costs, no surprise add-ons.',
    },
  },
  {
    q: { en: 'When do I get my photos?' },
    a: {
      en: 'We deliver a private gallery with edited photos within 48-72 hours of the shoot.',
    },
  },
  {
    q: { en: 'What if I’m not satisfied?' },
    a: {
      en: 'Your peace of mind comes first: if you’re not satisfied with the service, we refund you 100%.',
    },
  },
  {
    q: { en: 'Which cities do you cover?' },
    a: {
      en: 'Ten cities where the work is mostly local, and twelve destinations people travel to — from Paris and Lyon to Provence, the Alps and the Normandy coast.',
    },
  },
];

// ---------------------------------------------------------------------------
// Search-facing copy.
//
// The page title and lead are written for a reader who has already arrived.
// These are written for one who has not: the SERP entry, and the long-form
// passage that closes the page.
// ---------------------------------------------------------------------------

/** ≤60 chars once the layout appends the brand suffix. */
export const META_TITLE: Localized = {
  en: 'About Ylala — Vetted Photographers in France',
  pt: 'PT_TODO: About Ylala — Vetted Photographers in France',
};

export const META_DESCRIPTION: Localized = {
  en: 'How Ylala works: local photographers vetted on published work, one fixed price agreed in writing, a private gallery in 48–72h, and a full refund if not.',
  pt: 'PT_TODO: How Ylala works: local photographers vetted on published wor',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'Paris photographed by the Ylala network, which covers 22 French cities and destinations',
  pt: 'PT_TODO: Paris photographed by the Ylala network, which covers 22 Fre',
};

export const SEO_PROSE = {
  eyebrow: { en: 'How the network works', pt: 'PT_TODO: How the network works' } as Localized,
  heading: {
    en: 'What we check before a photographer joins',
    pt: 'PT_TODO: What we check before a photographer joins',
  } as Localized,
  paragraphs: {
    en: [
      'Ylala is a booking network rather than a studio. We do not employ photographers or send them out from a head office; we vet people who already work professionally in their own city, and we take responsibility for the parts of a booking that usually go wrong — the price, the schedule and the delivery.',
      'Admission turns on published work rather than on a portfolio assembled for us. We look for a body of paid client sessions in the categories being applied for, consistency across a whole gallery instead of five strong frames, and colour work that holds up on ordinary skin in ordinary light. We ask how they handle the things nobody photographs on purpose: rain on a wedding morning, a two-year-old who will not sit, a conference room with one window and a deadline.',
      'What we hold ourselves to is narrower and easier to check. The price is agreed in writing before the session and does not move afterwards. Editing is included, and there is no charge per extra photograph. The private gallery arrives within forty-eight to seventy-two hours in full resolution, with a licence to print and post it. Enquiring costs nothing and requires no deposit, and if the weather turns we move the session at no cost.',
      'If the work is not what you were promised, we refund it in full rather than argue about taste. That guarantee is the reason the vetting is strict: a network that pays for its own mistakes has to be careful about who it lets in.',
    ],
    pt: [
    'PT_TODO: Ylala is a booking network rather than a studio. We do not e',
    'PT_TODO: Admission turns on published work rather than on a portfolio',
    'PT_TODO: What we hold ourselves to is narrower and easier to check. T',
    'PT_TODO: If the work is not what you were promised, we refund it in f',
  ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities & destinations', value: '12' },
      { label: 'Session types', value: '22' },
      { label: 'Gallery delivery', value: '48–72h' },
      { label: 'Refund guarantee', value: '100%' },
    ],
    pt: [
      { label: 'Cidades & destinos', value: '12' },
      { label: 'Tipos de sessão', value: '22' },
      { label: 'Entrega da galeria', value: '48–72h' },
      { label: 'Garantia de reembolso', value: '100%' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
