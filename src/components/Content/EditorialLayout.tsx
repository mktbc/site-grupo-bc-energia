import { ReactNode } from 'react'

import ContentSection, { type ContentSectionTone } from './ContentSection'

export type EditorialLayoutProps = {
  children: ReactNode
  /** Coluna de apoio (ex.: sumário). Lateral no desktop, acima do texto abaixo de lg. */
  aside?: ReactNode
  tone?: ContentSectionTone
  id?: string
  className?: string
}

/**
 * Coluna de leitura editorial (artigo e episódio).
 *
 * Centraliza a decisão de largura de leitura (~72ch) e a hierarquia
 * tipográfica do corpo — nenhum `max-w` arbitrário espalhado por página.
 * Títulos usam Barlow Condensed (t-h*), corpo usa Onest.
 *
 * Com `aside`, a coluna de leitura mantém a mesma largura e ganha uma coluna
 * lateral de 15rem no desktop (sumário sticky). Sem `aside`, nada muda.
 */
const EditorialLayout = ({
  children,
  aside,
  tone = 'surface',
  id,
  className = ''
}: EditorialLayoutProps) => (
  <ContentSection tone={tone} id={id}>
    {aside ? (
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <aside>{aside}</aside>
        <div className={`w-full min-w-0 measure-body ${className}`.trim()}>{children}</div>
      </div>
    ) : (
      <div className={`mx-auto w-full measure-body ${className}`.trim()}>{children}</div>
    )}
  </ContentSection>
)

export default EditorialLayout
