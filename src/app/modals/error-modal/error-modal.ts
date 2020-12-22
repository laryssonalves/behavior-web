import { Component, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'ngx-error-modal',
  templateUrl: 'error-modal.html',
  styleUrls: [ 'error-modal.scss' ]
})
export class ErrorModalComponent implements OnInit {
  error: any

  constructor(protected ref: NbDialogRef<ErrorModalComponent>) {}

  ngOnInit(): void {}

  getErrorString(): string {
    return JSON.stringify(this.error)
  }
}
