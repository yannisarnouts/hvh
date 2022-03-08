import {Component, OnInit} from '@angular/core';
import {ExcelService} from "../../../services/excel.service";
import {FinalistService} from "../../../services/finalist.service";

@Component({
  selector: 'app-admin-finalists',
  templateUrl: './admin-finalists.component.html',
  styleUrls: ['./admin-finalists.component.css']
})
export class AdminFinalistsComponent implements OnInit {
  finalists = new Array();
  votes = new Array();

  constructor(private excelService: ExcelService, private finalistService: FinalistService) {
  }

  ngOnInit(): void {
    this.getFinalists();
    this.getVotes();
  }

  getFinalists() {
    this.finalistService.getFinalists().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        let cont: any = doc.data();
        cont.id = doc.id;
        cont.votes = [];
        this.finalists.push(cont);
      });
      sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
    });
  }

  getVotes() {
    this.finalistService.getFinalistVotes().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        let cont: any = doc.data();
        cont.id = doc.id;
        this.votes.push(cont);
      });
      this.combineVotesToFinalist();
      sessionStorage.setItem('votes', JSON.stringify(this.votes));
    });
  }

  combineVotesToFinalist() {
    for (let i = 0; i < this.finalists.length; i++) {
      this.finalists[i].votes = [];
      for (let vote of this.votes) {
        if (vote.finalistId === this.finalists[i].id) {
          this.finalists[i].votes.push(vote);
        }
      }
    }
    this.finalists.sort((a, b) => {
      return b.votes.length - a.votes.length;
    });
    sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
  }

  exportAsXSLX() {
    this.excelService.exportAsExcelFile(this.finalists, 'finalists');
  }
}
