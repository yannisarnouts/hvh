import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {AdminLoginComponent} from "./components/admin/admin-login/admin-login.component";
import {HomeComponent} from "./components/home/home.component";
import {SubmitArticlesComponent} from "./components/admin/submit-articles/submit-articles.component";
import {PressComponent} from "./components/press/press.component";
import {AdminPanelComponent} from "./components/admin/admin-panel/admin-panel.component";
import {AuthService} from "./services/auth.service";

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
  {path: 'articles', component: PressComponent},
  {path: 'admin/submitArticles', component: SubmitArticlesComponent, canActivate: [LoginActivate]},
  {path: 'admin', component: AdminPanelComponent, canActivate: [LoginActivate]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
