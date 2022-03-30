import { Component, OnInit } from '@angular/core';
import {CmsService} from "../../../services/cms.service";

@Component({
  selector: 'app-home-cms',
  templateUrl: './home-cms.component.html',
  styleUrls: ['./home-cms.component.css']
})
/*
/admin/homeCMS
This is CMS page, here we can edit all content on the homepage
 */
export class HomeCmsComponent implements OnInit {
  submitted = false;
  cmsData: any;
  constructor(private cmsService: CmsService) { }

  ngOnInit(): void {
    this.cmsService.getCMS("homeCMS").then(docSnapshot => {
      this.cmsData = docSnapshot.data();
    })
  }
  submit() {
    this.cmsService.changeCMS("homeCMS",this.cmsData);
    this.submitted = true;
  }
}
