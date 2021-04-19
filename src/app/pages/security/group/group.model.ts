import { RoleChoice } from '../../../models/choice.model'

export class Group {
  id: number
  parent_group: number
  role: RoleChoice
  name: string
  permissions: string[]

  errors: GroupValidationError

  constructor(props?: Partial<Group>) {
    Object.assign(this, props)
  }

  getPayload() {
    return {
      id: this.id,
      role: this.role,
      permissions: this.permissions
    }
  }
}

interface GroupValidationError {
  role?: string[]
  permissions: string[]
}
