import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(private afAuth: AngularFireAuth,) {
  }

  SignIn(mail: string, pass: string): any {
    return this.afAuth.signInWithEmailAndPassword(mail, pass);
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getCurrentUser() {
    console.log(this.isLoggedIn());
    return this.afAuth.currentUser;
  }

  SignOut() {
    this.afAuth.signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
}
