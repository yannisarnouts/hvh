import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nominee-detail',
  templateUrl: './nominee-detail.component.html',
  styleUrls: ['./nominee-detail.component.css']
})
export class NomineeDetailComponent implements OnInit {
  nominees = new Array();
  nominee: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getNominees();
    this.getNominee();
  }

  getNominee() {
    const id = this.router.url.split("/")[3];
    this.nominee = this.nominees.find(n => n.id == id);
    console.log(this.nominee);
  }

  getNominees() {
    let nomineeString = '';
    if (sessionStorage.getItem('nominees') !== null) {
      // @ts-ignore
      nomineeString = sessionStorage.getItem('nominees');
      this.nominees = JSON.parse(nomineeString);
    }
  }

}
