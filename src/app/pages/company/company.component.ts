import { Component, OnInit } from '@angular/core'
import { Company } from './company.model'
import { CompanyService } from './company.service'
import { masks } from '../../constants'
import { BuscaCepService } from '../../services/busca-cep.service'
import { GlobalAction } from '../../action-abstract'

import { brazilStatesChoices } from '../../helpers/brazil-states'

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: [ './company.component.scss' ]
})
export class CompanyComponent extends GlobalAction implements OnInit {
  company = new Company()
  masks = masks

  stateChoices = brazilStatesChoices()

  private loading = false

  constructor(
    private companyService: CompanyService,
    private buscaCepService: BuscaCepService
  ) {
    super()

    const selectedCompanySubscription = this.companyService.selectedCompanySubject.subscribe(company => {
      this.company = company
    })

    this.subscription.add(selectedCompanySubscription)

    this.companyService.getSelectedCompany()
  }

  ngOnInit(): void {}

  async updateCompany() {
    try {
      this.showLoading = true
      this.company.errors = null
      this.companyService.nextSelectedCompany = await this.companyService.updateCompany(this.company).toPromise()
    } catch (error) {
      this.company.errors = error.error
    } finally {
      this.showLoading = false
    }
  }

  async onCepChange() {
    if (this.company.postal_code.length < 8) { return }

    this.showLoading = true

    const cepResult = await this.buscaCepService.buscaCep(this.company.postal_code)

    this.company = Company.createFromJSON({ ...this.company, ...cepResult })

    this.showLoading = false
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(saving: boolean) {
    this.loading = saving
  }
}
