import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'
import { User } from './models/user.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${ environment.apiUrl }users/`
  private user$ = new ReplaySubject<User>()

  constructor(private httpClient: HttpClient) {
  }

  get userSubject(): ReplaySubject<User> {
    return this.user$
  }

  set nextUser(user: User) {
    this.userSubject.next(user)
  }

  getUserDetails(): void {
    const url = `${ this.userUrl }details`

    this.httpClient.get<User>(url).subscribe(user => this.nextUser = user)
  }
}
