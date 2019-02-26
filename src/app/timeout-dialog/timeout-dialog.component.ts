import { Component, OnInit, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-timeout-dialog',
  templateUrl: './timeout-dialog.component.html',
  styleUrls: ['./timeout-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimeoutDialogComponent implements OnInit {
  @HostBinding('attr.class') role = 'section main hbox space-between notification-dialog';
  @Input() header = 'Info';
  countDown = 30;
  @Input() message: string = ('Your session will expire in ##time## sec').replace('##time##', this.countDown.toString());
  constructor(public dialogRef: MatDialogRef<TimeoutDialogComponent>
    , private route: Router
    , public shareService: SharedService
    , private userIdle: UserIdleService) { }

  ngOnInit() {
    setInterval(() => {
      if (this.countDown > 0) {
        this.message = ('Your session will expire in ##time## sec').replace('##time##', this.countDown.toString());
      } else if (this.countDown === 0) {
        this.closeDialog();
        this.userIdle.stopWatching();
        localStorage.clear();
        this.route.navigate(['']);
      }
      this.countDown--;
    }, 1000);
  }
  closeDialog() { this.dialogRef.close(true); }
  close1Dialog() { this.dialogRef.close(true); }

}
