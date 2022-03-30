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
  slideshowImages: any[];
}
@Component({
  selector: 'app-submit-content',
  templateUrl: './submit-content.component.html',
  styleUrls: ['./submit-content.component.css']
})
/*
/admin/submitContent
To create a content post
 */
export class SubmitContentComponent implements OnInit {
  content: Content = {title: '', author: '', topic: '', bannerIntro: '', intro: '', date: '', subcontents: [], img: '', slideshowImages: []};
  subContents = new Array();
  slideshowImages = new Array();
  submitted = false;
  nrTitles = 0; nrSlideShowImages = 0;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  createContent() {
    this.content.subcontents = this.subContents;
    this.content.slideshowImages = this.slideshowImages;
    this.subContents = [];
    this.contentService.createContent(this.content).then(() => {
      this.submitted = true;
      this.content = {title: '', author: '', topic: '', bannerIntro: '', intro: '', date: '', subcontents: [], img: '', slideshowImages: []};
    });
  }

  addSubcontents() {
    this.subContents = [];
    for (let i = 0; i < this.nrTitles; i++) {
      this.subContents[i] = {title: '', html: '', nr: i+1};
    }
  }
  addSlideShowImages() {
    this.slideshowImages = [];
    for (let i = 0; i < this.nrSlideShowImages; i++) {
      this.slideshowImages[i] = {url: '', nr: i+1};
    }
  }

}
