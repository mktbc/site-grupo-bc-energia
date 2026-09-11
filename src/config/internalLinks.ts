/**
 * INTERNAL LINKING — catálogo único de âncoras descritivas.
 *
 * Objetivo: todo link contextual do site descreve o destino ("Entenda como
 * funciona o Mercado Livre de Energia") em vez de usar CTA genérico
 * ("Saiba mais", "Clique aqui", "Veja mais").
 *
 * REGRAS:
 *  - Nenhuma rota nova é criada aqui: todos os `href` já existem no projeto
 *    (ver `src/config/routes.ts`).
 *  - Cada destino tem UMA âncora canônica + descrição curta de contexto.
 *  - Os mapas de relacionamento são SELETIVOS: uma solução não aponta para
 *    todos os segmentos, um segmento não lista todas as soluções.
 *  - Conteúdo editorial só entra quando o artigo/episódio existe de fato.
 */

export type InternalLink = {
  /** Âncora descritiva — descreve o destino, nunca "saiba mais". */
  label: string
  href: string
  /** Contexto curto: por que este destino é relevante. */
  description: string
  /** Rótulo curto para cards/hubs (opcional). */
  shortLabel?: string
}

/** Catálogo canônico: rota → âncora descritiva + contexto. */
export const LINK_CATALOG: Record<string, InternalLink> = {
  // Soluções
  '/produtos': {
    label: 'Conheça todas as soluções em energia da BC',
    shortLabel: 'Todas as soluções',
    href: '/produtos',
    description: 'Mercado Livre, geração distribuída, gestão e certificação renovável.'
  },
  '/produtos/mercado-livre-de-energia': {
    label: 'Entenda como funciona o Mercado Livre de Energia',
    shortLabel: 'Mercado Livre de Energia',
    href: '/produtos/mercado-livre-de-energia',
    description: 'Mais liberdade para negociar energia e organizar custos da empresa.'
  },
  '/produtos/consorcio-bc-energia': {
    label: 'Conheça o Consórcio BC Energia',
    shortLabel: 'Consórcio BC Energia',
    href: '/produtos/consorcio-bc-energia',
    description: 'Energia solar por assinatura, sem obra e sem investir em placas.'
  },
  '/produtos/gestao-de-energia': {
    label: 'Veja como funciona a Gestão de Energia',
    shortLabel: 'Gestão de Energia',
    href: '/produtos/gestao-de-energia',
    description: 'Mais controle sobre contratos, medição, consumo e faturamento.'
  },
  '/produtos/certificacao-renovavel-irec': {
    label: 'Entenda a Certificação Renovável I-REC',
    shortLabel: 'Certificação I-REC',
    href: '/produtos/certificacao-renovavel-irec',
    description: 'Comprove a origem renovável da energia consumida pela sua operação.'
  },
  '/produtos/arrendamento-de-usinas': {
    label: 'Conheça o Arrendamento de Usinas',
    shortLabel: 'Arrendamento de Usinas',
    href: '/produtos/arrendamento-de-usinas',
    description: 'Possibilidades de aproveitamento de ativos de geração já existentes.'
  },

  // Segmentos
  '/segmentos': {
    label: 'Veja os segmentos atendidos pelo Grupo BC Energia',
    shortLabel: 'Segmentos atendidos',
    href: '/segmentos',
    description: 'Conteúdo específico por perfil de consumo e tipo de negócio.'
  },
  '/segmentos/agronegocio': {
    label: 'Soluções de energia para o agronegócio',
    shortLabel: 'Agronegócio',
    href: '/segmentos/agronegocio',
    description: 'Consumo com sazonalidade de safra, irrigação e alta demanda.'
  },
  '/segmentos/bares-e-restaurantes': {
    label: 'Soluções de energia para bares e restaurantes',
    shortLabel: 'Bares e restaurantes',
    href: '/segmentos/bares-e-restaurantes',
    description: 'Refrigeração, cozinha e horário de pico no custo da operação.'
  },
  '/segmentos/condominio': {
    label: 'Soluções de energia para condomínios',
    shortLabel: 'Condomínios',
    href: '/segmentos/condominio',
    description: 'Redução do custo de energia das áreas comuns.'
  },
  '/segmentos/educacional': {
    label: 'Soluções de energia para instituições de ensino',
    shortLabel: 'Educacional',
    href: '/segmentos/educacional',
    description: 'Escolas e faculdades com consumo concentrado em período letivo.'
  },
  '/segmentos/lazer': {
    label: 'Soluções de energia para negócios de lazer',
    shortLabel: 'Lazer',
    href: '/segmentos/lazer',
    description: 'Clubes e espaços de entretenimento com consumo sazonal.'
  },
  '/segmentos/religioso': {
    label: 'Soluções de energia para instituições religiosas',
    shortLabel: 'Religioso',
    href: '/segmentos/religioso',
    description: 'Templos e sedes com uso concentrado em dias específicos.'
  },
  '/segmentos/residencial': {
    label: 'Soluções de energia para residências',
    shortLabel: 'Residencial',
    href: '/segmentos/residencial',
    description: 'Economia na conta de luz sem investir em placa solar.'
  },
  '/segmentos/saude': {
    label: 'Soluções de energia para instituições de saúde',
    shortLabel: 'Saúde',
    href: '/segmentos/saude',
    description: 'Operação contínua e fornecimento crítico 24 horas.'
  },
  '/segmentos/servico': {
    label: 'Soluções de energia para empresas de serviços',
    shortLabel: 'Serviços',
    href: '/segmentos/servico',
    description: 'Escritórios e prestadores com custo fixo de energia relevante.'
  },
  '/segmentos/turismo': {
    label: 'Soluções de energia para hotelaria e turismo',
    shortLabel: 'Turismo',
    href: '/segmentos/turismo',
    description: 'Hotéis e resorts com ocupação variável e compromissos ambientais.'
  },
  '/segmentos/varejo': {
    label: 'Soluções de energia para o varejo',
    shortLabel: 'Varejo',
    href: '/segmentos/varejo',
    description: 'Gestão de custo para redes com várias unidades.'
  },

  // Institucional
  '/sobre': {
    label: 'Conheça o Grupo BC Energia',
    shortLabel: 'Sobre o grupo',
    href: '/sobre',
    description: 'Estrutura, atuação e empresas do grupo.'
  },
  '/sobre/quem-somos': {
    label: 'Conheça a história e o propósito do Grupo BC Energia',
    shortLabel: 'Quem somos',
    href: '/sobre/quem-somos',
    description: 'Quem somos, como atuamos e o que nos orienta.'
  },
  '/sobre/nossas-usinas': {
    label: 'Conheça nossa estrutura de geração',
    shortLabel: 'Nossas usinas',
    href: '/sobre/nossas-usinas',
    description: 'Complexos solares e hidrelétricos operados pela BC Renováveis.'
  },
  '/sobre/sustentabilidade': {
    label: 'Conheça nossa atuação em sustentabilidade',
    shortLabel: 'Sustentabilidade',
    href: '/sobre/sustentabilidade',
    description: 'Geração renovável, conservação e impacto ambiental evitado.'
  },
  '/sobre/social': {
    label: 'Conheça nossas iniciativas sociais',
    shortLabel: 'Social',
    href: '/sobre/social',
    description: 'O apoio à Associação Bloomy e ao Projeto SER.'
  },

  // Regiões
  '/energia-solar-goiania': {
    label: 'Energia solar e mercado livre em Goiânia',
    shortLabel: 'Goiânia',
    href: '/energia-solar-goiania',
    description: 'Atendimento na capital de Goiás.'
  },
  '/energia-solar-anapolis': {
    label: 'Energia solar e mercado livre em Anápolis',
    shortLabel: 'Anápolis',
    href: '/energia-solar-anapolis',
    description: 'Atendimento no polo industrial e logístico de Goiás.'
  },
  '/energia-solar-aparecida-de-goiania': {
    label: 'Energia solar em Aparecida de Goiânia',
    shortLabel: 'Aparecida de Goiânia',
    href: '/energia-solar-aparecida-de-goiania',
    description: 'Atendimento na região metropolitana de Goiânia.'
  },
  '/energia-solar-em-rio-verde': {
    label: 'Energia para o agronegócio em Rio Verde',
    shortLabel: 'Rio Verde',
    href: '/energia-solar-em-rio-verde',
    description: 'Atendimento no polo agroindustrial goiano.'
  },
  '/energia-solar-trindade': {
    label: 'Energia solar e mercado livre em Trindade',
    shortLabel: 'Trindade',
    href: '/energia-solar-trindade',
    description: 'Atendimento na região metropolitana de Goiânia.'
  },
  '/energia-solar-palmas': {
    label: 'Energia solar por assinatura em Palmas (TO)',
    shortLabel: 'Palmas',
    href: '/energia-solar-palmas',
    description: 'Atendimento na capital tocantinense.'
  },
  '/energia-solar-no-tocantins': {
    label: 'Energia solar e mercado livre no Tocantins',
    shortLabel: 'Tocantins',
    href: '/energia-solar-no-tocantins',
    description: 'Panorama estadual do atendimento no Tocantins.'
  },

  // Conteúdo (rotas existentes, noindex/follow)
  '/conteudo': {
    label: 'Explorar conteúdos sobre energia',
    shortLabel: 'Central de conteúdo',
    href: '/conteudo',
    description: 'Artigos e entrevistas sobre o setor elétrico brasileiro.'
  },
  '/conteudo/blog': {
    label: 'Ler os artigos do Blog da BC Energia',
    shortLabel: 'Blog',
    href: '/conteudo/blog',
    description: 'Explicações sobre contratação, consumo e economia de energia.'
  },
  '/conteudo/bc-cast': {
    label: 'Ouvir as entrevistas do BC Cast',
    shortLabel: 'BC Cast',
    href: '/conteudo/bc-cast',
    description: 'Conversas com lideranças do setor produtivo e de energia.'
  },
  '/conteudo/blog/energia-solar-por-assinatura': {
    label: 'Entenda como funciona a energia solar por assinatura',
    shortLabel: 'Energia solar por assinatura',
    href: '/conteudo/blog/energia-solar-por-assinatura',
    description: 'O que é o modelo, quem pode contratar e como aparece na conta.'
  },
  '/conteudo/bc-cast/tiago-mendonca': {
    label: 'Ouça a entrevista sobre energia e agronegócio em Goiás',
    shortLabel: 'BC Cast — agronegócio',
    href: '/conteudo/bc-cast/tiago-mendonca',
    description: 'Conversa com o ex-secretário de Agricultura de Goiás.'
  },
  '/conteudo/bc-cast/rubens-fileti': {
    label: 'Ouça a entrevista sobre indústria e custo de energia',
    shortLabel: 'BC Cast — indústria',
    href: '/conteudo/bc-cast/rubens-fileti',
    description: 'Conversa com o presidente da ACIEG sobre competitividade.'
  },

  // Conversão
  '/simulador-de-economia': {
    label: 'Simular minha economia na conta de energia',
    shortLabel: 'Simulador de economia',
    href: '/simulador-de-economia',
    description: 'Estimativa rápida a partir do valor médio da sua conta.'
  },
  '/contato': {
    label: 'Falar com um especialista em energia',
    shortLabel: 'Falar com especialista',
    href: '/contato',
    description: 'Envie sua conta e receba a análise do seu perfil de consumo.'
  }
}

/** Retorna a âncora canônica de uma rota, com sobrescrita pontual opcional. */
export const linkTo = (href: string, overrides: Partial<InternalLink> = {}): InternalLink => {
  const base = LINK_CATALOG[href]
  if (!base) {
    throw new Error(`[internalLinks] rota sem âncora cadastrada: ${href}`)
  }
  return { ...base, ...overrides }
}

/** Lista de âncoras a partir das rotas (mantém a ordem informada). */
export const linksTo = (hrefs: Array<string>): Array<InternalLink> => hrefs.map((href) => linkTo(href))

/**
 * SOLUÇÃO → SEGMENTOS em que ela faz sentido ("Para quem esta solução faz
 * sentido?"). Seletivo: apenas perfis realmente compatíveis.
 */
export const PRODUCT_AUDIENCE: Record<string, Array<string>> = {
  'mercado-livre-de-energia': [
    '/segmentos/agronegocio',
    '/segmentos/saude',
    '/segmentos/varejo',
    '/segmentos/turismo'
  ],
  'consorcio-bc-energia': [
    '/segmentos/residencial',
    '/segmentos/condominio',
    '/segmentos/bares-e-restaurantes',
    '/segmentos/religioso'
  ],
  'gestao-de-energia': ['/segmentos/varejo', '/segmentos/saude', '/segmentos/servico'],
  'certificacao-renovavel-irec': ['/segmentos/turismo', '/segmentos/varejo', '/segmentos/agronegocio']
}

/**
 * SOLUÇÃO → CONTEÚDO EDUCATIVO ("Entenda melhor antes de decidir").
 * Somente conteúdos que existem hoje no projeto — nada inventado.
 */
export const PRODUCT_CONTENT: Record<string, Array<string>> = {
  'consorcio-bc-energia': ['/conteudo/blog/energia-solar-por-assinatura', '/conteudo/blog'],
  'mercado-livre-de-energia': ['/conteudo/bc-cast/rubens-fileti', '/conteudo/blog'],
  'gestao-de-energia': ['/conteudo/blog']
}

/**
 * SEGMENTO → CONTEÚDO ("Conteúdos para este perfil"). Só onde há relação real.
 */
export const SEGMENT_CONTENT: Record<string, Array<string>> = {
  agronegocio: ['/conteudo/bc-cast/tiago-mendonca'],
  residencial: ['/conteudo/blog/energia-solar-por-assinatura'],
  condominio: ['/conteudo/blog/energia-solar-por-assinatura']
}

/** SEGMENTO → região com página própria mais próxima do perfil (opcional). */
export const SEGMENT_REGION: Record<string, string> = {
  agronegocio: '/energia-solar-em-rio-verde',
  residencial: '/energia-solar-goiania',
  condominio: '/energia-solar-aparecida-de-goiania',
  varejo: '/energia-solar-goiania',
  saude: '/energia-solar-goiania',
  turismo: '/energia-solar-palmas'
}

/**
 * "Próximos passos" de uma página de segmento: conteúdo do perfil (quando
 * existe), região aplicável, simulador e hub de segmentos — sem repetir as
 * soluções já apresentadas na própria página.
 */
export const segmentNextSteps = (slug: string): Array<InternalLink> => {
  const items: Array<InternalLink> = []
  ;(SEGMENT_CONTENT[slug] ?? []).forEach((href) => items.push(linkTo(href)))
  const region = SEGMENT_REGION[slug]
  if (region) items.push(linkTo(region))
  items.push(linkTo('/simulador-de-economia'))
  if (items.length < 4) items.push(linkTo('/segmentos'))
  return items.slice(0, 4)
}
