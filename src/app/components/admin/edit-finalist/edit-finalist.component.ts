import { Component, OnInit } from '@angular/core';
import {Finalist} from "../submit-finalist/submit-finalist.component";
import {FinalistService} from "../../../services/finalist.service";

@Component({
  selector: 'app-edit-finalist',
  templateUrl: './edit-finalist.component.html',
  styleUrls: ['./edit-finalist.component.css']
})
export class EditFinalistComponent implements OnInit {
  finalist: Finalist = {firstname: '', lastname: '', company: '', motivation: '', img: ''};
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
}
