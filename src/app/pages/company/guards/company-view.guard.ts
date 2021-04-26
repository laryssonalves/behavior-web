import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../security/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyViewGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.userService.getCurrentUser()
    const hasPerms = currentUser.hasPerms(['company_view'])

    if (!hasPerms) {
      this.router.navigateByUrl('auth/logout')
    }
    
    return hasPerms
  }
  
}
