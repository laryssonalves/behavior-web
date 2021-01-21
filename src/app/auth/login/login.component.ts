import { Component } from '@angular/core'
import { NbAuthResult, NbLoginComponent } from '@nebular/auth'

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent extends NbLoginComponent {
  showMessages = {
    success: false,
    error: true
  }

  login(): void {
    this.errors = []
    this.messages = []
    this.submitted = true

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false

      if (result.isFailure()) {
        this.errors = [ 'Combinação de email/senha incorreta, por favor tente novamente.' ]
      }

      const redirect = result.getRedirect()
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect)
        }, this.redirectDelay)
      }
      this.cd.detectChanges()
    })
  }
}
