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
  editFinalist(finalist: any) {
    return this.fs.firestore.doc('finalists/' + finalist.id).update(finalist);
  }
  getVote(email: string) {
    return this.fs.firestore.doc('finalistVotes/' + email).get();
  }
  createVote(data: any) {
    console.log(data);
    return new Promise<any>((resolve, reject) => {
      this.fs.collection("finalistVotes").doc(data.voterEmail)
        .set(data)
        .then(res => {}, err => reject(err));
    });
  }
  deleteFinalist(id: string) {
    return this.fs.firestore.doc('finalists/' + id).delete();
  }
  deleteVote(id: string) {
    return this.fs.firestore.doc('finalistVotes/' + id).delete();
  }
}
