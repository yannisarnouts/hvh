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
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { ContentComponent } from './components/content/content.component';
import { SubmitContentComponent } from './components/admin/submit-content/submit-content.component';
import { ContentPostComponent } from './components/content-post/content-post.component';
import { NomineesComponent } from './components/admin/nominees/nominees.component';
import { NomineeDetailComponent } from './components/admin/nominee-detail/nominee-detail.component';
import { NgxCaptchaModule } from "ngx-captcha";
import { ContentCmsComponent } from './components/admin/content-cms/content-cms.component';
import { HomeCmsComponent } from './components/admin/home-cms/home-cms.component';
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {FinalistsComponent, VoteDialog} from './components/finalists/finalists.component';
import { AdminFinalistsComponent } from './components/admin/admin-finalists/admin-finalists.component';
import { AdminFinalistDetailComponent } from './components/admin/admin-finalist-detail/admin-finalist-detail.component';
import { AdminContentListComponent } from './components/admin/admin-content-list/admin-content-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NominateDialog,
    VoteDialog,
    AdminLoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ContentComponent,
    SubmitContentComponent,
    ContentPostComponent,
    NomineesComponent,
    NomineeDetailComponent,
    ContentCmsComponent,
    HomeCmsComponent,
    FinalistsComponent,
    AdminFinalistsComponent,
    AdminFinalistDetailComponent,
    AdminContentListComponent
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
    NgxCaptchaModule,
    AngularFireAnalyticsModule
],
  providers: [LoginActivate,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
