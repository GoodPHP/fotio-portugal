import type { ServiceLanding } from './service-landing';

/**
 * Conversion sections for the portrait, family and life-event services.
 * See `service-landing.ts` for what each block is for.
 *
 * Figures are the catalogue's — duration, photograph count, deliverables — so a
 * sentence here can be checked against the price card beside it.
 */
export const PEOPLE_SERVICE_LANDING: Record<string, ServiceLanding> = {
  portrait: {
    promise: {
      en: 'A portrait you will actually use — on LinkedIn, a book jacket or a speaker page — made in one relaxed hour, chosen with you, at a price fixed before you arrive.',
      pt: 'Um retrato que vai mesmo usar — no LinkedIn, numa badana de livro ou num site de oradores — feito numa hora descontraída, escolhido consigo, a preço fixo antes de chegar.',
    },
    audience: {
      en: [
        {
          title: 'Anyone whose face is their first impression',
          text: 'Consultants, lawyers, therapists and doctors whose clients look them up before the first meeting. A phone selfie against a kitchen wall tells them something you did not mean to say.',
        },
        {
          title: 'Authors, speakers and artists',
          text: 'A press kit needs one serious portrait, one warmer one and a horizontal crop that survives being placed behind a headline. Two lighting set-ups exist to produce exactly that range.',
        },
        {
          title: 'People who dislike being photographed',
          text: 'Most of our sitters say this in the first message. A studio helps: no passers-by, no wind, and a photographer who directs every pose so you never have to wonder what to do with your hands.',
        },
      ],
      pt: [
        {
          title: 'Quem é conhecido pela cara antes de ser conhecido pelo trabalho',
          text: 'Consultores, advogados, terapeutas e médicos cujos clientes os procuram antes da primeira reunião. Uma selfie contra a parede da cozinha diz-lhes algo que não queria dizer.',
        },
        {
          title: 'Autores, oradores e artistas',
          text: 'Um dossier de imprensa precisa de um retrato sério, de outro mais próximo e de um enquadramento horizontal que aguente um título por cima. Os dois esquemas de luz existem para dar exactamente essa amplitude.',
        },
        {
          title: 'Quem não gosta de ser fotografado',
          text: 'É o que a maioria nos diz logo na primeira mensagem. O estúdio ajuda: sem quem passe, sem vento, e com um fotógrafo que orienta cada pose para nunca ter de pensar no que fazer às mãos.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us what the portrait is for',
          text: 'A LinkedIn profile, a website header and a book jacket want different crops and a different mood. One line on the booking form is enough, and the price does not change.',
        },
        {
          title: 'We confirm a photographer and a time',
          text: 'You get a named photographer in your city, the studio address and a short note on what to bring, usually the same working day.',
        },
        {
          title: 'One hour, two looks',
          text: 'Two lighting set-ups and two backgrounds — typically one clean and bright, one darker and more editorial. You see frames on the screen as you go and adjust together.',
        },
        {
          title: 'Choose together, receive in 48–72 hours',
          text: 'The selection is made with the photographer before you leave. Twenty-five retouched photographs arrive in a private gallery within 48 to 72 hours, in full resolution and web sizes.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos para que é o retrato',
          text: 'Um perfil de LinkedIn, o topo de um site e a badana de um livro pedem enquadramentos e ambientes diferentes. Basta uma linha no formulário de reserva, e o preço não muda.',
        },
        {
          title: 'Confirmamos fotógrafo e hora',
          text: 'Recebe o nome do fotógrafo na sua cidade, a morada do estúdio e uma nota curta sobre o que levar, normalmente no mesmo dia útil.',
        },
        {
          title: 'Uma hora, dois registos',
          text: 'Dois esquemas de luz e dois fundos — em regra um claro e limpo, outro mais escuro e editorial. Vê as fotografias no ecrã à medida que avançam e ajustam em conjunto.',
        },
        {
          title: 'Escolha em conjunto, entrega em 48–72 horas',
          text: 'A selecção faz-se com o fotógrafo antes de sair. Vinte e cinco fotografias retocadas chegam numa galeria privada em 48 a 72 horas, em alta resolução e em tamanhos para a web.',
        },
      ],
    },
    prepare: {
      en: [
        'Bring two or three plain tops in solid mid-tones: navy, stone, forest green, burgundy. Avoid fine stripes and small checks.',
        'Bring what you actually wear to work, not what you think a portrait requires — people recognise you by it.',
        'Sleep matters more than make-up. If you wear make-up, keep it matte; the studio light picks up shine first.',
        'Glasses are welcome. Mention them when booking so the light is set to keep reflections off the lenses.',
        'Have a haircut a week before, not the day before — it takes a few days to settle.',
      ],
      pt: [
        'Leve duas ou três peças lisas em tons médios: azul-marinho, pedra, verde-escuro, bordeaux. Evite riscas finas e xadrez pequeno.',
        'Leve aquilo que veste mesmo para trabalhar, e não o que acha que um retrato exige — é assim que as pessoas o reconhecem.',
        'Dormir bem conta mais do que maquilhagem. Se usar, prefira mate: a luz de estúdio apanha primeiro o brilho.',
        'Óculos são bem-vindos. Diga-nos ao reservar para a luz ser montada sem reflexos nas lentes.',
        'Corte o cabelo uma semana antes, não na véspera — leva uns dias a assentar.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'I am not photogenic. Will this work for me?',
          pt: 'Não sou fotogénico. Vai resultar comigo?',
        },
        answer: {
          en: 'Almost nobody feels photogenic; what reads as awkward in a photograph is usually a lack of direction. The photographer tells you where to stand, where to look and what to do with your hands, and the first ten minutes are spent warming up rather than shooting for the final selection.',
          pt: 'Quase ninguém se sente fotogénico; o que parece desajeitado numa fotografia é normalmente falta de orientação. O fotógrafo diz-lhe onde ficar, para onde olhar e o que fazer às mãos, e os primeiros dez minutos servem para aquecer, não para a selecção final.',
        },
      },
      {
        question: {
          en: 'Where can I use the photographs?',
          pt: 'Onde posso usar as fotografias?',
        },
        answer: {
          en: 'The session includes a personal licence: your profile, your own website, a speaker page, a book jacket, printed and posted wherever you like. Resale or use in paid advertising is a separate arrangement — mention it when booking and it is quoted before the session, not after.',
          pt: 'A sessão inclui uma licença pessoal: o seu perfil, o seu site, uma página de orador, uma badana de livro, impressas e publicadas onde quiser. Revenda ou uso em publicidade paga é um acordo à parte — diga-nos ao reservar e é orçamentado antes da sessão, não depois.',
        },
      },
      {
        question: {
          en: 'What if I do not like any of the photographs?',
          pt: 'E se não gostar de nenhuma fotografia?',
        },
        answer: {
          en: 'You see the frames on the screen throughout the hour and choose before you leave, so there is no surprise a week later. If something is not working — a colour, a background, an expression — it is changed during the session rather than discovered afterwards.',
          pt: 'Vê as fotografias no ecrã durante toda a hora e escolhe antes de sair, por isso não há surpresas uma semana depois. Se algo não está a resultar — uma cor, um fundo, uma expressão — muda-se durante a sessão em vez de se descobrir depois.',
        },
      },
      {
        question: {
          en: 'How much retouching is included?',
          pt: 'Que retoque está incluído?',
        },
        answer: {
          en: 'Natural retouching on all twenty-five: skin evened out, temporary blemishes and stray hairs removed, colour and exposure balanced. Your face stays your face — nobody should meet you in person and wonder who was in the photograph.',
          pt: 'Retoque natural nas vinte e cinco: pele uniformizada, imperfeições temporárias e cabelos soltos removidos, cor e exposição equilibradas. A sua cara continua a ser a sua — ninguém deve conhecê-lo pessoalmente e perguntar-se quem estava na fotografia.',
        },
      },
      {
        question: {
          en: 'Can two people book the same session?',
          pt: 'Duas pessoas podem partilhar a sessão?',
        },
        answer: {
          en: 'The hour is built for one sitter. For two or more people from the same company who need matching portraits, corporate headshots is the better fit: it is priced per person and keeps the framing identical across the team.',
          pt: 'A hora é pensada para uma pessoa. Para duas ou mais pessoas da mesma empresa que precisem de retratos coerentes, o retrato corporativo é mais adequado: tem preço por pessoa e mantém o mesmo enquadramento em toda a equipa.',
        },
      },
    ],
  },

  'lifestyle-portrait': {
    promise: {
      en: 'A portrait that looks like you on a good ordinary day — outdoors, walking, in two places near each other — thirty retouched photographs, price fixed beforehand.',
      pt: 'Um retrato com ar de dia normal e bom — na rua, a andar, em dois sítios perto um do outro — trinta fotografias retocadas e preço fixo antes de começar.',
    },
    audience: {
      en: [
        {
          title: 'People who freeze when they stand still',
          text: 'Walking gives the body something to do. Plenty of people who go rigid in front of a backdrop look like themselves again by the third pass along the same street, and that is the frame the session is built to catch.',
        },
        {
          title: 'Anyone whose work belongs to a place',
          text: 'The owner of a shop, a guide, a ceramicist with a workshop near the market. The two locations can be your own street and the one round the corner rather than somewhere off a postcard — say so when booking.',
        },
        {
          title: 'People who need more than one profile photograph',
          text: 'A website, a newsletter, a speaker bio and a dating profile should not all use the same crop. Thirty photographs across two places give genuinely different images, not thirty versions of one.',
        },
      ],
      pt: [
        {
          title: 'Quem fica rígido quando está parado',
          text: 'Andar dá ao corpo alguma coisa para fazer. Muita gente que congela à frente de um fundo volta a parecer-se consigo à terceira passagem pela mesma rua, e é essa a imagem que a sessão existe para apanhar.',
        },
        {
          title: 'Quem trabalha num sítio concreto',
          text: 'A dona de uma loja, um guia, uma ceramista com oficina ao pé do mercado. Os dois locais podem ser a sua rua e a do lado, e não um cenário tirado de um postal — basta dizê-lo ao reservar.',
        },
        {
          title: 'Quem precisa de mais do que uma fotografia de perfil',
          text: 'Um site, uma newsletter, uma biografia de orador e um perfil numa aplicação de encontros não deviam usar todos o mesmo corte. Trinta fotografias em dois sítios dão imagens realmente diferentes, e não trinta versões da mesma.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Say where you would feel at ease',
          text: 'A neighbourhood you know, a street near your work, or no idea at all. Write it on the booking form; if you leave it blank, the photographer proposes two spots within walking distance of each other.',
        },
        {
          title: 'A start time set by the sun',
          text: 'We confirm the photographer, a meeting point and a start time, usually the same working day. The start is placed so the session finishes close to sunset, when the light is low and nobody is squinting.',
        },
        {
          title: 'Seventy-five minutes, two places, one walk',
          text: 'The first location is slower and composed: where to stand, where the light falls. The walk to the second is photographed too, and the looser frames from it tend to be the ones people end up using.',
        },
        {
          title: 'Thirty photographs in 48–72 hours',
          text: 'Thirty retouched photographs, from both locations and the walk between them, arrive in a private gallery within 48 to 72 hours.',
        },
      ],
      pt: [
        {
          title: 'Diga onde se sentiria à vontade',
          text: 'Um bairro que conhece, uma rua perto do trabalho, ou nenhuma ideia. Escreva-o no formulário de reserva; se deixar em branco, o fotógrafo propõe dois sítios a distância de caminhada um do outro.',
        },
        {
          title: 'Uma hora de início marcada pelo sol',
          text: 'Confirmamos o fotógrafo, o ponto de encontro e a hora, normalmente no mesmo dia útil. O início é escolhido para a sessão acabar perto do pôr do sol, quando a luz é baixa e ninguém tem de semicerrar os olhos.',
        },
        {
          title: 'Setenta e cinco minutos, dois sítios, um percurso',
          text: 'O primeiro local é mais lento e composto: onde ficar, para onde cai a luz. O caminho até ao segundo também se fotografa, e as imagens mais soltas que saem dali costumam ser as que as pessoas acabam por usar.',
        },
        {
          title: 'Trinta fotografias em 48–72 horas',
          text: 'Trinta fotografias retocadas, dos dois locais e do caminho entre eles, chegam numa galeria privada em 48 a 72 horas.',
        },
      ],
    },
    prepare: {
      en: [
        'Wear shoes you can walk in for seventy-five minutes; Portuguese calçada is uneven and slippery.',
        'Bring one layer you can add or take off — a jacket, an overshirt — so the two locations do not look like the same five minutes.',
        'Avoid logos and slogans on clothing; they date a photograph and pull the eye away from your face.',
        'If your work has an object — a knife roll, a camera, a sketchbook — bring it. Holding something settles what to do with your hands.',
        'Empty your pockets before you start; a phone and keys show through fabric in walking frames.',
      ],
      pt: [
        'Calce sapatos com que consiga andar setenta e cinco minutos; a calçada portuguesa é irregular e escorrega.',
        'Leve uma peça que possa vestir ou tirar — um casaco, uma sobrecamisa — para os dois locais não parecerem os mesmos cinco minutos.',
        'Evite logótipos e frases na roupa: datam a fotografia e tiram a atenção da cara.',
        'Se o seu trabalho tem um objecto — um estojo de facas, uma câmara, um caderno de esboços — traga-o. Segurar alguma coisa resolve o que fazer às mãos.',
        'Esvazie os bolsos antes de começar; o telemóvel e as chaves notam-se nas fotografias em movimento.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'People will be walking past. Will that feel awkward?',
          pt: 'Vai haver gente a passar. Não é constrangedor?',
        },
        answer: {
          en: 'For the first few minutes, a little. Then it stops, because very few people are actually looking: someone walking with a photographer is an ordinary sight in a city centre. Strangers in the background are waited out or left soft and out of focus.',
          pt: 'Nos primeiros minutos, um pouco. Depois passa, porque quase ninguém está realmente a olhar: alguém a andar com um fotógrafo é coisa corrente no centro de uma cidade. Quem passa atrás espera-se que saia, ou fica desfocado no fundo.',
        },
      },
      {
        question: {
          en: 'Should I book this or the studio portrait?',
          pt: 'Marco este ou o retrato de estúdio?',
        },
        answer: {
          en: 'The studio, if the photograph has to sit beside colleagues’ on a company page or a designer needs a plain background to cut around. This one, if it is for your own site, a book or anywhere it should say something about how you work. The studio is an hour from €150; this is seventy-five minutes from €170.',
          pt: 'O de estúdio, se a fotografia tiver de ficar ao lado das dos colegas numa página da empresa ou se um designer precisar de um fundo liso para recortar. Este, se for para o seu site, um livro ou qualquer sítio onde deva dizer alguma coisa sobre a forma como trabalha. O estúdio é uma hora, desde 150 €; este são setenta e cinco minutos, desde 170 €.',
        },
      },
      {
        question: {
          en: 'What if the day is overcast?',
          pt: 'E se o dia estiver encoberto?',
        },
        answer: {
          en: 'Faces look good under cloud: the light is soft and even, and nobody squints. What you lose is the warm edge of a sunset, not the portrait.',
          pt: 'As caras ficam bem com o céu encoberto: a luz é suave e uniforme, e ninguém semicerra os olhos. O que se perde é o tom quente do pôr do sol, não o retrato.',
        },
      },
      {
        question: {
          en: 'Can I choose the locations myself?',
          pt: 'Posso escolher os locais?',
        },
        answer: {
          en: 'Yes, as long as the two are within walking distance of each other. Somewhere private — a shop, a café terrace, a workshop — needs the owner’s permission, which is far easier for you to ask for than for us.',
          pt: 'Pode, desde que fiquem a distância de caminhada um do outro. Um espaço privado — uma loja, a esplanada de um café, uma oficina — precisa de autorização do dono, e é bem mais fácil ser o próprio cliente a pedi-la.',
        },
      },
      {
        question: {
          en: 'Where can I use the photographs?',
          pt: 'Onde posso usar as fotografias?',
        },
        answer: {
          en: 'The session includes a personal licence: your profile, your own site, a bio, printed and posted wherever you like. Resale or use in paid advertising is a separate arrangement — mention it when booking and it is quoted before the session, not after.',
          pt: 'A sessão inclui uma licença pessoal: o seu perfil, o seu site, uma biografia, impressas e publicadas onde quiser. Revenda ou uso em publicidade paga é um acordo à parte — diga-nos ao reservar e é orçamentado antes da sessão, não depois.',
        },
      },
    ],
  },

  family: {
    promise: {
      en: 'Photographs of your family that you are in as well, made at the hour your children are at their best, with nobody asked to sit still and smile.',
      pt: 'Fotografias da família em que também aparece, feitas à hora em que as crianças estão melhor, sem ninguém ter de ficar quieto a sorrir.',
    },
    audience: {
      en: [
        {
          title: 'The parent who is never in the photographs',
          text: 'Whoever holds the phone is missing from the family album. Seventy-five minutes with someone else behind the camera puts both parents in the frame, holding the children rather than directing them.',
        },
        {
          title: 'Families with children too quick for a phone',
          text: 'Under six, children move faster than a phone focuses and stop cooperating the moment they notice it. Nobody is asked to pose; the photographer follows what they are doing, and forty photographs leaves room for the few where everyone looks up at once.',
        },
        {
          title: 'Three generations in one place, for once',
          text: 'A grandparent visiting, cousins home for the summer. When the family is only together for a week, one morning outdoors is a small price for the group photograph everyone asks for afterwards.',
        },
      ],
      pt: [
        {
          title: 'O pai ou a mãe que nunca aparece nas fotografias',
          text: 'Quem segura o telemóvel falta sempre no álbum da família. Setenta e cinco minutos com outra pessoa atrás da câmara põem os dois no enquadramento, com as crianças ao colo em vez de a dar instruções.',
        },
        {
          title: 'Famílias com crianças rápidas demais para um telemóvel',
          text: 'Abaixo dos seis anos, as crianças mexem-se mais depressa do que o telemóvel foca e deixam de colaborar assim que dão por ele. Ninguém tem de posar: o fotógrafo acompanha o que estão a fazer, e quarenta fotografias dão margem para as poucas em que todos olham ao mesmo tempo.',
        },
        {
          title: 'Três gerações no mesmo sítio, desta vez',
          text: 'Os avós de visita, os primos que vêm no Verão. Quando a família só está junta uma semana, uma manhã ao ar livre é pouco para a fotografia de grupo que todos pedem depois.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us ages and nap times',
          text: 'The start time is built around the youngest child, not the calendar. One line on the booking form — ages, when they sleep, who gets difficult when hungry — is what the photographer plans from.',
        },
        {
          title: 'Place and time confirmed, weather watched',
          text: 'Usually the same working day: a photographer, one location with shade and room to run, and an early start. If the forecast turns before the day, the session moves at no cost.',
        },
        {
          title: 'Twenty minutes of play before the session proper',
          text: 'Children spend the opening minutes performing for the camera. The photographer lets that run its course — a game, a walk, a snack — and the frames that count come after, in the same spot, without packing up to move.',
        },
        {
          title: 'Forty photographs in 48–72 hours',
          text: 'Retouched and delivered to a private gallery. Expect a handful where everyone looks at the camera and many more where nobody does; the second kind tend to be the ones that get printed.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos idades e horas de sesta',
          text: 'A hora de início é pensada à volta da criança mais nova, não da agenda. Uma linha no formulário de reserva — idades, quando dormem, quem fica difícil com fome — é a partir daí que o fotógrafo planeia.',
        },
        {
          title: 'Local e hora confirmados, de olho no tempo',
          text: 'Normalmente no mesmo dia útil: o fotógrafo, um local com sombra e espaço para correr, e uma hora cedo. Se a previsão mudar antes do dia, a sessão remarca-se sem custo.',
        },
        {
          title: 'Vinte minutos de brincadeira antes da sessão a sério',
          text: 'Nos primeiros minutos as crianças representam para a câmara. O fotógrafo deixa isso passar — um jogo, uma volta, um lanche — e as fotografias que contam vêm depois, no mesmo sítio, sem arrumar tudo para mudar.',
        },
        {
          title: 'Quarenta fotografias em 48–72 horas',
          text: 'Retocadas e entregues numa galeria privada. Conte com meia dúzia em que todos olham para a câmara e muitas mais em que ninguém olha; costumam ser estas as que vão para a parede.',
        },
      ],
    },
    prepare: {
      en: [
        'Coordinate colours rather than matching outfits: two or three tones that sit together, and no two people in the same shirt.',
        'Feed everyone before leaving home, and bring a snack that does not stain — crackers, not chocolate or berries.',
        'Bring whatever the youngest is attached to — a toy, a muslin. It calms them, and it often ends up in the best frame.',
        'Do not promise a treat for smiling. A bribed child produces the same fixed grin in every photograph.',
        'Wear shoes everyone can run in and sit on grass in; the session is not spent standing.',
        'Keep a spare top in the car for anyone under four.',
      ],
      pt: [
        'Coordene as cores em vez de vestir todos iguais: dois ou três tons que combinem, e ninguém com a mesma camisola que outro.',
        'Dê de comer a todos antes de sair de casa e leve um lanche que não suje — bolachas de água e sal, não chocolate nem frutos vermelhos.',
        'Traga aquilo a que o mais novo está agarrado — um boneco, uma fralda de pano. Acalma, e aparece muitas vezes na melhor fotografia.',
        'Não prometa um prémio por sorrir. Criança subornada faz o mesmo sorriso fixo em todas as fotografias.',
        'Escolha sapatos com que se possa correr e sentar na relva; a sessão não se passa de pé.',
        'Deixe uma camisola de reserva no carro para quem tiver menos de quatro anos.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'What if my child cries or refuses to join in?',
          pt: 'E se o meu filho chorar ou não quiser participar?',
        },
        answer: {
          en: 'It happens, and it does not cost you the session. The photographer stops, the child is comforted, and nobody is told to smile. A child on a parent’s lap five minutes after crying is a photograph worth having too, and seventy-five minutes leaves time to get back to the rest.',
          pt: 'Acontece, e não se perde a sessão por isso. O fotógrafo pára, a criança é consolada, e ninguém a manda sorrir. Uma criança ao colo do pai cinco minutos depois de chorar também é uma fotografia que vale a pena, e setenta e cinco minutos dão tempo para voltar ao resto.',
        },
      },
      {
        question: {
          en: 'What happens if it rains?',
          pt: 'E se chover?',
        },
        answer: {
          en: 'The session is rescheduled at no cost if the weather turns. Say so as soon as the forecast looks wrong; there is no point deciding at the park gate with everyone already dressed.',
          pt: 'Se o tempo mudar, a sessão remarca-se sem custo. Diga-nos logo que a previsão estiver má; não vale a pena decidir à porta do jardim com toda a gente já vestida.',
        },
      },
      {
        question: {
          en: 'Will I be in the photographs as well?',
          pt: 'Também apareço nas fotografias?',
        },
        answer: {
          en: 'Yes, as much as the children. The photographer directs the adults too — where to sit, when to pick someone up, when to put them down — so you are never left wondering whether you are in the way.',
          pt: 'Sim, tanto quanto as crianças. O fotógrafo orienta também os adultos — onde se sentar, quando pegar numa criança ao colo, quando a pousar — para nunca ficar na dúvida se está a atrapalhar.',
        },
      },
      {
        question: {
          en: 'Our teenager does not want to come.',
          pt: 'O nosso filho adolescente não quer vir.',
        },
        answer: {
          en: 'Teenagers usually object to being posed, not to being photographed. Give them something to do — carrying the youngest, walking ahead with a sibling — and keep their part short. The frames where they forget to object are often the ones they ask for later.',
          pt: 'Os adolescentes costumam recusar ser postos em pose, não ser fotografados. Dê-lhe alguma coisa para fazer — levar o mais novo ao colo, ir à frente com um irmão — e mantenha curta a parte dele. As fotografias em que se esquece de protestar são muitas vezes as que pede depois.',
        },
      },
      {
        question: {
          en: 'Do we have to find the location?',
          pt: 'Temos de ser nós a escolher o local?',
        },
        answer: {
          en: 'No. Name an area, or leave it to the photographer, who will know which park has shade at nine in the morning and which one puts a car park in every background.',
          pt: 'Não. Indique uma zona, ou deixe ao fotógrafo, que sabe que jardim tem sombra às nove da manhã e qual deles tem um parque de estacionamento em todos os fundos.',
        },
      },
    ],
  },
};
