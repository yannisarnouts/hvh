import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-finalist-detail',
  templateUrl: './admin-finalist-detail.component.html',
  styleUrls: ['./admin-finalist-detail.component.css']
})
export class AdminFinalistDetailComponent implements OnInit {
  finalist: any;
  finalists = new Array();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getFinalists()
  }

  getFinalist() {
    const id = this.router.url.split("/")[3];
    this.finalist = this.finalists.find(n => n.id == id);
  }
  getFinalists() {
    let nomineeString = '';
    if (sessionStorage.getItem('finalists') !== null) {
      // @ts-ignore
      nomineeString = sessionStorage.getItem('finalists');
      this.finalists = JSON.parse(nomineeString);
    }
    this.getFinalist();
  }
}
