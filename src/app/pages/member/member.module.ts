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
import { MemberService } from './member.service'
import { FormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NgxMaskModule,
    NbSpinnerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule
  ],
  declarations: [ ...routedComponents ],
  providers: [ MemberService ]
})
export class MemberModule {}
