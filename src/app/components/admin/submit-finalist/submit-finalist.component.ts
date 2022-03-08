import { Component, OnInit } from '@angular/core';
import {Content} from "../submit-content/submit-content.component";
import {FinalistService} from "../../../services/finalist.service";

export interface Finalist {
  firstname: string;
  lastname: string;
  company: string;
  motivation: string;
  img: string;
}

@Component({
  selector: 'app-submit-finalist',
  templateUrl: './submit-finalist.component.html',
  styleUrls: ['./submit-finalist.component.css']
})
export class SubmitFinalistComponent implements OnInit {
  finalist: Finalist = {firstname: '', lastname: '', company: '', motivation: '', img: ''};
  submitted = false;

  constructor(private finalistService: FinalistService) { }

  ngOnInit(): void {
  }

  createFinalist() {
    this.finalistService.createFinalist(this.finalist).then(() => {
      this.submitted = true;
      this.finalist = {firstname: '', lastname: '', company: '', motivation: '', img: ''};
    });
  }

}
