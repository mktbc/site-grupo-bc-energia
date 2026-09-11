import { ReactNode } from 'react'

export type Children = {
  children: string | ReactNode
}

export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected'
}
