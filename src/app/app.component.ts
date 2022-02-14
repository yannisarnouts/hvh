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

  constructor(private router: Router, private meta: Meta){
    const analytics = getAnalytics();
    this.meta.addTags([
      {name: 'description', content: 'Wedstrijd voor de helden van de helpdesk, mogelijk gemaakt door TOPdesk'} ,
      {name: 'author', content: 'Yannis Arnouts'},
      {name: 'keywords', content: 'heldenvandehelpdesk, helden, helpdesk, TOPdesk, wedstrijd'}
    ])
  }

  ngOnInit() {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (!res.url.includes('aLogin') && !res.url.includes('admin')) {
          this.showFooter = true;
        }
      }
    });
  }
}
