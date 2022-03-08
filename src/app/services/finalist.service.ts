import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Finalist} from "../components/admin/submit-finalist/submit-finalist.component";

@Injectable({
  providedIn: 'root'
})
export class FinalistService {

  constructor(private fs: AngularFirestore) { }

  getFinalists() {
    return this.fs.collection("finalists").get();
  }
  getFinalistVotes() {
    return this.fs.collection("finalistVotes").get();
  }

  createFinalist(finalist: Finalist) {
    return this.fs.collection("finalists").add(finalist);
  }
  getVote(email: string, category: string) {
    return this.fs.firestore.doc('finalistVotes/' + email + '_' + category).get();
  }
  createVote(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.fs.collection("finalistVotes").doc(data.voterEmail + '_' + data.category)
        .set(data)
        .then(res => {}, err => reject(err));
    });
  }
}
