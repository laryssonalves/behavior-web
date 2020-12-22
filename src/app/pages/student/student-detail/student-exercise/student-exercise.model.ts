import CoreModel from '../../../../models/core-model.model'
import { Student } from '../../student.model'
import { ApplicationTypeChoice, applicationTypeChoiceList, HelpTypeChoice } from '../../../../models/choice.model'

export class StudentExercise extends CoreModel {
  id: number
  student: Student
  program: string
  application_type: ApplicationTypeChoice
  help_type: HelpTypeChoice
  total_attempts: number
  targets: string
  procedure: string

  errors: StudentExerciseValidationError

  applicationTypeDisplay(): string {
    return applicationTypeChoiceList().find(appType => this.application_type === appType.value).name
  }

  helpTypeDisplay(): string {
    return applicationTypeChoiceList().find(helpType => this.help_type === helpType.value).name
  }

  static createFromJSON(data): StudentExercise {
    return Object.assign(new StudentExercise(), data)
  }

  getPayload(): Object {
    return {
      id: this.id,
      student_id: this.student.id,
      program: this.program,
      application_type: this.application_type,
      help_type: this.help_type,
      total_attempts: this.total_attempts,
      targets: this.targets,
      procedure: this.procedure
    }
  }
}

interface StudentExerciseValidationError {
  student: []
  program: []
  application_type: []
  help_type: []
  total_attempts: []
  targets: []
  procedure: []

}
