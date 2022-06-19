import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {
  title: string
  message: string

  constructor(protected ref: NbDialogRef<WarningModalComponent>) {}

  ngOnInit(): void {}
}
