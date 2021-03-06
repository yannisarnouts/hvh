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
import {AdminContentListComponent} from "./components/admin/admin-content-list/admin-content-list.component";
import {EditContentComponent} from "./components/admin/edit-content/edit-content.component";
import {SubmitFinalistComponent} from "./components/admin/submit-finalist/submit-finalist.component";
import {FinalistCmsComponent} from "./components/admin/finalist-cms/finalist-cms.component";
import {EditFinalistComponent} from "./components/admin/edit-finalist/edit-finalist.component";
import {AdminPagesComponent} from "./components/admin/admin-pages/admin-pages.component";

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
/*
The canActivate checks what type of user can acces specific pages.
Admin pages can only be accessed by logged in users.
 */
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
  {path: 'finalisten', component: FinalistsComponent},
  {path: 'content/:id', component: ContentPostComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate: [LoginActivate]},
  {path: 'admin/submitContent', component: SubmitContentComponent, canActivate: [LoginActivate]},
  {path: 'admin/editContent/:id', component: EditContentComponent, canActivate: [LoginActivate]},
  {path: 'admin/contentList', component: AdminContentListComponent, canActivate: [LoginActivate]},
  {path: 'admin/nominees', component: NomineesComponent, canActivate: [LoginActivate]},
  {path: 'admin/nominees/:id', component: NomineeDetailComponent, canActivate: [LoginActivate]},
  {path: 'admin/contentCMS', component: ContentCmsComponent, canActivate: [LoginActivate]},
  {path: 'admin/homeCMS', component: HomeCmsComponent, canActivate: [LoginActivate]},
  {path: 'admin/finalistCMS', component: FinalistCmsComponent, canActivate: [LoginActivate]},
  {path: 'admin/finalisten', component: AdminFinalistsComponent, canActivate: [LoginActivate]},
  {path: 'admin/editFinalist/:id', component: EditFinalistComponent, canActivate: [LoginActivate]},
  {path: 'admin/submitFinalists', component: SubmitFinalistComponent, canActivate: [LoginActivate]},
  {path: 'admin/pages', component: AdminPagesComponent, canActivate: [LoginActivate]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
