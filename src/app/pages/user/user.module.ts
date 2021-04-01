import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserRoutingModule, routedComponents } from './user-routing.module'
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbSelectModule,
  NbSpinnerModule
} from '@nebular/theme'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule
  ],
  declarations: [...routedComponents]
})
export class UserModule {}
