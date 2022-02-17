import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {AdminLoginComponent} from "./components/admin/admin-login/admin-login.component";
import {HomeComponent} from "./components/home/home.component";
import {AdminPanelComponent} from "./components/admin/admin-panel/admin-panel.component";
import {AuthService} from "./services/auth.service";
import {ContentComponent} from "./components/content/content.component";
import {SubmitContentComponent} from "./components/admin/submit-content/submit-content.component";
import {ContentPostComponent} from "./components/content-post/content-post.component";
import {NomineesComponent} from "./components/admin/nominees/nominees.component";
import {NomineeDetailComponent} from "./components/admin/nominee-detail/nominee-detail.component";
import {ContentCmsComponent} from "./components/admin/content-cms/content-cms.component";
import {HomeCmsComponent} from "./components/admin/home-cms/home-cms.component";
import {FinalistsComponent} from "./components/finalists/finalists.component";
import {AdminFinalistsComponent} from "./components/admin/admin-finalists/admin-finalists.component";
import {AdminFinalistDetailComponent} from "./components/admin/admin-finalist-detail/admin-finalist-detail.component";
import {AdminContentListComponent} from "./components/admin/admin-content-list/admin-content-list.component";

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const loggedIn = await this.authService.isLoggedIn();
    if (!loggedIn) {
      this.router.navigate(['']);
    }
    return true;
  }
}

const routes: Routes = [
  {path: 'aLogin', component: AdminLoginComponent},
  {path: '', component: HomeComponent},
  {path: 'content', component: ContentComponent},
  {path: 'content/:id', component: ContentPostComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate: [LoginActivate]},
  {path: 'admin/submitContent', component: SubmitContentComponent, canActivate: [LoginActivate]},
  {path: 'admin/contentList', component: AdminContentListComponent, canActivate: [LoginActivate]},
  {path: 'admin/nominees', component: NomineesComponent, canActivate: [LoginActivate]},
  {path: 'admin/nominees/:id', component: NomineeDetailComponent, canActivate: [LoginActivate]},
  {path: 'admin/contentCMS', component: ContentCmsComponent, canActivate: [LoginActivate]},
  {path: 'admin/homeCMS', component: HomeCmsComponent, canActivate: [LoginActivate]},
  {path: 'admin/finalisten', component: AdminFinalistsComponent, canActivate: [LoginActivate]},
  {path: 'admin/finalisten/:id', component: AdminFinalistDetailComponent, canActivate: [LoginActivate]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
