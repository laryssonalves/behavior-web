import { RoleChoice } from '../../../models/choice.model'

export class Group {
  id: number
  group: number
  role: RoleChoice
  name: string
  permissions: []

  errors: GroupValidationError

  constructor(props?: Partial<Group>) {
    Object.assign(this, props)
  }
}

interface GroupValidationError {
  role?: string[]
}
