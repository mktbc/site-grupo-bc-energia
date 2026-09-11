import { ReactNode, useEffect, useState } from 'react'

import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'

export type InstitutionalProseTocItem = {
  /** Id real de um heading existente na página. */
  id: string
  label: string
}

export type InstitutionalProseProps = {
  children: ReactNode
  /** Coluna de leitura confortável para conteúdo legal/editorial longo. */
  width?: 'reading' | 'wide'
  tone?: InstitutionalSectionTone
  id?: string
  className?: string
  /** Índice de seções — apenas headings que já existem no conteúdo. */
  toc?: Array<InstitutionalProseTocItem>
  tocTitle?: string
  /** Posiciona o índice à esquerda do conteúdo no desktop. */
  tocPosition?: 'left' | 'right'
}

const proseClasses = [
  'text-left t-body-lg text-text-secondary',
  '[&_h2]:t-h3 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:text-text-primary [&_h2:first-child]:mt-0',
  '[&_h3]:t-h4 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-28 [&_h3]:text-text-primary',
  '[&_p]:mt-4 [&_p:first-child]:mt-0',
  '[&_strong]:text-text-primary',
  '[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-2',
  '[&_a]:font-medium [&_a]:text-bc-primary [&_a]:underline [&_a]:underline-offset-4'
].join(' ')

/** Observa os headings do índice e devolve o id da seção ativa. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids.join('|')])

  return active
}

/**
 * Coluna de leitura para conteúdo institucional/legal longo (VISUAL 14).
 *
 * Nunca centraliza o texto: controla largura (~65–75 caracteres), hierarquia e
 * respiro. Com `toc`, exibe um índice fixo no desktop e uma lista de âncoras no
 * topo do mobile — sempre apontando para headings que já existem no conteúdo.
 */
const InstitutionalProse = ({
  children,
  width = 'reading',
  tone = 'surface',
  id,
  className = '',
  toc,
  tocTitle = 'Nesta página',
  tocPosition = 'right'
}: InstitutionalProseProps) => {
  const widthClass = width === 'reading' ? 'measure-body' : 'measure-body'
  const active = useActiveSection(toc?.map((item) => item.id) ?? [])

  const body = (
    <div className={[widthClass, proseClasses, className].filter(Boolean).join(' ')}>{children}</div>
  )

  if (!toc?.length) {
    return (
      <InstitutionalSection tone={tone} id={id}>
        {body}
      </InstitutionalSection>
    )
  }

  const nav = (
    <nav aria-label={tocTitle}>
      <p className="t-eyebrow text-bc-primary">{tocTitle}</p>
      <ol className="mt-3 flex flex-col lg:border-l lg:border-border-subtle">
        {toc.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'flex min-h-[40px] items-center py-1.5 t-body-sm underline-offset-4 transition-colors duration-200',
                  'lg:-ml-px lg:border-l-2 lg:pl-4',
                  isActive
                    ? 'text-bc-primary lg:border-bc-primary'
                    : 'text-text-secondary hover:text-bc-primary lg:border-transparent',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2'
                ].join(' ')}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )

  const isLeft = tocPosition === 'left'

  return (
    <InstitutionalSection tone={tone} id={id}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
        <div className={['lg:col-span-4 xl:col-span-3', isLeft ? 'lg:order-1' : 'lg:order-2'].join(' ')}>
          <div className="rounded-card border border-border-subtle bg-surface-muted p-5 lg:sticky lg:top-28 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
            {nav}
          </div>
        </div>

        <div className={['lg:col-span-8 xl:col-span-9', isLeft ? 'lg:order-2' : 'lg:order-1'].join(' ')}>
          {body}
        </div>
      </div>
    </InstitutionalSection>
  )
}

export default InstitutionalProse

