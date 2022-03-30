import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FinalistService} from "../../services/finalist.service";
import {docChanges} from "@angular/fire/compat/firestore";
import {CmsService} from "../../services/cms.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finalists',
  templateUrl: './finalists.component.html',
  styleUrls: ['./finalists.component.css']
})
/*
/finalisten, the finalists overview page
 */
export class FinalistsComponent implements OnInit, AfterViewInit {
  firstname: string = "";
  finalists = new Array();
  voterEmail = '';
  showSuccess = false;
  successVisible = false;
  cmsData: any;
  constructor(private finalistService: FinalistService, public dialog: MatDialog, private cmsService: CmsService, private router: Router) {
  }

  /*
  First try to get data from sessionstorage, else from DB
   */
  ngOnInit(): void {
    this.getCMSFromSessionStorage();
    this.getFinalistsFromSessionStorage();
  }

  ngAfterViewInit(): void {
    console.log(document.getElementsByClassName('sb-icon')[0]);
    for (let i = 0; i < document.getElementsByClassName('sb-icon').length; i++) {
      document.getElementsByClassName('sb-icon')[i].setAttribute('style','width: 2em; min-height: 2em;');
    }
  }

  getFinalistsFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('finalists') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('finalists');
      this.finalists = JSON.parse(contentsString);
      const voteFor = this.router.url.split("#")[1];
      if (voteFor) this.openVoteFor(voteFor);
    } else {
      this.getFinalists();
    }
  }

  getCMSData() {
    this.cmsService.getCMS("finalistCMS").then(docSnapshot => {
      this.cmsData = docSnapshot.data();
      sessionStorage.setItem('finalistCMS', JSON.stringify(this.cmsData));
    });
  }

  getCMSFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('finalistCMS') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('finalistCMS');
      this.cmsData = JSON.parse(contentsString);
    } else {
      this.getCMSData();
    }
  }

  /*
  Get the finalists
  if the URL contains the id of a finalists, automatically open the voting popup
  eg: finalisten#vote=ID
   */
  getFinalists() {
    this.finalistService.getFinalists().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        let cont: any = doc.data();
        cont.id = doc.id;
        cont.fullDate = new Date();
        cont.votes = [];
        this.finalists.push(cont);
      });
      sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
      const voteFor = this.router.url.split("#")[1];
      if (voteFor) this.openVoteFor(voteFor);
    });
  }

  /*
  Open the vote for dialog
   */
  openVoteFor(id: string) {
    const fid = id.split('=')[1];
    console.log(fid);
    const fin = this.finalists.find(f => f.id == fid);
    this.openDialog(fin)
  }

  shareFinalistURL(fid: string) {
    return window.location.href + '#vote=' + fid;
  }
  /*
  This passes the data to the VoteDialog class
  after closed, check if the email doesn't exist already in betwee the votes
  If not: create the vote
   */
  openDialog(vote: any): void {
    const dialogRef = this.dialog.open(VoteDialog, {
      width: '750px',
      data: {
        firstname: vote.firstname,
        lastname: vote.lastname,
        company: vote.company,
        voterEmail: this.voterEmail,
        finalistId: vote.id,
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

  /*
  Disable form if the email is not filled in correctly
   */
  disableForm() {
    if (this.data.voterEmail && this.data.voterEmail.length > 6) {
      if (!this.data.voterEmail.match(/^.+@[a-z]+\.?[a-z]*\.[a-z]{2,}$/g) || this.data.voterEmail.length < 6) {
        // this.errorMessage = "E-mail adres is niet geldig";
        this.showError = true;
        return true;
      }
      else {
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
