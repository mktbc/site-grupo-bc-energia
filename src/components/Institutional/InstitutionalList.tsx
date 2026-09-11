import { ReactNode } from 'react'

import { EditorialIndex } from '@/components/Editorial'

import InstitutionalSection, { type InstitutionalSectionTone } from './InstitutionalSection'

export type InstitutionalListItem = {
  title: string
  description: string
}

export type InstitutionalListProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<InstitutionalListItem>
  /** Numeração editorial discreta (01, 02, 03). */
  numbered?: boolean
  /** Coluna única de leitura ou duas colunas no desktop. */
  columns?: 1 | 2 | 3
  tone?: InstitutionalSectionTone
  id?: string
  children?: ReactNode
}

/**
 * Lista editorial institucional (VISUAL 14).
 *
 * Substitui o grid de cards em pilares, iniciativas e frentes de atuação:
 * cabeçalho fixo à esquerda e itens tipográficos separados por filete.
 */
const InstitutionalList = ({
  eyebrow,
  title,
  description,
  items,
  numbered = true,
  columns = 1,
  tone = 'surface',
  id,
  children
}: InstitutionalListProps) => {
  const isDark = tone === 'dark' || tone === 'brand'

  return (
    <InstitutionalSection tone={tone} id={id}>
      <EditorialIndex
        eyebrow={eyebrow}
        title={title}
        description={description}
        className={isDark ? '[&_h2]:text-text-inverse [&_p]:text-text-inverse/75' : ''}
      >
        {children}

        <ul
          className={
            columns === 3
              ? 'grid grid-cols-1 items-start gap-x-9 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10'
              : columns === 2
                ? 'grid grid-cols-1 gap-x-10 sm:grid-cols-2'
                : 'measure-body'
          }
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              className={`border-t ${columns === 3 ? 'pt-4' : 'pt-6'} ${index > 0 && columns === 1 ? 'mt-8' : ''} ${ columns === 2 && index > 1 ? 'mt-8' : '' } ${columns === 2 && index === 1 ? 'sm:mt-0 mt-8' : ''} ${ isDark ? 'border-text-inverse/20' : 'border-border-subtle' }`}
            >
              <h3
                className={`t-h4 ${isDark ? 'text-text-inverse' : 'text-text-primary'}`}
              >
                {item.title}
              </h3>

              <p
                className={`${columns === 3 ? 'mt-2.5 t-body-sm' : 'mt-3 measure-body t-body'} ${ isDark ? 'text-text-inverse/75' : 'text-text-secondary' }`}
              >
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </EditorialIndex>
    </InstitutionalSection>
  )
}

export default InstitutionalList
