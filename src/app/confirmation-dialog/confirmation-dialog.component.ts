import { Component, OnInit, Input, HostBinding, ViewEncapsulation, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'km-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent implements OnInit {
  @HostBinding('attr.class') role = 'section main hbox space-between notification-dialog';
  @Input() header: string;
  @Input() cancel = 'Cancel';
  @Input() ok = 'Ok';
  @Input() message: string;
  @Input() ButtonText = '';
  @Input() save = '';
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit() { }
  closeDialog() { this.dialogRef.close(false); }
  closeDialogWithData() { this.dialogRef.close(true); }
  extraOptionWithData() { this.dialogRef.close(undefined); }

}

