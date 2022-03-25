import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FinalistService} from "../../../services/finalist.service";

@Component({
  selector: 'app-admin-finalist-detail',
  templateUrl: './admin-finalist-detail.component.html',
  styleUrls: ['./admin-finalist-detail.component.css']
})
export class AdminFinalistDetailComponent implements OnInit {
  finalist: any;
  finalists = new Array();

  constructor(private router: Router, private finalistService: FinalistService) { }

  ngOnInit(): void {
    this.getFinalists()
  }

  getFinalist() {
    const id = this.router.url.split("/")[3];
    this.finalist = this.finalists.find(n => n.id == id);
  }
  getFinalists() {
    let nomineeString = '';
    if (sessionStorage.getItem('finalists') !== null) {
      // @ts-ignore
      nomineeString = sessionStorage.getItem('finalists');
      this.finalists = JSON.parse(nomineeString);
    }
    this.getFinalist();
  }
  toDateTime(secs: any) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toLocaleDateString("nl-BE");
  }
  deleteVote(id: string) {
    var doDelete = confirm("Delete nominee?");
    if (doDelete) {
      sessionStorage.removeItem("nominees");
      let rmIndex = this.finalist.votes.findIndex((el: { id: string; }) => el.id === id);
      this.finalist.votes.slice(rmIndex, 1);
      sessionStorage.setItem("editFinalist", JSON.parse(this.finalist));
      this.finalistService.deleteVote(id).then(res => {
        location.reload();
      });
    }
  }
}
