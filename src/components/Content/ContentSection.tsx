import { ProductSection } from '@/components/Product'
import type { ProductSectionProps, ProductSectionTone } from '@/components/Product'

export type ContentSectionTone = ProductSectionTone
export type ContentSectionProps = ProductSectionProps

/**
 * Invólucro das seções editoriais (FRONT-END 16).
 *
 * Reaproveita o primitivo já usado por produto, segmento e institucional:
 * mesmo container (1200px), mesmo ritmo vertical e apenas três superfícies.
 * Nenhuma "cor por seção editorial".
 */
const ContentSection = (props: ContentSectionProps) => <ProductSection {...props} />

export default ContentSection
