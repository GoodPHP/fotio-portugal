import { tx, type Locale, type Localized } from '@/lib/locales';
import { SITE_NAME, formatDuration, formatPhotoCount, formatPrice } from '@/lib/site';
import { CITIES, localizedCityName, servicesFor } from '@/lib/catalog';
import { DELIVERY_TYPICAL, FROM_PRICE, REPLY_TIME, WEATHER } from '@/lib/promises';

/**
 * Search-facing copy for the home page: the SERP title and description, and the
 * long-form editorial passage that closes the page.
 *
 * Kept out of `page.tsx` for the same reason the About page keeps its own
 * content module — the layout file should not double as a copy deck. The hero
 * strings stay in `messages/*.json` because the header renders them through
 * `next-intl`; everything here is authored prose that no translation pipeline
 * touches.
 *
 * Both languages are authored rather than translated: the English reader is
 * coming to Portugal and the Portuguese reader lives here, and the two pages
 * are selling different things.
 */

/**
 * ≤60 chars, brand included.
 *
 * Every other page lets the layout's `%s | <brand>` template append the brand,
 * but a template does not apply to the page in the same segment as the layout
 * that declares it — so the home page carries the brand itself, and
 * `buildMetadata` recognises it and does not add a second one.
 */
export const META_TITLE: Localized = {
  en: `Book a Photographer in Portugal | ${SITE_NAME}`,
  pt: `Fotógrafo em Portugal — 12 cidades | ${SITE_NAME}`,
};

/** 150–160 chars: what it is, what it costs, why click. */
export const META_DESCRIPTION: Localized = {
  en: 'Book a professional local photographer in 12 places across Portugal. Clear prices confirmed before you book, and most galleries delivered in 48–72h.',
  pt: 'Reserve um fotógrafo profissional local em 12 sítios de Portugal. Preços claros confirmados antes de reservar e a maioria das galerias em 48–72 h.',
};

export const OG_IMAGE_ALT: Localized = {
  en: 'A photographer’s frame from Lisbon, one of the twelve places covered across Portugal',
  pt: 'Uma fotografia em Lisboa, um dos doze sítios cobertos em todo o Portugal',
};

export const SEO_PROSE = {
  eyebrow: { en: 'Why book this way', pt: 'Porquê reservar assim' } as Localized,
  heading: {
    en: 'Photography in Portugal, booked in the sensible order',
    pt: 'Fotografia em Portugal, reservada pela ordem certa',
  } as Localized,
  paragraphs: {
    en: [
      'Hiring a photographer in a country you are only visiting usually means a week of email, a quote that arrives last, and a portfolio you have no way to verify. This inverts that order. You choose the place and the kind of session, you see the price before you commit to anything, and the photographer who answers already lives and works where you will be standing.',
      'Twelve places are covered: Lisboa, Porto, Sintra, Cascais, Braga, Coimbra and Évora, alongside the Algarve, Madeira, the Açores, the Douro and Comporta. Three of those are not cities at all, which is deliberate — the Algarve is one coastline photographed by the same people on the same mornings, and Madeira is an island whose best hour is at eighteen hundred metres rather than in Funchal.',
      'What a local photographer knows that a visiting one does not is the hour. Lisbon’s miradouros face north-east and hold light until about nine, then go flat; Porto’s Ribeira is in shadow all morning and only lights at the end of the day; an Algarve cove that is a beach at low tide is under water at high. None of that is findable in advance and all of it decides whether a session works.',
      'Sessions run from a thirty-minute base session — €250, fifteen to twenty edited photographs — to a full wedding day, and take in couples, families, maternity, graduations, corporate work, property and food. The fee is agreed in writing beforehand, covers the editing, and includes a private gallery — delivered within forty-eight to seventy-two hours for most sessions. Nothing is billed per extra photograph. If the weather turns, the session moves at no cost.',
    ],
    pt: [
      'Contratar um fotógrafo costuma ser uma semana de e-mails, um orçamento que chega em último lugar e um portefólio que não há maneira de verificar. Aqui a ordem é a inversa: escolhe o sítio e o tipo de sessão, vê o preço antes de se comprometer com o que quer que seja, e quem lhe responde já vive e trabalha onde a sessão vai acontecer.',
      'São doze sítios: Lisboa, Porto, Sintra, Cascais, Braga, Coimbra e Évora, mais o Algarve, a Madeira, os Açores, o Douro e a Comporta. Três deles não são cidades, e isso é de propósito — o Algarve é uma costa só, fotografada pelas mesmas pessoas nas mesmas manhãs, e na Madeira a melhor hora está a mil e oitocentos metros e não no Funchal.',
      'O que um fotógrafo local sabe e um fotógrafo de fora não sabe é a hora. Os miradouros de Lisboa estão virados a nordeste e aguentam luz até cerca das nove, depois achatam; a Ribeira do Porto está à sombra toda a manhã e só acende ao fim do dia; uma praia do Algarve que existe com maré baixa está debaixo de água com maré cheia. Nada disso se descobre de antemão e tudo isso decide se a sessão resulta.',
      'As sessões vão de uma sessão base de trinta minutos — 250 €, quinze a vinte fotografias editadas — a um dia inteiro de casamento, e passam por casais, famílias, gravidez, finalistas, trabalho de empresa, imobiliário e gastronomia. O valor é acordado por escrito antes, cobre a edição e inclui uma galeria privada — entregue em quarenta e oito a setenta e duas horas na maioria das sessões. Não se cobra por fotografia extra. Se o tempo mudar, a sessão muda sem custo.',
    ],
  } as Localized<string[]>,
  facts: {
    en: [
      { label: 'Cities covered', value: '12' },
      { label: 'Session types', value: '18' },
      { label: 'Most galleries', value: '48–72h' },
      { label: 'Deposit to enquire', value: '€0' },
    ],
    pt: [
      { label: 'Cidades cobertas', value: '12' },
      { label: 'Tipos de sessão', value: '18' },
      { label: 'Maioria das galerias', value: '48–72h' },
      { label: 'Sinal para orçamento', value: '0 €' },
    ],
  } as Localized<{ label: string; value: string }[]>,
} as const;

// ---------------------------------------------------------------------------
// The home page FAQ.
//
// Every answer is either computed from the catalogue — prices, photo counts,
// the list of places — or quoted from `promises.ts`, which is worded to match
// the Terms. Where the business has no written policy (how far ahead to book)
// the answer describes the process instead of inventing a rule.
// ---------------------------------------------------------------------------

export function homeFaqs(locale: Locale): { question: string; answer: string }[] {
  const services = servicesFor(locale);
  const byId = (id: string) => services.find((s) => s.slug === id);
  const price = (id: string) => {
    const s = byId(id);
    return s ? formatPrice(s.initialPrice, locale) : '';
  };
  const cheapest = Math.min(...services.map((s) => s.initialPrice));
  const places = CITIES.map((c) => localizedCityName(c, locale));
  const placeList = `${places.slice(0, -1).join(', ')} ${locale === 'pt' ? 'e' : 'and'} ${places[places.length - 1]}`;
  const wedding = byId('wedding');
  const elopement = byId('elopement');
  const proposal = byId('proposal');
  const couple = byId('couple');

  const en: { question: string; answer: string }[] = [
    {
      question: 'How much does a photography session cost?',
      answer: `Sessions start from ${formatPrice(cheapest, 'en')} for ${couple ? formatDuration(couple.durationMinutes, 'en') : '30 min'} with ${couple ? formatPhotoCount(couple) : ''} edited photos — couples, families, proposals, portraits and more. Longer sessions are quoted on request, and weddings start from ${price('wedding')}. ${tx(FROM_PRICE.body, 'en')}`,
    },
    {
      question: 'How far in advance should I book?',
      answer: `As early as you know your dates — popular weekends and wedding days are the first to go. Send your dates and we confirm who is available. ${tx(REPLY_TIME, 'en')}`,
    },
    {
      question: 'Can I choose my photographer?',
      answer:
        'Tell us any preference when you check availability — a language, a style or a specific photographer — and we match you with it wherever we can. You are told who will photograph you before you confirm anything.',
    },
    { question: 'What happens if it rains?', answer: tx(WEATHER.body, 'en') },
    { question: 'How quickly will I receive my photos?', answer: tx(DELIVERY_TYPICAL.sentence, 'en') },
    {
      question: 'How many edited photos are included?',
      answer: `Every session states its number: ${couple ? formatPhotoCount(couple) : ''} in the 30-minute base session, ${wedding?.editedPhotos} on a wedding day. More photos come with a longer session, quoted on request. There is no per-image charge and no retouching sold separately afterwards.`,
    },
    {
      question: 'Can I request a specific location?',
      answer:
        'Yes — tell us where when you check availability. Each destination page lists the spots our photographers use most, with the best time of day and whether a permit is needed.',
    },
    {
      question: 'Can I book a proposal?',
      answer: proposal
        ? `Yes. ${tx(proposal.description ?? { en: '' }, 'en')} Proposal sessions are from ${price('proposal')} for ${proposal.durationMinutes} minutes, with ${formatPhotoCount(proposal)} edited photos.`
        : 'Yes — tell us where and when, and we plan it with you.',
    },
    { question: 'Can I book a photographer outside Lisbon?', answer: `Yes. We cover ${places.length} places across Portugal: ${placeList}.` },
    {
      question: 'What happens after I submit the booking request?',
      answer: `We check which local photographers are free on your date and reply with a photographer and a confirmed price. ${tx(REPLY_TIME, 'en')} Nothing is paid until you confirm.`,
    },
    {
      question: 'Do you offer wedding photography?',
      answer: wedding
        ? `Yes. Full wedding coverage is from ${price('wedding')} (${formatDuration(wedding.durationMinutes, 'en')}, ${wedding.editedPhotos} edited photos)${elopement ? `, and intimate elopements from ${price('elopement')}` : ''}${byId('destination-wedding') ? `. Destination weddings are from ${price('destination-wedding')}` : ''}.`
        : 'Yes — tell us your date and place.',
    },
    {
      question: 'Can I book through WhatsApp?',
      answer:
        'Yes. Chat with us on WhatsApp and tell us where, when and what kind of session. The availability form is simply the quickest way to give us all of that at once.',
    },
  ];

  const pt: { question: string; answer: string }[] = [
    {
      question: 'Quanto custa uma sessão fotográfica?',
      answer: `As sessões começam em ${formatPrice(cheapest, 'pt')}, com ${couple ? formatDuration(couple.durationMinutes, 'pt') : '30 min'} e ${couple ? formatPhotoCount(couple) : ''} fotografias editadas — casais, famílias, pedidos, retratos e mais. Sessões mais longas são orçamentadas a pedido, e os casamentos começam em ${price('wedding')}. ${tx(FROM_PRICE.body, 'pt')}`,
    },
    {
      question: 'Com quanta antecedência devo reservar?',
      answer: `Assim que souber as datas — os fins de semana mais procurados e os dias de casamento são os primeiros a esgotar. Envie-nos as datas e confirmamos quem está disponível. ${tx(REPLY_TIME, 'pt')}`,
    },
    {
      question: 'Posso escolher o fotógrafo?',
      answer:
        'Indique qualquer preferência quando pedir disponibilidade — uma língua, um estilo ou um fotógrafo em particular — e respeitamo-la sempre que possível. Fica a saber quem o vai fotografar antes de confirmar o que quer que seja.',
    },
    { question: 'E se chover?', answer: tx(WEATHER.body, 'pt') },
    { question: 'Em quanto tempo recebo as fotografias?', answer: tx(DELIVERY_TYPICAL.sentence, 'pt') },
    {
      question: 'Quantas fotografias editadas estão incluídas?',
      answer: `Cada sessão indica o número: ${couple ? formatPhotoCount(couple) : ''} na sessão base de 30 minutos, ${wedding?.editedPhotos} num dia de casamento. Mais fotografias vêm com uma sessão mais longa, orçamentada a pedido. Não se cobra por fotografia nem se vende retoque à parte depois.`,
    },
    {
      question: 'Posso pedir um local específico?',
      answer:
        'Sim — diga-nos onde quando pedir disponibilidade. Cada página de destino indica os locais que os nossos fotógrafos mais usam, a melhor hora do dia e se é preciso autorização.',
    },
    {
      question: 'Posso reservar um pedido de casamento?',
      answer: proposal
        ? `Sim. ${tx(proposal.description ?? { en: '' }, 'pt')} Os pedidos de casamento custam desde ${price('proposal')}, com ${proposal.durationMinutes} minutos e ${formatPhotoCount(proposal)} fotografias editadas.`
        : 'Sim — diga-nos onde e quando e planeamos consigo.',
    },
    { question: 'Posso reservar um fotógrafo fora de Lisboa?', answer: `Sim. Cobrimos ${places.length} sítios em Portugal: ${placeList}.` },
    {
      question: 'O que acontece depois de enviar o pedido?',
      answer: `Verificamos que fotógrafos locais estão livres na sua data e respondemos com um fotógrafo e um preço confirmado. ${tx(REPLY_TIME, 'pt')} Não paga nada até confirmar.`,
    },
    {
      question: 'Fazem fotografia de casamento?',
      answer: wedding
        ? `Sim. A cobertura completa de casamento custa desde ${price('wedding')} (${formatDuration(wedding.durationMinutes, 'pt')}, ${wedding.editedPhotos} fotografias editadas)${elopement ? `, e os casamentos íntimos desde ${price('elopement')}` : ''}.`
        : 'Sim — diga-nos a data e o sítio.',
    },
    {
      question: 'Posso reservar pelo WhatsApp?',
      answer:
        'Sim. Fale connosco no WhatsApp e diga-nos onde, quando e que tipo de sessão. O formulário de disponibilidade é apenas a forma mais rápida de nos dar tudo isso de uma vez.',
    },
  ];

  return locale === 'pt' ? pt : en;
}
