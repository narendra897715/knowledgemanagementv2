import { Component, OnInit } from '@angular/core';
import {MatDialogRef } from '@angular/material';
import {BusinesslogicService} from '../businesslogic.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import {Idomainlist } from './../app.interface';
import {SharedService} from '../shared.service';
@Component({
  selector: 'km-filterposts-bydomains',
  templateUrl: './filterposts-bydomains.component.html',
  styleUrls: ['./filterposts-bydomains.component.scss']
})
export class FilterpostsBydomainsComponent implements OnInit {
  domainslist: Idomainlist[] ;
  domainSubscription: Subscription;
  filtereddomains = [];
  constructor(public dialogRef: MatDialogRef<FilterpostsBydomainsComponent>,
     public businesslogic: BusinesslogicService, public snackBar: MatSnackBar, public sharedservice: SharedService ) {

   }

  ngOnInit() {
    this.domainSubscription = this.businesslogic.get('post/getDomainList').subscribe((result: any) => {
      this.domainslist = result;
      // this.filteredDomains = this.domainslist;
      });
  }
  domainsubscribed(domainid) {
    this.filtereddomains.push(domainid);
  }
  filterposts() {
    this.businesslogic.post('post/getpostsfiltersbydomains', {'employeeId': this.sharedservice.login_user_details.user_id,
    'filterdomainids':  this.filtereddomains}).subscribe((response: any) => {
      console.log(response);
      this.dialogRef.close('success');
    });
  }
  closeDailog (): void {
    this.dialogRef.close('closedwithoutsaving');
  }
}
