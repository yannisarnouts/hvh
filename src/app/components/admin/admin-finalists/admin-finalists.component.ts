import {AfterViewInit, Component, OnInit} from '@angular/core';
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
  editFinalist(id: string) {
    let editFinalist = this.finalists.find(f => f.id === id);
    sessionStorage.setItem('editFinalist', JSON.stringify(editFinalist));
    location.replace("/admin/editFinalist/" + id);
    // href="/admin/editContent/{{content.id}}"
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
      this.finalists[i].nrVotes = this.finalists[i].votes.length;
    }
    this.finalists.sort((a, b) => {
      return b.votes.length - a.votes.length;
    });
    sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
  }
  deleteFinalist(id: string) {
    var doDelete = confirm("Delete finalist?");
    if (doDelete) {
      sessionStorage.removeItem("finalists");
      this.finalistService.deleteFinalist(id).then(res => {
        location.reload();
      });
    }
  }

  exportAsXSLX() {
    this.excelService.exportAsExcelFile(this.finalists, 'finalists');
  }
}
