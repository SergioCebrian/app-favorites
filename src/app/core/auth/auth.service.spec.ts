import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const fakeUserData = { email: 'test@test.com', password: '123456', role: 'role' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule, 
        StoreModule.forRoot(appReducers)
      ],
      providers: [
        AngularFireAuth
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('check isAuth() state', (done) => {
    service.isAuth().subscribe(state => {
      expect(state).toBe(null || false);
      done();
    });
  });*/

  it('password must have at least 6 characters', () => {
    expect(fakeUserData.password).toBeGreaterThanOrEqual(6);
  });

  it('signIn(email, password) return a promise', () => {
    const fireAuth = TestBed.inject(AngularFireAuth);
    service.signIn(fakeUserData);
    expect(fireAuth.createUserWithEmailAndPassword(fakeUserData.email, fakeUserData.password)).toEqual(jasmine.any(Promise));
  });

  it('signUp(email, password) return a promise', () => {
    const fireAuth = TestBed.inject(AngularFireAuth);
    service.signUp(fakeUserData);
    expect(fireAuth.createUserWithEmailAndPassword(fakeUserData.email, fakeUserData.password)).toEqual(jasmine.any(Promise));
  });

  it('logOut() return a promise', () => {
    const fireAuth = TestBed.inject(AngularFireAuth);
    service.logOut();
    expect(fireAuth.signOut()).toEqual(jasmine.any(Promise));
  });

});
