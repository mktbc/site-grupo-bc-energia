import { ReactNode } from 'react'

import Accordion from '@/components/Accordion/Accordion'
import type { AccordionType } from '@/components/Accordion/Accordion.type'
import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection, { type ProductSectionTone } from './ProductSection'

export type ProductFaqProps = {
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  items: Array<AccordionType>
  tone?: ProductSectionTone
  id?: string
  /** Reduz o espaço superior, integrando o FAQ à seção anterior. */
  compactTop?: boolean
  /** Alinhamento do cabeçalho do FAQ. */
  align?: 'left' | 'center'
}

/**
 * FAQ das páginas de produto — mesmo Accordion do Design System
 * (H3 + <button aria-expanded>), sem perguntas fictícias.
 */
const ProductFaq = ({
  eyebrow = 'Perguntas frequentes',
  title = 'Dúvidas mais comuns',
  description,
  items,
  tone = 'muted',
  id = 'faq',
  compactTop = false,
  align = 'center'
}: ProductFaqProps) =>
  items.length === 0 ? null : (
  <ProductSection tone={tone} id={id} flush={compactTop}>
    <div className={compactTop ? 'pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-20 lg:pt-12' : ''}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} align={align} level="support" />

      <div
        className={`mt-5 w-full max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {items.map((item, index) => (
          <Accordion
            key={item.title}
            open={index === 0}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </div>
  </ProductSection>
)

export default ProductFaq
