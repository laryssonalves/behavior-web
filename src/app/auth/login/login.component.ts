import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../pages/security/user/user.service';
import { AuthService } from '../auth.service';

import { environment } from "../../../environments/environment";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }
  loading = false
  showMessages = {
    success: false,
    error: true
  }
  errors = []
  submitted = false
  redirectDelay = 200

  passwordVisible = false

  resetPasswordUrl = environment.resetPasswordUrl


  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }


  async login() {
    try {
      this.loading = true
      this.errors = []
      this.submitted = true

      await this.authService.authenticate(this.user)
      await this.userService.getUserDetails()
      this.redirect()
    } catch(e) {
      console.log(e)
      this.errors = ['Combinação de email/senha incorreta, por favor tente novamente.']
    } finally {
      this.loading = false
      this.submitted = false
    }
  }

  redirect() {
    setTimeout(() => {
      return this.router.navigateByUrl('')
    }, this.redirectDelay)
  }

  isUserValid() {
    return !!this.user.password && !!this.user.password
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }
}
