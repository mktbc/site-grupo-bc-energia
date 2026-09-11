import { Container, SectionHeader } from '@/components'
import BCIcon from '@/components/BCIcon/BCIcon'
import { buttonStyles } from '@/components/Button/Button.style'
import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'
import { LINK_CATALOG } from '@/config/internalLinks'
import { PRODUCT_HUB_ITEMS, type HubCardItem } from '@/config/navigation'

/**
 * Home — Vitrine de Produtos e Soluções (2ª seção, logo após o Hero).
 *
 * Hierarquia comercial (Bento leve):
 *  1. Protagonista   → Consórcio BC Energia (geração distribuída por assinatura,
 *                      produto central da operação). Fotografia + painel
 *                      translúcido, métrica "Até 25%" e adesão direta.
 *  2. Destaque       → Mercado Livre de Energia (empresas em alta tensão).
 *  3. Complementares → Gestão, Certificação I-REC e Arrendamento.
 *  4. Externo        → Consultoria Jurídica (site BC Energia Direito).
 *
 * Títulos, descrições, ícones e rotas vêm de `PRODUCT_HUB_ITEMS` (mesma fonte do
 * menu e de /produtos). Textos de público, "Até 25%" e a URL de adesão já estão
 * publicados no projeto (Sliders.data, quickAnswers, ProductCard.data e a
 * página do Consórcio). Nenhum produto, número ou critério novo foi criado.
 * O limiar de conta do Consórcio foi omitido de propósito: o site publica
 * R$ 250 e as campanhas usam R$ 300 — aguardando definição comercial.
 */

const FEATURED_HREF = '/produtos/consorcio-bc-energia'
const LEAD_HREF = '/produtos/mercado-livre-de-energia'

/** Mesma URL usada na página /produtos/consorcio-bc-energia. */
const ADHESION_URL = 'https://www.appenergia.com.br/Grupo_BC_Energia/'

const AUDIENCE: Record<string, string> = {
  [FEATURED_HREF]: 'Para residências e comércios em baixa tensão',
  [LEAD_HREF]: 'Para empresas em alta tensão com conta a partir de R$ 10 mil'
}

const byHref = (href: string) => PRODUCT_HUB_ITEMS.find((item) => item.href === href)
const displayTitle = (item: HubCardItem) => LINK_CATALOG[item.href]?.shortLabel ?? item.title

const featured = byHref(FEATURED_HREF)
const lead = byHref(LEAD_HREF)
const complementary = PRODUCT_HUB_ITEMS.filter(
  (item) => !item.external && item.href !== FEATURED_HREF && item.href !== LEAD_HREF
)
const external = PRODUCT_HUB_ITEMS.filter((item) => item.external)

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2'

const ArrowIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" />
  </svg>
)

const Solutions = ({ className = '' }: { className?: string }) => {
  if (!featured) return null

  return (
    <section
      id="home_solucoes"
      data-cta-location="home_solucoes"
      className={`bc-level-lead relative bg-surface-soft lg:py-[72px] ${className}`.trim()}
    >
      <Container className="lg:max-w-[1240px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeader
            eyebrow="Soluções"
            title="Um portfólio para cada perfil de consumo"
            description="Empresas, condomínios e residências: escolha o modelo mais adequado ao seu consumo e à sua conexão."
            level="lead"
            className="max-w-[44rem]"
          />

          <Link
            href="/produtos"
            data-cta-name="home_ver_todas_solucoes"
            className={`group inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start t-action-label text-bc-primary underline-offset-[6px] transition-colors duration-200 ease-bc hover:underline lg:self-end ${FOCUS_RING}`}
          >
            Ver todas as soluções
            <span className="transition-transform duration-200 ease-bc group-hover:translate-x-[3px] motion-reduce:transform-none">
              <ArrowIcon />
            </span>
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-9 lg:grid-cols-12 lg:gap-6">
          {/* 1. Protagonista — fotografia + overlay direcional + painel translúcido.
              Não é um card-link inteiro: tem duas ações (adesão e página). */}
          <Reveal as="article" className="md:col-span-2 lg:col-span-7">
            <div className="relative isolate flex h-full min-h-[34rem] flex-col justify-end overflow-hidden rounded-card bg-surface-dark p-3 shadow-md sm:p-5 md:min-h-[30rem] lg:min-h-[36rem] lg:p-7">
              <img
                src="/img/pages/consorcio-intro.webp"
                srcSet="/img/pages/consorcio-intro-600.webp 600w, /img/pages/consorcio-intro.webp 1600w"
                sizes="(min-width: 1024px) 58vw, 100vw"
                alt=""
                aria-hidden="true"
                width={1600}
                height={1165}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[72%_22%] md:object-[78%_30%]"
              />
              <span aria-hidden="true" className="bc-ovl bc-ovl-solution" />

              <div className="media-panel w-full sm:max-w-[32rem] lg:p-7">
                <p className="t-body-sm font-medium text-bc-cyan">{AUDIENCE[featured.href]}</p>
                <h3 className="t-h2-mid mt-2 text-white">{displayTitle(featured)}</h3>

                <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="t-metric-md text-bc-yellow">Até 25%</span>
                  <span className="t-body-sm font-medium text-white">de economia na conta de energia</span>
                </p>

                <p className="t-body mt-3 max-w-[44ch] text-white/90">{featured.description}</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <Link
                    href={ADHESION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta-name="Fazer adesão gratuita"
                    className={`${buttonStyles({ variant: 'primary', size: 'lg' })} shadow-sm`}
                  >
                    Fazer adesão gratuita
                    <span className="sr-only">(abre em nova aba)</span>
                  </Link>
                  <Link
                    href={featured.href}
                    data-cta-name={`home_solucoes_${featured.title}`}
                    className="group inline-flex min-h-[48px] items-center gap-2 t-action-label text-text-inverse underline-offset-[6px] transition-colors duration-200 ease-bc hover:text-bc-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bc-dark"
                  >
                    Como funciona o Consórcio
                    <span className="transition-transform duration-200 ease-bc group-hover:translate-x-[3px] motion-reduce:transform-none">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2. Destaque — card sólido com fotografia de infraestrutura */}
          {lead ? (
            <Reveal delay={0.05} className="md:col-span-2 lg:col-span-5">
              <Link
                href={lead.href}
                data-cta-name={`home_solucoes_${lead.title}`}
                className={`group flex h-full flex-col overflow-hidden rounded-card border border-border-subtle bg-surface-card shadow-sm transition-[transform,box-shadow,border-color] duration-normal ease-bc hover:-translate-y-0.5 hover:border-bc-primary/30 hover:shadow-md motion-reduce:transform-none md:flex-row lg:flex-col ${FOCUS_RING}`}
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:aspect-auto md:min-h-[16rem] md:w-5/12 lg:aspect-[16/10] lg:min-h-0 lg:w-full">
                  <img
                    src="/img/pages/mercado-livre-subestacao.webp"
                    srcSet="/img/pages/mercado-livre-subestacao-1024.webp 1024w, /img/pages/mercado-livre-subestacao.webp 1600w"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 42vw, 100vw"
                    alt=""
                    aria-hidden="true"
                    width={1600}
                    height={907}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-[60%_center] transition-transform duration-slow ease-bc md:group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="t-body-sm font-medium text-bc-primary">{AUDIENCE[lead.href]}</p>
                  <h3 className="t-h3 mt-2 text-text-primary transition-colors duration-200 group-hover:text-bc-primary">
                    {displayTitle(lead)}
                  </h3>
                  <p className="t-body-sm mt-2 max-w-[42ch] text-text-secondary">{lead.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 t-action-label text-bc-primary">
                    Conhecer o Mercado Livre
                    <span className="transition-transform duration-200 ease-bc group-hover:translate-x-[3px] motion-reduce:transform-none">
                      <ArrowIcon />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ) : null}

          {/* 3. Complementares — cards sólidos, compactos */}
          {complementary.length ? (
            <ul className="grid list-none grid-cols-1 gap-3 md:col-span-2 md:grid-cols-3 md:gap-5 lg:col-span-12 lg:gap-6">
              {complementary.map((item, index) => (
                <Reveal as="li" key={item.href} delay={0.08 + index * 0.04}>
                  <Link
                    href={item.href}
                    data-cta-name={`home_solucoes_${item.title}`}
                    className={`group flex h-full items-start gap-4 rounded-card border border-border-subtle bg-surface-card p-5 shadow-xs transition-[transform,box-shadow,border-color] duration-normal ease-bc hover:-translate-y-0.5 hover:border-bc-primary/30 hover:shadow-sm motion-reduce:transform-none md:flex-col md:gap-3 lg:flex-row lg:gap-4 lg:p-6 ${FOCUS_RING}`}
                  >
                    {item.icon ? <BCIcon name={item.icon} size={36} className="shrink-0" /> : null}
                    <span className="flex min-w-0 flex-1 flex-col">
                      <h3 className="t-h4-display text-text-primary transition-colors duration-200 group-hover:text-bc-primary">
                        {displayTitle(item)}
                      </h3>
                      <span className="t-body-sm mt-1.5 text-text-secondary">{item.description}</span>
                    </span>
                    <span className="mt-1 shrink-0 text-bc-primary/70 transition-[transform,color] duration-200 ease-bc group-hover:translate-x-[3px] group-hover:text-bc-primary motion-reduce:transform-none md:hidden lg:inline-flex">
                      <ArrowIcon />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : null}
        </div>

        {/* 4. Solução externa — link discreto, sem card */}
        {external.map((item) => (
          <p key={item.href} className="t-body-sm mt-6 text-text-secondary lg:mt-7">
            {item.description}{' '}
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-name={`home_solucoes_${item.title}`}
              className={`inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-bc-primary underline underline-offset-4 transition-colors duration-200 hover:text-bc-primary-hover ${FOCUS_RING}`}
            >
              Acessar {item.title}
              <span className="sr-only">(abre em nova aba)</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </p>
        ))}
      </Container>
    </section>
  )
}

export default Solutions
