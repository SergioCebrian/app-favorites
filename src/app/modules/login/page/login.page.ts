import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import * as loadingActions from '@modules/loading/store/actions/loading.actions';
import { AuthService } from '@auth/auth.service';
import { AlertService } from '@services/alert/alert.service';
import { ErrorService } from '@services/error/error.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;
  public isLoading: boolean = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.store
                                   .select('loading')
                                   .subscribe(state => this.isLoading = state.isLoading);
  }

  signIn(event: any): void {
    this.store.dispatch(loadingActions.isLoading());
    this.authService
        .signIn(event.userData)
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
          console.error(err);
        });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
