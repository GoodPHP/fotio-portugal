import type { Localized } from '@/lib/locales';

/**
 * Localized copy and structured content for the About page.
 * Kept out of the page component to keep that file focused on layout.
 *
 * Everything here is authored in both languages. That is worth stating because
 * it was not true until this pass: the body copy was the previous site's,
 * English-only, and `tx()` falls back to English — so the Portuguese About page
 * rendered sixty English strings while every other page on the site was fully
 * translated. Worse, the copy was not even the *French* site's in places. It
 * still offered "the alleys of Rome and sunsets over Lake Como" and counted
 * "twenty-two cities and destinations", which is the service count, not the
 * place count, and belonged to an Italian incarnation two rebuilds ago.
 *
 * `check-pt-todo` could not catch any of it: a missing translation and a
 * deliberately English string look identical without a marker.
 */

export const COPY = {
  eyebrow: { en: 'Our story', pt: 'A nossa história' },
  title: { en: 'About us', pt: 'Sobre nós' },
  lead: {
    en: 'This began with one complaint we kept hearing: booking a photographer in a place you do not live in is slow, opaque and priced after the fact. We fixed the order — the price is agreed first, in writing, and it does not move.',
    pt: 'Isto começou com uma queixa que ouvíamos sempre: reservar um fotógrafo num sítio onde não se vive é lento, pouco claro e o preço só aparece no fim. Invertemos a ordem — o preço é acordado primeiro, por escrito, e não muda.',
  },
  body: {
    en: 'We hand-pick local photographers who know each place inside out. The price is confirmed in writing before you book, most galleries arrive within 48–72 hours, and if the gallery is not what was promised you are refunded in full.',
    pt: 'Escolhemos a dedo fotógrafos locais que conhecem cada sítio de cor. O preço é confirmado por escrito antes de reservar, a maioria das galerias chega em 48 a 72 horas e, se a galeria não for o que foi prometido, é reembolsado na totalidade.',
  },

  // Our story / mission
  storyEyebrow: { en: 'Our mission', pt: 'A nossa missão' },
  storyTitle: {
    en: 'Travel photography, without compromise',
    pt: 'Fotografia de viagem, sem compromissos',
  },
  storyBody1: {
    en: 'It started on a trip. Finding someone reliable in an unfamiliar city meant three days of email, no clear price and no idea whether the person had ever worked there before. So we built the opposite: a vetted network across Portugal, and a booking that takes minutes rather than a week.',
    pt: 'Começou numa viagem. Encontrar alguém de confiança numa cidade desconhecida significava três dias de e-mails, nenhum preço claro e nenhuma ideia se a pessoa alguma vez ali tinha trabalhado. Construímos o contrário: uma rede verificada em todo o Portugal e uma reserva que demora minutos em vez de uma semana.',
  },
  storyBody2: {
    en: 'Every photographer on the network lives in the place they shoot in. That is the whole point: they know which hour a spot is still empty, what the local permit regime actually is, and where to move when the weather turns. None of that can be researched from somewhere else.',
    pt: 'Cada fotógrafo da rede vive no sítio onde fotografa. É esse o ponto: sabem a que hora um lugar ainda está vazio, como funciona mesmo o regime de licenças local e para onde ir quando o tempo muda. Nada disso se pesquisa a partir de outro sítio.',
  },

  // Values
  valuesEyebrow: { en: 'What we stand for', pt: 'Aquilo em que acreditamos' },
  valuesTitle: {
    en: 'Three principles, zero exceptions',
    pt: 'Três princípios, zero excepções',
  },

  // How it works
  stepsEyebrow: { en: 'How it works', pt: 'Como funciona' },
  stepsTitle: { en: 'From booking to gallery', pt: 'Da reserva à galeria' },

  // Trust / guarantees
  trustEyebrow: { en: 'Our guarantees', pt: 'As nossas garantias' },
  trustTitle: { en: 'Why trust us', pt: 'Porquê confiar em nós' },
  trustSub: {
    en: 'Concrete promises, in black and white. No hidden clauses.',
    pt: 'Promessas concretas, preto no branco. Sem cláusulas escondidas.',
  },

  /*
   * No number in the heading, on purpose. The old one said "Twenty-two cities
   * and destinations" — a count that was wrong twice over, and the kind of
   * thing that goes stale silently the next time a place is added.
   */
  coverageEyebrow: { en: 'Where we shoot', pt: 'Onde fotografamos' },
  coverageTitle: { en: 'Every place we cover', pt: 'Todos os sítios que cobrimos' },
  coverageSub: {
    en: 'From the tiled streets of Lisbon to the terraces of the Douro and the cliffs of the Algarve — the photographer who answers already lives there.',
    pt: 'Das ruas de azulejo de Lisboa aos socalcos do Douro e às arribas do Algarve — o fotógrafo que responde já lá vive.',
  },
  coverageViewAll: { en: 'All cities', pt: 'Todos os sítios' },

  // What we offer
  offerEyebrow: { en: 'What we offer', pt: 'O que oferecemos' },
  offerTitle: { en: 'A service for every moment', pt: 'Um serviço para cada momento' },
  offerSub: {
    en: 'Portraits, couples, families, weddings, business and much more — pick the category that fits you.',
    pt: 'Retratos, casais, famílias, casamentos, empresas e muito mais — escolha a categoria que lhe serve.',
  },
  offerViewAll: { en: 'All services', pt: 'Todos os serviços' },

  // Reviews
  reviewsEyebrow: { en: 'In their words', pt: 'Por palavras deles' },
  reviewsTitle: { en: 'Real stories, real shots', pt: 'Histórias reais, fotografias reais' },

  // FAQ
  faqTitle: { en: 'Frequently asked questions', pt: 'Perguntas frequentes' },

  // CTA
  ctaTitle: { en: 'Ready to start?', pt: 'Pronto para começar?' },
  ctaSub: {
    en: 'Tell us where and when, and we’ll match you with a local photographer. We reply within about 2 hours during the working day.',
    pt: 'Diga-nos onde e quando e encontramos um fotógrafo local. Respondemos em cerca de 2 horas, durante o dia útil.',
  },
  cta: { en: 'Check availability', pt: 'Ver disponibilidade' },
  ctaContact: { en: 'Talk to us', pt: 'Fale connosco' },
  breadcrumbHome: { en: 'Home', pt: 'Início' },
} satisfies Record<string, Localized>;

export interface Step {
  n: string;
  title: Localized;
  body: Localized;
}

export const STEPS: Step[] = [
  {
    n: '01',
    title: { en: 'Tell us where and when', pt: 'Diga-nos onde e quando' },
    body: {
      en: 'Pick a place, a session and a date. We confirm a photographer and the price in writing before you pay anything.',
      pt: 'Escolha o sítio, a sessão e a data. Confirmamos o fotógrafo e o preço por escrito antes de pagar o que quer que seja.',
    },
  },
  {
    n: '02',
    title: { en: 'Shoot with a local', pt: 'Fotografar com um local' },
    body: {
      en: 'A verified photographer guides you to the best spots, at the right hour, with natural posing.',
      pt: 'Um fotógrafo verificado leva-o aos melhores locais, à hora certa, com poses naturais.',
    },
  },
  {
    n: '03',
    title: { en: 'Get your gallery', pt: 'Receber a galeria' },
    body: {
      en: 'Edited photos in a private gallery — within 48–72 hours for most sessions. If it is not what was promised, you are refunded in full.',
      pt: 'Fotografias editadas numa galeria privada — em 48 a 72 horas na maioria das sessões. Se não for o que foi prometido, é reembolsado na totalidade.',
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
    title: { en: 'Total transparency', pt: 'Transparência total' },
    body: {
      en: 'The price you see is the price you pay. Locked at booking, with no hidden fees and no last-minute surprises.',
      pt: 'O preço que vê é o preço que paga. Fixado na reserva, sem custos escondidos nem surpresas de última hora.',
    },
  },
  {
    icon: '◎',
    title: { en: 'Vetted local talent', pt: 'Profissionais locais verificados' },
    body: {
      en: 'Every photographer is hand-picked and knows their place by heart: the light, the angles and the perfect timing.',
      pt: 'Cada fotógrafo é escolhido a dedo e conhece o seu sítio de cor: a luz, os ângulos e a hora certa.',
    },
  },
  {
    icon: '✦',
    title: { en: 'Quality that lasts', pt: 'Qualidade que dura' },
    body: {
      en: 'Carefully edited photos, delivered fast, made to be printed, shared and remembered.',
      pt: 'Fotografias editadas com cuidado, entregues depressa, feitas para imprimir, partilhar e recordar.',
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
    title: { en: 'Fast response', pt: 'Resposta rápida' },
    body: {
      en: 'We get back to you within 2 hours of your request.',
      pt: 'Respondemos no prazo de 2 horas após o seu pedido.',
    },
  },
  {
    stat: '€',
    title: { en: 'Fixed price', pt: 'Preço fixo' },
    body: { en: 'Locked at booking. Zero surprises.', pt: 'Fixado na reserva. Zero surpresas.' },
  },
  {
    stat: '48–72h',
    title: { en: 'Fast delivery', pt: 'Entrega rápida' },
    body: {
      en: 'Private gallery with edited photos in 48–72 hours for most sessions.',
      pt: 'Galeria privada com fotografias editadas em 48 a 72 horas na maioria das sessões.',
    },
  },
  {
    stat: '100%',
    title: { en: 'Money-back guarantee', pt: 'Garantia de reembolso' },
    body: { en: 'Gallery not what was promised? Full refund.', pt: 'A galeria não é o que foi prometido? Reembolso total.' },
  },
];

export interface AboutFaq {
  q: Localized;
  a: Localized;
}

export const ABOUT_FAQ: AboutFaq[] = [
  {
    q: {
      en: 'How do you choose your photographers?',
      pt: 'Como escolhem os fotógrafos?',
    },
    a: {
      en: 'We hand-pick local professionals, reviewing published work, experience and reviews. Only those who genuinely know the place and keep high standards join the network.',
      pt: 'Escolhemos a dedo profissionais locais, analisando o trabalho publicado, a experiência e as avaliações. Só entram na rede os que conhecem mesmo o sítio e mantêm um nível alto.',
    },
  },
  {
    q: { en: 'Is the price really fixed?', pt: 'O preço é mesmo fixo?' },
    a: {
      en: 'Yes. Each session has a “from” price that covers the listed duration, edited photos and delivery. Anything beyond that is quoted in writing before you book, and once confirmed the price does not move. No hidden costs.',
      pt: 'Sim. Cada sessão tem um preço “desde” que cobre a duração, as fotografias editadas e o prazo indicados. O que for além disso é orçamentado por escrito antes de reservar e, depois de confirmado, o preço não muda. Sem custos escondidos.',
    },
  },
  {
    q: { en: 'When do I get my photos?', pt: 'Quando recebo as fotografias?' },
    a: {
      en: 'Most sessions are delivered to a private gallery within 48–72 hours. Weddings and full-day events take longer, and each session lists its own turnaround.',
      pt: 'A maioria das sessões é entregue numa galeria privada em 48 a 72 horas. Casamentos e eventos de dia inteiro levam mais tempo, e cada sessão indica o seu prazo.',
    },
  },
  {
    q: { en: 'What if the gallery is not what was promised?', pt: 'E se a galeria não for o que foi prometido?' },
    a: {
      en: 'You are refunded in full. That is the guarantee, and it is on top of your statutory rights rather than instead of them.',
      pt: 'É reembolsado na totalidade. É essa a garantia, e acresce aos seus direitos legais em vez de os substituir.',
    },
  },
  {
    /*
     * This answer used to list Paris, Lyon, Provence, the Alps and the Normandy
     * coast — the previous country, published on a Portuguese site.
     */
    q: { en: 'Which places do you cover?', pt: 'Que sítios cobrem?' },
    a: {
      en: 'Twelve across Portugal: the cities where the work is mostly local — Lisboa, Porto, Cascais, Braga, Coimbra, Évora — and the destinations people travel to, from Sintra and the Algarve to Madeira, the Açores, the Douro and Comporta.',
      pt: 'Doze em todo o Portugal: as cidades onde o trabalho é sobretudo local — Lisboa, Porto, Cascais, Braga, Coimbra, Évora — e os destinos onde as pessoas viajam, de Sintra e do Algarve à Madeira, aos Açores, ao Douro e à Comporta.',
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
  en: 'About — Vetted Photographers in Portugal',
  pt: 'Sobre — fotógrafos verificados em Portugal',
};

export const META_DESCRIPTION: Localized = {
  en: 'How it works: local photographers vetted on published work, one fixed price agreed in writing, a private gallery in 48–72h, and a full refund if not.',
  pt: 'Como funciona: fotógrafos locais verificados pelo trabalho publicado, um preço fixo acordado por escrito, galeria privada em 48–72 h e reembolso total se não.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'Lisbon photographed by the network, which covers twelve places across Portugal',
  pt: 'Lisboa fotografada pela rede, que cobre doze sítios em todo o Portugal',
};

export const SEO_PROSE = {
  eyebrow: { en: 'How the network works', pt: 'Como funciona a rede' } as Localized,
  heading: {
    en: 'What is checked before a photographer joins',
    pt: 'O que se verifica antes de um fotógrafo entrar',
  } as Localized,
  paragraphs: {
    en: [
      'This is a booking network rather than a studio. Nobody is employed here and nobody is sent out from a head office; the people who answer already work professionally in the place you are going to be. What the network takes responsibility for is the part of a booking that usually goes wrong — the price, the schedule and the delivery.',
      'Admission turns on published work rather than on a portfolio assembled for the occasion. A portfolio shows what someone can do on their best day with unlimited time; published client work shows what they deliver on an ordinary one. The second is the useful question, and it is the harder one to fake.',
      'What is promised is deliberately narrow and easy to check. The price is agreed in writing before anything is booked and does not move. The number of edited photographs is stated per service. Most galleries arrive within forty-eight to seventy-two hours. If the weather turns, the session moves at no cost.',
      'If the work is not what was promised, it is refunded in full rather than argued about. That guarantee is the reason the vetting is strict: a network that pays for its own mistakes has to be careful about who it lets in.',
    ],
    pt: [
      'Isto é uma rede de reservas, não um estúdio. Ninguém aqui é empregado e ninguém é enviado a partir de uma sede; quem responde já trabalha profissionalmente no sítio onde vai estar. O que a rede assume é a parte de uma reserva que costuma correr mal — o preço, o horário e a entrega.',
      'A entrada depende do trabalho publicado e não de um portefólio montado para a ocasião. Um portefólio mostra o que alguém consegue fazer no melhor dia e com tempo ilimitado; o trabalho publicado para clientes mostra o que entrega num dia normal. A segunda é a pergunta útil, e é a mais difícil de falsear.',
      'O que se promete é propositadamente estreito e fácil de verificar. O preço é acordado por escrito antes de se reservar e não muda. O número de fotografias editadas está indicado em cada serviço. A maioria das galerias chega em quarenta e oito a setenta e duas horas. Se o tempo mudar, a sessão passa para outro dia sem custo.',
      'Se o trabalho não for o que foi prometido, é reembolsado na totalidade em vez de se discutir gosto. É essa garantia que obriga a selecção a ser exigente: uma rede que paga os próprios erros tem de ter cuidado com quem deixa entrar.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities & destinations', value: '12' },
      { label: 'Session types', value: '18' },
      { label: 'Most galleries', value: '48–72h' },
      { label: 'Refund guarantee', value: '100%' },
    ],
    pt: [
      { label: 'Cidades & destinos', value: '12' },
      { label: 'Tipos de sessão', value: '18' },
      { label: 'Maioria das galerias', value: '48–72h' },
      { label: 'Garantia de reembolso', value: '100%' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;
