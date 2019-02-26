import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivationEnd } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { isNullOrUndefined } from 'util';
import { SharedService } from './shared.service';
import { KnowledgeManagementComponent } from './knowledge-management/knowledge-management.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { AuthenticationComponent } from './authentication/authentication.component';
const routes: Routes = [

  { path: '', redirectTo: 'km', pathMatch: 'full' }
  , { path: 'km', component: KnowledgeManagementComponent, children: [
    {path: '', redirectTo: 'authenticate', pathMatch: 'full'},
    {path: 'authenticate', component: AuthenticationComponent},
    { path: 'sidebar', component: SidebarComponent, children: [
      {path: 'home/:categoryid', component: PostComponent},
       {path: 'mypost/:categoryid', component: PostComponent},
       {path: 'domains/:categoryid', component: PostComponent}
    ] },
  ] }
  , { path: '**', redirectTo: 'not-found' },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private router: Router
    , private sharedService: SharedService) {
    this.router.events.subscribe((val) => {
     // this.sharedService.loading_panel_change(false);
      if (val instanceof ActivationEnd) {
        if (!isNullOrUndefined(val.snapshot.data.screen_active_path)) {
          this.sharedService.menu_activated_url_change(val.snapshot.data.screen_active_path);
        }
      //  this.sharedService.loading_panel_change(true);
      }
    });
  }
}
