import type { Localized } from './locales';

/**
 * What the business promises, said once.
 *
 * Every one of these used to exist in several versions that disagreed. The
 * reply time was "within minutes" on the booking form, "within 2 hours" on
 * the home page, "within a few hours" after the contact form and "instant" on
 * the contact page. The guarantee refunded you "if you are not satisfied" on
 * the About page and "if what you receive is not what was described" in the
 * Terms — two different promises, only one of them backed by the contract.
 * The price was "locked instantly" in one place and "personalised" in another.
 *
 * A reader who meets two versions of a promise believes neither. So each
 * promise lives here, worded to match the Terms (`src/lib/legal.ts`), and
 * pages import it rather than paraphrasing it. Changing a policy is then a
 * change to this file and to the Terms, and nothing else.
 *
 * Deliberately free of catalogue imports: client components (the booking
 * flow) read these strings, and importing the catalogue here would ship all
 * of it to the browser. Counts derived from the catalogue are in
 * `catalog.ts` (`trustStats`).
 */

/** The reply-time commitment, as a sentence. */
export const REPLY_TIME: Localized = {
  en: 'We reply within about 2 hours during the working day.',
  pt: 'Respondemos em cerca de 2 horas, durante o dia útil.',
};

/** The same commitment as a stat tile: value and label. */
export const REPLY_TIME_STAT = {
  value: { en: '~2h', pt: '~2h' } as Localized,
  label: { en: 'Reply time, working day', pt: 'Tempo de resposta, dia útil' } as Localized,
};

/** Gallery turnaround for the typical session. Per-service values are on each service. */
export const DELIVERY_TYPICAL = {
  value: { en: '48–72h', pt: '48–72h' } as Localized,
  label: { en: 'Delivery for most sessions', pt: 'Entrega na maioria das sessões' } as Localized,
  sentence: {
    en: 'Most galleries are delivered within 48–72 hours; weddings and full-day events take longer, and each session lists its own turnaround.',
    pt: 'A maioria das galerias é entregue em 48 a 72 horas; casamentos e eventos de dia inteiro levam mais tempo, e cada sessão indica o seu prazo.',
  } as Localized,
};

/**
 * The money-back guarantee — conformity-based, as the Terms state it.
 * It is not a satisfaction guarantee and must not be worded as one.
 */
export const GUARANTEE = {
  title: { en: '100% money-back guarantee', pt: 'Garantia de reembolso a 100%' } as Localized,
  body: {
    en: 'If your gallery is not what was promised, you are refunded in full. This is on top of your statutory rights, not instead of them.',
    pt: 'Se a galeria não for o que foi prometido, é reembolsado na totalidade. Isto acresce aos seus direitos legais, não os substitui.',
  } as Localized,
};

/** Weather rescheduling, as the Terms state it. */
export const WEATHER = {
  title: { en: 'Free weather rescheduling', pt: 'Remarcação gratuita por mau tempo' } as Localized,
  body: {
    en: 'If the weather makes the session unworkable, it moves to another slot or another day at no cost. If you are only in town briefly, we switch to sheltered locations scouted in advance.',
    pt: 'Se o tempo tornar a sessão impraticável, passa para outra hora ou outro dia sem custo. Se estiver cá por pouco tempo, mudamos para locais abrigados escolhidos com antecedência.',
  } as Localized,
};

/** What a "from" price means. Shown wherever a "from" price is. */
export const FROM_PRICE = {
  title: { en: 'What “from” means', pt: 'O que quer dizer “desde”' } as Localized,
  body: {
    en: 'A “from” price covers exactly the session length, the number of edited photos and the delivery time listed with it. Anything beyond that — extra time, a second photographer, express delivery — is quoted in writing before you pay anything.',
    pt: 'Um preço “desde” cobre exatamente a duração, o número de fotografias editadas e o prazo de entrega indicados. Tudo o que for além disso — mais tempo, um segundo fotógrafo, entrega expresso — é orçamentado por escrito antes de pagar o que quer que seja.',
  } as Localized,
  noHiddenFees: {
    en: 'No hidden fees. Your final price is confirmed before booking.',
    pt: 'Sem custos escondidos. O preço final é confirmado antes de reservar.',
  } as Localized,
};

/** What happens when someone checks availability. */
export const MATCHING = {
  promise: {
    en: 'We’ll match you with a suitable local photographer and confirm availability and price.',
    pt: 'Encontramos um fotógrafo local adequado e confirmamos a disponibilidade e o preço.',
  } as Localized,
  noPayment: {
    en: 'No payment now. Checking availability commits you to nothing.',
    pt: 'Sem pagamento agora. Ver disponibilidade não o compromete a nada.',
  } as Localized,
};

/**
 * What every session includes, for checklists. Each line is a policy stated
 * above or in the Terms; nothing here may be added without adding it there.
 */
export const INCLUDED: Localized<string[]> = {
  en: [
    'Local professional photographer',
    'Clear price, confirmed before you pay',
    'Professional editing',
    'Private online gallery',
    'Free weather rescheduling',
    'Money-back guarantee',
  ],
  pt: [
    'Fotógrafo profissional local',
    'Preço claro, confirmado antes de pagar',
    'Edição profissional',
    'Galeria privada online',
    'Remarcação gratuita por mau tempo',
    'Garantia de reembolso',
  ],
};
