import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FinalistService} from "../../services/finalist.service";
import {DialogData} from "../home/home.component";

let finalists = [
  {
    "_id": "62025faf97ecc5dab84e9c05",
    "index": 0,
    "picture": "http://placehold.it/32x32",
    "firstname": "Lee",
    "lastname": "Salinas",
    "company": "VALREDA",
    "category": "public",
    "email": "leesalinas@valreda.com",
    "motivation": "Est nulla dolor laboris proident in aliqua magna deserunt exercitation pariatur qui nisi esse. Adipisicing tempor exercitation reprehenderit quis ad anim consequat esse adipisicing proident in consectetur cupidatat. Id deserunt dolore veniam consequat mollit anim laborum est aliqua ipsum dolore id. Ex voluptate nostrud ad proident nisi ea est irure in dolore deserunt dolor amet qui. Enim sunt nisi incididunt anim dolor eiusmod ut velit. Sit duis ad pariatur veniam sint adipisicing culpa deserunt ipsum consequat dolor occaecat. Exercitation irure nostrud adipisicing dolor voluptate eiusmod ex eu non.\r\n",
    "greeting": "Hello, undefined! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "62025fafc18a89ee1dda2ddf",
    "index": 1,
    "picture": "http://placehold.it/32x32",
    "firstname": "Rebecca",
    "lastname": "Patel",
    "company": "RODEOMAD",
    "category": "public",
    "email": "rebeccapatel@rodeomad.com",
    "motivation": "Deserunt consectetur minim nisi occaecat. Magna aliqua fugiat ad excepteur laboris fugiat laboris laboris aliquip nostrud nisi tempor ullamco. Dolor pariatur sit occaecat deserunt culpa id ut deserunt cupidatat quis proident quis dolore. Elit laborum aliquip tempor consequat irure ullamco labore eu Lorem mollit nostrud deserunt in sint. Lorem officia laboris veniam nisi. Amet consectetur nulla amet ipsum aliqua incididunt excepteur nostrud in aliqua aliquip magna aliquip do.\r\n",
    "greeting": "Hello, undefined! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "62025faf8e78f0fa63533043",
    "index": 2,
    "picture": "http://placehold.it/32x32",
    "firstname": "Emily",
    "lastname": "Scott",
    "company": "CENTURIA",
    "category": "public",
    "email": "emilyscott@centuria.com",
    "motivation": "Dolore sint culpa laboris aute occaecat excepteur consectetur est culpa exercitation. Excepteur enim id adipisicing deserunt. Commodo excepteur aute aliqua veniam. Laboris aliquip cupidatat reprehenderit dolor reprehenderit aliquip amet non veniam officia. Adipisicing in adipisicing in ut ex aliqua tempor cillum mollit incididunt ea. Cupidatat ea id sint deserunt duis.\r\n",
    "greeting": "Hello, undefined! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "62025faf6323a2fd90ad82e1",
    "index": 3,
    "picture": "http://placehold.it/32x32",
    "firstname": "Della",
    "lastname": "Oneal",
    "company": "MANTRO",
    "category": "private",
    "email": "dellaoneal@mantro.com",
    "motivation": "Enim magna qui exercitation minim aliqua cupidatat fugiat minim consectetur. Amet ad dolor esse pariatur ut non laborum pariatur esse. Et mollit reprehenderit ex aliquip voluptate aliqua.\r\n",
    "greeting": "Hello, undefined! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "62025faf433d2027bd3b2030",
    "index": 4,
    "picture": "http://placehold.it/32x32",
    "firstname": "Meadows",
    "lastname": "Cortez",
    "company": "ZENTIX",
    "category": "private",
    "email": "meadowscortez@zentix.com",
    "motivation": "Excepteur tempor esse minim pariatur sunt. Et commodo ea dolor voluptate Lorem et mollit. Id do minim officia nulla sint amet nostrud. Esse voluptate esse eu velit ipsum proident do deserunt pariatur fugiat qui cillum tempor anim. Velit amet magna nostrud cupidatat nulla ex dolore.\r\n",
    "greeting": "Hello, undefined! You have 1 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "62025fafcb39eca129a7336e",
    "index": 5,
    "picture": "http://placehold.it/32x32",
    "firstname": "Bowen",
    "lastname": "Fulton",
    "company": "WEBIOTIC",
    "email": "bowenfulton@webiotic.com",
    "category": "private",
    "motivation": "Occaecat id laborum irure incididunt aute est sint officia velit quis. Amet Lorem pariatur irure sunt mollit ea. Ullamco dolor tempor laboris consequat velit laborum esse magna Lorem anim do. Elit do elit proident enim eiusmod reprehenderit consectetur proident ea sit voluptate ut Lorem.\r\n",
    "greeting": "Hello, undefined! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "62025fafdfa1646845523a57",
    "index": 6,
    "picture": "http://placehold.it/32x32",
    "firstname": "Lena",
    "lastname": "Gordon",
    "company": "ZILLIDIUM",
    "category": "private",
    "email": "lenagordon@zillidium.com",
    "motivation": "Proident veniam quis irure laboris anim id cupidatat eiusmod. Ipsum id qui irure reprehenderit commodo quis eu excepteur officia. Velit reprehenderit aute mollit deserunt quis occaecat voluptate non consectetur amet aute eu velit reprehenderit. Ipsum velit veniam sint anim commodo ut sit. Velit anim culpa ex qui proident exercitation irure.\r\n",
    "greeting": "Hello, undefined! You have 8 unread messages.",
    "favoriteFruit": "apple"
  }
];
@Component({
  selector: 'app-finalists',
  templateUrl: './finalists.component.html',
  styleUrls: ['./finalists.component.css']
})
export class FinalistsComponent implements OnInit {
  firstname: string = "";
  finalists = new Array(); publicFinalists = new Array(); privateFinalists = new Array();
  voterEmail = '';

  constructor(private finalistService: FinalistService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.finalists = finalists;
    this.publicFinalists = this.finalists.filter(f => f.category === 'public');
    this.privateFinalists = this.finalists.filter(f => f.category === 'private');
    console.log(this.finalists);
  }

  openDialog(vote: any): void {
    console.log(vote);
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
        console.log(result.voterEmail + " voted for " + result.firstname + " from company " + result.company);
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
