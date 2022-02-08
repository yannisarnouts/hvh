import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FinalistService {

  constructor(private fs: AngularFirestore) { }

  getFinalists() {
    return this.fs.collection("finalists").get();
  }
  getVote(email: string) {
    return this.fs.firestore.doc('finalistVotes/' + email).get();
  }
  createVote(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.fs.collection("finalistVotes").doc(data.voterEmail)
        .set(data)
        .then(res => {}, err => reject(err));
    });
  }
}
