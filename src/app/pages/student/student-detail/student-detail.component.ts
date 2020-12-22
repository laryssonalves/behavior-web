import { Component, OnInit } from '@angular/core'
import { GlobalAction } from '../../../action-abstract'
import { NbDialogService } from '@nebular/theme/'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Student } from '../student.model'
import { StudentService } from '../student.service'
import { StudentMemberModalFormComponent } from './student-member-modal-form/student-member-modal-form.component'
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal'
import { StudentExercise } from './student-exercise/student-exercise.model'
import { StudentExerciseModalFormComponent } from './student-exercise-modal-form/student-exercise-modal-form.component'

enum StudentDetailTab {
  EXERCISE = 1,
  MEMBER = 2
}

@Component({
  selector: 'ngx-student-detail',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-detail.component.html',
  styleUrls: [ './student-detail.component.scss' ]
})
export class StudentDetailComponent extends GlobalAction implements OnInit {
  private loading = false
  student: Student

  constructor(
    private studentService: StudentService,
    private nbDialogService: NbDialogService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.getStudent()
  }

  private async getStudent() {
    try {
      const studentId = this.route.snapshot.paramMap.get('id')
      this.student = await this.studentService.getStudent(studentId).toPromise()
    } catch (e) {
      this.openDialogError(e)
    }
  }

  goBack() {
    this.location.back()
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(saving: boolean) {
    this.loading = saving
  }

  openStudentMemberForm() {
    this.nbDialogService.open(
      StudentMemberModalFormComponent,
      { context: { student: this.student }, dialogClass: 'my-modal' }
    )
  }

  openStudentExerciseForm() {
    const studentExercise = StudentExercise.createFromJSON({ student: this.student })
    this.nbDialogService.open(
      StudentExerciseModalFormComponent,
      { context: { studentExercise: studentExercise }, dialogClass: 'my-modal' }
    )
  }

  private openDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      { context: { error: error }, hasScroll: true, dialogClass: 'my-modal' }
    )
  }
}
