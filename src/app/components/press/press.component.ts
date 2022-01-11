import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {AuthService} from "../../services/auth.service";
const months = [
  {"month": "December", "code": "Dec", "nr": 0},
  {"month": "November", "code": "Nov", "nr": 0},
  {"month": "October", "code": "Oct", "nr": 0},
  {"month": "September", "code": "Sep", "nr": 0},
  {"month": "August", "code": "Aug", "nr": 0},
  {"month": "July", "code": "Jul", "nr": 0},
  {"month": "June", "code": "Jun", "nr": 0},
  {"month": "April", "code": "Apr", "nr": 0},
  {"month": "March", "code": "Mar", "nr": 0},
  {"month": "February", "code": "Feb", "nr": 0},
  {"month": "January", "code": "Jan", "nr": 0},
];
const years = [
  {"year": 2022, "nr": 0},
  {"year": 2021, "nr": 0},
  {"year": 2020, "nr": 0},
  {"year": 2019, "nr": 0},
  {"year": 2018, "nr": 0},
  {"year": 2017, "nr": 0},
  {"year": 2016, "nr": 0},
  {"year": 2015, "nr": 0},
];

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {
  articles = new Array(); articlesSessionStorage = new Array();
  public monthList:{month:string, code:string, nr: number}[] = months;
  public yearList:{year:number, nr: number}[] = years;

  constructor(private articleService: ArticleService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getPressFromSessionStorage();
    this.getArticles();
  }

  async getArticles() {
    const loggedIn = await this.authService.isLoggedIn();
    if (!loggedIn && this.articlesSessionStorage.length > 0) {
      this.articles = this.articlesSessionStorage;
    } else {
      this.articleService.getArticles().subscribe((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const art: any = doc.data();
          art.date = new Date(art.date);
          this.getMonthList(art.date);
          this.getYearList(art.date);
          this.articles.push(art);
        });
        sessionStorage.setItem('press', JSON.stringify(this.articles));
        this.articles.sort((a, b) => {
          return b.date - a.date
        });
      });
    }
  }
  getPressFromSessionStorage() {
    let contentsString = '';
    if (sessionStorage.getItem('press') !== null) {
      // @ts-ignore
      contentsString = sessionStorage.getItem('press');
      this.articlesSessionStorage = JSON.parse(contentsString);
      for (let i = 0; i < this.articlesSessionStorage.length; i++) {
        this.articlesSessionStorage[i].date = new Date(this.articlesSessionStorage[i].date)
        this.getMonthList(this.articlesSessionStorage[i].date);
        this.getYearList(this.articlesSessionStorage[i].date);
      }
    }
  }
  getMonthList(artDate: any) {
    if (this.monthList.find(m => m.code == artDate.toString().split(" ")[1]) != undefined) {
      // @ts-ignore
      this.monthList.find(m => m.code == artDate.toString().split(" ")[1]).nr++;
    }
  }
  getYearList(artDate: any) {
    if (this.yearList.find(y => y.year == artDate.toString().split(" ")[3]) != undefined) {
      // @ts-ignore
      this.yearList.find(y => y.year == artDate.toString().split(" ")[3]).nr++;
    }
  }

}
