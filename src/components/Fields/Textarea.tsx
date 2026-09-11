import { TextareaHTMLAttributes } from 'react'

import { RequestStatus } from '@/components/Form/Form.type'

import { styles } from './Fields.style'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label?: string
  description?: string
  status?: RequestStatus
  /** Ocupa a linha inteira do grid do formulário. */
  fullWidth?: boolean
}

const Textarea = ({
  status,
  label,
  description,
  fullWidth = true,
  rows = 4,
  ...rest
}: TextareaProps) => (
  <div style={{ gridColumn: fullWidth ? '1 / -1' : '' }}>
    <label htmlFor={rest.name} className={styles.label}>
      {label || rest.placeholder}
      {rest.required && <span aria-hidden="true"> *</span>}
    </label>
    <textarea
      {...rest}
      rows={rows}
      id={rest.name}
      aria-describedby={description ? `${rest.name}-description` : undefined}
      disabled={rest.disabled || status === RequestStatus.Pending}
      className={styles.textarea}
      required={rest.required || undefined}
    />
    {description && (
      <p id={`${rest.name}-description`} className={styles.description}>
        {description}
      </p>
    )}
  </div>
)

export default Textarea
