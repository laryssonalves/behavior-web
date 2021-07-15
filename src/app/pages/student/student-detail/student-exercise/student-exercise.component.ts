import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core'
import { GlobalAction } from '../../../../action-abstract'
import { StudentExercise } from './student-exercise.model'
import { StudentExerciseService } from './student-exercise.service'
import { NbDialogService, NbPopoverDirective } from '@nebular/theme'
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

  private loading = false

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
      this.showLoading = true
      this.studentExerciseList = await this.studentExerciseService.getStudentExerciseList(this.student.id).toPromise()
    } catch (e) {
      this.openDialogError(e)
    } finally {
      this.showLoading = false
    }
  }

  removeStudentExercise(studentExercise: StudentExercise) {
    this.studentExerciseService.deleteStudentExercise(studentExercise)
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(loading: boolean) {
    this.loading = loading
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
      { context: { studentExercise: studentExercise }, dialogClass: 'basic-modal' }
    )
  }


  checkUserPerm(perm: string) {
    return this.user?.hasPerms([perm])
  }
}
