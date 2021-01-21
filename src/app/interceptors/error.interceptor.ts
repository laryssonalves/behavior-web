import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HTTP_403_FORBIDDEN, HTTP_500_INTERNAL_SERVER_ERROR } from '../constants'
import { ModalService } from '../modals/modal.service'


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private modalService: ModalService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === HTTP_403_FORBIDDEN) {
          this.router.navigateByUrl('auth/logout')
        }

        if (err.status === HTTP_500_INTERNAL_SERVER_ERROR) {
          this.modalService.showDialogError(err)
        }

        return throwError(err)
      })
    )
  }
}
