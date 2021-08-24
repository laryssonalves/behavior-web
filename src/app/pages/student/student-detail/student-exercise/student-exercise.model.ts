import CoreModel from '../../../../models/core-model.model'
import { Student } from '../../student.model'
import {
  ApplicationTypeChoice,
  applicationTypeChoiceList,
  HelpTypeChoice,
  ResultTypeChoice
} from '../../../../models/choice.model'

export class StudentExerciseTarget extends CoreModel {
  id: number
  target: string
  result_type: ResultTypeChoice

  static createFromJSON(data): StudentExerciseTarget {
    return Object.assign(new StudentExerciseTarget(), data)
  }
}

export class StudentExercise extends CoreModel {
  id: number
  student: Student
  program: string
  application_type: ApplicationTypeChoice
  help_type: HelpTypeChoice
  total_attempts: number
  targets: StudentExerciseTarget[] = []
  procedure: string
  concluded: boolean
  total_targets: number
  has_consultation: boolean

  errors: StudentExerciseValidationError

  constructor(data?: Partial<StudentExercise>) {
    super() 
    Object.assign(this, data)
  }

  applicationTypeDisplay(): string {
    return applicationTypeChoiceList().find(appType => this.application_type === appType.value).name
  }

  helpTypeDisplay(): string {
    return applicationTypeChoiceList().find(helpType => this.help_type === helpType.value).name
  }

  getPayload(): Object {
    return {
      id: this.id,
      student: this.student,
      program: this.program,
      application_type: this.application_type,
      help_type: this.help_type,
      total_attempts: this.total_attempts,
      targets: this.targets,
      procedure: this.procedure
    }
  }

  isTotalAttemptsGreaterThanZero(): boolean {
    return this.total_attempts > 0
  }

  fixTotalAttemptsLesserThanZero() {
    if (!this.isTotalAttemptsGreaterThanZero()) {
      this.total_attempts = 1
    }
  }

  isTotalAttemptsValid(): boolean {
    if (this.total_attempts < this.targets.length) {
      return false
    }

    const targetAttempts = this.total_attempts / this.targets.length 

    return Math.floor(targetAttempts) === targetAttempts
  }
}

interface StudentExerciseValidationError {
  student: string[]
  program: string[]
  application_type: string[]
  help_type: string[]
  total_attempts: string[]
  targets: string[]
  procedure: string[]
}
