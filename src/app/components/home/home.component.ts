import {Component, Inject, OnInit} from '@angular/core';
import {NomineeService} from "../../services/nominee.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CmsService} from "../../services/cms.service";
import {environment} from "../../../environments/environment.prod";
import {DomSanitizer} from "@angular/platform-browser";

export interface DialogData {
  firstname: string;
  lastname: string;
  company: string,
  email: string,
  phone: string,
  motivation: string,
  reCAPTCHA: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/*
The home page
 */
export class HomeComponent implements OnInit {
  nominees: any[] = new Array();
  firstname: string = "";
  lastname: string = "";
  company: string = "";
  email: string = "";
  phone: string = "";
  motivation: string = "";
  showSuccess = false;
  showError = false;
  cmsData: any; showIframe = false;
  env = environment;
  videoSrc: any;

  constructor(private nomineeService: NomineeService, public dialog: MatDialog, private cmsService: CmsService, public sanitizer: DomSanitizer) {
  }

  /*
  First retrieve the CMS data from session storage, else from the DB
   */
  ngOnInit(): void {
    this.getCMSFromSessionStorage();
    this.showIframe = navigator.userAgent.indexOf("Firefox") == -1;
  }

  getCMSData() {
    this.cmsService.getCMS("homeCMS").then(docSnapshot => {
      this.cmsData = docSnapshot.data();
      sessionStorage.setItem('homeCMS', JSON.stringify(this.cmsData));
      this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.cmsData.video.src);
    });
  }

  getCMSFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('homeCMS') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('homeCMS');
      this.cmsData = JSON.parse(contentsString);
      this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.cmsData.video.src);
    } else {
      this.getCMSData();
    }
  }

  /*
  Opendialog opens a popup, this popup is to nominate your helpdesk hero
  afterClosed checks if the voter already voted, you can't vote multiple times with the same email
  If that's not the case it creates a vote.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(NominateDialog, {
      width: '750px',
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        company: this.company,
        email: this.email,
        phone: this.phone,
        motivation: this.motivation,
        reCAPTCHA: this.cmsData.reCAPTCHA
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.nomineeService.getNominee(result.email).then(docSnapshot => {
          if (!docSnapshot.exists) {
            result.date = new Date();
            this.nomineeService.createVote(result);
            this.showSuccess = true;
            return;
          } else {
            this.showError = true;
          }
        });
      }
    });
  }

}

@Component({
  selector: 'nominate-dialog',
  templateUrl: 'nominateDialog.html',
})
export class NominateDialog {
  errorMessage = '';
  showError = false;
  recaptcha: any;

  constructor(
    public dialogRef: MatDialogRef<NominateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    console.log(this.data);
  }

  /*
  The form can only be sumbitted if certain fields are filled in correctly
   */
  disableForm() {
    if (this.data.firstname.length > 1 && this.data.lastname.length > 1 && this.data.company.length > 1 && this.data.email.length > 1 && this.data.phone.length > 1 && this.data.motivation.length > 1) {
      if (!this.data.email.match(/^.+@[a-z]+\.?[a-z]*\.[a-z]{2,}$/g) || this.data.email.length < 6) {
        this.errorMessage = "E-mail adres is niet geldig";
        this.showError = true;
        return true;
      } else if (!this.data.phone.match(/^\+?[0-9]+$/g) || this.data.phone.length < 7 || this.data.phone.length > 16) {
        this.errorMessage = "Telefoonnummer is niet geldig";
        this.showError = true;
        return true;
      } else if (this.recaptcha == undefined) {
        this.errorMessage = "Vink reCAPTCHA aan";
        return true;
      } else {
        this.showError = false;
        return false;
      }
    } else {
      this.showError = false;
      return true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
