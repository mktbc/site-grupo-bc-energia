import { ProductSection } from '@/components/Product'
import type { ProductSectionProps, ProductSectionTone } from '@/components/Product'

export type InstitutionalSectionTone = ProductSectionTone
export type InstitutionalSectionProps = ProductSectionProps

/**
 * Invólucro das seções institucionais (FRONT-END 13).
 *
 * Reaproveita o primitivo das páginas de produto/segmento: mesmo container
 * (1200px), mesmo ritmo vertical e apenas três superfícies possíveis.
 */
const InstitutionalSection = (props: InstitutionalSectionProps) => <ProductSection {...props} />

export default InstitutionalSection
