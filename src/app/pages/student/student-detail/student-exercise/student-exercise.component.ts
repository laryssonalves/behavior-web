import { Component, Input, OnInit } from '@angular/core'
import { GlobalAction } from '../../../../action-abstract'
import { StudentExercise } from './student-exercise.model'
import { StudentExerciseService } from './student-exercise.service'
import { NbDialogService } from '@nebular/theme'
import { Student } from '../../student.model'
import { ErrorModalComponent } from '../../../../modals/error-modal/error-modal'

@Component({
  selector: 'ngx-student-exercise',
  templateUrl: './student-exercise.component.html',
  styleUrls: [ './student-exercise.component.scss' ]
})
export class StudentExerciseComponent extends GlobalAction implements OnInit {
  @Input() student: Student

  studentExerciseList: StudentExercise[] = []

  private loading = false

  constructor(
    private studentExerciseService: StudentExerciseService,
    private nbDialogService: NbDialogService
  ) {
    super()
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(loading: boolean) {
    this.loading = loading
  }

  async ngOnInit(): Promise<void> {
    await this.getStudentExerciseList()

    const refreshStudentExerciseList = this.studentExerciseService.refreshStudentExerciseList.subscribe(async () => {
      await this.getStudentExerciseList()
    })

    this.subscription.add(refreshStudentExerciseList)
  }

  removeStudentExercise(studentExercise: StudentExercise) {
    this.studentExerciseService.deleteStudentExercise(studentExercise)
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

  private openDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      { context: { error: error }, hasScroll: true, dialogClass: 'my-modal' }
    )
  }
}
