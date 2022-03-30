import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
/*
Service for CMS data, this can be for News, Finalists and HOme page
 */
export class CmsService {

  constructor(private fs: AngularFirestore) { }

  changeCMS(id: string, data: any) {
    return new Promise<any>((resolve, reject) => {
      this.fs.collection("cms").doc(id)
        .set(data)
        .then(res => {}, err => reject(err));
    });
  }
  getCMS(id: string) {
    return this.fs.firestore.doc('cms/' + id).get();
  }
}
