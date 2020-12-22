import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Company } from './company.model'
import { constants } from '../../constants'
import { Observable, ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyUrl = `${ constants.apiUrl }company/`

  private selectedCompany$ = new ReplaySubject<Company>()

  constructor(private httpClient: HttpClient) {
  }

  get selectedCompanySubject() {
    return this.selectedCompany$
  }

  set nextSelectedCompany(company: Company) {
    this.selectedCompany$.next(company)
  }

  getSelectedCompany() {
    const selectedCompanyUrl = `${this.companyUrl}selected/`
    this.httpClient.get<Company>(selectedCompanyUrl).subscribe(
      company => this.nextSelectedCompany = company,
      error => alert(error.message)
    )
  }

  // createCompany(company: Company): Observable<Company> {
  //   return this.httpClient.post<Company>(this.companyUrl, company)
  // }

  updateCompany(company: Company): Observable<Company> {
    const url = `${this.companyUrl}${company.id}/`
    return this.httpClient.put<Company>(url, company)
  }
}
