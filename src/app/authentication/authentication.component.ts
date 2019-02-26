import { Component, OnInit } from '@angular/core';
import {BusinesslogicService} from '../businesslogic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../shared.service';
@Component({
  selector: 'km-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(public businesslogic: BusinesslogicService, public router: Router, public sharedservice: SharedService) { }

  ngOnInit() {
    // if (localStorage.getItem('AuthenticationToken')) {
    //   localStorage.clear();
    //   localStorage.setItem('AuthenticationToken',  window.name);
    // } else {
    //   localStorage.setItem('AuthenticationToken',  window.name);
    // }
    this.businesslogic.get('post/getEmployeeDetailsWithToken'
    ).subscribe((response: any) => {

if (response.length === 0 && localStorage.getItem('AuthenticationToken')) {

localStorage.removeItem('AuthenticationToken');

} else {

console.log(response[0]);
this.sharedservice.loginUserDetails(response[0]);
 this.router.navigate(['km/sidebar/home', 1]);

}
});
  }

}
