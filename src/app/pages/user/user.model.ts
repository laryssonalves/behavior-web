import { isAdmin } from '../../models/choice.model'
import { Member } from '../../pages/member/member.model'

export class User {
  id: number
  email: string
  name: string
  photo: string
  is_superuser: boolean
  person: Member

  constructor(props?: Partial<User>) {
    Object.assign(this, props)
  }

  isAdmin(): boolean {
    return this.is_superuser || isAdmin(this.person?.role)
  }
}
