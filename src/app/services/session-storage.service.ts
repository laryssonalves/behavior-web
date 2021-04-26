import { Injectable } from '@angular/core'
import { Company } from '../pages/company/company.model'
import { User } from '../pages/security/user/user.model'

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

  setLoggedUser(user: User): void {
    const userStr = JSON.stringify(user)
    const encodedValue = btoa(userStr)

    sessionStorage.setItem('user', encodedValue)
  }

  getLoggedUser(): User {
    const encodedValue = sessionStorage.getItem('user')
    const userStr = atob(encodedValue)

    return new User(JSON.parse(userStr))
  }
}
