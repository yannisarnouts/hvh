import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLoginComponent} from "./components/admin/admin-login/admin-login.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {SubmitArticlesComponent} from "./components/admin/submit-articles/submit-articles.component";
import {PressComponent} from "./components/press/press.component";

const routes: Routes = [
  {path: 'aLogin', component: AdminLoginComponent},
  {path: '', component: HomeComponent},
  {path: 'articles', component: PressComponent},
  {path: 'admin/submitArticles', component: SubmitArticlesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
