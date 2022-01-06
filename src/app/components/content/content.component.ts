import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../services/content.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  contents = new Array();
  contentsSessionStorage = new Array();

  constructor(private contentService: ContentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getContentsFromSessionStorage();
    this.getContents();
  }

  async getContents() {
    const loggedIn = await this.authService.isLoggedIn();
    if (!loggedIn && this.contentsSessionStorage.length > 0) {
      this.contents = this.contentsSessionStorage;
    } else {
      this.contentService.getContents().subscribe((querySnapshot) => {
        querySnapshot.forEach(doc => {
          let cont: any = doc.data();
          cont.id = doc.id;
          cont.fullDate = new Date(cont.date);
          this.contents.push(cont);
          sessionStorage.setItem('contents', JSON.stringify(this.contents));
        });
        this.contents.sort((a, b) => {
          return b.fullDate - a.fullDate
        });
      });
    }
  }
  getContentsFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('contents') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('contents');
      this.contentsSessionStorage = JSON.parse(contentsString);
    }
    console.log(this.contentsSessionStorage);
  }
}
