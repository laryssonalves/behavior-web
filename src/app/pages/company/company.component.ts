import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Route } from '@angular/router'

import { Company } from './company.model'
import { CompanyService } from './company.service'
import { masks } from '../../constants'
import { BuscaCepService } from '../../services/busca-cep.service'
import { GlobalAction } from '../../action-abstract'

import { brazilStatesChoices } from '../../helpers/brazil-states'
import { UserService } from '../security/user/user.service'
import { User } from '../security/user/user.model'

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: [ './company.component.scss' ]
})
export class CompanyComponent extends GlobalAction implements OnInit, OnDestroy {
  private user: User

  company = new Company()
  masks = masks

  stateChoices = brazilStatesChoices()

  isLoading = false
  isEditing = false

  constructor(
    private companyService: CompanyService,
    private buscaCepService: BuscaCepService,
    private userService: UserService
  ) {
    super()
  }
  
  ngOnInit(): void {
    const selectedCompanySubscription = this.companyService.selectedCompanySubject.subscribe(company => {
      this.company = company
    })
    
    this.companyService.getSelectedCompany()

    const userSubscription = this.userService.userSubject.subscribe(user => (this.user = user))
    
    this.subscription.add(selectedCompanySubscription)
    this.subscription.add(userSubscription)
  }
  
  ngOnDestroy(): void {
    super.ngOnDestroy()
  }

  async updateCompany() {
    try {
      this.isLoading = true
      this.company.errors = null
      this.companyService.nextSelectedCompany = await this.companyService.updateCompany(this.company).toPromise()
    } catch (error) {
      this.company.errors = error.error
    } finally {
      this.isLoading = false
      this.isEditing = false
    }
  }

  async onCepChange() {
    if (this.company.postal_code.length < 8) { return }

    this.isLoading = true

    const cepResult = await this.buscaCepService.buscaCep(this.company.postal_code)

    this.company = Company.createFromJSON({ ...this.company, ...cepResult })

    this.isLoading = false
  }

  editForm() {
    this.isEditing = true
  }

  checkUserPerm(perm: string): boolean {
    return this.user?.hasPerms([perm])
  }
}
