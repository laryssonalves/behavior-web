import { Injectable } from '@angular/core'

interface Credential {
  username: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  setRememberMe(rememberMe: boolean): void {
    const data = JSON.stringify(rememberMe)
    localStorage.setItem('remember_me', data)
  }

  getRememberMe(): boolean {
    const data = localStorage.getItem('stay_connected')
    return JSON.parse(data)
  }

  clear(): void {
    localStorage.clear()
  }
}
