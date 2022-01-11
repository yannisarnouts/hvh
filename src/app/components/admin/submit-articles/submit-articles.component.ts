import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../services/article.service";

export interface Article {
  name: string;
  link: string;
  date: string;
  source: string;
}

@Component({
  selector: 'app-submit-articles',
  templateUrl: './submit-articles.component.html',
  styleUrls: ['./submit-articles.component.css']
})
export class SubmitArticlesComponent implements OnInit {
  article: Article = {name: '', link: '', source: '', date: ''};
  submitted = false;
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  createArticle() {
    this.articleService.createArticle(this.article).then(() => {
      console.log("Artikel is toegevoegd");
      this.submitted = true;
    });
  }

}
