import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './company.model';
import { constants } from '../../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyUrl = `${constants.apiUrl}company/`;

  constructor(private httpClient: HttpClient) { }

  createCompany(company: Company): Observable<Company> {
     return this.httpClient.post<Company>(this.companyUrl, company);
  }
}
