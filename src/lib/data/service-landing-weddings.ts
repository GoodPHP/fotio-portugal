import type { ServiceLanding } from './service-landing';

/**
 * Conversion sections for the wedding, elopement, proposal and couple services.
 * See `service-landing.ts` for what each block is for.
 *
 * Figures are the catalogue's — hours of coverage, photograph count, delivery
 * window — and the only rescheduling claim is the one the elopement passage in
 * `service-seo-weddings.ts` already makes: that an elopement can move by a day.
 */
export const WEDDING_SERVICE_LANDING: Record<string, ServiceLanding> = {
  couple: {
    promise: {
      en: 'Ninety minutes on foot between two places, at the hour the light is low — and forty photographs of the two of you that do not look posed.',
      pt: 'Noventa minutos a pé entre dois sítios, à hora em que a luz é baixa — e quarenta fotografias dos dois que não parecem posadas.',
    },
    audience: {
      en: [
        {
          title: 'Couples with no photograph of themselves together',
          text: 'Years of holidays, and every picture has one of you in it holding the phone. This is usually the reason given, and it is a good one.',
        },
        {
          title: 'Engaged couples who need a save-the-date',
          text: 'A horizontal frame for the wedding website, a vertical one for the invitation and a few that are simply of the two of you. Forty photographs covers all three with room to spare.',
        },
        {
          title: 'Anniversaries, and couples passing through',
          text: 'Ten years married, or three days in Lisbon on the way somewhere else. Ninety minutes fits into a morning without taking the day over.',
        },
      ],
      pt: [
        {
          title: 'Casais sem uma única fotografia dos dois',
          text: 'Anos de férias, e em todas as fotografias um de vocês está fora porque é quem segura o telemóvel. É o motivo que mais ouvimos, e é um bom motivo.',
        },
        {
          title: 'Noivos que precisam de um save-the-date',
          text: 'Um enquadramento horizontal para o site do casamento, um vertical para o convite e algumas que são só dos dois. Quarenta fotografias chegam para as três coisas e sobram.',
        },
        {
          title: 'Aniversários de casamento, e casais de passagem',
          text: 'Dez anos de casados, ou três dias em Lisboa a caminho de outro sítio. Noventa minutos cabem numa manhã sem tomar conta do dia.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Pick a city and a part of the day',
          text: 'Morning or evening matters more than the exact date. Tell us which, and whether there is a place you already have in mind.',
        },
        {
          title: 'We choose the route to suit the light',
          text: 'Two locations that face the right way for that hour and are walkable from one to the other. Confirmation with a meeting point, usually the same working day.',
        },
        {
          title: 'Walk first, photographs second',
          text: 'The first fifteen minutes are conversation on the move. Direction comes in once you have stopped noticing the camera: where to stand, what to do with a hand, when to simply keep walking.',
        },
        {
          title: 'Forty photographs in 48–72 hours',
          text: 'Retouched, in a private gallery, in full resolution. They are yours to print, post and send to anyone you like.',
        },
      ],
      pt: [
        {
          title: 'Escolha a cidade e a altura do dia',
          text: 'Manhã ou fim de tarde conta mais do que a data exacta. Diga-nos qual, e se já tem algum sítio em mente.',
        },
        {
          title: 'Escolhemos o percurso em função da luz',
          text: 'Dois locais virados para o lado certo àquela hora e a uma distância que se faz a pé. A confirmação chega com o ponto de encontro, normalmente no mesmo dia útil.',
        },
        {
          title: 'Primeiro anda-se, depois fotografa-se',
          text: 'Os primeiros quinze minutos são conversa a caminhar. As indicações vêm quando já ninguém repara na câmara: onde ficar, o que fazer com uma mão, quando é só continuar a andar.',
        },
        {
          title: 'Quarenta fotografias em 48 a 72 horas',
          text: 'Retocadas, numa galeria privada, em alta resolução. São suas para imprimir, publicar e enviar a quem quiser.',
        },
      ],
    },
    prepare: {
      en: [
        'Coordinate, do not match: two tones that sit together, not the same shirt twice.',
        'Wear shoes you can walk a kilometre in on polished stone; bring the good ones in a bag if they matter.',
        'Avoid large logos and bright white tops, which pull the eye away from faces.',
        'Eat beforehand. Ninety minutes of walking on an empty stomach shows by the second location.',
        'Bring one thing that is yours — a jacket you always wear, the dog lead, a coffee from the place you go every morning.',
      ],
      pt: [
        'Combinem, não se vistam iguais: dois tons que funcionem juntos, não a mesma camisa duas vezes.',
        'Calce sapatos com que consiga andar um quilómetro em calçada polida; se os bons forem importantes, leve-os num saco.',
        'Evite logótipos grandes e tops brancos muito vivos, que tiram a atenção das caras.',
        'Coma antes. Noventa minutos a andar de estômago vazio notam-se logo no segundo local.',
        'Traga uma coisa que seja vossa — o casaco de sempre, a trela do cão, o café do sítio onde vão todas as manhãs.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Can we choose the two locations ourselves?',
          pt: 'Podemos escolher nós os dois locais?',
        },
        answer: {
          en: 'Yes, and it helps to know which place means something. We will say if it faces the wrong way for the hour you want: in Lisbon, Senhora do Monte is a morning viewpoint and the Doca de Santo Amaro under the bridge an evening one, and swapping them costs you the light at both.',
          pt: 'Sim, e ajuda saber que sítio vos diz alguma coisa. Dizemos-lhe se estiver virado para o lado errado à hora que quer: em Lisboa, a Senhora do Monte é um miradouro de manhã e a Doca de Santo Amaro, debaixo da ponte, é de fim de tarde, e trocá-los tira-vos a luz nos dois.',
        },
      },
      {
        question: {
          en: 'What happens if it rains?',
          pt: 'E se chover?',
        },
        answer: {
          en: 'Overcast is not a problem — flat cloud is kinder to faces than July sun. For real rain the route has a covered alternative, such as the arcades of Praça do Comércio or São Bento station in Porto. Whether the date itself can move is something to raise when you book, not on the morning.',
          pt: 'Céu encoberto não é problema — a nuvem é mais simpática para as caras do que o sol de Julho. Para chuva a sério, o percurso tem uma alternativa coberta, como as arcadas da Praça do Comércio ou a estação de São Bento, no Porto. Se a data pode mudar é assunto para falar ao reservar, não na própria manhã.',
        },
      },
      {
        question: {
          en: 'Will there be crowds in the background?',
          pt: 'Vai haver gente atrás de nós nas fotografias?',
        },
        answer: {
          en: 'Less than you fear, if the hour is right. Most viewpoints are empty before eight and full by nine, and a photographer who knows where to stand can remove a crowd with an angle. The rest is cleaned up in retouching when a stranger lands in the middle of a good frame.',
          pt: 'Menos do que teme, se a hora for a certa. A maior parte dos miradouros está vazia antes das oito e cheia às nove, e um fotógrafo que sabe onde se pôr tira uma multidão com um ângulo. O resto trata-se no retoque, quando um desconhecido cai no meio de uma boa fotografia.',
        },
      },
      {
        question: {
          en: 'Can we use the photographs on our wedding website and invitations?',
          pt: 'Podemos usar as fotografias no site do casamento e nos convites?',
        },
        answer: {
          en: 'Yes. They are for your own personal use, which covers invitations, a wedding website, prints and anything you post or send to family. Mention a save-the-date when booking and a few frames will be composed with space for text.',
          pt: 'Sim. São para uso pessoal, o que inclui convites, o site do casamento, impressões e tudo o que publicar ou enviar à família. Diga-nos ao reservar que é para um save-the-date e algumas fotografias são compostas com espaço para texto.',
        },
      },
      {
        question: {
          en: 'Is this only for romantic couples?',
          pt: 'É só para casais de namorados?',
        },
        answer: {
          en: 'No. Two sisters, two old friends, a parent and a grown-up child — the session works the same way for any two people who are comfortable walking together. For three or more, the family session is the better fit.',
          pt: 'Não. Duas irmãs, dois amigos de sempre, um pai e um filho já adulto — a sessão funciona da mesma maneira para quaisquer duas pessoas à-vontade a caminhar juntas. Para três ou mais, a sessão de família é mais adequada.',
        },
      },
    ],
  },

  proposal: {
    promise: {
      en: 'Your partner sees no photographer until the question is asked — then thirty minutes together, and 35 photographs in a private gallery within 48 hours.',
      pt: 'A outra pessoa não vê fotógrafo nenhum até ao pedido — depois, trinta minutos juntos e 35 fotografias numa galeria privada em 48 horas.',
    },
    audience: {
      en: [
        {
          title: 'People planning a surprise',
          text: 'You want the look on their face, and you cannot hold a phone and a ring at the same time. The whole session is built around nobody noticing it has started.',
        },
        {
          title: 'Visitors proposing on holiday',
          text: 'You know the city from a screen and have one morning to get it right. We know which viewpoint is empty at that hour and which one has a coach party.',
        },
        {
          title: 'Couples who have already agreed',
          text: 'Not every proposal is a surprise. If you have decided together and want the moment staged properly — the ring, the view, the hug afterwards — the hour works just as well.',
        },
      ],
      pt: [
        {
          title: 'Quem está a preparar uma surpresa',
          text: 'Quer a cara da outra pessoa naquele segundo, e não se consegue segurar um telemóvel e um anel ao mesmo tempo. A sessão inteira existe para ninguém reparar que já começou.',
        },
        {
          title: 'Quem vem de fora e pede em viagem',
          text: 'Conhece a cidade por um ecrã e tem uma manhã para acertar. Nós sabemos que miradouro está vazio àquela hora e em qual está a descer um autocarro de excursão.',
        },
        {
          title: 'Casais que já decidiram',
          text: 'Nem todos os pedidos são surpresa. Se já combinaram os dois e querem o momento bem feito — o anel, a vista, o abraço a seguir — a hora serve igualmente.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Message us, not them',
          text: 'Everything goes to your email and your phone only. Tell us the city, roughly when, and what your partner thinks the day is about.',
        },
        {
          title: 'The spot and the minute, fixed in advance',
          text: 'We scout the location for that hour and send you an exact place to stand, a time, and where the photographer will be. Agreed the day before at the latest.',
        },
        {
          title: 'The photographer is already there',
          text: 'In place before you arrive, dressed like anyone else on the viewpoint, photographing from a distance with a long lens. When the answer is given, they walk over.',
        },
        {
          title: 'Thirty minutes, then 35 photographs in 48 hours',
          text: 'Once the surprise is over there is half an hour together for the portraits of the two of you, with the ring in them. The gallery link comes to you, so you choose when to share it.',
        },
      ],
      pt: [
        {
          title: 'Fale connosco, não com a outra pessoa',
          text: 'Tudo vai só para o seu email e o seu telemóvel. Diga-nos a cidade, mais ou menos quando, e o que a outra pessoa julga que vai acontecer nesse dia.',
        },
        {
          title: 'O sítio e o minuto, fixos com antecedência',
          text: 'Reconhecemos o local para aquela hora e enviamos-lhe o ponto exacto onde ficar, a hora, e onde vai estar o fotógrafo. Tudo combinado, o mais tardar, na véspera.',
        },
        {
          title: 'O fotógrafo já lá está',
          text: 'Chega antes de vocês, vestido como qualquer pessoa no miradouro, e fotografa à distância com uma teleobjectiva. Quando há resposta, aproxima-se.',
        },
        {
          title: 'Trinta minutos, e 35 fotografias em 48 horas',
          text: 'Passada a surpresa, há meia hora juntos para os retratos dos dois, já com o anel. O link da galeria chega-lhe a si, e é você quem decide quando o partilha.',
        },
      ],
    },
    prepare: {
      en: [
        'Give your partner a reason to dress for the day — a dinner booking, a friend’s photographs, anything plausible.',
        'Build fifteen minutes of slack into the excuse that gets you there; the fixed minute only works if you arrive before it.',
        'Stand where you were told, facing the way you were told. Two metres to the left can put a lamppost between you and the lens.',
        'Keep the ring box in a front pocket you can reach without turning your back to the view.',
        'Agree a covered second spot the day before in case of rain, so you are not improvising with a ring in your pocket.',
        'Do not look for the photographer. It is the single most common way a surprise is given away.',
      ],
      pt: [
        'Dê à outra pessoa um motivo para se arranjar — um jantar marcado, as fotografias de um amigo, qualquer coisa credível.',
        'Deixe quinze minutos de folga na desculpa que vos leva lá; o minuto combinado só funciona se chegarem antes dele.',
        'Fique onde lhe disseram, virado para onde lhe disseram. Dois metros ao lado podem pôr um candeeiro entre vocês e a objectiva.',
        'Leve a caixa do anel num bolso da frente, que se alcance sem virar as costas à vista.',
        'Combine na véspera um segundo sítio coberto para o caso de chover, para não ter de improvisar com um anel no bolso.',
        'Não procure o fotógrafo com os olhos. É a forma mais comum de estragar a surpresa.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'What if my partner notices the photographer?',
          pt: 'E se a outra pessoa reparar no fotógrafo?',
        },
        answer: {
          en: 'A person with a camera on a Lisbon viewpoint at sunrise is the least suspicious thing there. The photographer works from a distance with a long lens, does not look at you before the minute, and photographs other things in the meantime.',
          pt: 'Uma pessoa com uma câmara num miradouro de Lisboa ao nascer do sol é a coisa menos suspeita que lá está. O fotógrafo trabalha à distância com uma teleobjectiva, não olha para vocês antes do minuto combinado e vai fotografando outras coisas entretanto.',
        },
      },
      {
        question: {
          en: 'Which places work best for a proposal?',
          pt: 'Que sítios resultam melhor para um pedido?',
        },
        answer: {
          en: 'Ones that are empty at the hour you can get there. Miradouro da Senhora do Monte in Lisbon at seven in the morning; the clifftop path at Ponta da Piedade in Lagos at sunrise; Foz do Douro in Porto at sunset. Anywhere at the edge of a cliff is out, however good it would look.',
          pt: 'Os que estão vazios à hora a que lá conseguem chegar. O Miradouro da Senhora do Monte, em Lisboa, às sete da manhã; o trilho no alto da Ponta da Piedade, em Lagos, ao nascer do sol; a Foz do Douro, no Porto, ao pôr do sol. A beira de uma arriba está fora de questão, por melhor que ficasse.',
        },
      },
      {
        question: {
          en: 'What if we are late?',
          pt: 'E se nos atrasarmos?',
        },
        answer: {
          en: 'Send a message — a short text from the bathroom is enough. The photographer stays in position and adjusts. What does not work is changing the spot on the way there without telling anyone.',
          pt: 'Mande uma mensagem — basta um texto rápido às escondidas. O fotógrafo mantém-se no lugar e ajusta-se. O que não resulta é mudar de sítio pelo caminho sem avisar ninguém.',
        },
      },
      {
        question: {
          en: 'Can we propose with people around?',
          pt: 'Podemos fazer o pedido com gente à volta?',
        },
        answer: {
          en: 'You can, but it is a different photograph: strangers turning to watch, phones held up behind you. If an audience is part of the plan, say so and the photographer frames it in. If not, choose an earlier hour rather than hoping the viewpoint clears.',
          pt: 'Pode, mas é outra fotografia: desconhecidos a virarem-se, telemóveis no ar atrás de vocês. Se a plateia fizer parte do plano, diga-nos e o fotógrafo inclui-a. Se não, escolha uma hora mais cedo em vez de esperar que o miradouro esvazie.',
        },
      },
      {
        question: {
          en: 'Can family or friends join after the proposal?',
          pt: 'A família ou os amigos podem juntar-se depois do pedido?',
        },
        answer: {
          en: 'Yes, within the thirty minutes afterwards. Keep them out of sight until the moment is over — a café round the corner works — and they can walk up for a few group frames once the answer has been given.',
          pt: 'Sim, dentro dos trinta minutos a seguir. Mantenha-os fora de vista até o momento passar — um café ao virar da esquina serve — e juntam-se para algumas fotografias de grupo depois de haver resposta.',
        },
      },
    ],
  },

  wedding: {
    promise: {
      en: 'Ten hours of your wedding photographed to a plan agreed a month out, so nobody on the day is chasing the photographer — and 400 photographs in three weeks.',
      pt: 'Dez horas do seu casamento fotografadas segundo um plano fechado um mês antes, para que no dia ninguém ande atrás do fotógrafo — e 400 fotografias em três semanas.',
    },
    audience: {
      en: [
        {
          title: 'Couples marrying at a quinta',
          text: 'Getting ready in one building, ceremony in the garden, dinner in the adega, party under a marquee. Ten hours is sized for a day that moves between rooms like that.',
        },
        {
          title: 'Church weddings with a reception elsewhere',
          text: 'Two venues, a drive between them and a parish with its own rules on where a photographer may stand. The timing plan accounts for the drive; the rules are asked the week before.',
        },
        {
          title: 'Couples who would rather not manage a photographer',
          text: 'You have a caterer, a florist and a family to deal with. The group-photo list, the timings and the venue questions are ours to settle in advance.',
        },
      ],
      pt: [
        {
          title: 'Quem casa numa quinta',
          text: 'Preparativos num edifício, cerimónia no jardim, jantar na adega, festa debaixo de uma tenda. Dez horas foram pensadas para um dia que anda de sala em sala assim.',
        },
        {
          title: 'Casamentos religiosos com copo-de-água noutro sítio',
          text: 'Dois locais, uma viagem entre eles e uma paróquia com regras próprias sobre onde o fotógrafo pode estar. O plano de horários conta com a viagem; as regras perguntam-se na semana anterior.',
        },
        {
          title: 'Noivos que não querem gerir um fotógrafo',
          text: 'Já têm catering, flores e família para tratar. A lista de fotografias de grupo, os horários e as perguntas ao local ficam connosco, resolvidos com antecedência.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Send the date, the venue and the ceremony time',
          text: 'If the ceremony time is not fixed yet, even better — it is the one decision that changes the album most. We confirm availability and a photographer, usually the same working day.',
        },
        {
          title: 'A timing plan, a month before',
          text: 'Minute by minute from getting ready to the first hour of the party, with the portrait slot placed in the good light and the group photographs listed by name. Your planner or venue coordinator gets a copy.',
        },
        {
          title: 'Venue and parish questions, the week before',
          text: 'Whether flash is allowed, where the photographer may stand during the rite, which room is free for portraits if it rains. Asked in advance, because the answer changes the plan.',
        },
        {
          title: 'The day, then three weeks',
          text: 'Ten hours of coverage on the plan everyone already has. 400 retouched photographs arrive in a private gallery within three weeks, ready to download and share with every guest.',
        },
      ],
      pt: [
        {
          title: 'Envie a data, o local e a hora da cerimónia',
          text: 'Se a hora da cerimónia ainda não estiver fechada, melhor — é a decisão que mais muda o álbum. Confirmamos disponibilidade e fotógrafo, normalmente no mesmo dia útil.',
        },
        {
          title: 'Um plano de horários, um mês antes',
          text: 'Minuto a minuto, dos preparativos à primeira hora da festa, com os retratos na hora de boa luz e as fotografias de grupo listadas pelo nome. O organizador ou o coordenador da quinta recebe uma cópia.',
        },
        {
          title: 'Perguntas ao local e à paróquia, na semana anterior',
          text: 'Se é permitido flash, onde pode estar o fotógrafo durante o rito, que sala fica livre para os retratos se chover. Pergunta-se antes, porque a resposta muda o plano.',
        },
        {
          title: 'O dia, e depois três semanas',
          text: 'Dez horas de cobertura segundo um plano que toda a gente já conhece. As 400 fotografias retocadas chegam numa galeria privada em três semanas, prontas a descarregar e a partilhar com todos os convidados.',
        },
      ],
    },
    prepare: {
      en: [
        'Write the group-photo list as names, not categories — “Aunt Fátima and her sons”, not “mother’s side”.',
        'Name one guest who knows both families to gather people for the group photographs.',
        'Put the rings, the invitation and anything else you want photographed in one box before the morning.',
        'Choose a getting-ready room with a window and without a pile of suitcases in it.',
        'Leave twenty minutes after the ceremony with nothing scheduled; that is where the portraits go.',
        'Tell the photographer who should not be placed next to whom. Every family has a version of this.',
      ],
      pt: [
        'Escreva a lista de fotografias de grupo com nomes e não com categorias — “Tia Fátima e os filhos”, não “lado da mãe”.',
        'Escolha um convidado que conheça as duas famílias para ir juntando as pessoas nas fotografias de grupo.',
        'Ponha as alianças, o convite e o que mais quiser fotografado numa só caixa antes da manhã.',
        'Escolha para os preparativos uma sala com janela e sem uma pilha de malas lá dentro.',
        'Deixe vinte minutos depois da cerimónia sem nada marcado; é aí que ficam os retratos.',
        'Diga ao fotógrafo quem não deve ficar ao lado de quem. Todas as famílias têm uma versão disto.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'How does the photographer work with our venue and planner?',
          pt: 'Como é que o fotógrafo se articula com a quinta e com o organizador?',
        },
        answer: {
          en: 'Through the timing plan. It is agreed with you a month before and shared with whoever runs the day, so the caterer knows when the couple disappears for portraits and the photographer knows when the speeches start. Questions about rooms, access and restrictions go to the venue directly the week before.',
          pt: 'Através do plano de horários. É acordado consigo um mês antes e partilhado com quem gere o dia, para que o catering saiba quando os noivos saem para os retratos e o fotógrafo saiba quando começam os discursos. As perguntas sobre salas, acessos e restrições vão directamente à quinta na semana anterior.',
        },
      },
      {
        question: {
          en: 'What happens after the ten hours?',
          pt: 'O que acontece depois das dez horas?',
        },
        answer: {
          en: 'Coverage ends in the first hour of the party, which is where the photographs stop improving: the first dance, the first full dance floor, the people you will want to remember were there. The plan is built so that nothing you care about falls after that point.',
          pt: 'A cobertura acaba na primeira hora da festa, que é onde as fotografias deixam de melhorar: a primeira dança, a primeira pista cheia, as pessoas que vai querer lembrar que lá estavam. O plano é feito para que nada importante fique para depois disso.',
        },
      },
      {
        question: {
          en: 'What if it rains on the wedding day?',
          pt: 'E se chover no dia do casamento?',
        },
        answer: {
          en: 'The timing plan already has an answer: a covered place for the portraits, chosen when the venue is asked its questions the week before. A cloister, a covered terrace or a barn doorway with daylight coming in all work, and a few minutes outside under umbrellas usually makes the frame of the day.',
          pt: 'O plano de horários já tem a resposta: um sítio coberto para os retratos, escolhido quando se fazem as perguntas à quinta na semana anterior. Um claustro, um alpendre ou a porta de um celeiro com luz a entrar resultam, e uns minutos lá fora com guarda-chuvas costumam dar a fotografia do dia.',
        },
      },
      {
        question: {
          en: 'Can our guests have the photographs?',
          pt: 'Os convidados podem ficar com as fotografias?',
        },
        answer: {
          en: 'Yes. The gallery is private, but the link is yours to send, and the photographs can be downloaded and shared freely for personal use — printed, posted, sent to anyone who was there.',
          pt: 'Sim. A galeria é privada, mas o link é seu para enviar, e as fotografias podem ser descarregadas e partilhadas livremente para uso pessoal — impressas, publicadas, enviadas a quem lá esteve.',
        },
      },
      {
        question: {
          en: 'We have not chosen a venue yet. Is it too early to book?',
          pt: 'Ainda não escolhemos o local. É cedo para reservar?',
        },
        answer: {
          en: 'No — it is the best moment to talk. Knowing which way a terrace faces and what time the sun leaves the garden is worth having before you sign, and it costs nothing to ask. Braga’s quintas in the Cávado valley and the Douro in harvest season behave very differently at six in the evening.',
          pt: 'Não — é a melhor altura para falarmos. Saber para onde está virado um terraço e a que horas o sol sai do jardim vale a pena antes de assinar, e perguntar não custa nada. As quintas do vale do Cávado, em Braga, e o Douro em vindima comportam-se de forma muito diferente às seis da tarde.',
        },
      },
    ],
  },

  elopement: {
    promise: {
      en: 'Five hours around the two of you and the places you came for, arranged by the light and the weather rather than a room booking — 200 photographs in two weeks.',
      pt: 'Cinco horas à volta dos dois e dos sítios que vieram ver, organizadas pela luz e pelo tempo e não pela reserva de uma sala — 200 fotografias em duas semanas.',
    },
    audience: {
      en: [
        {
          title: 'Couples who do not want an audience',
          text: 'No speeches, no seating plan and no one to entertain. The day is for the two of you, and a dozen people at most if you want them there.',
        },
        {
          title: 'Couples who married at home and want the day here',
          text: 'The paperwork already done somewhere else, and a morning on a cliff in Portugal to mark it properly. The coverage is the same whether the vows are legal or not.',
        },
        {
          title: 'People who picked the landscape first',
          text: 'Sete Cidades in the Azores, the ridge at Pico do Arieiro above the cloud, the forest of the Serra de Sintra in mist. When the place is the point, the timing has to follow it.',
        },
      ],
      pt: [
        {
          title: 'Casais que não querem plateia',
          text: 'Sem discursos, sem plano de mesas e sem ninguém para entreter. O dia é dos dois, e de uma dúzia de pessoas no máximo, se as quiserem lá.',
        },
        {
          title: 'Quem já casou no papel e quer o dia aqui',
          text: 'A parte legal tratada noutro sítio, e uma manhã numa arriba em Portugal para o assinalar como deve ser. A cobertura é a mesma, os votos tenham ou não valor legal.',
        },
        {
          title: 'Quem escolheu primeiro a paisagem',
          text: 'As Sete Cidades nos Açores, a crista do Pico do Arieiro acima das nuvens, a mata da Serra de Sintra com nevoeiro. Quando o sítio é o que interessa, a hora tem de ir atrás dele.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Tell us the place, or the kind of place',
          text: 'Sea, mountain, forest, city — or a specific spot you have seen. We come back with what works at which hour, and what needs a ticket or written authorisation.',
        },
        {
          title: 'Shape the five hours',
          text: 'Getting ready or not, one location or two within an hour’s drive, vows at sunrise or at the end of the day. The order is set by the light, and there is no one else’s timetable to fit.',
        },
        {
          title: 'Keep a second morning in hand',
          text: 'An elopement can move by a day. Watch the forecast together in the last forty-eight hours and choose the better morning — in the Azores and Madeira this is how it is done, not a fallback.',
        },
        {
          title: 'The day, then two weeks',
          text: 'Five hours photographed as it happens, with portraits wherever the light is best. 200 retouched photographs arrive in a private gallery within two weeks.',
        },
      ],
      pt: [
        {
          title: 'Diga-nos o sítio, ou o tipo de sítio',
          text: 'Mar, montanha, floresta, cidade — ou um lugar concreto que viu. Respondemos com o que resulta a que hora, e com o que precisa de bilhete ou de autorização escrita.',
        },
        {
          title: 'Dar forma às cinco horas',
          text: 'Com ou sem preparativos, um local ou dois a menos de uma hora de carro, votos ao nascer do sol ou ao fim do dia. A ordem é a da luz, e não há horário de mais ninguém a cumprir.',
        },
        {
          title: 'Guardar uma segunda manhã',
          text: 'Um casamento íntimo pode mudar de dia. Acompanham a previsão connosco nas últimas quarenta e oito horas e escolhem a melhor manhã — nos Açores e na Madeira é assim que se faz, não é um plano B.',
        },
        {
          title: 'O dia, e depois duas semanas',
          text: 'Cinco horas fotografadas à medida que acontecem, com retratos onde a luz estiver melhor. As 200 fotografias retocadas chegam numa galeria privada em duas semanas.',
        },
      ],
    },
    prepare: {
      en: [
        'Book accommodation that lets you stay one night longer, so the second morning is real.',
        'Bring a warm layer for sunrise at altitude — Pico do Arieiro is cold in the hour before the sun comes up.',
        'Wear shoes you can walk a trail in and carry the ceremony shoes; change at the spot.',
        'Write the vows on paper, not on a phone. Paper photographs; a lit screen does not.',
        'Allow for the drive and the parking, not just the distance: the car park at Pico do Arieiro fills before sunrise.',
        'If a place needs a ticket or authorisation, have it confirmed in writing before the date is fixed.',
      ],
      pt: [
        'Reserve alojamento que permita ficar mais uma noite, para a segunda manhã ser mesmo possível.',
        'Leve um agasalho para o nascer do sol em altitude — no Pico do Arieiro faz frio na hora antes de o sol nascer.',
        'Calce sapatos para andar num trilho e leve os da cerimónia à parte; troca-se no local.',
        'Escreva os votos em papel e não no telemóvel. O papel fica bem na fotografia; um ecrã aceso não.',
        'Conte com a viagem e o estacionamento, não só com a distância: o parque do Pico do Arieiro enche antes do nascer do sol.',
        'Se um sítio precisar de bilhete ou autorização, tenha-o confirmado por escrito antes de fixar a data.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Can we bring a few guests?',
          pt: 'Podemos levar alguns convidados?',
        },
        answer: {
          en: 'Up to about a dozen. Beyond that the day starts to need a schedule — transport, a meal, people waiting — and loses the freedom that makes an elopement worth doing. If the list keeps growing, the wedding coverage is the better fit.',
          pt: 'Até cerca de uma dúzia. A partir daí o dia começa a precisar de horário — transporte, uma refeição, gente à espera — e perde a liberdade que faz valer a pena um casamento íntimo. Se a lista continuar a crescer, a cobertura de casamento é mais adequada.',
        },
      },
      {
        question: {
          en: 'Can we have the ceremony inside the Sintra palaces?',
          pt: 'Podemos fazer a cerimónia dentro dos palácios de Sintra?',
        },
        answer: {
          en: 'Professional photography inside Pena, Monserrate and the Castelo dos Mouros needs written authorisation from Parques de Sintra, with a fee; Quinta da Regaleira is a separate operator with its own. It is possible but it is planned first. The Serra itself — the forest roads above the village, in mist — needs nothing at all.',
          pt: 'A fotografia profissional dentro da Pena, de Monserrate e do Castelo dos Mouros precisa de autorização escrita da Parques de Sintra, com taxa; a Quinta da Regaleira é outro operador, com autorização própria. É possível, mas planeia-se primeiro. A serra em si — as estradas da mata acima da vila, com nevoeiro — não precisa de nada.',
        },
      },
      {
        question: {
          en: 'What if both mornings are bad?',
          pt: 'E se as duas manhãs estiverem más?',
        },
        answer: {
          en: 'Then the location changes rather than the date. In the Azores one crater lake is often clear when the other is not; in Madeira, Fanal only works in fog, so a grey day is the day to go there. Part of scouting is having that second place ready.',
          pt: 'Então muda o local e não a data. Nos Açores uma lagoa está muitas vezes limpa quando a outra não está; na Madeira, o Fanal só resulta com nevoeiro, por isso um dia cinzento é o dia de lá ir. Ter esse segundo sítio pronto faz parte do reconhecimento.',
        },
      },
      {
        question: {
          en: 'Does the photographer help with who officiates or what we say?',
          pt: 'O fotógrafo ajuda com quem celebra ou com o que dizemos?',
        },
        answer: {
          en: 'Not with the ceremony itself — that is yours. What we do is make sure it happens somewhere it can be heard and photographed: out of the wind, facing the light, with the celebrant and any guests standing where they will not block you.',
          pt: 'Com a cerimónia em si não — essa é vossa. O que fazemos é garantir que acontece num sítio onde se ouve e se fotografa: abrigado do vento, virado para a luz, com o celebrante e os convidados colocados onde não vos tapam.',
        },
      },
    ],
  },

  'destination-wedding': {
    promise: {
      en: 'Plan the wedding from home, meet us the day before: a scouting visit, twelve hours on the day and 500 photographs in a private gallery within three weeks.',
      pt: 'Planeie o casamento a partir de casa e encontre-nos na véspera: visita de reconhecimento, doze horas no dia e 500 fotografias em três semanas.',
    },
    audience: {
      en: [
        {
          title: 'Couples who have never seen the venue in person',
          text: 'You chose a quinta in the Douro or a house in Comporta from photographs and a video call. The scouting visit the day before is where what you imagined is checked against what is there.',
        },
        {
          title: 'Families flying in from several countries',
          text: 'Guests arriving on different flights, a ceremony in the afternoon, a party that runs late. Twelve hours covers a longer day than a local wedding, because guests who travelled this far do not leave early.',
        },
        {
          title: 'Couples unsure what is legally required',
          text: 'Most advice online is written for France or Italy. You get a written answer on what your ceremony does and does not require in Portugal before you book anything else.',
        },
      ],
      pt: [
        {
          title: 'Noivos que nunca viram o local ao vivo',
          text: 'Escolheram uma quinta no Douro ou uma casa na Comporta por fotografias e videochamada. A visita de reconhecimento na véspera é onde o que imaginaram se confronta com o que lá está.',
        },
        {
          title: 'Famílias que chegam de vários países',
          text: 'Convidados em voos diferentes, uma cerimónia à tarde, uma festa que acaba tarde. Doze horas cobrem um dia mais longo do que um casamento local, porque quem viajou até cá não sai cedo.',
        },
        {
          title: 'Noivos com dúvidas sobre o que a lei exige',
          text: 'Quase tudo o que se lê está escrito para França ou Itália. Recebe por escrito o que a sua cerimónia exige e não exige em Portugal antes de reservar mais nada.',
        },
      ],
    },
    process: {
      en: [
        {
          title: 'Start with the legal question',
          text: 'Tell us your nationalities and whether you want a civil, religious or symbolic ceremony. The written answer comes first, because it decides whether the date needs a conservatória.',
        },
        {
          title: 'Plan it all by message and call',
          text: 'Venue, ceremony time, portrait locations and the group-photo list are agreed remotely with you and your planner. Nobody needs to fly out beforehand to meet us.',
        },
        {
          title: 'The scouting visit, the day before',
          text: 'The photographer walks the venue at the hours that matter, finds where the light is at five and where it has gone by seven, and meets the coordinator. Anything that changes the plan is settled that evening.',
        },
        {
          title: 'Twelve hours, then 500 photographs in three weeks',
          text: 'From getting ready to well into the party. The private gallery arrives within three weeks, and the link can go straight to guests in every country.',
        },
      ],
      pt: [
        {
          title: 'Começar pela questão legal',
          text: 'Diga-nos as vossas nacionalidades e se querem cerimónia civil, religiosa ou simbólica. É o primeiro ponto, porque decide se a data depende de uma conservatória.',
        },
        {
          title: 'Planear tudo por mensagem e videochamada',
          text: 'O local, a hora da cerimónia, os sítios dos retratos e a lista de fotografias de grupo acertam-se à distância, consigo e com o organizador. Ninguém precisa de cá vir antes para nos conhecer.',
        },
        {
          title: 'A visita de reconhecimento, na véspera',
          text: 'O fotógrafo percorre o local às horas que interessam, vê onde está a luz às cinco e para onde foi às sete, e conhece o coordenador. O que mudar o plano resolve-se nessa noite.',
        },
        {
          title: 'Doze horas, e 500 fotografias em três semanas',
          text: 'Dos preparativos até bem dentro da festa. A galeria privada chega em três semanas, e o link pode seguir directamente para convidados em qualquer país.',
        },
      ],
    },
    prepare: {
      en: [
        'Send your planner’s and venue coordinator’s contacts early, so questions go to them and not through you.',
        'Put the scouting visit in your own schedule too — an hour with the couple at the venue saves an hour on the day.',
        'Collect guests’ arrival times in one place; the timing plan needs to know who is there for the morning.',
        'Pack the rings, vows and anything heirloom in hand luggage, not in the hold.',
        'Ask the venue now whether there is a covered space with daylight, in case the weather turns.',
        'Confirm the document list with the conservatória you will use, not with an article.',
      ],
      pt: [
        'Envie cedo os contactos do organizador e do coordenador do local, para as perguntas irem para eles e não passarem por si.',
        'Ponha também a visita de reconhecimento na sua agenda — uma hora com os noivos no local poupa uma hora no dia.',
        'Junte num só sítio as horas de chegada dos convidados; o plano de horários precisa de saber quem está lá de manhã.',
        'Leve as alianças, os votos e qualquer peça de família na bagagem de mão, não no porão.',
        'Pergunte já ao local se há um espaço coberto com luz natural, para o caso de o tempo mudar.',
        'Confirme a lista de documentos com a conservatória que vai usar, e não com um artigo.',
      ],
    },
    faqs: [
      {
        question: {
          en: 'Do you handle the marriage paperwork for us?',
          pt: 'Tratam dos documentos do casamento por nós?',
        },
        answer: {
          en: 'No. You get a written answer on what your ceremony does and does not require, so you know which route you are on before booking anything. The process itself runs through a Conservatória do Registo Civil, and the current document list is confirmed with them.',
          pt: 'Não. Recebe uma resposta escrita sobre o que a sua cerimónia exige e não exige, para saber que caminho está a seguir antes de reservar o resto. O processo em si corre numa Conservatória do Registo Civil, e a lista de documentos em vigor confirma-se com ela.',
        },
      },
      {
        question: {
          en: 'Which part of Portugal should we choose?',
          pt: 'Que zona de Portugal devemos escolher?',
        },
        answer: {
          en: 'It depends on the month more than the map. The Algarve is unusable in the middle of a July day and at its best in October; Sintra is misty from October to April; the Douro is at its fullest in harvest season. Tell us the date you are considering and we will say which regions suit it.',
          pt: 'Depende mais do mês do que do mapa. O Algarve é inutilizável a meio de um dia de Julho e está no seu melhor em Outubro; Sintra tem nevoeiro de Outubro a Abril; o Douro está no auge na vindima. Diga-nos a data que tem em mente e dizemos-lhe que regiões lhe servem.',
        },
      },
      {
        question: {
          en: 'What exactly happens on the scouting visit?',
          pt: 'O que acontece exactamente na visita de reconhecimento?',
        },
        answer: {
          en: 'The photographer walks the ceremony site, the portrait locations and the party space at roughly the hours they will be used, and checks them against the timing plan. It is where a courtyard that looked perfect in the brochure turns out to be in shade by five, and where the alternative is chosen.',
          pt: 'O fotógrafo percorre o local da cerimónia, os sítios dos retratos e o espaço da festa mais ou menos às horas em que vão ser usados, e confronta-os com o plano de horários. É aí que um pátio que parecia perfeito no catálogo afinal está à sombra às cinco, e é aí que se escolhe a alternativa.',
        },
      },
      {
        question: {
          en: 'We cannot visit Portugal before the wedding. Is that a problem?',
          pt: 'Não conseguimos vir a Portugal antes do casamento. É um problema?',
        },
        answer: {
          en: 'No. The service is built for exactly that. Everything before the scouting visit happens by message and call, and the visit itself is done by the photographer the day before, so the first time you are on site together is when it counts.',
          pt: 'Não. O serviço foi pensado exactamente para isso. Tudo o que antecede a visita de reconhecimento faz-se por mensagem e videochamada, e a visita é feita pelo fotógrafo na véspera, por isso a primeira vez que estão juntos no local é quando interessa.',
        },
      },
      {
        question: {
          en: 'Can guests who could not travel see the photographs?',
          pt: 'Os convidados que não puderam viajar podem ver as fotografias?',
        },
        answer: {
          en: 'Yes. The gallery is private but the link is yours to share, and the photographs can be downloaded and passed on freely for personal use — to grandparents, to friends who stayed home, to anyone on the guest list in any country.',
          pt: 'Sim. A galeria é privada mas o link é seu para partilhar, e as fotografias podem ser descarregadas e passadas livremente para uso pessoal — aos avós, aos amigos que ficaram, a qualquer pessoa da lista em qualquer país.',
        },
      },
    ],
  },
};
