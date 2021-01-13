import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from '@environments/environment';

import { HeaderTransparentComponent } from './header-transparent.component';
import { Location } from '@angular/common';

describe('HeaderTransparentComponent', () => {
  let component: HeaderTransparentComponent;
  let fixture: ComponentFixture<HeaderTransparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTransparentComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test input properties', () => {

    it('Testing customClass property', () => {
      component.customClass = 'fake-class';
      expect(component.customClass).toString();
    });

    it('Testing title property', () => {
      component.title = 'Fake title';
      expect(component.title).toString();
    });

    it('Testing data property', () => {
      component.data = { category: 'Fake category' };
      expect(component.data.category).toString();
    });

  });

  /*
  describe('test location back', () => {
    const locationSpy = { back: jasmine.createSpy('back') };

    TestBed.configureTestingModule({
      imports: [ Location ],
      providers: [
        {
          provide: Location, 
          useValue: locationSpy
        },
        Location
      ]
    });
  
    it('Testing location back', () => {
      // expect(locationSpy.back).toHaveBeenCalled();
      const location = TestBed.get(Location);
      expect(location.back()).toBe('/')
    });
  
  });
  */
  

});
