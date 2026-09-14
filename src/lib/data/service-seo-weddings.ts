import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the wedding, elopement and destination services.
 *
 * These are the highest-value pages on the site and the ones where a vague
 * claim costs the most, so every figure here — hours of coverage, photograph
 * count, delivery window — is the catalogue's, not an approximation of it.
 */
export const WEDDING_SERVICE_SEO: Record<string, ServiceSeo> = {
  wedding: {
    title: { en: 'Wedding Photographer in Portugal', pt: 'Fotógrafo de casamento' },
    description: {
      en: 'Ten hours of wedding coverage, 400 edited photographs and a gallery in three weeks. A timing plan agreed a month beforehand. From €1,400, fixed.',
      pt: 'Dez horas de cobertura, 400 fotografias editadas e galeria em três semanas. Plano de horários acordado um mês antes. Desde 1 400 €, preço fixo.',
    },
    heading: {
      en: 'Set the ceremony by the light, not by the lunch',
      pt: 'Marque a cerimónia pela luz, não pelo almoço',
    },
    paragraphs: {
      en: [
        'The single decision that changes a wedding album more than any other is what time the ceremony starts, and it is usually made before anyone has asked a photographer. Portraits happen immediately after the ceremony, so the ceremony hour sets the light they are made in. In Portugal in July, a four o’clock ceremony puts the portraits in overhead sun with everyone squinting; a six o’clock ceremony puts them in the last hour of the day. The venue will offer you either. It costs nothing to pick the second.',
        'The rest is planning that gets done a month out rather than on the morning. Ten hours of coverage runs from getting ready to the first hour of the party, which is where the photographs stop improving. Church ceremonies have rules that belong to the parish and not to a national code — some ask the photographer to stay behind a line during the rite, some prohibit flash — and those are asked the week before, because knowing changes where we stand and finding out on the day does not.',
      ],
      pt: [
        'A decisão que mais muda um álbum de casamento é a hora a que começa a cerimónia, e normalmente é tomada antes de alguém falar com um fotógrafo. Os retratos são logo a seguir, por isso é a hora da cerimónia que decide a luz em que são feitos. Em Portugal, em Julho, uma cerimónia às quatro põe os retratos com o sol a pique e toda a gente de olhos semicerrados; às seis, põe-nos na última hora do dia. A quinta oferece-lhe as duas. Escolher a segunda não custa nada.',
        'O resto é planeamento feito com um mês de antecedência e não na própria manhã. Dez horas de cobertura vão dos preparativos à primeira hora da festa, que é onde as fotografias deixam de melhorar. As cerimónias religiosas têm regras que são da paróquia e não de um código nacional — há quem peça que o fotógrafo fique atrás de uma linha durante o rito, há quem proíba flash — e essas perguntam-se na semana anterior, porque saber muda onde nos colocamos e descobrir no dia não muda nada.',
      ],
    },
  },

  elopement: {
    title: { en: 'Elopement Photographer, Portugal', pt: 'Fotógrafo de casamento íntimo' },
    description: {
      en: 'Five hours, 200 edited photographs and no schedule to defend. Locations scouted for the hour you are actually there. From €900, agreed in writing.',
      pt: 'Cinco horas, 200 fotografias editadas e nenhum horário a cumprir. Locais reconhecidos para a hora a que lá vai estar. Desde 900 €, acordado por escrito.',
    },
    heading: {
      en: 'What you gain by not having a schedule',
      pt: 'O que se ganha por não haver horário',
    },
    paragraphs: {
      en: [
        'An elopement is not a small wedding, it is a different shape of day. There is no receiving line, no seating plan and nobody waiting for you, which means the day can be arranged around where the light is rather than around when the caterer needs the room. That is worth more than it sounds: at a full wedding the photographer works in the gaps left by the schedule, and here there is no schedule to work around.',
        'In practice that buys two things. The first is location: with five hours and no guests to move, a session can start at a clifftop at sunrise and finish somewhere else entirely, and Portugal is small enough that both are within an hour’s drive. The second is weather. An elopement can move by a day. In the Azores that is not a convenience, it is the only sensible way to book — one caldera is usually clear when the other is not, and being able to choose the morning is the whole difference.',
      ],
      pt: [
        'Um casamento íntimo não é um casamento pequeno, é um dia com outra forma. Não há fila de cumprimentos, não há plano de mesas e não há ninguém à espera, o que quer dizer que o dia se organiza pela luz e não por quando o catering precisa da sala. Isso vale mais do que parece: num casamento completo o fotógrafo trabalha nos intervalos que o horário deixa, e aqui não há horário para contornar.',
        'Na prática, isso compra duas coisas. A primeira é o local: com cinco horas e sem convidados para mover, uma sessão pode começar numa arriba ao nascer do sol e acabar noutro sítio completamente diferente, e Portugal é pequeno o suficiente para que os dois fiquem a uma hora de carro. A segunda é o tempo. Um casamento íntimo pode mudar de dia. Nos Açores isso não é uma comodidade, é a única forma sensata de marcar — uma caldeira costuma estar limpa quando a outra não está, e poder escolher a manhã é toda a diferença.',
      ],
    },
  },

  'destination-wedding': {
    title: { en: 'Destination Wedding in Portugal', pt: 'Casamento de destino em Portugal' },
    description: {
      en: 'Twelve hours, 500 edited photographs, a scouting visit the day before — and a straight answer on the paperwork. Portugal sets no residency requirement.',
      pt: 'Doze horas, 500 fotografias editadas e uma visita de reconhecimento na véspera. Galeria privada em três semanas.',
    },
    heading: {
      en: 'The paperwork question nobody answers properly',
      pt: 'A questão dos documentos, respondida a sério',
    },
    paragraphs: {
      en: [
        'Most couples planning a wedding abroad are reading advice written for France or Italy, and it gives them the wrong answer for Portugal. France requires one of the couple to have been resident in the commune for thirty continuous days before the banns are published, which is why so many couples who wanted to marry there did not, and held a symbolic ceremony instead. Portugal sets no residency requirement for foreigners at all. A civil marriage is processed at a Conservatória do Registo Civil through the processo preliminar de casamento, and what it asks for is documents rather than time spent living here.',
        'That is the structural answer and it is stable. The procedural detail is not: the exact list depends on your nationality and typically involves apostilled birth certificates, certified translations and, for some countries, a certificate of legal capacity to marry. Confirm the current requirements with the conservatória you intend to use rather than with a blog post, including this one. What matters for planning is that you do not need to move here first, and that changes which country a destination wedding is actually easy in.',
      ],
      pt: [
        'Um casamento de destino é sobretudo um problema de coordenação, e a maior parte dele resolve-se na véspera. Doze horas de cobertura no próprio dia, mais uma visita de reconhecimento no dia anterior, que é quando se decide onde ficam os retratos e se descobre que o pátio que parecia perfeito nas fotografias está à sombra às cinco da tarde.',
        'Do ponto de vista legal, Portugal é invulgarmente simples para quem vem de fora: o processo preliminar de casamento corre numa Conservatória do Registo Civil e não há exigência de residência. O que é preciso são documentos — certidões apostiladas, traduções certificadas e, consoante a nacionalidade, um certificado de capacidade matrimonial. A lista exacta confirma-se com a conservatória, não com um artigo.',
      ],
    },
  },

  proposal: {
    title: { en: 'Proposal Photographer in Portugal', pt: 'Fotógrafo para pedido de casamento' },
    description: {
      en: 'The moment photographed from a distance, then thirty minutes together once the surprise is over. 35 edited photographs, gallery in 48h. From €250.',
      pt: 'O momento fotografado à distância, e depois trinta minutos juntos quando a surpresa passa. 35 fotografias editadas, galeria em 48 h. Desde 250 €.',
    },
    heading: {
      en: 'Agree the spot and the minute the day before',
      pt: 'Combine o sítio e o minuto na véspera',
    },
    paragraphs: {
      en: [
        'Every proposal session that goes wrong goes wrong the same way: the signal was agreed on the day. A hand in a pocket, a particular phrase, a glance towards the photographer — all of them fail, because at the moment it matters you will be thinking about something else entirely and the photographer will be two hundred metres away trying to read a gesture. A fixed spot and a fixed minute, agreed the day before, removes the problem completely.',
        'The rest is location and light. A viewpoint that is empty at seven in the morning has forty people on it by nine, and a proposal with an audience is a different photograph from the one you had in mind. Sunrise is the reliable answer in Lisbon and the Algarve; in the Douro and Madeira the constraint is the drive rather than the crowd. After the moment itself there are thirty minutes together, which is when the photographs of the two of you actually get made — the ones from the proposal are of a face reacting, and those are worth having but they are not a portrait.',
      ],
      pt: [
        'Todos os pedidos de casamento que correm mal correm mal da mesma maneira: o sinal foi combinado no próprio dia. Uma mão no bolso, uma frase, um olhar para o fotógrafo — falham todos, porque no momento que interessa vai estar a pensar noutra coisa e o fotógrafo está a duzentos metros a tentar ler um gesto. Um sítio fixo e um minuto fixo, combinados na véspera, eliminam o problema por completo.',
        'O resto é local e luz. Um miradouro que está vazio às sete da manhã tem quarenta pessoas às nove, e um pedido com plateia é uma fotografia diferente daquela que tinha em mente. O nascer do sol é a resposta fiável em Lisboa e no Algarve; no Douro e na Madeira a condicionante é a viagem e não a gente. Depois do momento ficam trinta minutos juntos, e é aí que se fazem de facto as fotografias dos dois — as do pedido são de uma cara a reagir, e valem a pena, mas não são um retrato.',
      ],
    },
  },

  couple: {
    title: { en: 'Couple Photo Session in Portugal', pt: 'Sessão de casal em Portugal' },
    description: {
      en: 'Ninety minutes on foot through one neighbourhood, at the hour the light is low. 40 edited photographs, two locations, gallery in 48–72h. From €190.',
      pt: 'Noventa minutos a pé por uma zona da cidade, à hora em que a luz é baixa. 40 fotografias editadas, dois locais, galeria em 48–72 h. Desde 190 €.',
    },
    heading: {
      en: 'The first fifteen minutes are not the session',
      pt: 'Os primeiros quinze minutos não são a sessão',
    },
    paragraphs: {
      en: [
        'Almost everyone says they are bad in front of a camera, and almost everyone is right for about fifteen minutes. That is the normal case rather than the exception, and the session is built around it: the first stretch is spent walking and talking rather than posing, and essentially nothing from it is kept. What comes after, once nobody is thinking about their hands any more, is the session. Booking ninety minutes rather than an hour is what makes that affordable.',
        'The other half is the route. Two locations on foot give two distinct backdrops without anyone getting into a car, and the walk between them produces the frames made in motion, which are frequently the truest of the set. Which two depends on the city and the hour: in Lisbon the miradouros are a morning proposition and the riverfront an evening one, and in Porto the light is on Ribeira only at the end of the day. Getting that the wrong way round is the most common way an hour here is wasted.',
      ],
      pt: [
        'Quase toda a gente diz que é má em frente à câmara, e quase toda a gente tem razão durante cerca de quinze minutos. É o caso normal e não a excepção, e a sessão constrói-se à volta disso: o primeiro bocado passa-se a andar e a conversar, não a posar, e praticamente nada dele fica. O que vem a seguir, quando já ninguém está a pensar nas mãos, é a sessão. Marcar noventa minutos em vez de uma hora é o que torna isso possível.',
        'A outra metade é o percurso. Dois locais a pé dão dois fundos distintos sem ninguém entrar num carro, e o caminho entre eles produz as fotografias feitas em movimento, muitas vezes as mais verdadeiras do conjunto. Quais são os dois depende da cidade e da hora: em Lisboa os miradouros são de manhã e a frente ribeirinha é ao fim da tarde, e no Porto a luz só está na Ribeira no fim do dia. Trocar as voltas a isto é a forma mais comum de desperdiçar uma hora.',
      ],
    },
  },
};
