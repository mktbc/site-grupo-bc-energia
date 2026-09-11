import { ProductSection } from '@/components/Product'
import type { ProductSectionProps, ProductSectionTone } from '@/components/Product'

export type SegmentSectionTone = ProductSectionTone
export type SegmentSectionProps = ProductSectionProps

/**
 * Invólucro das seções das páginas de segmento (FRONT-END 12).
 *
 * Reaproveita o mesmo primitivo das páginas de produto para manter container,
 * ritmo vertical e superfícies idênticos, sem duplicar estilos.
 */
const SegmentSection = (props: SegmentSectionProps) => <ProductSection {...props} />

export default SegmentSection
