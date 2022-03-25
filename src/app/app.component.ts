import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {getAnalytics} from "@angular/fire/analytics";
import {CmsService} from "./services/cms.service";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'heldenHepdesk';
  showFooter = false;
  cmsData: any;

  constructor(private router: Router, private cmsService: CmsService){
    const analytics = getAnalytics();
  }

  ngOnInit() {
    this.getCMSFromSessionStorage();
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (!res.url.includes('aLogin') && !res.url.includes('admin')) {
          this.showFooter = true;
        }
      }
    });
  }

  getCMSFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('pages') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('pages');
      this.cmsData = JSON.parse(contentsString);
    } else {
      this.getCMSData();
    }
  }
  getCMSData() {
    this.cmsService.getCMS("pages").then(docSnapshot => {
      this.cmsData = docSnapshot.data();
      sessionStorage.setItem('pages', JSON.stringify(this.cmsData));
    });
  }
}
