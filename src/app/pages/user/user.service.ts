import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { User } from './user.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${environment.apiUrl}users/`
  private user$ = new ReplaySubject<User>()
  private currentUser: User

  constructor(private httpClient: HttpClient) {}

  get userSubject(): ReplaySubject<User> {
    return this.user$
  }

  set nextUser(user: User) {
    this.currentUser = user
    this.userSubject.next(user)
  }

  getUserDetails() {
    const url = `${this.userUrl}details/`
    this.httpClient.get<User>(url).subscribe(user => (this.nextUser = new User(user)))
  }

  getCurrentUser(): User {
    return this.currentUser
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl).pipe(map(users => users.map(user => new User(user))))
  }

  deleteUser(pk: number): Observable<any> {
    const userDetailUrl = `${this.userUrl}${pk}/`

    return this.httpClient.delete(userDetailUrl)
  }
}
