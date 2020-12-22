import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme'
import { ErrorModalComponent } from './error-modal/error-modal'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule
  ],
  declarations: [ ErrorModalComponent ],
  providers: [],
  entryComponents: [ ErrorModalComponent ]
})
export class ModalsModule {}
