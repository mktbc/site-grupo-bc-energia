import { ReactNode } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

/** Mensagens de sistema (formulários, validações, avisos). */
export const alertStyles = tv({
  base: 'flex w-full items-start gap-3 rounded-md border-l-4 p-4 t-body-sm',
  variants: {
    variant: {
      info: 'border-info bg-info/5 text-text-primary',
      success: 'border-success bg-success/5 text-text-primary',
      warning: 'border-warning bg-warning/5 text-text-primary',
      error: 'border-error bg-error/5 text-text-primary'
    }
  },
  defaultVariants: { variant: 'info' }
})

export type AlertProps = VariantProps<typeof alertStyles> & {
  title?: string
  children?: ReactNode
  className?: string
}

const Alert = ({ variant = 'info', title, children, className = '' }: AlertProps) => (
  <div
    role={variant === 'error' ? 'alert' : 'status'}
    className={`${alertStyles({ variant })} ${className}`.trim()}
  >
    <div>
      {title ? <p className="t-label mb-0.5">{title}</p> : null}
      {children ? <div className="text-text-secondary">{children}</div> : null}
    </div>
  </div>
)

export default Alert
