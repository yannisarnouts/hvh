import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../../services/content.service";

export interface Content {
  title: string;
  author: string;
  topic: string;
  bannerIntro: string;
  intro: string;
  date: string;
  subcontents: any[];
  img: string;
}
@Component({
  selector: 'app-submit-content',
  templateUrl: './submit-content.component.html',
  styleUrls: ['./submit-content.component.css']
})
export class SubmitContentComponent implements OnInit {
  content: Content = {title: '', author: '', topic: '', bannerIntro: '', intro: '', date: '', subcontents: [], img: ''};
  subContents = new Array();
  submitted = false;
  nrTitles = 0;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  createContent() {
    this.content.subcontents = this.subContents;
    this.subContents = [];
    this.contentService.createContent(this.content).then(() => {
      console.log("Artikel is toegevoegd");
      this.submitted = true;
      this.content = {title: '', author: '', topic: '', bannerIntro: '', intro: '', date: '', subcontents: [], img: ''};
    });
  }

  addSubcontents() {
    this.subContents = [];
    for (let i = 0; i < this.nrTitles; i++) {
      this.subContents[i] = {title: '', html: '', nr: i+1};
    }
  }

}
