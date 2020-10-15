import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HTTP_403_FORBIDDEN, HTTP_409_CONFLICT } from '../constants';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === HTTP_403_FORBIDDEN) {
          this.router.navigate(['auth/logout']);
        }

        // if (err.status === HTTP_409_CONFLICT) {
        if (err.status === 400) {
          return throwError(err);
        }

        // TODO: mostrar dialog com erro na tela
        // const error = err.error.message || err.statusText
      }),
    );
  }
}
