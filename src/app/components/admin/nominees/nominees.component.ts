import { Component, OnInit } from '@angular/core';
import {NomineeService} from "../../../services/nominee.service";

@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.component.html',
  styleUrls: ['./nominees.component.css']
})
export class NomineesComponent implements OnInit {
  nominees = new Array();
  searchValue = '';

  constructor(private nomineeService: NomineeService) { }

  ngOnInit(): void {
    this.getNominees();
  }

  getNominees() {
    this.nomineeService.getNominees().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        let cont: any = doc.data();
        cont.id = doc.id;
        cont.fullDate = new Date(cont.date);
        this.nominees.push(cont);
      });
    });
  }

  searchNominee() {
    console.log(this.searchValue);
    this.nomineeService.getNomineeBy(this.searchValue).then(res => {
      console.log(res.docs);
    });
  }
}
