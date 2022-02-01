import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../services/content.service";
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment.prod";
import {CmsService} from "../../services/cms.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  contents = new Array();
  contentsSessionStorage = new Array();
  cmsData: any;

  constructor(private contentService: ContentService, private cmsService: CmsService) {
  }

  ngOnInit(): void {
    this.getContentsFromSessionStorage();
    this.getCMSFromSessionStorage();
  }

  getCMSData() {
    this.cmsService.getCMS("contentCMS").then(docSnapshot => {
      this.cmsData = docSnapshot.data();
      sessionStorage.setItem('contentCMS', JSON.stringify(this.cmsData));
    });
  }

  getCMSFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('contentCMS') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('contentCMS');
      this.cmsData = JSON.parse(contentsString);
    } else {
      this.getCMSData();
    }
  }

  async getContents() {
    this.contentService.getContents().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        let cont: any = doc.data();
        cont.id = doc.id;
        cont.fullDate = new Date(cont.date);
        this.contents.push(cont);
      });
      this.contents.sort((a, b) => {
        return b.fullDate - a.fullDate
      });
      sessionStorage.setItem('contents', JSON.stringify(this.contents));
    });
  }

  getContentsFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('contents') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('contents');
      this.contents = JSON.parse(contentsString);
    } else {
      this.getContents();
    }
  }
}
