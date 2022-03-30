import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Content} from "../components/admin/submit-content/submit-content.component";

@Injectable({
  providedIn: 'root'
})
/*
Service to create, edit and retrieve content
 */
export class ContentService {
  constructor(private fs: AngularFirestore) { }

  createContent(content: Content): any {
    return this.fs.collection("contents").add(content);
  }

  editContent(content: any): any {
    console.log(content);
    return this.fs.firestore.doc('contents/' + content.id).update(content);
  }

  getContents() {
    return this.fs.collection("contents").get();
  }

  getContent(id: string) {
    return this.fs.firestore.doc('contents/' + id).get();
  }

  deleteContent(id: string) {
    return this.fs.firestore.doc('contents/' + id).delete();
  }
}
