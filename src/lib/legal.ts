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
    title: { en: 'Legal notice', fr: 'Mentions légales' },
    description: {
      en: 'Publisher, legal form, SIRET, publication director and host, as required by the LCEN.',
      fr: 'Éditeur, forme juridique, SIRET, directeur de la publication et hébergeur, conformément à la LCEN.',
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
      fr: `## Éditeur du site

Dénomination : TODO_BRAND
Forme juridique : TODO_ENTITY
Numéro SIRET : TODO_SIRET
Code APE : 7420Z — activités photographiques
Directeur de la publication : TODO_DIRECTEUR
Contact : TODO_EMAIL

## Hébergeur

Nom : TODO_HOST
Adresse : TODO_HOST_ADRESSE

L'article 6 III de la loi pour la confiance dans l'économie numérique impose la mention du nom **et** de l'adresse de l'hébergeur, et non de son seul nom commercial.

## Régime de TVA

TODO_STATUT_TVA. Lorsque l'éditeur n'est pas assujetti, les factures portent la mention « TVA non applicable, article 293 B du CGI ».

## Propriété intellectuelle

Chaque photographie présente sur ce site est l'œuvre de son auteur et protégée par le droit d'auteur. Rien ne peut en être reproduit, extrait ou réutilisé sans autorisation écrite, y compris pour un portfolio ou une publication sur un réseau social.

## Signalement

Pour signaler un contenu illicite, écrivez à TODO_EMAIL en indiquant l'adresse concernée et le motif. Nous répondons sous sept jours.`,
    },
  },

  privacy: {
    slug: 'privacy',
    noindex: true,
    title: { en: 'Privacy', fr: 'Confidentialité' },
    description: {
      en: 'What the enquiry form collects, how long it is kept, who sees it, and how to have it deleted.',
      fr: 'Ce que collecte le formulaire, la durée de conservation, qui y a accès, et comment demander la suppression.',
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
      fr: `## Responsable du traitement

TODO_BRAND, TODO_ENTITY, SIRET TODO_SIRET. Contact : TODO_EMAIL.

## Données collectées

**Le formulaire de demande.** Type de séance, ville, date envisagée, prénom, téléphone, adresse électronique et le message que vous rédigez. Seul un moyen de contact est réellement nécessaire ; le reste sert à ce que le devis reçu soit un vrai devis plutôt qu'une fourchette.

**Mesure d'audience.** Page consultée, référent, et une description sommaire du navigateur et du système d'exploitation. Aucun identifiant publicitaire.

## Ce que nous ne collectons pas

Aucun cookie publicitaire ni de profilage n'est déposé. C'est la raison pour laquelle vous ne voyez pas de bandeau de consentement : il n'y a rien à consentir.

## Destinataires

Les demandes sont transmises à l'entreprise sous forme de message Telegram. Elles ne sont ni vendues, ni louées, ni transmises à un tiers pour son propre compte.

## Durées de conservation

Une demande qui n'aboutit pas à une réservation est supprimée au bout de **trois ans**. Les pièces comptables rattachées à une prestation sont conservées **dix ans**, durée imposée par le code de commerce et non choisie par nous.

## Vos droits

Vous pouvez demander une copie de vos données, leur rectification ou leur suppression en écrivant à TODO_EMAIL. Nous répondons sous un mois. Si la réponse ne vous satisfait pas, vous pouvez saisir la CNIL.`,
    },
  },

  terms: {
    slug: 'terms',
    noindex: true,
    title: { en: 'Terms of sale', fr: 'Conditions générales de vente' },
    description: {
      en: 'Quotes, deposit, cancellation, delivery, and what happens when the weather makes a session impossible.',
      fr: 'Devis, acompte, annulation, livraison, et ce qui se passe quand la météo rend une séance impossible.',
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
      fr: `> **À faire relire par un juriste avant mise en production.** Ce texte est rédigé de bonne foi à partir du cadre applicable aux prestations de service, mais la clause de rétractation ci-dessous en particulier doit être validée par un professionnel du droit avant toute utilisation commerciale.

## Objet

Les présentes conditions régissent les prestations de photographie réalisées par l'éditeur du site pour un client, particulier ou professionnel. Elles sont acceptées par la signature du devis ou par le versement de l'acompte.

## Devis et prix

Chaque prestation fait l'objet d'un devis écrit reprenant la nature de la séance, sa durée, le lieu, la date, les options retenues et le prix. Le prix indiqué au devis est ferme. Les montants dus à des tiers — location de lieu, autorisation de prise de vue, transport, billetterie — ne sont pas des prix de l'éditeur et sont refacturés au réel, justificatif à l'appui.

## Acompte et solde

Un acompte de 30 % du montant total est versé à la réservation et vaut blocage de la date. Le solde est exigible à la livraison de la galerie.

## Annulation et report

En cas d'annulation par le client, l'acompte reste acquis à l'éditeur au titre de la date immobilisée. Un report demandé plus de 30 jours à l'avance est gratuit et possible une fois.

En cas d'annulation par l'éditeur, l'acompte est intégralement remboursé.

## Météo

Pour une séance en extérieur, chaque partie peut proposer un report jusqu'à 24 heures avant lorsque les conditions rendent la prise de vue prévue impossible. La pluie seule n'en fait pas partie ; le vent soutenu, l'orage ou une alerte de crue, si.

## Livraison

La galerie est livrée dans le délai indiqué au devis, décompté à partir de la date de la séance. Elle reste en ligne au moins six mois.

## Droit de rétractation

Pour une prestation de service réservée à distance à une date déterminée, le droit de rétractation ne s'applique pas, en application de l'article L221-28 du code de la consommation. TODO_RELECTURE_JURIDIQUE.

## Litiges

En cas de litige, les parties rechercheront une solution amiable avant toute action judiciaire. Un consommateur peut recourir gratuitement au médiateur TODO_MEDIATEUR.`,
    },
  },

  'image-rights': {
    slug: 'image-rights',
    noindex: true,
    title: { en: 'Image rights', fr: 'Droit à l’image' },
    description: {
      en: 'The photographer’s copyright and your right to your own image are two different things. What each of them means for your photographs.',
      fr: 'Le droit d’auteur du photographe et votre droit sur votre image sont deux choses différentes. Ce que chacun implique pour vos photographies.',
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
      fr: `## Deux droits distincts

Il y a d'un côté le droit d'auteur du photographe sur ses images, et de l'autre le droit de chaque personne sur son image. Les deux existent en même temps et ne se remplacent pas : le photographe ne peut pas diffuser librement une photographie où vous apparaissez, et vous ne pouvez pas la réutiliser sans limite du seul fait de l'avoir commandée.

C'est pour cette raison qu'une prestation s'accompagne toujours de deux documents : une cession de droits d'usage, qui vous autorise à utiliser les images, et une autorisation de diffusion, qui nous autorise éventuellement à les montrer.

## Ce que vous recevez

Pour une séance privée — famille, couple, grossesse, mariage — vous recevez un droit d'usage personnel, sans limitation de durée : impression, album, partage avec vos proches, publication sur vos propres réseaux. Ce droit ne couvre pas un usage commercial ni la revente des fichiers.

Pour une prestation professionnelle — portrait d'équipe, événement, produit, immobilier — l'étendue est définie dans le devis : supports concernés, durée, territoire. Nous préférons une cession précise et complète à une formule vague qui poserait problème le jour où vous voudrez utiliser une image ailleurs.

Dans les deux cas, l'auteur conserve son droit moral : la paternité de l'image et le respect de son intégrité. Concrètement, un recadrage ou une retouche qui change le sens d'une image demande un accord.

## Diffusion de vos photographies

Nous ne diffusons rien sans autorisation écrite. Refuser ne coûte rien et ne change ni le prix ni la prestation. Une autorisation donnée peut être retirée ensuite en écrivant à TODO_EMAIL : nous retirons les images de nos propres supports sous sept jours.

## Mineurs

Pour toute personne de moins de 18 ans, l'autorisation est signée par chaque titulaire de l'autorité parentale. Une séance scolaire ou associative suit la même règle, recueillie avant la séance et non le jour même.

## Photographies prises en public

Une personne reconnaissable photographiée dans un lieu public conserve un droit sur son image. Lorsqu'une séance comporte inévitablement des passants, ceux-ci ne sont pas le sujet du cadre et n'y sont pas identifiables, ou le cadre n'est pas utilisé.`,
    },
  },

  'photo-credits': {
    slug: 'photo-credits',
    noindex: true,
    title: { en: 'Photo credits', fr: 'Crédits photos' },
    description: {
      en: 'Where the photographs on this site come from, and who made them.',
      fr: 'D’où viennent les photographies de ce site, et qui les a réalisées.',
    },
    body: {
      en: `## Photographs of sessions

Every session photograph on this site was made by a photographer in the network and is published with the written agreement of the people appearing in it. Where no release was given, the photograph is not here — which is why some services show fewer frames than others.

## City photographs

Ten cities — Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes, Strasbourg and Montpellier — are illustrated with photographs made for this site.

The remaining twelve destinations, and the session photographs throughout the service pages, are licensed from Unsplash. Every one is credited to its photographer in \`public/images/credits.json\`, with a link to their profile and to the original, as the Unsplash licence requires.

## Reuse

None of these photographs may be reproduced, extracted or reused without written authorisation. To request it, write to TODO_EMAIL.`,
      fr: `## Photographies de séances

Chaque photographie de séance présente sur ce site a été réalisée par un photographe du réseau et est publiée avec l'accord écrit des personnes qui y figurent. En l'absence d'autorisation, la photographie n'y est pas — c'est la raison pour laquelle certaines prestations montrent moins d'images que d'autres.

## Photographies de villes

Dix villes — Paris, Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes, Strasbourg et Montpellier — sont illustrées par des photographies réalisées pour ce site.

Les douze autres destinations, ainsi que les photographies de séances présentes sur les pages de prestations, sont sous licence Unsplash. Chacune est créditée à son auteur dans \`public/images/credits.json\`, avec un lien vers son profil et vers l'original, comme la licence Unsplash l'exige.

## Réutilisation

Aucune de ces photographies ne peut être reproduite, extraite ou réutilisée sans autorisation écrite. Pour en faire la demande, écrivez à TODO_EMAIL.`,
    },
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS) as LegalSlug[];
