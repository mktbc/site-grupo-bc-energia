import { AccordionType } from '@/components/Accordion/Accordion.type'
import { FeaturesProps } from '@/components/Features/Features.type'
import { AboutContent, CtaProps, HowItWorksProps } from '@/components/Sections/Sections.type'

export const content: AboutContent = [
  {
    title: 'Consórcio BC Energia: Economia na conta de luz sem investimento em placa solar\n',
    description:
      'O Consórcio BC Energia é a solução ideal para consumidores de baixa tensão que buscam reduzir a conta de luz sem a necessidade de investir em placas solares. Com o Consórcio BC Energia, você tem até 25% de economia na conta de energia, utilizando energia limpa gerada pelas mais de 100 usinas do Grupo BC Energia, sem alterar a estrutura física do seu imóvel. \n \n  Aqui, você não paga taxas de adesão, não tem fidelidade e não precisa se preocupar com mudanças na instalação elétrica. Todo o processo é simples e eficiente: a energia gerada pelas usinas é injetada na rede de distribuição e os créditos são convertidos em descontos na sua conta de luz.\n \n  Se você é consumidor residencial ou comercial com conta de energia a partir de R$250,00, pode aderir ao consórcio sem complicações. Reduza seus custos com energia agora e aproveite os benefícios da energia sustentável! \n \n'
  }
]

export const features: Array<FeaturesProps> = [
  {
    id: '1',
    icon: '✓',
    title: 'Até 25% de economia na conta de energia'
  },
  {
    id: '2',
    icon: '✓',
    title: 'Sem investimento em placas solares'
  },
  {
    id: '3',
    icon: '✓',
    title: 'Sem mudanças na estrutura física'
  },
  {
    id: '4',
    icon: '✓',
    title: 'Sem taxa de adesão e sem fidelidade'
  }
]

export const howItWorks: HowItWorksProps = {
  title: 'Mas o que é a Geração Distribuída de Energia?',
  description:
    'A Geração Distribuída de Energia (GD) refere-se à produção de energia elétrica próxima ou no local de consumo, ao contrário da geração centralizada tradicional, onde a energia é produzida em grandes plantas (como hidrelétricas, termelétricas, etc.) e transmitida por longas distâncias até os consumidores. A Geração Distribuída pode ser realizada por consumidores individuais ou por pequenas comunidades, e geralmente envolve fontes de energia renováveis. Aqui estão os principais aspectos:',
  itens: [
    {
      title: 'Fontes de Energia',
      description:
        'A Geração Distribuída elétrica comumente utiliza fontes renováveis, como energia solar fotovoltaica, energia eólica, biomassa, pequenas centrais hidrelétricas (PCHs) e cogeração qualificada.'
    },
    {
      title: 'Redução de Perdas e Eficiência',
      description:
        'Ao gerar energia mais próxima de onde ela é consumida, reduzem-se as perdas de transmissão e distribuição, resultando em uma maior eficiência energética.'
    },
    {
      title: 'Autonomia e Segurança Energética',
      description:
        'Consumidores que adotam a GD têm maior independência das variações de preço e das interrupções do fornecimento de energia da rede centralizada, aumentando a segurança energética.'
    },
    {
      title: 'Impacto Ambiental',
      description:
        'A GD, especialmente quando baseada em fontes renováveis, tem um impacto ambiental menor comparado à geração centralizada, contribuindo para a redução de emissões de gases de efeito estufa.'
    },
    {
      title: 'Descentralização e Empoderamento',
      description:
        'A GD promove a descentralização da produção de energia, permitindo que consumidores se tornem prosumidores (produtores e consumidores), o que pode democratizar o acesso à energia e promover o empoderamento comunitário.'
    }
  ],
  checkItem:
    'Este mercado está crescendo rapidamente em muitas partes do mundo, impulsionada pela queda nos custos das tecnologias renováveis, pelo desejo de maior independência energética e pela necessidade de reduzir as emissões de carbono e o Grupo BC Energia irá liderar esses avanços no Brasil.',
  imgUrl: '/img/pages/consorcio-de-energia-o-que-e.webp'
}

const Title = () => (
  <>
    Somos a maior <span className="text-bc-yellow">comercializadora de energia</span> do
    Centro-Oeste e uma das principais independentes do país.
  </>
)

export const cta: CtaProps = {
  bgImage: '/img/global/arrendamento-de-usinas.webp',
  title: <Title />,
  link: '#contato',
  linkText: 'Quero economizar'
}

export const faq: Array<AccordionType> = [
  {
    title: 'O que é o Consórcio BC Energia?',
    content:
      'O Consórcio BC Energia é um modelo de rateio da energia gerada por uma usina do Grupo BC Energia. Os consorciados se beneficiam de até 25% de economia na conta de energia, sem a necessidade de investimento inicial. Esse modelo permite que os participantes obtenham descontos significativos em suas contas de energia elétrica, aproveitando a energia produzida pela usina.'
  },
  {
    title: 'Quem pode aderir ao Consórcio BC Energia?',
    content:
      'Qualquer consumidor de baixa tensão que possua uma conta de energia a partir de R$250,00 e esteja localizado na mesma região da distribuidora onde a usina do Grupo BC Energia está conectada pode aderir ao consórcio. É importante verificar se sua localização atende aos requisitos de região para a adesão.'
  },
  {
    title: 'Como funciona o Consórcio BC Energia?',
    content:
      'A energia gerada pelas usinas do Grupo BC Energia é injetada na rede de distribuição local. A distribuidora recompensa o alívio de carga fornecendo créditos, que são então repassados aos consorciados na forma de descontos em suas contas de energia. Esse processo garante que os participantes recebam uma redução efetiva em seus custos de energia elétrica.'
  },
  {
    title: 'Com quem devo falar caso falte energia?',
    content:
      'A distribuidora local continua sendo responsável pela infraestrutura física e pelo fornecimento de energia até a sua unidade consumidora. Portanto, se ocorrer uma falta de energia, você deve entrar em contato diretamente com a distribuidora local para reportar o problema e obter assistência.'
  }
]
