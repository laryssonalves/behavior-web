import { Component, OnInit } from '@angular/core'
import { Student } from '../../student.model'
import { NbDialogRef, NbToastrService } from '@nebular/theme'
import { StudentMemberService } from '../student-member/student-member.service'
import { MemberService } from '../../../member/member.service'
import { Member } from '../../../member/member.model'

@Component({
  selector: 'ngx-student-member-modal-form',
  templateUrl: './student-member-modal-form.component.html',
  styleUrls: [ './student-member-modal-form.component.scss' ]
})
export class StudentMemberModalFormComponent implements OnInit {
  title = 'Adicionar membro'

  memberList: Member[] = []
  selectedMembers: number[] = []

  student: Student

  private loading = false

  constructor(
    protected ref: NbDialogRef<StudentMemberModalFormComponent>,
    private studentMemberService: StudentMemberService,
    private memberService: MemberService,
    private nbToastrService: NbToastrService
  ) {}

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(saving: boolean) {
    this.loading = saving
  }

  async ngOnInit() {
    await this.getMemberList()
  }

  async saveStudentMembers() {
    try {
      this.showLoading = true

      await this.studentMemberService.addStudentMemberList(this.student, this.selectedMembers).toPromise()
      this.studentMemberService.refreshStudentMemberList.emit()

      this.close(true)
      this.showToastr(true, null)
    } catch (e) {
      this.showToastr(false, e.error.error)
    } finally {
      this.showLoading = false
    }
  }

  onCheckBoxChange(checked: boolean, member: Member) {
    if (checked) {
      this.selectedMembers.push(member.id)
    } else {
      this.selectedMembers = this.selectedMembers.filter(obj => obj !== member.id)
    }
  }

  close(success: boolean) {
    this.ref.close(success)
  }

  private async getMemberList() {
    try {
      this.showLoading = true
      this.memberList = await this.memberService.getMembersAvailable(this.student.id).toPromise()

      if (!this.memberList.length) {
        this.nbToastrService.info(null, 'Todos os membros possíveis já foram adicionados')
        this.close(false)
      }
    } catch (e) {
      this.nbToastrService.danger(null, 'Erro ao tentar buscar membros disponíveis')
    } finally {
      this.showLoading = false
    }
  }

  private showToastr(success: boolean, error: string) {
    if (success) {
      this.nbToastrService.success(null, 'Membro vinculado a estudante com sucesso')
    } else {
      this.nbToastrService.warning(error, 'Erro ao tentar vincular membro ao estudante')
    }
  }
}
