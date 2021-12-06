import {Component, OnInit} from '@angular/core';
import { initializeApp } from 'firebase/app';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {NomineeService} from "../services/nominee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'heldenHepdesk';
  nominees: any[] = new Array();

  constructor(private nomineeService: NomineeService){}

  ngOnInit(){
    this.nomineeService.getNominees().subscribe(n => {
      this.nominees.push(n)
      console.log(this.nominees);
    });
  }
}
