import { Component, OnInit } from '@angular/core'
import { NbDialogRef, NbToastrService } from '@nebular/theme'
import { StudentExercise } from '../student-exercise/student-exercise.model'
import { applicationTypeChoiceList, helpTypeChoiceList } from '../../../../models/choice.model'
import { StudentExerciseService } from '../student-exercise/student-exercise.service'

@Component({
  selector: 'ngx-student-exercise-modal-form',
  templateUrl: './student-exercise-modal-form.component.html',
  styleUrls: [ './student-exercise-modal-form.component.scss' ]
})
export class StudentExerciseModalFormComponent implements OnInit {
  title = 'Adicionar treino'

  applicationTypeChoices = applicationTypeChoiceList()
  helpTypeChoices = helpTypeChoiceList()

  studentExercise: StudentExercise

  private loading = false

  constructor(
    protected ref: NbDialogRef<StudentExerciseModalFormComponent>,
    private studentExerciseService: StudentExerciseService,
    private nbToastrService: NbToastrService
  ) {}

  ngOnInit() {
  }

  async saveStudentExercise() {
    try {
      this.showLoading = true
      this.studentExercise.errors = null

      await this.studentExerciseService.addStudentExercise(this.studentExercise).toPromise()
      this.studentExerciseService.refreshStudentExerciseList.emit()

      this.close(true)
    } catch (error) {
      this.studentExercise.errors = error.error
    } finally {
      this.showLoading = false
      this.showToastr(!this.studentExercise.errors)
      console.log(this.studentExercise)
    }
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(saving: boolean) {
    this.loading = saving
  }

  private showToastr(success: boolean) {
    if (success) {
      this.nbToastrService.success(null, 'Treino vinculado sucesso')
    } else {
      this.nbToastrService.warning(
        'Por favor, verique os campos do formulário',
        'Há campos inválidos no formulário'
      )
    }
  }

  close(success: boolean) {
    this.ref.close(success)
  }

  onAttemptsChange() {
    if (this.studentExercise.total_attempts < 1) {
      this.studentExercise.total_attempts = 1
    }
  }
}
