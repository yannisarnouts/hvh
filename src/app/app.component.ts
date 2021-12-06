import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {NomineeService} from "../services/nominee.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";

export interface DialogData {
  firstname: string;
  lastname: string;
  company: string,
  email: string,
  phone: string,
  motivation: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'heldenHepdesk';
  nominees: any[] = new Array();
  firstname: string = "";
  lastname: string = "";
  company: string = "";
  email: string = "";
  phone: string = "";
  motivation: string = "";


  constructor(private nomineeService: NomineeService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NominateDialog, {
      width: '750px',
      data: {firstname: this.firstname, lastname: this.lastname, company: this.company, email: this.email, phone: this.phone, motivation: this.motivation },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.nomineeService.createVote(result);
    });
  }
}
@Component({
  selector: 'nominate-dialog',
  templateUrl: 'nominateDialog.html',
})
export class NominateDialog {
  constructor(
    public dialogRef: MatDialogRef<NominateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  validateForm() {
    if (this.data.firstname.length > 1 && this.data.lastname.length > 1 && this.data.company.length > 1 && this.data.email.length > 1 && this.data.phone.length > 1 && this.data.motivation.length > 1) {
      return false;
    }  else {
      return true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
