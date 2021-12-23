import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData, NominateDialog} from "../../home/home.component";
import {ArticleService} from "../../../services/article.service";

export interface Article {
  name: string;
  link: string;
  date: string;
}

@Component({
  selector: 'app-submit-articles',
  templateUrl: './submit-articles.component.html',
  styleUrls: ['./submit-articles.component.css']
})
export class SubmitArticlesComponent implements OnInit {
  article: Article = {name: '', link: '', date: ''};
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  createArticle() {
    this.articleService.createArticle(this.article);
  }

}
