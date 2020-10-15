import { Component } from '@angular/core';
import { NbAuthResult, NbLogoutComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent extends NbLogoutComponent {
  logout(strategy: string) {
    this.service.logout(strategy).subscribe(() => {
      setTimeout(() => {
        return this.router.navigate(['/']);
      }, this.redirectDelay);
    });
  }
}
