import { Component, OnInit, HostBinding, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BusinesslogicService } from '../businesslogic.service';
import { SharedService } from '../shared.service';
import { UserIdleService } from 'angular-user-idle';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TimeoutDialogComponent } from '../timeout-dialog/timeout-dialog.component';

@Component({
  selector: 'km-knowledge-management',
  templateUrl: './knowledge-management.component.html',
  styleUrls: ['./knowledge-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KnowledgeManagementComponent implements OnInit {
  @HostBinding('attr.class') role = 'vbox viewport';
  mode = new FormControl('over'); // over, side, push
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private matDialog: MatDialog
    , private userIdle: UserIdleService
    , public shareService: SharedService
    , private route: Router
  ) {
  }
  candidate_menu() {
    this.shareService.candidate_nav_opened = !this.shareService.candidate_nav_opened;
  }
  ngOnInit() {
    // Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      const NotificationDialog = this.matDialog.open(TimeoutDialogComponent, { 'height': '200px', width: '550px' });
      NotificationDialog.componentInstance.header = 'Info';
      NotificationDialog.afterClosed().subscribe((status) => {
        if (status) { this.resetIdle(); }
      });
    });
  }

  resetIdle() { this.userIdle.resetTimer(); }
  logOutConfirmationDialog() {
    const confirmationDialog = this.matDialog.open(ConfirmationDialogComponent, { 'height': '250px', width: '400px', disableClose: true });
    confirmationDialog.componentInstance.header = 'Confirmation';
    confirmationDialog.componentInstance.message = 'Are you sure, you want to logout ?';
    confirmationDialog.afterClosed().subscribe((status) => {
      if (status) {
        localStorage.clear();
        this.route.navigate(['']);
      }
    });
  }
}
