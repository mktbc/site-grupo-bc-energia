import { useCallback, useMemo, useState } from 'react'

import { Container, SectionHeader } from '@/components'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'
import { HOME_SEGMENT_ITEMS } from '@/config/navigation'

/**
 * Home — "Segmentos atendidos".
 *
 * Composição editorial: um segmento protagonista (imagem real + overlay) à
 * esquerda e uma lista tipográfica dos demais à direita. Nenhuma lista paralela
 * de rotas é criada aqui — os dados estruturais (título, rota, ícone) vêm de
 * `HOME_SEGMENT_ITEMS`. As descrições abaixo são camada editorial da Home.
 */

/** Copy editorial da vitrine da Home, por rota (não altera a fonte de dados). */
const HOME_SEGMENT_COPY: Record<string, string> = {
  '/segmentos/agronegocio':
    'Energia para fazendas e agroindústrias com foco em previsibilidade e redução de custos.',
  '/segmentos/condominio': 'Alternativas para reduzir custos e melhorar a eficiência do condomínio.',
  '/segmentos/saude': 'Previsibilidade e estabilidade para operações essenciais.',
  '/segmentos/varejo': 'Estratégias para reduzir o peso da energia na operação de lojas e redes.',
  '/segmentos/servico': 'Eficiência e melhor gestão de custos para empresas de serviços.',
  '/segmentos/residencial': 'Economia e mais controle sobre a conta de energia em casa.'
}

/** Imagens reais já existentes no projeto, por rota. */
const HOME_SEGMENT_IMAGE: Record<string, string> = {
  '/segmentos/agronegocio': '/img/pages/segmentos/agronegocio.webp',
  '/segmentos/condominio': '/img/pages/segmentos/condominio-v2.webp',
  '/segmentos/saude': '/img/pages/segmentos/saude.webp',
  '/segmentos/varejo': '/img/pages/segmentos/varejo.webp',
  '/segmentos/servico': '/img/pages/segmentos/servico.webp',
  '/segmentos/residencial': '/img/pages/segmentos/residencial.webp'
}

/** Protagonista padrão da composição (mesma prioridade da configuração atual). */
const FEATURED_SEGMENT = '/segmentos/agronegocio'

const Segments = ({ className = '' }: { className?: string }) => {
  const items = HOME_SEGMENT_ITEMS
  const featured = useMemo(
    () => items.find((item) => item.href === FEATURED_SEGMENT) ?? items[0],
    [items]
  )
  const rest = useMemo(
    () => items.filter((item) => item.href !== featured?.href),
    [items, featured]
  )

  const [activeHref, setActiveHref] = useState<string | undefined>(featured?.href)
  /** Imagens já montadas — evita baixar as 6 de uma vez. */
  const [mounted, setMounted] = useState<Array<string>>(featured ? [featured.href] : [])
  /**
   * Pré-visualização por hover/foco: nenhum listener de resize é necessário —
   * `hover`/`focus` só ocorrem em dispositivos com ponteiro ou navegação por
   * teclado, o que já restringe o comportamento sem JavaScript de breakpoint.
   */
  const preview = useCallback((href: string) => {
    setActiveHref(href)
    setMounted((prev) => (prev.includes(href) ? prev : [...prev, href]))
  }, [])

  const reset = useCallback(() => {
    setActiveHref(featured?.href)
  }, [featured])

  const active = items.find((item) => item.href === activeHref) ?? featured

  if (!featured || !active) return null

  return (
    <section id="home_segmentos" className={`bc-level-lead bg-surface-soft ${className}`.trim()}>
      <Container className="lg:max-w-[1240px]">
        <Reveal>
          <SectionHeader
            eyebrow="Atuação multissegmento"
            title="Cada negócio consome energia de um jeito diferente"
            description="Por isso, analisamos o perfil de cada operação para indicar soluções mais adequadas à realidade de consumo."
          />
        </Reveal>

        <div
          data-cta-location="hub_navigation"
          className="mt-8 grid grid-cols-1 gap-7 lg:mt-7 lg:grid-cols-12 lg:gap-9"
        >
          {/* Protagonista — imagem real + overlay editorial */}
          <Reveal className="lg:col-span-5">
            <Link
              href={active.href}
              aria-label={`Ver soluções para o segmento ${active.title}`}
              data-cta-name={`home_segmentos_destaque_${active.title}`}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border border-bc-dark/15 bg-surface-dark p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-normal ease-bc hover:-translate-y-0.5 hover:border-bc-primary/45 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 md:aspect-[4/3] md:p-7 lg:aspect-square lg:p-8 xl:aspect-[4/3] xl:p-8 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {items
                .filter((item) => mounted.includes(item.href))
                .map((item) => (
                  <Image
                    key={item.href}
                    src={HOME_SEGMENT_IMAGE[item.href]}
                    alt=""
                    aria-hidden="true"
                    fill
                    loading="lazy"
                    className={[
                      'absolute inset-0 z-0 h-full w-full object-cover object-[center_38%] transition-[opacity,transform] duration-500 ease-bc group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none md:object-[center_42%] lg:object-center',
                      item.href === active.href ? 'opacity-100' : 'opacity-0'
                    ].join(' ')}
                  />
                ))}

              <span aria-hidden="true" className="bc-ovl bc-ovl-segment" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-6 left-6 z-[2] h-1 w-16 rounded-full bg-bc-cyan/80 transition-[width,background-color] duration-200 ease-bc group-hover:w-24 group-hover:bg-bc-yellow motion-reduce:transition-none sm:left-7 lg:bottom-7 lg:left-8" />

              <span className="bc-panel-glass flex max-w-full flex-col items-start">
                <span className="t-eyebrow tracking-[0.18em] !text-bc-cyan">
                  Segmento em destaque
                </span>

                <span className="t-h3 mt-2 text-white opacity-100">
                  {active.title}
                </span>

                <span className="mt-3 max-w-[34rem] t-body-sm text-white">
                  {HOME_SEGMENT_COPY[active.href]}
                </span>

                <span className="mt-5 inline-flex items-center gap-2 t-action-label text-bc-yellow sm:mt-6">
                  Conhecer segmento
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    →
                  </span>
                </span>
              </span>
            </Link>
          </Reveal>

          {/* Lista editorial dos demais segmentos */}
          <Reveal delay={0.05} className="lg:col-span-7 lg:pl-2">
            <ul className="grid grid-cols-1 gap-x-5 md:grid-cols-2 md:gap-y-1 xl:gap-x-7">
              {rest.map((item) => (
                <li key={item.href} className="group/item">
                  <Link
                    href={item.href}
                    aria-label={`Ver soluções para o segmento ${item.title}`}
                    data-cta-name={`home_segmentos_${item.title}`}
                    onMouseEnter={() => preview(item.href)}
                    onMouseLeave={reset}
                    onFocus={() => preview(item.href)}
                    onBlur={reset}
                    className={`group relative mb-4 flex min-h-[7.75rem] items-start gap-3 rounded-card border border-border-subtle bg-surface-card p-4 shadow-xs transition-[background-color,transform,border-color,box-shadow] duration-200 ease-bc hover:-translate-y-0.5 hover:border-bc-primary/30 hover:shadow-sm focus-visible:-translate-y-0.5 focus-visible:border-bc-primary/30 focus-visible:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transform-none motion-reduce:transition-none ${active.href === item.href ? 'border-bc-primary/45 bg-surface-highlight' : ''}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-4 left-0 top-4 w-0.5 rounded-full bg-gradient-to-b from-bc-primary to-bc-cyan transition-opacity duration-200 motion-reduce:transition-none ${active.href === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70'}`}
                    />
                    {item.iconSrc ? (
                      <Image
                        src={item.iconSrc}
                        alt=""
                        aria-hidden="true"
                        width={26}
                        height={26}
                        className="mt-0.5 shrink-0 opacity-75 transition-[opacity,transform] duration-200 group-hover:scale-105 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    ) : null}

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-4">
                        <span className={`t-h4-display transition-colors duration-200 group-hover:text-bc-primary group-focus-visible:text-bc-primary motion-reduce:transition-none ${active.href === item.href ? 'font-semibold text-bc-primary' : 'text-bc-dark'}`}>
                          {item.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-bc-primary transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                        >
                          →
                        </span>
                      </span>
                      <span className="mt-1 block t-body-sm text-text-secondary">
                        {HOME_SEGMENT_COPY[item.href]}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex lg:justify-end">
              <Link
                href="/segmentos"
                data-cta-name="home_ver_todos_segmentos"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-2 t-action-label text-bc-primary transition-colors duration-200 hover:text-bc-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none"
              >
                Explorar todos os segmentos
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default Segments
