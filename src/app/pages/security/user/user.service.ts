import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { User } from './user.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map } from 'rxjs/operators'
import { Member } from '../../member/member.model'
import { SessionStorageService } from '../../../services/session-storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${environment.apiUrl}users/`
  private user$ = new ReplaySubject<User>()

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) {
    const storageUser = this.getCurrentUser();

    if (storageUser) {
      this.nextUser = storageUser
    }
  }

  get userSubject(): ReplaySubject<User> {
    return this.user$
  }

  set nextUser(user: User) {
    this.userSubject.next(user)
    this.sessionStorageService.setLoggedUser(user)
  }

  async getUserDetails() {
    const url = `${this.userUrl}details/`
    const user = await this.httpClient.get<User>(url).toPromise()
    this.nextUser = new User(user)
  }

  getCurrentUser(): User {
    return this.sessionStorageService.getLoggedUser()
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl).pipe(map(users => users.map(user => new User(user))))
  }

  getUser(pk: number | string): Observable<User> {
    const userDetailUrl = `${this.userUrl}${pk}/`

    return this.httpClient.get<User>(userDetailUrl).pipe(map(user => new User(user)))
  }

  deleteUser(pk: number): Observable<any> {
    const userDetailUrl = `${this.userUrl}${pk}/`

    return this.httpClient.delete(userDetailUrl)
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.userUrl, user.getPayload())
  }

  updateUser(user: User): Observable<User> {
    const userDetailUrl = `${this.userUrl}${user.id}/`

    return this.httpClient.put<User>(userDetailUrl, user.getPayload())
  }

  isNeededUpdateCurrentUser(obj: Member | User) {
    const currentUser = this.getCurrentUser()
    const memberCheck = obj instanceof Member && obj.id === currentUser.person.id
    const userCheck = obj instanceof User && obj.id === currentUser.id

    if (memberCheck || userCheck) {
      this.getUserDetails()
    }
  }
}
