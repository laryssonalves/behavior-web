import { Injectable } from '@angular/core';

interface Credential {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  cleanToken(token: string): void {
    sessionStorage.removeItem('token');
  }

  saveCredential(username: string, password: string): void {
    const data = JSON.stringify({ username, password });
    sessionStorage.setItem('credential', data);
  }

  cleanCredential(): void {
    sessionStorage.removeItem('credential');
  }

  getCredential(): Credential {
    const data = sessionStorage.getItem('credential');
    return JSON.parse(data);
  }
}
