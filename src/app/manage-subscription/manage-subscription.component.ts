import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import {BusinesslogicService} from '../businesslogic.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import {SharedService} from '../shared.service';
@Component({
  selector: 'km-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.scss']
})
export class ManageSubscriptionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageSubscriptionComponent>,
     public businesslogic: BusinesslogicService, public snackBar: MatSnackBar, public sharedservice: SharedService) { }
  domainames: any;
  selectall: boolean;
  managesubscription: Subscription;
domainselected: boolean;
finalsubscriptionlist = [] ;
  ngOnInit() {
    this.managesubscription = this.businesslogic.post('post/getsubscriptiondata',
    {'employeeId': this.sharedservice.login_user_details.user_id}).subscribe((result: any) => {

      this.domainames = result;
      this.domainames.map((item, i) => {
        if (item.subscribed === true) {
          this.finalsubscriptionlist.push(item.domainId);
    }
      });
      });
  }
  valueChange(value) {
    this.finalsubscriptionlist = [];
    for (let i = 0; i < this.domainames.length; i++) {
      this.domainames[i].subscribed = this.selectall;
      this.finalsubscriptionlist.push(this.domainames[i].domainId);
    }
  }
  Savesubscription() {
    console.log(this.finalsubscriptionlist);
    if (this.finalsubscriptionlist.length == 0) {
      this.snackBar.open('please select domains', '', { duration: 3000 });
    } else {
      this.businesslogic.post('post/addmanagesubscriptions',
       {'employeeId': this.sharedservice.login_user_details.user_id,
        'subscribeddomains': this.finalsubscriptionlist, 'singledomainselection': false}).subscribe((response: any) => {
        this.dialogRef.close('success');
      });
    }
  }
  domainsubscribed(subscribeddomain, subcribedornot) {
    if (subcribedornot == true) {
      this.finalsubscriptionlist.push(subscribeddomain);
    } else {
      const index = this.finalsubscriptionlist.indexOf(subscribeddomain);
if (index > -1) {
  this.finalsubscriptionlist.splice(index, 1);
}
    }
  }
  closeDailog (): void {
    this.dialogRef.close('closedwithoutsaving');
  }
}
