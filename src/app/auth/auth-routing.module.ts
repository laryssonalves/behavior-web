import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LogoutComponent } from './logout/logout.component'
import { NbAuthComponent } from '@nebular/auth'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {
}

export const routedComponents = [ 
  LogoutComponent, 
  LoginComponent,
]
