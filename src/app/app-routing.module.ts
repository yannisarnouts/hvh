import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLoginComponent} from "./components/admin-login/admin-login.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: 'aLogin', component: AdminLoginComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
