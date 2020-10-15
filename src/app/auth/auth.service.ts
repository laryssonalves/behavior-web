import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './models/user.model';
import { SessionStorageService } from '../session-storage.service';
import { constants } from '../constants';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'users/';
  tokenUrl = 'auth/token/';
  loginSuccessful = new EventEmitter();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
  ) {
  }

  async login(username: string, password: string, remember: boolean): Promise<void> {
    const url = `${ constants.apiUrl }${ this.tokenUrl }`;
    const body = { username, password };

    const { token } = await this.http.post<TokenResponse>(url, body).toPromise();
    this.sessionStorageService.saveToken(token);

    if (remember) {
      this.sessionStorageService.saveCredential(username, password);
    } else {
      this.sessionStorageService.cleanCredential();
    }

    // this.loginSuccessful.emit();
    // this.http.post<TokenResponse>(url, body).subscribe((response) => {
    //     this.sessionStorageService.saveToken(response.token);
    //
    //     if (remember) {
    //       this.sessionStorageService.saveCredentials(username, password);
    //     } else {
    //       this.sessionStorageService.cleanCredentials();
    //     }
    //
    //     this.loginSuccessful.emit();
    //   },
    //   () => {
    //     window.alert('Credenciais inválidas.');
    //   },
    // );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${ constants.apiUrl }${ this.registerUrl }`, user);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
