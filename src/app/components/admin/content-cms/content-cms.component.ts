import { Component, OnInit } from '@angular/core';
import {CmsService} from "../../../services/cms.service";
import {docSnapshots} from "@angular/fire/firestore";

@Component({
  selector: 'app-content-cms',
  templateUrl: './content-cms.component.html',
  styleUrls: ['./content-cms.component.css']
})
/*
/admin/content
CMS page for the content page, here we can edit all content for the page
 */
export class ContentCmsComponent implements OnInit {
  submitted = false;
  cmsData: any;

  constructor(private cmsService: CmsService) { }

  ngOnInit(): void {
    this.cmsService.getCMS("contentCMS").then(docSnapshot => {
      this.cmsData = docSnapshot.data();
    })
  }

  submit() {
    this.cmsService.changeCMS("contentCMS", this.cmsData);
    this.submitted = true;
  }

}
