import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MemberRoutingModule, routedComponents } from './member-routing.module'
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NgxMaskModule.forRoot(),
    NbSpinnerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
  ],
  declarations: [...routedComponents]
})
export class MemberModule {}
