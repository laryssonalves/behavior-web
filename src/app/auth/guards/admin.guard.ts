import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserService } from '../../pages/security/user/user.service'

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.getCurrentUser()
    const isAdmin = currentUser?.isAdmin()

    if (!isAdmin) {
      this.router.navigateByUrl('aprendentes/')
    }

    return isAdmin
  }
}
