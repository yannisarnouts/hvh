import {Component, OnInit} from '@angular/core';
import {Content} from "../submit-content/submit-content.component";
import {ContentService} from "../../../services/content.service";

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
  content: Content = {title: '', author: '', topic: '', bannerIntro: '', intro: '', date: '', subcontents: [], img: '', slideshowImages: []};
  subContents = new Array();
  slideshowImages = new Array();
  submitted = false;
  nrTitles = 0; nrSlideShowImages = 0;
  constructor(private contentService: ContentService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('editContent') !== null) {
      let contentsString = sessionStorage.getItem('editContent');
      // @ts-ignore
      this.content = JSON.parse(contentsString);
      this.subContents = this.content.subcontents;
      this.nrTitles = this.subContents.length;
    } else {
      location.replace("/admin/contentList");
    }
  }

  createContent() {
    this.content.subcontents = this.subContents;
    this.subContents = [];
    this.contentService.editContent(this.content).then(() => {
      location.replace("/admin/contentList");
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
