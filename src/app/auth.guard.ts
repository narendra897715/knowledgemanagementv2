import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private matDialog: MatDialog) { }
  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    // localStorage will not work in SSR, it should check with platform condition.
    if (localStorage.getItem('km-x-auth')) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
