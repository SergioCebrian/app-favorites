import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as loadingActions from '@modules/loading/store/actions/loading.actions';
import { IUser } from '@interfaces/user';
import { AlertService } from '@services/alert/alert.service';
import { ErrorService } from '@services/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authFB: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>,
    private alertService: AlertService,
    private errorService: ErrorService
  ) { }

  isAuth(): Observable<boolean> {
    return this.authFB
               .authState
               .pipe(
                 map((userFB: any) => userFB !== null)
               );
  }

  signIn(data: IUser): Promise<void> {
    const { email, password } = data;
    this.store.dispatch(loadingActions.isLoading());
    return this.authFB
               .signInWithEmailAndPassword(email, password)
               .then(resp => {
                  setTimeout( () => {
                    this.store.dispatch(loadingActions.stopLoading());
                    this.router.navigate(['/']);
                  }, 2000);
               })
               .catch(err => {
                  this.alertService.presentAlert({
                    cssClass: 'c-alert--error  has-before  has-only-button',
                    header: 'Opps!',
                    message: this.errorService.get(err).message,
                    buttons: [
                      {
                        text: 'Close',
                        role: 'cancel',
                        cssClass: 'is-error'
                      }
                    ]
                  });
                  this.store.dispatch(loadingActions.stopLoading());
                  // console.error(err);
               });
  }

  signUp(data: IUser): Promise<firebase.auth.UserCredential> {
    const { email, password } = data;
    return this.authFB.createUserWithEmailAndPassword(email, password);
  }

  logOut(): Promise<void> {
    return this.authFB.signOut();
  }

}
