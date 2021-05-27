import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.getCurrentUser()
    const hasPerms = currentUser.hasPerms(['user_edit'])

    if (!hasPerms) {
      this.authService.logout()
    }
    
    return hasPerms
  }
  
}
