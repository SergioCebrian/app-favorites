import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';
import { IonicModule } from '@ionic/angular';

import { TimelinePage } from './timeline.page';

describe('TimelinePage', () => {
  let component: TimelinePage;
  let fixture: ComponentFixture<TimelinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinePage ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        StoreModule.forRoot(appReducers)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

});
