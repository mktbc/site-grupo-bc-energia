import { ReactNode } from 'react'

import { EditorialIndex } from '@/components/Editorial'

import ProductSection, { type ProductSectionTone } from './ProductSection'

export type ProductPoint = {
  title: string
  description?: string
}

export type ProductPointsProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<ProductPoint>
  tone?: ProductSectionTone
  id?: string
  /** Colunas da lista secundária no desktop. */
  columns?: 1 | 2
}

/**
 * VISUAL 11 — benefícios/detalhes como lista editorial.
 *
 * Um ponto protagonista (tipografia maior) + demais em linhas com hairline.
 * Sem cards, sem sombra, sem ícone — o peso está no texto.
 */
const ProductPoints = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'surface',
  id,
  columns = 2
}: ProductPointsProps) => {
  const [lead, ...rest] = items

  return (
    <ProductSection tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>
        <div>
          {lead ? (
            <div className="border-t border-border-strong pt-4">
              <h3 className="t-h3 text-text-primary">{lead.title}</h3>
              {lead.description ? (
                <p className="mt-1.5 max-w-[46rem] t-body text-text-secondary">
                  {lead.description}
                </p>
              ) : null}
            </div>
          ) : null}

          {rest.length ? (
            <ul
              className={`mt-5 grid grid-cols-1 gap-x-10 ${columns === 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}
            >
              {rest.map((item) => (
                <li key={item.title} className="border-t border-border-subtle py-4">
                  <h3 className="t-h4 text-text-primary">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-1.5 t-body-sm text-text-secondary">
                      {item.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </EditorialIndex>
    </ProductSection>
  )
}

export default ProductPoints
