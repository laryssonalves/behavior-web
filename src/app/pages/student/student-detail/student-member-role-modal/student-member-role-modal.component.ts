import { Component, OnInit } from '@angular/core'
import { RoleChoice, roleChoiceList } from '../../../../models/choice.model'
import { NbDialogRef, NbToastrService } from '@nebular/theme'
import { StudentMemberService } from '../student-member/student-member.service'
import { StudentMember } from '../student-member/student-member.model'

@Component({
  selector: 'ngx-student-member-role-modal',
  templateUrl: './student-member-role-modal.component.html',
  styleUrls: [ './student-member-role-modal.component.scss' ]
})
export class StudentMemberRoleModalComponent implements OnInit {
  title = 'Alterar função'

  roleChoices = roleChoiceList().filter(role => role.value !== RoleChoice.ADMIN)

  studentMember: StudentMember

  private loading = false

  constructor(
    protected ref: NbDialogRef<StudentMemberRoleModalComponent>,
    private studentMemberService: StudentMemberService,
    private nbToastrService: NbToastrService
  ) {}

  ngOnInit() {
  }

  async changeMemberRole() {
    try {
      this.showLoading = true

      await this.studentMemberService.updateStudentMember(this.studentMember).toPromise()
      this.studentMemberService.refreshStudentMemberList.emit()

      this.showToastr(true, null)
      this.close(true)
    } catch (e) {
      this.showToastr(false, e.error.error)
    } finally {
      this.showLoading = false
    }
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(saving: boolean) {
    this.loading = saving
  }

  close(success: boolean) {
    this.ref.close(success)
  }

  private showToastr(success: boolean, error: string) {
    if (success) {
      this.nbToastrService.success(null, 'Função do membro alterada com sucesso')
    } else {
      this.nbToastrService.warning(error, 'Erro ao tentar alterar função do membro')
    }
  }
}
