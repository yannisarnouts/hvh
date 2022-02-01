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
  }

  getContentPost() {
    const id = this.router.url.split("/")[2];
    if (this.contents.length > 0) {
      this.content = this.contents.find(c => c.id == id);
    } else {
      console.log("get content from db")
      this.contentService.getContent(id).then(res => {
        this.content = res.data();
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
    this.getContentPost();
  }

}
