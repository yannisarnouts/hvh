import {Injectable} from '@angular/core';
import {getAuth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  SignIn(mail: string, pass: string) {
    signInWithEmailAndPassword(getAuth(), mail, pass).then(userCrendential => {
      const u = userCrendential.user;
    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
    })
  }

  isLoggedIn(): boolean {
    return getAuth().currentUser != null;
  }

  SignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
}
