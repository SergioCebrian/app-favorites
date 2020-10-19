import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as loadingActions from '@store/actions/loading.actions';
import { ErrorService } from '@services/error/error.service';

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

  isAuth() {
    return this.authFB
               .authState
               .pipe(
                 map(userFB => userFB !== null)
               );
  }

  signIn(data: { [key: string]: string }): Promise<any> {
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

  signUp(data: { [key: string]: string }): Promise<any> {
    const { email, password } = data;
    return this.authFB.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
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
