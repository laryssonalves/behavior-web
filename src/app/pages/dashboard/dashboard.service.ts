import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AnswersByResultType, ComparativeResultType, ComparativeTries } from './interfaces/charts';

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

  getComparativeResultType(studentId: number): Observable<ComparativeResultType[]> {
    const comparativeResultTypeUrl = `${ this.dashboardUrl }comparative-result-type/?student=${ studentId }`;
    return this.httpClient.get<ComparativeResultType[]>(comparativeResultTypeUrl);
  }

  getTriesResult(studentId: number): Observable<ComparativeTries> {
    const triesResultUrl = `${ this.dashboardUrl }comparative-tries/?student=${ studentId }`;
    return this.httpClient.get<ComparativeTries>(triesResultUrl);
  }
}
