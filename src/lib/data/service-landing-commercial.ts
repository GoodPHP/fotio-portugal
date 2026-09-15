import type { ServiceLanding } from './service-landing';

/**
 * Conversion sections for the commercial services: corporate events, property,
 * restaurants and model portfolios. Split from `service-landing-business.ts`
 * by what is being photographed — a place, a plate, an event — rather than a
 * person's professional portrait. See `service-landing.ts` for each block.
 */
export const COMMERCIAL_SERVICE_LANDING: Record<string, ServiceLanding> = {
  'eventos-de-empresa': {
    promise: {
      en: 'An event photographed for the person who has to publish that night: five hours, a first selection before the day ends and 200 images within 72 hours.',
      pt: 'Um evento fotografado para quem tem de publicar nessa noite: cinco horas, primeira selecção antes de o dia acabar e 200 imagens em 72 horas.',
    },
    audience: {
      en: [
        {
          title: 'Communications and marketing teams',
          text: 'Whoever has to put the press release, the company page and the internal newsletter out that evening or the next morning, and needs images that have already been through a selection.',
        },
        {
          title: 'Conference and training organisers',
          text: 'Speakers and sponsors expect to see themselves, and next year’s edition is sold with this year’s full room. One frame per talk and the audience at its busiest are the record that gets reused.',
        },
        {
          title: 'HR, for the annual dinner and internal events',
          text: 'A team dinner has no stage and no running order that anyone follows. It needs someone discreet who photographs every table, not only the one where the board is sitting.',
        },
      ],
      pt: [
        {
          title: 'Equipas de comunicação e marketing',
          text: 'Quem tem de pôr o comunicado, a página da empresa e a newsletter interna cá fora nessa noite ou na manhã seguinte, e precisa de imagens que já passaram por uma selecção.',
        },
        {
          title: 'Organizadores de conferências e formações',
          text: 'Oradores e patrocinadores esperam ver-se nas fotografias, e a edição do próximo ano vende-se com a sala cheia deste ano. Uma imagem por intervenção e o público no seu momento mais cheio são o registo que volta a ser usado.',
        },
        {
          title: 'Recursos humanos, para o jantar de final de ano e eventos internos',
          text: 'Um jantar de equipa não tem palco nem alinhamento que alguém cumpra. Precisa de alguém discreto que fotografe todas as mesas, e não só aquela onde está a administração.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send the running order and the venue',
          text: 'Times, address and how many rooms are in use. If the event runs past five hours, say so now: a longer booking or a second photographer is quoted before you book.',
        },
        {
          title: 'A short briefing',
          text: 'We confirm the photographer, usually the same working day, and go through who has to appear, which moments are compulsory — a signing, an award, the group photograph — and who receives the first selection.',
        },
        {
          title: 'Five hours from the agreed start',
          text: 'The time counts from the hour agreed. If you want the photographer to see the room and the stage before the doors open, build that into the five hours rather than assuming it sits outside them.',
        },
        {
          title: 'Selection that night, gallery in 72 hours',
          text: 'The first edited selection goes to the communications contact the same evening; all 200 retouched photographs follow in a private gallery within 72 hours, in full resolution.',
        },
      ],
      pt: [
        {
          title: 'Envie o alinhamento e o local',
          text: 'Horários, morada e quantas salas estão em uso. Se o evento passar das cinco horas, diga-o logo: uma cobertura mais longa ou um segundo fotógrafo são orçamentados antes de reservar.',
        },
        {
          title: 'Um briefing curto',
          text: 'Confirmamos o fotógrafo, normalmente no mesmo dia útil, e passamos em revista quem tem de aparecer, que momentos são obrigatórios — uma assinatura, um prémio, a fotografia de grupo — e quem recebe a primeira selecção.',
        },
        {
          title: 'Cinco horas a partir da hora combinada',
          text: 'O tempo conta a partir da hora combinada. Se quiser que o fotógrafo veja a sala e o palco antes de as portas abrirem, inclua isso nas cinco horas em vez de partir do princípio de que fica de fora.',
        },
        {
          title: 'Selecção nessa noite, galeria em 72 horas',
          text: 'A primeira selecção editada segue para o contacto de comunicação na mesma noite; as 200 fotografias retocadas chegam depois a uma galeria privada em 72 horas, em alta resolução.',
        },
      ],
    },
    prepare: {
      en: [
        'Send the final running order, with times, by the day before.',
        'Name one contact on site, with a mobile number, who knows the speakers and the key guests by sight.',
        'List the people who must appear, with their role and, if possible, a photograph.',
        'Put the group photographs in the programme with a time and a place instead of improvising them at the end.',
        'Agree a visible sign — a different lanyard, for instance — for anyone who does not want to be photographed.',
        'Check with the venue where the photographer can stand near the stage and whether flash is allowed during talks.',
      ],
      pt: [
        'Envie o alinhamento final, com horários, até à véspera.',
        'Indique um contacto no local, com telemóvel, que conheça de vista os oradores e os convidados principais.',
        'Faça a lista das pessoas que têm de aparecer, com o cargo e, se possível, uma fotografia.',
        'Ponha as fotografias de grupo no programa, com hora e sítio, em vez de as improvisar no fim.',
        'Combine um sinal visível — um cordão de outra cor, por exemplo — para quem não quer ser fotografado.',
        'Confirme com o espaço onde o fotógrafo se pode pôr junto ao palco e se o flash é permitido durante as intervenções.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'How many photographs are in the same-evening selection?',
          pt: 'Quantas fotografias vêm na selecção da mesma noite?',
        },
        answer: {
          en: 'A short one: the images you need to publish that night, not a summary of the event. Tell us at the briefing how many and for which channels; everything else arrives with the full 200 in the gallery.',
          pt: 'Poucas: as imagens de que precisa para publicar nessa noite, não um resumo do evento. Diga no briefing quantas e para que canais; o resto chega com as 200 na galeria.',
        },
      },
      {
        question: {
          en: 'When does a second photographer make sense?',
          pt: 'Quando é que faz sentido um segundo fotógrafo?',
        },
        answer: {
          en: 'When two rooms run at the same time, or when the stage and the networking happen at once and both matter. One photographer cannot be in two places; a second is an option quoted before you book.',
          pt: 'Quando há duas salas ao mesmo tempo, ou quando o palco e o networking acontecem em simultâneo e ambos interessam. Um fotógrafo não está em dois sítios; um segundo é uma opção orçamentada antes de reservar.',
        },
      },
      {
        question: {
          en: 'What if the running order changes on the day?',
          pt: 'E se o alinhamento mudar no próprio dia?',
        },
        answer: {
          en: 'It nearly always does. The photographer follows what is happening rather than the paper; what matters is that the contact on site says so when a compulsory moment moves.',
          pt: 'Muda quase sempre. O fotógrafo segue o que está a acontecer e não o papel; o que importa é que o contacto no local avise quando um momento obrigatório muda de hora.',
        },
      },
      {
        question: {
          en: 'Is the €450 a fixed figure or an estimate?',
          pt: 'Os 450 € são um valor fechado ou uma estimativa?',
        },
        answer: {
          en: 'It is the price for five hours and 200 retouched photographs, with no per-image charge and travel inside the booked area included. What changes it is scope — more hours, a second photographer — and each is quoted before you book, not added afterwards.',
          pt: 'É o preço de cinco horas e 200 fotografias retocadas, sem cobrança por imagem e com a deslocação dentro da área reservada incluída. O que o altera é o âmbito — mais horas, um segundo fotógrafo — e cada coisa é orçamentada antes de reservar, não somada depois.',
        },
      },
      {
        question: {
          en: 'Can we send the photographs to the press and to sponsors?',
          pt: 'Podemos enviar as fotografias à imprensa e aos patrocinadores?',
        },
        answer: {
          en: 'That is agreed before the event, not after. The standard licence is personal, so the business use — website, press, social media, advertising, and whether sponsors receive images — is set out in writing with the quote, before the session.',
          pt: 'Isso acorda-se antes do evento, não depois. A licença base é pessoal, por isso o uso empresarial — site, imprensa, redes sociais, publicidade, e se os patrocinadores recebem imagens — fica por escrito com o orçamento, antes da sessão.',
        },
      },
    ],
  },

  'real-estate': {
    promise: {
      en: 'Listing photographs shot when each room has its light, with straight walls and white walls that stay white — twenty-five images, ready within 24 hours.',
      pt: 'Fotografias de anúncio feitas quando cada divisão tem luz, com paredes direitas e brancos que ficam brancos — vinte e cinco imagens, prontas em 24 horas.',
    },
    audience: {
      en: [
        {
          title: 'Alojamento Local hosts and managers',
          text: 'Someone running several units needs every listing photographed to the same standard, and a new unit online before its calendar has an empty week in it.',
        },
        {
          title: 'Agents and owners selling or letting',
          text: 'A property portal shows the first image at thumbnail size among dozens in the same search. Twenty-five images cover every room, the view and the building — what a buyer checks before asking for a visit.',
        },
        {
          title: 'Owners after a renovation',
          text: 'The work was expensive and the old photographs still sell the flat as it was. One visit replaces a listing’s worth of phone pictures taken on different days in different weather.',
        },
      ],
      pt: [
        {
          title: 'Anfitriões e gestores de Alojamento Local',
          text: 'Quem gere várias unidades precisa de todos os anúncios fotografados com o mesmo critério, e de uma unidade nova no ar antes de o calendário ter uma semana vazia.',
        },
        {
          title: 'Agentes e proprietários a vender ou arrendar',
          text: 'Um portal imobiliário mostra a primeira imagem em miniatura entre dezenas na mesma pesquisa. Vinte e cinco imagens cobrem todas as divisões, a vista e o prédio — aquilo que um comprador verifica antes de pedir uma visita.',
        },
        {
          title: 'Proprietários depois de uma obra',
          text: 'A obra foi cara e as fotografias antigas continuam a vender a casa como era. Uma visita substitui um anúncio inteiro de fotografias de telemóvel tiradas em dias e tempos diferentes.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send the address, typology and orientation',
          text: 'T1, T3, a house with a garden — and, if you know it, which rooms get the morning sun. If you do not, the photographer works out the orientation before proposing a time.',
        },
        {
          title: 'We propose the hour',
          text: 'The time is chosen for the light rather than for the diary. The photographer and the slot are confirmed usually the same working day.',
        },
        {
          title: 'Ninety minutes on site',
          text: 'Every room from the angles that show its size honestly, then the details, the view, the common areas and the exterior, with the camera kept level so the walls start out straight.',
        },
        {
          title: 'Twenty-five images within 24 hours',
          text: 'Verticals corrected and colour casts removed, delivered to a private gallery in full resolution, ready to upload to the listing.',
        },
      ],
      pt: [
        {
          title: 'Envie morada, tipologia e orientação',
          text: 'T1, T3, moradia com jardim — e, se souber, que divisões apanham o sol da manhã. Se não souber, o fotógrafo confirma a orientação antes de propor uma hora.',
        },
        {
          title: 'Propomos a hora',
          text: 'A hora escolhe-se pela luz e não pela agenda. Fotógrafo e horário ficam confirmados normalmente no mesmo dia útil.',
        },
        {
          title: 'Noventa minutos no local',
          text: 'Cada divisão nos ângulos que mostram o tamanho com honestidade, depois os detalhes, a vista, as zonas comuns e o exterior, com a câmara nivelada para as paredes já saírem direitas.',
        },
        {
          title: 'Vinte e cinco imagens em 24 horas',
          text: 'Verticais corrigidas e dominantes de cor removidas, entregues em galeria privada em alta resolução, prontas para carregar no anúncio.',
        },
      ],
    },
    prepare: {
      en: [
        'Clear every surface — kitchen counters, bathroom shelves, bedside tables. The camera exaggerates clutter.',
        'Replace dead bulbs and use the same colour of bulb throughout each room.',
        'Make the beds with plain, ironed linen in white or one light colour.',
        'Put away bins, cables, remote controls, toiletries and fridge magnets.',
        'Open every blind and shutter fully before the photographer arrives.',
        'Arrange access to the terrace, pool or shared garden in advance if they belong in the listing.',
      ],
      pt: [
        'Limpe todas as superfícies — bancadas da cozinha, prateleiras da casa de banho, mesas de cabeceira. A câmara exagera a desarrumação.',
        'Troque as lâmpadas fundidas e use a mesma cor de lâmpada em toda a divisão.',
        'Faça as camas com roupa lisa e passada, branca ou de uma só cor clara.',
        'Arrume caixotes do lixo, cabos, comandos, produtos de higiene e ímanes do frigorífico.',
        'Abra por completo todos os estores e portadas antes de o fotógrafo chegar.',
        'Trate com antecedência do acesso ao terraço, à piscina ou ao jardim comum, se fizerem parte do anúncio.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'How much of a property fits into ninety minutes?',
          pt: 'Quanto de um imóvel cabe em noventa minutos?',
        },
        answer: {
          en: 'A flat of one to three bedrooms comfortably, with time left for details and the view. A large house with outdoor areas, or several units in one building, may need a longer session — quoted before you book, not discovered on the day.',
          pt: 'Um apartamento de T1 a T3 com folga, e ainda com tempo para detalhes e para a vista. Uma moradia grande com exteriores, ou várias unidades no mesmo prédio, podem precisar de uma sessão mais longa — orçamentada antes de reservar, não descoberta no dia.',
        },
      },
      {
        question: {
          en: 'Will the rooms look bigger than they are?',
          pt: 'As divisões vão parecer maiores do que são?',
        },
        answer: {
          en: 'No. The lens is chosen to show the whole room without stretching it. A room that looks twice its size in the photograph produces a disappointed visitor and, on a short-term rental, a review that says so.',
          pt: 'Não. A objectiva escolhe-se para mostrar a divisão inteira sem a esticar. Uma divisão que parece ter o dobro do tamanho na fotografia dá um visitante desiludido e, num alojamento de curta duração, um comentário a dizê-lo.',
        },
      },
      {
        question: {
          en: 'Can objects be removed from the photographs afterwards?',
          pt: 'É possível tirar objectos das fotografias depois?',
        },
        answer: {
          en: 'The retouching is correction: straight verticals and neutral colour. Tidying happens before the photograph, which is why the preparation list matters more than anything done at the computer.',
          pt: 'O retoque é de correcção: verticais direitas e cor neutra. A arrumação faz-se antes da fotografia, e é por isso que a lista de preparação conta mais do que qualquer coisa feita no computador.',
        },
      },
      {
        question: {
          en: 'What if the day we booked for sun turns out grey?',
          pt: 'E se o dia marcado por causa do sol estiver cinzento?',
        },
        answer: {
          en: 'The session moves to another day at no cost. For a listing that has to go live now, the photographer can still shoot and you decide — but a south-facing flat under cloud is not the flat you are selling.',
          pt: 'A sessão passa para outro dia sem custo. Para um anúncio que tem de entrar já, o fotógrafo pode fotografar na mesma e decide o cliente — mas uma casa virada a sul debaixo de nuvens não é a casa que está a vender.',
        },
      },
      {
        question: {
          en: 'Can the images go on every portal and platform we list on?',
          pt: 'As imagens podem ir para todos os portais e plataformas onde anunciamos?',
        },
        answer: {
          en: 'Listing a property is commercial use, which the standard personal licence does not cover. Tell us where the property will be advertised when you book, and that use is agreed in writing with the quote, before the session.',
          pt: 'Anunciar um imóvel é uso comercial, que a licença pessoal base não cobre. Diga-nos ao reservar onde o imóvel vai ser anunciado, e esse uso fica acordado por escrito com o orçamento, antes da sessão.',
        },
      },
    ],
  },

  food: {
    promise: {
      en: 'Your menu photographed in your own dining room, plate by plate as the kitchen sends it: up to twelve dishes in three hours, ready for the menu and the site.',
      pt: 'A sua ementa fotografada na sua sala, prato a prato à medida que a cozinha os manda: até doze pratos em três horas, prontos para a carta e o site.',
    },
    audience: {
      en: [
        {
          title: 'Restaurants opening or changing the menu',
          text: 'A new menu needs photographs before it reaches the website and the delivery apps, and those photographs should show this season’s plates, not the ones that came off in spring.',
        },
        {
          title: 'Hotels, wineries and cafés',
          text: 'Where the food is part of a wider offer — a hotel restaurant, a tasting, a pastry counter — the images have to show the setting around the plate as well as the plate.',
        },
        {
          title: 'Producers and chefs building a name',
          text: 'A cookbook proposal, a supplier catalogue, a chef’s own profile: fewer dishes, more attention on each, and the kitchen and the hands in some of the frames.',
        },
      ],
      pt: [
        {
          title: 'Restaurantes a abrir ou a mudar de carta',
          text: 'Uma carta nova precisa de fotografias antes de chegar ao site e às aplicações de entregas, e essas fotografias têm de mostrar os pratos desta estação, não os que saíram na Primavera.',
        },
        {
          title: 'Hotéis, adegas e cafés',
          text: 'Quando a comida faz parte de uma oferta maior — o restaurante de um hotel, uma prova de vinhos, um balcão de pastelaria — as imagens têm de mostrar o sítio à volta do prato, e não só o prato.',
        },
        {
          title: 'Produtores e chefs a construir um nome',
          text: 'Uma proposta de livro de receitas, um catálogo de fornecedor, o perfil do próprio chef: menos pratos, mais atenção a cada um, e a cozinha e as mãos em algumas imagens.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send the list of dishes',
          text: 'Up to twelve, in the order the kitchen can plate them, and the hours when the dining room is empty. If the list is longer than twelve, say so now: a longer session is quoted before you book.',
        },
        {
          title: 'We agree the table and the order',
          text: 'The photographer is confirmed, usually the same working day, and agrees with the chef which table gets the best light and the plating order, so hot dishes never wait on cold ones.',
        },
        {
          title: 'Three hours, one plate at a time',
          text: 'Each dish is photographed from the angle that suits it — overhead for flat plates, lower for anything with height — and cleared before the next comes out. The room and the team are photographed while the kitchen plates.',
        },
        {
          title: 'Thirty images within 72 hours',
          text: 'Retouched and delivered to a private gallery in full resolution, with each image cropped for the printed menu, the site header and a square post.',
        },
      ],
      pt: [
        {
          title: 'Envie a lista de pratos',
          text: 'Até doze, pela ordem em que a cozinha os consegue empratar, e as horas em que a sala está vazia. Se a lista tiver mais de doze, diga-o logo: uma sessão mais longa é orçamentada antes de reservar.',
        },
        {
          title: 'Combinamos a mesa e a ordem',
          text: 'O fotógrafo fica confirmado, normalmente no mesmo dia útil, e combina com o chef qual a mesa com melhor luz e a ordem de empratamento, para os pratos quentes nunca esperarem pelos frios.',
        },
        {
          title: 'Três horas, um prato de cada vez',
          text: 'Cada prato é fotografado no ângulo que lhe convém — de cima para pratos rasos, mais baixo para o que tem altura — e levantado antes de sair o seguinte. A sala e a equipa fotografam-se enquanto a cozinha emprata.',
        },
        {
          title: 'Trinta imagens em 72 horas',
          text: 'Retocadas e entregues em galeria privada em alta resolução, com cada imagem cortada para a carta impressa, o topo do site e uma publicação quadrada.',
        },
      ],
    },
    prepare: {
      en: [
        'Plate each dish exactly as it is served; the photograph is a promise to the next customer.',
        'Keep spare garnish and sauce ready — a second plating is faster than rescuing the first.',
        'Book the gap between lunch and dinner service, not a service itself.',
        'Lay the table with the cutlery, glasses and napkins you actually use.',
        'Assign one person to carry plates to the table on cue, so the chef stays at the pass.',
        'Clean the windows beside the chosen table; the daylight comes through them.',
      ],
      pt: [
        'Emprate cada prato exactamente como é servido; a fotografia é uma promessa ao próximo cliente.',
        'Tenha guarnição e molho de reserva — empratar outra vez é mais rápido do que salvar o primeiro.',
        'Marque o intervalo entre o almoço e o jantar, não um serviço.',
        'Ponha a mesa com os talheres, copos e guardanapos que usa de facto.',
        'Destaque uma pessoa para levar os pratos à mesa quando for chamada, para o chef ficar no passe.',
        'Limpe os vidros junto à mesa escolhida; é por eles que entra a luz.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Does the restaurant need to close for the session?',
          pt: 'O restaurante tem de fechar para a sessão?',
        },
        answer: {
          en: 'No. The three hours sit between services. What the kitchen does need is one cook free to plate for the length of the session, and the dining room clear around the table being used.',
          pt: 'Não. As três horas ficam entre serviços. O que a cozinha precisa é de um cozinheiro livre para empratar durante a sessão e da sala desimpedida à volta da mesa que se está a usar.',
        },
      },
      {
        question: {
          en: 'Is a food stylist included?',
          pt: 'Está incluído um food stylist?',
        },
        answer: {
          en: 'No, and for a restaurant it is rarely what you want: the plate in the photograph should be the plate the customer receives. The photographer arranges the table around it and asks the chef for any adjustment on the plate itself.',
          pt: 'Não, e para um restaurante raramente é o que se quer: o prato da fotografia deve ser o prato que o cliente recebe. O fotógrafo compõe a mesa à volta e pede ao chef os ajustes no próprio prato.',
        },
      },
      {
        question: {
          en: 'Our dining room has little daylight. Does that work?',
          pt: 'A nossa sala tem pouca luz natural. Resulta na mesma?',
        },
        answer: {
          en: 'Yes. Where the room does not allow daylight, the table is lit, and the images are made to look like your room at the hour you serve rather than a studio. Say so when booking so the photographer arrives prepared for it.',
          pt: 'Sim. Quando a sala não permite luz natural, a mesa é iluminada, e as imagens ficam com o aspecto da sua sala à hora a que serve, não de um estúdio. Diga-o ao reservar para o fotógrafo vir preparado.',
        },
      },
      {
        question: {
          en: 'Can the photographs go on the menu, the delivery apps and in advertising?',
          pt: 'As fotografias podem ir para a carta, as aplicações de entregas e publicidade?',
        },
        answer: {
          en: 'Yes, as agreed with the quote. The standard licence is personal, so the restaurant’s use — menu, website, press, social media, delivery listings, advertising — is written into the quote before the session, matching where the images will actually appear.',
          pt: 'Sim, conforme acordado no orçamento. A licença base é pessoal, por isso o uso do restaurante — carta, site, imprensa, redes sociais, aplicações de entregas, publicidade — fica escrito no orçamento antes da sessão, de acordo com os sítios onde as imagens vão de facto aparecer.',
        },
      },
    ],
  },

  'book-de-modelo': {
    promise: {
      en: 'Digitals and editorial in one session: three hours, three looks and 40 retouched photographs, ready to send to agencies within a week.',
      pt: 'Polaroids e editorial numa só sessão: três horas, três looks e 40 fotografias retocadas, prontas a enviar a agências numa semana.',
    },
    audience: {
      en: [
        {
          title: 'Anyone approaching agencies for the first time',
          text: 'Agencies ask for current digitals before anything else. Arriving with them already made, plus a handful of editorial frames, saves a round of emails and a second shoot.',
        },
        {
          title: 'Models whose book is out of date',
          text: 'A haircut, a few years or a change in weight make old photographs misleading. A booker wants today’s face, and a three-year-old book is the first reason not to call someone in.',
        },
        {
          title: 'Actors and dancers who need casting material',
          text: 'Casting wants to see the person unadorned and, next to that, what the face and body can do. The same pairing of digitals and editorial serves both.',
        },
      ],
      pt: [
        {
          title: 'Quem vai contactar agências pela primeira vez',
          text: 'As agências pedem polaroids actuais antes de qualquer outra coisa. Chegar com elas feitas, e com algumas imagens editoriais, poupa uma ronda de emails e uma segunda sessão.',
        },
        {
          title: 'Modelos com o book desactualizado',
          text: 'Um corte de cabelo, alguns anos ou uma mudança de peso tornam as fotografias antigas enganadoras. Quem selecciona quer a cara de hoje, e um book com três anos é o primeiro motivo para não chamar ninguém.',
        },
        {
          title: 'Actores e bailarinos que precisam de material para casting',
          text: 'Um casting quer ver a pessoa sem nada à volta e, ao lado, o que a cara e o corpo conseguem fazer. O mesmo par de polaroids e editorial serve para as duas coisas.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us where the book is going',
          text: 'Fashion, commercial, advertising, or one agency in particular. Each wants a different balance of digitals and editorial, and that decides how the three hours are split.',
        },
        {
          title: 'Agree the looks and the references',
          text: 'We confirm the photographer, usually the same working day, and settle the three looks and two or three reference images. Nothing about the wardrobe is improvised on the day.',
        },
        {
          title: 'Three hours, digitals first',
          text: 'Digitals are made at the start, with a clean face and hair tied back, before any make-up or styling goes on. Then the three looks, each with its own light.',
        },
        {
          title: 'Forty photographs within a week',
          text: 'Retouched and delivered to a private gallery within a week, in full resolution and in the sizes you will send by email or upload to an agency form.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos para onde vai o book',
          text: 'Moda, comercial, publicidade, ou uma agência em concreto. Cada uma pede um equilíbrio diferente entre polaroids e editorial, e isso decide como se dividem as três horas.',
        },
        {
          title: 'Combinamos looks e referências',
          text: 'Confirmamos o fotógrafo, normalmente no mesmo dia útil, e fechamos os três looks e duas ou três imagens de referência. Nada do guarda-roupa é improvisado no dia.',
        },
        {
          title: 'Três horas, primeiro as polaroids',
          text: 'As polaroids fazem-se no início, com a cara lavada e o cabelo apanhado, antes de qualquer maquilhagem ou styling. Depois os três looks, cada um com a sua luz.',
        },
        {
          title: 'Quarenta fotografias numa semana',
          text: 'Retocadas e entregues em galeria privada no prazo de uma semana, em alta resolução e nos tamanhos que vai enviar por email ou carregar no formulário de uma agência.',
        },
      ],
    },
    prepare: {
      en: [
        'For the digitals, bring fitted black jeans and a plain black vest top, with nothing printed on them.',
        'Arrive with a clean face, no make-up, and hair without product.',
        'Bring the three looks ironed, with the shoes for each one.',
        'Keep nails clean and unpainted, or in a neutral shade.',
        'Do not cut or colour your hair in the week before.',
        'Bring your current measurements — height, bust or chest, waist, hips, shoe size; agencies ask for them with the photographs.',
      ],
      pt: [
        'Para as polaroids, leve calças de ganga pretas justas e uma camisola de alças preta lisa, sem nada estampado.',
        'Chegue com a cara lavada, sem maquilhagem, e o cabelo sem produto.',
        'Leve os três looks passados a ferro, com os sapatos de cada um.',
        'Unhas limpas e sem verniz, ou num tom neutro.',
        'Não corte nem pinte o cabelo na semana anterior.',
        'Leve as medidas actualizadas — altura, peito, cintura, anca, número de sapato; as agências pedem-nas com as fotografias.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Are make-up and styling included?',
          pt: 'A maquilhagem e o styling estão incluídos?',
        },
        answer: {
          en: 'No. The price covers the photographer’s time, the selection, the colour work and the gallery. You can bring your own make-up artist for the editorial looks; the digitals are made before they start, with no make-up at all.',
          pt: 'Não. O preço cobre o tempo do fotógrafo, a selecção, o tratamento de cor e a galeria. Pode levar maquilhador próprio para os looks editoriais; as polaroids fazem-se antes de ele começar, sem maquilhagem nenhuma.',
        },
      },
      {
        question: {
          en: 'How many of the forty are digitals and how many editorial?',
          pt: 'Das quarenta, quantas são polaroids e quantas editoriais?',
        },
        answer: {
          en: 'There is no fixed quota; it is set in the first step according to where the book is going. A first book usually leans towards digitals; a model who already works leans towards editorial.',
          pt: 'Não há quota fixa; define-se no primeiro passo conforme o destino do book. Um primeiro book costuma pesar mais nas polaroids; quem já trabalha como modelo pesa mais no editorial.',
        },
      },
      {
        question: {
          en: 'Do I see the photographs during the session?',
          pt: 'Vejo as fotografias durante a sessão?',
        },
        answer: {
          en: 'Yes, between looks, so pose and expression can be corrected before changing clothes rather than discovered in the gallery a week later.',
          pt: 'Sim, entre looks, para corrigir pose e expressão antes de mudar de roupa, em vez de descobrir na galeria uma semana depois.',
        },
      },
      {
        question: {
          en: 'Can I send the photographs to agencies and post them on my own channels?',
          pt: 'Posso enviar as fotografias a agências e publicá-las nos meus canais?',
        },
        answer: {
          en: 'Yes. The standard licence lets you print, post and send your photographs to whoever you like, which covers agencies and your own channels. If an image is to be used commercially — in a campaign or an advertisement — that use is a separate arrangement, agreed in writing.',
          pt: 'Sim. A licença base permite imprimir, publicar e enviar as fotografias a quem quiser, o que cobre agências e os seus canais. Se uma imagem for usada comercialmente — numa campanha ou num anúncio — esse uso é um acordo à parte, feito por escrito.',
        },
      },
    ],
  },
};
