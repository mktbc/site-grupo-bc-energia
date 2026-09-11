import { InputHTMLAttributes, ReactElement } from 'react'

import { RequestStatus } from '@/components/Form/Form.type'

export type Fields = InputHTMLAttributes<unknown> & {
  name:
    | 'name'
    | 'email'
    | 'phone'
    | 'enterprise'
    | 'segment'
    | 'city'
    | 'state'
    | 'valueOfTheLastEnergyBill'
  configuration?: {
    columns: number
  }
  label?: string | ReactElement
  description?: string | ReactElement
  options?: Array<{ label: string; value: string }>
}

export type InputProps = Fields & {
  status?: RequestStatus
}
