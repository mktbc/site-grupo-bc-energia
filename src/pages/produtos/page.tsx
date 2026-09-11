import {
  ClosingCta,
  Customers,
  FormEmbed,
  PageHeader,
  RelatedLinks,
  SectionHeader
} from '@/components'
import { Container } from '@/components/Container'
import Link from '@/components/Link'
import { PRODUCT_HUB_ITEMS } from '@/config/navigation'
import { PRODUCT_RELATED } from '@/pages/produtos/relatedLinks.data'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'

/**
 * VISUAL 11 — hub /produtos.
 *
 * Hero banner, 1 solução protagonista e as demais como lista editorial.
 * O protagonista segue a mesma prioridade comercial da vitrine da Home
 * (Consórcio BC Energia — ver docs/EDITORIAL-ENERGY-PREMIUM.md); a ordem das
 * demais é a da fonte de navegação. Rotas, títulos, descrições e links vêm de
 * `PRODUCT_HUB_ITEMS`, sem conteúdo novo.
 */

/** Imagens reais já publicadas, por destino. */
const PRODUCT_IMAGES: Record<string, string> = {
  '/produtos/mercado-livre-de-energia': '/img/pages/produtos-lampada-energia.webp',
  '/produtos/consorcio-bc-energia': '/img/pages/consorcio-intro.webp',
  // gestao-de-energia-intro.webp tem texto embutido ("até 26%"): não usar.
  '/produtos/gestao-de-energia': '/img/pages/gestao-de-energia-lead.webp',
  '/produtos/certificacao-renovavel-irec': '/img/pages/certificacao-renovavel-intro.webp',
  '/produtos/arrendamento-de-usinas': '/img/pages/arrendamento-de-usinas-intro.webp'
}

/** Mesma prioridade da vitrine da Home (src/pages/home/Sections/Solutions.tsx). */
const FEATURED_HREF = '/produtos/consorcio-bc-energia'

const featured =
  PRODUCT_HUB_ITEMS.find((item) => item.href === FEATURED_HREF) ?? PRODUCT_HUB_ITEMS[0]
const others = PRODUCT_HUB_ITEMS.filter((item) => item !== featured)

const Page = () => (
  <div>
    <PageHeader
      align="left"
      variant="banner"
      flush
      eyebrowRule={false}
      title="Soluções em energia para cada"
      titleLine2="perfil de consumo"
      description="Conheça as soluções do Grupo BC Energia e encontre a alternativa mais adequada ao perfil de consumo da sua empresa, condomínio ou residência."
      bgImage="/img/global/arrendamento-de-usinas.webp"
      category="Produtos"
      cta={{ label: 'Enviar minha conta para análise', href: '#contato' }}
      secondaryCta={{ label: 'Ver soluções', href: '#solucoes' }}
    />


    <section id="solucoes" className="relative isolate overflow-hidden bg-surface text-text-primary">
      {/* ELEMENTO 01 (diagonais) — portfólio/energia. Recorte superior direito. */}
      <BrandGraphic variant="diagonal" tone="teal" size="medium" position="top-right" opacity={0.05} />
      <Container className="relative py-14 lg:py-20">
        <SectionHeader
          eyebrow="Portfólio"
          title="Soluções em energia do Grupo BC Energia"
          description="Reduzir custos, otimizar a gestão de energia e avançar em sustentabilidade — a escolha depende do perfil de ligação e do consumo."
        />

        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {featured ? (
            <article className="lg:col-span-7">
              <Link
                href={featured.href}
                target={featured.external ? '_blank' : undefined}
                data-cta-name={`hub_produtos_${featured.title}`}
                className="group block rounded-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bc-primary/40"
              >
                <img
                  src={PRODUCT_IMAGES[featured.href] ?? '/img/pages/mercado-livre-subestacao.webp'}
                  alt=""
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full rounded-[8px] object-cover"
                />

                <h3 className="t-h3 mt-6 text-text-primary group-hover:text-bc-primary">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-[42rem] t-body text-text-secondary">
                  {featured.description}
                </p>
                <span className="mt-4 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary">
                  Conhecer solução
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </article>
          ) : null}

          <ul className="lg:col-span-5 lg:self-start">
            {others.map((item) => (
              <li key={item.href} className="border-t border-border-subtle first:border-border-strong">
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  data-cta-name={`hub_produtos_${item.title}`}
                  className="group flex min-h-[64px] items-start justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bc-primary/40"
                >
                  <span>
                    <span className="t-h4 block text-text-primary group-hover:text-bc-primary">
                      {item.title}
                    </span>
                    <span className="mt-1 block t-body-sm text-text-secondary">
                      {item.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-bc-primary transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>

    <Customers
      variant="grid"
      description="Marcas que já contam com as soluções em energia do Grupo BC Energia."
    />

    <RelatedLinks
      variant="editorial"
      eyebrow="Próximos passos"
      title="Continue explorando"
      items={PRODUCT_RELATED['produtos']}
    />

    <ClosingCta
      graphic={{ variant: 'chevrons', tone: 'light', size: 'small', position: 'top-right', opacity: 0.05 }}
      eyebrow="Grupo BC Energia"
      title="Energia que gera valor"
      titleLine2="para o seu negócio"
      description="Empresas, condomínios e residências com contratos de energia mais eficientes, sem investimento inicial. Fale com um especialista e descubra o modelo ideal para o seu consumo."
      primaryCta={{ label: 'Falar com um especialista', href: '/contato' }}
      secondaryCta={{ label: 'Explorar soluções', href: '#solucoes' }}
      links={[
        {
          label: 'Arrendamento de Usinas',
          href: '/produtos/arrendamento-de-usinas',
          icon: 'usina-solar'
        },
        {
          label: 'Consultoria Jurídica',
          href: 'https://www.bced.com.br/',
          external: true,
          icon: 'contrato-aprovado',
          ariaLabel: 'Consultoria Jurídica BC Energia Direito (abre em nova aba)'
        },
        {
          label: 'Gestão de Energia',
          href: '/produtos/gestao-de-energia',
          icon: 'monitoramento-consumo'
        }
      ]}
    />


    <FormEmbed title="Entre em contato" />
  </div>
)

export default Page
