import { Injectable } from '@angular/core'
import { NbDialogService } from '@nebular/theme'
import { ErrorModalComponent } from './error-modal/error-modal'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private nbDialogService: NbDialogService) { }

  showDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      {
        context: { error },
        hasScroll: true,
        dialogClass: 'my-modal'
      }
    )
  }
}
