import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ContentService} from "../../services/content.service";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-content-post',
  templateUrl: './content-post.component.html',
  styleUrls: ['./content-post.component.css']
})
/*
/content/ID, the specific page for a content-post
this can be text, a video or images
 */
export class ContentPostComponent implements OnInit {
  content: any;
  contents = new Array();
  slideIndex = 1;
  constructor(private router: Router, private contentService: ContentService, private metaService: Meta) { }

  ngOnInit(): void {
    this.getContentPosts();
  }
  ngAfterViewInit(): void {
    if (this.content && this.content.slideshowImages) {
      this.showImg(1);
    }
  }

  getContentPost() {
    const id = this.router.url.split("/")[2];
    if (this.contents.length > 0) {
      this.content = this.contents.find(c => c.id == id);
    } else {
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
  /*
  This will be shown if there is a image slider
   */
  showImg(n: number){
    let i;
    let x = Array.from(document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>);
    if (n > x.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex-1].style.display = "block";
  }
  plusImg(n: number) {
    this.showImg(this.slideIndex += n);
  }
}
