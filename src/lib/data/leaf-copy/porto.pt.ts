import type { CityLeafCopy } from './index';

/** `service × porto` pages in Portuguese, keyed by canonical service id. */
export const PORTO_PT: CityLeafCopy = {
  'portrait': {
    title: 'Retrato de Estúdio no Porto desde {price}',
    description: 'Retrato de estúdio no Porto para LinkedIn, candidatura ou dossier de imprensa: luz controlada faça chuva ou sol, {photos} fotografias retocadas em {delivery}.',
    intro:
      'Um retrato de estúdio no Porto é a resposta mais segura para quem precisa de uma fotografia com prazo: uma candidatura que fecha na sexta, uma nomeação a anunciar, um livro a seguir para a gráfica. Lá fora, a cidade depende da margem e da meteorologia, e entre Novembro e Janeiro chove a sério. Cá dentro, nada disso conta. Há um fundo, uma luz que não muda entre as dez da manhã e as cinco da tarde, e um fotógrafo que indica cada pose, para que não tenha de adivinhar o que fazer com as mãos. São {duration} e a selecção faz-se em conjunto, no fim.',
    where:
      'A sessão decorre num estúdio, e a morada segue com o nome do fotógrafo quando a marcação é confirmada. Não se escolhe entre o cais de Gaia e a Foz, porque o que este formato vende é precisamente a ausência de cenário: o rosto, a roupa e um fundo liso que um designer consegue recortar. Se a ideia é ter a Ribeira ou o rio por trás, o retrato lifestyle custa o mesmo e faz-se na rua. Aqui convém dizer, ao reservar, onde a imagem vai ser usada e se tem de ficar ao lado das dos colegas, para o tom do fundo e o enquadramento serem acertados antes e não à sorte.',
    when:
      'Em estúdio é a cara que escolhe a hora, não o sol. Uma manhã depois de uma noite bem dormida dá melhor resultado do que o fim de um dia de reuniões, e um retrato marcado para depois de uma viagem longa paga-se em olheiras. A época do ano só pesa num sentido: é no Inverno, quando o Porto passa semanas de chuva, que o estúdio deixa de ser uma preferência e passa a ser a única forma de garantir a data.',
    faqs: [
      {
        question: 'Trabalho no Porto mas vivo fora. Posso marcar à hora de almoço?',
        answer:
          'Em princípio, sim. Como não depende da luz natural, a sessão encaixa num intervalo da agenda em vez de ficar presa a uma hora do dia. Indique ao reservar as janelas que tem livres, e o fotógrafo é escolhido em função delas; as {photos} fotografias chegam em {delivery}.',
      },
      {
        question: 'Que roupa resulta melhor num fundo liso?',
        answer:
          'Peças de cor única em tons médios, e aquilo que veste de facto para trabalhar. Evite riscas finas e padrões pequenos, que tremem no ecrã. Leve duas ou três opções: o fotógrafo diz qual funciona melhor com o fundo escolhido depois de ver as primeiras imagens.',
      },
      {
        question: 'A minha empresa já tem retratos feitos noutro sítio. Consegue igualá-los?',
        answer:
          'Consegue, se receber um exemplo antes. Envie uma das fotografias dos colegas ao reservar: o tom do fundo, a altura da cabeça no enquadramento e o corte são reproduzidos, para o seu retrato não destoar na página da equipa.',
      },
    ],
  },

  'lifestyle-portrait': {
    title: 'Retrato Lifestyle no Porto',
    description: 'Retrato lifestyle no Porto: na rua e em movimento, no cais de Gaia de manhã ou na Ribeira ao fim da tarde, {duration} num só local, {photos} fotografias.',
    intro:
      'Um retrato lifestyle no Porto aproveita aquilo que um estúdio não tem: granito, água, azulejo, roupa estendida nas varandas e ruas que nunca estão na horizontal. Serve a quem precisa de uma fotografia que conte alguma coisa sobre quem é, para um site pessoal, a contracapa de um livro ou o perfil de quem trabalha por conta própria. Não se posa contra um fundo; caminha-se, pára-se, olha-se para o rio. A única regra que não se pode ignorar é a das margens, porque decide se fica com luz na cara ou com o sol a bater-lhe nas costas.',
    where:
      'Fica-se por um de dois cenários. Na margem de Gaia, o passeio junto à água é comprido e sem desníveis, bom para avançar a passo largo na direcção da objectiva com o casario soalheiro do outro lado: é o retrato onde a cidade mais se vê. Na Ribeira o resultado é mais próximo e granuloso, com paredes a um palmo e a claridade do poente a entrar rasante entre as casas; em troca há a subida, e a pedra das ruelas exige sola baixa. Quem quiser mar em vez de telhados tem ainda a Foz.',
    when:
      'Do lado de Gaia, a janela abre por volta das oito e fecha perto das onze, quando chegam as excursões dos rabelos. Na Ribeira, a hora boa é o último bocado de sol: em pleno Verão já perto das oito da noite, em Dezembro logo a seguir às três. O Outono é a estação mais simpática para andar com um casaco leve. Nos meses de chuva, guarde um dia de reserva.',
    faqs: [
      {
        question: 'Vivo no Porto há anos. Faz sentido um retrato nos sítios mais turísticos?',
        answer:
          'Faz, se se escolher bem a hora. Cedo, a beira-rio de Gaia pertence a quem faz jogging e a quem vai para o emprego. E num retrato o fundo aparece desfocado: fica a cor e a luz do Porto, não um cartão-postal.',
      },
      {
        question: 'Posso levar o meu cão ou a minha bicicleta?',
        answer:
          'Pode, e costuma ajudar: as mãos deixam de ficar sem saber onde pousar. Para isso, o lado de Gaia é o mais cómodo, plano e desafogado. Avise antes, para o enquadramento ser pensado a contar com o companheiro de quatro patas ou de duas rodas.',
      },
      {
        question: 'E se estiver a chover no dia?',
        answer:
          'Um chuvisco com céu branco até suaviza a pele, e quem fotografa diz-lhe sem rodeios se compensa avançar. Com chuva grossa, troca-se o dia sem custos. Daí combinar uma data alternativa logo à partida, entre Novembro e Fevereiro.',
      },
    ],
  },

  'couple': {
    title: 'Sessão de Casal no Porto desde {price}',
    description: 'Sessão de casal no Porto ao fim da tarde, na Ribeira ou na Foz com o sol a cair no mar: {duration}, {photos} fotografias, galeria em {delivery}.',
    intro:
      'Quem marca uma sessão de casal no Porto acaba quase sempre a marcá-la para o fim do dia, por razões que nada têm de sentimental. As casas da beira-rio passam a manhã sem sol e só perto do poente ganham cor; e a Foz, de frente para o Atlântico, é o único ponto da cidade onde o sol mergulha na água em vez de desaparecer atrás de um telhado. Para quem mora cá, serve de pretexto para assinalar um aniversário, preparar o convite do casamento ou, simplesmente, acabar com anos de selfies. A sessão ocupa {duration} num único local, e acertar no local já é meio caminho.',
    where:
      'Uma de duas. A Ribeira, se gostam de ambiente urbano: arcadas, fachadas umas em cima das outras, água mesmo ao lado e transeuntes nos cantos da imagem, contornados com ângulos inteligentes. A Foz, se preferem respirar: passeio marítimo amplo, brisa, horizonte limpo e um disco laranja a afundar no oceano. A ponte Luís I fica melhor como fundo do que como palco: lá em cima partilha-se o tabuleiro com o metro, e o máximo que se tira são uns instantes parados.',
    when:
      'Faça a conta a partir do poente, recuando umas duas horas. No pino do Verão o encontro é lá para as sete; no Inverno, com escuro às cinco e pouco, a meio da tarde. O Outono acerta melhor no compromisso entre calor e sossego junto à água. Na noite de 23 de Junho esqueça: com o São João, a beira-rio é uma multidão até de madrugada.',
    faqs: [
      {
        question: 'Podemos usar as fotografias para o save the date do casamento?',
        answer:
          'Claro. Avisem com antecedência e ficam garantidos alguns planos deitados, com céu ou parede livre onde encaixar as letras. Com a entrega em {delivery}, o convite pode seguir para impressão na mesma semana.',
      },
      {
        question: 'Somos tímidos em frente à câmara. A Ribeira não é demasiado movimentada?',
        answer:
          'Nesse caso, a Foz tende a resultar melhor: espaço de sobra, ninguém dá atenção a quem está a ser fotografado, e a aragem mexe no cabelo e na roupa sem ser preciso fazer pose. O fotógrafo começa por vos pôr a caminhar lado a lado, e a timidez costuma ir-se ao fim de uns minutos.',
      },
      {
        question: 'Que roupa escolher para não se confundirem com as paredes?',
        answer:
          'Na Ribeira as fachadas já gritam amarelo, rosa e ocre, logo resultam tons sóbrios: azul, branco, cinza, ganga. Junto ao oceano, com tudo azul atrás, uma peça vibrante sobressai. Harmonizem a paleta sem vestirem o mesmo.',
      },
    ],
  },

  'proposal': {
    title: 'Pedido de Casamento no Porto',
    description: 'Pedido de casamento no Porto fotografado às escondidas: cais de Gaia cedo ou Foz ao fim do dia, ponto e minuto combinados na véspera. Desde {price}.',
    intro:
      'Fazer um pedido de casamento no Porto com fotógrafo exige uma coisa que nenhuma sessão normal pede: estar perto o suficiente para apanhar a cara dela, ou dele, e longe o suficiente para não ser notado. A beira-rio da cidade ajuda, porque está sempre cheia de gente parada a olhar para a água, e um fotógrafo com uma teleobjectiva passa por mais um. Depois da resposta, aproxima-se e o tempo que sobra vira uma pequena sessão a dois. Para quem vive cá, há ainda a vantagem de poder escolher um sítio que já seja vosso.',
    where:
      'Recomendamos um de dois. O cais de Gaia, logo de manhã: amplo, com a Ribeira iluminada do outro lado e praticamente deserto até começarem as filas para os rabelos, o que deixa ao fotógrafo várias posições discretas. Ou a Foz, à hora do pôr do sol, quando ficar encostado ao muro a ver o mar é o que toda a gente faz e ninguém estranha um par parado. A Luís I fica de fora porque, lá em cima, a linha do metro não deixa onde esconder ninguém; São Bento também, porque o público seria de passageiros apressados.',
    when:
      'Em Gaia, a calma dura mais ou menos das oito às dez. Na Foz, o momento depende do mês: em Junho fica-se até tarde, em Dezembro tudo acontece a meio da tarde, e é por isso que o minuto exacto se fixa na véspera. Primavera e Outono dão as condições mais tranquilas. Evite os fins de tarde de Agosto na Foz e, sobretudo, a noite de São João junto ao rio, quando um pedido se perde no meio de milhares de pessoas.',
    faqs: [
      {
        question: 'Como a levo até ao ponto combinado sem estragar a surpresa?',
        answer:
          'Ponha o pedido dentro de um plano que já seria normal para vocês: um passeio a pé até à Foz para ver o sol a cair, um café cedo do lado de Gaia antes de um sábado de passeios. O fotógrafo chega antes e já está posicionado; só tem de estar no sítio ao minuto acordado.',
      },
      {
        question: 'E se chover no dia marcado?',
        answer:
          'Os dois sítios são descobertos, por isso chuva a sério adia o pedido. Céu cinzento sem chuva é óptimo e muito simpático para as caras. Entre Novembro e Março, sobretudo, deixe já pensado um dia alternativo quando fizer a marcação.',
      },
      {
        question: 'Também ficamos com fotografias juntos depois?',
        answer:
          'Ficam. Mal haja resposta, o fotógrafo aparece e o resto dos {duration} é uma sessão tranquila ali mesmo. As {photos} imagens editadas chegam em {delivery}, a tempo de anunciar a novidade à família com a fotografia certa.',
      },
    ],
  },

  'family': {
    title: 'Fotógrafo de Família no Porto',
    description: 'Fotógrafo de família no Porto: um sábado cedo no cais de Gaia, chão sem degraus, a Ribeira com sol do outro lado e os miúdos ainda frescos. {photos} fotografias.',
    intro:
      'Um fotógrafo de família no Porto joga com uma coincidência feliz: o lado de Gaia tem a vista mais famosa da cidade com sol logo de manhã, e é de manhã que os mais pequenos colaboram. Antes da sesta, antes do calor, antes de as excursões descerem até ao rio. Para quem mora no Grande Porto e passa por ali sem reparar, é uma maneira de juntar pais, filhos e, se der, os avós, numa única imagem em que estão todos a olhar para o mesmo lado, coisa que raramente acontece num almoço de domingo.',
    where:
      'Com crianças até aos cinco ou seis anos, o cais de Gaia ganha a qualquer outro sítio: não tem degraus, há bancos de pedra para quem precisa de se sentar e, cedo, pouca gente a passar. Atenção à beira da água, que em vários troços não tem protecção; o fotógrafo compõe as imagens com o rio atrás e as crianças sempre do lado de dentro. Com adolescentes, que aguentam uma sessão perto do jantar, a Foz é mais interessante, com a marginal comprida e o Atlântico ao fundo. As calçadas a subir da Ribeira, essas, não perdoam um carrinho de bebé.',
    when:
      'Aponte para o intervalo entre as oito e as dez e meia, com o cais ainda calmo e a luz a bater na margem oposta. No pico do Verão, sair de casa cedo custa pouco, porque às seis já é dia. Na época das chuvas, que no Porto aperta sobretudo de Novembro a Janeiro, combine uma semana em vez de um dia e aproveite a primeira manhã seca. Para muitas famílias, o melhor momento do ano é o arranque do ano escolar, quando a cidade sossega e as manhãs ainda são tépidas.',
    faqs: [
      {
        question: 'Moramos em Matosinhos, ao pé da praia. Pode ser lá?',
        answer:
          'Pode, Matosinhos faz parte da zona coberta. Contem o que vos leva lá, e o fotógrafo propõe a hora em que aquela praia tem melhor luz. Só não esperem ver a cidade antiga no fundo: essa imagem tira-se do lado de Gaia, e de mais lado nenhum.',
      },
      {
        question: 'Queremos três gerações na mesma fotografia. Como se organiza?',
        answer:
          'Digam quantos vêm quando fizerem a marcação. A fotografia com toda a gente faz-se nos primeiros minutos, enquanto o mais novo ainda tem paciência, e depois os avós podem descansar num banco do cais enquanto o resto da sessão segue.',
      },
      {
        question: 'O nosso filho de três anos não pára. E agora?',
        answer:
          'Agora é exactamente o que se quer. Correr, saltar para o colo, fugir ao pai: tudo isso dá imagens melhores do que uma pose. Dispara-se o suficiente para que as {photos} escolhidas tenham caras verdadeiras, e chegam-vos em {delivery}.',
      },
    ],
  },

  'maternity': {
    title: 'Sessão de Gravidez no Porto',
    description: 'Sessão de gravidez no Porto entre as 30 e as 36 semanas: chão plano na Foz ou no cais de Gaia, ou em casa se chover. {duration}, {photos} fotografias.',
    intro:
      'Uma sessão de gravidez no Porto tem de levar a sério a geografia da cidade, porque as partes mais bonitas são íngremes. Entre as trinta e as trinta e seis semanas, ninguém quer subir as calçadas acima da Ribeira para uma fotografia, nem deve ter de o fazer. Felizmente, os dois lugares mais desafogados são também os mais planos: o passeio marítimo da Foz e a beira-rio de Gaia. Ambos oferecem amplitude, céu aberto e claridade macia no momento certo, exactamente o que valoriza a barriga.',
    where:
      'Ao entardecer, ganha a Foz. Olha para oeste, para o oceano, e a claridade chega rasante e lateral, o ângulo que melhor modela o ventre; um tecido fino a esvoaçar com a aragem tira rigidez às imagens. De manhã, prefira a margem de Gaia: piso regular, o casario antigo iluminado em frente e bancos para descansar. Com mau tempo, passar para dentro de casa está incluído e rende muitas vezes as fotografias mais íntimas, sobretudo com o futuro pai ou o irmão mais velho por perto.',
    when:
      'Na Foz, em qualquer mês, o sol desce sobre a água: comece uns sessenta minutos antes. Em Gaia, às nove horas evita a enchente. Em Julho, com a gravidez adiantada, a frescura matinal agradece-se, e a Foz pode estar ventosa seja qual for a estação. No pico das chuvas, à volta do Natal, tenha a casa como plano B em vez de empurrar a data para lá das 36 semanas.',
    faqs: [
      {
        question: 'O vento na Foz é um problema?',
        answer:
          'Mesmo em Agosto pode arrefecer junto ao mar, por isso leve uma camisola para os intervalos. A aragem também joga a favor, porque dá movimento ao tecido. Se soprar a sério, troca-se para a margem de Gaia ou para dentro de casa.',
      },
      {
        question: 'Podemos fazer em casa se chover?',
        answer:
          'Podem, o serviço prevê as duas hipóteses e a chuva apenas troca o cenário. Basta um quarto ou sala com janela generosa; indiquem a orientação e o horário acerta-se por ela. As {photos} imagens editadas chegam igualmente em {delivery}.',
      },
      {
        question: 'Moramos em Vila do Conde. É longe demais?',
        answer:
          'Nada disso, Vila do Conde está incluída na zona coberta e uma sessão ao domicílio marca-se sem complicações. Preferindo o exterior, escolham um lugar plano perto de casa; a luz desse sítio e dessa hora é verificada antes da confirmação.',
      },
    ],
  },

  'newborn': {
    title: 'Fotógrafo de Recém-Nascido no Porto',
    description: 'Fotógrafo de recém-nascido no Porto, Gaia, Matosinhos ou Espinho: em sua casa, nas primeiras duas semanas, à luz da janela e ao ritmo das mamadas.',
    intro:
      'Um fotógrafo de recém-nascido no Porto vai a sua casa. Nas primeiras duas semanas, não há razão nenhuma para levar um bebé pela cidade até um miradouro, e o que interessa não é a paisagem: é a janela, a divisão mais calma e a hora em que a luz lá entra. A sessão anda à volta das mamadas e do sono, não de um horário. Para quem acabou de ser pai ou mãe pela primeira vez, ter alguém que trabalha com calma e sem flash, dentro de casa, é metade da razão para marcar.',
    where:
      'A sessão é feita em sua casa, no Porto ou nos concelhos à volta que são servidos a partir da cidade, de Vila Nova de Gaia a Vila do Conde, passando por Matosinhos, Leça da Palmeira e Espinho. O fotógrafo procura a janela maior e a divisão mais silenciosa e monta tudo junto ao vidro. Casas antigas no centro, com ruas estreitas à frente, podem ser mais escuras do que se espera; apartamentos virados ao mar ou ao rio costumam ter mais luz. Nenhum dos casos é problema, desde que a hora seja escolhida pela divisão.',
    when:
      'As duas primeiras semanas são a janela habitual, quando o bebé dorme profundamente e se enrola com facilidade. A hora depende da orientação: uma divisão virada a nascente tem mais luz de manhã, uma virada a poente à tarde. No Inverno do Porto, com o sol posto pouco depois das cinco, as sessões de Dezembro fazem-se por volta do meio-dia. Um céu cinzento atlântico não é contratempo cá dentro: dá uma luz suave e uniforme, muito simpática para a pele de um recém-nascido.',
    faqs: [
      {
        question: 'A nossa casa no centro histórico é escura. Resulta?',
        answer:
          'Quase sempre. O fotógrafo escolhe a janela e a hora com mais luz, e muito perto do vidro até uma rua estreita chega para um bebé a dormir. Diga ao reservar para onde está virada a janela principal, e a hora marca-se em função disso.',
      },
      {
        question: 'E se o bebé precisar de mamar a meio?',
        answer:
          'A sessão pára e espera. Os {duration} distribuem-se à volta das mamadas, e as fotografias mais tranquilas costumam vir logo a seguir a uma. Ninguém tem pressa, e a galeria chega na mesma em {delivery}.',
      },
      {
        question: 'É preciso ter roupas e adereços preparados?',
        answer:
          'Não é uma sessão de estúdio em casa. As fotografias são do bebé no seu sítio: a vossa cama, uma manta que usam, os braços de quem lá vive. Tenham uma ou duas mantas macias de cor lisa à mão; o resto já lá está.',
      },
    ],
  },

  'batizado': {
    title: 'Fotógrafo de Batizado no Porto desde {price}',
    description: 'Fotógrafo de batizado no Porto, Gaia e Matosinhos: regras da paróquia tratadas por nós, {duration} da missa à mesa do almoço, {photos} fotografias.',
    intro:
      'Contratar um fotógrafo de batizado no Porto é, antes de mais, delegar uma conversa que ninguém da família quer ter na sacristia dez minutos antes da missa: onde é que o fotógrafo pode pôr-se, se pode usar flash, se pode subir ao altar. Essas respostas variam de igreja para igreja e pedem-se com dias de folga. Resolvido isso, o trabalho é acompanhar o bebé, os pais e os padrinhos durante quatro horas, e deixar os avós em paz para aproveitarem o dia em vez de andarem atrás de toda a gente com o telemóvel.',
    where:
      'Não há locais a escolher: são a igreja da família e a sala onde se almoça, seja no centro do Porto, em Gaia, em Matosinhos ou mais a norte, em Vila do Conde. A margem e a luz do rio contam pouco neste serviço. O que conta é o interior da igreja, muitas vezes escuro e com vitrais, onde o fotógrafo trabalha sem incomodar o rito; o largo à porta, onde se juntam as fotografias de grupo enquanto ninguém foi ainda buscar o carro; e a mesa, onde a família descontrai e o bebé passa de colo em colo.',
    when:
      'Quem manda no horário é a paróquia. A cobertura costuma arrancar um pouco antes da chegada dos convidados e fechar depois do bolo, e é útil pedir ao restaurante que não adie a sobremesa para o fim da tarde. A estação mexe sobretudo nos grupos à saída: no Inverno portuense, se estiver a chover, fazem-se à entrada ou sob uma arcada; num domingo de Julho ao meio-dia, procura-se sombra para os mais velhos não ficarem de olhos fechados.',
    faqs: [
      {
        question: 'Somos nós que temos de pedir autorização ao padre?',
        answer:
          'Não precisam. Indiquem-nos a igreja e, se tiverem, um contacto da secretaria paroquial, e nós tratamos de saber o que é permitido e de onde se pode fotografar. A resposta chega-vos antes do batizado, para que no dia ninguém tenha surpresas.',
      },
      {
        question: 'A igreja é na Foz e o almoço em Espinho. Cabe tudo?',
        answer:
          'Na maioria dos casos cabe, se a deslocação entre os dois sítios não comer uma parte grande das {duration}. Mandem as duas moradas ao fazer a marcação e o fotógrafo faz as contas; se não chegar, propõe-se uma cobertura maior com o valor fechado antes.',
      },
      {
        question: 'Os padrinhos vivem fora. Conseguem ver as fotografias logo?',
        answer:
          'Em {delivery} recebem um link para a galeria, que podem reencaminhar a quem quiserem. São {photos} imagens retocadas, da entrada na igreja aos brindes, prontas a imprimir ou a mandar por mensagem.',
      },
    ],
  },

  'wedding': {
    title: 'Fotógrafo de Casamento no Porto desde {price}',
    description: 'Fotógrafo de casamento no Porto: {duration} dos preparativos à festa, retratos dos noivos com a última luz na Ribeira ou na Foz, {photos} fotografias.',
    intro:
      'Contratar um fotógrafo de casamento no Porto é entregar dez horas de um dia cujo guião é vosso: arranjos em casa, igreja ou registo, convidados, brindes e o arranque do baile, tudo segundo o plano fechado quatro semanas antes. A cidade dá uma ajuda nos retratos dos noivos, porque a beira-rio e a ponte só ganham brilho perto do poente, precisamente na pausa entre a cerimónia e o jantar. Quem fotografa sabe onde o sol vai estar em cada fase e leva sempre um plano abrigado, que aqui a chuva não pede licença.',
    where:
      'Igreja ou conservatória e espaço da festa desenham quase todo o percurso, e boa parte das quintas e salas ficam fora do centro, em direcção à costa ou à margem sul. O que se pode deslocar são os retratos a dois. O cenário clássico é a beira-rio, numa margem ou noutra, com o arco metálico e a água no plano. Se a festa for junto ao mar, a Foz compensa mais, com o poente no oceano. Com chuva, o átrio azulejado de São Bento abriga, numa visita rápida e longe da hora de ponta, porque os comboios não param por causa de um casamento.',
    when:
      'O Verão é a aposta segura: perto do solstício escurece por volta das nove e dez, e um sim dito às cinco ou seis deixa os retratos com luz baixa e sem pressa. O Outono, sobretudo Outubro, chega a ser melhor, mais suave e com menos turistas. Entre Novembro e Março, a cerimónia vai para dentro e os retratos exteriores encurtam-se. O dia 23 de Junho é de São João: óptimo para a festa, péssimo para fotografias tranquilas.',
    faqs: [
      {
        question: 'A quinta fica a meia hora do centro. Vale a pena ir à Ribeira fazer retratos?',
        answer:
          'Decide-se no planeamento de horários, feito com um mês de folga, a contar com distância e trânsito. Se a ida e volta comer demasiado da festa, os retratos ficam pela quinta ou arredores; e para quem casa perto da costa, a Foz costuma render mais do que o centro histórico.',
      },
      {
        question: 'E se chover no dia do casamento?',
        answer:
          'Aqui conta-se com ela, sobretudo fora dos meses quentes. O plano já indica um sítio abrigado para os retratos e as mudanças fazem-se no momento, sem drama. Nuvens até favorecem a pele; só um aguaceiro forte obriga a recorrer à alternativa.',
      },
      {
        question: 'Os convidados vêm de fora. Faz sentido aproveitar a vindima no Douro?',
        answer:
          'Se a data cair entre o fim de Setembro e Outubro, coincide com as vindimas no Douro, e pode valer a pena sugerir esse passeio a quem vem de longe. A reportagem do casamento corresponde às {duration} do dia; fotografar também no Douro é um trabalho à parte, com preço próprio.',
      },
    ],
  },

  'elopement': {
    title: 'Casamento Íntimo no Porto',
    description: 'Casamento íntimo no Porto: os dois ou uma dúzia, {duration} sem horário a cumprir, da Conservatória à Ribeira e à ponte ao pôr do sol. Desde {price}.',
    intro:
      'Um casamento íntimo no Porto troca a quinta com duzentos convidados por um dia à medida de quem casa: o registo civil de manhã, um almoço comprido com meia dúzia de pessoas, e uma tarde a percorrer a cidade sem ninguém a chamar para o próximo momento do programa. Cinco horas de cobertura dão para isso e para uma vantagem rara, que é poder aproveitar as duas margens do rio à medida que o sol muda de lado. Para muitos casais portuenses, é também a forma de serem fotografados nos sítios onde a relação aconteceu.',
    where:
      'Se a cerimónia for cedo, o dia pode arrancar no átrio de São Bento ainda sem comboios cheios, e seguir depois para o lado de Gaia, onde a Ribeira aparece inteira e iluminada. Se for à tarde, inverte-se: depois do registo, desce-se à Ribeira quando as fachadas começam a aquecer, e fecha-se no tabuleiro de cima da Luís I com o sol a pôr-se. Lá em cima, a passagem é partilhada com o metro, por isso os convidados esperam numa das pontas e só os noivos avançam; a travessia a pé demora uns dez minutos.',
    when:
      'Escolha uma metade do dia e construa tudo à volta dela, porque cada margem só está bonita numa. Em Junho, o sol só se põe depois das nove, o que deixa uma tarde enorme para passear. O fim de Setembro e Outubro juntam temperatura agradável, Ribeira mais vazia e as vindimas no Douro, a uma hora, para quem quiser estender a celebração ao fim-de-semana. No Inverno também se faz, com a cerimónia em interior e paciência com as abertas.',
    faqs: [
      {
        question: 'O fotógrafo pode estar dentro da sala da Conservatória?',
        answer:
          'Normalmente pode, mas cada conservatória tem as suas regras, e confirmam-se antes, como se faz com uma igreja. Digam-nos qual é quando fizerem a marcação. Depois da assinatura, as cinco horas são vossas: a saída, o almoço e o passeio que escolherem.',
      },
      {
        question: 'Os convidados acompanham-nos durante a tarde?',
        answer:
          'Uma dúzia de pessoas anda bem pela Ribeira e pelo cais de Gaia. Na ponte, estreita e ao lado dos carris, ficam numa das extremidades a assistir enquanto vocês os dois são fotografados. O percurso é desenhado com essas paragens previstas.',
      },
      {
        question: 'Precisamos de carro entre os sítios?',
        answer:
          'No centro não: Ribeira, ponte e Gaia fazem-se a pé, e o caminho dá algumas das melhores imagens. Se quiserem terminar na Foz, contem com uns quinze minutos de carro e combinem transporte. As deslocações contam dentro das {duration}.',
      },
    ],
  },

  'vacation': {
    title: 'Sessão de Férias no Porto',
    description: 'Sessão de férias no Porto numa escapadinha de dois dias: {duration} na margem com luz, Gaia ao pequeno-almoço ou Ribeira antes do jantar. Galeria em {delivery}.',
    intro:
      'Uma sessão de férias no Porto é pensada para quem chega de Lisboa, de Coimbra ou do Algarve numa sexta à noite e volta no domingo: trinta minutos encaixados no programa, sem roubar a visita às caves nem o jantar. Para casais e famílias portuguesas que já conhecem a cidade de passagem, é a primeira vez que trazem dela algo além de selfies desfocadas. A única decisão que conta é a margem. Logo cedo, quem está em Gaia vê a Ribeira a apanhar sol; perto do fim do dia, a luz já está do lado de lá, na própria Ribeira.',
    where:
      'Se a sessão for logo depois do pequeno-almoço, faz-se do lado de Gaia, junto ao rio, com o casario empilhado, a água e o arco da ponte a encher o fundo, e espaço de sobra antes das filas para os barcos. Se for perto da hora de jantar, desce-se à Ribeira e caminha-se pela beira-rio e pelas arcadas enquanto as fachadas ganham tom. Para quem dormiu do lado do mar, ou não liga a casario, há ainda a Foz, mas só ao pôr do sol. Seja qual for, é sempre um sítio por reserva.',
    when:
      'Em Julho ou Agosto, o encontro em Gaia é por volta das oito, e na Ribeira por volta das sete da tarde. No Inverno, a versão de fim de tarde passa para meio da tarde, porque escurece cedo. O fim de Setembro e Outubro são a altura ideal para uma escapadinha: dias amenos, menos estrangeiros e a vindima a uma hora, no Douro, para quem quiser esticar a viagem. No fim-de-semana do São João, guarde a noite para a festa e a sessão para outra manhã.',
    faqs: [
      {
        question: 'Chegamos sexta à noite e saímos domingo. Que dia escolher?',
        answer:
          'Sábado de manhã. Se chover, sobra o domingo, e no Porto fora do Verão essa margem conta. E uma sessão em Gaia logo cedo acaba quando os museus e as caves ainda estão a abrir, por isso não tira nada ao resto do dia.',
      },
      {
        question: 'Vamos com dois filhos pequenos. Há algum cuidado especial?',
        answer:
          'Escolham a manhã em Gaia: o chão é plano, há espaço e ainda não há grupos. As ruelas da Ribeira sobem a pique e cansam pernas pequenas, por isso a tarde funciona melhor com crianças que já andam bem.',
      },
      {
        question: 'Quando ficam prontas as fotografias?',
        answer:
          'Em {delivery}, quase sempre antes de chegarem a casa. São {photos} imagens editadas, umas de perto e outras com o rio e a cidade a abrir por trás, prontas para mandar à família no grupo de mensagens.',
      },
    ],
  },

  'headshots': {
    title: 'Retrato Corporativo no Porto',
    description: 'Retrato corporativo no Porto para equipas: um fundo, uma luz e um enquadramento iguais para todos, montados no vosso escritório. Galeria em {delivery}.',
    intro:
      'Um retrato corporativo no Porto encomenda-o normalmente o departamento de marketing ou de recursos humanos, quando reparam que a página da equipa no site tem fotografias de seis origens: uma de casamento, outra recortada de um grupo, uma de férias. O trabalho é acabar com isso. Cada pessoa com o mesmo fundo, a mesma luz e a cabeça à mesma altura no enquadramento, para a página parecer de uma empresa e não um álbum de família. Para quem precisa só do seu, para o LinkedIn ou uma candidatura, o resultado é o mesmo: um retrato sério, sem ar de fotografia de documento.',
    where:
      'Onde for mais prático para a empresa, e quase sempre é no próprio escritório. O fotógrafo instala um fundo portátil e a luz numa sala de reuniões, e as pessoas vão aparecendo por turnos, sem perder mais do que uns minutos de trabalho. Num espaço que conhecem, as pessoas relaxam mais depressa do que num estúdio desconhecido, e isso nota-se nos olhos. Para independentes ou empresas sem uma sala livre, há a opção de estúdio, cuja morada segue com a confirmação. Fundo de cidade ou de rio já é outro serviço, o retrato lifestyle.',
    when:
      'Em interior, a meteorologia não interessa, o que permite fixar a data sem margem de segurança mesmo em pleno Inverno portuense. Interessa a hora: as caras estão melhores de manhã do que às seis da tarde. Numa equipa grande, evite dias de fecho ou de reunião geral, e não ponha a pessoa mais tensa em primeiro lugar; depois de ver os colegas a sair bem-dispostos, entra mais descontraída.',
    faqs: [
      {
        question: 'Quem entrar daqui a uns meses fica com um retrato igual?',
        answer:
          'Fica. Basta indicar que tem de combinar com o conjunto já feito e enviar uma das imagens entregues. O fotógrafo repete o fundo, a luz, o corte e a altura da cabeça, numa nova ida ao escritório ou em estúdio, e ninguém nota a diferença na página.',
      },
      {
        question: 'Que condições precisamos de ter no escritório?',
        answer:
          'Uma sala ou um canto desimpedido e uma tomada por perto. Janela é um bónus, não uma exigência, porque a luz vem com o fotógrafo. O espaço confirma-se convosco antes do dia, para não haver surpresas na montagem.',
      },
      {
        question: 'Parte da equipa está em Lisboa. Os retratos vão bater certo?',
        answer:
          'Vão, se a segunda sessão copiar a primeira. Mandem as imagens de referência de onde se fotografar primeiro, e quem fizer a outra cidade trabalha a partir delas. Fica um único conjunto, embora feito em dois sítios e por duas pessoas.',
      },
    ],
  },

  'personal-brand': {
    title: 'Personal Branding no Porto',
    description: 'Personal branding no Porto: {duration} entre o seu espaço de trabalho e a beira-rio na hora certa, {photos} imagens para site e redes. Desde {price}.',
    intro:
      'Uma sessão de personal branding no Porto é para quem vive do próprio nome: uma nutricionista com consultório na Boavista, um advogado a abrir escritório, uma ceramista que vende online. Em duas horas e meia faz-se um arquivo que dura um ano: retratos para a página "sobre mim", imagens largas para apresentações, mãos, ferramentas e pormenores para as redes. Ao contrário das sessões de meia hora, aqui há tempo para dois ou três cenários, e a cidade pode aparecer ao lado do trabalho em vez de o substituir.',
    where:
      'O primeiro cenário deve ser o seu: o consultório, o atelier, a cozinha, a secretária. É lá que a marca é credível. A seguir, um ou dois exteriores escolhidos pela hora. Numa sessão de tarde, a Ribeira dá granito, rio e luz quente, e pode fechar-se no topo da Luís I quando o sol desce sobre a cidade. Numa sessão de manhã, a sequência vira-se: São Bento muito cedo, se os azulejos disserem alguma coisa sobre o seu trabalho, e depois o cais de Gaia com a cidade antiga de frente. O fotógrafo ajuda a encadear tudo a pé.',
    when:
      'Como as margens acendem a horas opostas, a sessão agarra-se a uma ponta do dia. No Verão, uma sessão de tarde que acabe no pôr do sol pode prolongar-se até às nove; nos meses curtos, tem de estar terminada pelas cinco. Setembro e Outubro são confortáveis para trocar de roupa e andar entre sítios. Se o calendário cair na época das chuvas, aumente a parte de interior e deixe o exterior para a primeira aberta.',
    faqs: [
      {
        question: 'Quantos coordenados devo trazer?',
        answer:
          'Dois ou três, um por cenário, escolhidos pelo que veste quando trabalha e não pelo que veste num casamento. O fotógrafo indica onde trocar de roupa entre locais, para não se gastar tempo a procurar uma casa de banho.',
      },
      {
        question: 'Recebo as imagens em formatos para o site e para o Instagram?',
        answer:
          'Recebe. As fotografias principais vêm em vertical e em horizontal, prontas para banner, apresentação e publicações. São {photos} imagens editadas no total, entregues em {delivery}.',
      },
      {
        question: 'A minha sócia pode participar?',
        answer:
          'Pode. Reserva-se uma parte do tempo para as duas juntas e para imagens a trabalhar em conjunto. Avise ao marcar, para a divisão das duas horas e meia ser justa e cada uma sair com retratos individuais suficientes.',
      },
    ],
  },

  'eventos-de-empresa': {
    title: 'Fotógrafo de Eventos de Empresa no Porto',
    description: 'Fotógrafo de eventos de empresa no Porto: conferências, lançamentos e jantar de Natal, {duration} de cobertura e primeira selecção na mesma noite.',
    intro:
      'Um fotógrafo de eventos de empresa no Porto cobre aquilo que a equipa de comunicação vai precisar na manhã seguinte: o orador principal em palco, a sala cheia, os convidados a conversar, o logótipo bem visível e as caras certas nas fotografias certas. São cinco horas de cobertura para uma conferência, um lançamento de produto ou o jantar de fim de ano, e uma primeira selecção chega na mesma noite, para que o post no LinkedIn não fique para quinta-feira. O resto da galeria, retocado, segue em poucos dias.',
    where:
      'O evento é no espaço que a empresa escolheu, em qualquer ponto do Porto ou dos concelhos à volta servidos a partir da cidade. O fotógrafo chega antes do início para ver a sala, perceber de onde vem a luz do palco e onde ficam os ecrãs, e combinar consigo quem são as pessoas que não podem faltar nas fotografias. Se o programa incluir um momento ao ar livre, como uma fotografia de grupo junto ao rio, convém lembrar que a Ribeira só tem luz ao fim do dia e que o cais de Gaia é o lado bom de manhã.',
    when:
      'A hora é a do programa, e as cinco horas começam onde fizer mais sentido: muitas vezes um pouco antes das boas-vindas, para apanhar a sala ainda arrumada e a equipa de organização. Dezembro é o mês mais pedido, com os jantares de Natal; marque cedo. Nos eventos de Inverno, conte que a luz natural acaba pouco depois das cinco, por isso qualquer fotografia de grupo no exterior faz-se de manhã ou ao início da tarde.',
    faqs: [
      {
        question: 'Precisamos das fotografias para as redes no próprio dia. É possível?',
        answer:
          'É para isso que existe a primeira selecção na mesma noite: um conjunto curto de imagens prontas a publicar, enviado ainda durante ou logo a seguir ao evento. A galeria completa, com {photos} fotografias retocadas, chega em {delivery}.',
      },
      {
        question: 'A conferência dura o dia inteiro. As cinco horas chegam?',
        answer:
          'Para muitos eventos, sim, se forem bem colocadas: abertura, oradores principais, intervalos e o momento de networking. Para cobrir um dia inteiro ou dois dias, diga-nos o programa ao reservar e orçamentamos uma cobertura mais longa por escrito.',
      },
      {
        question: 'Fazem também retratos dos oradores no mesmo dia?',
        answer:
          'Podem fazer-se durante um intervalo, num canto com fundo neutro, se o programa deixar margem. Combine antes quem são e quanto tempo há, para não se perder o que acontece no palco entretanto.',
      },
    ],
  },

  'real-estate': {
    title: 'Fotografia Imobiliária e AL no Porto',
    description: 'Fotografia imobiliária e Alojamento Local no Porto: à hora em que as divisões apanham sol, verticais corrigidas, {photos} imagens entregues em {delivery}.',
    intro:
      'A fotografia imobiliária no Porto começa por uma pergunta sobre orientação. No centro histórico, muitos apartamentos dão para ruas estreitas que só apanham luz a certas horas, e um anúncio de Alojamento Local fotografado à hora errada faz um T1 luminoso parecer uma cave. Por isso a marcação segue a orientação das janelas, casa a casa, e o anúncio fica parecido com aquilo que o hóspede encontra ao abrir a porta. Paredes direitas, cores limpas de lâmpadas amareladas, e ficheiros prontos em {delivery}, a tempo de trocar as fotografias no próprio dia.',
    where:
      'A sessão faz-se no próprio imóvel, onde quer que esteja: centro histórico, Gaia, Matosinhos, Foz, Leça, Espinho ou Vila do Conde. Um estúdio ou um T1 cabem bem na sessão base, com vista incluída. Se a casa estiver virada para o rio, a vista da janela faz parte do anúncio e a hora pesa ainda mais: um apartamento em Gaia com a Ribeira em frente rende mais de manhã, enquanto um apartamento na própria Ribeira, de ruas viradas a noroeste, tem a melhor luz ao fim da tarde.',
    when:
      'A hora escolhe-se pela orientação, não pela agenda do proprietário. Entre Novembro e Fevereiro, como escurece cedo, aponta-se para a hora de almoço. Dias cinzentos não são um problema para interiores, porque dão luz suave e uniforme; um dia de sol só faz diferença quando a vista é um dos argumentos do anúncio. Se quer o anúncio renovado para o Verão, faça-o na Primavera, quando os dias já são compridos e a casa ainda não está ocupada.',
    faqs: [
      {
        question: 'O meu AL é num rés-do-chão no centro histórico. Vale a pena?',
        answer:
          'Vale, desde que a hora seja bem escolhida e todas as luzes estejam acesas. As fotografias corrigem cor e verticais, mas não inventam luz que a casa não tem: um anúncio honesto evita avaliações más de hóspedes que esperavam outra coisa.',
      },
      {
        question: 'Como devo preparar o apartamento?',
        answer:
          'Camas feitas com roupa lisa, superfícies livres, objectos pessoais guardados, estores abertos e todas as lâmpadas a funcionar. Meia hora de arrumação antes poupa mais do que qualquer edição depois.',
      },
      {
        question: 'Tenho vários apartamentos no mesmo prédio. Faz-se tudo numa visita?',
        answer:
          'Faz-se numa só ida, mas os {duration} da sessão base não chegam. Mande a lista de fracções e tipologias quando pedir a marcação e recebe um valor fechado para o conjunto antes de se comprometer.',
      },
    ],
  },

  'food': {
    title: 'Fotografia Gastronómica no Porto',
    description: 'Fotografia gastronómica no Porto: a sua carta fotografada num só serviço, nas suas mesas e com a luz das suas janelas. Até doze pratos, desde {price}.',
    intro:
      'Fotografia gastronómica no Porto, feita como deve ser, não sai da sua casa: os pratos são fotografados nas mesas onde os clientes se sentam, com os talheres e copos que usa todos os dias, para que quem os veja no Instagram ou numa plataforma de entregas reconheça a sala quando entra. A dificuldade portuense é conhecida de quem tem restaurante na Baixa ou na Ribeira: prédios de granito, paredes de meio metro, janelas estreitas. Escolher bem a mesa e o momento vale mais do que qualquer lente. Em três horas fazem-se até doze pratos, da francesinha ao polvo, mais umas vistas da sala.',
    where:
      'O fotógrafo vai ao restaurante, na cidade ou em Matosinhos, Gaia, Leça ou outro concelho da zona coberta. A primeira coisa que faz é dar uma volta à sala com o chefe ou o gerente e escolher a mesa onde a janela trabalha melhor; os pratos passam todos por ali, um de cada vez. Nas casas antigas do centro, com salas compridas e pouco abertas, ilumina-se a mesa quando a janela não chega, mantendo o ambiente quente da casa em vez de um ar de catálogo. Esplanada ou vista para o Douro, se existirem, ganham as suas próprias imagens.',
    when:
      'Combine a sessão para a manhã, antes de abrir para o almoço, ou para a pausa da tarde, quando a cozinha consegue empratar com calma e não há clientes à espera. Como a janela é a principal fonte de luz, o Inverno empurra tudo para perto do meio-dia: em Dezembro, a meio da tarde a sala já está escura. No Verão a escolha é mais larga, mas evite a esplanada com o sol a pique, que deixa sombras duras no prato.',
    faqs: [
      {
        question: 'A cozinha faz todos os pratos de uma vez?',
        answer:
          'Não, um a um. Cada prato sai do passe directamente para a mesa fotografada e só então se pede o seguinte, para nada chegar à câmara frio ou abatido. Combinem a ordem antes, começando pelo que derrete ou murcha mais depressa.',
      },
      {
        question: 'Doze pratos chegam para a nossa carta?',
        answer:
          'Para a maioria das cartas chegam, escolhendo os que vendem mais e os que representam a casa. As {duration} dão {photos} imagens editadas. Uma carta muito extensa, os vinhos à parte ou retratos da equipa pedem mais tempo, com valor combinado antes.',
      },
      {
        question: 'Precisamos de fotografias no formato das plataformas de entrega. Isso é possível?',
        answer:
          'É. Indiquem quando marcarem em que plataformas vão aparecer, e o fotógrafo deixa margem à volta do prato para os cortes que essas aplicações impõem. As mesmas imagens servem depois para o site e para a carta impressa.',
      },
    ],
  },

  'book-de-modelo': {
    title: 'Book de Modelo no Porto desde {price}',
    description: 'Book de modelo no Porto: polaroids de agência primeiro, depois um look editorial no granito da Ribeira ou na luz aberta da Foz. {photos} fotografias.',
    intro:
      'Um book de modelo no Porto faz sentido para quem está a dar os primeiros passos a partir do Norte e precisa de material actual antes de mandar o primeiro email a uma agência. A meia hora divide-se em duas partes que não se misturam. Primeiro, as imagens cruas que qualquer booker pede: rosto limpo, cabelo preso, corpo inteiro, perfil, sem truques. Depois, um único look trabalhado, onde a cidade entra como textura e mostra a versatilidade que as polaroids, de propósito, escondem. Sai-se com as duas coisas no mesmo conjunto.',
    where:
      'Para a parte crua basta luz uniforme e uma parede lisa, e o fotógrafo indica o sítio ao confirmar a marcação. Para o look trabalhado, escolha entre dois cenários com personalidades opostas. A Ribeira, já perto do pôr do sol, oferece pedra escura, portas pintadas e cor quente nas fachadas: dá um registo de moda com atmosfera. A Foz do Douro oferece o contrário, céu, mar e espaço, um registo mais leve, próximo da publicidade. A estação de São Bento fica de fora, por ser um sítio de passagem onde não há onde trocar de roupa.',
    when:
      'A parte crua pede luz sem sombras duras, por isso o meio-dia de Verão é a pior escolha. O look trabalhado depende do cenário: a Ribeira só ganha cor nas duas horas antes de o sol se pôr, e a Foz aguenta o fim do dia em qualquer mês. Abril, Maio, Setembro e Outubro são os meses mais simpáticos para roupa leve ao ar livre. Se uma agência estiver à espera, lembre-se de que a galeria demora {delivery}.',
    faqs: [
      {
        question: 'O que devo vestir na primeira parte?',
        answer:
          'Peças pretas, simples e justas ao corpo, sem logótipos nem padrões, e sapatos discretos. Leve também as suas medidas actualizadas, porque as agências pedem-nas junto com as imagens. Para o look trabalhado, traga aquilo que melhor representa o trabalho que quer fazer.',
      },
      {
        question: 'Sou menor de idade. O que muda?',
        answer:
          'Muda pouco na sessão e muito na logística: um adulto responsável tem de acompanhar do princípio ao fim, e convém indicar a idade quando faz a marcação. Para quem está a começar, a parte crua é a que as agências mais olham, por isso ganha mais peso no tempo disponível.',
      },
      {
        question: 'Posso trazer alguém para fazer a maquilhagem?',
        answer:
          'Pode, mas só entra em acção depois da parte crua, que se faz de cara lavada. Avise a pessoa do cenário escolhido: o vento da Foz desfaz penteados em minutos, e a luz quente da Ribeira pede uma base diferente da que se usa ao sol aberto.',
      },
    ],
  },

  'finalistas': {
    title: 'Sessão de Finalistas no Porto',
    description: 'Sessão de finalistas no Porto, de traje e capa: Ribeira à sombra para o preto ter textura, grupo e individuais nos mesmos {duration}. Desde {price}.',
    intro:
      'Numa sessão de finalistas no Porto, o adversário é o próprio traje. Tecido preto ao sol forte vira uma silhueta sem costuras, sem dobras e sem relevo, e os rostos ficam de olhos semicerrados por cima. A solução não está na edição, está na hora e no sítio: sombra aberta, céu encoberto ou luz baixa. E a cidade, por sorte, tem uma margem que passa a manhã sem sol directo. O resto é organização: o curso inteiro junto enquanto ninguém se foi embora, depois cada um com a sua capa e as suas fitas, a tempo de guardar uma fotografia digna antes de cada colega seguir o seu caminho.',
    where:
      'Com muita gente, o cais de Gaia ganha: é comprido e desafogado, cabe uma fila dupla de capas sem ninguém tapado, e por trás aparecem o rio, a ponte e a cidade antiga. Com poucos, ou para os retratos a solo, a Ribeira de manhã é a aposta mais inteligente: as ruas, viradas a noroeste, ainda não apanharam sol, e essa sombra luminosa desenha o tecido. A estação de São Bento é bonita mas é de quem vai apanhar o comboio, e um curso de capa às costas entope a entrada em segundos; só funciona muito cedo e com três ou quatro pessoas.',
    when:
      'A Queima das Fitas, em Maio, concentra os pedidos e os fins de tarde esgotam primeiro, por isso marque cedo. Fora dessa semana há muito mais escolha e os sítios estão quase vazios. Na Ribeira, aposte na manhã, pela sombra. No cais de Gaia, de manhã, o sol bate de frente em quem está de costas para o rio, por isso aí o ideal é um dia de céu encoberto, que dá ao preto a mesma textura sem ninguém de olhos semicerrados.',
    faqs: [
      {
        question: 'Somos quinze do mesmo curso. Dá tempo para todos?',
        answer:
          'Com quinze, meia hora fica apertada para fotografias de grupo e um retrato de cada um. Digam o número quando fizerem a marcação: alarga-se a sessão com um preço combinado antes, e não a meio, quando já estão todos de capa vestida à espera.',
      },
      {
        question: 'A família pode assistir?',
        answer:
          'Pode, e alguém para guardar mochilas e casacos é sempre útil. Peçam só que as fotografias de telemóvel fiquem para o fim: um curso dividido entre duas lentes acaba com metade das caras viradas para o lado errado.',
      },
      {
        question: 'Vale a pena marcar para o dia do cortejo?',
        answer:
          'Vale, mas antes de o cortejo sair, com o traje ainda limpo e sem nódoas. Depois da festa já é outra fotografia, com outra história. As {photos} imagens chegam em {delivery}, a tempo do convite do jantar de curso.',
      },
    ],
  },
};
