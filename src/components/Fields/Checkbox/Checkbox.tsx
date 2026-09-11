import { RequestStatus } from '@/components/Form/Form.type'

import { InputProps } from '../Fields.type'
import { checkboxStyles, checkboxsWrapStyles } from './Checkbox.style'

const Checkbox = ({
  status,
  label,
  description,
  configuration,
  options,
  ...rest
}: InputProps) => (
  <div
    style={{ gridColumn: configuration?.columns === 1 ? '1 / -1' : '' }}
    className={checkboxsWrapStyles()}
  >
    <input
      {...rest}
      disabled={status === RequestStatus.Pending}
      id={rest.name}
      aria-describedby={description ? `${rest.name}-description` : undefined}
      className={checkboxStyles()}
      placeholder={rest.placeholder}
      required={rest.required || undefined}
    />
    <div>
      {label && (
        <label htmlFor={rest.name} className="cursor-pointer">
          {label}
        </label>
      )}
      {description && (
        <div id={`${rest.name}-description`} className="t-body-sm text-text-secondary">
          {description}
        </div>
      )}
    </div>
  </div>
)

export default Checkbox
