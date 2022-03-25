import { Component, OnInit } from '@angular/core';
import {Finalist} from "../submit-finalist/submit-finalist.component";
import {FinalistService} from "../../../services/finalist.service";

@Component({
  selector: 'app-edit-finalist',
  templateUrl: './edit-finalist.component.html',
  styleUrls: ['./edit-finalist.component.css']
})
export class EditFinalistComponent implements OnInit {
  finalist: any; //Finalist = {firstname: '', lastname: '', company: '', motivation: '', img: ''};
  submitted = false;

  constructor(private finalistService: FinalistService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('editFinalist') !== null) {
      let contentsString = sessionStorage.getItem('editFinalist');
      // @ts-ignore
      this.finalist = JSON.parse(contentsString);
    } else {
      location.replace("/admin/contentList");
    }
  }

  editFinalist() {
    this.finalistService.editFinalist(this.finalist).then(() => {
      location.replace("/admin/finalisten");
    });
  }
  toDateTime(secs: any) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toLocaleDateString("nl-BE");
  }
  /* TODO: DETELE VOTES */
  deleteVote(id: string) {
    console.log("DELETE VOTE!!!")
    var doDelete = confirm("Delete nominee?");
    if (doDelete) {
      sessionStorage.removeItem("nominees");
      let rmIndex = this.finalist.votes.findIndex((el: { id: string; }) => el.id === id);
      this.finalist.votes.slice(rmIndex, 1);
      // console.log(JSON.parse(this.finalist.toString()));
      // sessionStorage.setItem("editFinalist", JSON.parse(this.finalist));
      // this.finalistService.deleteVote(id).then(res => {
      //   location.reload();
      // });
    }
  }
}
