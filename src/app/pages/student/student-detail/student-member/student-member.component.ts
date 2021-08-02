import { Component, Input, OnInit } from '@angular/core'
import { GlobalAction } from '../../../../action-abstract'
import { StudentMember } from './student-member.model'
import { StudentMemberService } from './student-member.service'
import { Student } from '../../student.model'
import { NbDialogService } from '@nebular/theme'
import { StudentMemberRoleModalComponent } from '../student-member-role-modal/student-member-role-modal.component'
import { ErrorModalComponent } from '../../../../modals/error-modal/error-modal'
import { User } from '../../../security/user/user.model'
import { StudentMemberModalFormComponent } from '../student-member-modal-form/student-member-modal-form.component'

@Component({
  selector: 'ngx-student-member',
  templateUrl: './student-member.component.html',
  styleUrls: [ './student-member.component.scss' ]
})
export class StudentMemberComponent extends GlobalAction implements OnInit {
  @Input() user: User
  @Input() student: Student

  studentMemberList: StudentMember[] = []

  private loading = false

  constructor(
    private studentMemberService: StudentMemberService,
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
    await this.getStudentMemberList()

    const refreshStudentMemberList = this.studentMemberService.refreshStudentMemberList.subscribe(async () => {
      await this.getStudentMemberList()
    })

    this.subscription.add(refreshStudentMemberList)
  }

  removeStudentMember(studentMember: StudentMember) {
    this.studentMemberService.deleteStudentMember(studentMember)
  }

  openStudentMemberForm(studentMember: StudentMember) {
    this.nbDialogService.open(
      StudentMemberModalFormComponent,
      { context: { studentMember: new StudentMember(studentMember) }, dialogClass: 'basic-modal' }
    )
  }

  private async getStudentMemberList() {
    try {
      this.showLoading = true
      this.studentMemberList = await this.studentMemberService.getStudentMemberList(this.student.id).toPromise()
    } catch (e) {
      this.openDialogError(e)
    } finally {
      this.showLoading = false
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
