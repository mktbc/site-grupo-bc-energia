import Link from '@/components/Link'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { PRODUCT_HUB_ITEMS } from '@/config/navigation'


import SegmentSection, { type SegmentSectionTone } from './SegmentSection'

export type SegmentSolutionsProps = {
  eyebrow?: string
  title: string
  description?: string
  /** Parágrafos da ponte desafio → solução (conteúdo já publicado). */
  paragraphs?: Array<string>
  /** Hrefs do portfólio — nome, descrição e ícone vêm de PRODUCT_HUB_ITEMS. */
  hrefs: Array<string>
  /** Slug do segmento, usado apenas no rótulo de tracking. */
  segmentSlug?: string
  tone?: SegmentSectionTone
  id?: string
}

/**
 * Composição única: contexto ("Como ajudamos", 5/12) + solução principal em
 * destaque (7/12) e soluções complementares logo abaixo, claramente secundárias.
 * Fonte única: `PRODUCT_HUB_ITEMS`.
 */
const SegmentSolutions = ({
  eyebrow,
  title,
  description,
  paragraphs,
  hrefs,
  segmentSlug,
  tone = 'surface',
  id
}: SegmentSolutionsProps) => {
  const items = hrefs
    .map((href) => PRODUCT_HUB_ITEMS.find((item) => item.href === href))
    .filter((item): item is (typeof PRODUCT_HUB_ITEMS)[number] => Boolean(item))

  if (!items.length) return null
  const [lead, ...rest] = items

  return (
    <SegmentSection tone={tone} id={id}>
      <div className="grid grid-cols-1 items-start gap-y-8 lg:grid-cols-12 lg:gap-x-11">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow={eyebrow} title={title} variant="compact" level="mid" />
          {description ? (
            <p className="mt-3 t-body text-text-secondary">
              {description}
            </p>
          ) : null}
          {paragraphs?.length ? (
            <div className="mt-3 flex flex-col gap-3">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="t-body text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="border-l-2 border-bc-primary pl-5 lg:pl-7">
            <p className="t-eyebrow text-bc-primary">Solução indicada</p>
            <h3 className="t-h3 mt-2 text-text-primary">{lead.title}</h3>
            {lead.description ? (
              <p className="mt-3 max-w-[46rem] t-body-lg text-text-secondary">
                {lead.description}
              </p>
            ) : null}
            <Link
              href={lead.href}
              data-cta-name={lead.title}
              data-cta-location="segment_solution"
              data-tracking-label={`segmento_${segmentSlug ?? 'geral'}_${lead.title}`}
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              Ver a solução
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {rest.length ? (
            <ul className="mt-7 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-10">
              {rest.map((item) => (
                <li key={item.href}>
                  <h3 className="t-h4 text-text-primary">
                    <Link
                      href={item.href}
                      data-cta-name={item.title}
                      data-cta-location="segment_solution"
                      data-tracking-label={`segmento_${segmentSlug ?? 'geral'}_${item.title}`}
                      className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-bc-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                    >
                      {item.title}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </h3>
                  {item.description ? (
                    <p className="mt-1 t-body-sm leading-[1.65] text-text-secondary/80">
                      {item.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </SegmentSection>
  )
}


export default SegmentSolutions
