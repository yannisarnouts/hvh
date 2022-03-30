import { Component, OnInit } from '@angular/core';
import {ContentService} from "../../../services/content.service";

@Component({
  selector: 'app-admin-content-list',
  templateUrl: './admin-content-list.component.html',
  styleUrls: ['./admin-content-list.component.css']
})
/*
This page can be found on /admin/contentList
It gives an overview of all content posts
 */
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

  editPost(id: string) {
    let editContent = this.contents.find(c => c.id === id);
    sessionStorage.setItem('editContent', JSON.stringify(editContent));
    location.replace("/admin/editContent/" + id);
    // href="/admin/editContent/{{content.id}}"
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
