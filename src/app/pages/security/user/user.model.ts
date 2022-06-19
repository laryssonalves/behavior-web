import { isAdmin } from '../../../models/choice.model'
import { Member } from '../../../pages/member/member.model'
import { Group } from '../group/group.model'
import { Permission } from '../interfaces/permission'

export class User {
  id: number
  email: string
  password?: string
  name: string
  photo: string
  person: Member
  group_role: Group
  group_role_id: number
  permissions: Permission[]

  errors: UserValidationError

  constructor(props?: Partial<User>) {
    Object.assign(this, props)
  }

  hasPerms(codenames: string[]): boolean {
    return !!this.permissions.filter(perm => codenames.includes(perm.codename)).length
  }

  getPayload() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      person_id: this.person?.id,
      group_role_id: this.group_role_id
    }
  }
}

interface UserValidationError {
  email?: string[]
  name?: string[]
  password?: string[]
  person_id?: string[]
  group_role_id?: string[]
}
