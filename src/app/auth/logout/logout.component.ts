import { Component, OnInit } from '@angular/core'
import { NbLogoutComponent } from '@nebular/auth'

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: [ './logout.component.scss' ]
})
export class LogoutComponent extends NbLogoutComponent implements OnInit {
  isTokenInvalid = false

  ngOnInit() {
    super.ngOnInit()
  }

  logout(strategy: string) {
    this.service.logout(strategy).subscribe(() => {
      this.service.resetPassword('email')
      this.redirectToLogin()
    })
  }

  private redirectToLogin() {
    setTimeout(() => {
      return this.router.navigateByUrl('auth/login')
    }, this.redirectDelay)
  }
}
