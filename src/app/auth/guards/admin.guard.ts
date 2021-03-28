import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { UserService } from '../services/user.service'

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.getCurrentUser()
    console.log(currentUser)
    if (currentUser.isAdmin()) {
      return true
    } else {
      this.router.navigateByUrl('aprendentes/')
      return false
    }
  }
}
