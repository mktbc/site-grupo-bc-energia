import {
  InstitutionalCta,
  InstitutionalHighlights,
  InstitutionalIntro,
  PageHeader
} from '@/components'
import { ABOUT_HUB_ITEMS } from '@/config/navigation'
import { COMPANY_METRICS } from '@/data/companyMetrics'
import { POWER_PLANT_COUNT } from '@/data/powerPlants'

import AboutTopics from './AboutTopics'
import { INSTITUTIONAL_GRAPHIC } from '@/config/brandGraphics'

/**
 * Hub institucional /sobre.
 *
 * Não é uma landing comercial: apresenta quem é o grupo, organiza os temas
 * institucionais em categorias e encerra com um CTA discreto de contato.
 */
const INSTITUCIONAL = ['/sobre/quem-somos', '/sobre/nossas-usinas']
const RESPONSABILIDADE = ['/sobre/sustentabilidade', '/sobre/social']

const byHref = (hrefs: Array<string>) =>
  hrefs
    .map((href) => ABOUT_HUB_ITEMS.find((item) => item.href === href))
    .filter((item): item is (typeof ABOUT_HUB_ITEMS)[number] => Boolean(item))

const LEGAL_ITEMS = ABOUT_HUB_ITEMS.filter(
  (item) => ![...INSTITUCIONAL, ...RESPONSABILIDADE].includes(item.href)
)

const Page = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      eyebrow="O Grupo BC Energia"
      title="Quem é o Grupo"
      titleLine2="BC Energia"
      description="Um conjunto de empresas do setor elétrico com estrutura própria de geração, atuação no mercado livre e em geração distribuída, e informação regulatória aberta."
      bgImage="/img/global/arrendamento-de-usinas.webp"
      category="Sobre"
    />

    <InstitutionalIntro
      graphic={INSTITUTIONAL_GRAPHIC.sobreIntro}
      eyebrow="Institucional"
      title="Soluções de energia para todos os perfis de consumo"
      paragraphs={[
        'O Grupo BC Energia entrega soluções para redução na conta de energia a todos os perfis de clientes, no Mercado Livre de Energia e na Geração Distribuída.',
        `Por meio da BC Renováveis, o grupo opera ${POWER_PLANT_COUNT} complexos de geração próprios, solares fotovoltaicos e hidrelétricos, distribuídos em locais estratégicos.`
      ]}
      image={{
        src: '/img/pages/sobre-solucoes-perfis-consumo.webp',
        alt: 'Profissional do Grupo BC Energia em ambiente corporativo analisando documentos',
        width: 1439,
        height: 1920
      }}
    />

    {/* Seção limpa entre dois grafismos (ritmo VISUAL SYSTEM 03). */}
    <InstitutionalHighlights
      graphic={INSTITUTIONAL_GRAPHIC.sobreHighlights}
      items={COMPANY_METRICS.map((metric) => ({ ...metric }))}
    />

    <AboutTopics
      id="temas"
      eyebrow="Navegação institucional"
      title="Onde aprofundar"
      description="Cada tema institucional tem uma página própria, com o conteúdo oficial do grupo."
      groups={[
        {
          title: 'Institucional e estrutura',
          description: 'Quem é o grupo e a estrutura própria de geração por trás das soluções.',
          items: byHref(INSTITUCIONAL)
        },
        {
          title: 'Sustentabilidade e social',
          description: 'Práticas ambientais, certificação de energia renovável e atuação nas comunidades.',
          items: byHref(RESPONSABILIDADE)
        }
      ]}
      legal={{
        title: 'Legal e regulatório',
        description:
          'Documentos e informações publicados em atendimento à regulação do setor e à LGPD.',
        items: LEGAL_ITEMS
      }}
    />

    <InstitutionalCta
      eyebrow="Fale com a BC"
      title="Quer entender como o grupo pode atender a sua operação?"
      description="Conheça as soluções disponíveis ou fale diretamente com o nosso time."
      cta={{ label: 'Conhecer nossas soluções', href: '/produtos' }}
      secondaryCta={{ label: 'Falar com a BC Energia', href: '/contato' }}
    />
  </div>
)

export default Page
