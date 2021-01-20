import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme'

import { AuthRoutingModule, routedComponents } from './auth-routing.module'
import { AuthGuard } from './auth.guard'
import { UserService } from './user.service'


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [...routedComponents],
  providers: [ AuthGuard ]
})
export class AuthModule {
}
