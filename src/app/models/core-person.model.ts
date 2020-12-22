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
  document: []
  name: []
  email: []
  phone: []
  postal_code: []
  state: []
  city: []
  district: []
  street: []
  number: []
  complement: []
}
