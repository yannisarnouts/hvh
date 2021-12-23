import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {
  articles = new Array();

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        this.articles.push(doc.data());
        console.log(doc.data())
      });
    });
  }
}
