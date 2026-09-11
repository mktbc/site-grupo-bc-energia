import {
  InstitutionalCta,
  InstitutionalHighlights,
  InstitutionalIntro,
  InstitutionalList,
  InstitutionalSection,
  PageHeader,
  RelatedLinks,
  SectionHeader
} from '@/components'
import { POWER_PLANT_COUNT } from '@/data/powerPlants'

import { content, features, resources } from './data'
import { INSTITUTIONAL_GRAPHIC } from '@/config/brandGraphics'
import { ContextualContent } from '@/components/Content'

/**
 * /sobre/sustentabilidade — aprofunda a narrativa iniciada na Home (VISUAL 14).
 *
 * Macroblocos: visão → prática → impacto → governança → prova. Somente
 * compromissos e números já publicados pelo grupo. Nenhum pilar ESG genérico
 * foi criado: as ações listadas vêm de `./data`.
 */
const [intro] = content

const pillars = [
  {
    title: 'Energia sustentável e renovável',
    description:
      'Nossas usinas fotovoltaicas geram energia 100% renovável, contribuindo para a redução das emissões de carbono e para a preservação dos recursos naturais. Por meio da geração e comercialização de energia solar, ajudamos nossos clientes a consumir energia sustentável, promovendo um consumo consciente e responsável.'
  },
  {
    title: 'Compromisso com o meio ambiente',
    description:
      'Atuamos em conformidade com as melhores práticas ambientais, engajados em ações que fazem a diferença. Investimos no replantio de plantas nativas e na conservação de áreas verdes, promovendo a recuperação do ecossistema e contribuindo para a biodiversidade local.'
  },
  {
    title: 'Atuação responsável',
    description:
      'Nossas ações são voltadas para o presente e o futuro, com foco em soluções que minimizem os impactos ambientais e maximizem a eficiência energética. Acreditamos que a energia sustentável é um direito de todos, e trabalhamos para torná-la acessível, sem comprometer as gerações futuras.'
  }
]

const Sustainability = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      eyebrow="Sustentabilidade"
      title="Energia limpa como"
      titleLine2="parte da operação"
      description="No Grupo BC Energia, sustentabilidade é parte essencial da nossa identidade: geração renovável própria, conservação ambiental e governança transparente."
      bgImage="/img/global/energia-por-assinatura.webp"
      category="Sobre"
    />

    {/* VISÃO */}
    <InstitutionalIntro
      graphic={INSTITUTIONAL_GRAPHIC.sustentabilidadeIntro}
      eyebrow="Nosso DNA"
      title={intro?.title ?? 'Sustentabilidade no DNA do Grupo BC Energia'}
      paragraphs={[String(intro?.description ?? '').trim()]}
      image={{
        src: '/img/pages/sustentabilidade.webp',
        alt: 'Usina fotovoltaica do Grupo BC Energia em operação',
        width: 1200,
        height: 800
      }}
    />

    {/* IMPACTO — prova numérica antecipada, em superfície escura. */}
    <InstitutionalHighlights
      graphic={INSTITUTIONAL_GRAPHIC.sustentabilidadeHighlights}
      eyebrow="Impacto"
      title="O que a geração renovável já representa"
      items={features.map((feature) => ({
        value: String(feature.title),
        label: String(feature.description)
      }))}
      tone="dark"
      variant="editorial"
      id="impacto"
    />

    {/* PRÁTICA — pilares como lista editorial, sem cards e sem amarelo. */}
    <InstitutionalList
      eyebrow="Como praticamos"
      title="Da geração renovável ao consumo consciente"
      description="Três frentes sustentam a atuação ambiental do grupo, da usina ao cliente final."
      items={pillars}
      columns={3}
      tone="surface"
      id="pilares"
    />

    {/* AÇÕES CONCRETAS — texto e registro fotográfico no mesmo macrobloco. */}
    <InstitutionalSection tone="soft" id="acoes">
      <SectionHeader eyebrow="Ações concretas" title={resources.title} />

      <img
        src={resources.img}
        alt="Muda de planta nativa sendo cultivada em área de conservação"
        width={1600}
        height={700}
        sizes="100vw"
        loading="lazy"
        decoding="async"
        className="bc-fmt-landscape mt-7 object-center lg:max-h-[560px]"
      />

      <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {resources.items.map((item, index) => (
          <li key={item.title} className="border-t border-border-subtle pt-4">
            <h3 className="mt-2 t-h4 text-text-primary">{item.title.trim()}</h3>
            <p className="mt-2 max-w-[42ch] t-body-sm text-text-secondary">
              {item.description.trim()}
            </p>
          </li>
        ))}
      </ul>
    </InstitutionalSection>

    {/* GOVERNANÇA E CERTIFICAÇÃO */}
    <InstitutionalSection tone="surface" id="governanca" graphic={INSTITUTIONAL_GRAPHIC.sustentabilidadeGovernanca}>
      <div>
        <SectionHeader eyebrow="Governança" title="Transparência como padrão" />
        <div className="mt-7 grid grid-cols-1 gap-x-10 md:grid-cols-2">
          <p className="measure-body t-body text-text-secondary">
            Nossa governança transparente e ética estabelece um padrão de responsabilidade
            corporativa, demonstrando protagonismo no setor elétrico com responsabilidade social e
            ambiental. Há cinco anos temos nossos balanços auditados por uma auditoria independente
            de grande porte.
          </p>
          <p className="mt-4 measure-body t-body text-text-secondary md:mt-0">
            {`A estrutura de geração própria, com ${POWER_PLANT_COUNT} complexos renováveis, sustenta a energia que comercializamos.`}
          </p>
        </div>
      </div>
    </InstitutionalSection>

    <RelatedLinks
      variant="editorial"
      eyebrow="Continue navegando"
      title="Aprofundar em sustentabilidade"
      items={[
        {
          label: 'Conheça a certificação renovável I-REC',
          href: '/produtos/certificacao-renovavel-irec',
          description: 'Comprovação internacional da origem renovável da energia consumida.'
        },
        {
          label: 'Veja a nossa estrutura de geração',
          href: '/sobre/nossas-usinas',
          description: 'Complexos solares e hidrelétricos operados pela BC Renováveis.'
        },
        {
          label: 'Conheça as nossas ações sociais',
          href: '/sobre/social',
          description: 'O apoio à Associação Bloomy e ao Projeto SER.'
        }
      ]}
    />
    <ContextualContent
      title="Aprofunde energia renovável e I-REC"
      cluster="sustentabilidade-irec"
      trackingId="institucional_sustentabilidade"
      limit={2}
    />


    <InstitutionalCta
      eyebrow="Fale com a BC"
      title="Quer consumir energia de origem renovável?"
      cta={{ label: 'Conhecer nossas soluções', href: '/produtos' }}
      secondaryCta={{ label: 'Falar com a BC Energia', href: '/contato' }}
    />
  </div>
)

export default Sustainability
