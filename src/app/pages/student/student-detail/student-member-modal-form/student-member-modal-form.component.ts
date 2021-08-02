import { Component, OnInit } from '@angular/core'
import { Student } from '../../student.model'
import { NbDialogRef, NbToastrService } from '@nebular/theme'
import { StudentMemberService } from '../student-member/student-member.service'
import { MemberService } from '../../../member/member.service'
import { Member } from '../../../member/member.model'
import { StudentMember } from '../student-member/student-member.model'
import { roleChoiceList } from '../../../../models/choice.model'

@Component({
  selector: 'ngx-student-member-modal-form',
  templateUrl: './student-member-modal-form.component.html',
  styleUrls: ['./student-member-modal-form.component.scss']
})
export class StudentMemberModalFormComponent implements OnInit {
  title = 'Adicionar membro'

  memberList: Member[] = []
  roleChoices = roleChoiceList()

  studentMember: StudentMember

  isEditing = false
  isLoading = false

  constructor(
    protected ref: NbDialogRef<StudentMemberModalFormComponent>,
    private studentMemberService: StudentMemberService,
    private memberService: MemberService,
    private nbToastrService: NbToastrService
  ) {}

  async ngOnInit() {
    await this.getMemberList()
  }

  private async getMemberList() {
    try {
      if (this.studentMember.id) {
        this.isEditing = true
        this.title = this.studentMember.member.name
        return
      }

      this.isLoading = true

      this.memberList = await this.memberService.getMembersAvailable(this.studentMember.student.id).toPromise()

      if (!this.memberList.length) {
        this.nbToastrService.info(null, 'Todos os membros possíveis já foram adicionados')
        this.close(false)
      }
    } catch (e) {
      this.nbToastrService.danger(null, 'Erro ao tentar buscar membros disponíveis')
    } finally {
      this.isLoading = false
    }
  }

  async saveStudentMembers() {
    try {
      this.isLoading = true

      if (this.isEditing) {
        await this.studentMemberService.updateStudentMember(this.studentMember).toPromise()
      } else {
        await this.studentMemberService.addStudentMember(this.studentMember).toPromise()
      }
      this.studentMemberService.refreshStudentMemberList.emit()

      this.close(true)
      this.showToastr(true, null)
    } catch (e) {
      this.studentMember.errors = e.error
      this.showToastr(false, e.error.error)
    } finally {
      this.isLoading = false
    }
  }

  close(success: boolean) {
    this.ref.close(success)
  }

  private showToastr(success: boolean, error: string) {
    if (success) {
      this.nbToastrService.success(null, this.isEditing ? 'Função do membro alterada com sucesso' : 'Membro vinculado a aprendente com sucesso')
    } else {
      this.nbToastrService.warning(error, this.isEditing ? 'Erro ao tentar alterar função' : 'Erro ao tentar vincular membro ao aprendente')
    }
  }

  get canSave(): boolean {
    return !!this.studentMember.member && !!this.studentMember.role
  }
}
