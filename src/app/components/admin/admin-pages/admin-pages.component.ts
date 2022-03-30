import { Component, OnInit } from '@angular/core';
import {CmsService} from "../../../services/cms.service";

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
/*
/admin/pages
To make a specific page visible for website visitors.
 */
export class AdminPagesComponent implements OnInit {
  cmsData: any;
  submitted = false;

  constructor(private cmsService: CmsService) { }

  ngOnInit(): void {
    this.cmsService.getCMS("pages").then(docSnapshot => {
      this.cmsData = docSnapshot.data();
    })
  }
  submit() {
    this.cmsService.changeCMS("pages",this.cmsData);
    sessionStorage.setItem('pages', '{\"contentEnabled\": ' + this.cmsData.contentEnabled + ', \"finalistsEnabled\": ' + this.cmsData.finalistsEnabled + '}');
    this.submitted = true;
    location.reload();
  }
}
