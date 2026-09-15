import type { ServiceLanding } from './service-landing';

/**
 * Conversion sections for the holiday, honeymoon and Lisbon sessions.
 * See `service-landing.ts` for what each block is for.
 *
 * The buyer is a traveller with a fixed number of days, booking from abroad.
 * Figures — duration, photograph count, delivery — are the catalogue's, and
 * locations are the spots named in the city records with the times given there.
 */
export const LIFESTYLE_SERVICE_LANDING: Record<string, ServiceLanding> = {
  vacation: {
    promise: {
      en: 'Photographs of the trip with all of you in them — one hour, one neighbourhood, at the hour the place works, and in your gallery before you fly home.',
      pt: 'Fotografias da viagem com todos lá dentro — uma hora, uma zona, à hora em que o sítio resulta, e na galeria antes do voo de regresso.',
    },
    audience: {
      en: [
        {
          title: 'Whoever usually holds the phone',
          text: 'Every trip has one person who appears in none of the photographs. It is usually that person who books, and the hour is mostly spent making up for it.',
        },
        {
          title: 'Families on a school holiday',
          text: 'Children manage one hour in one place far better than a morning of moving between sights. And children still on another time zone, awake at dawn anyway, turn the early light into the easy option.',
        },
        {
          title: 'Friends and solo travellers on a short stay',
          text: 'A long weekend in Lisbon or Porto has no room for a half-day shoot. An hour at the right time fits before the day starts and leaves the plan intact — and ends the run of arm’s-length selfies.',
        },
      ],
      pt: [
        {
          title: 'Quem costuma segurar o telemóvel',
          text: 'Em todas as viagens há alguém que não aparece em fotografia nenhuma. Normalmente é essa pessoa que marca, e a hora serve sobretudo para compensar isso.',
        },
        {
          title: 'Famílias em férias escolares',
          text: 'As crianças aguentam muito melhor uma hora num só sítio do que uma manhã a saltar entre monumentos. E crianças ainda noutro fuso horário, acordadas de madrugada de qualquer forma, fazem da luz cedo a opção fácil.',
        },
        {
          title: 'Amigos e quem viaja sozinho, por poucos dias',
          text: 'Um fim-de-semana prolongado em Lisboa ou no Porto não tem espaço para meio dia de fotografias. Uma hora à hora certa cabe antes de o dia começar e deixa o plano intacto — e acaba com as selfies de braço esticado.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us the city, the dates and who is coming',
          text: 'Where you are staying and which days are already spoken for is enough. We suggest the neighbourhood and the hour — and the hour is the part worth discussing.',
        },
        {
          title: 'We confirm a photographer, a time and a meeting point',
          text: 'Usually the same working day, so it can all be settled from home before you fly. You get a named photographer and a meeting point you can find on a map.',
        },
        {
          title: 'One hour, on foot',
          text: 'No car and no second district. The photographer walks you through the streets that work at that hour and directs as you go, so nobody has to invent a pose in front of strangers.',
        },
        {
          title: 'Thirty photographs within 48 hours',
          text: 'Thirty retouched photographs in a private gallery within 48 hours — on your phone while you are still on the trip, early enough to send home before you get there.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos a cidade, as datas e quem vem',
          text: 'Onde fica alojado e que dias já estão ocupados chega. Sugerimos a zona e a hora — e a hora é a parte que vale a pena discutir.',
        },
        {
          title: 'Confirmamos fotógrafo, hora e ponto de encontro',
          text: 'Normalmente no mesmo dia útil, para ficar tudo tratado a partir de casa antes do voo. Recebe o nome do fotógrafo e um ponto de encontro que se encontra num mapa.',
        },
        {
          title: 'Uma hora, a pé',
          text: 'Sem carro e sem segundo bairro. O fotógrafo leva-os pelas ruas que resultam àquela hora e vai orientando, para ninguém ter de inventar uma pose à frente de desconhecidos.',
        },
        {
          title: 'Trinta fotografias em 48 horas',
          text: 'Trinta fotografias retocadas numa galeria privada em 48 horas — no telemóvel ainda durante a viagem, a tempo de as mandar para casa antes de lá chegarem.',
        },
      ],
    },
    prepare: {
      en: [
        'Put the session in the first half of the trip, not on the last morning — a wet day then has somewhere to go.',
        'Coordinate colours rather than matching them: two or three shades that sit together, no logos, no large print across the chest.',
        'Wear shoes you have already walked in on this trip; an hour on cobbles is not the moment to break in new sandals.',
        'With small children, tell us when the nap is. The hour is planned around it, and a rested three-year-old beats better light.',
        'Leave the day bag and the souvenirs at the hotel. Anything you carry ends up in the photographs.',
      ],
      pt: [
        'Marque a sessão na primeira metade da viagem, não na última manhã — assim um dia de chuva tem para onde ir.',
        'Combine as cores em vez de as igualar: dois ou três tons que fiquem bem juntos, sem logótipos nem estampados grandes no peito.',
        'Calce sapatos com que já tenha andado nesta viagem; uma hora na calçada não é o momento de estrear sandálias.',
        'Com crianças pequenas, diga-nos a que horas é a sesta. A hora planeia-se à volta dela, e uma criança de três anos descansada vale mais do que melhor luz.',
        'Deixe a mochila e as compras no hotel. Tudo o que levar acaba nas fotografias.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Which day of the trip should we book?',
          pt: 'Em que dia da viagem devemos marcar?',
        },
        answer: {
          en: 'Not the day you land. After an overnight flight nobody looks rested, whatever the light is doing. The second or third day is the usual choice: travellers from the Americas are still waking early, which suits a morning slot, and there are enough days left to absorb a change of plan.',
          pt: 'Não no dia em que chega. Depois de um voo nocturno ninguém tem ar descansado, faça a luz o que fizer. O segundo ou terceiro dia é a escolha habitual: quem vem das Américas ainda acorda cedo, o que dá jeito a uma sessão de manhã, e sobram dias para acomodar uma mudança de planos.',
        },
      },
      {
        question: {
          en: 'Can we book it all from abroad, before we arrive?',
          pt: 'Podemos tratar de tudo a partir do estrangeiro, antes de chegar?',
        },
        answer: {
          en: 'Yes — for a holiday session that is the normal case. Send the city, the dates and where you are staying. Confirmation, with the photographer and the meeting point, usually comes back the same working day, so the hour is fixed before you pack.',
          pt: 'Sim — numa sessão de férias é o caso normal. Envie a cidade, as datas e onde vai ficar. A confirmação, com o fotógrafo e o ponto de encontro, chega normalmente no mesmo dia útil, e a hora fica marcada antes de fazer a mala.',
        },
      },
      {
        question: {
          en: 'Our children will not stand still for an hour. Does that matter?',
          pt: 'Os nossos filhos não ficam quietos uma hora. Isso é um problema?',
        },
        answer: {
          en: 'No, and they are not asked to. Children need about twenty minutes to stop performing for the camera, so the hour starts with walking and playing rather than a group line-up. The frames of everyone together are taken once they have forgotten the photographer is there.',
          pt: 'Não, e ninguém lhes pede isso. As crianças precisam de uns vinte minutos para deixarem de representar para a câmara, por isso a hora começa com passeio e brincadeira e não com a família em fila. As fotografias de todos juntos fazem-se quando já se esqueceram do fotógrafo.',
        },
      },
      {
        question: {
          en: 'What if the weather turns on the day?',
          pt: 'E se o tempo mudar no próprio dia?',
        },
        answer: {
          en: 'It depends on the place more than the forecast. Porto in the wet months is planned with an indoor alternative; Sintra is at its best in mist; in the Azores Furnas works in any weather. Tell us when booking which other days you have free, which is why the session belongs early in the trip.',
          pt: 'Depende mais do sítio do que da previsão. O Porto nos meses de chuva planeia-se com uma alternativa coberta; Sintra fica no seu melhor com nevoeiro; nos Açores as Furnas resultam com qualquer tempo. Diga-nos ao reservar que outros dias tem livres — é por isso que a sessão deve ficar no início da viagem.',
        },
      },
      {
        question: {
          en: 'We are visiting Lisbon and Porto. Can one session cover both?',
          pt: 'Vamos a Lisboa e ao Porto. Uma sessão pode cobrir as duas?',
        },
        answer: {
          en: 'No — one hour is one neighbourhood, and the two cities want opposite hours anyway: the Lisbon miradouros before nine, the Porto riverfront after six. If you want both, book two sessions, each at the hour its city works.',
          pt: 'Não — uma hora é uma zona, e as duas cidades pedem horas opostas: os miradouros de Lisboa antes das nove, a frente ribeirinha do Porto depois das seis. Se quiser as duas, marque duas sessões, cada uma à hora em que a sua cidade resulta.',
        },
      },
    ],
  },

  honeymoon: {
    promise: {
      en: 'Ninety minutes of the two of you, a week or two after the wedding, with nothing to organise — forty photographs from two locations, in your gallery within 48 hours.',
      pt: 'Noventa minutos dos dois, uma ou duas semanas depois do casamento, sem nada para organizar — quarenta fotografias em dois locais, na galeria em 48 horas.',
    },
    audience: {
      en: [
        {
          title: 'Couples who married somewhere else',
          text: 'The wedding was at home, with a schedule, a guest list and a photographer working to a shot list. Portugal is the first time since then that nobody needs anything from you.',
        },
        {
          title: 'Couples who eloped or signed at a registry',
          text: 'No photographer on the day, or ten minutes on the steps outside. This is the unhurried version, at a clifftop or a crater lake rather than a council building.',
        },
        {
          title: 'Anniversary trips',
          text: 'The session works the same for a tenth anniversary as for the first week married. Nobody asks to see the certificate.',
        },
      ],
      pt: [
        {
          title: 'Casais que casaram noutro sítio',
          text: 'O casamento foi em casa, com horários, lista de convidados e um fotógrafo a cumprir uma lista de fotografias. Portugal é a primeira vez desde então que ninguém precisa de nada de vocês.',
        },
        {
          title: 'Casais que fugiram ou assinaram no registo',
          text: 'Sem fotógrafo no dia, ou dez minutos nas escadas à saída. Esta é a versão sem pressa, numa arriba ou junto a uma lagoa de cratera em vez de à porta de uma repartição.',
        },
        {
          title: 'Viagens de aniversário',
          text: 'A sessão funciona igual num décimo aniversário e na primeira semana de casados. Ninguém pede para ver a certidão.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us where and when',
          text: 'The Algarve, Madeira, the Azores or a city, and the dates you are there. Tides in the Algarve and cloud on the islands are checked for those dates before anything is suggested.',
        },
        {
          title: 'We propose two locations and an hour',
          text: 'Chosen as a pair, close enough that the move between them fits inside the ninety minutes. Confirmation, with a named photographer and a meeting point, usually arrives the same working day.',
        },
        {
          title: 'First the light, then the easy one',
          text: 'The first location is where the light is — Ponta da Piedade at sunrise, Pico do Arieiro above the cloud. The second is where you stop being careful. The photographer directs throughout, mostly towards walking and talking.',
        },
        {
          title: 'Forty photographs within 48 hours',
          text: 'Forty retouched photographs in a private gallery within 48 hours, so the first set of pictures as a married couple that is not from the wedding arrives while you are still away.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos onde e quando',
          text: 'O Algarve, a Madeira, os Açores ou uma cidade, e as datas em que lá estão. As marés no Algarve e a nuvem nas ilhas vêem-se para essas datas antes de se sugerir o que quer que seja.',
        },
        {
          title: 'Propomos dois locais e uma hora',
          text: 'Escolhidos em conjunto, perto o suficiente para a mudança caber nos noventa minutos. A confirmação, com o nome do fotógrafo e o ponto de encontro, chega normalmente no mesmo dia útil.',
        },
        {
          title: 'Primeiro a luz, depois o sítio fácil',
          text: 'O primeiro local é onde está a luz — a Ponta da Piedade ao nascer do sol, o Pico do Arieiro acima da nuvem. O segundo é onde deixam de ter cuidado. O fotógrafo orienta do princípio ao fim, sobretudo para andarem e conversarem.',
        },
        {
          title: 'Quarenta fotografias em 48 horas',
          text: 'Quarenta fotografias retocadas numa galeria privada em 48 horas, para o primeiro conjunto de fotografias de casados que não é do casamento chegar ainda durante a viagem.',
        },
      ],
    },
    prepare: {
      en: [
        'Book the session before the long beach days, or treat sun cream as an obligation — strap lines and sunburn show in all forty photographs.',
        'Plan one outfit per location, and keep the one that needs the least care for the first, earlier one.',
        'Flat soles with grip for cliff paths and calçada; carry anything with a heel.',
        'For a sunrise at Pico do Arieiro, bring a warm layer: you are at 1,800 metres before dawn, and the drive up starts in the dark.',
        'Talk to each other, not to the camera. The frames that work are mostly of a conversation.',
      ],
      pt: [
        'Marque a sessão antes dos dias longos de praia, ou leve o protector solar a sério — marcas de alças e escaldões aparecem nas quarenta fotografias.',
        'Pense numa roupa por local, e guarde a que exige menos cuidado para o primeiro, o mais cedo.',
        'Sola rasa e com aderência para trilhos de arriba e calçada; o salto alto vai no saco.',
        'Para o nascer do sol no Pico do Arieiro, leve um agasalho: está a 1800 metros antes de amanhecer, e a subida faz-se às escuras.',
        'Falem um com o outro, não com a câmara. As fotografias que resultam são quase sempre de uma conversa.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'We are not comfortable being affectionate in front of strangers.',
          pt: 'Não nos sentimos à vontade a ter gestos de carinho à frente de estranhos.',
        },
        answer: {
          en: 'Most of the set is not kissing on command. It is the two of you walking, sitting, and talking about something other than the camera, with the photographer choosing the moment. The early start helps too: at sunrise the audience is usually a handful of other early risers, if that.',
          pt: 'A maior parte das fotografias não é beijos a pedido. São os dois a andar, sentados, a conversar sobre qualquer coisa que não a câmara, com o fotógrafo a escolher o momento. Começar cedo também ajuda: ao nascer do sol a plateia costuma ser meia dúzia de madrugadores, quando muito.',
        },
      },
      {
        question: {
          en: 'Which day of the honeymoon is best?',
          pt: 'Qual é o melhor dia da lua de mel?',
        },
        answer: {
          en: 'Somewhere in the first half, but not the morning after arrival. The first days carry the flight and whatever the wedding week took out of you; the last day leaves no margin if the cloud comes in. Three or four days in is when most people look like they are on holiday.',
          pt: 'Algures na primeira metade, mas não na manhã a seguir à chegada. Os primeiros dias ainda levam o voo e o cansaço da semana do casamento; o último não deixa margem se a nuvem entrar. Ao terceiro ou quarto dia é quando a maioria das pessoas já tem cara de férias.',
        },
      },
      {
        question: {
          en: 'Can we wear the wedding dress and suit again?',
          pt: 'Podemos voltar a usar o vestido e o fato do casamento?',
        },
        answer: {
          en: 'You can. Say so when booking, because it changes the locations: a long hem on the Ponta da Piedade stairway or a cliff path at dawn is a practical problem, and it usually works better at the second, easier location.',
          pt: 'Podem. Digam-nos ao reservar, porque isso muda os locais: uma cauda comprida na escadaria da Ponta da Piedade ou num trilho de arriba ao amanhecer é um problema prático, e costuma resultar melhor no segundo local, o mais fácil.',
        },
      },
      {
        question: {
          en: 'Do we need a car?',
          pt: 'Precisamos de carro?',
        },
        answer: {
          en: 'In Lisbon or Porto, no. In the Algarve, Madeira and the Azores, the locations worth ninety minutes are outside town — the drive up Pico do Arieiro is forty minutes of hairpins in the dark — so plan on being driven or driving. Tell us what you will have and the pair of locations is chosen to fit it.',
          pt: 'Em Lisboa ou no Porto, não. No Algarve, na Madeira e nos Açores, os locais que valem noventa minutos ficam fora das vilas — a subida ao Pico do Arieiro são quarenta minutos de curvas às escuras — por isso contem com conduzir ou ser levados. Digam-nos o que vão ter e os dois locais escolhem-se em função disso.',
        },
      },
    ],
  },

  'lisbon-photoshoot': {
    promise: {
      en: 'Lisbon photographed before it fills up — ninety minutes, two or three miradouros on foot, starting early enough that the viewpoints are still yours.',
      pt: 'Lisboa fotografada antes de encher — noventa minutos, dois ou três miradouros a pé, a começar cedo o suficiente para os miradouros ainda serem vossos.',
    },
    audience: {
      en: [
        {
          title: 'Visitors with two or three days in the city',
          text: 'A city break has no spare afternoon. A session that starts at first light is finished before most plans for the day have begun, and hands the rest of it back.',
        },
        {
          title: 'People who want the city in the picture',
          text: 'Not a portrait against a blurred background that could be anywhere. The roofs, the tram lines and the river, placed deliberately behind you, so the photograph could only have been taken here.',
        },
        {
          title: 'People who dread posing in public',
          text: 'At seven in the morning Senhora do Monte still has the city to itself. The early start is for the light; the empty viewpoint is the side effect that makes the rest easy.',
        },
      ],
      pt: [
        {
          title: 'Quem tem dois ou três dias na cidade',
          text: 'Uma escapadinha não tem tardes livres. Uma sessão que começa com a primeira luz acaba antes de quase todos os planos do dia começarem, e devolve o resto.',
        },
        {
          title: 'Quem quer a cidade na fotografia',
          text: 'Não um retrato com um fundo desfocado que podia ser em qualquer lado. Os telhados, os carris e o rio, postos de propósito atrás de si, para a fotografia só poder ter sido feita aqui.',
        },
        {
          title: 'Quem detesta posar em público',
          text: 'Às sete da manhã a Senhora do Monte ainda tem a cidade só para si. Começar cedo é por causa da luz; o miradouro vazio é o efeito secundário que facilita o resto.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send your dates and where you are staying',
          text: 'The centre is small but steep. Whether you are in Baixa, Alfama or out at Belém decides where the walk starts and how early you need to leave.',
        },
        {
          title: 'We set the start time by the light',
          text: 'In summer that means before eight; the rest of the year it moves with sunrise. Confirmation, a named photographer and a meeting point usually arrive the same working day.',
        },
        {
          title: 'Ninety minutes, top to bottom',
          text: 'Starting at Senhora do Monte, the highest viewpoint, and working down into Alfama, with Escolas Gerais timed for the first trams. Most of the time goes into photographing, not walking.',
        },
        {
          title: 'Forty photographs within 48 hours',
          text: 'Forty retouched photographs in a private gallery within 48 hours — enough range across two or three locations that the set does not read as one backdrop repeated.',
        },
      ],
      pt: [
        {
          title: 'Envie as datas e onde vai ficar',
          text: 'O centro é pequeno mas íngreme. Estar na Baixa, em Alfama ou em Belém decide onde começa o passeio e a que horas tem de sair.',
        },
        {
          title: 'Marcamos a hora pela luz',
          text: 'No Verão isso quer dizer antes das oito; no resto do ano acompanha o nascer do sol. A confirmação, o nome do fotógrafo e o ponto de encontro chegam normalmente no mesmo dia útil.',
        },
        {
          title: 'Noventa minutos, de cima para baixo',
          text: 'Começa na Senhora do Monte, o miradouro mais alto, e vai descendo até Alfama, com as Escolas Gerais à hora dos primeiros eléctricos. Quase todo o tempo é a fotografar, não a andar.',
        },
        {
          title: 'Quarenta fotografias em 48 horas',
          text: 'Quarenta fotografias retocadas numa galeria privada em 48 horas — com variedade suficiente entre dois ou três locais para o conjunto não parecer o mesmo fundo repetido.',
        },
      ],
    },
    prepare: {
      en: [
        'Check the route to the meeting point the evening before — the highest viewpoint is uphill from almost everywhere, and seven in the morning is not the time to find out.',
        'If you have just flown in from the Americas, use it: book the morning after you land, while you are still waking at five anyway.',
        'If your dates allow, pick a weekday; Escolas Gerais is at its best before nine on one.',
        'Wear layers rather than a coat. The hilltop is cool at first light and the walk down into Alfama warms you up.',
        'Avoid white from head to toe; the pale limestone pavement already throws plenty of light back up.',
        'A buggy on polished calçada on a slope is hard work. For small children, a carrier is easier.',
      ],
      pt: [
        'Veja o caminho até ao ponto de encontro na véspera — o miradouro mais alto fica a subir de quase todo o lado, e às sete da manhã não é hora de descobrir isso.',
        'Se acabou de chegar das Américas, aproveite: marque para a manhã a seguir à chegada, enquanto ainda acorda às cinco de qualquer forma.',
        'Se as datas o permitirem, escolha um dia útil; as Escolas Gerais estão no seu melhor antes das nove num dia desses.',
        'Vista camadas em vez de casaco. No alto está fresco à primeira luz, e a descida até Alfama aquece.',
        'Evite branco da cabeça aos pés; a calçada de calcário claro já devolve luz de sobra.',
        'Um carrinho de bebé na calçada polida e a descer dá muito trabalho. Com crianças pequenas, um porta-bebés é mais fácil.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'We are arriving jet-lagged. Is an early start realistic?',
          pt: 'Vamos chegar com jet lag. Começar cedo é realista?',
        },
        answer: {
          en: 'From the Americas it is the easiest thing you will do all trip: for the first mornings your body thinks seven o’clock is the middle of the night, and you will be awake regardless. From Asia it runs the other way, and the session is better later in the stay, once mornings have stopped feeling like evenings.',
          pt: 'Vindo das Américas é a coisa mais fácil da viagem: nas primeiras manhãs acorda-se de madrugada de qualquer maneira. Vindo da Ásia é ao contrário, e a sessão fica melhor mais para o fim da estadia, quando as manhãs já não parecem noites.',
        },
      },
      {
        question: {
          en: 'What if it is raining that morning?',
          pt: 'E se estiver a chover nessa manhã?',
        },
        answer: {
          en: 'Light rain is workable, and it empties the viewpoints even further. Praça do Comércio is arcaded on three sides, which gives cover without leaving the centre. Heavy rain is a different conversation — tell us when booking which other mornings you are in the city, so there is somewhere for the session to go.',
          pt: 'Chuva fraca dá para trabalhar, e ainda esvazia mais os miradouros. A Praça do Comércio tem arcadas em três lados, o que dá abrigo sem sair do centro. Chuva forte é outra conversa — diga-nos ao reservar que outras manhãs vai estar na cidade, para a sessão ter para onde ir.',
        },
      },
      {
        question: {
          en: 'Will there be strangers in the background?',
          pt: 'Vão aparecer desconhecidos no fundo?',
        },
        answer: {
          en: 'At the first viewpoint, rarely. By the time the walk reaches Alfama the streets have people in them, and the photographer frames around them — a lower angle, a doorway instead of a panorama, a longer lens — rather than waiting for a gap that never comes.',
          pt: 'No primeiro miradouro, raramente. Quando o passeio chega a Alfama já há gente na rua, e o fotógrafo enquadra à volta — um ângulo mais baixo, uma porta em vez de um panorama, uma objectiva mais longa — em vez de esperar por uma aberta que não chega.',
        },
      },
      {
        question: {
          en: 'We are not morning people. Can we do it at sunset instead?',
          pt: 'Não somos pessoas de manhãs. Pode ser ao pôr do sol?',
        },
        answer: {
          en: 'The session is built around the miradouros, and they are a morning location. An evening in Lisbon is a different walk altogether: the river, with Doca de Santo Amaro under the bridge in the last hour before sunset. Say so when booking and it is planned that way, rather than moving the morning route to an hour when it does not work.',
          pt: 'A sessão está pensada para os miradouros, e esses são de manhã. Uma tarde em Lisboa é outro passeio: o rio, com a Doca de Santo Amaro debaixo da ponte na última hora antes do pôr do sol. Diga-nos ao reservar e planeia-se assim, em vez de levar o percurso da manhã para uma hora em que não resulta.',
        },
      },
      {
        question: {
          en: 'Is Belém a better choice than Alfama?',
          pt: 'Belém é melhor escolha do que Alfama?',
        },
        answer: {
          en: 'Different rather than better. Belém is flat, wide and monumental, twenty minutes by tram from the centre, and the exterior of the Jerónimos works before eight, before the coaches. Alfama is steep, close and busy with detail. If you want the postcard city of roofs and trams, it is Alfama; if you want space and stone, Belém.',
          pt: 'Diferente, não melhor. Belém é plana, larga e monumental, a vinte minutos de eléctrico do centro, e o exterior dos Jerónimos resulta antes das oito, antes dos autocarros. Alfama é íngreme, apertada e cheia de pormenor. Se quer a cidade dos telhados e dos eléctricos, é Alfama; se quer espaço e pedra, Belém.',
        },
      },
    ],
  },
};
