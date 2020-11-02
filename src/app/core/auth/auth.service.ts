import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '@store/state/app.state';
import * as loadingActions from '@store/actions/loading.actions';
import { ErrorService } from '@services/error/error.service';
import { IUser } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private alertController: AlertController,
    private authFB: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>,
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
                    this.router.navigate(['/']);
                    this.store.dispatch(loadingActions.stopLoading());
                  }, 2000);
               })
               .catch(err => {
                  this.presentAlert(this.errorService.get(err));
                  this.store.dispatch(loadingActions.stopLoading());
                  console.error(err);
               });
  }

  signUp(data: IUser): Promise<firebase.auth.UserCredential> {
    const { email, password } = data;
    return this.authFB.createUserWithEmailAndPassword(email, password);
  }

  logOut(): Promise<void> {
    return this.authFB.signOut();
  }

  async presentAlert(msg: any) {
    const alertComponent = await this.alertController.create({
      cssClass: 'c-alert  c-alert--error  has-before  has-only-button',
      header: 'Opps!',
      message: msg.message,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'is-error'
        }
      ]
    });

    await alertComponent.present();
  }

}
