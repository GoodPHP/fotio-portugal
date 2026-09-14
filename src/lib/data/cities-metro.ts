import type { City } from '../types';

/**
 * The places people live and work in.
 *
 * The domestic half of the catalogue: weddings, christenings, graduations,
 * corporate work. Ordered by market size, which is the order the listings use.
 *
 * Every record has to earn its `lede`. If two of them could be swapped without
 * a reader noticing, the pages under them are thin however many words they
 * carry — which is the failure the curated-leaf system exists to prevent and
 * cannot fix on its own.
 */
export const METRO_CITIES: City[] = [
  {
    slug: 'lisboa',
    name: 'Lisboa',
    nameLocalized: { en: 'Lisbon', pt: 'Lisboa' },
    kind: 'city',
    region: { en: 'Greater Lisbon', pt: 'Grande Lisboa' },
    theme: 'lisboa',
    lede: {
      en: 'Lisbon faces south-west onto the Tagus, which makes the miradouros a morning problem and the river an evening one.',
      pt: 'Lisboa está virada a sudoeste para o Tejo, o que faz dos miradouros um assunto de manhã e do rio um assunto ao fim da tarde.',
    },
    narrative: {
      en: 'Everything about photographing here follows from the orientation. The hills of Alfama and Graça look north and east across the roofs, so they hold usable light from sunrise until about nine and then go flat; the riverfront from Cais do Sodré to Belém looks the other way and only becomes worth the walk after six. Getting that backwards is the single most common way a session here is wasted, and it costs nothing to get right.\n\nThe second thing is the calçada. The pavement is polished limestone, it is genuinely slippery, and it is on a gradient almost everywhere worth standing — which is a wardrobe decision rather than a poetic detail. The third is that the city centre is small: Graça to Portas do Sol to Alfama is twenty minutes on foot, so a ninety-minute session takes in three distinct backdrops without anyone getting into a car.',
      pt: 'Tudo o que diz respeito a fotografar aqui decorre da orientação. As colinas de Alfama e da Graça olham para norte e para nascente por cima dos telhados e aguentam luz utilizável do nascer do sol até cerca das nove, depois achatam; a frente ribeirinha, do Cais do Sodré a Belém, olha ao contrário e só compensa depois das seis. Trocar as voltas a isto é a maneira mais comum de desperdiçar uma sessão na cidade, e acertar não custa nada.\n\nA segunda coisa é a calçada. É calcário polido, escorrega mesmo, e está em declive em quase todos os sítios que valem a pena — o que é uma decisão de calçado, não um detalhe bonito. A terceira é que o centro é pequeno: da Graça às Portas do Sol e daí a Alfama são vinte minutos a pé, por isso noventa minutos dão três fundos distintos sem ninguém entrar num carro.',
    },
    seasonality: {
      en: 'October and November are the best light of the year and almost nobody books them. Midsummer is the opposite: by ten in the morning the sun is high enough to flatten the hills, and the hour that works starts before seven. February and March are unreliable but empty, and the low sun lasts most of the day when it is clear. August is the one month to avoid outright — the heat, the crowds, and half the city closed.',
      pt: 'Outubro e Novembro são a melhor luz do ano e quase ninguém os marca. O pico do Verão é o contrário: às dez da manhã o sol já está alto o suficiente para achatar as colinas, e a hora que resulta começa antes das sete. Fevereiro e Março são pouco fiáveis mas vazios, e nos dias limpos o sol baixo dura quase todo o dia. Agosto é o único mês a evitar de todo — calor, gente, e metade da cidade fechada.',
    },
    coveredAreas: ['Almada', 'Oeiras', 'Belém', 'Parque das Nações', 'Seixal', 'Barreiro'],
    spots: [
      {
        name: 'Miradouro da Senhora do Monte',
        bestTime: { en: 'The first hour after sunrise', pt: 'A primeira hora depois do nascer do sol' },
        permitCost: { en: 'Free — a public viewpoint', pt: 'Gratuito — miradouro público' },
        description: {
          en: 'The highest of the viewpoints and the only one that still has the city to itself at seven in the morning. It looks south-west over the castle, so the light is behind you at sunrise and in your face at sunset — which is why this is a morning location and Portas do Sol is not.',
          pt: 'O mais alto dos miradouros e o único que ainda tem a cidade só para si às sete da manhã. Olha para sudoeste, por cima do castelo, por isso ao nascer do sol a luz vem de trás e ao pôr do sol vem de frente — é por isso que este é um sítio de manhã e as Portas do Sol não são.',
        },
      },
      {
        name: 'Escolas Gerais, Alfama',
        bestTime: { en: 'Before nine, on a weekday', pt: 'Antes das nove, em dia útil' },
        permitCost: { en: 'Free — public street', pt: 'Gratuito — via pública' },
        description: {
          en: 'The street the 28 climbs, and the frame everyone wants. It works in the first hour of service and not afterwards: by nine the tram is full of people going to work and standing in the road with equipment is simply in their way.',
          pt: 'A rua que o 28 sobe, e o enquadramento que toda a gente quer. Resulta na primeira hora de serviço e não depois: às nove o eléctrico vai cheio de gente a caminho do trabalho e estar no meio da rua com equipamento é só estorvar.',
        },
      },
      {
        name: 'Praça do Comércio',
        bestTime: { en: 'Sunrise, or the half hour after sunset', pt: 'Nascer do sol, ou a meia hora depois do pôr do sol' },
        permitCost: { en: 'Free — public square', pt: 'Gratuito — praça pública' },
        description: {
          en: 'Open to the river on one side and arcaded on the other three, so it is one of the few places in the city with clean light and no hill. Empty at six in the morning; from mid-morning it is the busiest square in Portugal.',
          pt: 'Aberta ao rio de um lado e com arcadas nos outros três, é um dos poucos sítios da cidade com luz limpa e sem ladeira. Vazia às seis da manhã; a partir do meio da manhã é a praça mais movimentada do país.',
        },
      },
      {
        name: 'Doca de Santo Amaro e Ponte 25 de Abril',
        bestTime: { en: 'The last hour before sunset', pt: 'A última hora antes do pôr do sol' },
        permitCost: { en: 'Free — public quayside', pt: 'Gratuito — cais público' },
        description: {
          en: 'Directly under the bridge, looking west down the river. This is the counterweight to the miradouros: it is useless in the morning and it is the best thing in the city at seven in the evening in September.',
          pt: 'Mesmo por baixo da ponte, a olhar para poente ao longo do rio. É o contrapeso dos miradouros: não serve de manhã e é a melhor coisa da cidade às sete da tarde em Setembro.',
        },
      },
      {
        name: 'Jerónimos e Padrão dos Descobrimentos, Belém',
        bestTime: { en: 'Before eight, before the coaches', pt: 'Antes das oito, antes dos autocarros' },
        permitCost: {
          en: 'Outside: free. Inside the cloister: ticketed, and a commercial shoot needs written permission',
          pt: 'No exterior: gratuito. No claustro: bilhete, e uma sessão comercial precisa de autorização escrita',
        },
        description: {
          en: 'A twenty-minute tram ride from the centre and a completely different city: flat, wide and monumental. The exterior needs nothing but an early start. Anything inside is a separate arrangement, made in advance.',
          pt: 'A vinte minutos de eléctrico do centro e uma cidade completamente diferente: plana, larga e monumental. O exterior não exige nada além de começar cedo. Tudo o que seja interior é uma marcação à parte, feita com antecedência.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Can we do the session on tram 28?', pt: 'Podemos fazer a sessão dentro do eléctrico 28?' },
        answer: {
          en: 'Not on board. The 28E is a commuter line, not an attraction, and from about nine it is standing room only. The photographs worth having are of the tram passing — Escolas Gerais, Graça, Portas do Sol — in the first hour of service. The 12E runs a shorter loop over the same streets and is far quieter.',
          pt: 'A bordo não. O 28E é uma linha de quem vive na cidade, não uma atracção, e a partir das nove vai cheio. As fotografias que valem a pena são do eléctrico a passar — Escolas Gerais, Graça, Portas do Sol — na primeira hora de serviço. O 12E faz um percurso mais curto pelas mesmas ruas e vai muito mais vazio.',
        },
      },
      {
        question: { en: 'What should we wear on the calçada?', pt: 'Que calçado se deve usar na calçada?' },
        answer: {
          en: 'Anything with a flat sole and some grip. Lisbon pavement is polished limestone on a slope, and it is worse when it is dry and dusty than when it is wet. Bring the good shoes in a bag and change for the frames that need them.',
          pt: 'Qualquer coisa de sola rasa e com alguma aderência. A calçada lisboeta é calcário polido em declive, e é pior seca e com pó do que molhada. Leve os sapatos bons num saco e mude para as fotografias que os pedem.',
        },
      },
      {
        question: { en: 'How early is early, in summer?', pt: 'Quão cedo é cedo, no Verão?' },
        answer: {
          en: 'In July, a session that starts at seven is finishing as the first tour groups arrive. At eight you are sharing the viewpoint; at nine there is no photograph left to take at Senhora do Monte that does not have forty people in it.',
          pt: 'Em Julho, uma sessão que comece às sete acaba quando chegam os primeiros grupos. Às oito já se divide o miradouro; às nove não há fotografia na Senhora do Monte que não leve quarenta pessoas dentro.',
        },
      },
    ],
    stats: {},
    topServices: [
      'lisbon-photoshoot',
      'couple',
      'proposal',
      'vacation',
      'family',
      'headshots',
      'personal-brand',
      'wedding',
      'maternity',
      'real-estate',
      'food',
      'eventos-de-empresa',
      'digital-nomad-headshots',
    ],
  },

  {
    slug: 'porto',
    name: 'Porto',
    nameLocalized: { en: 'Porto', pt: 'Porto' },
    kind: 'city',
    ptArticle: 'o',
    region: { en: 'Norte', pt: 'Norte' },
    lede: {
      en: 'Ribeira faces north-west and lights in the evening; Gaia, looking back at it, lights in the morning. Everything else follows from which bank you are standing on.',
      pt: 'A Ribeira está virada a noroeste e acende ao fim da tarde; Gaia, a olhar para ela, acende de manhã. Tudo o resto decorre da margem em que se está.',
    },
    narrative: {
      en: 'Porto is a two-bank city and the two banks are never good at the same time. From the Gaia quayside the whole Ribeira facade is lit from the front between about eight and eleven in the morning; from Ribeira itself, Gaia and the port lodges take the last two hours of sun. A session that wants both is a session that needs the upper deck of the Luís I and about ten minutes to walk across it — worth knowing that the upper deck carries the metro, so you are walking beside a live line, not on a footbridge.\n\nThe rest is interiors, and interiors here are where the constraints live. São Bento is free and extraordinary and is also a working station busy from eight. Livraria Lello charges admission and restricts photography, and the policy has changed more than once — it is checked before it is promised, never after.',
      pt: 'O Porto é uma cidade de duas margens e as duas nunca estão boas ao mesmo tempo. Do cais de Gaia, toda a fachada da Ribeira apanha luz de frente entre as oito e as onze da manhã; da Ribeira, Gaia e as caves ficam com as duas últimas horas de sol. Uma sessão que queira as duas coisas é uma sessão que precisa do tabuleiro superior da Luís I e de dez minutos para o atravessar — e convém saber que por esse tabuleiro passa o metro, ou seja, anda-se ao lado de uma linha em serviço, não numa passagem pedonal.\n\nO resto são interiores, e é nos interiores que estão as condicionantes. São Bento é gratuito, é extraordinário, e é também uma estação a funcionar, cheia a partir das oito. A Livraria Lello cobra entrada e restringe a fotografia, e a política já mudou mais do que uma vez — confirma-se antes de prometer, nunca depois.',
    },
    seasonality: {
      en: 'Porto gets Atlantic weather and more of it than the south: the wet months are genuinely wet, and a session in December is planned with an indoor alternative rather than hoped through. June to September is reliable and the evenings are long. Late September into October is the best combination of light, temperature and an empty Ribeira, and it overlaps the Douro harvest an hour upriver.',
      pt: 'O Porto apanha tempo atlântico e mais do que o sul: os meses de chuva são mesmo de chuva, e uma sessão em Dezembro planeia-se com alternativa de interior em vez de se esperar pelo melhor. De Junho a Setembro é fiável e os fins de tarde são longos. O fim de Setembro e Outubro dão a melhor combinação de luz, temperatura e Ribeira vazia, e coincidem com a vindima no Douro a uma hora de distância.',
    },
    coveredAreas: ['Vila Nova de Gaia', 'Matosinhos', 'Foz do Douro', 'Leça da Palmeira', 'Espinho', 'Vila do Conde'],
    spots: [
      {
        name: 'Cais de Gaia',
        bestTime: { en: 'Eight to eleven in the morning', pt: 'Das oito às onze da manhã' },
        permitCost: { en: 'Free — public quayside', pt: 'Gratuito — cais público' },
        description: {
          en: 'The frame of Porto that everyone recognises, and the only place to take it with the light on the front of the buildings rather than behind them. Empty early; by midday it is a queue for the rabelo boats.',
          pt: 'O enquadramento do Porto que toda a gente reconhece, e o único sítio de onde se faz com a luz de frente para os edifícios em vez de atrás. Vazio de manhã cedo; ao meio-dia é uma fila para os barcos rabelos.',
        },
      },
      {
        name: 'Ribeira',
        bestTime: { en: 'The last two hours of sun', pt: 'As duas últimas horas de sol' },
        permitCost: { en: 'Free — public street', pt: 'Gratuito — via pública' },
        description: {
          en: 'Narrow, north-west facing, and in shadow all morning. It comes alive late, and the facades take a colour at seven in the evening that no amount of editing reproduces at noon.',
          pt: 'Estreita, virada a noroeste, à sombra toda a manhã. Ganha vida tarde, e as fachadas apanham às sete da tarde uma cor que nenhuma edição reproduz ao meio-dia.',
        },
      },
      {
        name: 'Ponte Luís I, tabuleiro superior',
        bestTime: { en: 'Sunset, on foot from Gaia', pt: 'Pôr do sol, a pé a partir de Gaia' },
        permitCost: { en: 'Free — public walkway beside the metro line', pt: 'Gratuito — passadiço público ao lado da linha do metro' },
        description: {
          en: 'The connection between the two halves of the city and a viewpoint in its own right. The walkway runs alongside a live metro track, so it is a place to stand still rather than to arrange people across.',
          pt: 'A ligação entre as duas metades da cidade e, em si mesmo, um miradouro. O passadiço corre ao lado de uma linha de metro em serviço, por isso é um sítio para estar parado e não para espalhar pessoas.',
        },
      },
      {
        name: 'Estação de São Bento',
        bestTime: { en: 'Before eight, before the commuters', pt: 'Antes das oito, antes de quem vai trabalhar' },
        permitCost: { en: 'Free — but it is a working station, not a monument', pt: 'Gratuito — mas é uma estação em serviço, não um monumento' },
        description: {
          en: 'Twenty thousand azulejos in a room the size of a church, and trains leaving from the platform behind it. Ten minutes at seven in the morning is worth an hour at any other time.',
          pt: 'Vinte mil azulejos numa sala do tamanho de uma igreja, e comboios a sair da plataforma logo atrás. Dez minutos às sete da manhã valem uma hora a qualquer outra hora.',
        },
      },
      {
        name: 'Foz do Douro',
        bestTime: { en: 'Sunset, all year', pt: 'Pôr do sol, todo o ano' },
        permitCost: { en: 'Free — public seafront', pt: 'Gratuito — marginal pública' },
        description: {
          en: 'Where the river meets the Atlantic, fifteen minutes down the marginal. Open west, so it is the one part of Porto with an uninterrupted horizon and a sunset that does not go behind a building.',
          pt: 'Onde o rio encontra o Atlântico, a quinze minutos pela marginal. Aberta a poente, é a única parte do Porto com horizonte sem corte e um pôr do sol que não desaparece atrás de um prédio.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Which bank should we start on?', pt: 'Por que margem devemos começar?' },
        answer: {
          en: 'Gaia in the morning, Ribeira in the evening. If you only have one session and it is in the afternoon, start in Ribeira and finish on the bridge; if it is in the morning, do the reverse. A session that tries to do both at noon gets neither.',
          pt: 'Gaia de manhã, Ribeira ao fim da tarde. Se só houver uma sessão e for de tarde, comece na Ribeira e acabe na ponte; se for de manhã, o contrário. Uma sessão que tente as duas ao meio-dia não fica com nenhuma.',
        },
      },
      {
        question: { en: 'Can we photograph inside Livraria Lello?', pt: 'Podemos fotografar dentro da Livraria Lello?' },
        answer: {
          en: 'It charges admission and restricts photography, and the terms have changed more than once. It is checked at the time of booking rather than assumed, and if the answer is no there are better staircases in the city that cost nothing.',
          pt: 'Cobra entrada e restringe a fotografia, e as condições já mudaram mais do que uma vez. Confirma-se na altura da reserva em vez de se assumir, e se a resposta for não há escadarias melhores na cidade que não custam nada.',
        },
      },
    ],
    stats: {},
    topServices: [
      'couple',
      'wedding',
      'finalistas',
      'family',
      'headshots',
      'proposal',
      'vacation',
      'personal-brand',
      'batizado',
      'food',
      'eventos-de-empresa',
      'real-estate',
    ],
  },

  {
    slug: 'cascais',
    name: 'Cascais',
    kind: 'city',
    region: { en: 'Greater Lisbon', pt: 'Grande Lisboa' },
    lede: {
      en: 'A commuter town that photographs like a resort, thirty-three minutes from Cais do Sodré.',
      pt: 'Uma terra de quem trabalha em Lisboa e que fotografa como uma estância, a trinta e três minutos do Cais do Sodré.',
    },
    narrative: {
      en: 'The line from Cais do Sodré runs along the water the whole way, which is the practical reason Cascais works: there is no transfer, no parking and no argument about who drives. It arrives in a town that has a bay, a marina, a nineteenth-century seafront and, ten minutes west, an actual Atlantic coastline at Guincho, where the wind is a different proposition entirely.\n\nWhat it is really used for is expatriate and second-home work — family sessions, corporate portraits for people who commute into Lisbon two days a week, and the smaller end of the wedding market. The bay faces south, unusually for this coast, which means it holds light later into the morning than anywhere in Lisbon and is one of the few places here that is usable at midday.',
      pt: 'A linha do Cais do Sodré corre junto à água todo o percurso, e é essa a razão prática por que Cascais resulta: não há transbordo, não há estacionamento e não há discussão sobre quem conduz. Chega-se a uma vila com baía, marina, uma marginal oitocentista e, dez minutos a poente, uma costa atlântica a sério no Guincho, onde o vento é outra conversa.\n\nO que aqui se faz sobretudo é trabalho para estrangeiros residentes e segundas habitações — sessões de família, retratos corporativos de quem vai a Lisboa dois dias por semana, e a ponta mais pequena do mercado dos casamentos. A baía está virada a sul, o que é invulgar nesta costa, e por isso aguenta luz até mais tarde de manhã do que qualquer sítio de Lisboa e é dos poucos locais aqui utilizáveis ao meio-dia.',
    },
    seasonality: {
      en: 'The bay is sheltered and works all year. Guincho does not: from spring to autumn the nortada builds through the afternoon and by four there is sand moving across the beach at knee height. Anything at Guincho is a morning booking. May, June, September and October are the months where you get warmth without the August crowd from Lisbon.',
      pt: 'A baía é abrigada e funciona todo o ano. O Guincho não: da Primavera ao Outono a nortada cresce durante a tarde e às quatro há areia a correr na praia à altura dos joelhos. Tudo o que seja Guincho marca-se de manhã. Maio, Junho, Setembro e Outubro dão calor sem a enchente lisboeta de Agosto.',
    },
    coveredAreas: ['Estoril', 'Guincho', 'Carcavelos', 'Parede', 'Oeiras', 'Malveira da Serra'],
    spots: [
      {
        name: 'Baía de Cascais',
        bestTime: { en: 'Morning, and it holds until about eleven', pt: 'De manhã, e aguenta até cerca das onze' },
        permitCost: { en: 'Free — public beach and promenade', pt: 'Gratuito — praia e passeio públicos' },
        description: {
          en: 'South-facing, sheltered, with the fishing boats pulled up on the sand and the old town behind. The one place on this coast where a late-morning session is not a compromise.',
          pt: 'Virada a sul, abrigada, com os barcos de pesca varados na areia e a vila velha atrás. O único sítio desta costa onde uma sessão a meio da manhã não é um compromisso.',
        },
      },
      {
        name: 'Boca do Inferno',
        bestTime: { en: 'Late afternoon, and better on a rough day', pt: 'Fim de tarde, e melhor em dia de mar agitado' },
        permitCost: { en: 'Free — public clifftop', pt: 'Gratuito — arriba pública' },
        description: {
          en: 'A collapsed sea cave fifteen minutes along the coast path. Flat and dull on a calm day; on a westerly swell it is the most dramatic thing within an hour of Lisbon.',
          pt: 'Uma gruta marinha desabada, a quinze minutos pelo passeio da costa. Sem graça em dia de mar chão; com ondulação de oeste é a coisa mais dramática a uma hora de Lisboa.',
        },
      },
      {
        name: 'Praia do Guincho',
        bestTime: { en: 'Early morning, before the nortada', pt: 'Manhã cedo, antes da nortada' },
        permitCost: { en: 'Free — but it is inside the Sintra-Cascais natural park', pt: 'Gratuito — mas está dentro do parque natural de Sintra-Cascais' },
        description: {
          en: 'Open Atlantic, dunes and the Serra behind. It is the best landscape on this coast and it is unusable from mid-afternoon for most of the year, which is the whole planning problem in one sentence.',
          pt: 'Atlântico aberto, dunas e a serra atrás. É a melhor paisagem desta costa e, em boa parte do ano, é inutilizável a partir do meio da tarde — o problema de planeamento inteiro numa frase.',
        },
      },
      {
        name: 'Marina e Cidadela',
        bestTime: { en: 'Sunset', pt: 'Pôr do sol' },
        permitCost: { en: 'Free — public marina walkway', pt: 'Gratuito — passeio público da marina' },
        description: {
          en: 'Masts, clean lines and a western horizon. Useful when the beach is busy and the light is going, which between June and August is most evenings.',
          pt: 'Mastros, linhas limpas e horizonte a poente. Útil quando a praia está cheia e a luz está a acabar, o que entre Junho e Agosto acontece quase todas as tardes.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Is it worth coming out from Lisbon for a session?', pt: 'Vale a pena vir de Lisboa para uma sessão?' },
        answer: {
          en: 'For a family session with small children, usually yes: the train is part of the morning rather than a cost, and the bay is flat, which Lisbon is not. For a couple session, only if you want sea rather than city — the two are not interchangeable.',
          pt: 'Para uma sessão de família com crianças pequenas, normalmente sim: o comboio faz parte da manhã em vez de ser um custo, e a baía é plana, o que Lisboa não é. Para uma sessão de casal, só se quiser mar em vez de cidade — as duas coisas não se substituem.',
        },
      },
    ],
    stats: {},
    topServices: ['family', 'couple', 'proposal', 'wedding', 'maternity', 'vacation', 'headshots', 'real-estate', 'newborn'],
  },

  {
    slug: 'braga',
    name: 'Braga',
    kind: 'city',
    region: { en: 'Minho', pt: 'Minho' },
    lede: {
      en: 'Where Portuguese people actually get married.',
      pt: 'Onde os portugueses se casam de facto.',
    },
    narrative: {
      en: 'The Minho is the densest wedding market in the country and Braga is its centre — a city of churches with a quinta on every other road out of it, booked a year ahead for Saturdays between May and September. This is a domestic market with domestic expectations: a full day from getting ready to the first hour of the party, a church ceremony with its own rules about where a photographer may stand, and a copo-d’água that runs long.\n\nBom Jesus do Monte, on the hill above the city, is the frame everyone knows: a baroque stairway climbing through switchbacks of stone and water, with a funicular running beside it since 1882. It is also a place of worship and a UNESCO World Heritage site, and it is busy every Sunday of the year.',
      pt: 'O Minho é o mercado de casamentos mais denso do país e Braga é o seu centro — uma cidade de igrejas com uma quinta em cada estrada que dela sai, reservadas com um ano de antecedência para os sábados entre Maio e Setembro. É um mercado interno com exigências internas: um dia inteiro, dos preparativos à primeira hora da festa, uma cerimónia religiosa com regras próprias sobre onde o fotógrafo pode estar, e um copo-d’água que se prolonga.\n\nO Bom Jesus do Monte, na encosta acima da cidade, é o enquadramento que toda a gente conhece: um escadório barroco a subir em ziguezagues de pedra e água, com um elevador a funcionar ao lado desde 1882. É também um lugar de culto e Património Mundial, e está cheio todos os domingos do ano.',
    },
    seasonality: {
      en: 'Wedding season runs May to September and Saturdays inside it are gone a year in advance; a Friday or a Sunday is the difference between a choice of venues and none. The Minho is the wettest part of the country between November and March, and a winter wedding here is planned around an indoor ceremony rather than in hope. Late September is the quiet recommendation: warm, dry, and the vineyards still in leaf.',
      pt: 'A época de casamentos vai de Maio a Setembro e os sábados desse período esgotam com um ano de antecedência; uma sexta ou um domingo é a diferença entre poder escolher quinta e não poder. O Minho é a zona mais chuvosa do país entre Novembro e Março, e um casamento de Inverno aqui planeia-se com cerimónia de interior em vez de à espera. O fim de Setembro é a recomendação discreta: quente, seco, e as vinhas ainda com folha.',
    },
    coveredAreas: ['Guimarães', 'Barcelos', 'Viana do Castelo', 'Ponte de Lima', 'Amares', 'Vila Verde'],
    spots: [
      {
        name: 'Escadório do Bom Jesus do Monte',
        bestTime: { en: 'Early morning on a weekday', pt: 'De manhã cedo, em dia útil' },
        permitCost: {
          en: 'Free to walk. It is a place of worship and a World Heritage site — a wedding party is arranged with the sanctuary in advance',
          pt: 'Subir é gratuito. É um local de culto e Património Mundial — um cortejo de casamento combina-se antes com o santuário',
        },
        description: {
          en: 'Six hundred steps of granite and fountains, climbing through trees. Photographed from below it is monumental and from the landings it is intimate; both need the stairway reasonably empty, which means before nine or on a weekday out of season.',
          pt: 'Seiscentos degraus de granito e fontes, a subir por entre árvores. Fotografado de baixo é monumental e dos patamares é íntimo; os dois precisam do escadório razoavelmente vazio, o que quer dizer antes das nove ou em dia útil fora de época.',
        },
      },
      {
        name: 'Sé de Braga e centro histórico',
        bestTime: { en: 'Late afternoon', pt: 'Fim de tarde' },
        permitCost: {
          en: 'Streets are free. Inside any church, what is allowed is a question for that parish and is asked beforehand',
          pt: 'As ruas são gratuitas. Dentro de qualquer igreja, o que é permitido é uma pergunta para a paróquia e faz-se antes',
        },
        description: {
          en: 'The oldest cathedral in the country and a compact grid of granite streets around it. Everything is within five minutes on foot, which is what makes a ceremony-plus-portraits schedule work without a drive in between.',
          pt: 'A catedral mais antiga do país e, à volta, uma malha compacta de ruas de granito. Está tudo a cinco minutos a pé, e é isso que faz funcionar um horário de cerimónia mais retratos sem um trajecto de carro pelo meio.',
        },
      },
      {
        name: 'Quintas do vale do Cávado',
        bestTime: { en: 'The two hours before sunset', pt: 'As duas horas antes do pôr do sol' },
        permitCost: {
          en: 'Private estates — access comes with the venue booking, not separately',
          pt: 'Quintas privadas — o acesso vem com a reserva do espaço, não à parte',
        },
        description: {
          en: 'Granite, vine and long lawns, fifteen to thirty minutes out of the city in almost every direction. This is where the reception is and where the portraits after the ceremony are made.',
          pt: 'Granito, vinha e relvados compridos, a quinze ou trinta minutos da cidade em quase todas as direcções. É aqui que é o copo-d’água e é aqui que se fazem os retratos depois da cerimónia.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'How far ahead should a Saturday be booked?', pt: 'Com que antecedência se reserva um sábado?' },
        answer: {
          en: 'A year, for the season. The constraint is the venue rather than the photographer, and the two are usually booked in that order — which is why the timing conversation is worth having before the venue is signed, not after.',
          pt: 'Um ano, para a época alta. A condicionante é a quinta e não o fotógrafo, e as duas coisas reservam-se normalmente por essa ordem — o que é a razão para falar de horários antes de assinar com a quinta, e não depois.',
        },
      },
      {
        question: { en: 'What are the rules inside the church?', pt: 'Quais são as regras dentro da igreja?' },
        answer: {
          en: 'They are set by the parish, not by a national rule, and they vary: some ask the photographer to stay behind a line during the rite, some prohibit flash, some allow neither. It is asked the week before, and knowing the answer changes where we stand rather than spoiling anything.',
          pt: 'São da paróquia, não há regra nacional, e variam: umas pedem que o fotógrafo fique atrás de uma linha durante o rito, outras proíbem flash, outras nenhuma das duas coisas. Pergunta-se na semana anterior, e saber a resposta muda onde nos colocamos em vez de estragar o que quer que seja.',
        },
      },
    ],
    stats: {},
    topServices: ['wedding', 'batizado', 'family', 'couple', 'proposal', 'finalistas', 'maternity', 'newborn', 'eventos-de-empresa'],
  },

  {
    slug: 'coimbra',
    name: 'Coimbra',
    kind: 'city',
    region: { en: 'Beira Litoral', pt: 'Beira Litoral' },
    regionArticle: 'a',
    lede: {
      en: 'The only city in Portugal where a photograph is part of an academic ritual.',
      pt: 'A única cidade do país onde uma fotografia faz parte de um ritual académico.',
    },
    narrative: {
      en: 'Coimbra has a photography market that exists nowhere else, and it has nothing to do with tourism. The university’s student traditions — the capa e batina, the faculty-coloured ribbons, the Queima das Fitas in May and the Latada at the start of the academic year — produce a whole season of sessions with their own dress code, their own locations and their own week in the calendar. Finalistas book in groups, they book late, and they all want the same two hours of light.\n\nThe city itself is a hill with a university on top of it, which means the Paço das Escolas terrace looks out over everything and everything looks up at the tower. The Mondego at the bottom gives the one flat, open location, and the far bank gives the frame of the whole hill.',
      pt: 'Coimbra tem um mercado de fotografia que não existe em mais lado nenhum, e nada tem a ver com turismo. As tradições académicas — a capa e batina, as fitas com as cores das faculdades, a Queima das Fitas em Maio e a Latada no início do ano lectivo — produzem uma época inteira de sessões com código de vestuário próprio, locais próprios e semana própria no calendário. Os finalistas marcam em grupo, marcam tarde, e querem todos as mesmas duas horas de luz.\n\nA cidade é uma colina com uma universidade em cima, o que faz com que o terraço do Paço das Escolas olhe para tudo e tudo olhe para a torre. O Mondego, em baixo, dá o único local plano e aberto, e a outra margem dá o enquadramento da colina inteira.',
    },
    seasonality: {
      en: 'May is the Queima das Fitas and the city is full; the sessions that week are booked months in advance and there is no flexibility in them. The Latada, at the start of the academic year in October, is the same tradition at a quarter of the pressure and is far easier to schedule. Outside the two, Coimbra is a quiet city with good light in the late afternoon and no queue for anything.',
      pt: 'Maio é a Queima das Fitas e a cidade está cheia; as sessões dessa semana marcam-se com meses de antecedência e não têm folga nenhuma. A Latada, no início do ano lectivo em Outubro, é a mesma tradição com um quarto da pressão e é bem mais fácil de agendar. Fora das duas, Coimbra é uma cidade sossegada, com boa luz ao fim da tarde e sem fila para nada.',
    },
    coveredAreas: ['Figueira da Foz', 'Aveiro', 'Condeixa-a-Nova', 'Lousã', 'Montemor-o-Velho'],
    spots: [
      {
        name: 'Paço das Escolas',
        bestTime: { en: 'Late afternoon', pt: 'Fim de tarde' },
        permitCost: {
          en: 'The courtyard is ticketed as part of the university visit; a commercial session needs authorisation from the university',
          pt: 'O pátio tem bilhete, como parte da visita à universidade; uma sessão comercial precisa de autorização da universidade',
        },
        description: {
          en: 'The terrace at the top of the hill, with the bell tower on one side and the whole valley on the other. This is the frame the capa e batina belongs in, and it is the reason a finalistas session is worth planning around the light rather than around lunch.',
          pt: 'O terraço no topo da colina, com a torre de um lado e o vale inteiro do outro. É o enquadramento a que a capa e batina pertence, e é a razão por que uma sessão de finalistas se planeia em função da luz e não do almoço.',
        },
      },
      {
        name: 'Escadas Monumentais',
        bestTime: { en: 'Morning, in shade', pt: 'De manhã, à sombra' },
        permitCost: { en: 'Free — public stairway', pt: 'Gratuito — escadaria pública' },
        description: {
          en: 'The climb from the lower town to the university, and the natural place for a group of twenty to be arranged in rows without anyone being hidden. Shaded for most of the morning, which is an advantage rather than a limitation with black capes.',
          pt: 'A subida da baixa para a universidade, e o sítio natural para dispor um grupo de vinte em filas sem esconder ninguém. À sombra durante quase toda a manhã, o que com capas pretas é vantagem e não limitação.',
        },
      },
      {
        name: 'Margem esquerda do Mondego',
        bestTime: { en: 'The hour before sunset', pt: 'A hora antes do pôr do sol' },
        permitCost: { en: 'Free — public park', pt: 'Gratuito — parque público' },
        description: {
          en: 'From Parque Verde, the whole hill stacks up behind the river with the tower on top. It is the only place to get the city as a single image, and the light is on the front of it at the end of the day.',
          pt: 'Do Parque Verde, a colina inteira empilha-se atrás do rio com a torre no topo. É o único sítio de onde a cidade se apanha numa só imagem, e ao fim do dia a luz está de frente para ela.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'When are finalistas sessions photographed?', pt: 'Quando se fotografam as sessões de finalistas?' },
        answer: {
          en: 'Around the Queima das Fitas in May and the Latada in October. The May week is the busy one and it is booked out months ahead; October is the same tradition with room to choose a time.',
          pt: 'À volta da Queima das Fitas em Maio e da Latada em Outubro. A semana de Maio é a cheia e esgota com meses de antecedência; Outubro é a mesma tradição com espaço para escolher a hora.',
        },
      },
    ],
    stats: {},
    topServices: ['finalistas', 'couple', 'family', 'wedding', 'batizado', 'proposal', 'headshots', 'vacation'],
  },

  {
    slug: 'evora',
    name: 'Évora',
    kind: 'city',
    region: { en: 'Alentejo', pt: 'Alentejo' },
    lede: {
      en: 'A walled town you can cross in eleven minutes, which means one session can use six locations.',
      pt: 'Uma vila intramuros que se atravessa em onze minutos, o que faz com que uma sessão possa usar seis locais.',
    },
    narrative: {
      en: 'Évora is the argument for small. The whole historic centre is inside a wall, and from the Roman temple to the cathedral to the Praça do Giraldo to the aqueduct is a walk rather than a logistics exercise. A ninety-minute session here covers more distinct backdrops than three hours in Lisbon, because none of the time goes into moving between them.\n\nWhat it costs is shade. The Alentejo is the hottest part of the country and the streets are narrow and white, which means from June to September the middle of the day is not merely uncomfortable, it is unusable — the contrast between a lime wall in sun and the same wall in shadow is beyond what any sensor holds. The compensation is that the light at either end of the day is the cleanest in Portugal.',
      pt: 'Évora é o argumento a favor do pequeno. O centro histórico está todo dentro da muralha, e do templo romano à Sé, à Praça do Giraldo e ao aqueduto é um passeio e não um exercício de logística. Uma sessão de noventa minutos aqui cobre mais fundos distintos do que três horas em Lisboa, porque nada do tempo se gasta a mudar de sítio.\n\nO que custa é a sombra. O Alentejo é a zona mais quente do país e as ruas são estreitas e brancas, o que faz com que de Junho a Setembro o meio do dia não seja apenas desconfortável, seja inutilizável — o contraste entre uma parede caiada ao sol e a mesma parede à sombra está acima do que qualquer sensor aguenta. A compensação é que a luz nos dois extremos do dia é a mais limpa de Portugal.',
    },
    seasonality: {
      en: 'April, May and October are the months. In high summer a session starts at seven or at eight in the evening and nothing in between is worth doing; forty degrees in the shade is a normal July afternoon here. Winter is cold at night, bright in the day and completely empty, and the cork oaks and the plain around the town are green from December to April rather than in summer, which is the opposite of what most visitors expect.',
      pt: 'Abril, Maio e Outubro são os meses. No pico do Verão uma sessão começa às sete ou às oito da tarde e nada pelo meio compensa; quarenta graus à sombra é uma tarde normal de Julho por aqui. O Inverno é frio de noite, luminoso de dia e completamente vazio, e os sobreiros e a planície à volta estão verdes de Dezembro a Abril e não no Verão, ao contrário do que quase toda a gente espera.',
    },
    coveredAreas: ['Monsaraz', 'Arraiolos', 'Estremoz', 'Redondo', 'Alqueva', 'Vila Viçosa'],
    spots: [
      {
        name: 'Templo Romano',
        bestTime: { en: 'The hour after sunrise, or blue hour', pt: 'A hora depois do nascer do sol, ou a hora azul' },
        permitCost: { en: 'Free — it stands in an open public square', pt: 'Gratuito — está numa praça pública aberta' },
        description: {
          en: 'Fourteen Corinthian columns on a rise at the top of the town, with nothing built against them. It is lit from behind at sunrise, which makes it a silhouette, and lit from the front at the end of the day.',
          pt: 'Catorze colunas coríntias num alto, no topo da vila, sem nada encostado. Ao nascer do sol recebe luz de trás, o que o torna uma silhueta, e ao fim do dia recebe-a de frente.',
        },
      },
      {
        name: 'Praça do Giraldo',
        bestTime: { en: 'Early morning, before the cafés put out tables', pt: 'De manhã cedo, antes de os cafés porem as mesas' },
        permitCost: { en: 'Free — public square', pt: 'Gratuito — praça pública' },
        description: {
          en: 'Arcades down two sides and a marble fountain in the middle, which is the one piece of open shade in the centre. It is also the town’s meeting place, so it is a location that changes completely between eight and ten.',
          pt: 'Arcadas em dois lados e um chafariz de mármore ao meio, que é a única sombra aberta do centro. É também o ponto de encontro da vila, por isso é um sítio que muda por completo entre as oito e as dez.',
        },
      },
      {
        name: 'Aqueduto da Água de Prata',
        bestTime: { en: 'Late afternoon', pt: 'Fim de tarde' },
        permitCost: { en: 'Free — public street', pt: 'Gratuito — via pública' },
        description: {
          en: 'A sixteenth-century aqueduct that the town simply built into: houses sit inside the arches, on a normal street with cars on it. It is the most photographed thing in Évora that no one arrives intending to photograph.',
          pt: 'Um aqueduto quinhentista onde a vila construiu por dentro: há casas dentro dos arcos, numa rua normal com carros. É a coisa mais fotografada de Évora que ninguém chega com intenção de fotografar.',
        },
      },
      {
        name: 'Sé de Évora, terraço',
        bestTime: { en: 'Any clear afternoon', pt: 'Qualquer tarde limpa' },
        permitCost: { en: 'Ticketed — the roof terrace is part of the cathedral visit', pt: 'Bilhete — o terraço faz parte da visita à Sé' },
        description: {
          en: 'The roof of the cathedral, looking over the tiled roofs of the whole walled town to the plain beyond. The one elevated view, and the only paid location in the centre.',
          pt: 'O telhado da Sé, a olhar por cima dos telhados da vila intramuros até à planície. A única vista alta, e o único local pago no centro.',
        },
      },
    ],
    faqs: [
      {
        question: { en: 'Is one session enough to see the town?', pt: 'Uma sessão chega para ver a vila?' },
        answer: {
          en: 'Ninety minutes covers the temple, the square, the cathedral and the aqueduct on foot, with time to stop. That is unusual — in most cities that list would be a half day and two taxis.',
          pt: 'Noventa minutos cobrem o templo, a praça, a Sé e o aqueduto a pé, com tempo para parar. É invulgar — na maior parte das cidades essa lista seria meio dia e dois táxis.',
        },
      },
      {
        question: { en: 'How bad is the summer heat, really?', pt: 'O calor de Verão é assim tão mau?' },
        answer: {
          en: 'Forty degrees in the shade is a normal July afternoon. It is not a matter of preference: between about eleven and six there is no session here that produces anything, so the booking is at either end of the day or in another month.',
          pt: 'Quarenta graus à sombra é uma tarde normal de Julho. Não é uma questão de preferência: entre as onze e as seis não há sessão que produza seja o que for, por isso marca-se num dos extremos do dia ou noutro mês.',
        },
      },
    ],
    stats: {},
    topServices: ['wedding', 'couple', 'elopement', 'vacation', 'family', 'proposal', 'destination-wedding', 'food'],
  },
];
