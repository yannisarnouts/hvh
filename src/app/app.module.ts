import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule, LoginActivate} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment.prod";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {HomeComponent, NominateDialog} from './components/home/home.component';
import { SubmitArticlesComponent } from './components/admin/submit-articles/submit-articles.component';
import { PressComponent } from './components/press/press.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NominateDialog,
    AdminLoginComponent,
    HomeComponent,
    SubmitArticlesComponent,
    PressComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
],
  providers: [LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
