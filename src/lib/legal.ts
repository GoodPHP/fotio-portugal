import type { Localized } from './locales';

/**
 * The legal pages.
 *
 * Mentions légales are required of any French commercial site by the LCEN, and
 * a privacy notice by the GDPR. The image-rights page is not required by
 * anything, but a photography business that does not explain the difference
 * between the photographer's copyright and the subject's right to their own
 * image will be asked about it in every second enquiry.
 *
 * Every TODO_ below is a real company detail nobody but the operator can
 * supply. They are left visible on purpose: a placeholder that looks like a
 * placeholder gets filled in, and one that looks like plausible text does not.
 *
 * Bodies use the Markdown subset in `src/lib/article.ts`.
 */
export interface LegalDoc {
  /** Route key suffix and physical folder name. */
  slug: LegalSlug;
  title: Localized;
  description: Localized;
  body: Localized;
  /** Legal boilerplate has no business competing for search traffic. */
  noindex: boolean;
}

export type LegalSlug = 'notice' | 'privacy' | 'terms' | 'image-rights' | 'photo-credits';

export const LEGAL_DOCS: Record<LegalSlug, LegalDoc> = {
  notice: {
    slug: 'notice',
    noindex: true,
    title: { en: 'Legal notice', pt: 'PT_TODO: Legal notice' },
    description: {
      en: 'Publisher, legal form, SIRET, publication director and host, as required by the LCEN.',
      pt: 'PT_TODO: Publisher, legal form, SIRET, publication director and host,',
    },
    body: {
      en: `## Publisher

Name: TODO_BRAND
Legal form: TODO_ENTITY
SIRET: TODO_SIRET
APE code: 7420Z — photographic activities
Publication director: TODO_DIRECTOR
Contact: TODO_EMAIL

## Host

Name: TODO_HOST
Address: TODO_HOST_ADDRESS

Article 6 III of the LCEN requires the name **and** the address of the host, not its trading name alone.

## VAT

TODO_VAT_STATUS. Where the publisher is not liable for VAT, invoices carry the statement "TVA non applicable, article 293 B du CGI".

## Intellectual property

Every photograph on this site is the work of its author and is protected by copyright. Nothing here may be reproduced, extracted or reused without written authorisation, including for a portfolio or a social media post.

## Reporting

To report unlawful content, write to TODO_EMAIL with the URL concerned and the reason. We answer within seven days.`,
      pt: 'PT_TODO: ## Publisher Name: TODO_BRAND Legal form: TODO_ENTITY SIRET:',
    },
  },

  privacy: {
    slug: 'privacy',
    noindex: true,
    title: { en: 'Privacy', pt: 'PT_TODO: Privacy' },
    description: {
      en: 'What the enquiry form collects, how long it is kept, who sees it, and how to have it deleted.',
      pt: 'PT_TODO: What the enquiry form collects, how long it is kept, who see',
    },
    body: {
      en: `## Controller

TODO_BRAND, TODO_ENTITY, SIRET TODO_SIRET. Contact: TODO_EMAIL.

## What is collected

**The enquiry form.** Type of session, city, intended date, your name, telephone number, email address and whatever you write in the message field. Only a means of contact is genuinely necessary; the rest exists so the quote you receive is a real one rather than a range.

**Analytics.** Page viewed, referrer, and a coarse description of browser and operating system. No advertising identifiers.

## What is not collected

No advertising or profiling cookie is set. That is why there is no consent banner: there is nothing to consent to.

## Where it goes

Enquiries are delivered to the business as a message on Telegram, and are not sold, rented or shared with any third party for their own purposes.

## How long it is kept

An enquiry that does not become a booking is deleted after **three years**. Accounting records attached to a booking are kept for **ten years**, which is the retention French commercial law requires and not a choice we make.

## Your rights

You may ask for a copy of your data, its correction, or its deletion, by writing to TODO_EMAIL. We answer within one month. If the answer does not satisfy you, you may complain to the CNIL, which is the French supervisory authority.`,
      pt: 'PT_TODO: ## Controller TODO_BRAND, TODO_ENTITY, SIRET TODO_SIRET. Con',
    },
  },

  terms: {
    slug: 'terms',
    noindex: true,
    title: { en: 'Terms of sale', pt: 'PT_TODO: Terms of sale' },
    description: {
      en: 'Quotes, deposit, cancellation, delivery, and what happens when the weather makes a session impossible.',
      pt: 'PT_TODO: Quotes, deposit, cancellation, delivery, and what happens wh',
    },
    body: {
      en: `> **To be reviewed by a lawyer before going live.** This text is written in good faith from the framework applicable to services, but the withdrawal clause in particular must be validated by a legal professional before any commercial use.

## Purpose

These terms govern photography services provided by the site's publisher to a client, private or professional. They are accepted by signing the quote or by paying the deposit.

## Quotes and prices

Every service is quoted in writing, stating the nature of the session, its duration, the place, the date, the options chosen and the price. The quoted price is firm. Amounts owed to third parties — venue hire, shooting permits, transport, tickets — are not the publisher's prices and are re-invoiced at cost, with evidence.

## Deposit and balance

A deposit of 30% of the total is paid on booking and secures the date. The balance falls due on delivery of the gallery.

## Cancellation and postponement

If the client cancels, the deposit is retained as compensation for the date held. A postponement requested more than 30 days ahead is free of charge and once only.

If the publisher cancels, the deposit is refunded in full.

## Weather

For an outdoor session, either party may propose a postponement up to 24 hours beforehand where conditions make the agreed shoot impossible. Rain alone is not such a condition; sustained wind, storm or a flood alert is.

## Delivery

The gallery is delivered within the time stated on the quote, counted from the date of the session. It stays online for at least six months.

## Withdrawal

For a service booked at a distance on a fixed date, the right of withdrawal does not apply under article L221-28 of the Consumer Code. TODO_LEGAL_REVIEW.

## Disputes

In the event of a dispute, the parties will seek an amicable settlement before any legal action. A consumer may use the mediator TODO_MEDIATOR free of charge.`,
      pt: 'PT_TODO: > **To be reviewed by a lawyer before going live.** This tex',
    },
  },

  'image-rights': {
    slug: 'image-rights',
    noindex: true,
    title: { en: 'Image rights', pt: 'PT_TODO: Image rights' },
    description: {
      en: 'The photographer’s copyright and your right to your own image are two different things. What each of them means for your photographs.',
      pt: 'PT_TODO: The photographer’s copyright and your right to your own imag',
    },
    body: {
      en: `## Two separate rights

There is the photographer's copyright in the images, and there is each person's right to their own image. Both exist at once and neither replaces the other: the photographer may not publish a photograph you appear in without your agreement, and you may not reuse it without limit merely because you commissioned it.

That is why every booking comes with two documents: a licence of use, which allows you to use the images, and a release, which may allow us to show them.

## What you receive

For a private session — family, couple, maternity, wedding — you receive a personal right of use with no time limit: printing, albums, sharing with the people you know, posting on your own accounts. It does not cover commercial use or resale of the files.

For professional work — team portraits, events, product, property — the scope is set out in the quote: which media, for how long, in which territory. We prefer a precise and complete licence to a vague formula that would cause a problem the day you want to use an image somewhere else.

In both cases the author keeps the moral right: authorship, and the integrity of the work. In practice, a crop or a retouch that changes the meaning of an image requires agreement.

## Showing your photographs

We show nothing without a written release. Refusing costs nothing and changes neither the price nor the service. A release given can be withdrawn later by writing to TODO_EMAIL, and we remove the images from our own channels within seven days.

## Children

For anyone under 18, the release is signed by every person holding parental authority. A school or association session follows the same rule, collected before the session rather than on the day.

## Photographs taken in public

A person recognisably photographed in a public place still holds a right to their own image. Where a session unavoidably includes passers-by, they are not the subject of the frame and are not identifiable in it, or the frame is not used.`,
      pt: 'PT_TODO: ## Two separate rights There is the photographer\'s copyright',
    },
  },

  'photo-credits': {
    slug: 'photo-credits',
    noindex: true,
    title: { en: 'Photo credits', pt: 'PT_TODO: Photo credits' },
    description: {
      en: 'Where the photographs on this site come from, and who made them.',
      pt: 'PT_TODO: Where the photographs on this site come from, and who made t',
    },
    body: {
      en: `## Photographs of sessions

Every session photograph on this site was made by a photographer in the network and is published with the written agreement of the people appearing in it. Where no release was given, the photograph is not here — which is why some services show fewer frames than others.

## City photographs

Ten cities — Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes, Strasbourg and Montpellier — are illustrated with photographs made for this site.

The remaining twelve destinations, and the session photographs throughout the service pages, are licensed from Unsplash. Every one is credited to its photographer in \`public/images/credits.json\`, with a link to their profile and to the original, as the Unsplash licence requires.

## Reuse

None of these photographs may be reproduced, extracted or reused without written authorisation. To request it, write to TODO_EMAIL.`,
      pt: 'PT_TODO: ## Photographs of sessions Every session photograph on this',
    },
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS) as LegalSlug[];
