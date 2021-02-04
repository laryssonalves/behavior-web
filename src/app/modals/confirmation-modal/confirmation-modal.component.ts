import { Component, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'ngx-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: [ './confirmation-modal.component.scss' ]
})
export class ConfirmationModalComponent implements OnInit {
  title: string
  question: string
  callback: () => void

  constructor(protected ref: NbDialogRef<ConfirmationModalComponent>) {}

  ngOnInit(): void {}


  confirm() {
    this.callback()
    this.ref.close()
  }

  cancel() {
    this.ref.close()
  }
}
