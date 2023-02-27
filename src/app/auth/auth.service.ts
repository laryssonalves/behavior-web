import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../services/session-storage.service';
import { AuthToken } from './interfaces/token';

type TokenResponse = {
  access?: string;
  refresh?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = `${environment.apiUrl}token/`
  private refreshUrl = `${this.tokenUrl}refresh/`

  onTokenChange = new ReplaySubject<AuthToken>()

  constructor(
    private httpClient: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  async authenticate(user: any) {
    await this.httpClient.post(this.tokenUrl, user).pipe(
      map((response: TokenResponse) => new AuthToken(response as Partial<AuthToken>)),
      tap(authToken => this.setToken(authToken))
    ).toPromise()
  }

  async refreshToken(): Promise<void> {
    const token = this.getToken()
    const data = { refresh: token.getRefreshToken() }
    await this.httpClient.post(this.refreshUrl, data).pipe(
      map((response: TokenResponse) => {
        const { access } = response
        const authToken = { access, refresh: token.getRefreshToken() } as Partial<AuthToken>
        return new AuthToken(authToken)
      }),
      tap(authToken => this.setToken(authToken))
    ).toPromise()
  }

  getToken(): AuthToken {
    return this.sessionStorageService.getAuthToken()
  }

  setToken(authToken: AuthToken) {
    this.sessionStorageService.setAuthToken(authToken)
    this.onTokenChange.next(authToken)
  }

  clearSession() {
    this.sessionStorageService.clearSession()
  }

  async logout() {
    this.clearSession()
    this.router.navigateByUrl('auth/login')
  }
}
