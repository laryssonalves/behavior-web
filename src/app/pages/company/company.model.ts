import { CorePerson, CorePersonValidationError } from '../../models/core-person.model'

export class Company extends CorePerson {
  responsible_name: string
  responsible_email: string
  responsible_phone: string

  errors: CompanyValidationError

  static createFromJSON(data): Company {
    return Object.assign(new Company(), data)
  }
}

interface CompanyValidationError extends CorePersonValidationError {
  responsible_name: []
  responsible_email: []
  responsible_phone: []
}
