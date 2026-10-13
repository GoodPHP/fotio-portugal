import type { CityLeafCopy } from './index';

/** `service × cascais` pages in Portuguese, keyed by canonical service id. */
export const CASCAIS_PT: CityLeafCopy = {
  portrait: {
    title: 'Retrato de Estúdio em Cascais desde {price}',
    description:
      'Retrato de estúdio para quem vive em Cascais e na Linha: luz controlada, sem vento, {photos} fotografias retocadas escolhidas consigo. Desde {price}.',
    intro:
      'Quem procura um retrato de estúdio em Cascais raramente quer o mar na fotografia. Quer uma imagem séria para o site do escritório, para a candidatura a um cargo novo, para a página da Ordem ou para o currículo de um livro, e mora aqui porque escolheu a costa para viver, não para aparecer nela. A sessão dura {duration}, com um esquema de luz que o fotógrafo vai acertando entre disparos, um fundo neutro e as imagens a passar no ecrã enquanto se trabalha. Em terra de nortada, a vantagem de uma sala fechada percebe-se depressa: o cabelo fica onde foi penteado e ninguém aperta os olhos contra o sol.',
    where:
      'Não há paisagem nesta sessão, e é bom dizê-lo com franqueza. A morada do estúdio é indicada quando o fotógrafo é confirmado, normalmente no mesmo dia útil, e convém olhar para ela a pensar no trajecto: quem mora no Estoril, em Carcavelos, na Parede ou em Oeiras tem a mesma linha de comboio à porta, e quem vem de carro deve contar com o trânsito da Marginal em dias de praia. Se a ideia for, afinal, ter a baía ou a vila velha por trás, o serviço certo é o retrato lifestyle, feito na rua ao mesmo preço. O estúdio serve a fotografia que tem de encaixar ao lado das dos colegas, ou que um designer vai recortar e pôr numa capa.',
    when:
      'A hora conta pouco quando a luz é artificial; conta o seu estado. Uma marcação antes de começar o dia de trabalho dá, quase sempre, uma cara mais descansada do que um intervalo entre reuniões. Há um pormenor de quem vive junto ao mar: em Julho e Agosto, a marca do fato de banho, o nariz queimado e o cabelo endurecido pelo sal aparecem todos na fotografia. Para um retrato que vai durar anos, marque-o antes das semanas de praia, ou deixe passar alguns dias depois delas.',
    faqs: [
      {
        question: 'Preciso do retrato para um processo de candidatura. Chega a tempo?',
        answer:
          'A escolha das imagens faz-se no fim da sessão, à frente do ecrã, por isso não fica nada pendente da sua parte. As fotografias retocadas chegam à galeria em {delivery}, o que normalmente dá para cumprir um prazo de entrega na mesma semana. Diga-nos a data limite ao marcar.',
      },
      {
        question: 'Uso óculos. Os reflexos da luz são um problema?',
        answer:
          'Com luz de estúdio controla-se bem: o fotógrafo ajusta o ângulo da fonte e a inclinação da cabeça até o reflexo sair das lentes. Traga os óculos que usa no dia-a-dia, limpos, e diga logo no início se prefere ter algumas imagens sem eles, para decidir com calma no fim.',
      },
      {
        question: 'Posso fazer retratos para mim e para o meu sócio na mesma marcação?',
        answer:
          'Pode, mas cada pessoa conta como uma sessão, com o seu tempo e as suas fotografias. Se o objectivo for que os dois retratos fiquem iguais no site, peça-o ao marcar: mantém-se o fundo, a luz e o enquadramento de um para o outro.',
      },
    ],
  },

  'lifestyle-portrait': {
    title: 'Retrato Lifestyle em Cascais',
    description:
      'Retrato lifestyle em Cascais, feito a andar junto à baía ou na marina, sem fundo de estúdio. {photos} fotografias retocadas desde {price}, num só local.',
    intro:
      'O retrato lifestyle em Cascais faz sentido para quem quer que a fotografia diga onde vive e como trabalha: a professora de ioga que dá aulas junto ao mar, o arquitecto que deixou Lisboa e trabalha de casa na Parede, a autora que precisa de uma imagem para a contracapa que não pareça tirada num corredor. São {duration} na rua, em movimento, com o fotógrafo a dar indicações pequenas – onde parar, para onde olhar – em vez de montar uma pose. A vila ajuda por uma razão simples: é plana à beira-mar, e um retrato a caminhar sai mais natural quando não se está a subir uma calçada inclinada.',
    where:
      'Escolha um sítio só; meia hora não chega para mudar de cenário. A baía é a escolha mais segura, abrigada e virada a sul, com as casas da vila velha por trás e os barcos de pesca na areia a darem contexto sem roubar atenção. A marina dá um retrato mais limpo e gráfico, com mastros e linhas direitas, e fica bem a quem trabalha em áreas como design ou consultoria. O Guincho é a opção para um retrato de vento e Atlântico aberto, com dunas e a serra ao fundo; escolhe-se de propósito, sabendo que o cabelo não vai ficar quieto, e só ao início do dia.',
    when:
      'A baía, por estar virada a sul, mantém luz bonita até mais tarde de manhã do que os miradouros de Lisboa, o que permite marcar às dez sem perder qualidade. A marina pede o fim do dia, com o sol a descer do lado aberto. O Guincho é sempre de manhã cedo: na estação quente, a nortada sobe ao longo da tarde. Para quem pode escolher a data, a Primavera e o princípio do Outono dão temperatura agradável, vila menos cheia e nenhum dos engarrafamentos de Agosto.',
    faqs: [
      {
        question: 'Moro na Linha. A sessão pode ser perto de minha casa em vez de na baía?',
        answer:
          'Pode, desde que seja dentro da zona coberta – Estoril, Carcavelos, Parede, Oeiras ou a própria vila – e que seja um só local. Diga-nos o que tem perto de casa ao marcar; o fotógrafo avalia a luz desse sítio à hora proposta antes de confirmar.',
      },
      {
        question: 'E se estiver muito vento no dia marcado?',
        answer:
          'Na baía raramente se nota, porque a vila a protege. No Guincho, um pouco de vento é o que se procura; uma ventania com areia no ar já não é, e nesse caso compensa trocar para a baía ou passar a sessão para outra manhã. Decide-se na véspera, com a previsão à frente.',
      },
      {
        question: 'Que roupa resulta melhor com o mar por trás?',
        answer:
          'O azul já está no fundo, por isso tons quentes ou neutros – terracota, areia, verde-seco – destacam-se melhor do que mais azul. Evite branco puro ao sol forte, que perde o pormenor, e sapatos de sola lisa: a calçada da vila escorrega mesmo com tempo seco.',
      },
    ],
  },

  couple: {
    title: 'Sessão de Casal em Cascais desde {price}',
    description:
      'Sessão de casal em Cascais ao fim da tarde na marina, com mar agitado na Boca do Inferno ou de manhã no Guincho. {photos} fotografias desde {price}.',
    intro:
      'Uma sessão de casal em Cascais é, para muitos casais de Lisboa, um pretexto para uma tarde fora: apanha-se o comboio no Cais do Sodré, sai-se a ver o rio e depois o mar, e a sessão acontece no fim, quando a luz baixa. Para quem já vive na Linha, é a fotografia de um aniversário, de uma casa nova, de dez anos juntos, feita no sítio onde os dois passeiam ao domingo. Dura {duration}, sempre no mesmo cenário, e passa-se mais tempo a caminhar lado a lado e a rir de alguma coisa do que parado à frente da objectiva. No fim, ficam imagens de um casal que não precisou de esticar o braço para aparecer junto, e que daqui a uns anos vão dizer mais sobre essa fase do que qualquer selfie.',
    where:
      'Há três sítios que funcionam bem para um casal, e cada um pede uma escolha. A marina é o mais fiável: aberta a poente, com mastros e passadiços, e continua a servir nos fins de tarde de Verão em que a praia ainda está cheia. A Boca do Inferno é a aposta: num dia calmo é um buraco nas rochas, mas com ondulação de oeste a espuma e o barulho dão às fotografias uma energia que a baía não tem. O Guincho é para quem aceita acordar cedo, com o Atlântico aberto, as dunas e a serra ao fundo, e nenhuma multidão.',
    when:
      'Na marina e na Boca do Inferno, a última hora antes do pôr do sol é a que interessa, e muda bastante entre Junho e Dezembro. O Guincho funciona ao contrário: da Primavera ao Outono a nortada vai crescendo à tarde, e a partir das quatro há areia a voar rente às pernas. As melhores alturas para esta costa ficam antes e depois do pico do Verão, quando ainda se está bem de camisa ao fim do dia e a Marginal anda sem filas.',
    faqs: [
      {
        question: 'Vimos de comboio de Lisboa. Dá para voltar depois do pôr do sol?',
        answer:
          'Sem problema: da marina ou do areal até à estação é um passeio curto, e o regresso ao Cais do Sodré faz-se colado ao rio. Só convém espreitar o horário do dia escolhido, porque à noite e aos domingos os intervalos entre comboios podem alongar-se.',
      },
      {
        question: 'Marcámos a Boca do Inferno e o mar está parado. E agora?',
        answer:
          'Nesse caso é o local mais fraco da lista, e vale a pena trocar antes de sair de casa. O fotógrafo vê a previsão da ondulação na véspera; sem mar de oeste, mudar para a marina à mesma hora mantém a luz e não se perde nada.',
      },
      {
        question: 'Podemos levar o cão?',
        answer:
          'Podem, e muitas vezes as melhores fotografias são com ele. Tragam trela, água e alguém que o leve no fim se ele não aguentar a sessão toda. Na marina e no passeio junto à baía o chão é firme; no Guincho, um cão solto na areia é óptimo para movimento e péssimo para a roupa.',
      },
    ],
  },

  proposal: {
    title: 'Fotógrafo para Pedido de Casamento em Cascais',
    description:
      'Pedido de casamento em Cascais fotografado à distância, na baía, na marina ou na Boca do Inferno, e depois uns minutos a dois. Galeria em {delivery}.',
    intro:
      'Contratar um fotógrafo para um pedido de casamento em Cascais joga a favor de quem planeia: à beira-mar, ninguém repara numa pessoa de câmara ao pescoço. A baía e o passeio marítimo estão sempre com gente a fotografar, e um fotógrafo de teleobjectiva passa despercebido até ao momento em que o anel aparece. O pedido é fotografado de longe, sem interferência; depois o fotógrafo aproxima-se e o tempo restante dos {duration} vira um passeio fotografado a dois, já com o anel no dedo e as mãos ainda a tremer. Para um casal lisboeta, a própria viagem serve de disfarce: um almoço de peixe, uma ida à praia num dia de folga, um passeio de comboio sem motivo aparente. Ninguém desconfia de um sábado em Cascais, e é exactamente essa normalidade que protege a surpresa até ao último segundo.',
    where:
      'O sítio tem de servir duas coisas: ficar bonito e deixar o fotógrafo esconder-se perto. A baía cumpre ambas, com os barcos varados e a vila velha como enquadramento, e um passeio largo onde é fácil ficar parado sem chamar a atenção. Os pontões da marina servem quem prefere o entardecer, com o horizonte limpo a oeste e casais a passear que tornam qualquer espera invisível. A Boca do Inferno impressiona em dia de mar, mas é barulhenta e a espuma chega onde não se espera; faça o pedido bem afastado da beira, sobretudo com um anel na mão.',
    when:
      'A hora segue o local. Graças à orientação a sul, a baía continua luminosa e suave pela manhã fora, e um pedido às dez e meia fica tão bonito como um ao entardecer. Na marina, guarde o momento para quando o sol estiver a tocar a linha do mar. A Boca do Inferno quer fim de tarde e ondulação, por isso só se confirma depois de ver a previsão. Quem quer privacidade foge aos sábados e domingos de Agosto: numa terça-feira de Junho ou Setembro, a vila tem a mesma claridade e muito menos curiosos.',
    faqs: [
      {
        question: 'Como é que o fotógrafo nos reconhece no meio das pessoas?',
        answer:
          'Combina-se na véspera um ponto exacto e um minuto, e envia-se uma fotografia sua e a descrição da roupa da outra pessoa. No dia, o fotógrafo chega antes e fica posicionado; só tem de parar no ponto combinado, à hora combinada, e deixar o resto acontecer.',
      },
      {
        question: 'Queremos fazer o pedido com a família escondida por perto. Resulta?',
        answer:
          'Funciona muito bem, e as caras de quem estava escondido costumam render algumas das melhores imagens. O truque é definir um sinal para a família só surgir depois da resposta, de modo a que o instante a dois fique gravado primeiro, limpo, sem tios a entrar pelo enquadramento.',
      },
      {
        question: 'E se chover no dia do pedido?',
        answer:
          'Céu nublado até ajuda, porque afasta gente do paredão. Com aguaceiros a sério, o melhor é ter acordado uma data alternativa logo na reserva: improvisar um plano B com uma caixinha no bolso e o céu a fechar é a receita para um pedido nervoso.',
      },
    ],
  },

  family: {
    title: 'Fotógrafo de Família em Cascais',
    description:
      'Fotografia de família em Cascais na baía abrigada, de manhã, ao ritmo das crianças. {photos} fotografias retocadas desde {price}, num só local, sem pressas.',
    intro:
      'Um fotógrafo de família em Cascais trabalha sobretudo num cenário: a baía, plana, abrigada e com água mansa, onde uma criança de dois anos pode correr até à beira sem que ninguém entre em pânico. Para as famílias que vivem aqui ou passam os Verões na Linha, a fotografia não é de uma viagem, é da praia de todos os sábados, o que lhe dá outro peso daqui a vinte anos. A sessão tem {duration}, segue as crianças em vez de uma lista de poses, e acaba antes de alguém se cansar. Avós, tios e primos cabem, desde que se combine antes.',
    where:
      'Para crianças pequenas, a baía é quase sempre a resposta certa: virada a sul, protegida do vento, com areia lisa e os barcos de pesca puxados para cima, que dão às crianças alguma coisa para apontar e aos adultos alguma coisa onde encostar. Com filhos mais crescidos, que aguentam vento e gostam de correr, o Guincho dá espaço aberto nas dunas e um Atlântico que não parece praia de vila; é marcação de manhã cedo. A marina fica para famílias com crianças já fora da idade de comer areia, que preferem uma sessão ao fim da tarde, com chão firme.',
    when:
      'De manhã, antes da sesta e antes do calor, mas com uma particularidade local: a baía mantém luz boa até perto das onze, o que permite começar um pouco mais tarde sem cair no sol a pique. Em Julho e Agosto, a areia enche-se de gente vinda de Lisboa a partir de meio da manhã, e começar cedo garante praia vazia no fundo. Junho e Setembro dão água morna e menos gente. No Inverno a baía continua a funcionar, com as crianças agasalhadas contra a aragem.',
    faqs: [
      {
        question: 'As crianças podem ir à água durante a sessão?',
        answer:
          'Podem, mas no fim. Roupa molhada e pernas cheias de areia ficam lindas nas últimas imagens e estragam tudo o que vem a seguir. Traga muda de roupa e toalha, e deixe o fotógrafo dizer quando a parte seca está feita; para muitas crianças, o mergulho é o prémio dos últimos cinco minutos.',
      },
      {
        question: 'Somos três gerações. {duration} chegam para tanta gente?',
        answer:
          'Chegam, se a fotografia de grupo grande for feita logo no início, enquanto toda a gente está arranjada e paciente. Depois divide-se em combinações mais pequenas – avós com netos, cada casal com os filhos – sem sair do sítio. Mais pessoas significa menos imagens de cada uma, não uma sessão à pressa.',
      },
      {
        question: 'Podemos fazer a sessão no jardim de nossa casa?',
        answer:
          'Pode ser, se a casa for dentro da zona coberta e o jardim tiver sombra e espaço para correr. Envie umas fotografias do espaço ao marcar; o fotógrafo diz-lhe a que horas a luz lá é melhor, e se não compensar mais a baía a cinco minutos.',
      },
    ],
  },

  maternity: {
    title: 'Sessão de Gravidez em Cascais',
    description:
      'Sessão de gravidez em Cascais entre as 30 e as 36 semanas: passeio plano junto à baía, dunas do Guincho ou a sua sala. {photos} fotografias desde {price}.',
    intro:
      'Marcar uma sessão de gravidez em Cascais resolve logo um problema que em Lisboa é real: as subidas. Na recta final, uma rampa de calçada pesa mais do que qualquer miradouro, e aqui a beira-mar é plana de ponta a ponta, com bancos e muretes a cada poucos metros para descansar. A sessão dura {duration} e anda ao ritmo que o corpo pedir. Quem marca aqui é, muitas vezes, uma família que trocou a cidade pela Linha e quer que estas imagens mostrem precisamente isso: a barriga, a luz do mar, a casa nova à espera. Fotografar dentro de casa também é possível, e falamos disso mais abaixo.',
    where:
      'Para uma manhã tranquila, a baía é imbatível: resguardada do vento, de areia macia e água lisa, o que deixa um vestido comprido cair sem dar trabalho. O Guincho é a escolha contrária, feita de propósito por quem quer força na imagem: oceano aberto, dunas, a serra ao fundo e uma aragem que faz o tecido flutuar sozinho. Tem de ser cedo, e caminhar na areia solta perto do termo cansa mais do que se imagina. A marina, de piso firme e horizonte a poente, fica como plano para o fim do dia, quando o areal ainda está cheio de veraneantes.',
    when:
      'A melhor semana é entre a trigésima e a trigésima sexta, e a melhor hora depende do calor. No Verão, ao ar livre, só as primeiras horas ou a última antes do pôr do sol são suportáveis; a baía, de frente para sul, torna a manhã a opção mais simples. No Guincho, conte terminar antes de o vento norte acordar. A Primavera e o início do Outono são as estações mais agradáveis para isto nesta costa. Em pleno Inverno, a baía ainda serve num dia limpo, e a sala de casa é o plano quente.',
    faqs: [
      {
        question: 'Posso incluir o meu companheiro e o nosso primeiro filho?',
        answer:
          'Deve, pelo menos numa parte. Um irmão mais velho a encostar a orelha à barriga, ou de mão dada com a mãe na beira de água, rende muitas vezes as imagens favoritas da família. Avise quem vem ao fazer a reserva, para os primeiros minutos ficarem só para si.',
      },
      {
        question: 'E se me mandarem fazer repouso antes do dia?',
        answer:
          'Ninguém perde nada: troca-se a data sem qualquer custo, e a indicação médica vem sempre primeiro. Vale o mesmo para uma noite em branco ou tornozelos inchados nessa manhã. Mande mensagem assim que souber e encontramos outro dia, se possível com o mesmo fotógrafo.',
      },
      {
        question: 'Prefiro fazer em casa. A minha sala tem luz que chegue?',
        answer:
          'Quase sempre sim, desde que tenha uma janela generosa e se escolha a hora em que ela recebe mais claridade. Conte-nos para onde está virada e quando entra o sol; a marcação ajusta-se a isso. Dentro ou fora de casa, o valor é o mesmo e recebe as mesmas {photos} imagens tratadas.',
      },
    ],
  },

  newborn: {
    title: 'Fotógrafo de Recém-Nascido em Cascais',
    description:
      'Fotografia de recém-nascido em Cascais, Estoril, Carcavelos e Oeiras: em sua casa nas duas primeiras semanas, à luz da janela. {photos} fotos desde {price}.',
    intro:
      'Chamar um fotógrafo de recém-nascido em Cascais significa recebê-lo em casa durante os primeiros quinze dias de vida, montando tudo ao lado da janela mais clara e parando sempre que o bebé pedir mama. Não há adereços, nem poses forçadas, nem o bebé passado de cesto em cesto. Para muitas famílias da Linha, com os avós noutra cidade ou noutro país, há ainda uma razão prática: a galeria chega em {delivery} e o link pode seguir para quem não está por perto nesses primeiros dias. São {duration}, mas quem manda no relógio é o bebé: se adormecer ao colo do pai, espera-se; se acordar com fome, pára-se. Nada é apressado, e é isso que dá às imagens o ar sossegado que se procura.',
    where:
      'A sessão é dentro de casa, e assim deve ser: um bebé com dias pertence ao quente, junto aos pais, longe do vento da costa. O local é a divisão com a melhor janela, que em muitas casas desta zona é a que dá para sul, mas cada casa é diferente, por isso descreva-a ao marcar. O fotógrafo desloca-se a Cascais, Estoril, Parede, Carcavelos, Oeiras e até à Malveira da Serra, com a deslocação dentro dessa área incluída. O mar fica guardado para uma sessão de família daqui a uns meses, quando o bebé já segurar a cabeça.',
    when:
      'A janela certa mede-se em dias de vida: até por volta do décimo quarto, o bebé ainda se enrola sozinho como estava na barriga. Durante o dia, escolha a hora em que a sala tem mais luz sem sol directo no chão, o que em muitas casas daqui é o fim da manhã. No Verão o calor não é problema; no Inverno os dias são curtos, por isso aponte para perto do meio-dia e aqueça a divisão antes. Reserve durante a gravidez indicando o termo previsto, e fixe o dia exacto quando o bebé tiver nascido.',
    faqs: [
      {
        question: 'O bebé nasceu antes do previsto. A marcação ainda serve?',
        answer:
          'Serve: a data é sempre provisória até ao nascimento. Avise-nos quando o bebé chegar e escolhe-se um dia dentro das duas primeiras semanas, quando a mãe se sentir capaz. Se houver internamento mais longo, a sessão espera e adapta-se ao que for possível.',
      },
      {
        question: 'Os irmãos mais velhos podem participar?',
        answer:
          'Podem e devem, logo no início, enquanto estão interessados. Um irmão sentado no sofá com o bebé ao colo, com um adulto ao lado, é muitas vezes a fotografia que fica na parede. Depois podem sair da sala e o resto da sessão segue ao ritmo do recém-nascido.',
      },
      {
        question: 'Temos de arrumar a casa toda?',
        answer:
          'Não. Basta a divisão onde se vai fotografar, e mesmo essa só precisa de ter a cama ou o sofá livres e a janela desimpedida. O fotógrafo enquadra de forma a deixar de fora o que não interessa; ninguém espera uma casa de revista duas semanas depois de um parto.',
      },
    ],
  },

  batizado: {
    title: 'Fotógrafo de Batizado em Cascais',
    description:
      'Fotógrafo de batizado em Cascais: {duration} de cobertura, missa e almoço, e dez minutos de retratos junto ao mar pelo caminho. {photos} fotografias, {price}.',
    intro:
      'Quem procura fotógrafo de batizado em Cascais quer, no essencial, o mesmo que em qualquer paróquia do país: o bebé ao colo dos padrinhos, a água benta, os avós emocionados, a mesa comprida depois. São {duration} de reportagem e {photos} imagens tratadas, entregues no prazo de {delivery}. O que muda aqui é o cenário à volta. Numa vila onde o mar está a dois passos de tanta coisa, consegue-se encaixar um retrato da família inteira com a água por trás sem sacrificar nada do resto do dia. As regras da igreja sobre flash e posições durante o rito ficam tratadas por nós com a paróquia antes da data; basta indicarem-nos onde é a cerimónia.',
    where:
      'Igreja e restaurante ficam por conta da família, e não fazemos recomendações de nenhum. O que vale a pena desenhar é o trajecto entre um e outro. Quando a celebração decorre numa igreja da vila ou do Estoril, o areal da baía e o paredão estão tão perto que uma paragem curta para os pais, padrinhos e avós, de frente para o mar, cabe sem esforço – e costuma ser a imagem que acaba emoldurada na sala. Se o almoço for para os lados da marina, os pontões fazem esse papel. Ir até ao Guincho com um bebé de poucos meses não compensa: vento, areia no ar e frio mesmo em dias de sol.',
    when:
      'É a paróquia que fixa a hora, e a reportagem conta desde o momento acordado. Uma celebração de manhã tem uma vantagem própria desta vila: a paragem junto à água apanha a baía ainda com luz suave vinda de sul, antes do sol forte. Com missa ao fim da manhã, o retrato de família passa a ser feito à sombra, encostado a uma parede da vila velha. No pico do Verão, proteja a cabeça do bebé em cada imagem exterior. Abril, Maio e o fim de Setembro são as alturas mais amenas para ter crianças pequenas ao ar livre nesta costa.',
    faqs: [
      {
        question: 'O padrinho vive no estrangeiro e só chega na véspera. Isso muda alguma coisa?',
        answer:
          'Muda apenas o planeamento dos retratos. Se houver familiares que raramente estão juntos, digam-nos quem são ao marcar; o fotógrafo garante que cada combinação importante – avós dos dois lados, padrinhos com o afilhado, primos vindos de fora – fica registada antes de o almoço dispersar as pessoas pelas mesas.',
      },
      {
        question: 'A celebração é partilhada com outras famílias. Como ficamos nas imagens?',
        answer:
          'Nas vistas largas da nave, as outras famílias aparecem, não há volta a dar. Mas os momentos centrais do vosso bebé – a água, a vela, os padrinhos – fotografam-se de ângulos escolhidos para isolar a vossa família, e os grupos fazem-se depois, cá fora, à porta da igreja ou já junto ao mar.',
      },
      {
        question: 'Temos receio de que a paragem na praia atrase o almoço.',
        answer:
          'Não atrasa se estiver combinada: dez minutos à saída da igreja, só com a família próxima, enquanto os restantes convidados seguem para a mesa. Avisem o restaurante de que os anfitriões chegam um pouco depois. O fotógrafo tem a lista de grupos preparada, por isso ninguém fica parado à espera.',
      },
    ],
  },

  wedding: {
    title: 'Fotógrafo de Casamento em Cascais desde {price}',
    description:
      'Fotógrafo de casamento em Cascais: {duration} dos preparativos à festa, retratos na baía ou na marina pensados para a nortada. {photos} fotos em {delivery}.',
    intro:
      'O fotógrafo de casamento em Cascais trabalha sobretudo para casamentos mais pequenos do que os do Minho: muitas vezes civis, muitas vezes com uma parte da família vinda de fora, com uma lista de convidados que cabe numa sala com vista para o mar. A cobertura é de {duration}, dos preparativos à primeira hora da festa, e acompanha o horário dos noivos. O que um fotógrafo que conhece esta costa acrescenta é saber prever: onde vai estar o sol à hora da cerimónia, quando é que o lado do Guincho começa a ventar, e como pôr os retratos dos noivos na luz certa.',
    where:
      'O espaço é escolha dos noivos e não indicamos nenhum. À volta dele, Cascais tem cenários para retratos a poucos minutos uns dos outros, e a hora decide qual se usa. A baía serve bem para um first look de manhã, com a luz a entrar do sul e os barcos de pesca na areia. A marina é a escolha natural para o fim do dia, com mastros e um céu limpo a poente, que fica bem a um vestido e a um fato escuro. O Guincho é o mais espectacular, mas na prática só funciona de manhã, e por isso serve a noivos dispostos a ver-se antes da cerimónia.',
    when:
      'Marque a cerimónia de forma a que os retratos caiam na última hora de luz: em Julho isso significa uma cerimónia ao fim da tarde, nunca a meio. Nos espaços expostos perto do Guincho há mais uma condicionante: da Primavera ao Outono a nortada ganha força todas as tardes, e uma cerimónia ao ar livre nesse lado vai senti-la. Os meses mais equilibrados são os que rodeiam o pico do Verão – quentes o suficiente para o copo-d’água no exterior, sem o trânsito de Agosto na Marginal.',
    faqs: [
      {
        question: 'Os convidados vêm de Lisboa. Isso muda alguma coisa nas fotografias?',
        answer:
          'Muda as chegadas. Quem vem de comboio chega em grupos, e o fotógrafo planeia as fotografias de entrada em função disso quando se fecha o plano de horários, um mês antes. Para o regresso à noite, vale a pena combinar transporte com o espaço, porque o comboio raramente coincide com o fim da festa.',
      },
      {
        question: 'Queremos fotografias de grupo com toda a família. Onde se fazem?',
        answer:
          'No espaço, logo a seguir à cerimónia, enquanto toda a gente está junta e arranjada. Prepare uma lista curta de grupos e um familiar que conheça toda a gente e vá chamando as pessoas; com isso, vinte grupos fazem-se em pouco tempo e não se rouba a hora de luz aos retratos dos noivos.',
      },
      {
        question: 'E se o dia amanhecer com nevoeiro ou chuva?',
        answer:
          'Céu encoberto não é problema: a luz difusa favorece toda a gente, e a baía fica abrigada mesmo quando o Atlântico está bravo. Para chuva a sério, os retratos passam para o espaço coberto e com luz natural que o espaço tenha, por isso pergunte já ao espaço que alternativa existe.',
      },
    ],
  },

  elopement: {
    title: 'Casamento Íntimo em Cascais',
    description:
      'Casamento íntimo em Cascais: votos no Guincho de manhã, retratos na baía ou na marina, até uma dúzia de convidados. {duration}, {photos} fotos, desde {price}.',
    intro:
      'Um casamento íntimo em Cascais é para quem já fez o registo na conservatória, ou vai fazê-lo, e quer um dia à beira-mar com os pais, os padrinhos e pouco mais. Sem quinta, sem cento e cinquenta convidados, sem horário a cumprir. A cobertura é de {duration}, e esse tempo dá para coisas que um casamento grande não deixa: começar no Guincho com o mar ainda calmo, almoçar na vila, acabar na marina com a luz a cair. Para os noivos de Lisboa, há a vantagem de tudo ficar a uma viagem de comboio da cidade.',
    where:
      'O desenho habitual usa dois sítios. O Guincho para os votos ou para os primeiros retratos, logo de manhã: areia aberta, dunas, a serra por trás e quase ninguém por perto. Depois a vila, com a baía para retratos ainda com a luz do sul, ou um almoço longo e a marina no fim da cobertura. A Boca do Inferno pode substituir a marina num dia de ondulação de oeste. O Guincho fica dentro do parque natural de Sintra-Cascais, por isso qualquer coisa além de pessoas de pé – cadeiras, um arco, decoração – deve ser esclarecida antes com a entidade do parque.',
    when:
      'A ordem do dia é ditada pelo vento: o lado atlântico de manhã cedo, antes de a nortada subir ao longo da tarde nos meses quentes, e a vila e a marina, mais abrigadas, para depois. Na prática, a cobertura começa cedo e termina ao fim da tarde. Fora da época alta há boas razões para escolher Novembro ou Março: o Guincho fica mais vazio, a luz é baixa o dia todo, e a baía continua protegida.',
    faqs: [
      {
        question: 'Se o tempo estiver mau, podemos mudar o dia?',
        answer:
          'Um casamento íntimo pode passar para o dia seguinte, e é por isso que vale a pena deixar uma manhã livre no plano. Céu cinzento e mar calmo no Guincho ainda resultam; chuva forte ou vento com areia já pedem o dia de reserva em vez de votos ditos aos gritos.',
      },
      {
        question: 'Precisamos de autorização para uma cerimónia simbólica na praia?',
        answer:
          'Para duas pessoas, um celebrante e alguns convidados de pé na areia, a praia é pública. Mas o Guincho está no parque natural, por isso estruturas – cadeiras, arco, flores em suportes – devem ser esclarecidas com a entidade do parque antes do dia. A autorização é dos noivos; o fotógrafo diz-lhes o que já viu funcionar.',
      },
      {
        question: 'Os nossos doze convidados conseguem chegar sem carro?',
        answer:
          'À vila, sim: a linha de comboio de Lisboa termina em Cascais. O Guincho fica mais a poente e não tem comboio, por isso para a parte da manhã é preciso táxi ou uma carrinha. Muitos noivos reservam transporte só para esse troço e fazem o resto a pé.',
      },
    ],
  },

  vacation: {
    title: 'Sessão de Férias em Cascais',
    description:
      'Sessão de férias em Cascais para quem passa uns dias na Linha: {duration} na baía virada a sul, de manhã, com toda a família. {photos} fotos desde {price}.',
    intro:
      'Uma sessão de férias em Cascais é marcada, muitas vezes, por famílias do Porto, de Coimbra ou do interior que passam uma semana de Verão na Linha e querem, pela primeira vez, umas fotografias onde apareçam todos – incluindo quem costuma ficar atrás do telemóvel. Também há quem venha de Lisboa só por um fim-de-semana. São {duration} num só local, numa altura do dia em que a praia ainda é vossa. A galeria chega em {delivery}, muitas vezes antes de as malas voltarem para o carro.',
    where:
      'Para a maioria das famílias, a baía é a escolha certa: fica a poucos passos da estação e do centro, é abrigada, e a areia virada a sul, com os barcos e a vila atrás, é reconhecivelmente Cascais sem parecer um postal. Quem está alojado no Estoril ou em Carcavelos pode fazer a sessão aí, dentro da zona coberta, se preferir não se deslocar. Famílias com filhos maiores e vontade de uma praia selvagem podem escolher o Guincho, sabendo que é preciso carro e madrugar. Para casais em férias, a marina ao fim do dia é a alternativa.',
    when:
      'Em férias, a sessão deve vir antes da praia, e não depois: sem protector solar a brilhar, sem cabelo molhado, sem areia nos joelhos. A baía ajuda, porque mantém luz boa durante a manhã, o que permite começar às nove e meia sem acordar ninguém de madrugada. Agosto é o mês mais cheio; quem tem flexibilidade ganha muito em Junho ou na primeira quinzena de Setembro, com água ainda boa e mais espaço no areal.',
    faqs: [
      {
        question: 'Estamos alojados em Oeiras. A sessão pode ser lá?',
        answer:
          'Pode, Oeiras está dentro da zona coberta. Tem é de ser um só local para os {duration}. Diga-nos onde fica o alojamento ao marcar; o fotógrafo propõe o sítio mais perto com boa luz à hora pretendida, ou confirma que a baía de Cascais compensa a deslocação.',
      },
      {
        question: 'Podemos fazer algumas fotografias em fato de banho?',
        answer:
          'Claro, são férias. O habitual é começar vestidos e trocar no fim, quando o fotógrafo já tem as imagens mais seguras. Tragam toalha e um saco, e combinem quem o leva, porque um saco de praia esquecido no fundo é o pormenor que toda a gente repara depois.',
      },
      {
        question: 'Os avós vêm connosco. Conseguem acompanhar a sessão?',
        answer:
          'Sem dificuldade: a baía e o passeio junto ao mar são planos e há bancos por perto. Para quem anda com mais cuidado, a sessão faz-se sem descer à areia, no passeio ou junto ao muro, e as fotografias de grupo fazem-se logo no início.',
      },
    ],
  },

  headshots: {
    title: 'Retrato Corporativo em Cascais',
    description:
      'Retrato corporativo em Cascais, Estoril e Oeiras, no seu escritório ou em casa, com o mesmo registo para toda a equipa. {photos} fotografias por pessoa, {price}.',
    intro:
      'Quem encomenda retrato corporativo em Cascais costuma encaixar num de dois perfis. Por um lado, a firma pequena sediada na Linha, com meia dúzia de pessoas, que quer um site onde as caras pareçam feitas no mesmo dia. Por outro, o profissional que vive junto ao mar, apanha o comboio para o escritório lisboeta duas vezes por semana e precisa de uma imagem com presença para o LinkedIn. Ambos recebem o mesmo: {duration} por pessoa, enquadramento igual para todos e as imagens retocadas em {delivery}. É o fotógrafo quem se desloca às vossas instalações, por isso a produtividade da equipa sofre o mínimo: cada pessoa sai da secretária, senta-se, e volta ao trabalho pouco depois.',
    where:
      'A sessão faz-se no local de trabalho, e não é preciso que pareça um estúdio. Uma parede tranquila, com uns dois metros livres à frente, chega para que o fundo fique suave e desfocado; uma janela de lado faz o resto. Em teletrabalho, numa casa da Parede ou de Carcavelos, o princípio não muda: uma superfície calma e uma janela ao lado. O mar raramente pertence a um retrato de empresa – atrás de uma cabeça, lê-se como férias – mas um terraço com sombra pode funcionar para uma equipa que quer um registo mais leve, desde que todos sejam fotografados contra o mesmo fundo.',
    when:
      'Escolha uma manhã em que a equipa esteja toda no escritório e peça a cada pessoa que venha vestida como vai a uma reunião com clientes. A luz de janela muda ao longo do dia, e é por isso que uma equipa se fotografa numa sessão seguida e não ao longo de uma semana. Um pormenor local: no Verão, muita gente desta zona passa o fim-de-semana na praia, e uma segunda-feira pode trazer narizes queimados. A meio da semana costuma correr melhor.',
    faqs: [
      {
        question: 'Parte da equipa trabalha em Lisboa. Os retratos ficam iguais?',
        answer:
          'Ficam. Uma segunda visita usa os primeiros retratos como referência – o mesmo tamanho de cabeça, o mesmo corte, o mesmo tom de fundo – para a grelha parecer feita no mesmo dia. Diga-o ao marcar, para a primeira sessão ser pensada já com isso em mente.',
      },
      {
        question: 'Precisamos de fundo, ou serve uma parede do escritório?',
        answer:
          'Normalmente chega bem: o essencial é usar sempre a mesma e conseguir pôr a pessoa a uns passos dela, para o fundo desfocar. O resultado tem mais personalidade do que papel neutro. Escolham-na antes da sessão, porque mudar a meio deixa a grelha com dois tons.',
      },
      {
        question: 'Contratamos ao longo do ano. Dá para acrescentar pessoas depois?',
        answer:
          'Dá. Cada pessoa nova é fotografada contra o mesmo fundo e com o mesmo corte da equipa, no escritório ou em casa, se trabalhar remotamente. As imagens chegam em {delivery}, por isso o site actualiza-se na própria semana em que a pessoa entra.',
      },
    ],
  },

  'personal-brand': {
    title: 'Fotógrafo de Personal Branding em Cascais',
    description:
      'Personal branding em Cascais: {duration} entre o seu espaço de trabalho e a beira-mar, {photos} imagens para site, apresentações e redes. Desde {price}.',
    intro:
      'Uma sessão de personal branding em Cascais é, quase sempre, para alguém cujo negócio vive de confiança: a nutricionista com consultório no Estoril, o mediador imobiliário que vende casas na Linha, o terapeuta que atende em casa, a formadora que dá workshops online a partir de Carcavelos. O que precisam é de um acervo de imagens que mostre o trabalho e a pessoa, e não uma única fotografia de perfil. São {duration} em dois ou três cenários, com {photos} imagens retocadas, cada uma das principais em corte vertical e horizontal, prontas para o site, para o LinkedIn e para meses de publicações.',
    where:
      'O plano típico junta um cenário interior e um ou dois exteriores. O interior é onde trabalha: o consultório, a secretária, a mesa da cozinha se é aí que faz as reuniões por vídeo, o espaço de co-working que já frequenta. No exterior, a baía dá um fundo discreto e reconhecível, com boa luz até perto das onze. A marina dá um registo mais urbano e arrumado, que fica bem a consultores e profissões jurídicas. O Guincho só se justifica para uma marca ligada ao desporto, ao surf ou ao bem-estar ao ar livre, e só se a sessão começar cedo.',
    when:
      'Organize a sessão de trás para a frente, a partir dos exteriores. Se o Guincho entrar, vem primeiro, antes do vento; a baía a seguir, antes de a luz ficar dura perto do meio-dia; o interior absorve as horas do meio, quando a luz lá fora é menos favorável. Pense também na estação: uma sessão em pleno Verão dá um ano de pele bronzeada e areia branca, que destoa num post de Janeiro. Outubro, ainda ameno nesta costa, dá imagens que servem as quatro estações.',
    faqs: [
      {
        question: 'A previsão dá aguaceiros. Perdemos os cenários exteriores?',
        answer:
          'Não. A sessão passa para um dia mais seco sem custo, ou, se só um dos cenários for exterior, troca-se por um segundo interior e mantém-se a data. Decida-o com o fotógrafo na véspera, e não junto ao mar com a roupa toda no saco.',
      },
      {
        question: 'Posso usar as fotografias em anúncios pagos nas redes sociais?',
        answer:
          'O uso orgânico – site, newsletters, imprensa, apresentações, publicações não pagas – está incluído na licença base. Publicidade paga é um acordo à parte, feito por escrito e orçamentado antes da sessão; diga-o ao marcar se estiver nos planos.',
      },
      {
        question: 'Quantas mudas de roupa devo levar?',
        answer:
          'Uma por cenário e uma de reserva. Algo mais leve para a baía, algo mais estruturado para a marina, e a roupa com que recebe clientes para o interior. Cores lisas lêem-se bem num ecrã de telemóvel; padrões pequenos e logótipos grandes não.',
      },
    ],
  },

  'eventos-de-empresa': {
    title: 'Fotógrafo de Eventos de Empresa em Cascais',
    description:
      'Fotógrafo de eventos de empresa em Cascais e Estoril: {duration} de cobertura, primeira selecção na mesma noite, {photos} fotografias em {delivery}. Desde {price}.',
    intro:
      'Contratar um fotógrafo de eventos de empresa em Cascais é, em muitos casos, coisa de empresas lisboetas que levam as pessoas para fora do escritório: a convenção do ano, a reunião de chefias, a apresentação de um produto a clientes, a festa de Natal à beira da água. A distância é suficiente para parecer um dia diferente e curta o bastante para não exigir dormida. Contam-se {duration} desde a hora acordada; antes de a noite acabar, quem trata da comunicação recebe já um lote escolhido e editado, e o conjunto de {photos} imagens tratadas segue em {delivery}.',
    where:
      'A sala é a que a organização contratou, e não temos nenhuma para sugerir. Ao fotógrafo interessa saber quantos espaços funcionam em paralelo, de que lado está o palco e se algum momento decorre ao ar livre. Nesta costa é frequente haver uma pausa ou um aperitivo num terraço, e é nesse intervalo, com luz do dia, que surgem as imagens de conversa mais naturais. Uma foto de equipa com o oceano atrás é viável quando o local fica perto da baía ou da marina, desde que conste do alinhamento com hora própria – deixada para o fim, metade das pessoas já saiu.',
    when:
      'A hora do evento é da empresa; o que se ajusta é onde ficam os momentos exteriores. Uma foto colectiva no exterior sai melhor com o sol de lado, cedo ou já a descer, do que com ele a pique sobre cem pares de olhos. Nos meses quentes, convém que qualquer coisa ao ar livre no lado do Guincho seja de manhã, antes da nortada. Para jantares de fim de ano, Dezembro anoitece cedo, e o cocktail no terraço passa a ser fotografado com a luz do próprio espaço.',
    faqs: [
      {
        question: 'Os participantes vêm de Lisboa em autocarro. Fotografa-se a chegada?',
        answer:
          'Pode fotografar-se, desde que a chegada esteja dentro das {duration}. É útil para comunicação interna: as pessoas a sair do autocarro, o acolhimento, os primeiros cafés. Diga-nos a hora prevista e o fotógrafo começa a contar a partir daí, ou mais tarde, se preferir guardar o tempo para o palco.',
      },
      {
        question: 'Podemos ter uma fotografia de grupo junto ao mar?',
        answer:
          'Podem, se a deslocação for curta e estiver no programa com hora certa. Um grupo grande precisa de um ponto onde todos caibam sem ninguém tapado, e de alguém da organização a reunir as pessoas. Combine-o com o fotógrafo antes; no fim do evento, metade da sala já foi embora.',
      },
      {
        question: 'O evento acaba com jantar e música. A cobertura chega até lá?',
        answer:
          'Chega se as {duration} forem posicionadas para isso. Muitas empresas preferem começar mais tarde e cobrir o jantar e os prémios em vez da manhã de apresentações. Se quiser as duas coisas, uma cobertura mais longa é orçamentada antes de reservar, sem surpresas depois.',
      },
    ],
  },

  'real-estate': {
    title: 'Fotografia Imobiliária em Cascais',
    description:
      'Fotografia imobiliária e de Alojamento Local em Cascais: divisões fotografadas quando têm luz, verticais corrigidas, {photos} imagens em {delivery}. Desde {price}.',
    intro:
      'A fotografia imobiliária em Cascais serve um mercado com muita casa de segunda habitação, muito arrendamento a estrangeiros e muito Alojamento Local, e em todos eles a luz é parte do que se vende. Um apartamento virado à baía, uma moradia com terraço para a serra, um T1 na vila velha: o anúncio tem de mostrar a casa como ela é ao sol, e não como ficou numa tarde de chuva fotografada com o telemóvel. A sessão é de {duration} por imóvel, marcada para a hora em que as divisões principais recebem luz, com {photos} imagens retocadas e entregues em {delivery}.',
    where:
      'O local é a casa, mas a costa muda a forma de a fotografar. Num apartamento com vista de mar, o interior e a janela têm de ficar legíveis ao mesmo tempo, para o mar aparecer como mar e não como um rectângulo branco. Nas moradias para os lados do Guincho e da Malveira da Serra, o espaço exterior e a paisagem pesam tanto como as salas, e o terraço merece várias imagens. Na vila velha, com ruas estreitas, a fachada pode só ter sol a uma hora certa. O fotógrafo cobre Cascais, Estoril, Carcavelos, Parede, Oeiras e a Malveira da Serra.',
    when:
      'A hora depende da orientação, por isso indique-a ao marcar, ou envie a morada e o fotógrafo calcula-a. Como regra, a sala principal fotografa-se quando o sol entra mas ainda não bate directo no chão. A época conta para o exterior: jardins e terraços ficam melhor na Primavera, e um anúncio para a época de arrendamento de Verão deve estar no ar antes de Maio. No Inverno, o sol mais baixo entra mais fundo nas divisões viradas a sul.',
    faqs: [
      {
        question: 'Gerimos várias unidades de AL no mesmo prédio. Fazem-se no mesmo dia?',
        answer:
          'Fazem-se seguidas, cada uma com os seus {duration} e as suas {photos} imagens. Unidades parecidas são fotografadas com os mesmos ângulos e o mesmo tratamento, para que os anúncios pareçam da mesma casa. Indique o número de unidades ao marcar, para o tempo ser planeado.',
      },
      {
        question: 'A casa ainda está mobilada pelo inquilino. Vale a pena fotografar?',
        answer:
          'Depende do estado. Uma casa arrumada, mesmo com móveis que não são seus, fotografa melhor do que uma casa vazia, que parece mais pequena. Peça ao inquilino que liberte as bancadas e as superfícies; o fotógrafo evita objectos pessoais no enquadramento sempre que possível.',
      },
      {
        question: 'Está nublado no dia marcado. Fotografa-se na mesma?',
        answer:
          'A sessão pode passar para um dia de sol sem custo. Se o anúncio não puder esperar, fotografa-se e a decisão é sua; mas uma casa virada a sul debaixo de nuvens perde precisamente aquilo por que um comprador estaria disposto a pagar.',
      },
    ],
  },

  food: {
    title: 'Fotografia Gastronómica em Cascais',
    description:
      'Fotografia gastronómica em Cascais: até doze pratos em {duration}, na sala ou na esplanada, com luz natural. {photos} fotografias desde {price}, em {delivery}.',
    intro:
      'A fotografia gastronómica em Cascais trabalha, muitas vezes, para casas que vivem da estação: uma esplanada que conta mais nos meses quentes, uma carta onde o peixe tem peso, um site que tem de estar actualizado antes de os turistas começarem a reservar. A sessão tem {duration} no próprio restaurante, com até doze pratos fotografados na sala onde são servidos e com luz natural sempre que o espaço o permita. As {photos} fotografias retocadas chegam em {delivery}, a tempo da nova carta, das plataformas de reservas e das redes.',
    where:
      'O local é o restaurante, e o mais importante é escolher a mesa certa. Uma mesa junto a uma janela sem sol directo dá uma luz suave e igual que serve à maioria dos pratos. Uma esplanada virada à baía pode resultar muito bem, mas o sol do meio-dia em pratos brancos é duro; é melhor de manhã ou ao fim da tarde, ou debaixo de um toldo. O vento também conta nesta costa: ervas e molhos leves voam numa esplanada exposta. Umas imagens mais largas da sala dão ao cliente uma ideia do ambiente.',
    when:
      'Marque entre serviços, quando a cozinha pode cozinhar para a câmara sem clientes à espera. A luz decide entre manhã e tarde; em muitas casas junto à baía, a manhã é mais suave. Fotografe a carta de Verão na Primavera, antes da época alta, para estar no ar quando as pessoas começam a procurar. Para uma carta que muda com o peixe do dia, fotografe os pratos fixos e acrescente uns pratos de assinatura numa sessão mais tarde.',
    faqs: [
      {
        question: 'O peixe muda todos os dias. O que devemos fotografar?',
        answer:
          'Os pratos que ficam na carta e a forma como apresenta o peixe, mais do que uma captura em particular. Umas imagens da cozinha e da preparação contam a mesma história. Se a carta mudar a cada estação, uma sessão mais curta noutra altura do ano mantém o site actual.',
      },
      {
        question: 'Podemos fotografar na esplanada se estiver vento?',
        answer:
          'Num canto abrigado, sim. Numa esplanada exposta com brisa, guarnições leves e molhos mexem, e os guardanapos voam. O fotógrafo vê o espaço e sugere as melhores mesas; muitas vezes uma janela no interior dá a mesma luz sem o vento.',
      },
      {
        question: 'As fotografias podem ir para as plataformas de entregas e publicidade?',
        answer:
          'Site, redes sociais, carta e plataformas de reservas estão incluídos. Publicidade paga e campanhas acordam-se à parte, por escrito, antes da sessão, para o preço ficar claro desde o início e não aparecer depois.',
      },
    ],
  },

  'book-de-modelo': {
    title: 'Book de Modelo em Cascais desde {price}',
    description:
      'Book de modelo em Cascais: polaroids de agência e imagens editoriais junto ao mar, numa só sessão de {duration}. {photos} fotografias retocadas desde {price}.',
    intro:
      'Um book de modelo em Cascais não é a escolha óbvia, e não vale a pena fingir que a vila é um centro de moda. Quem marca aqui, normalmente, vive na Linha e está a começar: quer polaroids limpas para enviar às agências de Lisboa e umas imagens editoriais que mostrem que funciona fora de um fundo branco. A costa dá a segunda parte com uma variedade difícil de encontrar na cidade. A sessão tem {duration}: primeiro as polaroids, sem maquilhagem, depois um look editorial, com as {photos} fotografias retocadas entregues em {delivery}.',
    where:
      'As polaroids pedem luz igual e um fundo simples, e fazem-se de preferência à sombra, junto a uma parede lisa perto do local escolhido. Para o editorial, escolha um cenário. A marina dá linhas limpas, mastros e um ar urbano que resulta bem com roupa estruturada. O Guincho é o cenário mais forte para moda: dunas, Atlântico aberto e vento a mexer cabelo e tecido, mas só de manhã cedo. A Boca do Inferno, em dia de mar, dá rocha escura e espuma, um fundo dramático para um look mais pesado.',
    when:
      'Para as polaroids, a luz suave do início da manhã ou de um dia encoberto é a ideal, sem sombras duras na cara. O editorial no Guincho tem de acabar antes de a nortada subir; na marina, o fim do dia dá luz baixa e lateral. Fora do Verão, a vila e as praias estão mais vazias, o que poupa tempo a esperar que as pessoas saiam do enquadramento. A Primavera e o Outono são as alturas mais confortáveis para mudar de roupa ao ar livre.',
    faqs: [
      {
        question: 'Tenho dezasseis anos. Posso fazer o book sozinha?',
        answer:
          'Com menos de dezoito anos, conte com um dos pais ou o tutor presente durante a sessão, e diga a idade logo ao marcar. Além de tranquilizar toda a gente, é a pessoa ideal para segurar casacos, guardar a mala e ir passando a roupa do segundo look.',
      },
      {
        question: 'Onde é que se muda de roupa entre as polaroids e o editorial?',
        answer:
          'Não há camarim na praia, por isso convém planear: vir já com a roupa das polaroids, simples e justa, e trazer o look editorial fácil de vestir por cima ou trocar no carro. Um roupão comprido ou um poncho de praia resolve a troca rápida no próprio local.',
      },
      {
        question: 'Um book feito na praia é aceite pelas agências?',
        answer:
          'As agências querem, antes de tudo, polaroids honestas: cara limpa, corpo inteiro, perfil, luz natural. Isso faz-se em qualquer sítio com sombra. O editorial na praia mostra uma coisa diferente – que se mexe bem e que funciona com vento e espaço aberto – e é um complemento, não um substituto.',
      },
    ],
  },

  finalistas: {
    title: 'Sessão de Finalistas em Cascais',
    description:
      'Sessão de finalistas em Cascais: capa e batina contra o mar da baía ou o céu da marina, retratos a solo e em grupo em {duration}. {photos} fotos, {price}.',
    intro:
      'Fazer a sessão de finalistas em Cascais é sair do guião, e convém assumi-lo à partida: a capa e batina tem a sua casa em Coimbra, com escadarias, semanas e rituais próprios. Só que muitos estudantes cresceram na Linha, fizeram o curso numa faculdade de Lisboa ou no campus de Carcavelos, e preferem guardar o fim desta etapa junto à água onde passaram os Verões, em vez de num pátio que pouco lhes diz. A marcação dá {duration} para imagens individuais e do grupo, e a galeria fica disponível em {delivery} – a tempo de cada um a partilhar antes das férias espalharem a turma.',
    where:
      'Tecido escuro pede um cenário claro e uma luz que lhe revele a trama. Por isso a baía funciona tão bem: areia pálida, água quieta, as casas antigas da vila atrás e um passeio largo onde uma fila de colegas se alinha sem tapar ninguém. A marina serve melhor os retratos a solo, com a capa recortada contra o horizonte de poente e os mastros a dar profundidade. No Guincho, uma rajada faz a capa abrir como uma vela, e as imagens são inesquecíveis; mas só funciona cedo, e com uma turma inteira a areia a voar torna tudo lento. Escolham um destes três e fiquem por lá.',
    when:
      'O inimigo do traje académico é o sol a pique: achata o preto, cria sombras duras nos olhos e transforma vinte caras em vinte expressões de esforço. Na baía, o melhor é cedo, enquanto a luz chega rasante de sul; na marina, a última hora antes de o sol se pôr. O calendário natural de quem acaba o curso cai entre o fim das aulas e as pautas, mais ou menos de Maio a Julho, e coincide com bom tempo nesta costa. Com uma turma grande, fechem a data cedo, porque conciliar a agenda de quinze pessoas demora mais do que a própria sessão.',
    faqs: [
      {
        question: 'Somos quinze. Toda a gente fica com fotografias suas?',
        answer:
          'Com {duration}, faz-se o grupo completo, alguns subgrupos de amigos e um retrato rápido a cada um, e as {photos} imagens finais dividem-se pela turma. Quem quiser um conjunto individual mais completo pode marcar à parte, logo a seguir, ou pedir-nos uma proposta de sessão mais longa antes de fechar.',
      },
      {
        question: 'Queremos lançar as capas ao ar e molhar os pés. Pode ser?',
        answer:
          'O lançamento das capas fica muito bem na areia e guarda-se para o final, quando os retratos já estão garantidos. Molhar os pés é convosco, mas a água salgada e a areia agarram-se à lã e, depois disso, a capa perde a forma em todas as imagens que vierem a seguir.',
      },
      {
        question: 'Os pais querem vir. Atrapalha?',
        answer:
          'De todo. Pais e avós acabam muitas vezes por entrar numa ou duas imagens com o finalista, o que se faz no fim, depois do grupo. Durante a sessão, o melhor que podem fazer é ficar atrás do fotógrafo, porque os olhares desviam-se para quem está a acenar de lado.',
      },
    ],
  },
};
