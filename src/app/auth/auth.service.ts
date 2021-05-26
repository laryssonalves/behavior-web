import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../services/session-storage.service';
import { AuthToken } from './interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}auth/`

  onTokenChange = new ReplaySubject<AuthToken>()

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  async authenticate(user: any) {
    const loginUrl = `${this.authUrl}login/`
    await this.httpClient.post(loginUrl, user).pipe(
      map(response => new AuthToken(response)),
      tap(authToken => this.changeToken(authToken))
    ).toPromise()
  }

  getToken(): AuthToken {
    return this.sessionStorageService.getAuthToken()
  }

  changeToken(authToken: AuthToken) {
    this.sessionStorageService.setAuthToken(authToken)
    this.onTokenChange.next(authToken)
  }

  refreshToken() {
    const token = this.getToken()
    this.changeToken(token)
  }

  async logout() {
    
  }
}
