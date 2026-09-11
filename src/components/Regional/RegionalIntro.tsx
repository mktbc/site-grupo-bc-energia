import Link from '@/components/Link'
import SectionHeader from '@/components/SectionHeader/SectionHeader'

import RegionalSection, { type RegionalSectionTone } from './RegionalSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type RegionalIntroProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: string
  paragraphs: Array<string>
  /**
   * Bloco territorial — composição tipográfica com informações verificáveis
   * (nome do lugar, UF, escopo da página). Nenhum mapa artificial é criado e
   * nenhuma informação local é gerada aqui.
   */
  territory?: {
    place: string
    uf: string
    facts?: Array<{ label: string; value: string }>
    link?: { label: string; href: string }
  }
  tone?: RegionalSectionTone
  id?: string
}

/**
 * VISUAL 13 — contexto territorial como protagonista da página regional.
 *
 * Desktop: texto 7/12 + bloco territorial 5/12.
 * Mobile: o contexto textual sempre vem antes do apoio visual (ordem do DOM).
 * Todo o conteúdo vem de `src/data/regions`.
 */
const RegionalIntro = ({
  graphic = { variant: 'loops', tone: 'teal', size: 'medium', position: 'right', opacity: 0.05 },
  eyebrow,
  title,
  paragraphs,
  territory,
  tone = 'surface',
  id
}: RegionalIntroProps) => (
  <RegionalSection graphic={graphic} tone={tone} id={id}>
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className={territory ? 'lg:col-span-7' : 'lg:col-span-9'}>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-5 flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="max-w-[46rem] t-body-lg text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {territory ? (
        <div className="rounded-card bg-surface-muted p-6 lg:col-span-5 lg:self-start lg:p-7">
          <div>
            <p
              className="t-h2-lead text-text-primary"
              aria-hidden="true"
            >
              {territory.place}
            </p>
            <p className="mt-2 t-label uppercase tracking-[0.22em] text-bc-primary">
              {territory.uf}
            </p>
          </div>

          {territory.facts?.length ? (
            <dl className="mt-5 flex flex-col gap-4">
              {territory.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="t-eyebrow text-bc-primary">{fact.label}</dt>
                  <dd className="mt-1 t-body-sm text-text-primary">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {territory.link ? (
            <Link
              href={territory.link.href}
              className="bc-focus-ring mt-5 inline-flex min-h-[44px] items-center gap-2 t-action-label text-bc-primary underline-offset-4 hover:underline"
            >
              {territory.link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  </RegionalSection>
)

export default RegionalIntro
