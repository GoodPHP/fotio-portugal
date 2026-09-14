import type { Service } from '../types';

/**
 * The service catalogue.
 *
 * Deliberately asymmetric across the two languages, because the two audiences
 * arrive for different reasons. Someone searching in English is coming to
 * Portugal: a destination wedding, a honeymoon, a morning in Lisbon. Someone
 * searching in Portuguese lives here and wants a batizado, a session of
 * finalistas, a corporate headshot before a job move. Publishing each list in
 * the other language would produce pages aimed at nobody, so `availableIn`
 * narrows them.
 *
 * `slug` is identity and the English URL word; `slugs.pt` is the Portuguese
 * one. Portuguese slugs are ASCII — see the note in `src/i18n/pathnames.ts`.
 *
 * No service names a city. A service that does is a leaf page wearing a
 * service's clothes: it duplicates a `service × city` page the catalogue
 * already builds, with its own sitemap row and a competing canonical. The one
 * exception is `lisbon-photoshoot`, which has genuinely distinct English
 * search volume as a head term.
 */
export const SERVICES: Service[] = [
  // ---------------------------------------------------------------- portrait
  {
    slug: 'portrait',
    slugs: { pt: 'retrato-estudio' },
    name: { en: 'Studio portrait', pt: 'Retrato de estúdio' },
    category: 'individual',
    initialPrice: 150,
    durationMinutes: 60,
    editedPhotos: 25,
    description: {
      en: 'A controlled-light portrait session for a profile, a press kit or a book.',
      pt: 'Uma sessão em luz controlada para um perfil, um dossier de imprensa ou um book.',
    },
    deliverables: {
      en: [
        '25 retouched photographs',
        'Two lighting set-ups and two backgrounds',
        'Selection made together at the end of the session',
        'Private gallery within 48–72 hours',
      ],
      pt: [
        '25 fotografias retocadas',
        'Dois esquemas de luz e dois fundos',
        'Selecção feita em conjunto no fim da sessão',
        'Galeria privada em 48 a 72 horas',
      ],
    },
    faqs: [
      {
        question: { en: 'What should I bring?', pt: 'O que devo levar?' },
        answer: {
          en: 'Two or three plain tops, and whatever you actually wear to work. Fine stripes and small checks shimmer on screen; solid mid-tones do not.',
          pt: 'Duas ou três peças lisas, e aquilo que veste mesmo para trabalhar. Riscas finas e xadrez pequeno tremem no ecrã; os tons médios lisos não.',
        },
      },
    ],
  },
  {
    slug: 'lifestyle-portrait',
    slugs: { pt: 'retrato-lifestyle' },
    name: { en: 'Lifestyle portrait', pt: 'Retrato lifestyle' },
    category: 'individual',
    initialPrice: 170,
    durationMinutes: 75,
    editedPhotos: 30,
    description: {
      en: 'The same portrait, made outdoors and in motion rather than against a background.',
      pt: 'O mesmo retrato, feito na rua e em movimento em vez de contra um fundo.',
    },
    deliverables: {
      en: ['30 retouched photographs', 'Two locations within walking distance', 'Private gallery within 48–72 hours'],
      pt: ['30 fotografias retocadas', 'Dois locais a distância de caminhada', 'Galeria privada em 48 a 72 horas'],
    },
    faqs: [],
  },

  // ----------------------------------------------------------------- couples
  {
    slug: 'couple',
    slugs: { pt: 'sessao-de-casal' },
    name: { en: 'Couple session', pt: 'Sessão de casal' },
    category: 'couples',
    initialPrice: 190,
    durationMinutes: 90,
    editedPhotos: 40,
    description: {
      en: 'A walk through one neighbourhood at the hour the light is low, photographed as it happens.',
      pt: 'Um passeio por uma zona da cidade à hora em que a luz é baixa, fotografado à medida que acontece.',
    },
    deliverables: {
      en: [
        '40 retouched photographs',
        'Two locations, on foot',
        'Route planned around the light, not the diary',
        'Private gallery within 48–72 hours',
      ],
      pt: [
        '40 fotografias retocadas',
        'Dois locais, a pé',
        'Percurso pensado em função da luz, não da agenda',
        'Galeria privada em 48 a 72 horas',
      ],
    },
    faqs: [
      {
        question: {
          en: 'We are not comfortable in front of a camera. Does that matter?',
          pt: 'Não somos à-vontade em frente à câmara. Isso é problema?',
        },
        answer: {
          en: 'It is the normal case, not the exception. The first fifteen minutes are deliberately spent walking and talking rather than posing, and almost nothing from them is kept. What comes after is the session.',
          pt: 'É o caso normal, não a excepção. Os primeiros quinze minutos passam-se a andar e a conversar, não a posar, e quase nada deles fica. O que vem a seguir é a sessão.',
        },
      },
    ],
  },
  {
    slug: 'proposal',
    slugs: { pt: 'pedido-de-casamento' },
    name: { en: 'Proposal session', pt: 'Pedido de casamento' },
    category: 'couples',
    initialPrice: 250,
    durationMinutes: 60,
    editedPhotos: 35,
    description: {
      en: 'The moment itself, photographed from a distance, then a short session once the surprise is over.',
      pt: 'O momento em si, fotografado à distância, e depois uma sessão curta quando a surpresa já passou.',
    },
    deliverables: {
      en: [
        '35 retouched photographs',
        'Location and timing scouted in advance',
        'Photographed unseen, then 30 minutes together afterwards',
        'Private gallery within 48 hours',
      ],
      pt: [
        '35 fotografias retocadas',
        'Local e hora reconhecidos com antecedência',
        'Fotografado sem ser visto, e depois 30 minutos em conjunto',
        'Galeria privada em 48 horas',
      ],
    },
    faqs: [
      {
        question: { en: 'How do we agree a signal?', pt: 'Como combinamos um sinal?' },
        answer: {
          en: 'A fixed spot and a fixed minute, agreed the day before. Signals given on the day — a hand in a pocket, a phrase — fail, because you will be thinking about something else entirely.',
          pt: 'Um ponto fixo e um minuto fixo, combinados na véspera. Sinais dados no próprio dia — uma mão no bolso, uma frase — falham, porque vai estar a pensar noutra coisa.',
        },
      },
    ],
  },

  // ------------------------------------------------------------------ family
  {
    slug: 'family',
    slugs: { pt: 'fotografo-de-familia' },
    name: { en: 'Family session', pt: 'Fotografia de família' },
    category: 'family',
    initialPrice: 200,
    durationMinutes: 75,
    editedPhotos: 40,
    description: {
      en: 'Outdoors, at the children’s pace, with enough frames that the good ones are not an accident.',
      pt: 'Ao ar livre, ao ritmo das crianças, com fotografias suficientes para que as boas não sejam um acaso.',
    },
    deliverables: {
      en: ['40 retouched photographs', 'One location, no rush', 'Private gallery within 48–72 hours'],
      pt: ['40 fotografias retocadas', 'Um local, sem pressa', 'Galeria privada em 48 a 72 horas'],
    },
    faqs: [
      {
        question: { en: 'What time works with small children?', pt: 'Que hora resulta com crianças pequenas?' },
        answer: {
          en: 'Early morning, before the nap and before the heat. A late-afternoon session has better light and a worse mood, and the mood wins.',
          pt: 'De manhã cedo, antes da sesta e antes do calor. Ao fim da tarde a luz é melhor e a disposição é pior, e a disposição ganha sempre.',
        },
      },
    ],
  },
  {
    slug: 'maternity',
    slugs: { pt: 'sessao-de-gravidez' },
    name: { en: 'Maternity session', pt: 'Sessão de gravidez' },
    category: 'family',
    initialPrice: 190,
    durationMinutes: 75,
    editedPhotos: 30,
    description: {
      en: 'Booked between 30 and 36 weeks, which is when it photographs best and is still comfortable.',
      pt: 'Marcada entre as 30 e as 36 semanas, que é quando fotografa melhor e ainda é confortável.',
    },
    deliverables: {
      en: ['30 retouched photographs', 'Outdoors or at home', 'Private gallery within 48–72 hours'],
      pt: ['30 fotografias retocadas', 'Ao ar livre ou em casa', 'Galeria privada em 48 a 72 horas'],
    },
    faqs: [],
  },
  {
    slug: 'newborn',
    slugs: { pt: 'recem-nascido' },
    name: { en: 'Newborn session', pt: 'Sessão de recém-nascido' },
    category: 'family',
    initialPrice: 220,
    durationMinutes: 120,
    editedPhotos: 30,
    description: {
      en: 'At home, in the first fortnight, working around feeds rather than against them.',
      pt: 'Em casa, nas primeiras duas semanas, a trabalhar à volta das mamadas e não contra elas.',
    },
    deliverables: {
      en: [
        '30 retouched photographs',
        'At your home, with natural light',
        'Two hours booked so nothing is hurried',
        'Private gallery within 72 hours',
      ],
      pt: [
        '30 fotografias retocadas',
        'Em sua casa, com luz natural',
        'Duas horas marcadas para que nada seja à pressa',
        'Galeria privada em 72 horas',
      ],
    },
    faqs: [],
  },
  {
    slug: 'batizado',
    availableIn: ['pt'],
    name: { en: 'Christening', pt: 'Batizado' },
    category: 'family',
    initialPrice: 350,
    durationMinutes: 240,
    editedPhotos: 120,
    description: {
      en: 'Church ceremony and the meal that follows.',
      pt: 'A cerimónia na igreja e o almoço que se segue.',
    },
    deliverables: {
      en: ['120 retouched photographs', 'Ceremony and reception', 'Private gallery within a week'],
      pt: [
        '120 fotografias retocadas',
        'Cerimónia e copo-d’água',
        'Falamos com a paróquia sobre o que é permitido fotografar',
        'Galeria privada no prazo de uma semana',
      ],
    },
    faqs: [
      {
        question: { en: 'Can you photograph inside the church?', pt: 'Pode fotografar dentro da igreja?' },
        answer: {
          en: 'It depends on the parish, and it is asked beforehand, never on the day.',
          pt: 'Depende da paróquia, e pergunta-se antes, nunca no próprio dia. Há igrejas que pedem que o fotógrafo fique atrás de uma linha durante o rito; saber isso na véspera muda onde nos colocamos, e não estraga nada.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------- weddings
  {
    slug: 'wedding',
    slugs: { pt: 'casamento' },
    name: { en: 'Wedding', pt: 'Casamento' },
    category: 'wedding',
    initialPrice: 1400,
    durationMinutes: 600,
    editedPhotos: 400,
    description: {
      en: 'Ten hours, from getting ready to the first hour of the party.',
      pt: 'Dez horas, dos preparativos à primeira hora da festa.',
    },
    deliverables: {
      en: [
        '400 retouched photographs',
        'Ten hours of coverage',
        'A timing plan agreed a month beforehand',
        'Private gallery within three weeks',
      ],
      pt: [
        '400 fotografias retocadas',
        'Dez horas de cobertura',
        'Plano de horários acordado um mês antes',
        'Galeria privada em três semanas',
      ],
    },
    faqs: [
      {
        question: {
          en: 'When should the ceremony be, for the photographs?',
          pt: 'A que horas deve ser a cerimónia, do ponto de vista das fotografias?',
        },
        answer: {
          en: 'Late enough that the portraits afterwards fall in the last hour of light. In Portugal in July that means a ceremony at six, not at four — at four you are photographing in overhead sun and everyone is squinting.',
          pt: 'Tarde o suficiente para que os retratos a seguir caiam na última hora de luz. Em Portugal, em Julho, isso quer dizer cerimónia às seis e não às quatro — às quatro fotografa-se com o sol a pique e toda a gente de olhos semicerrados.',
        },
      },
    ],
  },
  {
    slug: 'elopement',
    slugs: { pt: 'casamento-intimo' },
    name: { en: 'Elopement', pt: 'Casamento íntimo' },
    category: 'wedding',
    initialPrice: 900,
    durationMinutes: 300,
    editedPhotos: 200,
    description: {
      en: 'Two of you, or a dozen, and five hours with no schedule to defend.',
      pt: 'Os dois, ou uma dúzia, e cinco horas sem horário a cumprir.',
    },
    deliverables: {
      en: [
        '200 retouched photographs',
        'Five hours of coverage',
        'Locations scouted for the hour you are there',
        'Private gallery within two weeks',
      ],
      pt: [
        '200 fotografias retocadas',
        'Cinco horas de cobertura',
        'Locais reconhecidos para a hora em que lá vai estar',
        'Galeria privada em duas semanas',
      ],
    },
    faqs: [],
  },
  {
    slug: 'destination-wedding',
    availableIn: ['en'],
    name: { en: 'Destination wedding', pt: 'Casamento de destino' },
    category: 'wedding',
    initialPrice: 1900,
    durationMinutes: 720,
    editedPhotos: 500,
    description: {
      en: 'Twelve hours, two days on the ground, and the paperwork question answered before you book anything.',
      pt: 'Doze horas e dois dias no local.',
    },
    deliverables: {
      en: [
        '500 retouched photographs',
        'Twelve hours of coverage, plus a scouting visit the day before',
        'A written answer on what your ceremony does and does not require legally',
        'Private gallery within three weeks',
      ],
      pt: [
        '500 fotografias retocadas',
        'Doze horas de cobertura, mais uma visita de reconhecimento na véspera',
        'Galeria privada em três semanas',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Can we actually get legally married in Portugal?',
          pt: 'Podemos mesmo casar legalmente em Portugal?',
        },
        answer: {
          en: 'Yes, and this is the part most couples get wrong because they are reading advice written for France or Italy. Portugal sets no residency requirement for foreigners: a civil marriage is processed at a Conservatória do Registo Civil, and what it needs is documents rather than time spent living here. Confirm the current list with the conservatória you will use — it varies by nationality — but the structural answer is that you do not have to live here first.',
          pt: 'Sim. Portugal não exige residência a estrangeiros: o processo preliminar de casamento corre numa Conservatória do Registo Civil e o que é preciso são documentos, não tempo de residência.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------- vacation
  {
    slug: 'vacation',
    slugs: { pt: 'sessao-de-ferias' },
    name: { en: 'Holiday session', pt: 'Sessão de férias' },
    category: 'vacation',
    initialPrice: 180,
    durationMinutes: 60,
    editedPhotos: 30,
    description: {
      en: 'An hour out of a trip, at the one time of day the place is worth photographing.',
      pt: 'Uma hora tirada a uma viagem, à única hora do dia em que o sítio vale a pena.',
    },
    deliverables: {
      en: ['30 retouched photographs', 'One hour, one neighbourhood', 'Private gallery within 48 hours'],
      pt: ['30 fotografias retocadas', 'Uma hora, uma zona', 'Galeria privada em 48 horas'],
    },
    faqs: [],
  },
  {
    slug: 'honeymoon',
    availableIn: ['en'],
    name: { en: 'Honeymoon session', pt: 'Sessão de lua de mel' },
    category: 'vacation',
    initialPrice: 240,
    durationMinutes: 90,
    editedPhotos: 40,
    description: {
      en: 'The one set of photographs of the two of you that is not from the wedding day.',
      pt: 'O único conjunto de fotografias dos dois que não é do dia do casamento.',
    },
    deliverables: {
      en: ['40 retouched photographs', 'Ninety minutes, two locations', 'Private gallery within 48 hours'],
      pt: ['40 fotografias retocadas', 'Noventa minutos, dois locais', 'Galeria privada em 48 horas'],
    },
    faqs: [],
  },
  {
    slug: 'lisbon-photoshoot',
    availableIn: ['en'],
    name: { en: 'Lisbon photoshoot', pt: 'Sessão fotográfica em Lisboa' },
    category: 'vacation',
    initialPrice: 190,
    durationMinutes: 90,
    editedPhotos: 40,
    description: {
      en: 'A morning in the city, planned around where the light lands rather than around a list of sights.',
      pt: 'Uma manhã na cidade, planeada pela luz e não por uma lista de monumentos.',
    },
    deliverables: {
      en: [
        '40 retouched photographs',
        'Ninety minutes, two or three miradouros on foot',
        'Start time set by the light, which in summer means before eight',
        'Private gallery within 48 hours',
      ],
      pt: [
        '40 fotografias retocadas',
        'Noventa minutos, dois ou três miradouros a pé',
        'Galeria privada em 48 horas',
      ],
    },
    faqs: [
      {
        question: { en: 'Can we do the session on tram 28?', pt: 'Podemos fazer a sessão no eléctrico 28?' },
        answer: {
          en: 'Not on board, and the honest reason is that the 28E is a commuter line. Boarding with equipment at nine in the morning gets you a carriage full of people and gets in their way. The photographs worth having are of the tram passing — at Graça, Escolas Gerais or Portas do Sol, in the first hour of service. The 12E loop is quieter and runs the same street furniture.',
          pt: 'A bordo não. O 28E é uma linha de quem vive na cidade e a partir das nove vai cheio.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------- business
  {
    slug: 'headshots',
    slugs: { pt: 'retrato-corporativo' },
    name: { en: 'Corporate headshots', pt: 'Retrato corporativo' },
    category: 'business',
    initialPrice: 150,
    durationMinutes: 45,
    editedPhotos: 15,
    description: {
      en: 'One consistent look across a team, or one portrait that does not look like a passport photo.',
      pt: 'Um registo coerente para toda a equipa, ou um retrato que não pareça uma foto tipo passe.',
    },
    deliverables: {
      en: [
        '15 retouched photographs per person',
        'At your office or in studio',
        'Consistent framing and background across a team',
        'Private gallery within 48 hours',
      ],
      pt: [
        '15 fotografias retocadas por pessoa',
        'No seu escritório ou em estúdio',
        'Enquadramento e fundo coerentes para toda a equipa',
        'Galeria privada em 48 horas',
      ],
    },
    faqs: [],
  },
  {
    slug: 'personal-brand',
    slugs: { pt: 'personal-branding' },
    name: { en: 'Personal branding', pt: 'Personal branding' },
    category: 'business',
    initialPrice: 290,
    durationMinutes: 150,
    editedPhotos: 60,
    description: {
      en: 'A library of images for a site, a deck and a year of posts, made in one afternoon.',
      pt: 'Um acervo de imagens para um site, uma apresentação e um ano de publicações, feito numa tarde.',
    },
    deliverables: {
      en: [
        '60 retouched photographs',
        'Two and a half hours, two or three settings',
        'Vertical and horizontal crops of every key frame',
        'Private gallery within 72 hours',
      ],
      pt: [
        '60 fotografias retocadas',
        'Duas horas e meia, dois ou três cenários',
        'Cortes vertical e horizontal de cada imagem principal',
        'Galeria privada em 72 horas',
      ],
    },
    faqs: [],
  },
  {
    slug: 'digital-nomad-headshots',
    availableIn: ['en'],
    name: { en: 'Remote-work headshots', pt: 'Retratos para trabalho remoto' },
    category: 'business',
    initialPrice: 150,
    durationMinutes: 60,
    editedPhotos: 20,
    description: {
      en: 'A profile photograph made where you actually are, for people whose employer is four time zones away.',
      pt: 'Uma fotografia de perfil feita onde está mesmo.',
    },
    deliverables: {
      en: [
        '20 retouched photographs',
        'Outdoors or in a co-working space, not a studio',
        'Square, 4:5 and banner crops of every keeper',
        'Private gallery within 24 hours',
      ],
      pt: ['20 fotografias retocadas', 'Galeria privada em 24 horas'],
    },
    faqs: [],
  },
  {
    slug: 'eventos-de-empresa',
    availableIn: ['pt'],
    name: { en: 'Corporate event', pt: 'Eventos de empresa' },
    category: 'business',
    initialPrice: 450,
    durationMinutes: 300,
    editedPhotos: 200,
    description: {
      en: 'Conferences, launches and the annual dinner.',
      pt: 'Conferências, lançamentos e o jantar de final de ano.',
    },
    deliverables: {
      en: ['200 retouched photographs', 'Five hours', 'A first selection the same evening'],
      pt: [
        '200 fotografias retocadas',
        'Cinco horas de cobertura',
        'Uma primeira selecção na mesma noite, para comunicação',
        'Galeria privada em 72 horas',
      ],
    },
    faqs: [],
  },

  // -------------------------------------------------------------- commercial
  {
    slug: 'real-estate',
    slugs: { pt: 'fotografia-imobiliaria' },
    name: { en: 'Property & Alojamento Local', pt: 'Fotografia imobiliária e Alojamento Local' },
    category: 'commercial',
    initialPrice: 160,
    durationMinutes: 90,
    editedPhotos: 25,
    description: {
      en: 'Interiors photographed at the hour the flat actually gets its light, for a listing that is not lying.',
      pt: 'Interiores fotografados à hora em que a casa recebe mesmo luz, para um anúncio que não engana.',
    },
    deliverables: {
      en: [
        '25 retouched photographs',
        'Shot at the time of day the rooms face the sun',
        'Verticals corrected, colour cast removed',
        'Delivered within 24 hours',
      ],
      pt: [
        '25 fotografias retocadas',
        'Fotografado à hora do dia em que as divisões apanham sol',
        'Verticais corrigidas e dominantes de cor removidas',
        'Entrega em 24 horas',
      ],
    },
    faqs: [],
  },
  {
    slug: 'food',
    slugs: { pt: 'fotografia-gastronomica' },
    name: { en: 'Restaurant & food', pt: 'Fotografia gastronómica' },
    category: 'commercial',
    initialPrice: 320,
    durationMinutes: 180,
    editedPhotos: 30,
    description: {
      en: 'A menu photographed in one service, in the room it is served in.',
      pt: 'Uma ementa fotografada num serviço, na sala onde é servida.',
    },
    deliverables: {
      en: ['30 retouched photographs', 'Up to twelve dishes', 'Shot on site, in daylight where the room allows', 'Delivered within 72 hours'],
      pt: [
        '30 fotografias retocadas',
        'Até doze pratos',
        'Fotografado no local, com luz natural sempre que a sala o permite',
        'Entrega em 72 horas',
      ],
    },
    faqs: [],
  },

  // ----------------------------------------------------------------- fashion
  {
    slug: 'book-de-modelo',
    availableIn: ['pt'],
    name: { en: 'Model portfolio', pt: 'Book de modelo' },
    category: 'fashion',
    initialPrice: 250,
    durationMinutes: 180,
    editedPhotos: 40,
    description: {
      en: 'A portfolio an agency will actually look at.',
      pt: 'Um book que uma agência abre de facto.',
    },
    deliverables: {
      en: ['40 retouched photographs', 'Three looks', 'Digitals and editorial frames'],
      pt: [
        '40 fotografias retocadas',
        'Três looks',
        'Polaroids de agência e imagens editoriais no mesmo book',
        'Galeria privada em uma semana',
      ],
    },
    faqs: [],
  },

  // ------------------------------------------------------------------- other
  {
    slug: 'finalistas',
    availableIn: ['pt'],
    name: { en: 'Graduation', pt: 'Finalistas' },
    category: 'other',
    initialPrice: 160,
    durationMinutes: 90,
    editedPhotos: 40,
    description: {
      en: 'Capa e batina, in the city the tradition belongs to.',
      pt: 'Capa e batina, na cidade a que a tradição pertence.',
    },
    deliverables: {
      en: ['40 retouched photographs', 'Ninety minutes', 'Individual and group frames'],
      pt: [
        '40 fotografias retocadas',
        'Noventa minutos, individual e de grupo',
        'Marcações à volta da Queima das Fitas e da Latada',
        'Galeria privada em 72 horas',
      ],
    },
    faqs: [
      {
        question: { en: 'When should we book?', pt: 'Com que antecedência devemos marcar?' },
        answer: {
          en: 'Well before May.',
          pt: 'Bem antes de Maio. A semana da Queima esgota com meses de antecedência e é a única altura do ano em que a cidade inteira quer o mesmo fim de tarde. A Latada, no início do ano lectivo, é bastante mais fácil de marcar.',
        },
      },
    ],
  },
];
