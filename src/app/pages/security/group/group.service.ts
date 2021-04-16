import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Group } from './group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupUrl = `${environment.apiUrl}groups/`
  
  constructor(private httpClient: HttpClient) {}

  getGroupList(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.groupUrl).pipe(map(groups => groups.map(group => new Group(group))))
  }

  deleteGroup(pk: number): Observable<any> {
    const groupDetailUrl = `${this.groupUrl}${pk}/`

    return this.httpClient.delete(groupDetailUrl)
  }
}
