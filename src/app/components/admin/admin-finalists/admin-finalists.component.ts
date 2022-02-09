import { Component, OnInit } from '@angular/core';
import {ExcelService} from "../../../services/excel.service";
import {FinalistService} from "../../../services/finalist.service";

@Component({
  selector: 'app-admin-finalists',
  templateUrl: './admin-finalists.component.html',
  styleUrls: ['./admin-finalists.component.css']
})
export class AdminFinalistsComponent implements OnInit {
  finalists = new Array();
  constructor(private excelService: ExcelService, private finalistService: FinalistService) { }

  ngOnInit(): void {
    this.getFinalistsFromSessionStorage();
  }

  getFinalistsFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('finalists') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('finalists');
      this.finalists = JSON.parse(contentsString);
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
      sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
    });
  }
  exportAsXSLX() {
    this.excelService.exportAsExcelFile(this.finalists, 'nominees');
  }

}
