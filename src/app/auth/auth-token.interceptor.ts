import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private nbAuthService: NbAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.nbAuthService.getToken()
    .pipe(
      switchMap((token: NbAuthSimpleToken) => {
        if (token && token.getValue()) {
          req = req.clone({
            setHeaders: {
              Authorization: `Token ${ token.getValue() }`,
            },
          });
        }
        return next.handle(req);
      }),
    );
  }
}
