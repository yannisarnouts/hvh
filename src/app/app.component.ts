import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {getAnalytics} from "@angular/fire/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'heldenHepdesk';
  showFooter = false;

  constructor(private router: Router){
    const analytics = getAnalytics();
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
