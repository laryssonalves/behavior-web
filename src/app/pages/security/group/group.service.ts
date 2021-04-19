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


  getGroup(pk: number | string): Observable<Group> {
    const groupDetailUrl = `${this.groupUrl}${pk}/`

    return this.httpClient.get<Group>(groupDetailUrl).pipe(map(group => new Group(group)))
  }

  addGroup(group: Group): Observable<Group> {
    return this.httpClient.post<Group>(this.groupUrl, group.getPayload())
  }

  updateGroup(group: Group): Observable<Group> {
    const groupDetailUrl = `${this.groupUrl}${group.id}/`
    
    return this.httpClient.put<Group>(groupDetailUrl, group.getPayload())
  }
}
