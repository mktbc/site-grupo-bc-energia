import { BC_ICONS, BCIconName } from '@/config/icons'

export type BCIconProps = {
  /** Nome semântico do ícone oficial (ver src/config/icons.ts). */
  name: BCIconName
  /** Tamanho em pixels (largura e altura). */
  size?: number
  className?: string
  /**
   * Texto alternativo. Quando informado, o ícone passa a ser significativo
   * para leitores de tela. Sem `label`, é tratado como decorativo.
   */
  label?: string
  priority?: boolean
}

const BCIcon = ({ name, size = 48, className, label, priority }: BCIconProps) => {
  const icon = BC_ICONS[name]

  return (
    <img
      src={icon.src}
      alt={label ?? ''}
      role={label ? 'img' : 'presentation'}
      aria-hidden={label ? undefined : true}
      width={size}
      height={size}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={{ width: size, height: size }}
    />
  )
}

export default BCIcon
