import { Component, Input, OnInit } from '@angular/core'
import { GlobalAction } from '../../../../action-abstract'
import { StudentMember } from './student-member.model'
import { StudentMemberService } from './student-member.service'
import { Student } from '../../student.model'
import { NbDialogService } from '@nebular/theme'
import { StudentMemberRoleModalComponent } from '../student-member-role-modal/student-member-role-modal.component'
import { ErrorModalComponent } from '../../../../modals/error-modal/error-modal'

@Component({
  selector: 'ngx-student-member',
  templateUrl: './student-member.component.html',
  styleUrls: [ './student-member.component.scss' ]
})
export class StudentMemberComponent extends GlobalAction implements OnInit {
  @Input() student: Student

  studentMemberList: StudentMember[] = []

  private loading = false

  constructor(
    private studentMemberService: StudentMemberService,
    private nbDialogService: NbDialogService
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.getStudentMemberList()

    const refreshStudentMemberList = this.studentMemberService.refreshStudentMemberList.subscribe(async () => {
      await this.getStudentMemberList()
    })

    this.subscription.add(refreshStudentMemberList)
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

  removeStudentMember(studentMember: StudentMember) {
    this.studentMemberService.deleteStudentMember(studentMember)
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(loading: boolean) {
    this.loading = loading
  }

  openStudentMemberRoleModal(studentMember: StudentMember) {
    this.nbDialogService.open(
      StudentMemberRoleModalComponent,
      { context: { studentMember: StudentMember.createFromJSON(studentMember) }, dialogClass: 'my-modal' }
    )
  }

  private openDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      { context: { error: error }, hasScroll: true, dialogClass: 'my-modal' }
    )
  }
}
