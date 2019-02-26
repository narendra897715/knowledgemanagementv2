import { Component, OnInit, ViewEncapsulation, HostBinding, ChangeDetectorRef, OnDestroy, NgZone, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import {BusinesslogicService} from '../businesslogic.service';
import { Subscription } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../shared.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
import {ReadmorepostComponent} from '../readmorepost/readmorepost.component';
@Component({
  selector: 'km-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') role = 'section main hbox space-between';
  newpostsub: Subscription;
  public dom: Document;
  postSubscription: Subscription;
  likedpost: any;
  selecteddomaindata = {};
  subscribeddomain = [];
  currentqueryparamsdomain = 0;
  // selecteddomainname: string;
  currentroutecategory = 1;
  showdomainnameandsubscription = false;
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,
              public businesslogic: BusinesslogicService, public activatedroute: ActivatedRoute, public nz: NgZone,
              public ref: ChangeDetectorRef, public sharedservice: SharedService, public router: Router, private sanitizer: DomSanitizer,
              @Inject(DOCUMENT) dom: Document) {
                this.dom = dom;
   }

  ngOnInit() {
    if (this.activatedroute.snapshot.url[0].path === 'mypost') {
      this.activatedroute.params.subscribe((params) => {
        console.log(params);
      this.getmyposts(params.categoryid, this.sharedservice.login_user_details.user_id);
      });
    } else if (this.activatedroute.snapshot.url[0].path === 'home') {
      this.activatedroute.params.subscribe((params) => {
        console.log(params);
      this.getAllPosts(params.categoryid, this.sharedservice.login_user_details.user_id);
      });
    } else {
      this.activatedroute.params.subscribe((routeParams) => {
        this.activatedroute.queryParams.subscribe(Queryparams => {

        if ( this.activatedroute.snapshot.params.categoryid ===  routeParams.categoryid) {
          this.displaySelectedDomainData(routeParams.categoryid, Queryparams.domainId);

        }
       // this.displaySelectedDomainData(routeParams.categoryid, Queryparams.domainId);
     //   this.currentqueryparamsdomain = Queryparams.domainId;
      });
      });
    }
  }

  getmyposts(categoryid, employeeid) {
    this.postSubscription = this.businesslogic.post('post/getmyposts',
     {'categoryId': categoryid, 'employeeId': employeeid}).subscribe((result: any) => {
this.sharedservice.postChange(result);
     });
  }

  copylinktoclipboard(id) {
    let element = null; // Should be <textarea> or <input>
    try {
        element = this.dom.getElementById(id);
        element.select();
        this.dom.execCommand('copy');
    
    }
    finally {
       this.dom.getSelection().removeAllRanges;
    }
  }
  getAllPosts(categoryid, employeeid) {
    this.postSubscription = this.businesslogic.post('post/getallposts',
    {'categoryId': categoryid, 'employeeId': employeeid}).subscribe((result: any) => {
      console.log(result.length);
this.sharedservice.postChange(result);
    });
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  displaySelectedDomainData(categoryid, domainid) {
    console.log(domainid);
    if(domainid.length == 0 ) {
      this.activatedroute.params.subscribe((params) => {
        console.log(params);
      this.getAllPosts(params.categoryid, this.sharedservice.login_user_details.user_id);
      });

    } else {
      this.postSubscription = this.businesslogic.post('post/getpostsfiltersbydomains', {'categoryId': categoryid,
      'employeeId': this.sharedservice.login_user_details.user_id,
      'filterdomainids': domainid}).subscribe((response: any) => {
        this.sharedservice.postChange(response);
        console.log(response);
      });
    }
    // this.postSubscription = this.businesslogic.post('post/getPostswithSelectedDomains',
    //  {'categoryId': categoryid, 'domainId': domainid,
    //   'employeeId': this.sharedservice.login_user_details.user_id}).subscribe((result: any) => {
    //   console.log(result);
    //   this.showdomainnameandsubscription = true;
    //   this.selecteddomaindata = result[0].domainData;
    //   // this.selecteddomainname = result[0].domainname;
    //   // this.selecteddomainsubscription = result[0].subscribed;
    //   this.sharedservice.subscriptionchanged(result[0].subscribed);
    //   this.sharedservice.postChange(result[0].postdata);
    //  });
    
  }
  editthepost(datatoedit) {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '60%', data: datatoedit
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        if (this.router.url.indexOf('mypost') > -1) {
          this.getmyposts(1, this.sharedservice.login_user_details.user_id);
        } else if (this.router.url.indexOf('home') > -1) {
          this.getAllPosts(1, this.sharedservice.login_user_details.user_id);
        } else  {
          this.activatedroute.queryParams.subscribe(Queryparams => {
              if ((Object.keys(Queryparams).length) !== 0) {
                this.displaySelectedDomainData(1, Queryparams.domainId);
              }
            });
        }
        // this.businesslogic.newPostAdded(1);
         this.snackBar.open('post added successfully', '', { duration: 3000 });
      } else {
        console.log('closed dailog');
      }
    });
  }

  readMoreAboutPost(postid) {
    const dialogRef = this.dialog.open(ReadmorepostComponent, {
      width: '60%', data: postid
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  likesThePost(likedpost, likeStatus) {
    this.postSubscription = this.businesslogic.post('post/likesthepost',
     {'likedpostId': likedpost,
      'likedBy': this.sharedservice.login_user_details.user_id, 'likesstatus': !likeStatus}).subscribe((result: any) => {
     console.log(result);
     this.sharedservice.postdata.map((item, i) => {
      if (item.postId === result.postId) {
        this.sharedservice.postdata[i].likeStatus =  result.status;
        this.sharedservice.postdata[i].likes = result.likesArray;
   }
    });
     });
  }

  followThePost(followingPost, followStatus) {
    this.postSubscription = this.businesslogic.post('post/followthepost',
    {'followingpostId': followingPost,
     'followedBy': this.sharedservice.login_user_details.user_id, 'followingstatus': !followStatus}).subscribe((result: any) => {
    console.log(result);
    this.sharedservice.postdata.map((item, i) => {
     if (item.postId === result.postId) {
      this.sharedservice.postdata[i].followStatus =  result.status;
      this.sharedservice.postdata[i].followers = result.followersArray;
 }
   });
  });
  }

  onChange(data, domainid ) {
    this.subscribeddomain = [];
    this.subscribeddomain.push(domainid);
    this.businesslogic.post('post/addmanagesubscriptions',
     {'employeeId': this.sharedservice.login_user_details.user_id, 'subscribeddomains': this.subscribeddomain,
     'singledomainselection': true, 'subscribedornot': data}).subscribe((response: any) => {
      // this.dialogRef.close('posted succesfully');
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
