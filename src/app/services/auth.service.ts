import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
/*
Service to login and logout as admin user
 */
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
