import type { ServiceLanding } from './service-landing';

/**
 * Conversion sections for the corporate and commercial services.
 * See `service-landing.ts` for what each block is for.
 *
 * The buyer here is usually spending a company's money, so the blocks answer
 * procurement questions — cost per head, what the team has to do, how much
 * fits in the booked time — with the catalogue's figures from `services.ts`.
 */
export const BUSINESS_SERVICE_LANDING: Record<string, ServiceLanding> = {
  headshots: {
    promise: {
      en: 'Portraits that sit on one team page as a set — same framing, same light, same background — photographed at your office, 45 minutes a head.',
      pt: 'Retratos que assentam na página da equipa como um conjunto — mesmo enquadramento, mesma luz, mesmo fundo — feitos no escritório, 45 minutos por pessoa.',
    },
    audience: {
      en: [
        {
          title: 'HR and communications teams refreshing a team page',
          text: 'The website, the annual report and the internal directory all want the same portrait of the same people. Photographing everyone in one visit is what keeps the grid consistent, and the set-up can be booked again when someone joins.',
        },
        {
          title: 'Law firms, clinics and consultancies',
          text: 'Clients open the partner page before the first meeting. Each profile needs a portrait that looks professional without looking like a passport photo, and that matches the colleague on either side of it.',
        },
        {
          title: 'One person before a job move',
          text: 'A new role, a board appointment, a conference bio. Forty-five minutes in a studio, fifteen retouched images to choose from, and the portrait is in the gallery two days later.',
        },
      ],
      pt: [
        {
          title: 'Recursos humanos e comunicação a renovar a página da equipa',
          text: 'O site, o relatório anual e o directório interno pedem o mesmo retrato das mesmas pessoas. Fotografar toda a gente numa só visita é o que mantém a grelha coerente, e o mesmo esquema pode voltar a ser marcado quando alguém entra.',
        },
        {
          title: 'Sociedades de advogados, clínicas e consultoras',
          text: 'Os clientes abrem a página dos sócios antes da primeira reunião. Cada perfil precisa de um retrato profissional que não pareça foto tipo passe e que combine com o do colega ao lado.',
        },
        {
          title: 'Uma pessoa antes de mudar de emprego',
          text: 'Um cargo novo, a entrada num conselho de administração, a biografia para uma conferência. Quarenta e cinco minutos em estúdio, quinze imagens retocadas para escolher, e o retrato está na galeria dois dias depois.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send the headcount and the address',
          text: 'How many people, which days they are in the office, and whether the portraits must match an existing set. If they must, attach two of the current images.',
        },
        {
          title: 'We confirm a photographer and the arithmetic',
          text: 'Usually the same working day. The time is per person, so the schedule is simple: eight people is six hours of photographer time, and you can give everyone a slot before the day.',
        },
        {
          title: 'One room, set up once',
          text: 'The neutral background and the softer second set-up are built in one room and left in place, so the first portrait of the morning and the last of the afternoon are lit the same way.',
        },
        {
          title: 'Fifteen images per person in 48 hours',
          text: 'Retouched and delivered to a private gallery in full resolution, with square and 4:5 crops ready for the website, the intranet and each person’s own profiles.',
        },
      ],
      pt: [
        {
          title: 'Envie o número de pessoas e a morada',
          text: 'Quantas pessoas, em que dias estão no escritório e se os retratos têm de combinar com um conjunto já existente. Se tiverem, junte duas das imagens actuais.',
        },
        {
          title: 'Confirmamos o fotógrafo e fazemos as contas',
          text: 'Normalmente no mesmo dia útil. O tempo é por pessoa, por isso o horário é simples: oito pessoas são seis horas de fotógrafo, e cada pessoa pode ficar com a sua marcação antes do dia.',
        },
        {
          title: 'Uma sala, montada uma vez',
          text: 'O fundo neutro e o segundo esquema mais suave montam-se numa sala e não saem do lugar, para que o primeiro retrato da manhã e o último da tarde tenham a mesma luz.',
        },
        {
          title: 'Quinze imagens por pessoa em 48 horas',
          text: 'Retocadas e entregues em galeria privada em alta resolução, com cortes quadrado e 4:5 prontos para o site, a intranet e os perfis de cada pessoa.',
        },
      ],
    },
    prepare: {
      en: [
        'Book a meeting room about four metres deep; the background and the lights need space in front of and behind each person.',
        'Send the team a short dress note: solid mid-tones, no fine stripes or small checks, and no logos unless the company wants them.',
        'Decide beforehand whether jackets are on or off. A grid that mixes both is the most common inconsistency.',
        'Give each person a time and stagger the slots by 45 minutes; people who have waited in a corridor photograph tense.',
        'List anyone who wears glasses, so the lights are placed to keep reflections off the lenses from the first slot.',
      ],
      pt: [
        'Reserve uma sala de reuniões com uns quatro metros de fundo; o fundo e as luzes precisam de espaço à frente e atrás de cada pessoa.',
        'Mande à equipa uma nota curta sobre roupa: cores lisas em tons médios, sem riscas finas nem xadrez pequeno, e sem logótipos a não ser que a empresa os queira.',
        'Decida antes se é com casaco ou sem casaco. Uma grelha que mistura os dois é a incoerência mais comum.',
        'Dê a cada pessoa uma marcação própria, com intervalos de 45 minutos; quem esperou num corredor sai tenso na fotografia.',
        'Indique quem usa óculos, para as luzes ficarem montadas sem reflexos nas lentes desde a primeira marcação.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Is the price per person or per visit?',
          pt: 'O preço é por pessoa ou por visita?',
        },
        answer: {
          en: 'Per person: from €150 for 45 minutes and fifteen retouched images each. There is no per-image charge on top and travel inside the area you booked is included, so the budget for a team is the headcount times the individual figure. If the day becomes too long for one photographer, a second is an option quoted before you book.',
          pt: 'Por pessoa: desde 150 € por 45 minutos e quinze imagens retocadas cada. Não há cobrança por imagem e a deslocação dentro da área reservada está incluída, por isso o orçamento para uma equipa é o número de pessoas vezes o valor individual. Se o dia ficar demasiado longo para um fotógrafo, um segundo é uma opção orçamentada antes de reservar.',
        },
      },
      {
        question: {
          en: 'What does the team actually have to do on the day?',
          pt: 'O que é que a equipa tem de fazer no dia?',
        },
        answer: {
          en: 'Turn up at their slot dressed as they would for a client meeting. The photographer sets the position, the angle and the expression, so nobody needs to have practised anything, and each person is back at their desk within the 45 minutes.',
          pt: 'Aparecer à hora marcada vestido como para uma reunião com um cliente. O fotógrafo define a posição, o ângulo e a expressão, por isso ninguém precisa de ter ensaiado nada, e cada pessoa está de volta à secretária dentro dos 45 minutos.',
        },
      },
      {
        question: {
          en: 'Some people are out of the office that day. Can they be matched later?',
          pt: 'Há pessoas que não estão no escritório nesse dia. Podem ser feitas depois?',
        },
        answer: {
          en: 'Yes, in a second visit or in a studio in the same city. Say that the portrait has to match the existing set and the photographer works from the images already delivered: the same background, head size and crop.',
          pt: 'Sim, numa segunda visita ou num estúdio na mesma cidade. Diga que o retrato tem de combinar com o conjunto existente e o fotógrafo trabalha a partir das imagens já entregues: o mesmo fundo, o mesmo tamanho de cabeça e o mesmo corte.',
        },
      },
      {
        question: {
          en: 'Can we use a wall in our office instead of a background?',
          pt: 'Podemos usar uma parede do escritório em vez de um fundo?',
        },
        answer: {
          en: 'Often, yes, as long as it is the same wall for everyone and there is room to put a couple of metres between the person and it, so it falls softly out of focus. It tends to look more like your company than a plain backdrop. Decide before the day, not halfway through the team.',
          pt: 'Muitas vezes, sim, desde que seja a mesma parede para toda a gente e haja espaço para pôr um par de metros entre a pessoa e a parede, para ela ficar suavemente desfocada. Costuma parecer-se mais com a empresa do que um fundo liso. Decida antes do dia, não a meio da equipa.',
        },
      },
      {
        question: {
          en: 'Can the company use the portraits on the website and in the press?',
          pt: 'A empresa pode usar os retratos no site e na imprensa?',
        },
        answer: {
          en: 'Yes, once it is agreed. The standard licence is personal, so business use — website, press, social media, advertising — is set out in writing with the quote, before the session, and matches what the company will actually do with the portraits.',
          pt: 'Sim, depois de acordado. A licença base é pessoal, por isso o uso empresarial — site, imprensa, redes sociais, publicidade — fica por escrito com o orçamento, antes da sessão, e corresponde ao que a empresa vai de facto fazer com os retratos.',
        },
      },
    ],
  },

  'personal-brand': {
    promise: {
      en: 'Sixty photographs planned around where they will be used — the homepage, the deck, a year of posts — made in one afternoon across two or three settings.',
      pt: 'Sessenta fotografias pensadas para onde vão ser usadas — o site, a apresentação, um ano de publicações — feitas numa tarde, em dois ou três cenários.',
    },
    audience: {
      en: [
        {
          title: 'Founders and one-person businesses',
          text: 'When the company is the person, the website, the pitch deck and the press page all need that person in them, and one headshot repeated on every page reads as exactly that.',
        },
        {
          title: 'Coaches, trainers and consultants who post every week',
          text: 'A post a week is fifty-two images a year. Sixty photographs planned with room for text is the difference between a content calendar and a search through the camera roll every Monday.',
        },
        {
          title: 'Makers with a place to show',
          text: 'Ceramicists, architects, tailors, chefs: the workshop is part of the argument. One setting can be where the work happens, so the photographs show hands, tools and material as well as a face.',
        },
      ],
      pt: [
        {
          title: 'Fundadores e negócios de uma pessoa só',
          text: 'Quando a empresa é a pessoa, o site, a apresentação a investidores e a página de imprensa precisam todos dela, e um único retrato repetido em cada página nota-se logo.',
        },
        {
          title: 'Coaches, formadores e consultores que publicam todas as semanas',
          text: 'Uma publicação por semana são cinquenta e duas imagens por ano. Sessenta fotografias pensadas com espaço para texto são a diferença entre um calendário editorial e andar à procura no rolo da câmara todas as segundas-feiras.',
        },
        {
          title: 'Quem tem um sítio de trabalho para mostrar',
          text: 'Ceramistas, arquitectos, alfaiates, cozinheiros: a oficina faz parte do argumento. Um dos cenários pode ser onde o trabalho acontece, para as fotografias mostrarem mãos, ferramentas e matéria, e não só uma cara.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send the list of places the images will go',
          text: 'Homepage banner, about page, a deck, a speaker profile, a social feed. Each destination fixes an orientation and whether there must be empty space for a headline.',
        },
        {
          title: 'Agree the settings and a shot list',
          text: 'We confirm a photographer, usually the same working day, and agree the two or three settings, the order of the afternoon, which outfit goes where and which frames each setting has to produce.',
        },
        {
          title: 'Two and a half hours, moving between settings',
          text: 'Each setting gets its share of the time and its own clothes. Working frames, portraits to camera and details are made in each one, so no setting ends up holding only one kind of image.',
        },
        {
          title: 'Sixty photographs in 72 hours',
          text: 'Retouched and delivered to a private gallery, with vertical and horizontal crops of every key frame, checked against the list you sent in the first step.',
        },
      ],
      pt: [
        {
          title: 'Envie a lista de sítios onde as imagens vão ser usadas',
          text: 'Topo do site, página sobre si, uma apresentação, um perfil de orador, as redes sociais. Cada destino define uma orientação e se é preciso deixar espaço vazio para um título.',
        },
        {
          title: 'Combinamos cenários e lista de planos',
          text: 'Confirmamos o fotógrafo, normalmente no mesmo dia útil, e fechamos os dois ou três cenários, a ordem da tarde, que roupa vai para onde e que imagens cada cenário tem de dar.',
        },
        {
          title: 'Duas horas e meia, a mudar de cenário',
          text: 'Cada cenário tem a sua parte do tempo e a sua roupa. Em cada um fazem-se imagens a trabalhar, retratos para a câmara e detalhes, para nenhum cenário ficar só com um tipo de fotografia.',
        },
        {
          title: 'Sessenta fotografias em 72 horas',
          text: 'Retocadas e entregues em galeria privada, com cortes vertical e horizontal de cada imagem principal, conferidas com a lista que enviou no primeiro passo.',
        },
      ],
    },
    prepare: {
      en: [
        'Write down every place the images will be used and bring the list; it becomes the shot list.',
        'Choose settings within walking distance of each other — time in a car is time not photographed.',
        'Bring one outfit per setting, ironed and on hangers, plus one spare top.',
        'Bring the objects of the work: the laptop, the notebook, the tools, the product.',
        'If a setting belongs to someone else — a café, a client’s office — get their permission before the day.',
        'Check your brand colours and leave at home anything that fights with them.',
      ],
      pt: [
        'Escreva todos os sítios onde as imagens vão ser usadas e leve a lista; é ela que se transforma na lista de planos.',
        'Escolha cenários a uma distância que se faça a pé — tempo passado no carro é tempo sem fotografias.',
        'Leve uma muda de roupa por cenário, passada e em cabide, e um top de reserva.',
        'Leve os objectos do trabalho: o portátil, o caderno, as ferramentas, o produto.',
        'Se um cenário for de outra pessoa — um café, o escritório de um cliente — peça autorização antes do dia.',
        'Veja as cores da sua marca e deixe em casa o que choca com elas.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Could we fit in a fourth setting?',
          pt: 'Dá para fazer um quarto cenário?',
        },
        answer: {
          en: 'Not well. With the change of clothes and the move between places, a fourth setting leaves each one with too little time to produce varied frames, and you end up with four thin sets instead of three useful ones. If you really need more, a longer session is an option quoted before you book.',
          pt: 'Não bem. Com a muda de roupa e a passagem de um sítio para o outro, um quarto cenário deixa a cada um pouco tempo para dar imagens variadas, e acaba com quatro conjuntos fracos em vez de três úteis. Se precisar mesmo de mais, uma sessão mais longa é uma opção orçamentada antes de reservar.',
        },
      },
      {
        question: {
          en: 'Can a colleague or a client appear in some of the photographs?',
          pt: 'Um colega ou um cliente podem aparecer em algumas fotografias?',
        },
        answer: {
          en: 'Yes. A meeting, a consultation or a workshop reads better with a second person in it. Their time comes out of the same two and a half hours, so plan which setting they join rather than having them on hand all afternoon.',
          pt: 'Sim. Uma reunião, uma consulta ou uma formação lê-se melhor com uma segunda pessoa. O tempo dela sai das mesmas duas horas e meia, por isso combine em que cenário entra em vez de a ter à espera a tarde toda.',
        },
      },
      {
        question: {
          en: 'Are hair and make-up included?',
          pt: 'O cabelo e a maquilhagem estão incluídos?',
        },
        answer: {
          en: 'No. The price covers the photographer’s time, the selection, the colour work and the gallery. If you want a make-up artist, book them for before the session starts and make sure they can touch you up between settings.',
          pt: 'Não. O preço cobre o tempo do fotógrafo, a selecção, o tratamento de cor e a galeria. Se quiser um maquilhador, marque-o para antes de a sessão começar e confirme que pode fazer retoques entre cenários.',
        },
      },
      {
        question: {
          en: 'What happens if it rains on an outdoor setting?',
          pt: 'E se chover num cenário de exterior?',
        },
        answer: {
          en: 'The session moves to another day at no cost. If only one setting is outdoors, it is sometimes simpler to swap it for an indoor one on the day — decide that with the photographer the evening before.',
          pt: 'A sessão passa para outro dia sem custo. Se só um cenário for exterior, às vezes é mais simples trocá-lo por um interior no próprio dia — combine isso com o fotógrafo na véspera.',
        },
      },
      {
        question: {
          en: 'Can I use the photographs to promote my business?',
          pt: 'Posso usar as fotografias para promover o meu negócio?',
        },
        answer: {
          en: 'Yes, and it is agreed up front. The standard licence is personal; for a branding session the business use — website, press, social media, advertising — is written into the quote before the session, so it covers the list of destinations you sent in the first step.',
          pt: 'Sim, e fica acordado à partida. A licença base é pessoal; numa sessão de branding, o uso no negócio — site, imprensa, redes sociais, publicidade — fica escrito no orçamento antes da sessão, para cobrir a lista de destinos que enviou no primeiro passo.',
        },
      },
    ],
  },

  'digital-nomad-headshots': {
    promise: {
      en: 'A headshot that looks like where you actually work — a street, a co-working desk, not a backdrop — photographed in an hour and on your profile tomorrow.',
      pt: 'Um retrato com o ar do sítio onde trabalha de facto — uma rua, uma secretária de cowork, não um fundo — feito numa hora e no seu perfil no dia seguinte.',
    },
    audience: {
      en: [
        {
          title: 'Remote employees on a distributed team',
          text: 'The company page is a grid of portraits made in offices, and yours was cropped from a holiday photograph. An hour here matches their framing without pretending you sit in their building.',
        },
        {
          title: 'Freelancers who are compared at thumbnail size',
          text: 'On hiring platforms and marketplaces a client sees a row of small squares before reading a word. A sharp, well-lit face in that square does most of the work.',
        },
        {
          title: 'Anyone starting a new contract this week',
          text: 'A new role arrives with a new chat avatar, an updated profile and an introduction to a team you have never met. Delivery in twenty-four hours is set for that week, not the next quarter.',
        },
      ],
      pt: [
        {
          title: 'Trabalhadores remotos numa equipa distribuída',
          text: 'A página da empresa é uma grelha de retratos feitos em escritórios, e o seu foi recortado de uma fotografia de férias. Uma hora chega para acertar o enquadramento com o dos colegas sem fingir que está no mesmo edifício.',
        },
        {
          title: 'Freelancers comparados em miniatura',
          text: 'Em plataformas de contratação, o cliente vê uma fila de quadrados pequenos antes de ler uma palavra. Uma cara nítida e bem iluminada nesse quadrado faz a maior parte do trabalho.',
        },
        {
          title: 'Quem começa um contrato novo esta semana',
          text: 'Um cargo novo traz um avatar novo, um perfil para actualizar e uma apresentação a uma equipa que nunca viu. A entrega em vinte e quatro horas está pensada para essa semana, não para o trimestre seguinte.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us where you are and when you are free',
          text: 'Your neighbourhood, your co-working space if you use one, and a window of time. Mention if your employer has a portrait style you need to match.',
        },
        {
          title: 'We choose the spot for the light',
          text: 'The photographer picks a street, a doorway or a corner of the co-working space that has soft light at your time, and sends the meeting point — usually the same working day.',
        },
        {
          title: 'One hour, a few backgrounds close together',
          text: 'A plain wall first for the formal profile, then a street or a desk with depth behind you for the rest, all a few minutes apart so the hour is spent photographing rather than walking.',
        },
        {
          title: 'Twenty images within 24 hours',
          text: 'Retouched, in a private gallery, with square, 4:5 and banner crops of every keeper: the square for avatars, the banner for profile headers, the 4:5 wherever a portrait is shown upright.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos onde está e quando pode',
          text: 'O bairro, o espaço de cowork se usar um, e uma janela de tempo. Diga também se a empresa tem um estilo de retrato com que tenha de combinar.',
        },
        {
          title: 'Escolhemos o sítio pela luz',
          text: 'O fotógrafo escolhe uma rua, uma entrada ou um canto do cowork com luz suave à hora combinada e envia o ponto de encontro — normalmente no mesmo dia útil.',
        },
        {
          title: 'Uma hora, alguns fundos perto uns dos outros',
          text: 'Primeiro uma parede lisa para o perfil formal, depois uma rua ou uma secretária com profundidade atrás, tudo a poucos minutos de distância para a hora ser passada a fotografar e não a andar.',
        },
        {
          title: 'Vinte imagens em 24 horas',
          text: 'Retocadas, em galeria privada, com cortes quadrado, 4:5 e banner de cada imagem escolhida: o quadrado para avatares, o banner para cabeçalhos de perfil, o 4:5 onde o retrato aparece na vertical.',
        },
      ],
    },
    prepare: {
      en: [
        'Wear what you would wear on a video call with your most important client, not what you wear to the beach.',
        'If you want the co-working space in the frame, check with the front desk that photographs are allowed.',
        'Send two or three of your colleagues’ portraits if your profile has to sit next to theirs.',
        'Keep the time the photographer proposes even if it is early; the light at that hour is why it was chosen.',
        'Bring a laptop only if you want working frames — profile portraits need nothing in your hands.',
      ],
      pt: [
        'Vista o que vestiria numa videochamada com o seu cliente mais importante, não o que leva para a praia.',
        'Se quiser o cowork na imagem, confirme na recepção que é permitido fotografar.',
        'Envie dois ou três retratos de colegas se o seu perfil tiver de ficar ao lado dos deles.',
        'Mantenha a hora que o fotógrafo propõe, mesmo que seja cedo; a luz a essa hora é a razão da escolha.',
        'Leve o portátil só se quiser imagens a trabalhar — um retrato de perfil não precisa de nada nas mãos.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'My company has a house style for portraits. Can you match it?',
          pt: 'A minha empresa tem um estilo de retrato. Conseguem acompanhá-lo?',
        },
        answer: {
          en: 'Send a few of your colleagues’ portraits with the booking. Outdoors the background will not be identical, but the framing can be — head size, crop and eye line — and framing is what makes a grid look like one team.',
          pt: 'Envie alguns retratos de colegas com a reserva. No exterior o fundo não fica igual, mas o enquadramento pode ficar — tamanho da cabeça, corte e linha dos olhos — e é o enquadramento que faz uma grelha parecer uma equipa.',
        },
      },
      {
        question: {
          en: 'A few of us are in town at the same time. Can we book together?',
          pt: 'Estamos vários na cidade ao mesmo tempo. Podemos marcar juntos?',
        },
        answer: {
          en: 'Yes, as back-to-back sessions with the same photographer in the same spot. Each person is one hour and twenty images, so three people is a three-hour block, and the portraits match across all of you.',
          pt: 'Sim, em sessões seguidas com o mesmo fotógrafo no mesmo sítio. Cada pessoa é uma hora e vinte imagens, por isso três pessoas são um bloco de três horas, e os retratos ficam coerentes entre todos.',
        },
      },
      {
        question: {
          en: 'What if the weather is bad on the day?',
          pt: 'E se o tempo estiver mau no dia?',
        },
        answer: {
          en: 'The session moves at no cost. If you work from a co-working space, the whole hour can also be done inside it, which keeps the 24-hour delivery on the week you needed it.',
          pt: 'A sessão muda de dia sem custo. Se trabalhar num cowork, a hora inteira também pode ser feita lá dentro, o que mantém a entrega em 24 horas na semana em que precisava dela.',
        },
      },
      {
        question: {
          en: 'Can my employer use the photograph too?',
          pt: 'A empresa onde trabalho também pode usar a fotografia?',
        },
        answer: {
          en: 'Your own profiles are covered by the standard licence, which is personal. If the company wants the portrait on its website, in press material or in advertising, say so when booking and that use is agreed in writing with the quote, before the session.',
          pt: 'Os seus perfis estão cobertos pela licença base, que é pessoal. Se a empresa quiser o retrato no site, em material de imprensa ou em publicidade, diga-o ao reservar e esse uso fica acordado por escrito com o orçamento, antes da sessão.',
        },
      },
    ],
  },
};
