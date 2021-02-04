import { Injectable } from '@angular/core'
import { NbDialogService } from '@nebular/theme'
import { ErrorModalComponent } from './error-modal/error-modal'
import { HttpErrorResponse } from '@angular/common/http'
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private nbDialogService: NbDialogService) { }

  showDialogError(err: HttpErrorResponse) {
    const { error } = err
    this.nbDialogService.open(
      ErrorModalComponent,
      {
        context: { error },
        hasScroll: true,
        dialogClass: 'basic-modal'
      }
    )
  }

  showDialogConfirmation(title: string, question: string, callback: () => void) {
    this.nbDialogService.open(
      ConfirmationModalComponent,
      {
        context: { title, question, callback },
        dialogClass: 'confirmation-modal'
      }
    )
  }
}
