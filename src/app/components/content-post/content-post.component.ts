import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ContentService} from "../../services/content.service";

@Component({
  selector: 'app-content-post',
  templateUrl: './content-post.component.html',
  styleUrls: ['./content-post.component.css']
})
export class ContentPostComponent implements OnInit {
  content: any;
  contents = new Array();
  constructor(private router: Router, private contentService: ContentService) { }

  ngOnInit(): void {
    this.getContentPosts();
    this.getContentPost();
  }

  getContentPost() {
    const id = this.router.url.split("/")[2];
    if (this.contents.length > 0) {
      this.content = this.contents.find(c => c.id == id);
    } else {
      this.contentService.getContent(id).subscribe(res => {
        this.content = res;
      });
    }
  }
  getContentPosts() {
    let contentsString = '';
    if (sessionStorage.getItem('contents') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('contents');
      this.contents = JSON.parse(contentsString);
    }
  }
}
