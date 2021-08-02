import * as moment from 'moment'
import { Moment } from 'moment'
import CoreModel from '../../../../models/core-model.model'
import { getDuration } from '../../../../utils'
import { User } from '../../../security/user/user.model'
import { Student } from '../../student.model'

export class Consultation extends CoreModel {
  id: number
  student: Student
  owner: User
  concluded: boolean
  concluded_date: Moment
  duration: string

  constructor(data?: Partial<Consultation>) {
    super()
    const create_date = moment(data?.create_date)
    const concluded_date = moment(data?.concluded_date)
    const duration = getDuration(create_date, concluded_date)
    const student = new Student(data.student)
    const owner = new User(data.owner)
    const parsedData = { concluded_date, create_date, duration, student, owner }
    Object.assign(this, data, parsedData)
  }

}