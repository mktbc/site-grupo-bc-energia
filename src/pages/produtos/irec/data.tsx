import { AboutContent } from '@/components/Sections/Sections.type'

const TitleIntro = () => (
  <span>
    Certifique sua energia com <br /> I-REC e compense as emissões de carbono da sua empresa
  </span>
)

export const content: AboutContent = [
  {
    title: <TitleIntro />,
    description:
      'O I-REC (International Renewable Energy Certificate) é uma certificação internacional de energia renovável que comprova o uso de energia limpa em sua cadeia de produção. Esta certificação não apenas atesta seu compromisso com a descarbonização, mas também fortalece a imagem da sua empresa perante a agenda ESG (Environmental,Social, and Governance).'
  }
]

export const content2: AboutContent = [
  {
    title: 'I-REC: A Solução para Empresas de Todos os Tamanhos',
    description:
      'A certificação I-REC é acessível para empresas de pequeno, médio e grande porte, desde multinacionais até pequenos negócios locais. Para obter o certificado, basta que a empresa utilize energia gerada por fontes renováveis. Os cálculos de I-REC podem ser feitos a curto ou longo prazo, oferecendo flexibilidade para atender às necessidades específicas de cada organização. \n \n Certifique sua energia com o I-REC do Grupo BC Energia e fortaleça seu compromisso com um futuro sustentável. Entre em contato conosco para mais informações sobre como adquirir a certificação I-REC e comece a transformar a pegada de carbono da sua empresa hoje mesmo!'
  }
]

export const benefits: Array<{ title: string; description: string }> = [
  {
    title: 'Reconhecimento Internacional:',
    description: 'A certificação I-REC é amplamente reconhecida e respeitada globalmente.'
  },
  {
    title: 'Integridade e Transparência:',
    description:
      'Não há duplicidade nos certificados, garantindo que cada unidade de energia renovável é contabilizada de forma única.'
  },
  {
    title: 'Conformidade com o GHG Protocol Escopo 2:',
    description:
      'A certificação I-REC segue rigorosamente as diretrizes do GHG Protocol para emissões de Escopo 2.'
  },
  {
    title: 'Compromisso com a ESG:',
    description:
      'Mostre que sua empresa pratica a responsabilidade ambiental e social de verdade, alinhando-se aos princípios ESG.'
  }
]
