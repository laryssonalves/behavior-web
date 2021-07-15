import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../security/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailViewGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.getCurrentUser()
    const hasPerms = currentUser.hasPerms(['student_member_view', 'student_exercise_view'])

    if (!hasPerms) {
      this.authService.logout()
    }
    
    return hasPerms
  }
  
}
