export type FormData = {
  name: string
  email: string
  phone: string
  genre: string
  ageGroup: string
  enterprise: string
  office: string
  city: string
  state: string
  terms: string
}

export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected'
}
