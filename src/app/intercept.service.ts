import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';


@Injectable()// {providedIn: 'root'}

export class InterceptService implements HttpInterceptor {
  numberofrequest = 0;
  numberofresponse = 0;
  constructor(private sharedService: SharedService
    , private router: Router) { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.numberofrequest++;
    this.sharedService.loading_panel_change(true);
    this.sharedService.notification_status_change(false);
    // if (localStorage.getItem('recruitee-x-auth')) {
    //   request = request.clone({ setHeaders: { 'Authorization': localStorage.getItem('recruitee-x-auth') } });
    // }
    if (request.url === 'http://10.10.0.57:3000/post/getEmployeeDetailsWithToken') {
      request = request.clone({headers: request.headers.set('token', 'bd3e8053dfd4508')});
    } else {
       request = request.clone({headers: request.headers.set('x-auth', localStorage.getItem('xauth'))});
    }
    return next.handle(request)
      .pipe(
        tap(resp => {
          if (resp instanceof HttpResponse) {
            this.numberofresponse++;
            if (!isNullOrUndefined(resp.headers.get('x-auth'))) {
              localStorage.setItem('xauth',  resp.headers.get('x-auth'));
            }
            if (this.numberofrequest === this.numberofresponse) {
              this.numberofrequest = 0;
    this.numberofresponse = 0;
    this.sharedService.loading_panel_change(false);
            } else {
              this.sharedService.loading_panel_change(true);
           }
          }
        }, (err: Response) => {
          this.numberofresponse++;
          this.sharedService.loading_panel_change(false);
          if (err.status === 401) {
            localStorage.clear();
            this.router.navigate(['/']);
          }
        })
      );
  }
}
