import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { exception } from 'console'
import { UserService } from '../../pages/security/user/user.service'

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.getCurrentUser()
    let canPass = false

    switch (route.routeConfig.path) {
      case 'empresa':
        canPass = currentUser.hasPerms(['company_view'])
        break
      case 'seguranca':
        canPass = currentUser.hasPerms(['user_view', 'group_view'])
        break
      case 'aprendentes':
        canPass = currentUser.hasPerms(['student_view'])
        break
      case 'membros':
        canPass = currentUser.hasPerms(['member_view']) 
        break
    }

    if (!canPass) {
      this.router.navigateByUrl('auth/logout')
    }

    return canPass
  }
}
