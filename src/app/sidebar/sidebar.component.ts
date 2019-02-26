import { Component, OnInit, ViewChild, ViewEncapsulation, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Idomainlist, IcategoryList } from './../app.interface';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BusinesslogicService } from '../businesslogic.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageSubscriptionComponent } from '../manage-subscription/manage-subscription.component';
import {FilterpostsBydomainsComponent} from '../filterposts-bydomains/filterposts-bydomains.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { PostComponent } from './../post/post.component';
import { ContentChild } from '@angular/core';
import {SharedService} from '../shared.service';
@Component({
  selector: 'km-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [PostComponent],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') role = 'section main hbox space-between';
  @ViewChild(PostComponent) child: PostComponent;
  @ContentChild(PostComponent)
private childComponent: PostComponent;
  mobileQuery: MediaQueryList;
  showorhidedomainslist = true;
  categoryList: IcategoryList[];
  sortitems: any;
  domainSubscription: Subscription;
  categoriesSubscription: Subscription;
  querysubscription: Subscription;
  domainList: Idomainlist[];
  categoryname = 'All';
  categoryid = 1;
  domainids = [];
  opened: boolean;
  showmenuhideandshow = false;
  selecteddomainList = [];
  currenturlarray = [];
  currenturlcategory: any;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog, public snackBar: MatSnackBar,
    public businesslogic: BusinesslogicService, public router: Router, public activatedroute: ActivatedRoute,
     public sharedservice: SharedService ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    if (this.mobileQuery.matches) {
      this.opened = false;
    } else {
      this.opened = true;
    }
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    // if (localStorage.getItem('AuthenticationToken')) {
    //   localStorage.clear();
    //   localStorage.setItem('AuthenticationToken',  window.name);
    // } else {
    //   localStorage.setItem('AuthenticationToken',  window.name);
    // }
//     this.businesslogic.get('post/getEmployeeDetailsWithToken'
//     ).subscribe((response: any) => {

// if (response.length === 0 && localStorage.getItem('AuthenticationToken')) {

// localStorage.removeItem('AuthenticationToken');

// } else {
// console.log(response[0]);
// this.sharedservice.loginUserDetails(response[0]);

// }
// });
this.getDomainList();
this.getCategoryList();
this.currenturlarray = this.router.url.split('/');
this.currenturlcategory = this.currenturlarray[this.currenturlarray.length - 1];
this.showrelaventcategoryposts('All', this.currenturlcategory);
  // this.router.navigate(['km/sidebar/home', 1]);
    this.sortitems = [{ optionname: 'New', optionid: 1 }, { optionname: 'Trending', optionid: 2 }];
  }
  ngOnDestroy(): void {
    this.domainSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.querysubscription.unsubscribe();
  }
  getDomainList() {
    this.domainSubscription = this.businesslogic.get('post/getDomainList').subscribe((result: any) => {
      this.domainList = result;
      this.selecteddomainList = JSON.parse(JSON.stringify(this.domainList));
      this.selecteddomainList.forEach((value, index) => {
         this.selecteddomainList[index].selecteddomain = false;
      });
      console.log(this.selecteddomainList);
    });
  }
  getCategoryList() {
    this.categoriesSubscription = this.businesslogic.get('post/getCategoryList').subscribe((result: any) => {
      this.categoryList = result;
    });
  }
  showrelaventcategoryposts(categoryname, categoryid) {
    // this.router.navigate(['km/sidebar/home', 1]);
      this.categoryid = categoryid;
    if (this.router.url.indexOf('mypost') > -1) {
      this.categoryname = categoryname;
      // this.domainid = 0;
      this.router.navigate(['km/sidebar/mypost', categoryid]);
    } else if (this.router.url.indexOf('home') > -1) {
      this.categoryname = categoryname;
      // this.domainid = 0;
      this.router.navigate(['km/sidebar/home', categoryid]);
    } else if (this.router.url.indexOf('domains') > -1) {
      this.categoryname = categoryname;
      const queryParams123 = this.activatedroute.snapshot.queryParams;
    //  this.domainid = queryParams123.domainId;
      this.router.navigate(['km/sidebar/domains', categoryid], { queryParams: { domainId: queryParams123.domainId } });
    // this.querysubscription =   this.activatedroute.queryParams.subscribe(Queryparams => {
    //       if ((Object.keys(Queryparams).length) !== 0) {
    //         this.domainid = Queryparams.domainId;
    //         this.router.navigate(['km/sidebar/domains', categoryid], { queryParams: { domainId: Queryparams.domainId } });

    //       }
    //     });
    } else {
      this.router.navigate(['km/sidebar/home', 1]);
    }


  }
  mypost(categoryname, categoryid) {
   // this.domainid = 0;
   this.selecteddomainList.forEach((item, index) => {
    this.selecteddomainList[index].selecteddomain = false;
});
this.categoryid = categoryid;
    this.router.navigate(['km/sidebar/mypost', categoryid]);
  }
  homePosts(categoryname, categoryid) {
   // this.domainid = 0;
   this.selecteddomainList.forEach((item, index) => {
        this.selecteddomainList[index].selecteddomain = false;
    });
    this.categoryid = categoryid;
    this.router.navigate(['km/sidebar/home', categoryid]);
  }
  showmenu() {
    this.showmenuhideandshow = !this.showmenuhideandshow;
  }
  displaySelectedDomainData(domainID, domainselected) {
    if (domainselected === false) {
      this.domainids.push(domainID);
    } else {
      const index = this.domainids.indexOf(domainID);
      if (index >= 0) {
        this.domainids.splice(index, 1);
      }
    }
    this.selecteddomainList.filter((item, index) => {
    if (item.domainId === domainID) {
      if (item.selecteddomain === false) {
        this.selecteddomainList[index].selecteddomain = true;
      } else {
        this.selecteddomainList[index].selecteddomain = false;
      }
    }
  }
  );
    this.router.navigate(['km/sidebar/domains', this.categoryid ], { queryParams: { domainId:  this.domainids } });
  }
  filterpostsbydomains() {
    const dialogRef = this.dialog.open(FilterpostsBydomainsComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // if (this.router.url.indexOf('domains') > -1){
        //   this.activatedroute.queryParams
        //   .subscribe(Queryparams => {
        //     if ((Object.keys(Queryparams).length) !== 0) {
        //       this.childComponent.displaySelectedDomainData(1, Queryparams.domainId);
        //     }
        //   });
        //   this.snackBar.open('Your subscription preferences have been saved', '', { duration: 3000 });
        // }
      } else {
        console.log('closed dailog');
      }
    });
  }
  managesubscription() {
    const dialogRef = this.dialog.open(ManageSubscriptionComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        if (this.router.url.indexOf('domains') > -1) {
          this.activatedroute.queryParams
          .subscribe(Queryparams => {
            if ((Object.keys(Queryparams).length) !== 0) {
              this.childComponent.displaySelectedDomainData(1, Queryparams.domainId);
            }
          });
          this.snackBar.open('Your subscription preferences have been saved', '', { duration: 3000 });
        }
      } else {
        console.log('closed dailog');
      }
    });
  }
  newpost() {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '60%', data: null,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        if (this.router.url.indexOf('mypost') > -1) {
          this.childComponent.getmyposts(1, this.sharedservice.login_user_details.user_id);
        } else if (this.router.url.indexOf('home') > -1) {
          this.childComponent.getAllPosts(1, this.sharedservice.login_user_details.user_id);
        } else  {
          this.activatedroute.queryParams
            .subscribe(Queryparams => {
              if ((Object.keys(Queryparams).length) !== 0) {
                this.childComponent.displaySelectedDomainData(1, Queryparams.domainId);
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

}
