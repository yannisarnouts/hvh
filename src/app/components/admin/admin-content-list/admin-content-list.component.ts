import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../../services/content.service";

@Component({
  selector: 'app-admin-content-list',
  templateUrl: './admin-content-list.component.html',
  styleUrls: ['./admin-content-list.component.css']
})
export class AdminContentListComponent implements OnInit {
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
      });
      this.contents.sort((a, b) => {
        return b.fullDate - a.fullDate
      });
    });
  }

  deletePost(id: string) {
    var doDelete = confirm("Delete content post?");
    if (doDelete) {
      this.contentService.deleteContent(id).then(res => {
        location.reload();
      });
    }
  }

}