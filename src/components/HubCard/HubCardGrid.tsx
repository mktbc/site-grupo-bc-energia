import { HubCardGridProps } from './HubCard.type'

/**
 * Grid responsivo dos hubs: 1 coluna (mobile) → 2 (tablet) → 2/3 (desktop).
 * O `data-cta-location` é lido pela delegação central de tracking, marcando
 * todos os cliques de card como `hub_navigation`.
 */
const HubCardGrid = ({ children, className, columns = 3 }: HubCardGridProps) => (
  <div
    data-cta-location="hub_navigation"
    className={[
      'grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:gap-8',
      columns === 3 ? 'lg:grid-cols-3' : 'mx-auto max-w-4xl',
      className ?? ''
    ].join(' ')}
  >
    {children}
  </div>
)

export default HubCardGrid
