import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FinalistService} from "../../services/finalist.service";

@Component({
  selector: 'app-finalists',
  templateUrl: './finalists.component.html',
  styleUrls: ['./finalists.component.css']
})
export class FinalistsComponent implements OnInit {
  firstname: string = "";
  finalists = new Array(); publicFinalists = new Array(); privateFinalists = new Array();
  voterEmail = '';
  showSuccess = false;
  successVisible = false;

  constructor(private finalistService: FinalistService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFinalistsFromSessionStorage();
  }

  getFinalistsFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('finalists') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('finalists');
      this.finalists = JSON.parse(contentsString);
      this.publicFinalists = this.finalists.filter(f => f.category === 'public');
      this.privateFinalists = this.finalists.filter(f => f.category === 'private');
    } else {
      this.getFinalists();
    }
  }
  getFinalists() {
    this.finalistService.getFinalists().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        let cont: any = doc.data();
        cont.id = doc.id;
        cont.fullDate = new Date();
        this.finalists.push(cont);
      });
      this.publicFinalists = this.finalists.filter(f => f.category === 'public');
      this.privateFinalists = this.finalists.filter(f => f.category === 'private');
      sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
    });
  }

  openDialog(vote: any): void {
    const dialogRef = this.dialog.open(VoteDialog, {
      width: '750px',
      data: {
        firstname: vote.firstname,
        lastname: vote.lastname,
        company: vote.company,
        voterEmail: this.voterEmail,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.finalistService.getVote(result.voterEmail).then(docSnapshot => {
          this.successVisible = true;
          if (!docSnapshot.exists) {
            result.date = new Date();
            this.finalistService.createVote(result);
            this.showSuccess = true;
            return;
          } else {
            this.showSuccess = false;
          }
        });
      }
    });
  }
}
export interface VoteDialogData {
  firstname: string;
  lastname: string;
  company: string,
  voterEmail: string,
}
@Component({
  selector: 'vote-dialog',
  templateUrl: 'voteDialog.html',
})
export class VoteDialog {
  errorMessage = '';
  showError = false;
  recaptcha: any;

  constructor(
    public dialogRef: MatDialogRef<VoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: VoteDialogData,
  ) {
  }

  disableForm() {
    if (this.data.voterEmail && this.data.voterEmail.length > 1) {
      if (!this.data.voterEmail.match(/^.+@[a-z]+\.?[a-z]*\.[a-z]{2,}$/g) || this.data.voterEmail.length < 6) {
        this.errorMessage = "E-mail adres is niet geldig";
        this.showError = true;
        return true;
      } else {
        this.showError = false;
        return false;
      }
    } else if (this.recaptcha == undefined) {
      this.errorMessage = "Vink reCAPTCHA aan";
      return true;
    } else {
      this.showError = false;
      return true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
