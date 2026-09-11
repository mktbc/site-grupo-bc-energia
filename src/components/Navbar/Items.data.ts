import { INTEGRATIONS } from '@/config/integrations'

import { NavbarItems, NavbarSubItems } from './Navbar.type'

const produtos: Array<NavbarSubItems> = [
  {
    id: '1.1',
    title: 'Mercado livre de energia',
    icon: {
      url: 'icon-mercado-energia.svg',
      size: [37, 43]
    },
    url: '/produtos/mercado-livre-de-energia'
  },
  {
    id: '1.2',
    title: 'Consórcio BC Energia',
    icon: {
      url: 'icon-energia-assinatura.svg',
      size: [32, 32]
    },
    url: '/produtos/consorcio-bc-energia'
  },
  {
    id: '1.3',
    title: 'Gestão de Energia',
    icon: {
      url: 'icon-gestao-de-energia.svg',
      size: [30, 30]
    },
    url: '/produtos/gestao-de-energia'
  },
  {
    id: '1.4',
    title: 'Certificação Renovável I-REC',
    icon: {
      url: 'irec.svg',
      size: [27, 34]
    },
    url: '/produtos/certificacao-renovavel-irec'
  },
  {
    id: '1.5',
    title: 'Arrendamento de usinas',
    icon: {
      url: 'icon-arrendamento-de-usinas.svg',
      size: [33, 33]
    },
    url: '/produtos/arrendamento-de-usinas'
  },
  {
    id: '1.6',
    title: 'Consultoria Jurídica',
    icon: {
      url: 'icon-consultoria-juridica.svg',
      size: [27, 34]
    },
    url: 'https://www.bced.com.br/',
    target: '_blank'
  }
]

export const segmentos: Array<NavbarSubItems> = [
  {
    id: '2.1',
    title: 'Agronegócio',
    description: 'Energia limpa e barata para seu agronegócio crescer forte e com lucratividade',
    url: '/segmentos/agronegocio',
    icon: {
      url: 'agronegocio.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.2',
    title: 'Bares e Restaurantes',
    description:
      'Sustentabilidade no cardápio: Ofereça aos seus clientes um ambiente mais verde com energia renovável',
    url: '/segmentos/bares-e-restaurantes',
    icon: {
      url: 'bareserestaurante.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.3',
    title: 'Condomínio',
    description: 'Condomínios modernos reduzem custo sem abrir mão da sustentabilidade',
    url: '/segmentos/condominio',
    icon: {
      url: 'condominio.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.4',
    title: 'Educacional',
    description: '',
    url: '/segmentos/educacional',
    icon: {
      url: 'educacional.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.5',
    title: 'Turismo',
    description: '',
    url: '/segmentos/turismo',
    icon: {
      url: 'turismo.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.6',
    title: 'Lazer',
    description: 'O futuro da energia para o lazer e entretenimento',
    url: '/segmentos/lazer',
    icon: {
      url: 'lazer.svg',
      size: [35, 35]
    }
  },
  {
    id: '2.7',
    title: 'Religioso',
    description: 'Trazendo economia e sustentabilidade para sua gestão',
    url: '/segmentos/religioso',
    icon: {
      url: 'religioso.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.8',
    title: 'Residencial',
    description: 'Conforto no seu lar, economia no seu bolso',
    url: '/segmentos/residencial',
    icon: {
      url: 'residencial.svg',
      size: [32, 32]
    }
  },
  {
    id: '2.9',
    title: 'Saúde',
    description: 'Cuide da saúde da sua conta de energia',
    url: '/segmentos/saude',
    icon: {
      url: 'saude.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.10',
    title: 'Serviço',
    description: 'Entregue resultado, sem preocupação com a conta de energia',
    url: '/segmentos/servico',
    icon: {
      url: 'servico.svg',
      size: [30, 30]
    }
  },
  {
    id: '2.11',
    title: 'Varejo',
    description: 'Sed ut perspiciatis unde omnis iste natus',
    url: '/segmentos/varejo',
    border: false,
    icon: {
      url: 'varejo.svg',
      size: [30, 30]
    }
  }
]

const sobre: Array<NavbarSubItems> = [
  {
    id: '3.1',
    title: 'Quem Somos',
    url: '/sobre/quem-somos'
  },
  {
    id: '3.2',
    title: 'Nossas Usinas',
    url: '/sobre/nossas-usinas'
  },
  {
    id: '3.3',
    title: 'LGPD',
    url: '/sobre/lgpd'
  },
  {
    id: '3.4',
    title: 'Leilão',
    url: '/sobre/leilao'
  },
  {
    id: '3.5',
    title: 'Fator de Alavancagem',
    url: '/sobre/fator-de-alavancagem'
  },
  {
    id: '3.6',
    title: 'Sustentabilidade',
    url: '/sobre/sustentabilidade'
  },
  {
    id: '3.7',
    title: 'Social',
    url: '/sobre/social'
  },
  {
    id: '3.8',
    title: 'Condições Gerais Varejistas',
    url: '/sobre/condicoes-gerais-varejistas'
  }
]

export const itemsData: Array<NavbarItems> = [
  {
    id: '1',
    title: 'Produtos',
    url: '/produtos',
    size: 'lg',
    column: 2,
    subItems: produtos
  },
  {
    id: '2',
    title: 'Segmentos',
    url: '/segmentos',
    column: 2,
    subItems: segmentos
  },
  {
    id: '3',
    title: 'Sobre nós',
    url: '/sobre',
    subItems: sobre
  },
  {
    id: '4',
    title: 'Conteúdo',
    url: '/conteudo',
    subItems: [
      {
        id: '4.1',
        title: 'BC Cast',
        target: '_blank',
        url: 'https://www.youtube.com/@grupobcenergia/videos'
      },
      {
        id: '4.2',
        title: 'Blog',
        target: '_blank',
        url: 'https://blog.grupobcenergia.com.br/'
      }
    ]
  },
  {
    id: '5',
    title: 'Contato',
    subItems: [
      {
        id: '5.1',
        title: 'Entre em contato',
        url: '/contato'
      },
      {
        id: '5.2',
        title: 'Quero ser parceiro',
        target: '_blank',
        url: 'https://page.grupobcenergia.com.br/parceiros'
      },
      {
        id: '5.3',
        title: 'Trabalhe conosco',
        target: '_blank',
        url: INTEGRATIONS.VAGAS_URL
      },
      {
        id: '5.4',
        title: 'Sou fornecedor/Prestador de Serviços ',
        target: '_blank',
        // TODO: TI reconectar — link de WhatsApp (antes: process.env.WHATSAPP_LINK_COMPRAS)
        url: INTEGRATIONS.WHATSAPP_LINK_COMPRAS || '/contato'
      }
    ],
    url: '/contato'
  }
]
