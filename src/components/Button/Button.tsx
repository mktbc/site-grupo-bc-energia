import { buttonStyles } from '@/components/Button/Button.style'

import { ButtonProps } from './Button.type'

const Button = ({
  children,
  variant,
  outline,
  block,
  size = 'md',
  className,
  disabled,
  loading,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading

  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`${buttonStyles({ variant, outline, block, size, loading, disabled: isDisabled })} ${className ?? ''}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}

export default Button
