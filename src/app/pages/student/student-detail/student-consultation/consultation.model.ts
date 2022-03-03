import * as moment from 'moment'
import { Moment } from 'moment'
import { ApplicationTypeChoice, HelpTypeChoice, ResultTypeChoice } from '../../../../models/choice.model'
import CoreModel from '../../../../models/core-model.model'
import { getDuration } from '../../../../utils'
import { User } from '../../../security/user/user.model'
import { Student } from '../../student.model'
import { StudentExercise, StudentExerciseTarget } from '../student-exercise/student-exercise.model'

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

export class ConsultationExercise {
  readonly id: number
  consultation_id: number
  exercise: StudentExercise
  application_type: ApplicationTypeChoice
  application_type_description: string
  help_type: HelpTypeChoice
  help_type_description: string
  help_description: string
  total_attempts: number
  procedure: string
  concluded: boolean
  concluded_date: Moment
  create_date: Moment
  result: ConsultationExerciseResult
  targets: ConsultationExerciseTarget[]
  is_applied: boolean
  total_targets_answered: number
  total_targets_correct: number
  percentage_correct_targets: number

  constructor(data?: Partial<ConsultationExercise>) {
    const exercise = new StudentExercise(data?.exercise)
    const concluded_date = moment(data?.concluded_date)
    const create_date = moment(data?.create_date, 'YYYY-MM-DDTHH:mm:ss')
    const targets = data?.targets?.map(target => new ConsultationExerciseTarget(target))
    const parsedData = { exercise, concluded_date, create_date, targets }
    Object.assign(this, data, parsedData)
  }
}

export class ConsultationExerciseTarget {
  readonly id: number
  consultation_exercise_id: number
  result_type: ResultTypeChoice
  result_type_description: string
  student_target: StudentExerciseTarget
  target_description: string
  sequence: number
  application_sequence: number

  constructor(props?: Partial<ConsultationExerciseTarget>) {
    Object.assign(this, props)
  }

  isWrong(): boolean {
    return this.checkResult(ResultTypeChoice.WRONG)
  }

  isIndependent(): boolean {
    return this.checkResult(ResultTypeChoice.INDEPENDENT)
  }

  isCorrectWithHelp(): boolean {
    return this.checkResult(ResultTypeChoice.CORRECT_WITH_HELP)
  }

  checkResult(resultType: ResultTypeChoice): boolean {
    return this.result_type === resultType
  }
}

export class ConsultationExerciseResult {
  result_indepent: number
  result_correct_with_help: number
  result_wrong: number
}
