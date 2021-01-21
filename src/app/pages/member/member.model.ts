import { CorePerson, CorePersonValidationError } from '../../models/core-person.model'
import { RoleChoice, roleChoiceList } from '../../models/choice.model'

export class Member extends CorePerson {
  company: number
  role: RoleChoice

  errors: MemberValidationError

  static createFromJSON(data): Member {
    return Object.assign(new Member(), data)
  }

  roleDisplay(): string {
    return roleChoiceList().find(role => this.role === role.value).name
  }
}

interface MemberValidationError extends CorePersonValidationError {
  company: string[]
  role: string[]
}
