import { Component, Input, OnInit } from '@angular/core'
import { GlobalAction } from '../../../../action-abstract'
import { StudentExercise } from './student-exercise.model'
import { StudentExerciseService } from './student-exercise.service'
import { NbDialogService } from '@nebular/theme'
import { Student } from '../../student.model'
import { ErrorModalComponent } from '../../../../modals/error-modal/error-modal'
import { StudentExerciseModalFormComponent } from '../student-exercise-modal-form/student-exercise-modal-form.component'
import { User } from '../../../security/user/user.model'

@Component({
  selector: 'ngx-student-exercise',
  templateUrl: './student-exercise.component.html',
  styleUrls: [ './student-exercise.component.scss' ]
})
export class StudentExerciseComponent extends GlobalAction implements OnInit {
  @Input() user: User
  @Input() student: Student

  studentExerciseList: StudentExercise[] = []

  isLoading = false

  constructor(
    private studentExerciseService: StudentExerciseService,
    private nbDialogService: NbDialogService
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.getStudentExerciseList()

    const refreshStudentExerciseList = this.studentExerciseService.refreshStudentExerciseList.subscribe(async () => {
      await this.getStudentExerciseList()
    })

    this.subscription.add(refreshStudentExerciseList)
  }

  private async getStudentExerciseList() {
    try {
      this.isLoading = true
      this.studentExerciseList = await this.studentExerciseService.getStudentExerciseList(this.student.id).toPromise()
    } catch (e) {
      this.openDialogError(e)
    } finally {
      this.isLoading = false
    }
  }

  removeStudentExercise(studentExercise: StudentExercise) {
    this.studentExerciseService.deleteStudentExercise(studentExercise)
  }

  private openDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      { context: { error: error }, hasScroll: true, dialogClass: 'basic-modal' }
    )
  }

  openStudentExerciseForm(studentExercise: StudentExercise) {
    if (!this.checkUserPerm('student_exercise_edit')) {
      return
    }

    this.nbDialogService.open(
      StudentExerciseModalFormComponent,
      { context: { studentExercise, user: this.user }, dialogClass: 'basic-modal' }
    )
  }

  checkUserPerm(perm: string) {
    return this.user?.hasPerms([perm])
  }
}
