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

  constructor(private nomineeService: NomineeService, private excelService: ExcelService) { }

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
      sessionStorage.setItem('nominees', JSON.stringify(this.nominees));
    });
    this.fullNominees = this.nominees;
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
}
