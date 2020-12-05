import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';

import { HeaderComponent } from './header.component';
import { AuthService } from '@auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let fakeTitle: string = 'Test Header Component';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule, 
        StoreModule.forRoot(appReducers),
        IonicModule.forRoot() 
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = fakeTitle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if exist customClass must be a string', () => {
    component.customClass = 'custom-class';
    expect(component.customClass).toEqual(jasmine.any(String));
  });

  it(`should show the title: ${ fakeTitle }`, () => {
    const text = fixture.nativeElement.querySelector('ion-title').innerText;
    expect(text).toEqual(fakeTitle);
    expect(text).toEqual(jasmine.any(String));
  });

});
