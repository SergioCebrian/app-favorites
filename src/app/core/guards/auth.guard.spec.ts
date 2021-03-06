import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        StoreModule.forRoot(appReducers)
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Testing canActivate return an Observable', () => {
    expect(guard.canActivate()).toEqual(jasmine.any(Observable));
  });

  it('Testing canLoad return an Observable', () => {
    expect(guard.canLoad()).toEqual(jasmine.any(Observable));
  });

});
