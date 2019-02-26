import { Component, OnInit, Inject } from '@angular/core';
import { BusinesslogicService } from '../businesslogic.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import {SharedService} from '../shared.service';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'km-readmorepost',
  templateUrl: './readmorepost.component.html',
  styleUrls: ['./readmorepost.component.scss']
})
export class ReadmorepostComponent implements OnInit {
postDetailsMethodSubscription: Subscription;
postCompleteData =  {};
  constructor(public businesslogic: BusinesslogicService, @Inject(MAT_DIALOG_DATA) public postid: any,
  public sharedservice: SharedService, private sanitizer: DomSanitizer ) {

   }

  ngOnInit() {
    console.log(this.postid);
    this.getpostdetails();
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  getpostdetails() {
   this.postDetailsMethodSubscription = this.businesslogic.post('post/getPostDetailsById',
    {'postid': this.postid, 'employeeid': this.sharedservice.login_user_details.user_id}).subscribe((result: any) => {
    this.postCompleteData = result[0];
  });
  }
}
