import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { NbAuthService } from '@nebular/auth'
import { tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private nbAuthService: NbAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.nbAuthService.isAuthenticated().pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigateByUrl('auth/login')
        }
      })
    )
  }
}
