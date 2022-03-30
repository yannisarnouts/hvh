import { Component, OnInit } from '@angular/core';
import {CmsService} from "../../../services/cms.service";

@Component({
  selector: 'app-finalist-cms',
  templateUrl: './finalist-cms.component.html',
  styleUrls: ['./finalist-cms.component.css']
})
/*
/admin/finalists
CMS for finalists page, edit contents for this page
 */
export class FinalistCmsComponent implements OnInit {
  cmsData: any;
  submitted = false;

  constructor(private cmsService: CmsService) { }

  ngOnInit(): void {
    this.cmsService.getCMS("finalistCMS").then(docSnapshot => {
      this.cmsData = docSnapshot.data()
      console.log(this.cmsData)
    })
  }
  submit() {
    this.cmsService.changeCMS("finalistCMS",this.cmsData);
    this.submitted = true;
  }
}
