import Image from '@/components/Image'

import { FeaturesProps } from './Features.type'

/**
 * Item de destaque de produto.
 *
 * Índices puramente decorativos (01, 02, 03) não são exibidos: no lugar
 * entra uma marca visual discreta da marca. Ícones reais continuam.
 */
const isDecorativeIndex = (icon: FeaturesProps['icon']) =>
  typeof icon === 'string' && /^\d{1,2}$/.test(icon.trim())

const Features = ({ ...feature }: FeaturesProps) => (
  <div className="flex items-start gap-5">
    {typeof feature.icon === 'object' ? (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-surface-highlight">
        <Image
          className="mx-auto"
          src={feature.icon.url}
          alt=""
          width={feature.icon.size[0]}
          height={feature.icon.size[0]}
        />
      </span>
    ) : isDecorativeIndex(feature.icon) ? (
      <span
        aria-hidden="true"
        className="mt-2 h-[3px] w-10 shrink-0 rounded-full bg-bc-primary"
      />
    ) : (
      <span className="t-h3-editorial shrink-0 text-bc-primary">{feature.icon}</span>
    )}
    <h3 className="t-h4-display text-text-primary">{feature.title}</h3>
  </div>
)

export default Features
