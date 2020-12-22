import { EventEmitter, Injectable } from '@angular/core'
import { Member } from './member.model'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs/operators'
import { NbToastrService } from '@nebular/theme'
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private memberUrl = `${ environment.apiUrl }member/`
  public refreshMemberList = new EventEmitter()

  constructor(private httpClient: HttpClient, private nbToastrService: NbToastrService) { }

  getMemberList(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.memberUrl).pipe(
      map(members => members.map(member => Member.createFromJSON(member)))
    )
  }

  getMembersAvailable(studentId: number): Observable<Member[]> {
    const url = `${this.memberUrl}student-available/`
    return this.httpClient.post<Member[]>(url, { student: studentId }).pipe(
      map(members => members.map(member => Member.createFromJSON(member)))
    )
  }

  getMember(pk: string | number): Observable<Member> {
    const memberDetailUrl = `${this.memberUrl}${pk}/`

    return this.httpClient.get<Member>(memberDetailUrl)
  }

  deleteMember(pk: string | number) {
    const memberDetailUrl = `${this.memberUrl}${pk}/`

    this.httpClient.delete(memberDetailUrl).subscribe(
      () =>  {
        this.nbToastrService.success(null, 'Membro deletado com sucesso')
        this.refreshMemberList.emit()
      },
      error => {
        this.nbToastrService.danger(null, 'Não foi possível deletar o membro')
      }
    )
  }

  addMember(member: Member): Observable<Member> {
    return this.httpClient.post<Member>(this.memberUrl, member)
  }

  updateMember(member: Member): Observable<Member> {
    const memberDetailUrl = `${this.memberUrl}${member.id}/`

    return this.httpClient.put<Member>(memberDetailUrl, member)
  }
}
