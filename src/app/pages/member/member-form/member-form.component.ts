import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'

import { Member } from '../member.model'
import { masks } from '../../../constants'

import { BuscaCepService } from '../../../services/busca-cep.service'
import { MemberService } from '../member.service'
import { SessionStorageService } from '../../../services/session-storage.service'

import { brazilStatesChoices } from '../../../helpers/brazil-states'
import { ActivatedRoute } from '@angular/router'
import { NbToastrService } from '@nebular/theme'
import { UserService } from '../../security/user/user.service'

@Component({
  selector: 'ngx-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  member = new Member()
  masks = masks
  formTitle = 'Adicionar membro'

  stateChoices = brazilStatesChoices()

  isLoading = false

  constructor(
    private buscaCepService: BuscaCepService,
    private memberService: MemberService,
    private sessionStorageService: SessionStorageService,
    private location: Location,
    private route: ActivatedRoute,
    private nbToastrService: NbToastrService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.getMember()
  }

  async getMember() {
    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.member = await this.memberService.getMember(id).toPromise()
      this.formTitle = this.member.name
    }

    const company = this.sessionStorageService.getSelectedCompany()
    this.member.company = company.id
  }

  async saveMember() {
    try {
      this.isLoading = true
      this.member.errors = null

      if (this.member.id) {
        this.member = await this.memberService.updateMember(this.member).toPromise()
        this.userService.isNeededUpdateCurrentUser(this.member)
      } else {
        this.member = await this.memberService.addMember(this.member).toPromise()
      }

      this.goBack()
    } catch (error) {
      this.member.errors = error.error
    } finally {
      this.isLoading = false
      this.showToastr(!this.member.errors)
    }
  }

  async onCepChange() {
    if (this.member.postal_code.length < 8) {
      return
    }

    this.isLoading = true

    const cepResult = await this.buscaCepService.buscaCep(this.member.postal_code)

    this.member = Member.createFromJSON({ ...this.member, ...cepResult })

    this.isLoading = false
  }

  goBack() {
    this.location.back()
  }

  private showToastr(success: boolean) {
    if (success) {
      this.nbToastrService.success(null, 'Membro salvo com sucesso')
    } else {
      this.nbToastrService.warning('Por favor, verique os campos do formulário', 'Há campos inválidos no formulário')
    }
  }
}
