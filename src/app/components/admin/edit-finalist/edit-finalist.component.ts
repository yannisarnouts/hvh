import { Component, OnInit } from '@angular/core';
import {Finalist} from "../submit-finalist/submit-finalist.component";
import {FinalistService} from "../../../services/finalist.service";

@Component({
  selector: 'app-edit-finalist',
  templateUrl: './edit-finalist.component.html',
  styleUrls: ['./edit-finalist.component.css']
})
/*
/admin/editFinalist/id
edit all data for a finalist
 */
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
  /*
  Delete the votes from a finalist
  This is achieved by the finalistId in the vote document.
   */
  deleteVotes() {
    var doDelete = confirm("Delete votes?");
    if (doDelete) {
      sessionStorage.removeItem("finalists");
      this.finalistService.deleteVotes(this.finalist.id).then(res => {
        console.log(res);
        setTimeout(() => {location.href = "/admin/finalisten"}, 2000)
      });
    }
  }
}
