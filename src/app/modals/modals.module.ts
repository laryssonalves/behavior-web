import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme'
import { ErrorModalComponent } from './error-modal/error-modal'
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { WarningModalComponent } from './warning-modal/warning-modal.component'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule
  ],
  declarations: [ ErrorModalComponent, ConfirmationModalComponent, WarningModalComponent ],
  entryComponents: [ ErrorModalComponent, ConfirmationModalComponent ]
})
export class ModalsModule {}
