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
import { roleChoiceList } from '../../../models/choice.model'

@Component({
  selector: 'ngx-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  member = new Member()
  masks = masks

  roleChoices = roleChoiceList()
  stateChoices = brazilStatesChoices()

  private loading = false

  constructor(
    private buscaCepService: BuscaCepService,
    private memberService: MemberService,
    private sessionStorageService: SessionStorageService,
    private location: Location,
    private route: ActivatedRoute,
    private nbToastrService: NbToastrService
  ) {}

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(saving: boolean) {
    this.loading = saving
  }

  async ngOnInit() {
    await this.getMember()
  }

  async getMember() {
    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.member = await this.memberService.getMember(id).toPromise()
    }

    const company = this.sessionStorageService.getSelectedCompany()
    this.member.company = company.id
  }

  async saveMember() {
    try {
      this.showLoading = true
      this.member.errors = null

      if (this.member.id) {
        this.member = await this.memberService.updateMember(this.member).toPromise()
      } else {
        this.member = await this.memberService.addMember(this.member).toPromise()
      }

      this.goBack()
    } catch (error) {
      this.member.errors = error.error
    } finally {
      this.showLoading = false
      this.showToastr(!this.member.errors)
    }
  }

  async onCepChange() {
    if (this.member.postal_code.length < 8) {
      return
    }

    this.showLoading = true

    const cepResult = await this.buscaCepService.buscaCep(this.member.postal_code)

    this.member = Member.createFromJSON({ ...this.member, ...cepResult })

    this.showLoading = false
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
