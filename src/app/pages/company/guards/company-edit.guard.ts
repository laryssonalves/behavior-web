import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../security/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyEditGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.userService.getCurrentUser()
    const hasPerms = currentUser.hasPerms(['company_edit'])

    if (!hasPerms) {
      this.router.navigateByUrl('empresa')
    }
    
    return hasPerms
  }
  
}
