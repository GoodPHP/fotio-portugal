import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the corporate and commercial services.
 *
 * These pages are read by someone spending a company's money, so the copy
 * answers procurement questions — what it costs per head, what formats come
 * out, when it lands — rather than describing a mood.
 */
export const BUSINESS_SERVICE_SEO: Record<string, ServiceSeo> = {
  headshots: {
    title: { en: 'Corporate Headshots', pt: 'Retrato corporativo' },
    description: {
      en: 'One consistent look across a team, or one portrait that does not look like a passport photo. 45 minutes, 15 retouched images per person. From €150.',
      pt: 'Um registo coerente para toda a equipa, ou um retrato que não pareça foto tipo passe. 45 minutos, 15 imagens retocadas por pessoa. Desde 150 €.',
    },
    heading: { en: 'Consistency is the product', pt: 'A coerência é o produto' },
    paragraphs: {
      en: [
        'A team page where every portrait was taken by a different person in a different room at a different time reads as exactly that, and it undercuts the thing the page exists to do. The work here is mostly discipline rather than artistry: the same framing, the same background, the same distance and the same light for everybody, so that forty portraits sit on a grid without one of them pulling the eye for the wrong reason.',
        'Forty-five minutes per person covers a neutral background and a second, softer set-up, and fifteen retouched images is enough to choose from without turning the decision into a project. It happens at your office or in a studio; the office is usually better, because people are less self-conscious in a room they already work in. Delivered to a private gallery within 48 hours, with square and 4:5 crops of every keeper so nothing has to be recropped by hand for each platform.',
      ],
      pt: [
        'Uma página de equipa em que cada retrato foi feito por uma pessoa diferente, numa sala diferente e a uma hora diferente lê-se exactamente como isso, e destrói aquilo que a página existe para fazer. O trabalho aqui é sobretudo disciplina e não arte: o mesmo enquadramento, o mesmo fundo, a mesma distância e a mesma luz para toda a gente, para que quarenta retratos assentem numa grelha sem que um deles puxe o olho pela razão errada.',
        'Quarenta e cinco minutos por pessoa dão para um fundo neutro e um segundo esquema mais suave, e quinze imagens retocadas chegam para escolher sem transformar a decisão num projecto. Faz-se no escritório ou em estúdio; o escritório costuma ser melhor, porque as pessoas estão menos constrangidas numa sala onde já trabalham. Entrega em galeria privada em 48 horas, com cortes quadrado e 4:5 de cada imagem escolhida.',
      ],
    },
  },

  'personal-brand': {
    title: { en: 'Personal Branding Session', pt: 'Sessão de personal branding' },
    description: {
      en: 'A library of images for a site, a deck and a year of posts, made in one afternoon: two and a half hours, 60 retouched photographs. From €290.',
      pt: 'Um acervo de imagens para um site, uma apresentação e um ano de publicações, feito numa tarde: duas horas e meia, 60 fotografias. Desde 290 €.',
    },
    heading: { en: 'One afternoon, a year of material', pt: 'Uma tarde, um ano de material' },
    paragraphs: {
      en: [
        'The failure mode of a branding session is coming away with sixty versions of one photograph. Sixty images are only useful if they are different in the ways you will need them to be different: some with space for text and some without, some vertical and some horizontal, some of you working and some of you looking at the camera. That is a planning decision made before the session, not an editing decision made after it.',
        'Two and a half hours covers two or three settings — a desk, a street, a workshop — with a change of clothes between them, which is what makes a single afternoon look like several days across a year of posts. Every key frame is delivered in vertical and horizontal crops so nothing has to be re-cropped by hand for each platform. Sixty retouched photographs, private gallery within 72 hours.',
      ],
      pt: [
        'A forma habitual de falhar uma sessão de branding é sair de lá com sessenta versões da mesma fotografia. Sessenta imagens só servem se forem diferentes nas coisas em que vai precisar que sejam diferentes: umas com espaço para texto e outras sem, umas verticais e outras horizontais, umas a trabalhar e outras a olhar para a câmara. Isso é uma decisão de planeamento antes da sessão, não de edição depois dela.',
        'Duas horas e meia dão para dois ou três cenários — uma secretária, uma rua, uma oficina — com muda de roupa entre eles, e é isso que faz uma tarde parecer vários dias ao longo de um ano de publicações. Cada imagem principal é entregue em corte vertical e horizontal, para não ter de recortar à mão para cada plataforma. Sessenta fotografias retocadas, galeria privada em 72 horas.',
      ],
    },
  },

  'digital-nomad-headshots': {
    title: { en: 'Remote-Work Headshots, Lisbon', pt: 'Retratos para trabalho remoto' },
    description: {
      en: 'A profile photograph made where you actually are, not in a studio four time zones from your employer. One hour, 20 retouched images, delivered in 24h.',
      pt: 'Uma fotografia de perfil feita onde está de facto. Uma hora, 20 imagens retocadas, entregues em 24 horas.',
    },
    heading: { en: 'For people whose office is a timezone away', pt: 'Para quem tem o escritório noutro fuso' },
    paragraphs: {
      en: [
        'Lisbon has a large population of people employed by companies that have never seen them, and the standard corporate headshot is wrong for all of them. A studio backdrop signals an office, and the whole point is that there is not one. This is the same discipline — consistent framing, good light, a face that looks like the person — done outdoors or in a co-working space, so that the result matches the working life it represents.',
        'One hour, twenty retouched images, and delivery within twenty-four hours, because the usual reason for booking is a profile that needs updating this week rather than a project. Every keeper comes in square, 4:5 and banner crops, which covers every platform a remote worker actually uses without anyone opening an image editor. If a team is in town at the same time, the same session repeated back to back keeps the framing consistent across all of them.',
      ],
      pt: [
        'Lisboa tem muita gente empregada por empresas que nunca a viram, e o retrato corporativo habitual está errado para todas elas. Um fundo de estúdio sugere um escritório, e o ponto é precisamente não haver nenhum. Isto é a mesma disciplina — enquadramento coerente, boa luz, uma cara parecida com a pessoa — feita na rua ou num espaço de cowork.',
        'Uma hora, vinte imagens retocadas e entrega em vinte e quatro horas, porque a razão habitual para marcar é um perfil que precisa de ser actualizado esta semana. Cada imagem escolhida vem em corte quadrado, 4:5 e banner, o que cobre todas as plataformas sem ninguém abrir um editor de imagem.',
      ],
    },
  },

  'eventos-de-empresa': {
    title: { en: 'Corporate Event Photographer', pt: 'Fotógrafo de eventos de empresa' },
    description: {
      en: 'Conferences, launches and the annual dinner: five hours, 200 retouched photographs and a first selection the same evening for communications.',
      pt: 'Conferências, lançamentos e o jantar de final de ano: cinco horas, 200 fotografias retocadas e uma primeira selecção na mesma noite.',
    },
    heading: { en: 'The first selection is the one that gets used', pt: 'A primeira selecção é a que é usada' },
    paragraphs: {
      en: [
        'A corporate event has a communications deadline that is usually the same evening, and a gallery delivered three days later has missed the only moment anyone wanted it. So the deliverable is split: a small edited selection goes out the same night, while it is still news, and the full two hundred images follow within seventy-two hours for the archive and the next campaign.',
        'Five hours covers the arrival, the talks and the part afterwards where the useful photographs actually are — people talking to each other rather than a stage with a slide on it. Stage photography is the easy half; the room is the half that requires knowing when to be somewhere. A briefing beforehand on who matters and what has to be on record is worth more than any equipment decision, and it takes ten minutes.',
      ],
      pt: [
        'Um evento de empresa tem um prazo de comunicação que costuma ser na mesma noite, e uma galeria entregue três dias depois já perdeu o único momento em que alguém a queria. Por isso a entrega é dividida: uma pequena selecção editada sai na mesma noite, enquanto ainda é notícia, e as duzentas imagens completas seguem em setenta e duas horas para o arquivo e para a campanha seguinte.',
        'Cinco horas cobrem a chegada, as intervenções e a parte a seguir, onde estão de facto as fotografias úteis — pessoas a falar umas com as outras e não um palco com um diapositivo. O palco é a metade fácil; a sala é a metade que exige saber quando estar num sítio. Um briefing prévio sobre quem interessa e o que tem de ficar registado vale mais do que qualquer decisão de equipamento, e demora dez minutos.',
      ],
    },
  },

  'real-estate': {
    title: { en: 'Property & Alojamento Local Photos', pt: 'Fotografia imobiliária e AL' },
    description: {
      en: 'Interiors shot at the hour the rooms actually get their light, verticals corrected and colour cast removed. 25 images, delivered in 24h. From €160.',
      pt: 'Interiores fotografados à hora em que as divisões apanham luz, verticais corrigidas e dominantes removidas. 25 imagens em 24 h. Desde 160 €.',
    },
    heading: { en: 'Photograph the flat when the flat has light', pt: 'Fotografe a casa quando a casa tem luz' },
    paragraphs: {
      en: [
        'The single thing that separates a listing that performs from one that does not is whether the rooms were photographed when they face the sun. A south-facing flat shot at nine in the morning and the same flat shot at four are two different properties as far as a listing is concerned, and the difference is free — it costs a phone call to find out which way the windows point before anyone drives over.',
        'Portugal’s Alojamento Local market makes this a recurring job rather than a one-off: a registered short-term rental competes on a thumbnail against a hundred others in the same postcode. Twenty-five images, verticals corrected so the walls are parallel, and the orange cast that tungsten lighting puts on every white wall removed rather than left to look like a filter. Delivered within twenty-four hours, because a listing that is not live is not earning.',
      ],
      pt: [
        'A única coisa que separa um anúncio que funciona de um que não funciona é se as divisões foram fotografadas quando apanham sol. Uma casa virada a sul fotografada às nove da manhã e a mesma casa fotografada às quatro são, para efeitos de anúncio, dois imóveis diferentes, e a diferença é gratuita — custa um telefonema para saber para onde estão viradas as janelas antes de alguém se deslocar.',
        'O mercado do Alojamento Local faz disto um trabalho recorrente e não pontual: um alojamento registado concorre numa miniatura contra uma centena de outros no mesmo código postal. Vinte e cinco imagens, verticais corrigidas para que as paredes fiquem paralelas, e a dominante alaranjada que a luz de tungsténio põe em todas as paredes brancas removida em vez de deixada com ar de filtro. Entrega em vinte e quatro horas, porque um anúncio que não está no ar não está a render.',
      ],
    },
  },

  food: {
    title: { en: 'Restaurant & Food Photography', pt: 'Fotografia gastronómica' },
    description: {
      en: 'A menu photographed in one service, in the room it is served in: up to twelve dishes, 30 retouched images, delivered in 72 hours. From €320.',
      pt: 'Uma ementa fotografada num serviço, na sala onde é servida: até doze pratos, 30 imagens retocadas, entrega em 72 horas. Desde 320 €.',
    },
    heading: { en: 'In the room, not in a studio', pt: 'Na sala, não em estúdio' },
    paragraphs: {
      en: [
        'Food shot in a studio looks like food shot in a studio, and it is the wrong answer for a restaurant, because what a restaurant is selling is partly the room. Shooting on site in daylight — at a table by the window, between services, with the actual plates and the actual light — produces images that match what arrives in front of a customer, which is the only test that matters.',
        'A dozen dishes in one service is the realistic ceiling. Food has a working life of about ninety seconds before it stops photographing well, so the sequence is planned with the kitchen beforehand and each plate comes out when the camera is ready rather than the other way round. Thirty retouched images, delivered within seventy-two hours, in crops that work for a menu, a site header and a square post without recropping.',
      ],
      pt: [
        'Comida fotografada em estúdio parece comida fotografada em estúdio, e para um restaurante é a resposta errada, porque parte do que um restaurante vende é a sala. Fotografar no local com luz natural — a uma mesa junto à janela, entre serviços, com os pratos verdadeiros e a luz verdadeira — dá imagens que correspondem ao que chega à frente do cliente, que é o único teste que interessa.',
        'Uma dúzia de pratos num serviço é o tecto realista. A comida tem uma vida útil de cerca de noventa segundos antes de deixar de fotografar bem, por isso a sequência combina-se antes com a cozinha e cada prato sai quando a câmara está pronta, e não ao contrário. Trinta imagens retocadas, entregues em setenta e duas horas, em cortes que servem para ementa, cabeçalho de site e publicação quadrada sem recortar outra vez.',
      ],
    },
  },

  'book-de-modelo': {
    title: { en: 'Model Portfolio Session', pt: 'Book de modelo' },
    description: {
      en: 'Agency digitals and editorial frames in the same portfolio: three hours, three looks, 40 retouched photographs, private gallery within a week.',
      pt: 'Polaroids de agência e imagens editoriais no mesmo book: três horas, três looks, 40 fotografias retocadas, galeria privada numa semana.',
    },
    heading: { en: 'Digitals and editorial are not the same job', pt: 'Polaroids e editorial não são o mesmo trabalho' },
    paragraphs: {
      en: [
        'An agency looks at two things and they contradict each other. Digitals are deliberately plain — flat light, no makeup, hair back, a white wall — and exist so that a booker can see the face and the proportions without anything in the way. Editorial frames are the opposite: styled, lit, and there to show what the face does when something is asked of it. A portfolio that contains only one of the two is answering half the question.',
        'Three hours covers three looks and both registers, which is what makes a single session usable rather than a first instalment. Forty retouched photographs, delivered to a private gallery within a week, in the file sizes agencies actually ask for. The retouching on the digitals is deliberately minimal — they exist to be accurate, and a heavily worked digital is worse than none at all, because the first thing it does is raise a question at the casting.',
      ],
      pt: [
        'Uma agência olha para duas coisas e elas contradizem-se. As polaroids são propositadamente simples — luz chapada, sem maquilhagem, cabelo atrás, uma parede branca — e existem para que quem selecciona veja a cara e as proporções sem nada pelo meio. As imagens editoriais são o contrário: com styling, com luz, e servem para mostrar o que a cara faz quando se lhe pede alguma coisa. Um book que só tenha uma das duas está a responder a metade da pergunta.',
        'Três horas dão para três looks e para os dois registos, e é isso que torna uma sessão utilizável em vez de uma primeira prestação. Quarenta fotografias retocadas, entregues em galeria privada numa semana, nos tamanhos de ficheiro que as agências pedem de facto. O retoque nas polaroids é deliberadamente mínimo — existem para ser exactas, e uma polaroid muito trabalhada é pior do que nenhuma, porque a primeira coisa que faz é levantar uma dúvida no casting.',
      ],
    },
  },
};
