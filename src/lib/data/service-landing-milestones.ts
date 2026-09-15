import type { ServiceLanding } from './service-landing';

/**
 * Conversion sections for the sessions booked around a life event: a pregnancy,
 * a birth, a christening, a graduation. Split from `service-landing-people.ts`,
 * which keeps the portrait and family sessions. See `service-landing.ts` for
 * what each block is for; figures are the catalogue's.
 */
export const MILESTONE_SERVICE_LANDING: Record<string, ServiceLanding> = {
  maternity: {
    promise: {
      en: 'Photographs of this pregnancy, made in the weeks it shows best, at a pace that allows for sitting down — and moved at no cost if the date has to change.',
      pt: 'Fotografias desta gravidez, nas semanas em que melhor se vê, a um ritmo com pausas para sentar — e remarcadas sem custo se a data tiver de mudar.',
    },
    audience: {
      en: [
        {
          title: 'Anyone who has avoided the camera all pregnancy',
          text: 'Plenty of people reach thirty weeks with no photograph of themselves from the whole pregnancy except a mirror selfie. One session inside the right window is enough to put that right.',
        },
        {
          title: 'Couples expecting their first child',
          text: 'The last weeks as two people. If your partner wants to be in part of the session, say so when booking; being photographed together is often easier than being photographed alone.',
        },
        {
          title: 'Anyone who would rather not leave the house',
          text: 'In the last weeks, getting to a location is the tiring part. The session can happen at home, by the best window with a sofa a step away, and it is the same thirty photographs.',
        },
      ],
      pt: [
        {
          title: 'Quem fugiu da câmara a gravidez toda',
          text: 'Muita gente chega às trinta semanas sem uma única fotografia da gravidez além de uma selfie ao espelho. Uma sessão dentro da janela certa chega para resolver isso.',
        },
        {
          title: 'Casais à espera do primeiro filho',
          text: 'As últimas semanas a dois. Se o companheiro ou a companheira quiser aparecer em parte da sessão, diga-o ao reservar; ser fotografado a dois é muitas vezes mais fácil do que sozinho.',
        },
        {
          title: 'Quem prefere não sair de casa',
          text: 'Nas últimas semanas, o que cansa é chegar ao local. A sessão pode ser em casa, junto à melhor janela e com o sofá a um passo, e são as mesmas trinta fotografias.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Write before thirty weeks',
          text: 'Send your due date, your city and whether you lean towards outdoors or home. Writing a few weeks ahead leaves room for a date well inside the thirty-to-thirty-six-week window rather than at its edge.',
        },
        {
          title: 'Date, photographer and place confirmed',
          text: 'Usually the same working day. If you need to move it later at short notice — a bad night, a check-up, swollen ankles — it moves at no cost.',
        },
        {
          title: 'Seventy-five minutes, in bursts',
          text: 'Ten or fifteen minutes of photographs, then a chair and some water. Standing frames come first while you are fresh; seated frames and close-ups come later, once standing has stopped being a pleasure.',
        },
        {
          title: 'Thirty photographs in 48–72 hours',
          text: 'Retouched and delivered to a private gallery within 48 to 72 hours, so they are with you weeks before the birth rather than one more thing to chase afterwards.',
        },
      ],
      pt: [
        {
          title: 'Escreva antes das trinta semanas',
          text: 'Envie a data prevista do parto, a cidade e se prefere ao ar livre ou em casa. Escrever com algumas semanas de avanço dá margem para uma data bem dentro da janela das 30 às 36 semanas, e não no limite.',
        },
        {
          title: 'Data, fotógrafo e local confirmados',
          text: 'Normalmente no mesmo dia útil. Se depois precisar de mudar em cima da hora — uma noite má, uma consulta, os pés inchados — muda sem custo.',
        },
        {
          title: 'Setenta e cinco minutos, aos bocados',
          text: 'Dez ou quinze minutos de fotografias, depois uma cadeira e água. As fotografias de pé fazem-se primeiro, com energia; as sentadas e os planos próximos ficam para quando estar de pé já não apetece.',
        },
        {
          title: 'Trinta fotografias em 48–72 horas',
          text: 'Retocadas e entregues numa galeria privada em 48 a 72 horas, ou seja, semanas antes do parto e não mais uma coisa para tratar depois.',
        },
      ],
    },
    prepare: {
      en: [
        'Bring one fitted outfit that follows the bump and one looser one; a loose dress on its own hides what the session is for.',
        'Choose plain fabrics in solid colours; large prints compete with the shape.',
        'Wear flat shoes to get there. If you want heels in some frames, bring them and put them on only for those.',
        'At home, clear one corner by the largest window. The rest of the house does not need to be tidy.',
        'Eat before the session and keep water and a snack within reach throughout.',
        'If your fingers are swelling, take rings off the night before; the marks they leave show in close-ups of hands.',
      ],
      pt: [
        'Leve uma peça justa que acompanhe a barriga e outra mais larga; um vestido largo sozinho esconde aquilo que a sessão existe para fotografar.',
        'Prefira tecidos lisos em cores sólidas; padrões grandes competem com a forma.',
        'Vá de sapatos rasos. Se quiser saltos em algumas fotografias, leve-os e calce-os só para essas.',
        'Em casa, arrume um canto junto à janela maior. O resto da casa não precisa de estar arrumado.',
        'Coma antes da sessão e tenha água e alguma coisa para petiscar sempre à mão.',
        'Se os dedos estiverem a inchar, tire os anéis na véspera; as marcas vêem-se nos planos próximos das mãos.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'I do not feel good about how I look right now. Is this a bad idea?',
          pt: 'Não me sinto bem com o meu aspecto neste momento. É má ideia?',
        },
        answer: {
          en: 'Many people feel exactly that at thirty-something weeks, and it is a reason to have direction rather than a reason to skip the session. The photographer chooses the angles and tells you where to put your weight and your hands, so you are never left to improvise a pose you do not trust.',
          pt: 'Muita gente sente exactamente isso às trinta e tal semanas, e é uma razão para ter orientação, não para desistir da sessão. O fotógrafo escolhe os ângulos e diz-lhe onde apoiar o peso e as mãos, para nunca ter de inventar uma pose em que não confia.',
        },
      },
      {
        question: {
          en: 'Outdoors or at home — which is better?',
          pt: 'Ao ar livre ou em casa — o que é melhor?',
        },
        answer: {
          en: 'Outdoors gives more variety of background and suits the earlier part of the window, while walking is still easy. Home is calmer and warmer, with a sofa within reach, which counts for more in the last weeks. Both come to the same thirty photographs.',
          pt: 'Ao ar livre há mais variedade de fundos, e resulta melhor no início da janela, enquanto andar ainda é fácil. Em casa é mais calmo e mais quente, com o sofá à mão, o que conta mais nas últimas semanas. Nos dois casos são as mesmas trinta fotografias.',
        },
      },
      {
        question: {
          en: 'Is it all right to do this at thirty-six weeks?',
          pt: 'Não há problema em fazer a sessão às 36 semanas?',
        },
        answer: {
          en: 'The session asks nothing more physical than standing, walking a little and sitting down, with breaks whenever you want them. If your doctor has told you to rest, follow that and move the date; moving it costs nothing.',
          pt: 'A sessão não pede mais esforço do que estar de pé, andar um pouco e sentar-se, com pausas sempre que quiser. Se o seu médico lhe recomendou repouso, siga isso e mude a data; mudar não custa nada.',
        },
      },
      {
        question: {
          en: 'How revealing do the photographs have to be?',
          pt: 'As fotografias têm de mostrar a barriga descoberta?',
        },
        answer: {
          en: 'As revealing as you decide, and no more. A fitted dress or a T-shirt pulled close over the bump shows the shape clearly. A bare-bump frame is something you can ask for, not something you will be asked about.',
          pt: 'Só se quiser. Um vestido justo ou uma t-shirt ajustada à barriga mostram a forma com toda a clareza. Uma fotografia com a barriga à mostra é algo que pode pedir, não algo que lhe vão perguntar.',
        },
      },
    ],
  },

  newborn: {
    promise: {
      en: 'Your baby’s first two weeks, photographed at home in window light at the baby’s pace — nobody moved into a pose, nothing hurried through a feed.',
      pt: 'As duas primeiras semanas do bebé, fotografadas em casa com luz de janela e ao ritmo dele — sem poses forçadas e sem pressa a meio de uma mamada.',
    },
    audience: {
      en: [
        {
          title: 'Parents who do not want a studio shoot',
          text: 'No car seat, no drive across town in the first week, no props and no baby arranged in a basket. The photographs are of your baby in your home, in the blankets and clothes you already have.',
        },
        {
          title: 'Parents still recovering from the birth',
          text: 'Two hours at home means you can stay on the sofa, stop to feed and step out of frame whenever you need to. Nobody has to be dressed for a photograph until they decide to be.',
        },
        {
          title: 'Families with an older child meeting the baby',
          text: 'A sibling’s first days with the baby are over quickly. The older child is best photographed early in the session, while their patience lasts, and can then go back to their own day.',
        },
      ],
      pt: [
        {
          title: 'Pais que não querem uma sessão em estúdio',
          text: 'Sem cadeirinha no carro, sem atravessar a cidade na primeira semana, sem adereços e sem bebé arrumado dentro de um cesto. As fotografias são do seu bebé na sua casa, com as mantas e a roupa que já tem.',
        },
        {
          title: 'Pais que ainda estão a recuperar do parto',
          text: 'Duas horas em casa querem dizer que pode ficar no sofá, parar para dar de mamar e sair do enquadramento sempre que precisar. Ninguém tem de estar arranjado para uma fotografia antes de decidir que quer estar.',
        },
        {
          title: 'Famílias em que um irmão mais velho conhece o bebé',
          text: 'Os primeiros dias de um irmão com o bebé passam depressa. O mais velho fotografa-se melhor no início da sessão, enquanto a paciência dura, e depois pode voltar à sua vida.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Get in touch with the due date',
          text: 'Babies do not keep appointments, so tell us the due date and your city when you write. The day itself is set once the baby has arrived, inside the first two weeks.',
        },
        {
          title: 'Two hours booked, photographer confirmed',
          text: 'Confirmation usually comes the same working day. Two hours is booked on purpose, so a long feed or a nappy change in the middle does not eat into the photographs.',
        },
        {
          title: 'At home, around the baby',
          text: 'The photographer finds the room with the best window and then waits — for a feed to end, for sleep to deepen. No flash, no props, and no posing that requires handling the baby into position; if the baby needs moving, a parent does it.',
        },
        {
          title: 'Thirty photographs within 72 hours',
          text: 'Retouched and delivered to a private gallery within 72 hours, while your baby still looks the way they do in the photographs.',
        },
      ],
      pt: [
        {
          title: 'Escreva com a data prevista do parto',
          text: 'Os bebés não cumprem marcações, por isso diga-nos a data prevista e a cidade quando escrever. O dia em si fixa-se depois de o bebé nascer, dentro das duas primeiras semanas.',
        },
        {
          title: 'Duas horas marcadas, fotógrafo confirmado',
          text: 'A confirmação chega normalmente no mesmo dia útil. As duas horas são de propósito, para uma mamada longa ou uma muda de fralda a meio não roubarem tempo às fotografias.',
        },
        {
          title: 'Em casa, ao ritmo do bebé',
          text: 'O fotógrafo procura a divisão com a melhor janela e depois espera — que a mamada acabe, que o sono fique profundo. Sem flash, sem adereços e sem poses que obriguem a manipular o bebé; se for preciso mudá-lo de sítio, é um dos pais que o faz.',
        },
        {
          title: 'Trinta fotografias em 72 horas',
          text: 'Retocadas e entregues numa galeria privada em 72 horas, enquanto o bebé ainda está igual ao das fotografias.',
        },
      ],
    },
    prepare: {
      en: [
        'Choose the room with the largest window and clear the space in front of it; the rest of the house can stay as it is.',
        'Turn the heating up a little before the photographer arrives — a warm baby sleeps, a cold one wakes.',
        'Time a feed to end shortly after the session starts, so the first stretch is a sleepy one.',
        'Dress the baby in plain, soft clothes without big prints or slogans.',
        'Parents: plain tops in soft tones, and something you can feed in.',
        'Switch off ceiling lights and lamps; mixed with daylight they turn skin yellow on one side.',
      ],
      pt: [
        'Escolha a divisão com a janela maior e liberte o espaço à frente dela; o resto da casa pode ficar como está.',
        'Suba um pouco o aquecimento antes de o fotógrafo chegar — bebé quente dorme, bebé com frio acorda.',
        'Faça com que uma mamada acabe pouco depois do início da sessão, para a primeira parte ser de sono.',
        'Vista o bebé com roupa lisa e macia, sem padrões grandes nem frases.',
        'Pais: peças lisas em tons suaves, e algo com que se possa dar de mamar à vontade.',
        'Apague as luzes do tecto e os candeeiros; misturadas com a luz do dia deixam a pele amarelada de um lado.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Is a session like this safe for a baby this small?',
          pt: 'Uma sessão destas é segura para um bebé tão pequeno?',
        },
        answer: {
          en: 'Our photographers are not medical professionals, and the session asks for nothing that would need one. There is no flash, no props and no posing that requires handling the baby into position. The baby stays wherever it is comfortable — in your arms, in the cot, on a blanket — and a parent does any picking up.',
          pt: 'Os nossos fotógrafos não são profissionais de saúde, e a sessão não pede nada que exigisse um. Não há flash, não há adereços e não há poses que obriguem a manipular o bebé. O bebé fica onde está confortável — ao colo, no berço, numa manta — e é um dos pais que lhe pega quando é preciso.',
        },
      },
      {
        question: {
          en: 'Our baby is already older than two weeks. Is it too late?',
          pt: 'O nosso bebé já tem mais de duas semanas. É tarde?',
        },
        answer: {
          en: 'Tell us the age when you get in touch. The session still works, but it becomes a different set of photographs: a baby who is more awake and stretched out rather than curled up and asleep.',
          pt: 'Diga-nos a idade quando escrever. A sessão continua a fazer sentido, mas passa a ser outro conjunto de fotografias: um bebé mais acordado e esticado, em vez de enrolado e a dormir.',
        },
      },
      {
        question: {
          en: 'What if the baby will not settle?',
          pt: 'E se o bebé não sossegar?',
        },
        answer: {
          en: 'Then the session waits; that is what the second hour is for. A long feed, a nappy change, ten minutes of walking up and down the corridor. Awake, frowning and yawning frames are part of the thirty, not failures.',
          pt: 'Então a sessão espera; é para isso que serve a segunda hora. Uma mamada longa, uma muda de fralda, dez minutos a andar no corredor para trás e para a frente. Fotografias acordado, de sobrolho franzido ou a bocejar fazem parte das trinta, não são falhas.',
        },
      },
      {
        question: {
          en: 'I had a caesarean. Do I need to be up and about?',
          pt: 'Fiz cesariana. Tenho de andar de pé?',
        },
        answer: {
          en: 'No. Everything can be done with you sitting or lying down, and you decide when, or whether, you appear in the frame. Nothing asks you to stand for long, bend or lift.',
          pt: 'Não. Tudo se faz consigo sentada ou deitada, e é a si que cabe decidir quando aparece no enquadramento, ou se aparece. Nada lhe pede para estar muito tempo de pé, dobrar-se ou pegar em pesos.',
        },
      },
      {
        question: {
          en: 'Do we need to buy anything — backdrops, outfits, props?',
          pt: 'Temos de comprar alguma coisa — fundos, roupas, adereços?',
        },
        answer: {
          en: 'No. The photographs are of your home as it is: your bed, your blanket, the light from your window. Buying props for the session is the one piece of preparation worth skipping.',
          pt: 'Não. As fotografias são da sua casa como ela é: a sua cama, a sua manta, a luz da sua janela. Comprar adereços para a sessão é a única preparação que não vale a pena.',
        },
      },
    ],
  },

  batizado: {
    promise: {
      en: 'The christening from the church door to the meal afterwards, with the parish asked in advance and 120 retouched photographs in a private gallery within a week.',
      pt: 'O batizado da porta da igreja ao copo-d’água, com a paróquia consultada antes e 120 fotografias retocadas numa galeria privada no prazo de uma semana.',
    },
    audience: {
      en: [
        {
          title: 'Parents who do not want to spend the day holding a phone',
          text: 'At a christening the parents are the first to end up with no photographs: they are holding the baby, greeting the family and dealing with the restaurant. Four hours with someone doing only that lets them be at their own occasion.',
        },
        {
          title: 'Families who are together once a year',
          text: 'Grandparents, great-grandparents, cousins who live abroad. When the christening is set for August because that is when everyone is home, the group photograph at the church door ends up on the wall of three different houses.',
        },
        {
          title: 'Godparents looking for the gift',
          text: 'Giving the coverage hands the family something they would not buy for themselves — and includes, in passing, the photographs of the godparents with their godchild.',
        },
      ],
      pt: [
        {
          title: 'Pais que não querem passar o dia de telemóvel na mão',
          text: 'Num batizado, os pais são os primeiros a ficar sem fotografias: estão a segurar o bebé, a receber a família e a tratar do restaurante. Quatro horas com alguém dedicado só a isso deixam-nos estar no próprio dia.',
        },
        {
          title: 'Famílias que só se juntam uma vez por ano',
          text: 'Avós, bisavós, primos que vivem lá fora. Quando o batizado se marca para Agosto porque é quando estão todos cá, a fotografia de grupo à porta da igreja acaba na parede de três casas diferentes.',
        },
        {
          title: 'Padrinhos à procura do presente',
          text: 'Oferecer a reportagem é dar à família algo que ela não compraria para si — e que inclui, de passagem, as fotografias dos padrinhos com o afilhado.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send the church, the time and the restaurant',
          text: 'The date, the parish, the time of the ceremony and where the meal is. From that it is clear straight away where the four hours should start so they reach from the church to the part of the meal that matters.',
        },
        {
          title: 'We speak to the parish',
          text: 'We confirm the photographer, usually the same working day, and ask the parish what it allows and where we may stand. You have the answer before the day, so nothing is negotiated at the font.',
        },
        {
          title: 'On the day: arrival, rite, churchyard, table',
          text: 'The family arriving before the ceremony, the rite within the parish’s rules, the groups outside afterwards while everyone is still together, then the meal, where the family stops posing.',
        },
        {
          title: '120 photographs within a week',
          text: 'A hundred and twenty retouched photographs, from the church to the meal, delivered to a private gallery within a week.',
        },
      ],
      pt: [
        {
          title: 'Envie igreja, hora e restaurante',
          text: 'A data, a paróquia, a hora da cerimónia e o sítio do almoço. Com isso vê-se logo onde as quatro horas devem começar para chegarem da igreja ao essencial do copo-d’água.',
        },
        {
          title: 'Falamos com a paróquia',
          text: 'Confirmamos o fotógrafo, normalmente no mesmo dia útil, e perguntamos à paróquia o que permite e onde nos podemos colocar. A resposta chega-lhe antes do dia, para não haver conversas junto à pia.',
        },
        {
          title: 'No dia: chegada, rito, adro, mesa',
          text: 'A família a chegar à igreja antes da cerimónia, o rito dentro das regras da paróquia, os grupos no adro à saída enquanto ainda estão todos juntos, e depois o copo-d’água, onde a família deixa de posar.',
        },
        {
          title: '120 fotografias no prazo de uma semana',
          text: 'Cento e vinte fotografias retocadas, da igreja ao almoço, entregues numa galeria privada no prazo de uma semana.',
        },
      ],
    },
    prepare: {
      en: [
        'Make a short list of the groups that cannot be missed — parents, godparents, grandparents, great-grandparents — and give it to the photographer before the ceremony.',
        'Pick one relative who knows everyone to call people into the groups; the photographer does not know which uncle is missing.',
        'Agree the time of the cake and the toasts with the restaurant so they fall inside the four hours.',
        'Hand the candle and the white garment to the godparents before going in; they are used during the rite and nobody should be searching for them then.',
        'If there are great-grandparents or anyone who tires quickly, take the group photograph with them as soon as you arrive.',
      ],
      pt: [
        'Faça uma lista curta dos grupos que não podem faltar — pais, padrinhos, avós, bisavós — e entregue-a ao fotógrafo antes da cerimónia.',
        'Escolha um familiar que conheça toda a gente para chamar as pessoas para os grupos; o fotógrafo não sabe quem é o tio que falta.',
        'Combine com o restaurante a hora do bolo e dos brindes, para caírem dentro das quatro horas.',
        'Deixe a vela e a veste branca com os padrinhos antes de entrar; são entregues durante o rito e ninguém as deve andar a procurar nessa altura.',
        'Se houver bisavós ou alguém que se canse depressa, faça a fotografia de grupo com eles logo à chegada.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Other babies are being christened at the same ceremony. Will the other families be in the photographs?',
          pt: 'Há outros batizados na mesma cerimónia. As outras famílias vão aparecer?',
        },
        answer: {
          en: 'In wide shots of the church, unavoidably. The frames that matter — the baby at the font, the parents, the godparents — are composed around your family, and the group photographs are taken separately outside.',
          pt: 'Nos planos gerais da igreja, é inevitável. Os planos que interessam — o bebé na pia, os pais, os padrinhos — enquadram-se na sua família, e as fotografias de grupo fazem-se à parte, no adro.',
        },
      },
      {
        question: {
          en: 'Do we have to get permission from the priest ourselves?',
          pt: 'Temos de ser nós a pedir autorização ao padre?',
        },
        answer: {
          en: 'No, we speak to the parish before the day. All we need is which church it is and, if you have it, the priest’s name or a contact for the parish office.',
          pt: 'Não, falamos nós com a paróquia antes do dia. Só precisamos de saber qual é a igreja e, se o souber, o nome do pároco ou um contacto do cartório paroquial.',
        },
      },
      {
        question: {
          en: 'What if the baby cries during the ceremony?',
          pt: 'E se o bebé chorar durante a cerimónia?',
        },
        answer: {
          en: 'Many do, usually when the water touches them. Nothing is stopped or repeated, and that photograph is rarely one the family wants to hide.',
          pt: 'Muitos choram, quase sempre quando a água toca. Não se pára nem se repete nada, e essa fotografia raramente é uma que a família queira esconder.',
        },
      },
      {
        question: {
          en: 'Do four hours cover the whole meal?',
          pt: 'As quatro horas chegam para o almoço todo?',
        },
        answer: {
          en: 'They cover what matters: arriving at the restaurant, the tables, the cake and the toasts. A christening lunch can run into the evening; what gets agreed beforehand is that the cake is not left until after the four hours are up.',
          pt: 'Chegam para o essencial: a chegada ao restaurante, os grupos à mesa, o bolo e os brindes. Um copo-d’água pode ir até ao fim da tarde; o que se combina antes é que o bolo não fique para depois de as quatro horas acabarem.',
        },
      },
      {
        question: {
          en: 'The church and the restaurant are far apart. Does that matter?',
          pt: 'A igreja e o restaurante ficam longe um do outro. Faz diferença?',
        },
        answer: {
          en: 'The photographer travels from church to restaurant like the guests, and that journey is part of the four hours. If it is a long one, say so when booking so the start of the four hours can be placed accordingly.',
          pt: 'O fotógrafo segue da igreja para o restaurante como os convidados, e esse caminho faz parte das quatro horas. Se a distância for grande, diga-o ao reservar, para se decidir onde as quatro horas começam.',
        },
      },
    ],
  },

  finalistas: {
    promise: {
      en: 'Capa e batina photographed at the hour black cloth still shows texture, with individual and group portraits in the same ninety minutes, before the year disperses.',
      pt: 'Capa e batina fotografadas à hora em que o preto ainda tem textura, com retratos individuais e de grupo na mesma hora e meia, antes de o curso se dispersar.',
    },
    audience: {
      en: [
        {
          title: 'Graduates who want a photograph of themselves, not just the year',
          text: 'The class photograph is a row of faces. This session gives each person portraits of their own, in the cape and the faculty ribbons, before the batina goes into the wardrobe.',
        },
        {
          title: 'Groups of friends from the same course',
          text: 'The same years, the same stairs, the same people. A group session is split between frames of everyone and portraits of each person, all in the same gallery.',
        },
        {
          title: 'Parents and grandparents giving it as a present',
          text: 'They do not need to be there. The photographs arrive in a private gallery within 72 hours, in time for the best one to be framed while the celebrations are still going on.',
        },
      ],
      pt: [
        {
          title: 'Finalistas que querem uma fotografia sua, não só do curso',
          text: 'A fotografia de curso é uma fila de caras. Esta sessão dá a cada pessoa retratos próprios, com a capa e as fitas da faculdade, antes de a batina ir para o armário.',
        },
        {
          title: 'Grupos de amigos do mesmo curso',
          text: 'Os mesmos anos, as mesmas escadas, as mesmas pessoas. Uma sessão de grupo reparte-se entre planos com todos e retratos de cada um, e fica tudo na mesma galeria.',
        },
        {
          title: 'Pais e avós que querem oferecer a sessão',
          text: 'Não precisam de estar presentes. As fotografias chegam numa galeria privada em 72 horas, a tempo de a melhor ir para a moldura enquanto a festa ainda dura.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us how many and when',
          text: 'Queima in May, Latada in October or another date, and the number of people. The number decides the location: a large group needs a staircase wide enough that nobody disappears at the back.',
        },
        {
          title: 'Meeting point and time confirmed',
          text: 'Usually the same working day, with a photographer, a location and a time chosen for the cape — in direct sun, black cloth loses all its detail.',
        },
        {
          title: 'Group first, individuals after',
          text: 'The group frames are made while everyone is there and nobody has had to leave. Then each person gets a turn with the pasta and ribbons, and there is time left for the small groups — the two best friends, the flatmates.',
        },
        {
          title: '40 photographs within 72 hours',
          text: 'Forty retouched photographs, individual and group, delivered to a private gallery within 72 hours.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos quantos são e quando',
          text: 'Queima em Maio, Latada em Outubro ou outra data, e o número de pessoas. O número decide o local: um grupo grande precisa de uma escadaria larga para ninguém ficar escondido atrás.',
        },
        {
          title: 'Ponto de encontro e hora confirmados',
          text: 'Normalmente no mesmo dia útil, com o fotógrafo, o local e uma hora pensada para a capa — ao sol directo, o preto perde o pormenor todo.',
        },
        {
          title: 'Grupo primeiro, individuais depois',
          text: 'Os planos de grupo fazem-se enquanto estão todos e ninguém teve ainda de sair. Depois cada pessoa tem a sua vez, com a pasta e as fitas, e sobra tempo para os grupos pequenos — os dois melhores amigos, quem partilhou casa.',
        },
        {
          title: '40 fotografias em 72 horas',
          text: 'Quarenta fotografias retocadas, individuais e de grupo, entregues numa galeria privada em 72 horas.',
        },
      ],
    },
    prepare: {
      en: [
        'Full traje, ironed the night before: a creased batina shows in every frame and is hard to fix afterwards.',
        'Polished black shoes; in full-length frames they are the first thing noticed after the cape.',
        'Bring the pasta with the ribbons and, if you have them, the top hat and cane: they make it a finalist’s photograph rather than any photograph in a cape.',
        'Meet fifteen minutes before the session starts; in a group, someone is always late.',
        'Take off festival wristbands, badges and sunglasses hooked onto the batina before you start.',
      ],
      pt: [
        'Traje completo e passado a ferro na véspera: uma batina amarrotada nota-se em todas as fotografias e é difícil de corrigir depois.',
        'Sapatos pretos engraxados; nos planos de corpo inteiro são a primeira coisa que se vê a seguir à capa.',
        'Tragam a pasta com as fitas e, se as tiverem, a cartola e a bengala: são o que distingue uma fotografia de finalista de uma fotografia qualquer de capa.',
        'Marquem o encontro quinze minutos antes da hora da sessão; num grupo há sempre alguém atrasado.',
        'Tirem pulseiras de festas, crachás e óculos de sol pendurados na batina antes de começar.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'We are a big group. Is ninety minutes enough?',
          pt: 'Somos um grupo grande. Noventa minutos chegam?',
        },
        answer: {
          en: 'Enough for the group frames and individual portraits of everyone, but in a large group each person has less time alone. Tell us the number when booking and the session is planned around it rather than discovered halfway through.',
          pt: 'Chegam para os planos de grupo e para retratos individuais de todos, mas num grupo grande cada pessoa tem menos tempo sozinha. Digam-nos o número ao reservar e a sessão é planeada para ele, em vez de se descobrir a meio.',
        },
      },
      {
        question: {
          en: 'Can it be outside Queima and Latada?',
          pt: 'Pode ser fora da Queima e da Latada?',
        },
        answer: {
          en: 'Yes. They are the most requested dates, not the only ones: any day with the traje on will do, and outside those weeks the traditional locations are close to empty.',
          pt: 'Pode. São as datas mais pedidas, não as únicas: qualquer dia com o traje vestido serve, e fora dessas semanas os locais tradicionais estão praticamente vazios.',
        },
      },
      {
        question: {
          en: 'Can our parents come along?',
          pt: 'Os pais podem assistir?',
        },
        answer: {
          en: 'Yes, and it helps to have someone holding coats and bags. It is better if they leave phone photographs until after the group frames, so nobody is looking at two cameras.',
          pt: 'Podem, e dá jeito ter quem segure casacos e mochilas. Convém é deixarem as fotografias de telemóvel para depois dos planos de grupo, para ninguém estar a olhar para duas câmaras.',
        },
      },
      {
        question: {
          en: 'What if someone in the group does not turn up?',
          pt: 'E se alguém do grupo faltar no dia?',
        },
        answer: {
          en: 'The group frames are made with whoever is there, and the individual portraits of everyone else do not change. What is lost is the person who stayed away, not the session.',
          pt: 'Os planos de grupo fazem-se com quem está, e os retratos individuais de quem veio não mudam. O que se perde é a presença de quem faltou, não a sessão.',
        },
      },
      {
        question: {
          en: 'Can we use the photographs on social media and the course dinner invitation?',
          pt: 'Podemos usar as fotografias nas redes e no convite do jantar de curso?',
        },
        answer: {
          en: 'Yes. The session includes a personal licence — social media, invitations, prints for the family, sent to whoever you like. What it does not cover is resale or commercial use, which is a separate arrangement.',
          pt: 'Podem. A sessão inclui uma licença pessoal — redes sociais, convites, impressões para a família, enviadas a quem quiserem. O que não cobre é revenda ou uso comercial, que é um acordo à parte.',
        },
      },
    ],
  },
};
