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
  constructor(private router: Router, private contentService: ContentService) { }

  ngOnInit(): void {
    this.getContentPost();
  }

  getContentPost() {
    const id = this.router.url.split("/")[2];
    console.log(this.contentService.getContent(id).subscribe(res => {
      this.content = res;
    }));
  }

}
