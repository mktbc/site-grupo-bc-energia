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
import Link from '@/components/Link'
import { INSTITUTIONAL_GRAPHIC } from '@/config/brandGraphics'

/**
 * /sobre/social — responsabilidade social (VISUAL 14).
 *
 * Macroblocos: propósito → impacto → iniciativas → registros. Todas as
 * iniciativas descritas já existiam no conteúdo do projeto (Associação Bloomy,
 * Projeto SER em Angola, apoio a idosos e mulheres em GO).
 */
const initiatives = [
  {
    title: 'Projeto SER: educação e esperança em Angola',
    description:
      'O Projeto SER, desenvolvido pela Associação Bloomy, é uma das principais iniciativas sociais que apoiamos. Com foco em levar educação, alimentação e saúde para mais de 600 crianças e adolescentes em Angola, o projeto é um símbolo do nosso compromisso em promover mudanças sociais significativas. Por meio da construção de escolas e da oferta de suporte essencial, o Grupo BC Energia contribui para garantir que essas crianças tenham acesso a melhores condições de vida e oportunidades de desenvolvimento.'
  },
  {
    title: 'Atuação social no Brasil e no mundo',
    description:
      'Nosso compromisso social não se limita ao Brasil. Ao apoiar o Projeto SER em Angola, ampliamos nosso impacto global, promovendo educação e bem-estar para comunidades carentes. Além disso, no Brasil, especialmente no estado de Goiás, atuamos para ajudar idosos e mulheres, garantindo que mais pessoas em situação de vulnerabilidade tenham acesso a cuidados, inclusão e melhoria de qualidade de vida.'
  },
  {
    title: 'Transformando comunidades com a Associação Bloomy',
    description:
      'Ao lado da Associação Bloomy, o Grupo BC Energia orgulha-se de fazer parte desta iniciativa transformadora que impacta positivamente tantas vidas. O nosso apoio ao Projeto SER em Angola reafirma o nosso compromisso de promover um mundo mais justo e sustentável, onde a educação, a saúde e a dignidade sejam acessíveis a todos.'
  }
]

const focusAreas = [
  {
    title: 'Educação',
    description:
      'Contribuímos para a construção de escolas e oferecemos programas que garantem que crianças e adolescentes em Angola tenham acesso à educação de qualidade.'
  },
  {
    title: 'Saúde e alimentação',
    description:
      'O Grupo BC Energia participa ativamente da garantia de alimentos e cuidados de saúde essenciais para mais de 600 jovens, proporcionando um suporte vital para o desenvolvimento dessas comunidades.'
  },
  {
    title: 'Apoio a idosos e mulheres',
    description:
      'No Brasil, promovemos iniciativas voltadas ao cuidado e à inclusão de idosos e mulheres, reforçando nosso compromisso com a equidade social.'
  }
]

const Social = () => (
  <div className="min-h-screen">
    <PageHeader
      align="left"
      flush
      eyebrowRule={false}
      variant="banner"
      lightOverlay
      bgPosition="bg-[position:18%_top] md:bg-[position:64%_center] lg:bg-[position:62%_center]"
      eyebrow="Responsabilidade social"
      title="Compromisso social"
      titleLine2="do Grupo BC Energia"
      description="Em parceria com a Associação Bloomy, apoiamos o Projeto SER, que leva educação, saúde e alimentação para crianças e adolescentes em Angola."
      bgImage="/img/pages/social-hero.webp"
      category="Sobre"
    />

    {/* PROPÓSITO */}
    <InstitutionalIntro
      graphic={INSTITUTIONAL_GRAPHIC.socialIntro}
      eyebrow="Nosso propósito social"
      title="Transformando vidas com a Associação Bloomy"
      paragraphs={[
        'No Grupo BC Energia, a responsabilidade social é uma parte central do nosso propósito. Além de fornecer energia limpa e renovável, estamos engajados em ações sociais que impactam positivamente comunidades em situação de vulnerabilidade.',
        'Em parceria com a Associação Bloomy, apoiamos o Projeto SER, que leva educação, saúde e alimentação para crianças e adolescentes em Angola, transformando vidas e criando oportunidades para um futuro melhor.'
      ]}
      image={{
        src: '/img/pages/grupo-bg-esg-social.webp',
        alt: 'Crianças atendidas pelo Projeto SER, apoiado pelo Grupo BC Energia',
        width: 600,
        height: 533
      }}
    />

    {/* IMPACTO — apenas números já publicados no conteúdo das iniciativas. */}
    <InstitutionalHighlights
      graphic={{
        variant: 'loops',
        tone: 'teal',
        size: 'medium',
        position: 'right',
        opacity: 0.06
      }}
      variant="system"
      eyebrow="Impacto"
      title="Onde o apoio chega"
      items={[
        {
          value: '+600',
          label: 'Crianças e adolescentes',
          description: 'Atendidos pelo Projeto SER, em Angola, com educação, alimentação e saúde.'
        },
        {
          value: 'Angola',
          label: 'Projeto SER',
          description: 'Construção de escolas e suporte essencial junto à Associação Bloomy.'
        },
        {
          value: 'Goiás',
          label: 'Apoio a idosos e mulheres',
          description: 'Ações de cuidado e inclusão de pessoas em situação de vulnerabilidade.'
        }
      ]}
      tone="dark"
      id="impacto"
    />

    {/* INICIATIVAS */}
    <InstitutionalList
      eyebrow="Frentes apoiadas"
      title="Educação, saúde e inclusão"
      description="As três frentes que orientam o apoio social do grupo, no Brasil e em Angola."
      items={focusAreas}
      columns={3}
      tone="surface"
      id="iniciativas"
    />

    {/* REGISTROS */}
    <InstitutionalSection tone="soft" id="detalhes" graphic={INSTITUTIONAL_GRAPHIC.socialDetalhes}>
      <div>
        <div className="measure-title">
          <SectionHeader
            eyebrow="Projeto SER"
            title="A parceria em detalhe"
            description="Registro do apoio contínuo à Associação Bloomy."
          />
        </div>

        {/* Cluster institucional: logo + CTA no mesmo bloco */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <img
            src="/img/pages/bloomy.jpeg"
            alt="Logotipo da Associação Bloomy, parceira social do Grupo BC Energia"
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            className="h-auto w-20 rounded-[8px]"
          />

          <Link
            href="https://www.instagram.com/bloomy_ong/"
            target="_blank"
            rel="noopener noreferrer"
            data-cta-name="social_conhecer_bloomy"
            className="inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            Conheça os projetos da Bloomy
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 items-start gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {initiatives.map((initiative, index) => (
            <li key={initiative.title}>
              <h3 className="t-h4 mt-2 text-text-primary">{initiative.title}</h3>
              <p className="mt-2.5 t-body-sm text-text-secondary">
                {initiative.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </InstitutionalSection>


    <RelatedLinks
      variant="editorial"
      eyebrow="Continue navegando"
      title="Continue conhecendo o grupo"
      items={[
        {
          label: 'Conheça o Grupo BC Energia',
          href: '/sobre',
          description: 'Estrutura, propósito e temas institucionais.'
        },
        {
          label: 'Veja nossas práticas de sustentabilidade',
          href: '/sobre/sustentabilidade',
          description: 'Geração renovável, conservação e governança.'
        }
      ]}
    />

    <InstitutionalCta
      eyebrow="Fale com a BC"
      title="Quer conversar com o nosso time?"
      cta={{ label: 'Falar com a BC Energia', href: '/contato' }}
    />
  </div>
)

export default Social
