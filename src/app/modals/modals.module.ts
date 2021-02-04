import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme'
import { ErrorModalComponent } from './error-modal/error-modal'
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule
  ],
  declarations: [ ErrorModalComponent, ConfirmationModalComponent ],
  entryComponents: [ ErrorModalComponent, ConfirmationModalComponent ]
})
export class ModalsModule {}
