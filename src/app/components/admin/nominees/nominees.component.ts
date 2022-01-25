import { Component, OnInit } from '@angular/core';
import {NomineeService} from "../../../services/nominee.service";
import {ExcelService} from "../../../services/excel.service";

@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.component.html',
  styleUrls: ['./nominees.component.css']
})
export class NomineesComponent implements OnInit {
  nominees = new Array();
  fullNominees = new Array();
  searchValue = ''; searchBy = 'email';
  searchNominees = new Array();
  nomineesSessionStorage = new Array();

  constructor(private nomineeService: NomineeService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.getContentsFromSessionStorage();
  }

  getNominees() {
    if (this.nomineesSessionStorage.length > 0) {
      this.nominees = this.nomineesSessionStorage;
    } else {
      this.nomineeService.getNominees().subscribe((querySnapshot) => {
        querySnapshot.forEach(doc => {
          let cont: any = doc.data();
          cont.id = doc.id;
          cont.date = this.toDateTime(cont.date.seconds);
          this.nominees.push(cont);
        });
        sessionStorage.setItem('nominees', JSON.stringify(this.nominees));
      });
    }
    this.fullNominees = this.nominees;
  }

  getContentsFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('nominees') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('nominees');
      this.nomineesSessionStorage = JSON.parse(contentsString);
    }
    this.getNominees();
  }

  searchNominee() {
    this.searchNominees = [];
    switch (this.searchBy) {
      case 'email':
        this.searchNominees = this.fullNominees.filter(n => n.email.toLowerCase().includes(this.searchValue.toLowerCase()));
        break;
      case 'firstname':
        this.searchNominees = this.fullNominees.filter(n => n.firstname.toLowerCase().includes(this.searchValue.toLowerCase()));
        break;
      case 'lastname':
        this.searchNominees = this.fullNominees.filter(n => n.lastname.toLowerCase().includes(this.searchValue.toLowerCase()));
        break;
      case 'company':
        this.searchNominees = this.fullNominees.filter(n => n.company.toLowerCase().includes(this.searchValue.toLowerCase()));
        break;
    }
    this.nominees = this.searchNominees;
  }

  exportAsXSLX() {
    this.excelService.exportAsExcelFile(this.nominees, 'nominees');
  }

  toDateTime(secs: any) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toLocaleDateString("nl-BE");
  }
}
