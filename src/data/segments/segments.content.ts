/**
 * Camada de conteúdo estrutural dos segmentos (FRONT-END 12).
 *
 * Complementa os JSONs (que trazem o texto original de cada segmento) com a
 * estrutura editorial do template comum:
 *  - eyebrow, H1 e descrição do hero, específicos do setor;
 *  - introdução curta (por que energia importa naquele segmento);
 *  - até 3 desafios, sempre derivados do texto já publicado no JSON;
 *  - "como ajudamos" (ponte desafio → solução);
 *  - soluções recomendadas (apenas hrefs; nome/descrição/ícone vêm de
 *    PRODUCT_HUB_ITEMS, fonte única do portfólio);
 *  - como funciona a análise e próximo passo.
 *
 * Nada aqui inventa dados comerciais, cases, percentuais, sazonalidade ou
 * regiões: toda a copy é reformulação do conteúdo existente do segmento.
 */
import type { BCIconName } from '@/config/icons'

/** Hrefs oficiais do portfólio (fonte: config/navigation → PRODUCT_HUB_ITEMS). */
export const SOLUTION_HREFS = {
  mle: '/produtos/mercado-livre-de-energia',
  consorcio: '/produtos/consorcio-bc-energia',
  gestao: '/produtos/gestao-de-energia',
  irec: '/produtos/certificacao-renovavel-irec'
} as const

export type SegmentChallenge = {
  icon: BCIconName
  title: string
  description: string
}

export type SegmentContent = {
  /** Rótulo curto do setor exibido acima do H1. */
  eyebrow: string
  /** H1 específico do segmento (nunca headline genérica). */
  h1: string
  /** Linha de apoio do hero. */
  heroDescription: string
  /** Título da introdução. */
  introTitle: string
  /** Introdução curta: 2 parágrafos no máximo. */
  introParagraphs: Array<string>
  /** Resumo do desafio de energia do setor. */
  challengesLead: string
  /** Até 3 desafios, derivados do conteúdo existente. */
  challenges: Array<SegmentChallenge>
  /** Ponte entre desafio e solução. */
  helpTitle: string
  helpParagraphs: Array<string>
  /** Soluções aplicáveis ao perfil (hrefs de PRODUCT_HUB_ITEMS). */
  solutionHrefs: Array<string>
  /** Frase de abertura do bloco "Como funciona a análise". */
  analysisLead: string
  /** Texto do próximo passo. */
  nextStep: string
}

const S = SOLUTION_HREFS

export const SEGMENT_CONTENT: Record<string, SegmentContent> = {
  agronegocio: {
    eyebrow: 'Produtores rurais e agroindústrias',
    h1: 'Energia para fazendas e agroindústrias',
    heroDescription:
      'Maquinário, irrigação, armazenagem e processamento dependem de energia constante. Avaliamos o perfil da propriedade e indicamos o caminho de redução de custo.',
    introTitle: 'Por que energia pesa no agronegócio',
    introParagraphs: [
      'Fazendas, agroindústrias e instalações de processamento agrícola dependem de energia constante e confiável para operar maquinário, irrigação, iluminação e equipamentos de armazenamento.',
      'O custo dessa energia entra direto na conta da produção e limita a capacidade de reinvestir em tecnologia e infraestrutura da propriedade.'
    ],
    challengesLead:
      'Irrigação, secagem, armazenagem e processamento fazem o consumo variar ao longo do ano. O custo da energia entra direto na conta da produção e reduz a margem disponível para investir na propriedade.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Custo de operação elevado',
        description:
          'Maquinário, irrigação e armazenagem mantêm um consumo alto que pressiona o custo de produção.'
      },
      {
        icon: 'meta-economia',
        title: 'Margem comprometida',
        description:
          'A despesa com energia reduz a margem e limita o reinvestimento em novas tecnologias agrícolas.'
      },
      {
        icon: 'monitoramento-consumo',
        title: 'Contratação pouco flexível',
        description:
          'Sem alternativas de contratação, a propriedade fica presa à tarifa da distribuidora local.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende o agronegócio',
    helpParagraphs: [
      'Analisamos o perfil de consumo da propriedade ou da agroindústria e indicamos a forma de contratação mais adequada, sem exigir investimento inicial em usina ou painéis.',
      'A economia obtida na conta de energia fica disponível para tecnologia agrícola, infraestrutura e expansão da operação.'
    ],
    solutionHrefs: [S.mle, S.gestao, S.consorcio],
    analysisLead:
      'Para o agronegócio, a análise considera o histórico de vários meses, justamente para captar as variações de consumo ao longo do ano.',
    nextStep:
      'Envie as contas de energia da propriedade ou da agroindústria e receba a avaliação do perfil de consumo.'
  },

  'bares-e-restaurantes': {
    eyebrow: 'Bares, restaurantes e food service',
    h1: 'Energia para bares e restaurantes',
    heroDescription:
      'Cozinha, refrigeração e climatização funcionam durante todo o horário de operação. Veja qual solução de energia se aplica ao seu estabelecimento.',
    introTitle: 'Por que energia pesa em bares e restaurantes',
    introParagraphs: [
      'Iluminação constante, climatização, cozinha equipada e armazenamento refrigerado são essenciais para a experiência do cliente e resultam em consumo elevado de energia.',
      'Em um setor de margem apertada, cada real da conta de energia disputa espaço com o custo dos insumos e com a melhoria do salão.'
    ],
    challengesLead:
      'A operação de cozinha e refrigeração não pode parar, e o custo da energia acompanha todo o horário de funcionamento do estabelecimento.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Consumo durante toda a operação',
        description:
          'Cozinha, câmaras frias e climatização mantêm a conta alta em todos os dias de funcionamento.'
      },
      {
        icon: 'meta-economia',
        title: 'Margem sob pressão',
        description:
          'O custo de energia disputa espaço com insumos e limita o investimento em melhorias do estabelecimento.'
      },
      {
        icon: 'contrato-aprovado',
        title: 'Sem espaço para investimento inicial',
        description:
          'Instalar geração própria exige capital e espaço físico que a maioria das unidades não tem.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende o food service',
    helpParagraphs: [
      'A partir da conta de energia da unidade, verificamos a tensão de ligação e o consumo para indicar se o caminho é energia por assinatura ou migração para o Mercado Livre.',
      'Nenhuma das duas alternativas exige obra, painéis no imóvel ou investimento inicial do estabelecimento.'
    ],
    solutionHrefs: [S.consorcio, S.mle, S.irec],
    analysisLead:
      'A análise parte da conta de energia da unidade: tensão de ligação e consumo definem se o caminho é assinatura ou migração.',
    nextStep: 'Envie a conta de energia do seu estabelecimento e veja qual solução se aplica.'
  },

  condominio: {
    eyebrow: 'Condomínios residenciais e comerciais',
    h1: 'Energia para condomínios',
    heroDescription:
      'A área comum é uma unidade consumidora e pode reduzir custo sem obra e sem investimento do condomínio.',
    introTitle: 'Por que energia pesa no orçamento condominial',
    introParagraphs: [
      'Iluminação das áreas comuns, sistemas de segurança, elevadores e climatização mantêm um consumo contínuo de energia elétrica.',
      'Essa despesa fixa entra no rateio e limita a capacidade de investir em melhorias para moradores e usuários.'
    ],
    challengesLead:
      'Elevadores, bombas, iluminação de áreas comuns e portaria mantêm um consumo contínuo. A conta de energia é uma das maiores despesas fixas do rateio condominial.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Despesa fixa no rateio',
        description:
          'A conta da área comum é recorrente e afeta diretamente o valor pago por cada unidade.'
      },
      {
        icon: 'meta-economia',
        title: 'Orçamento sem folga',
        description:
          'O custo de energia limita investimentos em segurança, modernização de elevadores e infraestrutura.'
      },
      {
        icon: 'contrato-aprovado',
        title: 'Decisão coletiva',
        description:
          'Qualquer mudança precisa ser apresentada de forma clara à administração ou à assembleia.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende condomínios',
    helpParagraphs: [
      'A avaliação é feita sobre a conta de energia da área comum, sem obra, sem placas no prédio e sem investimento inicial do condomínio.',
      'As condições são apresentadas em linguagem objetiva, para que a administração possa levar a proposta à assembleia.'
    ],
    solutionHrefs: [S.consorcio, S.gestao],
    analysisLead:
      'A área comum é uma unidade consumidora e é analisada a partir da conta de energia do condomínio.',
    nextStep:
      'Compartilhe a conta de energia da área comum e apresente a proposta à administração ou à assembleia.'
  },

  educacional: {
    eyebrow: 'Escolas, faculdades e centros de ensino',
    h1: 'Energia para instituições de ensino',
    heroDescription:
      'Salas de aula, laboratórios e bibliotecas exigem consumo constante. Avaliamos o perfil da instituição e indicamos o caminho de economia.',
    introTitle: 'Por que energia pesa na instituição de ensino',
    introParagraphs: [
      'Salas de aula, laboratórios, bibliotecas, áreas comuns e climatização demandam consumo constante para garantir um ambiente de aprendizado confortável e seguro.',
      'Esse custo concorre diretamente com investimentos em infraestrutura, tecnologia educacional e qualidade do ensino.'
    ],
    challengesLead:
      'Escolas, universidades e centros de ensino mantêm grandes áreas ocupadas por longos períodos, com iluminação e climatização em funcionamento contínuo.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Áreas amplas em uso diário',
        description:
          'Salas, laboratórios e bibliotecas exigem iluminação e climatização durante toda a jornada letiva.'
      },
      {
        icon: 'meta-economia',
        title: 'Orçamento disputado',
        description:
          'Cada real gasto com energia deixa de ser aplicado em infraestrutura e tecnologia educacional.'
      },
      {
        icon: 'planeta-sustentavel',
        title: 'Compromisso ambiental',
        description:
          'Instituições de ensino são cobradas por práticas sustentáveis pela própria comunidade acadêmica.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende a educação',
    helpParagraphs: [
      'Escolas, universidades e centros de ensino podem reduzir o custo de energia sem investimento inicial, por meio de energia por assinatura ou da migração para o Mercado Livre.',
      'A economia gerada volta para a instituição, na forma de investimento em infraestrutura educacional.'
    ],
    solutionHrefs: [S.consorcio, S.mle, S.irec],
    analysisLead:
      'A análise considera o calendário letivo e o perfil de ocupação registrado nas contas de energia da instituição.',
    nextStep: 'Envie a conta de energia da instituição e receba a avaliação sem compromisso.'
  },

  lazer: {
    eyebrow: 'Clubes, academias, cinemas e parques',
    h1: 'Energia para lazer e entretenimento',
    heroDescription:
      'Iluminação, climatização e sistemas de som funcionando para garantir a experiência do visitante. Veja como reduzir esse custo.',
    introTitle: 'Por que energia pesa no setor de lazer',
    introParagraphs: [
      'Parques, clubes, academias e cinemas precisam manter iluminação, climatização, sistemas de som e equipamentos elétricos em funcionamento para oferecer uma experiência agradável e segura.',
      'O custo dessa operação limita a capacidade de investir em modernização das instalações e em novas atrações.'
    ],
    challengesLead:
      'Áreas amplas de circulação e equipamentos de operação contínua tornam a energia um dos custos mais visíveis do empreendimento de lazer.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Estrutura de grande porte',
        description:
          'Iluminação, climatização e sistemas de som cobrem áreas amplas durante todo o funcionamento.'
      },
      {
        icon: 'meta-economia',
        title: 'Investimento em experiência',
        description:
          'O que sai na conta de energia deixa de ser aplicado em modernização e em novas atrações.'
      },
      {
        icon: 'monitoramento-consumo',
        title: 'Consumo pouco acompanhado',
        description:
          'Sem gestão dedicada, fica difícil enxergar onde está o consumo dentro do empreendimento.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende o lazer',
    helpParagraphs: [
      'Avaliamos o histórico de consumo do empreendimento e indicamos a alternativa de contratação compatível, sem investimento inicial em geração própria.',
      'Para operações maiores, a gestão de energia acompanha faturas, medição e contratos ao longo do tempo.'
    ],
    solutionHrefs: [S.consorcio, S.mle, S.gestao],
    analysisLead:
      'A avaliação leva em conta a variação de público ao longo da semana, refletida no histórico de consumo.',
    nextStep: 'Envie a conta de energia do empreendimento e avalie o enquadramento.'
  },

  religioso: {
    eyebrow: 'Templos e instituições religiosas',
    h1: 'Energia para instituições religiosas',
    heroDescription:
      'Grandes espaços iluminados e climatizados, sustentados por um orçamento da comunidade. Veja como preservar esse recurso.',
    introTitle: 'Por que energia pesa na instituição religiosa',
    introParagraphs: [
      'Manter grandes espaços bem iluminados e climatizados, além de sistemas audiovisuais e equipamentos administrativos, gera despesas energéticas consideráveis.',
      'Esse custo limita a capacidade de investir em atividades comunitárias, programas sociais e manutenção das instalações.'
    ],
    challengesLead:
      'Templos e salões precisam manter grandes áreas em condições de uso em horários específicos, com orçamento sustentado por contribuições da comunidade.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Grandes espaços a manter',
        description:
          'Iluminação, climatização e sistemas audiovisuais atendem áreas amplas de reunião.'
      },
      {
        icon: 'meta-economia',
        title: 'Recursos da comunidade',
        description:
          'Cada valor economizado na conta volta para programas sociais e para a manutenção das instalações.'
      },
      {
        icon: 'planeta-sustentavel',
        title: 'Exemplo para a comunidade',
        description:
          'O uso de energia de fonte renovável é uma forma concreta de contribuição ambiental da instituição.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende instituições religiosas',
    helpParagraphs: [
      'A análise é feita sobre a conta de energia da unidade consumidora em nome da instituição, sem obra e sem investimento inicial.',
      'A redução no custo de energia libera recursos para as atividades principais da comunidade.'
    ],
    solutionHrefs: [S.consorcio, S.mle],
    analysisLead:
      'A análise é feita a partir da conta de energia da unidade consumidora em nome da instituição.',
    nextStep:
      'Envie a conta de energia da instituição e entenda quanto do orçamento pode ser preservado.'
  },

  residencial: {
    eyebrow: 'Casas e apartamentos',
    h1: 'Energia solar por assinatura para sua casa',
    heroDescription:
      'Economia na conta de luz sem obra, sem placas no telhado e sem investimento inicial.',
    introTitle: 'Por que a conta de luz pesa em casa',
    introParagraphs: [
      'Climatização, iluminação, eletrodomésticos e equipamentos eletrônicos são essenciais para o conforto do lar e respondem por boa parte da despesa da família.',
      'Instalar um sistema solar próprio exige investimento, espaço e manutenção, nem sempre viáveis para o orçamento doméstico.'
    ],
    challengesLead:
      'Em casa, o consumo se concentra em climatização, chuveiro e eletrodomésticos, com tarifa definida pela distribuidora local.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Conta de luz crescente',
        description:
          'O consumo doméstico acompanha a rotina da família e pesa no orçamento todos os meses.'
      },
      {
        icon: 'solar-residencial',
        title: 'Painéis exigem investimento',
        description:
          'Sistema solar próprio pede capital, espaço no telhado e manutenção ao longo dos anos.'
      },
      {
        icon: 'contrato-aprovado',
        title: 'Dúvida sobre a troca',
        description:
          'Muitos moradores não sabem que é possível trocar de fornecedor sem qualquer obra no imóvel.'
      }
    ],
    helpTitle: 'Como funciona para a sua residência',
    helpParagraphs: [
      'Com a energia por assinatura, você passa a ser atendido pelo Grupo BC Energia sem nenhuma obra ou adequação física no imóvel.',
      'A energia vem de fonte limpa e renovável produzida em nossas usinas, com redução percentual em relação ao preço da distribuidora local.'
    ],
    solutionHrefs: [S.consorcio],
    analysisLead:
      'A análise verifica se a unidade consumidora residencial se enquadra nas regras da energia por assinatura.',
    nextStep: 'Envie a conta de luz da sua casa e descubra se você pode aderir.'
  },

  saude: {
    eyebrow: 'Hospitais, clínicas e centros médicos',
    h1: 'Energia para instituições de saúde',
    heroDescription:
      'Operação contínua, equipamentos críticos e climatização controlada. Avaliamos o perfil da unidade e o caminho de redução de custo.',
    introTitle: 'Por que energia pesa na saúde',
    introParagraphs: [
      'Hospitais, clínicas e centros médicos dependem de iluminação constante, climatização adequada e equipamentos médicos de alto consumo para garantir a qualidade do atendimento.',
      'Esse custo pressiona o orçamento e limita investimentos em novas tecnologias, instalações e equipe.'
    ],
    challengesLead:
      'Unidades de saúde operam de forma ininterrupta, com equipamentos críticos e exigência de continuidade no fornecimento.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Operação ininterrupta',
        description:
          'O atendimento não para, e o consumo de energia acompanha a unidade 24 horas por dia.'
      },
      {
        icon: 'monitoramento-consumo',
        title: 'Equipamentos críticos',
        description:
          'Equipamentos médicos e climatização controlada exigem energia de forma constante.'
      },
      {
        icon: 'meta-economia',
        title: 'Orçamento pressionado',
        description:
          'O custo energético concorre com tecnologia, instalações e contratação de profissionais.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende a saúde',
    helpParagraphs: [
      'A avaliação considera o funcionamento contínuo da unidade e indica a forma de contratação adequada, sem investimento em painéis solares.',
      'Para instituições já no Mercado Livre, a gestão de energia acompanha contratos, medição e faturamento.'
    ],
    solutionHrefs: [S.mle, S.gestao, S.irec],
    analysisLead:
      'A análise considera o funcionamento contínuo da unidade e a criticidade do fornecimento.',
    nextStep: 'Envie as contas de energia da unidade de saúde e receba um diagnóstico.'
  },

  servico: {
    eyebrow: 'Escritórios, consultórios e atendimento',
    h1: 'Energia para empresas de serviços',
    heroDescription:
      'Iluminação, climatização e equipamentos de TI durante todo o horário comercial. Veja qual solução se aplica à sua empresa.',
    introTitle: 'Por que energia pesa nas empresas de serviços',
    introParagraphs: [
      'Escritórios, consultórios e centros de atendimento dependem de iluminação eficiente, climatização e equipamentos eletrônicos para manter a operação fluida.',
      'Esse custo entra na despesa fixa da empresa e reduz o espaço disponível para investir em equipe e atendimento.'
    ],
    challengesLead:
      'O consumo se concentra no horário comercial, em ambientes com muitos postos de trabalho e equipamentos de TI ligados simultaneamente.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Despesa fixa mensal',
        description:
          'Climatização, iluminação e equipamentos de TI formam um custo previsível, porém elevado.'
      },
      {
        icon: 'monitoramento-consumo',
        title: 'Pouca visibilidade do consumo',
        description:
          'Sem acompanhamento, a empresa não identifica o que puxa a conta para cima em cada unidade.'
      },
      {
        icon: 'meta-economia',
        title: 'Espaço para investir',
        description:
          'A economia na conta pode ser direcionada para equipe, tecnologia e qualidade do atendimento.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende serviços',
    helpParagraphs: [
      'A partir da conta de energia da unidade e do regime de funcionamento, indicamos energia por assinatura ou migração para o Mercado Livre.',
      'Empresas com mais de um endereço podem contar com a gestão de energia para acompanhar todas as unidades.'
    ],
    solutionHrefs: [S.consorcio, S.mle, S.gestao],
    analysisLead:
      'A análise parte da conta de energia da unidade e do regime de funcionamento do escritório.',
    nextStep: 'Envie a conta de energia da empresa e veja qual solução se aplica.'
  },

  turismo: {
    eyebrow: 'Hotéis, pousadas e resorts',
    h1: 'Energia para hotelaria e turismo',
    heroDescription:
      'Quartos, áreas comuns, lavanderia e cozinha em operação para o conforto do hóspede. Veja como reduzir esse custo.',
    introTitle: 'Por que energia pesa na hotelaria',
    introParagraphs: [
      'Hotéis, pousadas e resorts precisam manter iluminação, climatização, aquecimento de água e diversos equipamentos funcionando para garantir o conforto dos hóspedes.',
      'Esse custo afeta a lucratividade e limita o investimento em modernização das instalações e na experiência oferecida.'
    ],
    challengesLead:
      'O funcionamento é contínuo e envolve quartos, áreas comuns, lavanderia e cozinha, com ocupação que varia conforme a temporada.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Conforto do hóspede o tempo todo',
        description:
          'Climatização e aquecimento de água precisam estar disponíveis independentemente da ocupação.'
      },
      {
        icon: 'meta-economia',
        title: 'Lucratividade da diária',
        description:
          'A conta de energia entra no custo por quarto e reduz o resultado do empreendimento.'
      },
      {
        icon: 'planeta-sustentavel',
        title: 'Hospedagem sustentável',
        description:
          'Energia de fonte renovável é um diferencial reconhecido pelo hóspede e pelo mercado de turismo.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende a hotelaria',
    helpParagraphs: [
      'Avaliamos o histórico de consumo do empreendimento e indicamos a alternativa de contratação adequada, sem investimento inicial.',
      'A economia obtida pode ser aplicada em modernização das instalações e em tecnologias sustentáveis.'
    ],
    solutionHrefs: [S.consorcio, S.mle, S.irec],
    analysisLead:
      'A sazonalidade da ocupação é considerada na leitura do histórico de consumo do empreendimento.',
    nextStep: 'Envie a conta de energia do empreendimento e avalie o enquadramento.'
  },

  varejo: {
    eyebrow: 'Lojas, redes e supermercados',
    h1: 'Energia para o varejo',
    heroDescription:
      'Iluminação constante, climatização e refrigeração em cada loja. Analisamos unidade por unidade e indicamos o caminho de economia.',
    introTitle: 'Por que energia pesa no varejo',
    introParagraphs: [
      'Lojas e supermercados precisam manter iluminação constante, climatização adequada e sistemas de refrigeração para garantir a melhor experiência de compra.',
      'Esses custos impactam a margem e limitam o orçamento disponível para melhorias e expansão da rede.'
    ],
    challengesLead:
      'A operação de loja depende de iluminação, climatização e, no caso de alimentos, refrigeração contínua, um custo fixo que pressiona o resultado.',
    challenges: [
      {
        icon: 'fatura-energia',
        title: 'Custo fixo por loja',
        description:
          'Iluminação, climatização e refrigeração mantêm a conta alta em todos os dias de operação.'
      },
      {
        icon: 'meta-economia',
        title: 'Margem do varejo',
        description:
          'A despesa com energia reduz a margem e concorre com investimentos em loja e marketing.'
      },
      {
        icon: 'monitoramento-consumo',
        title: 'Várias unidades consumidoras',
        description:
          'Redes com muitas lojas precisam acompanhar contas e contratos de cada endereço.'
      }
    ],
    helpTitle: 'Como o Grupo BC Energia atende o varejo',
    helpParagraphs: [
      'A análise é feita por unidade consumidora, o que permite tratar lojas de portes diferentes dentro da mesma rede.',
      'Com a economia gerada, o varejista pode investir em melhorias nas lojas, tecnologia e expansão da operação.'
    ],
    solutionHrefs: [S.consorcio, S.mle, S.gestao],
    analysisLead: 'Para redes com várias lojas, a análise é feita por unidade consumidora.',
    nextStep: 'Envie as contas de energia das suas unidades e receba a avaliação.'
  }
}

export const getSegmentContent = (slug?: string): SegmentContent | null =>
  slug ? (SEGMENT_CONTENT[slug] ?? null) : null
