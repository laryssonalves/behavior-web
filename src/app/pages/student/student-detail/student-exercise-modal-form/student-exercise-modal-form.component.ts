import { Component, OnInit } from '@angular/core'
import { NbDialogRef, NbToastrService } from '@nebular/theme'
import { StudentExercise, StudentExerciseTarget } from '../student-exercise/student-exercise.model'
import { applicationTypeChoiceList, helpTypeChoiceList } from '../../../../models/choice.model'
import { StudentExerciseService } from '../student-exercise/student-exercise.service'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'ngx-student-exercise-modal-form',
  templateUrl: './student-exercise-modal-form.component.html',
  styleUrls: ['./student-exercise-modal-form.component.scss']
})
export class StudentExerciseModalFormComponent implements OnInit {
  readonly ERROR_TARGET_BLANK = 'O alvo não pode ficar em branco.'
  readonly ERROR_TARGET_EMPTY = 'Deve ser adicionado pelo menos um alvo.'
  readonly ERROR_ATTEMPTS = 'Verifique as tentativas e os alvos.'

  title = 'Programa de Ensino'

  applicationTypeChoices = applicationTypeChoiceList()
  helpTypeChoices = helpTypeChoiceList()

  studentExercise: StudentExercise
  targetError = false
  targetErrorMessage = ''
  targetDeletingIndex = null
  isDeletingTarget = false
  isLoading = false

  attemptsError = false

  constructor(
    protected ref: NbDialogRef<StudentExerciseModalFormComponent>,
    private studentExerciseService: StudentExerciseService,
    private nbToastrService: NbToastrService
  ) {}

  ngOnInit() {
  }

  async saveStudentExercise() {
    try {
      if (!this.studentExercise.targets.length) {
        this.targetError = true
        this.targetErrorMessage = this.ERROR_TARGET_EMPTY
      }
      
      this.attemptsError = !this.studentExercise.isTotalAttemptsValid()

      if (this.targetError || this.attemptsError) {
        return
      }

      this.isLoading = true
      this.studentExercise.errors = null

      if (this.studentExercise.id) {
        await this.studentExerciseService.updateStudentExercise(this.studentExercise).toPromise()
      } else {
        await this.studentExerciseService.addStudentExercise(this.studentExercise).toPromise()
      }

      this.studentExerciseService.refreshStudentExerciseList.emit()

      this.close(true)
    } catch (error) {
      this.studentExercise.errors = error.error
      this.showToastr(!this.studentExercise.errors)
    } finally {
      this.isLoading = false
    }
  }

  close(success: boolean) {
    this.ref.close(success)
  }

  onAttemptsChange() {
    this.studentExercise.fixTotalAttemptsLesserThanZero()
  }

  addTarget(targetInput: HTMLInputElement) {
    const target = targetInput.value

    if (target) {
      const targetExists = this.studentExercise.targets.find(t => t.target === target)

      if (!targetExists) {
        const studentExerciseTarget = StudentExerciseTarget.createFromJSON({ target })
        this.studentExercise.targets.push(studentExerciseTarget)
      }

      this.targetError = false
      this.targetErrorMessage = ''
      targetInput.value = ''
    } else {
      this.targetError = true
      this.targetErrorMessage = this.ERROR_TARGET_BLANK
    }
  }

  async removeTarget(targetIndex: number) {
    this.isDeletingTarget = true
    this.targetDeletingIndex = targetIndex

    const target = this.studentExercise.targets[targetIndex]

    if (this.studentExercise.id && target.id) {
      await this.studentExerciseService
        .deleteStudentExerciseTarget(this.studentExercise.student.id, this.studentExercise.id, target.id)
        .toPromise()
    }

    this.studentExercise.targets.splice(targetIndex, 1)

    this.isDeletingTarget = false
    this.targetDeletingIndex = null
  }

  private showToastr(success: boolean) {
    if (success) {
      this.nbToastrService.success(null, 'Programa de ensino vinculado com sucesso')
    } else {
      this.nbToastrService.warning('Por favor, verique os campos do formulário', 'Há campos inválidos no formulário')
    }
  }
}
