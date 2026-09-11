import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

export type EditorialIndexProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  /** Conteúdo do cluster (lista, índice, grid de benefícios...). */
  children: ReactNode
  className?: string
}

/**
 * VISUAL SYSTEM 06 — cluster único: cabeçalho em largura útil no topo e
 * conteúdo relacionado imediatamente abaixo.
 *
 * Substitui o padrão "header isolado em 4/12 + lista distante em 8/12", que
 * fragmentava a leitura e criava colunas vazias.
 */
const EditorialIndex = ({
  eyebrow,
  title,
  description,
  as,
  children,
  className = ''
}: EditorialIndexProps) => (
  <div className={className}>
    <SectionHeader eyebrow={eyebrow} title={title} description={description} as={as} />
    <div className="mt-7 lg:mt-8">{children}</div>
  </div>
)

export default EditorialIndex
