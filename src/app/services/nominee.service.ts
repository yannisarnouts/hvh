import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class NomineeService {

  constructor(private fs: AngularFirestore) {
  }

  getNominee(email: string) {
  // , ref => ref.where('email', '==', email)
    return this.fs.collection('nominees').doc(email).valueChanges();
  }
  createVote(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.fs.collection("nominees").doc(data.email)
        .set(data)
        .then(res => {}, err => reject(err));
    });
  }
  getNominees() {
    return this.fs.collection("nominees").get();
  }
}
