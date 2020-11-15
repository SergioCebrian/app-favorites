import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.store
                                   .select('loading')
                                   .subscribe(state => this.isLoading = state.isLoading);
  }

  ionViewWillEnter() {
    console.log('ok page')
  }

  signIn(event: any): void {
    this.authService
        .signIn(event.userData)
        .then(resp => resp)
        .catch(err => console.error(err));
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
