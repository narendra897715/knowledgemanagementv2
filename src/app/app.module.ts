import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserIdleModule } from 'angular-user-idle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelService } from './excel.service';
import { SharedService } from './shared.service';
import { AuthGuard } from './auth.guard';
import { BusinesslogicService } from './businesslogic.service';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { InterceptService } from './intercept.service';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HighlightPipe } from './highlight.pipe';
import { MaterialModule } from './material';
import { KnowledgeManagementComponent } from './knowledge-management/knowledge-management.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { TimeoutDialogComponent } from './timeout-dialog/timeout-dialog.component';
import { PostComponent } from './post/post.component';
import { ManageSubscriptionComponent } from './manage-subscription/manage-subscription.component';
import { NewPostComponent } from './new-post/new-post.component';

import {ImageUploadService} from './imageUpload.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FilterpostsBydomainsComponent } from './filterposts-bydomains/filterposts-bydomains.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ReadmorepostComponent } from './readmorepost/readmorepost.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};
@NgModule({
  declarations: [
    HighlightPipe,
    AppComponent,
    KnowledgeManagementComponent,
    NotFoundComponent,
    ConfirmationDialogComponent,
    NotificationDialogComponent,
    TimeoutDialogComponent,
    PostComponent,
    ManageSubscriptionComponent,
    NewPostComponent,
    SidebarComponent,
    FilterpostsBydomainsComponent,
    AuthenticationComponent,
    ReadmorepostComponent
  ],
  imports: [
    UserIdleModule.forRoot({ idle: 570, timeout: 30, ping: 10 }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  providers: [
    ExcelService
    , SharedService
    , AuthGuard
    , BusinesslogicService,
    ImageUploadService
    , { provide: ErrorHandler, useClass: GlobalErrorHandler }
    , { provide: LocationStrategy, useClass: HashLocationStrategy }
    , InterceptService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    NotificationDialogComponent,
    TimeoutDialogComponent,
    ManageSubscriptionComponent,
    NewPostComponent,
    FilterpostsBydomainsComponent,
    ReadmorepostComponent
  ]
})
export class AppModule { }
