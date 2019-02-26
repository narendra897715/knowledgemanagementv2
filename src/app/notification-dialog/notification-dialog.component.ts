import { Component, OnInit, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'km-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationDialogComponent implements OnInit {
  @HostBinding('attr.class') role = 'section main hbox space-between notification-dialog';
  @Input() header: string;
  @Input() message: string;
  constructor(public dialogRef: MatDialogRef<NotificationDialogComponent>) { }

  ngOnInit() { }
  closeDialog() { this.dialogRef.close(true); }
  close1Dialog() { this.dialogRef.close(true); }

}
