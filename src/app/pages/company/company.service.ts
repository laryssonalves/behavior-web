import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Company } from './company.model'
import { Observable, ReplaySubject } from 'rxjs'
import { environment } from '../../../environments/environment'
import { SessionStorageService } from '../../services/session-storage.service'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyUrl = `${ environment.apiUrl }company/`

  private selectedCompany$ = new ReplaySubject<Company>()

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) {
  }

  get selectedCompanySubject() {
    return this.selectedCompany$
  }

  set nextSelectedCompany(company: Company) {
    this.selectedCompany$.next(company)
    this.sessionStorageService.setSelectedCompany(company)
  }

  getSelectedCompany() {
    const selectedCompanyUrl = `${ this.companyUrl }selected/`
    this.httpClient.get<Company>(selectedCompanyUrl).subscribe(company => this.nextSelectedCompany = company)
  }

  updateCompany(company: Company): Observable<Company> {
    const url = `${ this.companyUrl }${ company.id }/`
    return this.httpClient.put<Company>(url, company)
  }
}
