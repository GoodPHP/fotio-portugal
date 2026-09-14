import type { ServiceSeo } from './service-seo';

/**
 * SERP and long-form copy for the travel, fashion and remaining services.
 *
 * The travel sessions are the ones booked by someone who is already in France
 * with a day to spare, so the copy answers the question they are actually
 * asking: how does this fit into a trip I have already planned.
 */
export const LIFESTYLE_SERVICE_SEO: Record<string, ServiceSeo> = {
  vacation: {
    title: { en: 'Holiday Photo Session', pt: 'Sessão de férias' },
    description: {
      en: 'An hour out of a trip, at the one time of day the place is worth photographing. 30 retouched photographs, one neighbourhood, gallery in 48h.',
      pt: 'Uma hora tirada a uma viagem, à única hora do dia em que o sítio vale a pena. 30 fotografias retocadas, uma zona, galeria em 48 h.',
    },
    heading: { en: 'One hour, and it has to be the right one', pt: 'Uma hora, e tem de ser a certa' },
    paragraphs: {
      en: [
        'An hour is enough for a holiday session and it is only enough if it is the right hour. Every location on this site has one — the Lisbon miradouros before nine, the Porto riverfront after six, an Algarve cove at low tide — and a session booked for eleven in the morning because it suited the day gets a version of the place that nobody would choose. The scheduling is the service; the photography is the easy part.',
        'Thirty retouched photographs from one neighbourhood on foot, which is deliberately not a tour. A session that tries to take in four districts spends the hour in transit and comes back with four backgrounds and no photographs. One place, properly, at the hour it works, delivered to a private gallery within 48 hours so it is on your phone before the trip ends rather than a month after it.',
      ],
      pt: [
        'Uma hora chega para uma sessão de férias e só chega se for a hora certa. Todos os sítios deste site têm uma — os miradouros de Lisboa antes das nove, a frente ribeirinha do Porto depois das seis, uma praia do Algarve com maré baixa — e uma sessão marcada para as onze da manhã por dar jeito ao dia fica com uma versão do sítio que ninguém escolheria. O horário é o serviço; fotografar é a parte fácil.',
        'Trinta fotografias retocadas de uma zona só, a pé, o que é deliberadamente o contrário de um circuito. Uma sessão que tente apanhar quatro bairros gasta a hora em deslocações e volta com quatro fundos e nenhuma fotografia. Um sítio, bem feito, à hora em que resulta, entregue em galeria privada em 48 horas, para estar no telemóvel antes de a viagem acabar e não um mês depois.',
      ],
    },
  },

  honeymoon: {
    title: { en: 'Honeymoon Photo Session', pt: 'Sessão de lua de mel' },
    description: {
      en: 'The one set of photographs of the two of you that is not from the wedding day. Ninety minutes, two locations, 40 retouched images. From €240.',
      pt: 'O único conjunto de fotografias dos dois que não é do dia do casamento. Noventa minutos, dois locais, 40 imagens retocadas. Desde 240 €.',
    },
    heading: { en: 'Different from the wedding photographs on purpose', pt: 'Diferente das fotografias do casamento, de propósito' },
    paragraphs: {
      en: [
        'Wedding photographs are of an event, and however good they are, everyone in them is performing a role for a day. A honeymoon session is the same two people a fortnight later with nothing to organise and nobody watching, and it produces a completely different set of images — which is the argument for booking one rather than deciding you already have enough photographs of yourselves.',
        'Ninety minutes and two locations, chosen for the hour rather than for the postcard. In the Algarve that usually means a clifftop at sunrise and a cove afterwards; in Madeira it means being above the cloud at Pico do Arieiro before the light arrives; in the Azores it means keeping two calderas in play and deciding the evening before. Forty retouched photographs, delivered to a private gallery within 48 hours.',
      ],
      pt: [
        'As fotografias de casamento são de um acontecimento e, por muito boas que sejam, toda a gente nelas está a desempenhar um papel durante um dia. Uma sessão de lua de mel são as mesmas duas pessoas quinze dias depois, sem nada para organizar e sem ninguém a olhar, e dá um conjunto de imagens completamente diferente — que é o argumento para marcar uma em vez de concluir que já há fotografias que cheguem.',
        'Noventa minutos e dois locais, escolhidos pela hora e não pelo postal. No Algarve isso costuma ser uma arriba ao nascer do sol e uma praia a seguir; na Madeira é estar acima da nuvem no Pico do Arieiro antes de a luz chegar; nos Açores é manter duas caldeiras em aberto e decidir na véspera. Quarenta fotografias retocadas, entregues em galeria privada em 48 horas.',
      ],
    },
  },

  'lisbon-photoshoot': {
    title: { en: 'Lisbon Photoshoot', pt: 'Sessão fotográfica em Lisboa' },
    description: {
      en: 'A morning in the city planned around where the light lands, not around a list of sights. Ninety minutes, two or three miradouros on foot. From €190.',
      pt: 'Uma manhã na cidade planeada pela luz e não por uma lista de monumentos. Noventa minutos, dois ou três miradouros a pé. Desde 190 €.',
    },
    heading: { en: 'Before eight, and not on the tram', pt: 'Antes das oito, e não dentro do eléctrico' },
    paragraphs: {
      en: [
        'Two pieces of advice govern a Lisbon session and both of them contradict what the guidebooks say. The first is the hour: the miradouros face north and east over the roofs, they hold usable light from sunrise until about nine, and after that they go flat and fill with people. In July, a session that starts at seven finishes as the first tour groups arrive. At nine there is no photograph left at Senhora do Monte that does not have forty people in it.',
        'The second is tram 28. The honest answer is that the 28E is a commuter line rather than an attraction, and boarding it with equipment at nine in the morning gets you a full carriage and gets in the way of people going to work. The frames worth having are of the tram passing — at Graça, Escolas Gerais or Portas do Sol — in the first hour of service, and the 12E runs a shorter, quieter loop over the same streets. Forty retouched photographs, delivered within 48 hours.',
      ],
      pt: [
        'Há dois conselhos que mandam numa sessão em Lisboa e ambos contrariam o que dizem os guias. O primeiro é a hora: os miradouros estão virados a norte e nascente por cima dos telhados, aguentam luz utilizável do nascer do sol até cerca das nove, e depois achatam e enchem de gente. Em Julho, uma sessão que comece às sete acaba quando chegam os primeiros grupos. Às nove não há fotografia na Senhora do Monte que não leve quarenta pessoas dentro.',
        'O segundo é o eléctrico 28. A resposta honesta é que o 28E é uma linha de quem vive na cidade e não uma atracção, e entrar nele com equipamento às nove da manhã dá uma carruagem cheia e atrapalha quem vai trabalhar. As fotografias que valem a pena são do eléctrico a passar — na Graça, nas Escolas Gerais ou nas Portas do Sol — na primeira hora de serviço, e o 12E faz um percurso mais curto e mais vazio pelas mesmas ruas. Quarenta fotografias retocadas, entregues em 48 horas.',
      ],
    },
  },
};
