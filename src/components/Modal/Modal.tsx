import { ReactNode, useCallback, useEffect, useRef } from 'react'

export type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  /** Ações do rodapé (botões). */
  footer?: ReactNode
  className?: string
}

/**
 * Modal base do Design System.
 * - overlay escuro com blur discreto
 * - foco preso no container, ESC fecha, scroll do body bloqueado
 * - full-height em mobile, card centralizado a partir de sm
 * Não altera fluxos de negócio — é apenas a casca padronizada.
 */
const Modal = ({ open, onClose, title, children, footer, className = '' }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-bc-dark/60"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative flex max-h-[90vh] w-full max-w-[36rem] flex-col overflow-hidden rounded-t-xl bg-surface shadow-lg outline-none sm:rounded-xl ${className}`.trim()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-6 py-4">
          <h2 className="t-h4 text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="bc-focus-ring -mr-2 rounded-md px-2 py-1 t-h4 text-text-secondary hover:text-text-primary"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 text-text-secondary">{children}</div>
        {footer ? (
          <div className="flex flex-wrap justify-end gap-3 border-t border-border-subtle px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Modal
