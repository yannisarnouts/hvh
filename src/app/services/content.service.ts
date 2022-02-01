import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Content} from "../components/admin/submit-content/submit-content.component";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private fs: AngularFirestore) { }

  createContent(content: Content): any {
    return this.fs.collection("contents").add(content);
  }

  getContents() {
    return this.fs.collection("contents").get();
  }

  getContent(id: string) {
    return this.fs.firestore.doc('contents/' + id).get();
  }
}
