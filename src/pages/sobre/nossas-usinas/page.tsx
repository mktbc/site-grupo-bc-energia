import {
  Customers,
  InstitutionalCta,
  InstitutionalPlants,
  InstitutionalSection,
  InstitutionalStrip,
  MetricMedia,
  PageHeader,
  RelatedLinks,
  SectionHeader
} from '@/components'
import { POWER_PLANTS, POWER_PLANT_COUNT, POWER_PLANT_STATES } from '@/data/powerPlants'
import { ContextualContent } from '@/components/Content'

/**
 * /sobre/nossas-usinas — estrutura de geração (VISUAL 14).
 *
 * Fotografia protagonista no hero, prova numérica, registro fotográfico
 * editorial e listagem dos complexos agrupada por estado — sem catálogo de
 * cards. Hierarquia: H1 (hero) → H2 das seções → H3 por estado → H4 por
 * complexo. Todos os dados técnicos vêm de `src/data/powerPlants.ts`.
 */
/**
 * Registro fotográfico: as duas fotos de maior resolução do cadastro
 * (900×506) e uma central hidrelétrica, para mostrar as duas fontes citadas
 * no texto. As demais fotos têm 500×300. Fallback: os 3 primeiros complexos.
 */
const GALLERY_TITLES = ['Complexo Clareira de Araçu', 'Complexo Corumbá', 'CGH Rio Bonito']
const selectedPlants = GALLERY_TITLES.map((title) =>
  POWER_PLANTS.find((plant) => plant.title === title)
).filter((plant): plant is (typeof POWER_PLANTS)[number] => Boolean(plant))
const galleryPlants = selectedPlants.length === 3 ? selectedPlants : POWER_PLANTS.slice(0, 3)

const OurPlants = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      eyebrow="Estrutura de geração"
      title="Nossas usinas"
      description="A BC Renováveis atua na geração de energia elétrica por fontes renováveis, com estrutura própria de usinas distribuídas em locais estratégicos."
      bgImage="/img/pages/nossas-usinas.webp"
      bgPosition="bg-[position:60%_center] lg:bg-[position:center_center]"
      category="Sobre"
      variant="banner"
    />

    <InstitutionalSection tone="surface" id="geracao-propria">
      <div>
        <SectionHeader
          eyebrow="Geração própria"
          title="Uma estrutura que sustenta o que comercializamos"
        />

        <div className="mt-7 grid grid-cols-1 gap-x-10 md:grid-cols-2">
          <p className="measure-body t-body-lg text-text-secondary">
            A empresa BC Renováveis atua na área de geração de energia elétrica através de fontes
            renováveis. Contamos com uma estrutura própria de usinas distribuídas em locais
            estratégicos, o que garante a capacidade necessária para geração e distribuição de
            energia.
          </p>
          <p className="measure-body t-body-lg text-text-secondary md:mt-0 mt-4">
            O parque cadastrado reúne usinas fotovoltaicas de estrutura fixa e tracker, além de
            centrais geradoras hidrelétricas.
          </p>
        </div>

        <MetricMedia
          className="mt-12"
          layout="media-right"
          surface="light"
          value={String(POWER_PLANT_COUNT)}
          label="Complexos de geração"
          description="Estruturas fotovoltaicas de solo fixo, tracker e centrais geradoras hidrelétricas."
          image={{
            src: '/img/pages/nossas-usinas2.webp',
            alt: 'Vista aérea de complexo de geração solar da BC Renováveis',
            width: 1600,
            height: 900,
            format: 'landscape'
          }}
          secondary={[
            { value: String(POWER_PLANT_STATES.length), label: 'Estados com estrutura' },
            { value: 'Solar e hídrica', label: 'Fontes renováveis' }
          ]}
        />
      </div>
    </InstitutionalSection>

    <InstitutionalStrip
      label="Registro fotográfico dos complexos de geração"
      tone="soft"
      items={galleryPlants.map((plant) => ({
        src: plant.image,
        alt: `Vista da usina do ${plant.title}`,
        caption: `${plant.title} · ${plant.location}`
      }))}
    />

    <InstitutionalPlants
      eyebrow="Parque de geração"
      title="Complexos em operação"
      description="Ficha técnica de cada complexo, conforme cadastro da BC Renováveis, agrupada por estado."
      plants={POWER_PLANTS}
      tone="surface"
      id="complexos"
    />

    <Customers variant="grid" />

    <RelatedLinks
      variant="editorial"
      eyebrow="Continue navegando"
      title="Continue conhecendo o grupo"
      items={[
        {
          label: 'Conheça a história e o propósito do Grupo BC Energia',
          href: '/sobre/quem-somos',
          description: 'Quem somos, como atuamos e o que nos orienta.'
        },
        {
          label: 'Veja nossas práticas de sustentabilidade',
          href: '/sobre/sustentabilidade',
          description: 'Geração renovável, conservação e impacto evitado.'
        },
        {
          label: 'Entenda a certificação renovável I-REC',
          href: '/produtos/certificacao-renovavel-irec',
          description: 'Comprove a origem renovável da energia consumida.'
        }
      ]}
    />
    <ContextualContent
      title="Aprofunde o tema de geração própria"
      cluster="usinas-arrendamento"
      trackingId="institucional_usinas"
      limit={2}
    />


    <InstitutionalCta
      eyebrow="Fale com a BC"
      title="Quer avaliar o fornecimento para a sua operação?"
      cta={{ label: 'Conhecer nossas soluções', href: '/produtos' }}
      secondaryCta={{ label: 'Falar com a BC Energia', href: '/contato' }}
    />
  </div>
)

export default OurPlants
