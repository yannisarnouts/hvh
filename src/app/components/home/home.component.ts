import {Component, Inject, OnInit} from '@angular/core';
import {NomineeService} from "../../services/nominee.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  firstname: string;
  lastname: string;
  company: string,
  email: string,
  phone: string,
  motivation: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nominees: any[] = new Array();
  firstname: string = "";
  lastname: string = "";
  company: string = "";
  email: string = "";
  phone: string = "";
  motivation: string = "";
  showSuccess = false; showError = false;

  constructor(private nomineeService: NomineeService, public dialog: MatDialog) {}

  ngOnInit(): void {}


  openDialog(): void {
    const dialogRef = this.dialog.open(NominateDialog, {
      width: '750px',
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        company: this.company,
        email: this.email,
        phone: this.phone,
        motivation: this.motivation
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.nomineeService.getNominee(result.email).subscribe(res => {
          if (res === undefined) {
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
  constructor(
    public dialogRef: MatDialogRef<NominateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

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
      } else {
        this.showError = false;
        return false;
      }
    }  else {
      this.showError = false;
      return true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
