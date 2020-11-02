import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/state/app.state';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  @Output()
  loginFormValues: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();

  private loadingSubscription: Subscription;
  public isLoading: boolean = false;
  public loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private ngZone: NgZone
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      password: ['', [ Validators.required, Validators.minLength(3) ]]
    });
  }

  ngOnInit() {
    this.loadingSubscription = this.store
                                   .select('loading')
                                   .subscribe(state => this.isLoading = state.isLoading);
  }

  signIn(): void {
    if (this.loginForm.invalid) { return }
    if (this.loginForm.valid) {
      this.loginFormValues.emit({ userData: this.loginForm.value });
      this.loginForm.reset();
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
