import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbIconModule,
  NbInputModule,
  NbLayoutModule
} from '@nebular/theme'

import { AuthRoutingModule, routedComponents } from './auth-routing.module'
import { AuthGuard } from './auth.guard'


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
    ReactiveFormsModule,
    NbIconModule
  ],
  declarations: [ ...routedComponents ],
  providers: [ AuthGuard ]
})
export class AuthModule {
}
