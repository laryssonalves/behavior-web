import { CorePerson, CorePersonValidationError } from '../../models/core-person.model'
import { RoleChoice, roleChoiceList } from '../../models/choice.model'

export class Member extends CorePerson {
  company: number
  role: RoleChoice

  errors: MemberValidationError

  roleDisplay(): string {
    return roleChoiceList().find(role => this.role === role.value).name
  }

  static createFromJSON(data): Member {
    return Object.assign(new Member(), data)
  }
}

interface MemberValidationError extends CorePersonValidationError {
  company: string[]
  role: string[]
}
