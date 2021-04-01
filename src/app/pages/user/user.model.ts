import { isAdmin } from '../../models/choice.model'
import { Member } from '../../pages/member/member.model'

export class User {
  id: number
  email: string
  password?: string
  name: string
  photo: string
  is_superuser: boolean
  person: Member

  errors: UserValidationError

  constructor(props?: Partial<User>) {
    Object.assign(this, props)
  }

  isAdmin(): boolean {
    return this.is_superuser || isAdmin(this.person?.role)
  }

  getPayload() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      person_id: this.person?.id
    }
  }
}

interface UserValidationError {
  email?: string[]
  name?: string[]
  password?: string[]
  person_id?: string[]
}
