import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { NbAuthService } from '@nebular/auth'
import { tap } from 'rxjs/operators'
import { SessionStorageService } from '../../services/session-storage.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionStorageService: SessionStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isTokenValid = this.sessionStorageService.getAuthToken()?.isValid()

    if (!isTokenValid) {
      this.router.navigateByUrl('auth/login')
    }

    return isTokenValid
  }
}
