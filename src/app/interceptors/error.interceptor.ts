import { Injectable } from '@angular/core'
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

import { Observable, from, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HTTP_403_FORBIDDEN, HTTP_500_INTERNAL_SERVER_ERROR } from '../constants'
import { ModalService } from '../modals/modal.service'
import { AuthService } from '../auth/auth.service'


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private modalService: ModalService, private httpClient: HttpClient) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestObservable = next.handle(request).pipe(
      catchError((err) => {
        if (err.status === HTTP_403_FORBIDDEN) {
          return from(this.authService.refreshToken())
            .pipe(catchError(() => this.authService.logout()))
        }

        if (err.status === HTTP_500_INTERNAL_SERVER_ERROR) {
          this.modalService.showDialogError(err)
        }

        return throwError(err)
      })
    )

    return requestObservable as Observable<HttpEvent<any>>
  }
}
