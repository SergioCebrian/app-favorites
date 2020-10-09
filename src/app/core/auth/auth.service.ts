import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as loadingActions from '@store/actions/loading.actions';

import { ErrorService } from '@services/error/error.service';
import { TokenService } from '@services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private alertController: AlertController,
    private authFB: AngularFireAuth,
    private router: Router,
    private storage: Storage,
    private store: Store<AppState>,
    private errorService: ErrorService,
    private tokenService: TokenService
  ) { }

  signIn(data: { [key: string]: string }): Promise<any> {
    const { email, password } = data;
    this.store.dispatch(loadingActions.isLoading());
    return this.authFB
               .signInWithEmailAndPassword(email, password)
               .then(resp => {
                  setTimeout( () => {
                    this.router.navigate(['/']);
                    this.store.dispatch(loadingActions.stopLoading());
                    this.tokenService.setToken(resp.user);
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

  async logOut() {
    return await this.authFB.signOut();
    return await this.storage.clear();
  }

  async presentAlert(msg: any) {
    const alertComponent = await this.alertController.create({
      cssClass: 'c-alert  c-alert--error  has-before',
      header: 'Opps!',
      subHeader: msg.message,
      buttons: ['Close']
    });

    await alertComponent.present();
  }

}
