import type { Localized } from './locales';

/**
 * The legal pages.
 *
 * Portugal is not a find-and-replace of France. DL 7/2004 requires an
 * e-commerce site to identify its publisher with a NIF/NIPC and a registered
 * office; the GDPR is applied nationally through Lei 58/2019 with the CNPD as
 * supervisory authority rather than the CNIL; the right of withdrawal comes
 * from DL 24/2014 and its carve-out for leisure services on a fixed date is
 * what the whole fixed-date booking model rests on; and DL 144/2015 obliges a
 * consumer-facing business to name, in writing and on the site, the
 * alternative dispute resolution body it answers to.
 *
 * One page here exists for no other reason than that Portuguese law requires
 * it: the electronic complaints book. A provider dealing with consumers must
 * make it available and link to livroreclamacoes.pt, and the link belongs in
 * the footer of every page rather than only in a legal document nobody opens.
 *
 * Deliberately NOT included: a link to the EU ODR platform. Every template
 * still carries one, and the platform was shut down in July 2025 when
 * Regulation (EU) 2024/3228 repealed the ODR Regulation. Linking it points a
 * consumer at a dead service and signals a copy-pasted policy.
 *
 * Every TODO_ below is a real company detail nobody but the operator can
 * supply, and `scripts/check-legal.ts` fails the build while one survives.
 * They are left visible on purpose: a placeholder that looks like a
 * placeholder gets filled in, and one that looks like plausible text does not.
 *
 * The statutory references are current as far as they were checked and are not
 * legal advice. Have a Portuguese lawyer read the terms of sale in particular,
 * where the withdrawal carve-out is doing real work.
 *
 * Bodies use the Markdown subset in `src/lib/article.ts`.
 */

/**
 * Hidden until the TODO_ company details are real: every legal page 404s and
 * the footer drops its Legal column. Flip back to `true` to publish them.
 *
 * Hiding them does not make the site compliant. The complaints book and a
 * privacy policy are required of a consumer-facing business in Portugal that
 * takes bookings, so this must be `true` before launch.
 */
export const LEGAL_PAGES_VISIBLE = false;

export interface LegalDoc {
  /** Route key suffix and physical folder name. */
  slug: LegalSlug;
  title: Localized;
  description: Localized;
  body: Localized;
  /** Legal boilerplate has no business competing for search traffic. */
  noindex: boolean;
}

export type LegalSlug =
  | 'notice'
  | 'privacy'
  | 'terms'
  | 'image-rights'
  | 'photo-credits'
  | 'complaints';

export const LEGAL_DOCS: Record<LegalSlug, LegalDoc> = {
  notice: {
    slug: 'notice',
    noindex: true,
    title: { en: 'Legal information', pt: 'Informação legal' },
    description: {
      en: 'Publisher, legal form, NIF/NIPC, registered office and host, as required by DL 7/2004.',
      pt: 'Entidade, forma jurídica, NIF/NIPC, sede e alojamento, nos termos do DL 7/2004.',
    },
    body: {
      en: `## Publisher

Name: TODO_LEGAL_NAME
Legal form: TODO_ENTITY
NIF / NIPC: TODO_NIF
Registered office: TODO_ADDRESS
Commercial registry: TODO_CRC
Share capital: TODO_CAPITAL
CAE-Rev.3: 74200 — photographic activities
Contact: TODO_EMAIL

## Host

Name: TODO_HOST
Address: TODO_HOST_ADDRESS

Decree-Law 7/2004 requires the identification of the service provider to be permanent, direct and easily accessible, which is what this page is for.

## VAT

TODO_VAT_STATUS. Where the publisher is covered by the small-business exemption, invoices carry the statement "IVA — regime de isenção (artigo 53.º do CIVA)". Invoices are issued through software certified by the Autoridade Tributária.

## Intellectual property

Every photograph on this site is the work of its author and is protected under the Código do Direito de Autor e dos Direitos Conexos. Nothing here may be reproduced, extracted or reused without written authorisation, including for a portfolio or a social media post.

## Reporting

To report unlawful content, write to TODO_EMAIL with the URL concerned and the reason. We answer within seven days.`,
      pt: `## Entidade

Denominação: TODO_LEGAL_NAME
Forma jurídica: TODO_ENTITY
NIF / NIPC: TODO_NIF
Sede: TODO_ADDRESS
Conservatória do Registo Comercial: TODO_CRC
Capital social: TODO_CAPITAL
CAE-Rev.3: 74200 — actividades fotográficas
Contacto: TODO_EMAIL

## Alojamento

Denominação: TODO_HOST
Morada: TODO_HOST_ADDRESS

O Decreto-Lei 7/2004 exige que a identificação do prestador seja permanente, directa e facilmente acessível, e é para isso que esta página existe.

## IVA

TODO_VAT_STATUS. Caso a entidade esteja abrangida pelo regime de isenção, as facturas contêm a menção "IVA — regime de isenção (artigo 53.º do CIVA)". As facturas são emitidas através de programa certificado pela Autoridade Tributária.

## Propriedade intelectual

Todas as fotografias deste site são obra do respectivo autor e estão protegidas pelo Código do Direito de Autor e dos Direitos Conexos. Nada aqui pode ser reproduzido, extraído ou reutilizado sem autorização escrita, incluindo para portefólio ou publicação em redes sociais.

## Denúncias

Para denunciar conteúdo ilícito, escreva para TODO_EMAIL indicando o endereço em causa e o motivo. Respondemos no prazo de sete dias.`,
    },
  },

  privacy: {
    slug: 'privacy',
    noindex: true,
    title: { en: 'Privacy policy', pt: 'Política de privacidade' },
    description: {
      en: 'What is collected, why, for how long, and how to exercise your rights under the GDPR and Lei 58/2019.',
      pt: 'O que é recolhido, porquê, por quanto tempo, e como exercer os seus direitos ao abrigo do RGPD e da Lei 58/2019.',
    },
    body: {
      en: `## Controller

TODO_LEGAL_NAME, TODO_ENTITY, NIF TODO_NIF, registered office TODO_ADDRESS. Contact: TODO_EMAIL.

## What is collected

Only what an enquiry needs: your name, your email address, your telephone number, and whatever you write in the message. The booking form additionally records the place, the session type and the date you asked about.

Nothing is collected by observation. This site sets no advertising cookies, runs no tracking pixel and builds no profile of you.

## Why, and on what basis

To answer your enquiry and, if you book, to perform the contract — article 6(1)(b) of the GDPR. Where you ask a question without booking, the basis is our legitimate interest in replying to it, article 6(1)(f).

## How long it is kept

Enquiry correspondence: three years from the last contact. Booking and invoicing records: for as long as tax and accounting law requires, which in Portugal is ten years. Photographs delivered to a client: for as long as the gallery is live, and then archived unless you ask otherwise.

## Who else sees it

Our host, TODO_HOST. Telegram, which carries the alert raised when you submit a form — this is a transfer to a country outside the EEA and it is disclosed here for that reason. Nobody else, and nothing is sold or exchanged.

## Analytics

Visitor numbers are measured with a cookie-free service that stores nothing on your device and records no personal data. Because there is nothing to consent to, this site shows no cookie banner.

## Your rights

You may ask for a copy of your data, its correction, or its deletion, by writing to TODO_EMAIL. We answer within one month. If the answer does not satisfy you, you may complain to the Comissão Nacional de Proteção de Dados (CNPD), the Portuguese supervisory authority, at cnpd.pt.`,
      pt: `## Responsável pelo tratamento

TODO_LEGAL_NAME, TODO_ENTITY, NIF TODO_NIF, com sede em TODO_ADDRESS. Contacto: TODO_EMAIL.

## O que é recolhido

Apenas o que um pedido de orçamento exige: o seu nome, o seu endereço de e-mail, o seu número de telefone e aquilo que escrever na mensagem. O formulário de reserva regista ainda o sítio, o tipo de sessão e a data sobre a qual perguntou.

Nada é recolhido por observação. Este site não usa cookies publicitários, não corre nenhum pixel de rastreio e não constrói nenhum perfil sobre si.

## Para quê, e com que fundamento

Para responder ao seu pedido e, caso reserve, para executar o contrato — artigo 6.º, n.º 1, alínea b), do RGPD. Quando coloca uma questão sem reservar, o fundamento é o interesse legítimo em responder-lhe, artigo 6.º, n.º 1, alínea f).

## Durante quanto tempo

Correspondência de pedidos: três anos a contar do último contacto. Registos de reserva e facturação: pelo período exigido pela lei fiscal e contabilística, que em Portugal é de dez anos. Fotografias entregues a um cliente: enquanto a galeria estiver activa, e depois arquivadas salvo indicação em contrário.

## Quem mais tem acesso

O nosso alojamento, TODO_HOST. O Telegram, que transporta o alerta gerado quando submete um formulário — esta é uma transferência para fora do Espaço Económico Europeu e é divulgada aqui por essa razão. Mais ninguém, e nada é vendido nem trocado.

## Estatísticas

O número de visitas é medido com um serviço sem cookies, que nada guarda no seu dispositivo e não regista dados pessoais. Como não há nada a consentir, este site não mostra qualquer aviso de cookies.

## Os seus direitos

Pode pedir uma cópia dos seus dados, a sua rectificação ou o seu apagamento, escrevendo para TODO_EMAIL. Respondemos no prazo de um mês. Se a resposta não o satisfizer, pode apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), a autoridade de controlo portuguesa, em cnpd.pt.`,
    },
  },

  terms: {
    slug: 'terms',
    noindex: true,
    title: { en: 'Terms and conditions', pt: 'Termos e condições' },
    description: {
      en: 'Booking, payment, cancellation, delivery and the right of withdrawal under DL 24/2014.',
      pt: 'Reserva, pagamento, cancelamento, entrega e o direito de livre resolução nos termos do DL 24/2014.',
    },
    body: {
      en: `## Scope

These terms govern photography sessions booked through this site. They are governed by Portuguese law, in particular Decree-Law 24/2014 on distance contracts, Law 24/96 on consumer protection and Decree-Law 84/2021 on conformity.

## Booking and price

A booking exists once the quote has been confirmed in writing by both sides. The quoted price is fixed: it covers the photographer's time for the agreed duration, the editing, and delivery of the stated number of photographs to a private gallery. Options agreed in advance are priced in the same quote.

## Payment

TODO_PAYMENT_TERMS.

## The right of withdrawal

A consumer who contracts at a distance normally has fourteen days to withdraw without giving a reason, under Decree-Law 24/2014.

**That right does not apply to a session booked for a specific date.** Article 17(1)(l) of the same decree excludes leisure services that the provider undertakes to supply on a determined date or period, and a photography session on a named day is exactly that. It is stated plainly here rather than buried, because the entire fixed-date booking model depends on it. TODO_LEGAL_REVIEW.

## Cancellation and rescheduling

If the weather makes the session unworkable, it moves to another slot or another day at no cost. If you cancel, tell us as early as you can: TODO_CANCELLATION_TERMS.

## Delivery

The gallery is delivered within the period stated for the service booked. The number of edited photographs is the number stated; there is no per-image charge and no retouching sold separately afterwards.

## If the work is not what was promised

You are refunded in full. This is offered as a guarantee rather than in place of your statutory rights, which are unaffected by anything on this page.

## Complaints and dispute resolution

Write to TODO_EMAIL first. The electronic complaints book is available at livroreclamacoes.pt — see the complaints page.

Under Decree-Law 144/2015 we are obliged to tell you which alternative dispute resolution body is competent: TODO_RAL_ENTITY, TODO_RAL_ADDRESS, TODO_RAL_URL.`,
      pt: `## Âmbito

Estes termos regulam as sessões fotográficas reservadas através deste site. Regem-se pela lei portuguesa, em particular pelo Decreto-Lei 24/2014, relativo aos contratos celebrados à distância, pela Lei 24/96, de defesa do consumidor, e pelo Decreto-Lei 84/2021, relativo à conformidade.

## Reserva e preço

Há reserva a partir do momento em que o orçamento é confirmado por escrito por ambas as partes. O preço orçamentado é fixo: cobre o tempo do fotógrafo durante a duração acordada, a edição e a entrega do número de fotografias indicado numa galeria privada. As opções acordadas previamente são orçamentadas no mesmo documento.

## Pagamento

TODO_PAYMENT_TERMS.

## Direito de livre resolução

Um consumidor que contrate à distância dispõe, em regra, de catorze dias para resolver o contrato sem indicar motivo, nos termos do Decreto-Lei 24/2014.

**Esse direito não se aplica a uma sessão marcada para uma data específica.** O artigo 17.º, n.º 1, alínea l), do mesmo diploma exclui os serviços de lazer que o prestador se obriga a prestar em data ou período determinados, e uma sessão fotográfica num dia concreto é precisamente isso. Fica dito aqui com clareza, e não escondido, porque é disto que depende todo o modelo de reserva em data fixa. TODO_LEGAL_REVIEW.

## Cancelamento e remarcação

Se as condições meteorológicas inviabilizarem a sessão, esta passa para outra hora ou outro dia sem custo. Se cancelar, avise o mais cedo possível: TODO_CANCELLATION_TERMS.

## Entrega

A galeria é entregue no prazo indicado para o serviço reservado. O número de fotografias editadas é o número indicado; não há cobrança por imagem nem retoque vendido à parte no fim.

## Se o trabalho não for o que foi prometido

É reembolsado na totalidade. Trata-se de uma garantia adicional e não de um substituto dos seus direitos legais, que não são afectados por nada nesta página.

## Reclamações e resolução de litígios

Escreva primeiro para TODO_EMAIL. O livro de reclamações eletrónico está disponível em livroreclamacoes.pt — veja a página de reclamações.

Nos termos do Decreto-Lei 144/2015, somos obrigados a indicar-lhe a entidade de resolução alternativa de litígios competente: TODO_RAL_ENTITY, TODO_RAL_ADDRESS, TODO_RAL_URL.`,
    },
  },

  complaints: {
    slug: 'complaints',
    noindex: true,
    title: { en: 'Complaints book', pt: 'Livro de reclamações' },
    description: {
      en: 'The electronic complaints book, and the alternative dispute resolution body competent for a consumer dispute.',
      pt: 'O livro de reclamações eletrónico e a entidade de resolução alternativa de litígios competente.',
    },
    body: {
      en: `## The electronic complaints book

Every provider of services to consumers in Portugal is required to make a complaints book available. Ours is the electronic one, at **livroreclamacoes.pt**, which goes directly to the competent authority and does not pass through us first.

That is deliberate on the legislator's part and we have no way to intercept it. Nothing on this page is a condition of using it.

## Before you do

If something has gone wrong, writing to TODO_EMAIL is usually faster, and the money-back guarantee is not conditional on going through us rather than through the complaints book. Doing both is perfectly possible.

## Alternative dispute resolution

Decree-Law 144/2015 requires us to name, in writing, the body competent to resolve a consumer dispute out of court:

TODO_RAL_ENTITY
TODO_RAL_ADDRESS
TODO_RAL_URL

Using it is free to the consumer.`,
      pt: `## Livro de reclamações eletrónico

Todos os prestadores de serviços a consumidores em Portugal são obrigados a disponibilizar livro de reclamações. O nosso é o eletrónico, em **livroreclamacoes.pt**, que segue directamente para a entidade competente e não passa por nós primeiro.

Isso é intencional por parte do legislador e não temos forma de o intercetar. Nada nesta página é condição para o utilizar.

## Antes disso

Se alguma coisa correu mal, escrever para TODO_EMAIL costuma ser mais rápido, e a garantia de reembolso não depende de passar por nós em vez de passar pelo livro de reclamações. Fazer as duas coisas é perfeitamente possível.

## Resolução alternativa de litígios

O Decreto-Lei 144/2015 obriga-nos a indicar, por escrito, a entidade competente para a resolução extrajudicial de um litígio de consumo:

TODO_RAL_ENTITY
TODO_RAL_ADDRESS
TODO_RAL_URL

O recurso a esta entidade é gratuito para o consumidor.`,
    },
  },

  'image-rights': {
    slug: 'image-rights',
    noindex: true,
    title: { en: 'Image rights', pt: 'Direito à imagem' },
    description: {
      en: 'Who owns the photographs, what you may do with them, and what we may not do with you in them.',
      pt: 'De quem são as fotografias, o que pode fazer com elas, e o que não podemos fazer com a sua imagem.',
    },
    body: {
      en: `## Two different rights

These are constantly confused and they are not the same thing.

The **photographer's copyright** in the photograph arises on creation and is protected by the Código do Direito de Autor e dos Direitos Conexos, articles 164 to 171 for photographic works. It stays with the photographer unless it is transferred in writing.

**Your right to your own image** is separate and is yours. It is set out in article 79 of the Civil Code, and article 199 of the Penal Code makes the unlawful taking or use of a person's image a criminal matter, not merely a civil one. Portuguese law is more concrete here than in several neighbouring countries, which is why the article numbers are cited rather than paraphrased.

## What you get

A personal licence to use your photographs: print them, hang them, post them, send them to whoever you like. What it does not include is resale or commercial exploitation, which is a separate arrangement.

## What we may do

Nothing, without a written release. We do not put a client's photographs on this site, in a portfolio or on social media unless you have said in writing that we may.

Refusing costs nothing and changes neither the price nor the service. A release given can be withdrawn later by writing to TODO_EMAIL, and we remove the images from our own channels within seven days.

## Photographs of other people

A session in a public place may include passers-by incidentally. Where someone is identifiable and the photograph is used commercially, their agreement is needed — article 79 again. Where you have asked for a location that makes that impractical, we will say so before the session rather than after it.`,
      pt: `## Dois direitos diferentes

São constantemente confundidos e não são a mesma coisa.

O **direito de autor do fotógrafo** sobre a fotografia nasce com a criação e está protegido pelo Código do Direito de Autor e dos Direitos Conexos, artigos 164.º a 171.º quanto às obras fotográficas. Mantém-se na esfera do fotógrafo salvo transmissão escrita.

O **direito à sua própria imagem** é distinto e é seu. Está previsto no artigo 79.º do Código Civil, e o artigo 199.º do Código Penal faz da captação ou utilização ilícita da imagem de uma pessoa matéria criminal, e não apenas civil. A lei portuguesa é aqui mais concreta do que a de vários países vizinhos, e é por isso que se citam os artigos em vez de os parafrasear.

## O que recebe

Uma licença pessoal para usar as suas fotografias: imprimir, emoldurar, publicar, enviar a quem quiser. O que não inclui é revenda ou exploração comercial, que é um acordo à parte.

## O que nós podemos fazer

Nada, sem autorização escrita. Não colocamos fotografias de um cliente neste site, num portefólio ou nas redes sociais sem que o tenha autorizado por escrito.

Recusar não custa nada e não altera nem o preço nem o serviço. Uma autorização dada pode ser retirada depois, escrevendo para TODO_EMAIL, e removemos as imagens dos nossos canais no prazo de sete dias.

## Fotografias de outras pessoas

Uma sessão em espaço público pode incluir transeuntes de forma incidental. Quando alguém é identificável e a fotografia tem uso comercial, é necessário o seu acordo — artigo 79.º, de novo. Se pedir um local que torne isso impraticável, dizemos-lho antes da sessão e não depois.`,
    },
  },

  'photo-credits': {
    slug: 'photo-credits',
    noindex: true,
    title: { en: 'Photo credits', pt: 'Créditos fotográficos' },
    description: {
      en: 'Where every photograph on this site came from, and under what licence.',
      pt: 'De onde vem cada fotografia deste site, e sob que licença.',
    },
    body: {
      en: `## Why this page exists

A photography site that will not say where its own images came from is asking you to take a great deal on trust. Every photograph used here is listed with its author and its licence, and licensed stock is marked as stock rather than presented as client work.

## Licensed photography

Images sourced under licence are credited to the photographer and linked to the original. Where the licence requires attribution, the attribution appears here and the links carry the referral parameters the licence asks for.

## Commissioned and client work

Photographs made for a client appear only with that client's written release — see the image rights page. They are credited to the photographer who made them.

## Corrections

If you are the author of an image used here and the credit is wrong or missing, write to TODO_EMAIL and it is corrected or the image removed, within seven days.

## Reuse

None of these photographs may be reproduced, extracted or reused without written authorisation. To request it, write to TODO_EMAIL.`,
      pt: `## Porque existe esta página

Um site de fotografia que não diz de onde vêm as suas próprias imagens está a pedir-lhe muita confiança. Todas as fotografias aqui usadas estão listadas com o respectivo autor e licença, e as imagens de stock licenciadas são identificadas como tal em vez de passarem por trabalho de cliente.

## Fotografia licenciada

As imagens obtidas sob licença são creditadas ao fotógrafo e ligadas ao original. Quando a licença exige atribuição, a atribuição aparece aqui e as ligações levam os parâmetros de referência que a licença pede.

## Trabalho por encomenda e de clientes

As fotografias feitas para um cliente só aparecem com autorização escrita desse cliente — veja a página do direito à imagem. São creditadas ao fotógrafo que as fez.

## Correcções

Se for autor de uma imagem aqui utilizada e o crédito estiver errado ou em falta, escreva para TODO_EMAIL e será corrigido, ou a imagem removida, no prazo de sete dias.

## Reutilização

Nenhuma destas fotografias pode ser reproduzida, extraída ou reutilizada sem autorização escrita. Para a solicitar, escreva para TODO_EMAIL.`,
    },
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS) as LegalSlug[];
