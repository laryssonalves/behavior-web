import { Injectable } from '@angular/core'
import { Company } from '../pages/company/company.model'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() {
  }

  setSelectedCompany(company: Company): void {
    const companyStr = JSON.stringify(company)
    const encodedValue = btoa(companyStr)

    sessionStorage.setItem('company', encodedValue)
  }

  getSelectedCompany(): Company {
    const encodedValue = sessionStorage.getItem('company')
    const companyStr = atob(encodedValue)

    return Company.createFromJSON(JSON.parse(companyStr))
  }
}
