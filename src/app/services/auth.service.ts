import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  doRegister(email, password) {
    console.log('CRED: ', email, password);

    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(email, password) {
    console.log('CRED LOGIN: ', email, password);

    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doResetPassword(email) {
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().sendPasswordResetEmail(email)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }
}
