import { Injectable } from '@angular/core'
import { AuthToken } from '../auth/interfaces/token'
import { Company } from '../pages/company/company.model'
import { User } from '../pages/security/user/user.model'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() {
  }

  getEncodedData(data: any): string {
    return btoa(JSON.stringify(data))      
  }

  getDecodedData<T>(encodedData: string): T {
    return encodedData ? JSON.parse(atob(encodedData)) : null
  }

  setSelectedCompany(company: Company): void {
    const encodedValue = this.getEncodedData(company)
    sessionStorage.setItem('company', encodedValue)
  }

  getSelectedCompany(): Company {
    const encodedValue = sessionStorage.getItem('company')
    const company = this.getDecodedData<Company>(encodedValue)

    return Company.createFromJSON(company)
  }

  setLoggedUser(user: User): void {
    const encodedValue = this.getEncodedData(user)
    sessionStorage.setItem('user', encodedValue)
  }

  getLoggedUser(): User {
    const encodedValue = sessionStorage.getItem('user')
    const user = this.getDecodedData<User>(encodedValue)

    return new User(user)
  }

  setAuthToken(authToken: AuthToken): void {
    const encodedValue = this.getEncodedData(authToken)
    sessionStorage.setItem('auth_token', encodedValue)
  }

  getAuthToken(): AuthToken {
    const encodedValue = sessionStorage.getItem('auth_token')
    const authToken = this.getDecodedData<AuthToken>(encodedValue)

    return new AuthToken(authToken)
  }

  clearSession() {
    sessionStorage.clear()
  }
}
