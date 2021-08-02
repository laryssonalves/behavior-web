import CoreModel from '../../../../models/core-model.model'
import { RoleChoice, roleChoiceList } from '../../../../models/choice.model'
import { Member } from '../../../member/member.model'
import { Student } from '../../student.model'

export class StudentMember extends CoreModel {
  id: number
  student: Student
  member: Member
  role: RoleChoice

  errors: StudentMemberValidationError

  constructor(data?: Partial<StudentMember>) {
    super()
    const member = new Member(data?.member)
    Object.assign(this, data,  { member })
  }

  roleDisplay(): string {
    return roleChoiceList().find(role => this.role === role.value).name
  }

  getPayload(): Object {
    return {
      id: this.id,
      student_id: this.student.id,
      member_id: this.member.id,
      role: this.role
    }
  }
}

interface StudentMemberValidationError {
  student: string[]
  member: string[]
  role: string[]
}
