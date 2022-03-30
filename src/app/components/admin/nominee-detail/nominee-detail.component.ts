import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nominee-detail',
  templateUrl: './nominee-detail.component.html',
  styleUrls: ['./nominee-detail.component.css']
})
/*
/admin/nominees/email
Detail page for a specific nominee
 */
export class NomineeDetailComponent implements OnInit {
  nominees = new Array();
  nominee: any;
  allNominators = new Array();
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getNominees();
  }

  getNominee() {
    const id = this.router.url.split("/")[3];
    this.nominee = this.nominees.find(n => n.id == id);
    this.getAllNominators();
  }

  getNominees() {
    let nomineeString = '';
    if (sessionStorage.getItem('nominees') !== null) {
      // @ts-ignore
      nomineeString = sessionStorage.getItem('nominees');
      this.nominees = JSON.parse(nomineeString);
    }
    this.getNominee();
  }
  /*
  Gives an overview of all other times this nominee is nominated
   */
  getAllNominators() {
    this.allNominators = this.nominees.filter(n => n.lastname.toLowerCase().includes(this.nominee.lastname.toLowerCase()));
    this.allNominators = this.allNominators.filter(n => n.firstname.toLowerCase().includes(this.nominee.firstname.toLowerCase()));
    this.allNominators = this.allNominators.filter(n => n.company.toLowerCase().includes(this.nominee.company.toLowerCase()));
  }
}
