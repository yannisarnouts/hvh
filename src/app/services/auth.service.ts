import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  SignIn(mail: string, pass: string) {
    this.afAuth.signInWithEmailAndPassword(mail, pass).then(userCrendential => {
      const u = userCrendential.user;
      console.log(u);
    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
    })
  }

  isLoggedIn(): boolean {
    return this.afAuth.currentUser != null;
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
