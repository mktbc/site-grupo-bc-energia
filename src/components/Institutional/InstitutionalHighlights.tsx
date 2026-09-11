import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'
import type { BCIconName } from '@/config/icons'

import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type InstitutionalHighlightItem = {
  /** Mantido por compatibilidade — não é renderizado (VISUAL 14: sem ícone). */
  icon?: BCIconName
  value: string
  label: string
  description?: string
}

export type InstitutionalHighlightsProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  items: Array<InstitutionalHighlightItem>
  tone?: InstitutionalSectionTone
  /** `editorial`: índice 01/02 em teal, sem hairlines longas (VISUAL). */
  variant?: 'default' | 'editorial' | 'system'
  id?: string
}

/**
 * Faixa de prova institucional (VISUAL 14).
 *
 * Sem card, sem ícone e sem borda amarela: os números são o próprio elemento
 * gráfico. Em superfície escura o bloco funciona como prova antes da narrativa.
 * Os valores vêm sempre de fontes já existentes no projeto.
 */
const InstitutionalHighlights = ({
  graphic = { variant: 'radial', tone: 'teal', size: 'medium', position: 'bottom-right', opacity: 0.05 },
  eyebrow,
  title,
  description,
  items,
  tone = 'dark',
  variant = 'default',
  id
}: InstitutionalHighlightsProps) => {
  const isDark = tone === 'dark' || tone === 'brand'

  return (
    <InstitutionalSection graphic={graphic} tone={tone} id={id}>
      {title ? (
        <div
          className={`${isDark ? '[&_h2]:text-text-inverse [&_p]:text-text-inverse/75' : ''} ${ variant === 'system' ? 'measure-title [&_h2]:mt-2 [&_p]:mt-3' : '' }`}
        >
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
      ) : null}

      <dl
        className={
          variant === 'system'
            ? `grid grid-cols-1 items-start gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 ${
                title ? 'mt-9' : ''
              }`
            : variant === 'editorial'
            ? `grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 ${title ? 'mt-8' : ''}`
            : `grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ${
                items.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
              } ${title ? 'mt-7' : ''}`
        }
      >
        {items.map((item, index) =>
          variant === 'system' ? (
            <div
              key={item.label}
              className={`border-t pt-5 ${isDark ? 'border-text-inverse/20' : 'border-border-subtle'}`}
            >
              <dt
                className={`t-metric-lg ${ index === 0 ? isDark ? 'text-bc-accent' : 'text-bc-primary' : isDark ? 'text-text-inverse' : 'text-bc-primary' }`}
              >
                {item.value}
              </dt>
              <dd className="mt-2">
                <span
                  className={`block t-body-sm font-semibold ${ isDark ? 'text-text-inverse' : 'text-text-primary' }`}
                >
                  {item.label}
                </span>
                {item.description ? (
                  <span
                    className={`mt-1.5 block max-w-[34ch] t-body-sm ${ isDark ? 'text-text-inverse/70' : 'text-text-secondary' }`}
                  >
                    {item.description}
                  </span>
                ) : null}
              </dd>
            </div>
          ) : variant === 'editorial' ? (
            <div key={item.label}>
              <dt
                className={`mt-3 t-metric-lg ${ isDark ? 'text-bc-accent' : 'text-bc-primary' }`}
              >
                {item.value}
              </dt>
              <dd
                className={`mt-2 max-w-[30ch] t-body-sm ${ isDark ? 'text-text-inverse/70' : 'text-text-secondary' }`}
              >
                {item.label}
                {item.description ? <span className="mt-1 block">{item.description}</span> : null}
              </dd>
            </div>
          ) : (
          <div
            key={item.label}
            className={`border-t pt-5 ${isDark ? 'border-text-inverse/20' : 'border-border-subtle'}`}
          >
            <dt
              className={`t-metric-lg ${ isDark ? 'text-bc-accent' : 'text-bc-primary' }`}
            >
              {item.value}
            </dt>
            <dd
              className={`mt-3 t-body-sm ${ isDark ? 'text-text-inverse/70' : 'text-text-secondary' }`}
            >
              <span
                className={`block font-semibold ${ isDark ? 'text-text-inverse' : 'text-text-primary' }`}
              >
                {item.label}
              </span>
              {item.description ? <span className="mt-1 block">{item.description}</span> : null}
            </dd>
          </div>
          )
        )}
      </dl>
    </InstitutionalSection>

  )
}

export default InstitutionalHighlights
