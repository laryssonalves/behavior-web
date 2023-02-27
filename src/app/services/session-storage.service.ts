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

  getParsedData(data: any): any {
    return JSON.parse(data)
  }

  getStringifiedData(data: any): string {
    return JSON.stringify(data)
  }

  getEncodedData(data: any): string {
    return btoa(this.getStringifiedData(data))
  }

  getDecodedData<T>(encodedData: string): T {
    return encodedData ? this.getParsedData(atob(encodedData)) : null
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
    sessionStorage.setItem('auth_token', this.getStringifiedData(authToken))
  }

  getAuthToken(): AuthToken {
    const authToken = this.getParsedData(sessionStorage.getItem('auth_token'))

    return new AuthToken(authToken)
  }

  clearSession() {
    sessionStorage.clear()
  }
}
