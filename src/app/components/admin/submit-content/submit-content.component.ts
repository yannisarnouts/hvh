import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../../services/content.service";

export interface Content {
  title: string;
  author: string;
  topic: string;
  text: string;
  date: string;
}

@Component({
  selector: 'app-submit-content',
  templateUrl: './submit-content.component.html',
  styleUrls: ['./submit-content.component.css']
})
export class SubmitContentComponent implements OnInit {
  content: Content = {title: '', author: '', topic: '', text: '', date: ''};
  submitted = false;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  createContent() {
    this.contentService.createContent(this.content).then(() => {
      console.log("Artikel is toegevoegd");
      this.submitted = true;
    });
  }

}
