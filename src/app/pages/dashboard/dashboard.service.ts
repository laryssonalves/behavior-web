import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AnswersByResultType, ComparativeData, ComparativeDataByConsultation, ComparativeTries } from './interfaces/charts';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = `${ environment.apiUrl }dashboard/`;

  constructor(private httpClient: HttpClient) { }

  getAnswersByResultType(studentId: number): Observable<AnswersByResultType> {
    const answersByResultTypeUrl = `${ this.dashboardUrl }answers-result-type/?student=${ studentId }`;
    return this.httpClient.get<AnswersByResultType>(answersByResultTypeUrl);
  }

  getComparativeResultType(studentId: number): Observable<ComparativeData[]> {
    const comparativeResultTypeUrl = `${ this.dashboardUrl }comparative-result-type/?student=${ studentId }`;
    return this.httpClient.get<ComparativeData[]>(comparativeResultTypeUrl);
  }

  getTriesResult(studentId: number): Observable<ComparativeTries> {
    const triesResultUrl = `${ this.dashboardUrl }comparative-tries/?student=${ studentId }`;
    return this.httpClient.get<ComparativeTries>(triesResultUrl);
  }

  getComparativeApplicationType(studentId: number, exerciseId: number): Observable<ComparativeData[]> {
    const url = `${ this.dashboardUrl }comparative-application-type/?student=${ studentId }&exercise=${ exerciseId }`;
    return this.httpClient.get<ComparativeData[]>(url);
  }

  getComparativeApplicationTypeByConsultation(studentId: number, exerciseId: number): Observable<ComparativeDataByConsultation[]> {
    const url = `${ this.dashboardUrl }comparative-application-type-by-consultation/?student=${ studentId }&exercise=${ exerciseId }`;
    return this.httpClient.get<ComparativeDataByConsultation[]>(url);
  }
}
