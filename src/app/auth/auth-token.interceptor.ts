import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SessionStorageService } from '../services/session-storage.service'
import { AuthService } from './auth.service'

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('token')) {
      return next.handle(req)
    }

    const token = this.authService.getToken()

    if (token && token.isValid()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token.getAccessToken() }`
        }
      })
    }

    return next.handle(req)
  }
}
