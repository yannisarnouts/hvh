import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../services/article.service";
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
  articles = new Array();
  public monthList:{month:string, code:string, nr: number}[] = months;
  public yearList:{year:number, nr: number}[] = years;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        const art: any = doc.data();
        art.date = new Date(art.date);
        if (this.monthList.find(m => m.code == art.date.toString().split(" ")[1]) != undefined) {
          // @ts-ignore
          this.monthList.find(m => m.code == art.date.toString().split(" ")[1]).nr++;
        }
        if (this.yearList.find(y => y.year == art.date.toString().split(" ")[3]) != undefined) {
          // @ts-ignore
          this.yearList.find(y => y.year == art.date.toString().split(" ")[3]).nr++;
        }
        this.articles.push(art);
      });
      this.articles.sort((a, b) => {
       return b.date - a.date
      });
      console.log(this.articles)
    });
  }

}
