import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authFB: AngularFireAuth
  ) { }

  isAuth(): Observable<boolean> {
    return this.authFB
               .authState
               .pipe(
                 map((userFB: any) => userFB !== null)
               );
  }

  signIn(data: IUser): Promise<firebase.auth.UserCredential> {
    const { email, password } = data;
    return this.authFB.signInWithEmailAndPassword(email, password);
  }

  signUp(data: IUser): Promise<firebase.auth.UserCredential> {
    const { email, password } = data;
    return this.authFB.createUserWithEmailAndPassword(email, password);
  }

  logOut(): Promise<void> {
    return this.authFB.signOut();
  }

}
