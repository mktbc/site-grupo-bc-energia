/**
 * Conteúdo das páginas regionais.
 *
 * Regras seguidas na redação:
 *  - nenhum dado comercial novo foi criado: valores, elegibilidade e produtos
 *    vieram de src/components/ProductCard/ProductCard.data.ts e das páginas de
 *    produto já existentes;
 *  - nenhuma informação local (clientes, usinas, distribuidoras, números por
 *    cidade) foi inventada — as páginas falam de atendimento e das soluções
 *    reais do Grupo BC Energia;
 *  - cada região tem estrutura e redação próprias (sem troca de nome de cidade
 *    sobre um mesmo texto).
 */
import { Region } from './regions.type'

export * from './regions.type'

const MLE = {
  label: 'Conheça o Mercado Livre de Energia',
  href: '/produtos/mercado-livre-de-energia'
}
const CONSORCIO = {
  label: 'Veja como funciona o Consórcio BC Energia',
  href: '/produtos/consorcio-bc-energia'
}
const GESTAO = { label: 'Entenda a Gestão de Energia', href: '/produtos/gestao-de-energia' }
const IREC = { label: 'Conheça a Certificação Renovável I-REC', href: '/produtos/certificacao-renovavel-irec' }
const ARRENDAMENTO = {
  label: 'Saiba como funciona o Arrendamento de Usinas',
  href: '/produtos/arrendamento-de-usinas'
}
const QUEM_SOMOS = { label: 'Conheça o Grupo BC Energia', href: '/sobre/quem-somos' }
const USINAS = { label: 'Veja nossas usinas em operação', href: '/sobre/nossas-usinas' }

export const REGIONS: Record<string, Region> = {
  /* ------------------------------------------------------------------ */
  goiania: {
    slug: 'goiania',
    path: '/energia-solar-goiania',
    scope: 'city',
    place: 'Goiânia',
    uf: 'GO',
    h1: 'Energia solar por assinatura e mercado livre em Goiânia',
    coverImage: '/img/pages/nossas-usinas2.webp',
    heroDescription:
      'Atendemos empresas e consumidores da capital com Mercado Livre de Energia e energia por assinatura, sempre a partir da análise da conta.',
    intro: [
      'Goiânia concentra a sede do Grupo BC Energia, na Av. Dep. Jamel Cecílio, no Jardim Goiás. É daqui que atendemos empresas e consumidores que querem reduzir o custo da energia elétrica sem instalar placas solares no próprio imóvel.',
      'O atendimento na capital cobre os dois caminhos possíveis hoje no setor elétrico: a migração para o Mercado Livre de Energia, voltada a empresas de maior consumo, e a energia solar por assinatura do Consórcio BC Energia, voltada a quem está conectado em baixa tensão.'
    ],
    solutions: {
      heading: 'Soluções de energia em Goiânia',
      lead: 'A solução indicada depende do perfil de ligação e do valor da conta. Veja as opções disponíveis para quem é atendido na capital.',
      items: [
        {
          ...MLE,
          description:
            'Para empresas com contas a partir de R$ 10 mil, conectadas em alta tensão e com demanda contratada a partir de 30 kW. A negociação de energia passa a ser feita diretamente com o fornecedor.'
        },
        {
          ...CONSORCIO,
          description:
            'Para consumidores em baixa tensão que querem usar energia solar sem construir usina e sem obra no imóvel. A adesão é feita à distância.'
        },
        {
          ...GESTAO,
          description:
            'Acompanhamento contínuo de contratos, medição e faturamento para empresas que já operam no Mercado Livre e precisam de previsibilidade.'
        }
      ]
    },
    howItWorks: {
      heading: 'Como funciona',
      lead: 'O processo começa pela leitura da sua conta de energia, que é o que define o caminho.',
      steps: [
        {
          title: 'Envio da conta',
          description:
            'Você compartilha uma conta de energia recente pelo formulário de contato. Nenhuma informação comercial é definida antes dessa análise.'
        },
        {
          title: 'Análise do perfil de consumo',
          description:
            'Nossa equipe verifica tensão de ligação, demanda contratada e histórico de consumo para identificar se o caso é de Mercado Livre ou de energia por assinatura.'
        },
        {
          title: 'Apresentação da proposta',
          description:
            'Você recebe a condição aplicável ao seu perfil, com as regras do contrato explicadas antes de qualquer assinatura.'
        },
        {
          title: 'Adesão e acompanhamento',
          description:
            'Depois da contratação, o Grupo BC Energia cuida dos trâmites junto à distribuidora e acompanha o faturamento.'
        }
      ]
    },
    audience: {
      heading: 'Para quem é indicado',
      lead: 'Perfis atendidos em Goiânia:',
      items: [
        'Indústrias, atacadistas e empresas de médio e grande porte com conta de energia elevada.',
        'Redes de lojas, clínicas, escritórios e prestadores de serviço da capital.',
        'Condomínios residenciais e comerciais que querem reduzir a despesa das áreas comuns.',
        'Consumidores residenciais que não podem ou não querem investir em um sistema solar próprio.'
      ]
    },
    why: {
      heading: 'Por que escolher o Grupo BC Energia',
      lead: '',
      items: [
        {
          title: 'Operação com base em Goiânia',
          description:
            'A sede administrativa fica na capital, o que aproxima o atendimento de empresas e consumidores da região.'
        },
        {
          title: 'Geração própria e arrendada',
          description:
            'São mais de 117 usinas, próprias e arrendadas, em operação, sustentando as soluções de geração distribuída.'
        },
        {
          title: 'Atuação nos dois ambientes de contratação',
          description:
            'Somos a maior comercializadora independente do Centro-Oeste e atendemos tanto o Mercado Livre quanto a geração distribuída.'
        }
      ]
    },
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          question: 'Preciso instalar placas solares no meu imóvel em Goiânia?',
          answer:
            'Não. Nas soluções de energia por assinatura você utiliza a energia gerada pelas usinas do Grupo BC Energia; não há obra nem equipamento instalado no seu imóvel.'
        },
        {
          question: 'Minha empresa pode migrar para o Mercado Livre de Energia?',
          answer:
            'Depende do perfil: a solução é indicada para consumidores conectados em alta tensão, com demanda contratada a partir de 30 kW e contas a partir de R$ 10 mil. A análise da conta confirma a elegibilidade.'
        },
        {
          question: 'Continuo recebendo a conta da distribuidora?',
          answer:
            'Sim. A distribuidora segue responsável pela rede e pela entrega da energia; o que muda é a forma como a energia consumida é contratada e cobrada.'
        }
      ]
    },
    cta: {
      heading: 'Solicite uma análise',
      description:
        'Envie sua conta de energia e receba a avaliação do perfil de consumo do seu imóvel ou da sua empresa em Goiânia.',
      buttonLabel: 'Falar com um especialista',
      buttonHref: '/contato'
    },
    related: [
      {
        ...QUEM_SOMOS,
        description: 'História, estrutura e atuação da comercializadora.'
      },
      {
        label: 'Veja as soluções para condomínios',
        href: '/segmentos/condominio',
        description: 'Conteúdo específico para áreas comuns e administradoras.'
      },
      {
        label: 'Energia solar em Aparecida de Goiânia',
        href: '/energia-solar-aparecida-de-goiania',
        description: 'Página da cidade vizinha, na região metropolitana.'
      },
      {
        // ETAPA SEO 09: correção de página órfã — /energia-solar-anapolis não
        // recebia nenhum link interno rastreável.
        label: 'Energia solar em Anápolis',
        href: '/energia-solar-anapolis',
        description: 'Atendimento no polo industrial e logístico de Goiás.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  anapolis: {
    slug: 'anapolis',
    path: '/energia-solar-anapolis',
    scope: 'city',
    place: 'Anápolis',
    uf: 'GO',
    h1: 'Energia solar por assinatura para Anápolis',
    coverImage: '/img/pages/2147948282.webp',
    heroDescription:
      'Indústria, logística e comércio têm perfis de consumo diferentes: a recomendação começa pela leitura da sua conta, não por uma oferta pronta.',
    intro: [
      'Anápolis reúne indústria, logística e comércio em um mesmo território, com perfis que sentem o peso da conta de energia de formas diferentes. Por isso, o atendimento do Grupo BC Energia na cidade começa sempre pela leitura do perfil de consumo, e não por uma oferta pronta.',
      'Quem tem conta alta e ligação em alta tensão costuma se enquadrar no Mercado Livre de Energia. Quem está em baixa tensão pode usar energia solar por assinatura, sem investir em equipamentos.'
    ],
    solutions: {
      heading: 'Soluções de energia em Anápolis',
      lead: 'Duas frentes principais atendem a cidade, além do acompanhamento de contratos para quem já migrou.',
      items: [
        {
          ...CONSORCIO,
          description:
            'Energia solar por assinatura para consumidores em baixa tensão: sem construção de usina, sem investimento em placas e sem obra no imóvel.'
        },
        {
          ...MLE,
          description:
            'Indicado para operações industriais e logísticas com contas a partir de R$ 10 mil e demanda contratada a partir de 30 kW.'
        },
        {
          ...IREC,
          description:
            'Certificação internacional que comprova o consumo de energia de fontes renováveis, útil para empresas com metas ambientais.'
        }
      ]
    },
    howItWorks: {
      heading: 'Como funciona',
      lead: 'Três etapas separam a dúvida inicial da proposta.',
      steps: [
        {
          title: 'Conversa inicial',
          description:
            'Você registra o contato e informa o tipo de imóvel ou operação. Isso já orienta qual solução analisar.'
        },
        {
          title: 'Estudo da conta de energia',
          description:
            'A conta mostra tensão, demanda e histórico. Com esses dados definimos se o caminho é migração ou assinatura.'
        },
        {
          title: 'Contratação',
          description:
            'As condições, prazos e regras são apresentados antes da assinatura. Só depois disso a adesão é formalizada.'
        }
      ]
    },
    audience: {
      heading: 'Para quem é indicado',
      lead: 'O atendimento em Anápolis abrange:',
      items: [
        'Indústrias e centros de distribuição instalados na cidade.',
        'Comércio, franquias e prestadores de serviço com contas em baixa tensão.',
        'Instituições de ensino, templos e entidades que buscam reduzir custo fixo.',
        'Residências que querem energia limpa sem investimento inicial.'
      ]
    },
    why: {
      heading: 'Por que escolher o Grupo BC Energia',
      lead: '',
      items: [
        {
          title: 'Análise antes da proposta',
          description:
            'A recomendação parte da sua conta de energia; nada é definido sem entender o perfil de consumo.'
        },
        {
          title: 'Portfólio completo',
          description:
            'Mercado Livre, geração distribuída, gestão de energia e certificação renovável em um único fornecedor.'
        },
        {
          title: 'Estrutura de geração própria',
          description:
            'Mais de 117 usinas, próprias e arrendadas, em plena operação sustentam a oferta de energia renovável.'
        }
      ]
    },
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          question: 'Existe algum custo para aderir?',
          answer:
            'Nas soluções de geração distribuída não há investimento em equipamentos nem obra. As condições contratuais são apresentadas na proposta, antes da assinatura.'
        },
        {
          question: 'Minha indústria em Anápolis pode ir para o Mercado Livre?',
          answer:
            'A migração é indicada para consumidores em alta tensão com demanda contratada a partir de 30 kW e conta a partir de R$ 10 mil. A elegibilidade é confirmada na análise.'
        },
        {
          question: 'Quanto tempo leva o processo?',
          answer:
            'O prazo varia conforme a solução e os trâmites junto à distribuidora. O cronograma é informado durante a análise do seu caso.'
        }
      ]
    },
    cta: {
      heading: 'Solicite uma análise',
      description:
        'Fale com um especialista do Grupo BC Energia e descubra qual solução se aplica ao seu imóvel ou à sua operação em Anápolis.',
      buttonLabel: 'Solicitar análise da conta',
      buttonHref: '/contato'
    },
    related: [
      {
        label: 'Veja as soluções para o agronegócio',
        href: '/segmentos/agronegocio',
        description: 'Conteúdo voltado a produtores e agroindústrias.'
      },
      { ...USINAS, description: 'Estrutura de geração do grupo.' },
      {
        label: 'Energia solar em Goiânia',
        href: '/energia-solar-goiania',
        description: 'Atendimento na capital, onde fica a sede do grupo.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'aparecida-de-goiania': {
    slug: 'aparecida-de-goiania',
    path: '/energia-solar-aparecida-de-goiania',
    scope: 'city',
    place: 'Aparecida de Goiânia',
    uf: 'GO',
    h1: 'Energia solar sem obra em Aparecida de Goiânia',
    coverImage: '/img/pages/FOTO_BANNER_02.webp',
    heroDescription:
      'Energia renovável sem obra e sem compra de equipamentos para quem está em baixa tensão, e migração para o Mercado Livre para operações de maior consumo.',
    intro: [
      'Em Aparecida de Goiânia, boa parte dos consumidores está conectada em baixa tensão: residências, comércios de bairro, condomínios e pequenas indústrias. Para esse perfil, a energia solar por assinatura é a alternativa que dispensa investimento em placas e reforma no telhado.',
      'Empresas com consumo mais alto instaladas nos distritos industriais do município podem se enquadrar no Mercado Livre de Energia. A definição vem da análise da conta.'
    ],
    solutions: {
      heading: 'Soluções de energia em Aparecida de Goiânia',
      lead: 'O portfólio disponível para a cidade:',
      items: [
        {
          ...CONSORCIO,
          description:
            'Uso da energia gerada pelas usinas do grupo, com adesão à distância e sem instalação de equipamentos no imóvel.'
        },
        {
          ...MLE,
          description:
            'Alternativa para empresas em alta tensão, com demanda a partir de 30 kW e conta a partir de R$ 10 mil.'
        },
        {
          ...GESTAO,
          description:
            'Gestão de contratos e faturamento de energia para empresas que precisam de controle sobre o custo.'
        }
      ]
    },
    howItWorks: {
      heading: 'Como funciona',
      lead: 'Um fluxo simples, feito à distância:',
      steps: [
        {
          title: 'Solicitação',
          description: 'Você preenche o formulário de contato com seus dados e o tipo de consumo.'
        },
        {
          title: 'Verificação de elegibilidade',
          description:
            'A equipe confere se o imóvel se enquadra na geração distribuída ou no Mercado Livre.'
        },
        {
          title: 'Proposta e adesão',
          description:
            'Com as regras apresentadas e aceitas, a adesão é concluída e passa a valer nos ciclos de faturamento seguintes.'
        }
      ]
    },
    audience: {
      heading: 'Para quem é indicado',
      lead: 'Costumam se beneficiar em Aparecida de Goiânia:',
      items: [
        'Famílias que querem reduzir a conta de luz sem instalar sistema próprio.',
        'Comércios de rua, mercados e prestadores de serviço em baixa tensão.',
        'Condomínios que buscam economia nas áreas comuns.',
        'Empresas dos distritos industriais com consumo elevado.'
      ]
    },
    why: {
      heading: 'Por que escolher o Grupo BC Energia',
      lead: '',
      items: [
        {
          title: 'Sem obra e sem investimento em equipamentos',
          description:
            'Na geração distribuída, nada é instalado no imóvel do cliente, porque a energia vem das usinas do grupo.'
        },
        {
          title: 'Contrato explicado antes da assinatura',
          description:
            'Regras, prazos e condições comerciais são apresentados na proposta, sem letra miúda.'
        },
        {
          title: 'Referência regional',
          description:
            'O Grupo BC Energia é a maior comercializadora independente do Centro-Oeste.'
        }
      ]
    },
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          question: 'Preciso trocar de distribuidora?',
          answer:
            'Não. A rede e a entrega de energia continuam com a distribuidora local; muda a forma de contratar a energia consumida.'
        },
        {
          question: 'Moro em apartamento. Posso participar?',
          answer:
            'Sim, desde que a unidade consumidora esteja em nome do interessado e se enquadre nas regras da solução. A verificação é feita na análise da conta.'
        },
        {
          question: 'O condomínio pode aderir junto com os moradores?',
          answer:
            'A área comum é uma unidade consumidora e pode ser analisada separadamente das unidades privativas.'
        }
      ]
    },
    cta: {
      heading: 'Solicite uma análise',
      description:
        'Envie sua conta de energia e receba uma avaliação sem compromisso para seu imóvel em Aparecida de Goiânia.',
      buttonLabel: 'Quero uma análise gratuita',
      buttonHref: '/contato'
    },
    related: [
      {
        label: 'Veja as soluções para residências',
        href: '/segmentos/residencial',
        description: 'Energia por assinatura para o consumo doméstico.'
      },
      {
        label: 'Veja as soluções para condomínios',
        href: '/segmentos/condominio',
        description: 'Redução de custo nas áreas comuns.'
      },
      {
        label: 'Energia solar em Trindade',
        href: '/energia-solar-trindade',
        description: 'Outra cidade da região metropolitana atendida.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'rio-verde': {
    slug: 'rio-verde',
    path: '/energia-solar-em-rio-verde',
    scope: 'city',
    place: 'Rio Verde',
    uf: 'GO',
    h1: 'Energia para o agronegócio e para o consumo urbano em Rio Verde',
    coverImage: '/img/pages/arrendamento-de-usinas-intro.webp',
    heroDescription:
      'Do consumo agroindustrial contínuo ao comércio urbano: contratos no ambiente livre e assinatura de energia renovável para cada perfil.',
    intro: [
      'Rio Verde é um polo agroindustrial: irrigação, armazenagem, frigoríficos e processamento consomem energia de forma intensa e contínua. Nesse contexto, o custo da energia deixa de ser uma despesa fixa qualquer e passa a influenciar a margem da operação.',
      'O Grupo BC Energia atende a cidade com soluções para os dois lados desse cenário: contratos no Mercado Livre para grandes consumidores e energia por assinatura para quem está em baixa tensão.'
    ],
    solutions: {
      heading: 'Soluções de energia em Rio Verde',
      lead: 'O que está disponível para empresas e consumidores da região:',
      items: [
        {
          ...MLE,
          description:
            'Para agroindústrias e operações de grande porte: negociação direta da energia, com contas a partir de R$ 10 mil e demanda contratada a partir de 30 kW.'
        },
        {
          ...GESTAO,
          description:
            'Acompanhamento de contratos, medição e faturamento para manter previsibilidade no custo da energia ao longo do ano.'
        },
        {
          ...CONSORCIO,
          description:
            'Energia solar por assinatura para consumidores em baixa tensão, sem investimento em equipamentos.'
        }
      ]
    },
    howItWorks: {
      heading: 'Como funciona',
      lead: 'Para operações com sazonalidade de consumo, a análise é mais detalhada:',
      steps: [
        {
          title: 'Levantamento do histórico',
          description:
            'Analisamos as contas de energia de um período representativo, para captar picos de safra e entressafra.'
        },
        {
          title: 'Definição do caminho',
          description:
            'Com o perfil em mãos, identificamos se a operação é elegível ao Mercado Livre ou se a assinatura é mais adequada.'
        },
        {
          title: 'Estruturação do contrato',
          description:
            'As condições são apresentadas de forma clara, incluindo prazos e regras aplicáveis.'
        },
        {
          title: 'Gestão contínua',
          description:
            'Para quem migra, o acompanhamento de faturamento e medição continua após a contratação.'
        }
      ]
    },
    audience: {
      heading: 'Para quem é indicado',
      lead: 'Perfis atendidos em Rio Verde:',
      items: [
        'Produtores rurais e propriedades com sistemas de irrigação.',
        'Agroindústrias, armazéns e unidades de processamento.',
        'Transportadoras e prestadores de serviço ligados ao agronegócio.',
        'Comércios, escritórios e residências em baixa tensão.'
      ]
    },
    why: {
      heading: 'Por que escolher o Grupo BC Energia',
      lead: '',
      items: [
        {
          title: 'Experiência com o agronegócio',
          description:
            'O setor é um dos segmentos atendidos pelo grupo, com conteúdo e soluções específicas.'
        },
        {
          title: 'Gestão além da migração',
          description:
            'A atuação não termina na troca de ambiente de contratação: a gestão de energia acompanha o contrato.'
        },
        {
          title: 'Geração renovável própria',
          description:
            'Mais de 117 usinas, próprias e arrendadas, em plena operação.'
        }
      ]
    },
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          question: 'A sazonalidade da safra atrapalha a contratação?',
          answer:
            'Não. O histórico de consumo é justamente o que orienta a proposta; variações sazonais são consideradas na análise.'
        },
        {
          question: 'Propriedade rural pode aderir?',
          answer:
            'Sim, desde que a unidade consumidora atenda às regras da solução analisada. A verificação é feita a partir da conta de energia.'
        },
        {
          question: 'Preciso de estrutura própria de geração?',
          answer:
            'Não. Na geração distribuída, a energia vem das usinas do Grupo BC Energia, sem investimento em placas por parte do cliente.'
        }
      ]
    },
    cta: {
      heading: 'Solicite uma análise',
      description:
        'Compartilhe as contas de energia da sua operação em Rio Verde e receba um diagnóstico do perfil de consumo.',
      buttonLabel: 'Falar com um especialista',
      buttonHref: '/contato'
    },
    related: [
      {
        label: 'Veja as soluções para o agronegócio',
        href: '/segmentos/agronegocio',
        description: 'Desafios de energia do setor e soluções aplicáveis.'
      },
      {
        ...ARRENDAMENTO,
        description: 'Para donos de usinas que querem arrendar seus ativos.'
      },
      { ...QUEM_SOMOS, description: 'Quem é o Grupo BC Energia.' }
    ]
  },

  /* ------------------------------------------------------------------ */
  trindade: {
    slug: 'trindade',
    path: '/energia-solar-trindade',
    scope: 'city',
    place: 'Trindade',
    uf: 'GO',
    h1: 'Energia solar por assinatura em Trindade',
    coverImage: '/img/pages/FOTO_BANNER_023.webp',
    heroDescription:
      'Assinatura de energia renovável para residências, comércio local e serviços, com adesão feita à distância e sem instalação no imóvel.',
    intro: [
      'Em Trindade, a maior parte da demanda vem de residências, comércio local e serviços, consumidores conectados em baixa tensão. Para eles, instalar um sistema solar próprio nem sempre é viável: exige investimento, espaço e manutenção.',
      'A alternativa oferecida pelo Grupo BC Energia é usar a energia gerada pelas usinas do grupo, sem obra e sem compra de equipamentos.'
    ],
    solutions: {
      heading: 'Soluções de energia em Trindade',
      lead: 'O que se aplica ao perfil de consumo da cidade:',
      items: [
        {
          ...CONSORCIO,
          description:
            'Principal solução para a cidade: energia solar por assinatura para consumidores em baixa tensão, com adesão à distância.'
        },
        {
          ...MLE,
          description:
            'Para empresas locais de maior porte, em alta tensão, com demanda a partir de 30 kW e conta a partir de R$ 10 mil.'
        },
        {
          ...IREC,
          description:
            'Comprovação do consumo de energia de fonte renovável para empresas com compromissos ambientais.'
        }
      ]
    },
    howItWorks: {
      heading: 'Como funciona',
      lead: 'Todo o processo é feito sem visita técnica ao imóvel:',
      steps: [
        {
          title: 'Contato',
          description: 'Você envia seus dados e uma conta de energia recente pelo formulário.'
        },
        {
          title: 'Análise',
          description:
            'Conferimos o enquadramento da unidade consumidora e as condições aplicáveis ao seu caso.'
        },
        {
          title: 'Adesão',
          description:
            'Com a proposta aceita, a adesão é registrada e o benefício passa a aparecer nos ciclos seguintes de faturamento.'
        }
      ]
    },
    audience: {
      heading: 'Para quem é indicado',
      lead: 'Em Trindade, a solução costuma atender:',
      items: [
        'Residências que buscam reduzir a conta de luz sem investir em placas.',
        'Comércios de bairro, padarias, farmácias e pequenos serviços.',
        'Templos, salões e espaços comunitários.',
        'Empresas locais com consumo mais alto, que podem avaliar o Mercado Livre.'
      ]
    },
    why: {
      heading: 'Por que escolher o Grupo BC Energia',
      lead: '',
      items: [
        {
          title: 'Adesão sem instalação',
          description: 'Nenhum equipamento é instalado no imóvel do cliente.'
        },
        {
          title: 'Atendimento próximo',
          description:
            'A sede fica em Goiânia, na região metropolitana da qual Trindade faz parte.'
        },
        {
          title: 'Energia de fonte renovável',
          description:
            'A energia utilizada vem das usinas do grupo, próprias e arrendadas, em operação.'
        }
      ]
    },
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          question: 'Preciso comprar placas solares?',
          answer:
            'Não. A energia por assinatura dispensa a compra e a instalação de equipamentos pelo cliente.'
        },
        {
          question: 'A adesão pode ser feita à distância?',
          answer:
            'Sim. O processo é realizado remotamente, a partir do envio da conta de energia e dos dados do titular.'
        },
        {
          question: 'Quem cuida da manutenção das usinas?',
          answer:
            'A operação e a manutenção são responsabilidade do Grupo BC Energia, não do cliente.'
        }
      ]
    },
    cta: {
      heading: 'Solicite uma análise',
      description:
        'Envie sua conta de energia e descubra se sua unidade consumidora em Trindade pode aderir.',
      buttonLabel: 'Quero uma análise gratuita',
      buttonHref: '/contato'
    },
    related: [
      {
        label: 'Veja as soluções para o comércio varejista',
        href: '/segmentos/varejo',
        description: 'Conteúdo para lojas e supermercados.'
      },
      {
        label: 'Veja as soluções para instituições religiosas',
        href: '/segmentos/religioso',
        description: 'Redução de custo para templos e entidades.'
      },
      {
        label: 'Energia solar em Goiânia',
        href: '/energia-solar-goiania',
        description: 'Atendimento na capital.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  palmas: {
    slug: 'palmas',
    path: '/energia-solar-palmas',
    scope: 'city',
    place: 'Palmas',
    uf: 'TO',
    statePath: '/energia-solar-no-tocantins',
    h1: 'Energia solar por assinatura em Palmas (TO)',
    coverImage: '/img/pages/sustentabilidade.webp',
    heroDescription:
      'Atendimento no município: alternativas para reduzir o custo da conta de quem consome em baixa tensão e para empresas elegíveis ao Mercado Livre.',
    intro: [
      'Palmas é a capital do Tocantins e concentra órgãos públicos, comércio, serviços e um consumo residencial marcado pelo uso intenso de climatização ao longo do ano. Conta alta é uma realidade constante para boa parte dos moradores e das empresas da cidade.',
      'Esta página trata especificamente do atendimento no município. Para uma visão do estado inteiro, consulte a página de energia solar no Tocantins.'
    ],
    solutions: {
      heading: 'Soluções de energia em Palmas',
      lead: 'As alternativas disponíveis para quem consome energia na capital:',
      items: [
        {
          ...CONSORCIO,
          description:
            'Energia solar por assinatura para consumidores em baixa tensão, sem obra e sem investimento em placas.'
        },
        {
          ...MLE,
          description:
            'Para empresas em alta tensão com demanda a partir de 30 kW e conta a partir de R$ 10 mil.'
        },
        {
          ...GESTAO,
          description:
            'Gestão de contratos e faturamento para empresas que já atuam no Mercado Livre.'
        }
      ]
    },
    howItWorks: {
      heading: 'Como funciona',
      lead: 'O atendimento em Palmas segue o mesmo rigor de análise usado nas demais praças:',
      steps: [
        {
          title: 'Envio da conta de energia',
          description: 'A conta indica tensão de ligação, consumo e valores praticados.'
        },
        {
          title: 'Enquadramento',
          description:
            'Definimos se o caso é de geração distribuída ou de migração para o Mercado Livre.'
        },
        {
          title: 'Proposta',
          description:
            'As condições aplicáveis são apresentadas antes de qualquer assinatura de contrato.'
        }
      ]
    },
    audience: {
      heading: 'Para quem é indicado',
      lead: 'Perfis atendidos na capital tocantinense:',
      items: [
        'Residências com consumo elevado por uso de ar-condicionado.',
        'Comércio, escritórios e clínicas em baixa tensão.',
        'Hotéis, bares e restaurantes da cidade.',
        'Empresas de maior porte que podem avaliar a migração para o Mercado Livre.'
      ]
    },
    why: {
      heading: 'Por que escolher o Grupo BC Energia',
      lead: '',
      items: [
        {
          title: 'Uma comercializadora, várias soluções',
          description:
            'Mercado Livre, geração distribuída, gestão de energia e certificação renovável no mesmo fornecedor.'
        },
        {
          title: 'Proposta baseada em dados',
          description: 'Nada é oferecido antes da leitura da sua conta de energia.'
        },
        {
          title: 'Escala de operação',
          description:
            'Mais de 117 usinas, próprias e arrendadas, sustentam as soluções de energia renovável do grupo.'
        }
      ]
    },
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          question: 'Qual a diferença entre esta página e a página do Tocantins?',
          answer:
            'Esta página trata do atendimento no município de Palmas. A página do Tocantins reúne a visão estadual e direciona para as cidades atendidas.'
        },
        {
          question: 'Preciso instalar algum equipamento?',
          answer:
            'Não, nas soluções de geração distribuída. A energia utilizada vem das usinas do Grupo BC Energia.'
        },
        {
          question: 'Empresas de Palmas podem migrar para o Mercado Livre?',
          answer:
            'Podem, se estiverem conectadas em alta tensão, com demanda contratada a partir de 30 kW e conta a partir de R$ 10 mil.'
        }
      ]
    },
    cta: {
      heading: 'Solicite uma análise',
      description:
        'Fale com o Grupo BC Energia e receba uma avaliação do seu consumo em Palmas, sem compromisso.',
      buttonLabel: 'Solicitar análise da conta',
      buttonHref: '/contato'
    },
    related: [
      {
        label: 'Veja a página de energia solar no Tocantins',
        href: '/energia-solar-no-tocantins',
        description: 'Visão estadual do atendimento.'
      },
      {
        label: 'Veja as soluções para bares e restaurantes',
        href: '/segmentos/bares-e-restaurantes',
        description: 'Conteúdo para operações de alimentação fora do lar.'
      },
      { ...QUEM_SOMOS, description: 'Estrutura e atuação da comercializadora.' }
    ]
  },

  /* ------------------------------------------------------------------ */
  tocantins: {
    slug: 'tocantins',
    path: '/energia-solar-no-tocantins',
    scope: 'state',
    place: 'Tocantins',
    uf: 'TO',
    h1: 'Energia solar e mercado livre de energia no Tocantins',
    coverImage: '/img/pages/nossas-usinas.webp',
    heroDescription:
      'Panorama estadual do atendimento do Grupo BC Energia e caminho para a página do município de Palmas.',
    intro: [
      'Esta é a página estadual do Grupo BC Energia para o Tocantins. Aqui você encontra o panorama das soluções disponíveis no estado e o caminho para a página do município de Palmas, que trata do atendimento na capital.',
      'O estado combina consumo residencial sensível à climatização, comércio em expansão e operações do agronegócio, realidades que pedem soluções de energia diferentes entre si.'
    ],
    solutions: {
      heading: 'Soluções de energia no Tocantins',
      lead: 'O portfólio do grupo cobre perfis distintos de consumo no estado:',
      items: [
        {
          ...CONSORCIO,
          description:
            'Energia solar por assinatura para consumidores em baixa tensão, sem construção de usina própria.'
        },
        {
          ...MLE,
          description:
            'Para empresas em alta tensão, com demanda contratada a partir de 30 kW e contas a partir de R$ 10 mil.'
        },
        {
          ...GESTAO,
          description:
            'Gestão de contratos e faturamento para quem já opera no ambiente de contratação livre.'
        },
        {
          ...IREC,
          description:
            'Certificação internacional que comprova a origem renovável da energia consumida.'
        }
      ]
    },
    howItWorks: {
      heading: 'Como funciona',
      lead: 'Independentemente da cidade, o ponto de partida é o mesmo:',
      steps: [
        {
          title: 'Identificação do perfil',
          description:
            'Residencial, comercial, industrial ou rural: cada perfil tem um caminho diferente.'
        },
        {
          title: 'Análise da conta de energia',
          description:
            'A conta define a elegibilidade para geração distribuída ou para o Mercado Livre.'
        },
        {
          title: 'Proposta e contratação',
          description:
            'As condições comerciais são apresentadas antes da assinatura e o grupo cuida dos trâmites.'
        }
      ]
    },
    audience: {
      heading: 'Para quem é indicado',
      lead: 'A atuação no Tocantins atende:',
      items: [
        'Consumidores residenciais conectados em baixa tensão.',
        'Comércio, serviços e rede hoteleira.',
        'Produtores rurais e agroindústrias do estado.',
        'Empresas de maior consumo interessadas na migração para o Mercado Livre.'
      ]
    },
    why: {
      heading: 'Por que escolher o Grupo BC Energia',
      lead: '',
      items: [
        {
          title: 'Comercializadora com geração própria',
          description:
            'Mais de 117 usinas, próprias e arrendadas, em plena operação.'
        },
        {
          title: 'Atuação nos dois ambientes',
          description:
            'Mercado Livre de Energia e geração distribuída, conforme o perfil do consumidor.'
        },
        {
          title: 'Maior independente do Centro-Oeste',
          description:
            'O grupo é a maior comercializadora independente da região e uma das principais do país.'
        }
      ]
    },
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          question: 'Quais cidades do Tocantins têm página própria no site?',
          answer:
            'Atualmente, Palmas possui uma página municipal dedicada. Consumidores de outras cidades do estado podem solicitar a análise pelo formulário de contato.'
        },
        {
          question: 'A solução é a mesma para todo o estado?',
          answer:
            'Não necessariamente. O enquadramento depende da tensão de ligação, da demanda contratada e do valor da conta de cada unidade consumidora.'
        },
        {
          question: 'É preciso investir em equipamentos?',
          answer:
            'Na geração distribuída, não. A energia vem das usinas do Grupo BC Energia e não há obra no imóvel do cliente.'
        }
      ]
    },
    cta: {
      heading: 'Solicite uma análise',
      description:
        'Envie sua conta de energia e receba a avaliação do perfil de consumo da sua unidade no Tocantins.',
      buttonLabel: 'Falar com um especialista',
      buttonHref: '/contato'
    },
    related: [
      {
        label: 'Veja a página de energia solar em Palmas',
        href: '/energia-solar-palmas',
        description: 'Atendimento no município da capital.'
      },
      {
        label: 'Veja as soluções para o agronegócio',
        href: '/segmentos/agronegocio',
        description: 'Conteúdo para produtores e agroindústrias.'
      },
      { ...USINAS, description: 'Usinas próprias e arrendadas em operação.' }
    ]
  }
}

/** Regiões indexadas pelo pathname da rota (usado pelas páginas e pelo meta). */
export const REGIONS_BY_PATH: Record<string, Region> = Object.values(REGIONS).reduce(
  (acc, region) => ({ ...acc, [region.path]: region }),
  {}
)

/**
 * Arquitetura futura (não implementada neste bloco): hubs estaduais
 * `/energia-solar-em-goias` e `/energia-solar-no-tocantins` como pais das
 * páginas municipais. O campo `statePath` já permite montar essa hierarquia
 * sem criar rotas novas — hoje só Palmas tem um hub estadual real.
 */
export const getRegionByPath = (path: string): Region | null => REGIONS_BY_PATH[path] ?? null
