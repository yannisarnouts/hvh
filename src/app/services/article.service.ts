import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Article} from "../components/admin/submit-articles/submit-articles.component";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private fs: AngularFirestore) {}

  createArticle(article: Article): any {
    return this.fs.collection("articles").add(article);
  }

  getArticles() {
    return this.fs.collection("articles").get();
  }
}
