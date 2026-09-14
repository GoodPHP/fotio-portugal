import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the portrait, couple and family services.
 *
 * Written against the catalogue figures — price, duration, photograph count,
 * deliverables — so a claim here can be checked against the card above it on
 * the page. Change one and change the other.
 */
export const PEOPLE_SERVICE_SEO: Record<string, ServiceSeo> = {
  portrait: {
    title: { en: 'Studio Portrait Session', pt: 'Retrato de estúdio' },
    description: {
      en: 'One hour in controlled light, two lighting set-ups and two backgrounds, 25 retouched photographs and a gallery in 48–72 hours. From €150, fixed.',
      pt: 'Uma hora em luz controlada, dois esquemas de luz e dois fundos, 25 fotografias retocadas e galeria em 48–72 horas. Desde 150 €, preço fixo.',
    },
    heading: { en: 'What to wear, and why it matters here', pt: 'O que vestir, e porque é que aqui importa' },
    paragraphs: {
      en: [
        'A studio portrait is the one session where the clothes do more work than the location, because there is no location — there is a background, a light and you. Bring two or three plain tops in solid mid-tones, plus whatever you actually wear to work rather than what you think a portrait calls for. Fine stripes and small checks interfere with the sensor and shimmer on screen, and no amount of retouching removes it afterwards.',
        'The session runs an hour, which is enough for two lighting set-ups and two backgrounds without anyone getting tired of their own face. The selection is made together at the end rather than sent as a contact sheet a week later: you see what there is while you still remember how each frame felt, which produces a better choice than looking at a hundred thumbnails on a Tuesday. Twenty-five retouched photographs, delivered to a private gallery within 48 to 72 hours.',
      ],
      pt: [
        'Um retrato de estúdio é a única sessão em que a roupa faz mais trabalho do que o sítio, porque não há sítio — há um fundo, uma luz e a pessoa. Leve duas ou três peças lisas em tons médios, mais aquilo que veste de facto para trabalhar em vez do que acha que um retrato exige. Riscas finas e xadrez pequeno interferem com o sensor e tremem no ecrã, e não há retoque que tire isso depois.',
        'A sessão dura uma hora, o que chega para dois esquemas de luz e dois fundos sem ninguém se cansar da própria cara. A selecção faz-se em conjunto no fim e não se envia uma folha de contactos uma semana depois: vê o que há enquanto ainda se lembra de como cada fotografia foi feita, e isso dá melhor escolha do que olhar para cem miniaturas numa terça-feira. Vinte e cinco fotografias retocadas, entregues numa galeria privada em 48 a 72 horas.',
      ],
    },
  },

  'lifestyle-portrait': {
    title: { en: 'Lifestyle Portrait Session', pt: 'Retrato lifestyle' },
    description: {
      en: 'The same portrait made outdoors and in motion: 75 minutes, two locations within walking distance, 30 retouched photographs. From €170, fixed.',
      pt: 'O mesmo retrato feito na rua e em movimento: 75 minutos, dois locais a distância de caminhada, 30 fotografias retocadas. Desde 170 €, preço fixo.',
    },
    heading: { en: 'Outdoors instead of against a background', pt: 'Na rua em vez de contra um fundo' },
    paragraphs: {
      en: [
        'This is the studio portrait with the studio removed. Instead of a background there is a street, instead of a lighting set-up there is the hour before sunset, and instead of standing still you are walking. It suits people whose work is not office work — a writer, a chef, a designer, anyone whose profile photograph should not look like it was taken against a grey wall in a business park.',
        'Seventy-five minutes covers two locations close enough to walk between, which is what keeps it a portrait session rather than a tour. The frames divide roughly in half: composed ones where you are placed and lit deliberately, and looser ones made while moving, which is where the photographs that do not look like photographs come from. Thirty retouched images, private gallery within 48 to 72 hours, and vertical and horizontal crops of anything you are likely to use as a profile.',
      ],
      pt: [
        'Isto é o retrato de estúdio sem o estúdio. Em vez de um fundo há uma rua, em vez de um esquema de luz há a hora antes do pôr do sol, e em vez de estar parado anda-se. Serve para quem não tem um trabalho de escritório — quem escreve, quem cozinha, quem desenha, qualquer pessoa cuja fotografia de perfil não devia parecer feita contra uma parede cinzenta num parque empresarial.',
        'Setenta e cinco minutos dão para dois locais suficientemente perto para se ir a pé, e é isso que a mantém uma sessão de retrato e não um passeio. As imagens dividem-se mais ou menos a meio: umas compostas, com a pessoa colocada e iluminada de propósito, e outras mais soltas, feitas em movimento, que é de onde vêm as fotografias que não parecem fotografias. Trinta imagens retocadas, galeria privada em 48 a 72 horas.',
      ],
    },
  },

  family: {
    title: { en: 'Family Photo Session', pt: 'Fotografia de família' },
    description: {
      en: 'Outdoors, at the children’s pace: 75 minutes, one location, 40 retouched photographs and a gallery in 48–72 hours. From €200, agreed beforehand.',
      pt: 'Ao ar livre, ao ritmo das crianças: 75 minutos, um local, 40 fotografias retocadas e galeria em 48–72 horas. Desde 200 €, acordado antes.',
    },
    heading: { en: 'Book the mood, not the light', pt: 'Marque pela disposição, não pela luz' },
    paragraphs: {
      en: [
        'With small children the usual advice about golden hour is wrong. Late afternoon has the better light and the worse mood, and the mood wins every time: a session at six in the evening with a tired three-year-old produces forty photographs of a tired three-year-old. Early morning, before the nap and before the heat, is less flattering on paper and far better in practice. This is the one service where the schedule is set by the youngest person present.',
        'Seventy-five minutes at one location, without moving, is the other half of it. Children need about twenty minutes to stop performing, and a session that spends that time walking between locations never gets past the performance. One place, no rush, and enough frames that the good ones are not an accident — forty retouched photographs, delivered privately within 48 to 72 hours, and the session is rescheduled at no cost if the weather turns.',
      ],
      pt: [
        'Com crianças pequenas, o conselho habitual sobre a hora dourada está errado. O fim da tarde tem melhor luz e pior disposição, e a disposição ganha sempre: uma sessão às seis da tarde com uma criança de três anos cansada dá quarenta fotografias de uma criança de três anos cansada. De manhã cedo, antes da sesta e antes do calor, é menos bonito no papel e muito melhor na prática. É o único serviço em que o horário é decidido pela pessoa mais nova.',
        'Setenta e cinco minutos num só local, sem mudar, é a outra metade. As crianças precisam de uns vinte minutos para deixarem de representar, e uma sessão que gasta esse tempo a andar entre sítios nunca passa da representação. Um sítio, sem pressa, e fotografias suficientes para que as boas não sejam um acaso — quarenta imagens retocadas, entregues em privado em 48 a 72 horas, e a sessão remarca-se sem custo se o tempo mudar.',
      ],
    },
  },

  maternity: {
    title: { en: 'Maternity Photo Session', pt: 'Sessão de gravidez' },
    description: {
      en: 'Booked between 30 and 36 weeks, which is when it photographs best and is still comfortable. 75 minutes, 30 retouched photographs. From €190.',
      pt: 'Marcada entre as 30 e as 36 semanas, quando fotografa melhor e ainda é confortável. 75 minutos, 30 fotografias retocadas. Desde 190 €.',
    },
    heading: { en: 'Why thirty to thirty-six weeks', pt: 'Porquê entre as 30 e as 36 semanas' },
    paragraphs: {
      en: [
        'The window is not arbitrary. Before about thirty weeks the shape that the session exists to photograph is not yet unambiguous in a photograph, and after thirty-six standing for seventy-five minutes stops being comfortable — and discomfort is visible in a way that no editing removes. Between the two there is a six-week window that is both, and booking inside it is the whole of the planning.',
        'Beyond that it is an ordinary portrait session with one adjustment: it is shorter in practice than on paper, because the useful part happens in bursts with sitting down in between. Outdoors or at home both work, and home is often better in the later weeks for exactly that reason. Thirty retouched photographs and a private gallery within 48 to 72 hours. If the session has to move at short notice, it moves at no cost, which at this stage of a pregnancy is not a courtesy but a requirement.',
      ],
      pt: [
        'A janela não é arbitrária. Antes das trinta semanas a forma que a sessão existe para fotografar ainda não é inequívoca numa fotografia, e depois das trinta e seis estar de pé setenta e cinco minutos deixa de ser confortável — e o desconforto vê-se de uma maneira que nenhuma edição tira. Entre as duas há uma janela de seis semanas que é as duas coisas, e marcar dentro dela é todo o planeamento.',
        'Fora isso é uma sessão de retrato normal com um ajuste: na prática é mais curta do que no papel, porque a parte útil acontece aos bocados com pausas sentada pelo meio. Ao ar livre ou em casa funcionam as duas, e em casa costuma ser melhor nas últimas semanas exactamente por isso. Trinta fotografias retocadas e galeria privada em 48 a 72 horas. Se a sessão tiver de mudar em cima da hora, muda sem custo, o que nesta fase não é cortesia, é requisito.',
      ],
    },
  },

  newborn: {
    title: { en: 'Newborn Photo Session', pt: 'Sessão de recém-nascido' },
    description: {
      en: 'At home, in the first fortnight, working around feeds rather than against them. Two hours booked so nothing is hurried. 30 photographs. From €220.',
      pt: 'Em casa, nas primeiras duas semanas, à volta das mamadas e não contra elas. Duas horas marcadas para nada ser à pressa. 30 fotografias. Desde 220 €.',
    },
    heading: { en: 'Two hours for thirty photographs', pt: 'Duas horas para trinta fotografias' },
    paragraphs: {
      en: [
        'Two hours is booked and thirty photographs are delivered, and the ratio is the point. A newborn session is mostly waiting: for a feed to finish, for a nappy, for the ten minutes of deep sleep that the whole thing depends on. A session booked for an hour is a session that runs out of time at the moment it becomes possible, and every photograph in it looks like it was taken in a hurry, because it was.',
        'It happens at home rather than in a studio, in whichever room has the best window, and it happens in the first two weeks — after that the curled-up posture the session exists to photograph has gone. Natural light only, no props that require handling the baby into position, and the parents in a reasonable number of the frames, because in ten years those are the ones that matter. Thirty retouched photographs, private gallery within 72 hours.',
      ],
      pt: [
        'Marcam-se duas horas e entregam-se trinta fotografias, e a proporção é o ponto. Uma sessão de recém-nascido é sobretudo espera: que acabe a mamada, que se mude a fralda, que chegue o bocado de sono profundo de que tudo depende. Uma sessão marcada para uma hora é uma sessão que fica sem tempo no momento em que se torna possível, e todas as fotografias ficam com ar de terem sido feitas à pressa, porque foram.',
        'Faz-se em casa e não em estúdio, na divisão que tiver a melhor janela, e faz-se nas primeiras duas semanas — depois disso a postura enrolada que a sessão existe para fotografar já passou. Só luz natural, nada de adereços que obriguem a manipular o bebé, e os pais num número razoável das imagens, porque daqui a dez anos são essas que interessam. Trinta fotografias retocadas, galeria privada em 72 horas.',
      ],
    },
  },

  batizado: {
    title: { en: 'Christening Photographer', pt: 'Fotógrafo de batizado' },
    description: {
      en: 'Church ceremony and the meal that follows: four hours, 120 retouched photographs, and the parish asked in advance about what may be photographed.',
      pt: 'Cerimónia na igreja e o copo-d’água: quatro horas, 120 fotografias retocadas, e a paróquia consultada antes sobre o que pode ser fotografado.',
    },
    heading: { en: 'Ask the parish first', pt: 'Pergunte primeiro à paróquia' },
    paragraphs: {
      en: [
        'There is no national rule about photography inside a Portuguese church, which is exactly why it has to be asked. Each parish sets its own: some ask the photographer to stay behind a line during the rite itself, some prohibit flash entirely, some allow neither and some allow both. None of that is a problem when it is known the week before — it changes where we stand and what lens is on the camera — and all of it is a problem when it is discovered at the font.',
        'Four hours covers the ceremony and the meal that follows, which in Portugal runs longer than anyone plans for. The useful photographs divide between the rite, which is formal and has a fixed geometry, and the copo-d’água afterwards, which does not and is where the family photographs actually happen. A hundred and twenty retouched images, delivered to a private gallery within a week.',
      ],
      pt: [
        'Não há regra nacional sobre fotografia dentro de uma igreja em Portugal, e é precisamente por isso que se tem de perguntar. Cada paróquia define a sua: há quem peça que o fotógrafo fique atrás de uma linha durante o rito, há quem proíba flash, há quem não permita nenhuma das duas coisas e há quem permita as duas. Nada disso é problema quando se sabe na semana anterior — muda onde nos colocamos e que objectiva está na câmara — e tudo isso é problema quando se descobre junto à pia.',
        'Quatro horas cobrem a cerimónia e o copo-d’água, que em Portugal se prolonga sempre mais do que o previsto. As fotografias úteis dividem-se entre o rito, que é formal e tem uma geometria fixa, e o almoço a seguir, que não tem e é onde as fotografias de família acontecem de facto. Cento e vinte imagens retocadas, entregues numa galeria privada no prazo de uma semana.',
      ],
    },
  },

  finalistas: {
    title: { en: 'Graduation Photographer, Coimbra', pt: 'Fotógrafo de finalistas' },
    description: {
      en: 'Capa e batina, in the city the tradition belongs to. Ninety minutes, individual and group frames, 40 retouched photographs. From €160, fixed.',
      pt: 'Capa e batina, na cidade a que a tradição pertence. Noventa minutos, individual e de grupo, 40 fotografias retocadas. Desde 160 €, preço fixo.',
    },
    heading: { en: 'Book before May, or book October', pt: 'Marque antes de Maio, ou marque Outubro' },
    paragraphs: {
      en: [
        'The Queima das Fitas week in May is when everyone wants the same two hours of light, and it is booked out months in advance. That is not a sales line, it is arithmetic: a whole cohort finishes at once, the traditional locations are two staircases and a terrace, and there is one good hour at the end of each day. Booking in February for May is normal. Booking in April is optimistic.',
        'The Latada, at the start of the academic year in October, is the same tradition with a quarter of the pressure and it is genuinely easier — same capa e batina, same faculty ribbons, same locations, and a choice of times. Ninety minutes covers individual portraits and the group frames, which need a stairway wide enough that nobody at the back is hidden. Forty retouched photographs, private gallery within 72 hours. Black capes against granite need shade rather than sun, which is why the morning locations are not a compromise.',
      ],
      pt: [
        'A semana da Queima das Fitas, em Maio, é quando toda a gente quer as mesmas duas horas de luz, e esgota com meses de antecedência. Não é conversa de vendas, é aritmética: um curso inteiro acaba ao mesmo tempo, os locais tradicionais são duas escadarias e um terraço, e há uma boa hora no fim de cada dia. Marcar em Fevereiro para Maio é o normal. Marcar em Abril é optimismo.',
        'A Latada, no início do ano lectivo em Outubro, é a mesma tradição com um quarto da pressão e é genuinamente mais fácil — a mesma capa e batina, as mesmas fitas, os mesmos locais, e horas à escolha. Noventa minutos cobrem os retratos individuais e as fotografias de grupo, que precisam de uma escadaria larga o suficiente para não esconder ninguém atrás. Quarenta imagens retocadas, galeria privada em 72 horas. Capas pretas contra granito pedem sombra e não sol, e é por isso que os locais de manhã não são um compromisso.',
      ],
    },
  },
};
