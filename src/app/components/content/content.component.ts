import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../services/content.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  contents = new Array();

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents() {
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
