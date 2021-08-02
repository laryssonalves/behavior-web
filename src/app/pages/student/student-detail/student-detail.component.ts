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
import { User } from '../../security/user/user.model'
import { UserService } from '../../security/user/user.service'
import { StudentMember } from './student-member/student-member.model'

@Component({
  selector: 'ngx-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: [ './student-detail.component.scss' ]
})
export class StudentDetailComponent extends GlobalAction implements OnInit {
  user: User
  student: Student
  isLoading = false

  constructor(
    private studentService: StudentService,
    private userService: UserService,
    private nbDialogService: NbDialogService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.getStudent()

    const userSubscription = this.userService.userSubject.subscribe(user => (this.user = user))

    this.subscription.add(userSubscription)
  }

  goBack() {
    this.location.back()
  }

  openStudentMemberForm() {
    const studentMember = new StudentMember({ student: this.student })
    this.nbDialogService.open(
      StudentMemberModalFormComponent,
      { context: { studentMember }, dialogClass: 'basic-modal' }
    )
  }

  openStudentExerciseForm() {
    const studentExercise = StudentExercise.createFromJSON({ student: this.student })
    this.nbDialogService.open(
      StudentExerciseModalFormComponent,
      { context: { studentExercise }, dialogClass: 'basic-modal' }
    )
  }

  private async getStudent() {
    try {
      const studentId = this.route.snapshot.paramMap.get('id')
      this.student = await this.studentService.getStudent(studentId).toPromise()
    } catch (e) {
      this.openDialogError(e)
    }
  }

  private openDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      { context: { error: error }, hasScroll: true, dialogClass: 'basic-modal' }
    )
  }

  checkUserPerm(perm: string) {
    return this.user?.hasPerms([perm])
  }
}
