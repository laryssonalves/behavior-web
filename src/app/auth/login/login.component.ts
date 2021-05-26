import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }


  login(): void {
    this.loading = true
    this.errors = []
    this.submitted = true

    this.authService.authenticate(this.user)
      .then(() => this.redirect())
      .catch((e) => this.errors = ['Combinação de email/senha incorreta, por favor tente novamente.'])
      .finally(() => {
        this.loading = false
      })
  }

  redirect() {
    setTimeout(() => {
      return this.router.navigateByUrl('')
    }, this.redirectDelay)
  }

  isUserValid() {
    return !!this.user.password && !!this.user.password
  }
}
