import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
// import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
// import { isNullOrUndefined } from 'util';
import { SharedService } from './shared.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private shareService: SharedService
        , private matDialog: MatDialog) { }
    handleError(error) {
        console.log(error);
        this.shareService.loading_panel_change(false);
        if (error.status === 401) {
            // alert(error.statusText);
            localStorage.clear();
            location.reload();
        } else if (!this.shareService.notification_status && error.status === 500) {
            this.shareService.notification_status_change(true);
            // const NotificationDialog = this.matDialog.open(NotificationDialogComponent, { 'height': '250px', width: '550px' });
            // NotificationDialog.componentInstance.header = 'Info';
            // NotificationDialog.componentInstance.message =
            //     !isNullOrUndefined(error.error.meta_data) ? error.error.meta_data.message : 'Something went wrong';
            // NotificationDialog.afterClosed().subscribe((status) => {
            //     this.shareService.notification_status_change(status);
            // });
        }
    }
}
