export class CorePerson {
  id: number
  document: string
  name: string
  email: string
  phone: string
  postal_code: string
  state: string
  city: string
  district: string
  street: string
  number: string
  complement: string

  errors: CorePersonValidationError
}

export interface CorePersonValidationError {
  document: string[]
  name: string[]
  email: string[]
  phone: string[]
  postal_code: string[]
  state: string[]
  city: string[]
  district: string[]
  street: string[]
  number: string[]
  complement: string[]
}
