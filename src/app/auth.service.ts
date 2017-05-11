import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user.subscribe(user => {
      if (user) {
        var newUser = {
          uid: user.uid,
          displayName: user.providerData[0].displayName,
          email: user.providerData[0].email,
          photoURL: user.providerData[0].photoURL
        }
        firebase.database().ref('/users').child(user.uid).set(newUser);
        console.log(this.db.object('/users/'+user.uid));

      }
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.user;
  }

}
