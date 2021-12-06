import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class NomineeService {

  constructor(private fs: AngularFirestore) {
  }

  getNominees() {
    return this.fs.collection('nominees').valueChanges();
  }
}
