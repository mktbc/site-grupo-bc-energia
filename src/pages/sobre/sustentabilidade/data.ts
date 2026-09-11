import { FeatureV2Props } from '@/components/FeatureV2/FeatureV2.type'
import { getBCIcon } from '@/config/icons'
import { AboutContent, ResourcesProps } from '@/components/Sections/Sections.type'

export const content: AboutContent = [
  {
    title: 'Sustentabilidade no DNA do Grupo BC Energia',
    description:
      'No Grupo BC Energia , a sustentabilidade vai muito além do cumprimento de padrões ambientais. Ela faz parte do nosso DNA, guiando cada passo na nossa jornada para promover um futuro mais limpo e responsável. Desde a geração até a comercialização de energia, nossa missão é fornecer energia limpa e renovável , acessível a todos, contribuindo para a preservação do meio ambiente.\n'
  }
]

export const features: Array<FeatureV2Props> = [
  {
    icon: getBCIcon('energia-eolica'),
    title: '+ de 200 mil MWh',
    description: 'gerados através de fontes renováveis'
  },
  {
    icon: getBCIcon('planeta-sustentavel'),
    title: '+ de 15 mil',
    description: 'toneladas de CO2 evitados na atmosfera'
  }
]

export const resources: ResourcesProps = {
  title: 'Ações Concretas pela Sustentabilidade',
  items: [
    {
      title: 'Replantio de plantas nativas',
      description:
        'Ajudamos na recuperação de áreas desmatadas, promovendo o equilíbrio ambiental e a preservação da biodiversidade.'
    },
    {
      title: 'Conservação ambiental ',
      description:
        'Nossas práticas estão homologadas com as políticas de preservação ambiental, garantindo um impacto positivo no ecossistema.\n'
    },
    {
      title: 'Energia limpa e renovável',
      description:
        'Cada unidade de energia gerada por nossas usinas solares é uma contribuição para um mundo mais sustentável.'
    }
  ],
  img: '/img/pages/2147948282.webp'
}
