import type { City } from '../types';

/**
 * The places people travel to.
 *
 * Three of these are not cities: the Algarve is a region, Madeira and the
 * Açores are islands. That is what `City.kind` is for — it drives the JSON-LD
 * `areaServed` type, which was hardcoded to `City` and is factually wrong for a
 * coastline or an archipelago.
 *
 * Each is one page rather than several thin ones. Lagos and Albufeira are forty
 * minutes apart and sell the same work to the same people; two pages would
 * compete with each other and neither would say anything the other did not.
 * Funchal is where you sleep, but the photograph is at 1,800 metres.
 */
export const DESTINATION_CITIES: City[] = [
  {
    slug: 'sintra',
    name: 'Sintra',
    kind: 'city',
    region: { en: 'Greater Lisbon', pt: 'Grande Lisboa' },
    lede: {
      en: 'The palaces are ticketed, timed and charged for. The forest between them is free and photographs better.',
      pt: 'Os palácios são a bilhete, com hora marcada e com taxa. A floresta entre eles é gratuita e fotografa melhor.',
    },
    narrative: {
      en: 'Almost everything written about photographing Sintra gets the economics wrong. Pena, Monserrate and the Castelo dos Mouros are run by Parques de Sintra – Monte da Lua, which requires written authorisation and charges a fee for professional and commercial photography inside them; Quinta da Regaleira is a different operator with its own permission and its own fee, which catches out everyone who assumes one arrangement covers the town. Pena also runs timed entry, so the ticket dictates the schedule rather than the light does.\n\nThe part nobody sells is that the Serra itself — the roads, the ferns, the mist between the trees, the high ground above Seteais — is open and costs nothing, and it is where the photographs that actually look like Sintra are made. The second practical fact is traffic: in season the historic centre is effectively closed to private cars, and the 434 and 435 buses plus the scarcity of parking, not the sunrise, decide what time a session can start.',
      pt: 'Quase tudo o que se escreve sobre fotografar Sintra erra nas contas. A Pena, Monserrate e o Castelo dos Mouros são geridos pela Parques de Sintra – Monte da Lua, que exige autorização escrita e cobra taxa para fotografia profissional e comercial lá dentro; a Quinta da Regaleira é outro operador, com autorização e taxa próprias, o que apanha desprevenido quem assuma que um acordo cobre a vila toda. A Pena tem ainda entrada por horário, portanto é o bilhete que manda no plano, não a luz.\n\nO que ninguém vende é que a serra em si — as estradas, os fetos, o nevoeiro entre as árvores, o alto acima de Seteais — é aberta e não custa nada, e é lá que se fazem as fotografias que de facto parecem Sintra. O segundo facto prático é o trânsito: em época alta o centro histórico está praticamente vedado a carros particulares, e são os autocarros 434 e 435 e a falta de estacionamento, não o nascer do sol, que decidem a que horas a sessão pode começar.',
    },
    seasonality: {
      en: 'Sintra makes its own weather. The Serra catches Atlantic cloud that Lisbon, twenty-five minutes away, never sees, and mornings here are misty for a large part of the year — which is the single best thing about photographing in the forest and the single worst thing about photographing Pena from a distance. October to April is the reliable mist season. July and August are hot, clear and extremely crowded, and the palaces sell out days ahead.',
      pt: 'Sintra faz o seu próprio tempo. A serra apanha nuvem atlântica que Lisboa, a vinte e cinco minutos, nunca vê, e as manhãs aqui são de nevoeiro durante boa parte do ano — o que é a melhor coisa que há para fotografar na floresta e a pior que há para fotografar a Pena de longe. De Outubro a Abril é a época fiável de nevoeiro. Julho e Agosto são quentes, limpos e muito cheios, e os palácios esgotam com dias de antecedência.',
    },
    coveredAreas: ['Colares', 'Praia das Maçãs', 'Cabo da Roca', 'Azenhas do Mar', 'Seteais', 'Monserrate'],
    spots: [
      {
        name: 'Serra de Sintra, estradas e floresta',
        bestTime: { en: 'The first two hours after sunrise, in mist', pt: 'As duas primeiras horas depois do nascer do sol, com nevoeiro' },
        permitCost: { en: 'Free — public roads and open woodland', pt: 'Gratuito — estradas públicas e mata aberta' },
        description: {
          en: 'The road between the village and Peninha, with ferns to the verge and the cloud sitting in the trees. It costs nothing, needs no ticket, and is the location that will still look like Sintra in ten years when the palace queue has moved somewhere else.',
          pt: 'A estrada entre a vila e a Peninha, com fetos até à berma e a nuvem parada nas árvores. Não custa nada, não precisa de bilhete, e é o sítio que ainda vai parecer Sintra daqui a dez anos, quando a fila do palácio já for noutro lado.',
        },
      },
      {
        name: 'Quinta da Regaleira, poço iniciático',
        bestTime: { en: 'Opening time, and not afterwards', pt: 'À hora de abertura, e não depois' },
        permitCost: {
          en: 'Ticketed entry. A professional or commercial shoot needs the estate’s own written authorisation, which is separate from any Parques de Sintra arrangement',
          pt: 'Entrada com bilhete. Uma sessão profissional ou comercial precisa de autorização escrita da própria quinta, distinta de qualquer acordo com a Parques de Sintra',
        },
        description: {
          en: 'A spiral well cut nine storeys into the ground, and the most photographed thing in Sintra. The stair is one person wide: this is a location for the first twenty minutes of the day or not at all.',
          pt: 'Um poço em espiral escavado nove pisos na rocha, e a coisa mais fotografada de Sintra. A escada tem a largura de uma pessoa: é um sítio para os primeiros vinte minutos do dia ou para nada.',
        },
      },
      {
        name: 'Palácio da Pena',
        bestTime: { en: 'Whatever slot the timed ticket gives you', pt: 'O horário que o bilhete der' },
        permitCost: {
          en: 'Ticketed, with timed entry. Professional and commercial photography inside requires written authorisation from Parques de Sintra and carries a fee',
          pt: 'Bilhete, com entrada por horário. Fotografia profissional e comercial no interior exige autorização escrita da Parques de Sintra e tem taxa',
        },
        description: {
          en: 'The yellow and red palace on the summit, and the reason most people come. The honest note is that it is the most constrained location in the region — schedule, access and permission all decided by someone else — so it is planned first and everything else fits around it.',
          pt: 'O palácio amarelo e vermelho no cimo, e a razão por que quase toda a gente vem. A nota honesta é que é o sítio mais condicionado da região — horário, acesso e autorização decididos por terceiros — por isso planeia-se primeiro e o resto encaixa à volta.',
        },
      },
      {
        name: 'Cabo da Roca',
        bestTime: { en: 'Sunset, with wind', pt: 'Pôr do sol, com vento' },
        permitCost: { en: 'Free — public clifftop in the natural park', pt: 'Gratuito — arriba pública dentro do parque natural' },
        description: {
          en: 'The westernmost point of continental Europe, a hundred metres above the Atlantic and twenty minutes from the village. It is exposed, it is almost always windy, and on a clear evening there is nothing between you and the horizon.',
          pt: 'O ponto mais ocidental da Europa continental, cem metros acima do Atlântico e a vinte minutos da vila. É exposto, tem vento quase sempre, e numa tarde limpa não há nada entre nós e o horizonte.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Do we need a permit to photograph in the palaces?', pt: 'É preciso autorização para fotografar nos palácios?' },
        answer: {
          en: 'For a professional or commercial session, yes, and there are two different ones. Parques de Sintra – Monte da Lua covers Pena, Monserrate and the Castelo dos Mouros; Quinta da Regaleira is a separate operator with its own authorisation and fee. Both are arranged in advance. A private visitor taking photographs of their own visit is a different matter and needs nothing beyond a ticket.',
          pt: 'Para uma sessão profissional ou comercial, sim, e são duas diferentes. A Parques de Sintra – Monte da Lua cobre a Pena, Monserrate e o Castelo dos Mouros; a Quinta da Regaleira é outro operador, com autorização e taxa próprias. As duas tratam-se com antecedência. Um visitante a fotografar a sua própria visita é outra coisa e não precisa de mais do que o bilhete.',
        },
      },
      {
        question: { en: 'Can we drive up to the palaces?', pt: 'Podemos subir de carro até aos palácios?' },
        answer: {
          en: 'In season, effectively no. The historic centre is restricted and the parking near the top is minimal; the 434 and 435 buses are how everyone gets up, and the queue for them is part of the schedule. It is the reason a Sintra session starts earlier than the light alone would require.',
          pt: 'Em época alta, na prática não. O centro histórico é condicionado e o estacionamento lá em cima é mínimo; os autocarros 434 e 435 são a forma como toda a gente sobe, e a fila para eles faz parte do horário. É a razão por que uma sessão em Sintra começa mais cedo do que a luz sozinha exigiria.',
        },
      },
    ],
    stats: {},
    topServices: ['couple', 'elopement', 'proposal', 'vacation', 'wedding', 'destination-wedding', 'honeymoon', 'family'],
  },

  {
    slug: 'algarve',
    name: 'Algarve',
    kind: 'region',
    ptArticle: 'o',
    region: { en: 'Algarve', pt: 'Algarve' },
    regionArticle: 'o',
    lede: {
      en: 'The cliffs are the subject and the tide is the schedule.',
      pt: 'As arribas são o assunto e a maré é o horário.',
    },
    narrative: {
      en: 'The Algarve is one market, not six. Lagos and Albufeira are forty minutes apart, the coves between them are photographed by the same people on the same mornings, and splitting them into separate pages would produce two descriptions of the same coastline. What varies is not the town but the tide: half the best locations — the sea caves, the arches, the beaches you reach along the sand — are accessible for part of the day and not the rest, and a session booked without checking the tide table is a session that may find its location under water.\n\nThe second constraint is the cliffs themselves. The falésias are actively eroding, the edges collapse, and the warning signs are there because people have gone over. Any photograph that looks like it was taken from the lip of a drop was taken from further back with a longer lens, and the ones that were not are not worth what they cost.',
      pt: 'O Algarve é um mercado só, não são seis. Lagos e Albufeira estão a quarenta minutos um do outro, as praias entre os dois são fotografadas pelas mesmas pessoas nas mesmas manhãs, e separá-los em páginas distintas daria duas descrições da mesma costa. O que varia não é a vila, é a maré: metade dos melhores locais — as grutas, os arcos, as praias a que se chega pela areia — está acessível numa parte do dia e não no resto, e uma sessão marcada sem olhar à tabela de marés é uma sessão que pode encontrar o local debaixo de água.\n\nA segunda condicionante são as próprias arribas. As falésias estão em erosão activa, os bordos caem, e os avisos estão lá porque já houve quem caísse. Qualquer fotografia que pareça tirada da beira de um precipício foi tirada de mais atrás com uma objectiva mais longa, e as que não foram não valem o que custam.',
    },
    seasonality: {
      en: 'February is the surprise: the almond blossom is out, the light is low all day, the coast is empty and it is fifteen degrees. October and early November are the best combination of warm sea and no crowd. July and August are unusable in the middle of the day — the light is vertical, the beaches are full, and any session is at seven in the morning or eight at night. Winter storms are what carve the coastline and a rough day in January produces better photographs than a calm one in June.',
      pt: 'Fevereiro é a surpresa: a amendoeira em flor, a luz baixa o dia inteiro, a costa vazia e quinze graus. Outubro e o início de Novembro dão a melhor combinação de mar quente e pouca gente. Julho e Agosto são inutilizáveis a meio do dia — luz a pique, praias cheias, e qualquer sessão é às sete da manhã ou às oito da noite. São as tempestades de Inverno que esculpem esta costa, e um dia agitado de Janeiro dá melhores fotografias do que um dia calmo de Junho.',
    },
    coveredAreas: ['Lagos', 'Albufeira', 'Faro', 'Tavira', 'Carvoeiro', 'Sagres', 'Portimão'],
    spots: [
      {
        name: 'Ponta da Piedade, Lagos',
        bestTime: { en: 'Sunrise, at low tide', pt: 'Nascer do sol, com maré baixa' },
        permitCost: { en: 'Free — public clifftop and stairway', pt: 'Gratuito — arriba e escadaria públicas' },
        description: {
          en: 'Stacks and arches of ochre limestone with the sea running between them, and a stairway down to the water. The cliff path above it is the safe vantage; the platform at the bottom exists only at low tide.',
          pt: 'Rochedos e arcos de calcário ocre com o mar a correr por entre eles, e uma escadaria até à água. O trilho no alto é o ponto de vista seguro; a plataforma lá em baixo só existe com maré baixa.',
        },
      },
      {
        name: 'Praia da Marinha',
        bestTime: { en: 'The first hour of light', pt: 'A primeira hora de luz' },
        permitCost: { en: 'Free — public beach', pt: 'Gratuito — praia pública' },
        description: {
          en: 'The double arch that appears on every poster of the region, seen from the clifftop path rather than from the sand. By ten in the morning in summer there is a queue for the viewpoint.',
          pt: 'O arco duplo que aparece em todos os cartazes da região, visto do trilho no alto e não da areia. Às dez da manhã, no Verão, há fila para o miradouro.',
        },
      },
      {
        name: 'Algar de Benagil',
        bestTime: { en: 'Early morning, by boat or kayak', pt: 'De manhã cedo, de barco ou de caiaque' },
        permitCost: {
          en: 'Not reachable on foot, and swimming access has been restricted — it is a boat or kayak trip, booked separately, and the current rules are checked before it is promised',
          pt: 'Não se chega a pé, e o acesso a nado foi restringido — é uma ida de barco ou caiaque, marcada à parte, e as regras em vigor confirmam-se antes de se prometer',
        },
        description: {
          en: 'A sea cave with a hole in its roof, and the most recognisable image in the Algarve. It is also the most misrepresented: it cannot be walked to, the access rules have tightened, and a session that assumes otherwise does not happen.',
          pt: 'Uma gruta marinha com um buraco no tecto, e a imagem mais reconhecível do Algarve. É também a mais mal contada: não se vai lá a pé, as regras de acesso apertaram, e uma sessão que assuma o contrário não acontece.',
        },
      },
      {
        name: 'Ria Formosa, Tavira',
        bestTime: { en: 'Late afternoon, at high tide', pt: 'Fim de tarde, com maré cheia' },
        permitCost: { en: 'Free — public paths inside the natural park', pt: 'Gratuito — caminhos públicos dentro do parque natural' },
        description: {
          en: 'The other Algarve: a lagoon, salt pans and sandbanks instead of cliffs, flat to the horizon and almost empty. Where the light is soft and the wind is not, which is the opposite of the west coast.',
          pt: 'O outro Algarve: uma ria, salinas e ilhas-barreira em vez de arribas, plano até ao horizonte e quase vazio. Onde a luz é suave e o vento não é, ao contrário da costa oeste.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Why does the tide matter for a photo session?', pt: 'Porque é que a maré importa numa sessão de fotografia?' },
        answer: {
          en: 'Because several of the locations are beaches you reach along the sand or platforms under the cliffs, and at high water they are not there. The tide table is checked when the session is booked, not on the morning, and it is the reason the start time is sometimes six forty rather than seven.',
          pt: 'Porque vários dos locais são praias a que se chega pela areia ou plataformas debaixo das arribas, e com maré cheia não existem. A tabela de marés vê-se quando se marca a sessão, não na manhã, e é a razão por que às vezes a hora de início é seis e quarenta e não sete.',
        },
      },
      {
        question: { en: 'Can we photograph at the edge of the cliffs?', pt: 'Podemos fotografar na beira das arribas?' },
        answer: {
          en: 'No, and the answer does not change for a good photograph. The falésias erode from underneath and give way at the lip; the fenced setbacks and the warning signs mark real collapses. Everything that looks close was made from further back with a longer lens.',
          pt: 'Não, e a resposta não muda por causa de uma boa fotografia. As falésias erodem por baixo e cedem no bordo; as vedações e os avisos assinalam derrocadas reais. Tudo o que parece perto foi feito de mais longe com uma objectiva mais comprida.',
        },
      },
    ],
    stats: {},
    topServices: ['couple', 'honeymoon', 'proposal', 'vacation', 'elopement', 'family', 'destination-wedding', 'wedding'],
  },

  {
    slug: 'madeira',
    name: 'Madeira',
    kind: 'island',
    ptArticle: 'a',
    region: { en: 'Madeira', pt: 'Madeira' },
    regionArticle: 'a',
    lede: {
      en: 'The photograph is above the cloud layer at 1,800 metres, and the car park fills before dawn.',
      pt: 'A fotografia está acima da camada de nuvens, a 1800 metros, e o parque enche antes de amanhecer.',
    },
    narrative: {
      en: 'Madeira is sold as Funchal and photographed everywhere else. The island is a volcano with a road around the outside and a ridge down the middle, and the thing that makes it worth the flight is that the ridge is usually above the cloud: at Pico do Arieiro, at sunrise, you are standing in clear sun looking across a floor of cloud with two other peaks coming through it. That is a specific place at a specific hour, and the small car park at the top is full well before the sun is up.\n\nThe rest of the island divides into weather. Fanal, the laurel forest on the north-west plateau, only works in fog — on a clear day it is a field with trees in it — which makes it the one location that is genuinely rescheduled rather than merely hoped for. Several of the levada walks now charge for entry through the forestry authority, and which ones changes, so it is checked rather than assumed. And the honest note for anyone booking a beach session: Madeira has almost no sand. Porto Santo, forty minutes away by air, has nine kilometres of it.',
      pt: 'A Madeira vende-se como Funchal e fotografa-se em todo o resto. A ilha é um vulcão com uma estrada à volta e uma crista ao meio, e o que a torna digna do voo é que a crista está quase sempre acima das nuvens: no Pico do Arieiro, ao nascer do sol, está-se em sol limpo a olhar para um chão de nuvem com dois outros picos a atravessá-lo. É um sítio específico a uma hora específica, e o pequeno parque de estacionamento lá em cima enche muito antes de o sol nascer.\n\nO resto da ilha divide-se por tempo. O Fanal, a laurissilva no planalto a noroeste, só resulta com nevoeiro — num dia limpo é um campo com árvores — o que faz dele o único local que se remarca de verdade em vez de se esperar pelo melhor. Várias levadas passaram a ter entrada paga através da autoridade florestal, e quais mudam, por isso confirma-se em vez de se assumir. E a nota honesta para quem marca sessão de praia: a Madeira quase não tem areia. O Porto Santo, a quarenta minutos de avião, tem nove quilómetros dela.',
    },
    seasonality: {
      en: 'Madeira has no off season in the way the mainland does — it is fifteen to twenty-five degrees all year — but it has two climates at once, and the north coast can be in rain while Funchal is in sun. The cloud inversion that makes Pico do Arieiro work is most reliable from late spring to early autumn. Fanal wants the wet months. June and July bring the Atlantic haze that softens everything, and the second half of August is the driest.',
      pt: 'A Madeira não tem época baixa como o continente — são quinze a vinte e cinco graus o ano inteiro — mas tem dois climas ao mesmo tempo, e a costa norte pode estar à chuva enquanto o Funchal está ao sol. A inversão de nuvens que faz o Pico do Arieiro funcionar é mais fiável do fim da Primavera ao início do Outono. O Fanal quer os meses húmidos. Junho e Julho trazem a bruma atlântica que suaviza tudo, e a segunda metade de Agosto é a mais seca.',
    },
    coveredAreas: ['Funchal', 'Seixal', 'Porto Moniz', 'Santana', 'Ponta do Sol', 'Câmara de Lobos', 'Porto Santo'],
    spots: [
      {
        name: 'Pico do Arieiro',
        bestTime: { en: 'Sunrise — arrive an hour before it', pt: 'Nascer do sol — chegar uma hora antes' },
        permitCost: { en: 'Free — public road to the summit, but the car park is small', pt: 'Gratuito — estrada pública até ao cimo, mas o parque é pequeno' },
        description: {
          en: 'The third highest point on the island, reachable by car, and above the cloud layer more mornings than not. The whole thing is a logistics problem rather than a photographic one: the drive up is forty minutes of hairpins in the dark and the parking is gone by the time it is light.',
          pt: 'O terceiro ponto mais alto da ilha, a que se chega de carro, e acima da camada de nuvens na maior parte das manhãs. É um problema de logística e não de fotografia: a subida são quarenta minutos de curvas às escuras e o estacionamento já não existe quando amanhece.',
        },
      },
      {
        name: 'Fanal',
        bestTime: { en: 'Any foggy morning — and only a foggy one', pt: 'Qualquer manhã de nevoeiro — e só de nevoeiro' },
        permitCost: { en: 'Free — public plateau inside the laurel forest', pt: 'Gratuito — planalto público dentro da laurissilva' },
        description: {
          en: 'Thousand-year-old laurel trees on an open plateau, in cloud. The fog is not an inconvenience here, it is the subject: without it the location is unremarkable, which is why a Fanal session carries a reschedule clause rather than a wish.',
          pt: 'Loureiros milenares num planalto aberto, dentro da nuvem. O nevoeiro aqui não é um contratempo, é o assunto: sem ele o sítio não tem graça, e é por isso que uma sessão no Fanal leva uma cláusula de remarcação e não uma esperança.',
        },
      },
      {
        name: 'Ponta de São Lourenço',
        bestTime: { en: 'Early morning or the last hour of light', pt: 'Manhã cedo ou a última hora de luz' },
        permitCost: { en: 'Free — public trail in the nature reserve', pt: 'Gratuito — trilho público na reserva natural' },
        description: {
          en: 'The eastern tip: red and ochre rock, no trees, sea on both sides. It is the driest and most exposed part of the island and looks like nowhere else on it.',
          pt: 'A ponta leste: rocha vermelha e ocre, sem árvores, mar dos dois lados. É a parte mais seca e mais exposta da ilha e não se parece com mais nada nela.',
        },
      },
      {
        name: 'Funchal, Zona Velha e Monte',
        bestTime: { en: 'Late afternoon', pt: 'Fim de tarde' },
        permitCost: { en: 'Free — public streets', pt: 'Gratuito — via pública' },
        description: {
          en: 'Where you are staying, and a real location in its own right: painted doors in the old town, a cable car up to Monte and a harbour that faces south. Useful on the days the mountain is closed in.',
          pt: 'Onde se fica alojado, e um sítio a sério por direito próprio: portas pintadas na Zona Velha, um teleférico até ao Monte e um porto virado a sul. Útil nos dias em que a montanha está fechada.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Are there beaches for a beach session?', pt: 'Há praias para uma sessão de praia?' },
        answer: {
          en: 'Almost no sand on Madeira itself — the coast is rock and pebble, and the sea pools at Porto Moniz are the swimming. Porto Santo, forty minutes by air, has nine kilometres of sand and is a separate day.',
          pt: 'Areia, quase nenhuma na Madeira — a costa é rocha e calhau, e o banho são as piscinas naturais do Porto Moniz. O Porto Santo, a quarenta minutos de avião, tem nove quilómetros de areia e é um dia à parte.',
        },
      },
      {
        question: { en: 'Do the levada walks cost anything?', pt: 'As levadas são pagas?' },
        answer: {
          en: 'Several now charge for entry through the forestry authority, and which ones has changed more than once. It is checked when the session is planned rather than assumed from an old blog post.',
          pt: 'Várias passaram a ter entrada paga através da autoridade florestal, e quais já mudou mais do que uma vez. Confirma-se ao planear a sessão, em vez de se assumir a partir de um artigo antigo.',
        },
      },
    ],
    stats: {},
    topServices: ['couple', 'honeymoon', 'elopement', 'vacation', 'proposal', 'family', 'destination-wedding'],
  },

  {
    slug: 'acores',
    name: 'Açores',
    nameLocalized: { en: 'Azores', pt: 'Açores' },
    kind: 'island',
    ptArticle: 'os',
    region: { en: 'Azores', pt: 'Açores' },
    regionArticle: 'os',
    lede: {
      en: 'You book a window, not a day.',
      pt: 'Aqui reserva-se uma janela, não um dia.',
    },
    narrative: {
      en: 'São Miguel gets four seasons in an afternoon, and every piece of advice about photographing here follows from accepting that rather than arguing with it. A session fixed to a date and a location will, often enough, find that location inside a cloud. A session that books a three-day window and decides the morning before it happens gets what it came for.\n\nThe practical version of that is planning locations as alternatives rather than as a list. Sete Cidades and Lagoa do Fogo are on opposite sides of the island and it is common for one to be clear while the other is not, so they are a pair rather than two separate outings. Furnas, in the middle, works in almost any weather because steam and wet green do not need sun. The pages that promise a specific caldera at a specific hour are writing about somewhere else.',
      pt: 'São Miguel tem quatro estações numa tarde, e todos os conselhos sobre fotografar aqui decorrem de aceitar isso em vez de discutir com isso. Uma sessão presa a uma data e a um local vai, com frequência suficiente, encontrar esse local dentro de uma nuvem. Uma sessão que reserve uma janela de três dias e decida na véspera de manhã fica com aquilo a que veio.\n\nA versão prática disto é planear locais como alternativas e não como lista. As Sete Cidades e a Lagoa do Fogo estão em lados opostos da ilha e é vulgar uma estar limpa e a outra não, por isso são um par e não dois passeios. As Furnas, no meio, funcionam com quase qualquer tempo, porque vapor e verde molhado não precisam de sol. As páginas que prometem uma caldeira específica a uma hora específica estão a escrever sobre outro sítio.',
    },
    seasonality: {
      en: 'The hydrangeas peak in June and July, and they are the one thing here that is genuinely datable — kilometres of roadside hedge in blue, which is what most people picture when they picture the Azores. Summer is the most settled weather and also the busiest. Winter is wild and green and largely empty, and the light between fronts is extraordinary. The flight from Lisbon is a little over two hours and the island has its own weather system entirely.',
      pt: 'As hortênsias estão no auge em Junho e Julho, e são a única coisa aqui verdadeiramente datável — quilómetros de sebe azul à berma da estrada, que é o que quase toda a gente imagina quando imagina os Açores. O Verão é o tempo mais estável e também o mais cheio. O Inverno é bravo, verde e quase vazio, e a luz entre frentes é extraordinária. O voo de Lisboa é pouco mais de duas horas e a ilha tem um sistema de tempo só dela.',
    },
    coveredAreas: ['Ponta Delgada', 'Sete Cidades', 'Furnas', 'Nordeste', 'Ribeira Grande', 'Vila Franca do Campo'],
    spots: [
      {
        name: 'Miradouro da Boca do Inferno, Sete Cidades',
        bestTime: { en: 'Early morning, on a clear day — decided the evening before', pt: 'Manhã cedo, em dia limpo — decidido na véspera' },
        permitCost: { en: 'Free — public viewpoint and trail', pt: 'Gratuito — miradouro e trilho públicos' },
        description: {
          en: 'Two crater lakes, one green and one blue, seen from the rim above them. The most photographed view in the Azores and the one most often lost to cloud — which is the argument for the three-day window in one image.',
          pt: 'Duas lagoas de cratera, uma verde e outra azul, vistas da crista por cima delas. A vista mais fotografada dos Açores e a que mais vezes se perde para a nuvem — o argumento a favor da janela de três dias, numa imagem.',
        },
      },
      {
        name: 'Lagoa do Fogo',
        bestTime: { en: 'Whenever Sete Cidades is in cloud', pt: 'Sempre que as Sete Cidades estiverem dentro da nuvem' },
        permitCost: { en: 'Free — public road and footpath', pt: 'Gratuito — estrada e trilho públicos' },
        description: {
          en: 'A crater lake with no village in it, on the other side of the island, reached by a road that climbs into the cloud and sometimes comes out above it. The alternative to Sete Cidades rather than an addition to it.',
          pt: 'Uma lagoa de cratera sem povoação nenhuma, do outro lado da ilha, servida por uma estrada que sobe para dentro da nuvem e às vezes sai acima dela. A alternativa às Sete Cidades e não um acrescento.',
        },
      },
      {
        name: 'Furnas',
        bestTime: { en: 'Any weather, and better in rain', pt: 'Qualquer tempo, e melhor à chuva' },
        permitCost: { en: 'Free at the fumaroles; Terra Nostra park is ticketed', pt: 'Gratuito nas fumarolas; o parque Terra Nostra é a bilhete' },
        description: {
          en: 'Steam coming out of the ground beside a lake, and a botanical garden with an ochre thermal pool in it. The location that does not need the weather to cooperate, which on this island is worth more than a better view.',
          pt: 'Vapor a sair do chão ao lado de uma lagoa, e um jardim botânico com um tanque termal cor de ocre. O sítio que não precisa que o tempo colabore, o que nesta ilha vale mais do que uma vista melhor.',
        },
      },
      {
        name: 'Hortênsias das estradas do Nordeste',
        bestTime: { en: 'June and July', pt: 'Junho e Julho' },
        permitCost: { en: 'Free — public roadside', pt: 'Gratuito — berma pública' },
        description: {
          en: 'Hedges of blue hydrangea along the field boundaries and the road verges, for two months of the year. It is not a location so much as a season, and it is the one thing here you can put in a calendar.',
          pt: 'Sebes de hortênsia azul nas divisórias dos campos e nas bermas, durante dois meses do ano. Não é tanto um local como uma estação, e é a única coisa aqui que se põe num calendário.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'What if the weather is bad on the day we booked?', pt: 'E se o tempo estiver mau no dia que marcámos?' },
        answer: {
          en: 'That is why the booking is a window rather than a date. Three days is enough that one of the two calderas is usually clear, and Furnas works regardless. A single fixed date on São Miguel is a gamble and it is better to say so beforehand.',
          pt: 'É por isso que a reserva é uma janela e não uma data. Três dias chegam para que uma das duas caldeiras esteja normalmente limpa, e as Furnas funcionam de qualquer maneira. Uma data única e fixa em São Miguel é uma aposta, e mais vale dizê-lo antes.',
        },
      },
    ],
    stats: {},
    topServices: ['elopement', 'couple', 'honeymoon', 'vacation', 'proposal', 'destination-wedding', 'family'],
  },

  {
    slug: 'douro',
    name: 'Douro',
    kind: 'region',
    ptArticle: 'o',
    region: { en: 'Norte', pt: 'Norte' },
    lede: {
      en: 'The only place on this site where the date matters more than the hour.',
      pt: 'O único sítio deste site onde a data importa mais do que a hora.',
    },
    narrative: {
      en: 'Everywhere else, the planning question is what time. In the Douro it is what week. The vindima — the harvest — runs from roughly early September to mid-October, later in the Douro Superior than in the Baixo Corgo, and it is the only time the terraces have people working on them and the quintas smell of fruit rather than of stone. Outside it the valley is beautiful and empty; during it, it is a working agricultural region and every estate is busy, which means access is arranged rather than assumed and September weekends are booked a year out.\n\nThe landscape itself is terraces cut into schist, which is a UNESCO World Heritage cultural landscape and has been since 2001 — worth knowing not for the badge but because it is the correct description: this is a place people made, not a place that happened. The frames are the long views from above at São Leonardo de Galafura, and the river itself at Pinhão.',
      pt: 'Em todo o lado a pergunta de planeamento é a que horas. No Douro é em que semana. A vindima corre sensivelmente do início de Setembro a meados de Outubro, mais tarde no Douro Superior do que no Baixo Corgo, e é a única altura em que os socalcos têm gente a trabalhar e as quintas cheiram a fruta e não a pedra. Fora dela o vale é bonito e vazio; durante ela é uma região agrícola em pleno e todas as quintas estão ocupadas, o que quer dizer que o acesso se combina em vez de se assumir e que os fins-de-semana de Setembro esgotam com um ano de antecedência.\n\nA paisagem são socalcos abertos no xisto, Património Mundial como paisagem cultural desde 2001 — o que importa não pelo selo mas porque é a descrição certa: isto é um sítio que as pessoas fizeram, não um sítio que aconteceu. Os enquadramentos são as vistas longas do alto, em São Leonardo de Galafura, e o próprio rio no Pinhão.',
    },
    seasonality: {
      en: 'September and the first half of October are the harvest and the reason to come, and they are also the only weeks with no availability. Late October and November are when the terraces turn — the vines go red and gold across the whole valley — and almost nobody books them. Spring is green and quiet. July and August are very hot in a valley with no wind, and the vines are simply green; there is no harvest to photograph and there is no colour either.',
      pt: 'Setembro e a primeira metade de Outubro são a vindima e a razão para vir, e são também as únicas semanas sem disponibilidade. O fim de Outubro e Novembro são a altura em que os socalcos viram — a vinha fica vermelha e dourada no vale inteiro — e quase ninguém os marca. A Primavera é verde e sossegada. Julho e Agosto são muito quentes num vale sem vento, e a vinha está simplesmente verde; não há vindima para fotografar nem cor nenhuma.',
    },
    coveredAreas: ['Peso da Régua', 'Pinhão', 'Lamego', 'Vila Real', 'Sabrosa', 'São João da Pesqueira'],
    spots: [
      {
        name: 'Miradouro de São Leonardo de Galafura',
        bestTime: { en: 'The last hour of light', pt: 'A última hora de luz' },
        permitCost: { en: 'Free — public viewpoint', pt: 'Gratuito — miradouro público' },
        description: {
          en: 'The view that explains the valley: terraces stacked several hundred metres from the river to the ridge, curving out of sight in both directions. It faces the low sun at the end of the day, which is when the terrace lines have shadows and therefore exist.',
          pt: 'A vista que explica o vale: socalcos empilhados algumas centenas de metros do rio até à crista, a curvar para fora de vista nos dois sentidos. Está virado ao sol baixo do fim do dia, que é quando as linhas dos socalcos têm sombra e portanto existem.',
        },
      },
      {
        name: 'Pinhão e a linha do Douro',
        bestTime: { en: 'Morning, from the station side', pt: 'De manhã, do lado da estação' },
        permitCost: { en: 'Free — public station and riverside', pt: 'Gratuito — estação e marginal públicas' },
        description: {
          en: 'A small station tiled with blue azulejos of the harvest, a bridge, and the river bending between two walls of terrace. The one place in the valley where everything is at ground level and reachable without a car.',
          pt: 'Uma estação pequena forrada a azulejo azul com cenas da vindima, uma ponte, e o rio a curvar entre duas paredes de socalcos. O único sítio do vale onde está tudo ao nível do chão e se chega sem carro.',
        },
      },
      {
        name: 'Quintas em vindima',
        bestTime: { en: 'Early September to mid-October, at first light', pt: 'Do início de Setembro a meados de Outubro, ao romper do dia' },
        permitCost: {
          en: 'Private working estates — access is arranged with the quinta beforehand, and during the harvest they are running a business rather than hosting',
          pt: 'Quintas privadas em laboração — o acesso combina-se antes com a quinta, e durante a vindima estão a trabalhar, não a receber',
        },
        description: {
          en: 'Pickers on the terraces, baskets, and the lagares afterwards. This is the only content the valley has that is not landscape, and it exists for about six weeks a year.',
          pt: 'Vindimadores nos socalcos, cestos, e os lagares a seguir. É o único conteúdo do vale que não é paisagem, e existe durante cerca de seis semanas por ano.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'When exactly is the harvest?', pt: 'Quando é exactamente a vindima?' },
        answer: {
          en: 'Roughly early September to mid-October, and it moves: the Baixo Corgo picks before the Douro Superior, and the year decides the rest. Nobody can give you a date in March, which is why a harvest session is booked as a week rather than a day.',
          pt: 'Sensivelmente do início de Setembro a meados de Outubro, e varia: o Baixo Corgo vindima antes do Douro Superior, e o resto é o ano que decide. Ninguém lhe dá uma data em Março, e é por isso que uma sessão de vindima se marca como uma semana e não como um dia.',
        },
      },
      {
        question: { en: 'Can we photograph inside a quinta?', pt: 'Podemos fotografar dentro de uma quinta?' },
        answer: {
          en: 'With the estate’s agreement, which is arranged in advance. During the harvest they are working, and a session that turns up expecting to be accommodated will not be.',
          pt: 'Com acordo da quinta, combinado com antecedência. Durante a vindima estão a trabalhar, e uma sessão que apareça à espera de ser recebida não será.',
        },
      },
    ],
    stats: {},
    topServices: ['couple', 'elopement', 'wedding', 'vacation', 'honeymoon', 'destination-wedding', 'proposal', 'food'],
  },

  {
    slug: 'comporta',
    name: 'Comporta',
    kind: 'city',
    ptArticle: 'a',
    region: { en: 'Alentejo', pt: 'Alentejo' },
    lede: {
      en: 'Rice paddies and umbrella pines, standing in for somewhere considerably more expensive.',
      pt: 'Arrozais e pinheiros-mansos, a fazer de um sítio consideravelmente mais caro.',
    },
    narrative: {
      en: 'Comporta is sixty kilometres of sand with almost nothing built on it, and behind the dune a flat landscape of rice fields, pine and cork. It is the smallest market on this site and the highest-value one: a luxury second-home and destination-wedding corner with very little English-language competition, which is unusual for anywhere this photogenic.\n\nWhat it offers photographically is space and simplicity. The beach runs unbroken far enough that a session never has anyone else in frame, the paddies flood and mirror the sky in spring, and the local architecture is single-storey, white and thatched, which is a background rather than a distraction. What it does not offer is anything to do when the weather turns — there is no old town to move into — so a winter booking here is made with that understood.',
      pt: 'A Comporta são sessenta quilómetros de areia com quase nada construído, e atrás da duna uma paisagem plana de arrozais, pinhal e sobreiro. É o mercado mais pequeno deste site e o de maior valor: um canto de segunda habitação de luxo e casamentos de destino com pouquíssima concorrência em inglês, o que é invulgar num sítio tão fotogénico.\n\nO que oferece fotograficamente é espaço e simplicidade. A praia corre sem interrupção o suficiente para que uma sessão nunca tenha mais ninguém no enquadramento, os arrozais alagam e espelham o céu na Primavera, e a arquitectura local é rasa, branca e de colmo, o que é fundo e não distracção. O que não oferece é seja o que for para fazer quando o tempo muda — não há vila velha para onde recuar — por isso uma marcação de Inverno faz-se com isso entendido.',
    },
    seasonality: {
      en: 'May and June are the best of it: the paddies are flooded and reflective, the pines are in full green and the beach is empty. September is warm and quiet again after the Lisbon exodus of August, which is the one month the place is genuinely full. Winter is beautiful and bleak, with nowhere indoors to retreat to, and a session then is planned with that accepted rather than discovered.',
      pt: 'Maio e Junho são o melhor: os arrozais alagados e espelhados, o pinhal em pleno verde e a praia vazia. Setembro volta a ser quente e sossegado depois do êxodo lisboeta de Agosto, que é o único mês em que isto está mesmo cheio. O Inverno é bonito e desolado, sem nenhum interior para onde recuar, e uma sessão nessa altura planeia-se com isso aceite e não descoberto.',
    },
    coveredAreas: ['Melides', 'Carvalhal', 'Troia', 'Grândola', 'Alcácer do Sal', 'Setúbal'],
    spots: [
      {
        name: 'Praia da Comporta',
        bestTime: { en: 'The last hour before sunset', pt: 'A última hora antes do pôr do sol' },
        permitCost: { en: 'Free — public beach', pt: 'Gratuito — praia pública' },
        description: {
          en: 'Open Atlantic, a single wooden walkway over the dune, and enough kilometres in either direction that nobody is in the frame. Facing west, so it is entirely an evening location.',
          pt: 'Atlântico aberto, um passadiço de madeira sobre a duna, e quilómetros suficientes para os dois lados para que não haja ninguém no enquadramento. Virada a poente, é um sítio inteiramente de fim de tarde.',
        },
      },
      {
        name: 'Arrozais da Comporta',
        bestTime: { en: 'Spring, when the fields are flooded', pt: 'Primavera, com os campos alagados' },
        permitCost: { en: 'Free from the public roads — the fields themselves are private farmland', pt: 'Gratuito a partir das estradas públicas — os campos são propriedade agrícola privada' },
        description: {
          en: 'Flat water to the horizon with storks standing in it and the sky doubled. It lasts as long as the fields are flooded and it is the one thing here that looks like nowhere else in Portugal.',
          pt: 'Água rasa até ao horizonte com cegonhas dentro e o céu a dobrar. Dura enquanto os campos estiverem alagados e é a única coisa aqui que não se parece com mais nada em Portugal.',
        },
      },
      {
        name: 'Pinhal e estradas de Melides',
        bestTime: { en: 'Golden hour', pt: 'Hora dourada' },
        permitCost: { en: 'Free — public roads', pt: 'Gratuito — estradas públicas' },
        description: {
          en: 'Umbrella pines over sand tracks, with long shadows and nothing else in them. The alternative when the wind on the beach is too much, which between April and September it often is by late afternoon.',
          pt: 'Pinheiros-mansos sobre caminhos de areia, com sombras compridas e mais nada. A alternativa quando o vento na praia é demais, o que entre Abril e Setembro acontece muitas vezes ao fim da tarde.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'How far is it from Lisbon?', pt: 'Fica a que distância de Lisboa?' },
        answer: {
          en: 'About an hour and a quarter by car over the Vasco da Gama bridge, or an hour to Setúbal and the ferry across to Troia. There is no useful public transport once you arrive, so a session here assumes a car.',
          pt: 'Cerca de uma hora e um quarto de carro pela ponte Vasco da Gama, ou uma hora até Setúbal e o ferry para a Troia. Depois de chegar não há transporte público útil, por isso uma sessão aqui pressupõe carro.',
        },
      },
    ],
    stats: {},
    topServices: ['wedding', 'destination-wedding', 'couple', 'elopement', 'family', 'honeymoon', 'vacation', 'maternity'],
  },
];
