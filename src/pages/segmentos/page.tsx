import SegmentsFinalCta from './SegmentsFinalCta'
import SegmentsHero from './SegmentsHero'
import SegmentsIndex from './SegmentsIndex'
import SegmentsProof from './SegmentsProof'
import SegmentsShowcase from './SegmentsShowcase'
import SegmentsSolutions from './SegmentsSolutions'

/**
 * Hub /segmentos em cinco momentos:
 * hero → vitrine → índice completo → prova + soluções → CTA final.
 */
const Page = () => (
  <div className="min-h-screen">
    <SegmentsHero />

    <SegmentsShowcase />

    <SegmentsIndex />

    <SegmentsProof />

    <SegmentsSolutions />

    <SegmentsFinalCta />
  </div>
)

export default Page
