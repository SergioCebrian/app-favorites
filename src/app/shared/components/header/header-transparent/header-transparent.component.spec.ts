import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from '@environments/environment';

import { HeaderTransparentComponent } from './header-transparent.component';

describe('HeaderTransparentComponent', () => {
  let component: HeaderTransparentComponent;
  let fixture: ComponentFixture<HeaderTransparentComponent>;
  let data: { [key: string]: string };
  let location: SpyLocation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTransparentComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provider: Location, useClass: SpyLocation }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderTransparentComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    data = { category: 'fake-category' };
    component.data = data;
    component.customClass = 'fake-class';
    component.title = 'Fake title';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tests input properties', () => {

    it('Testing customClass property', () => {
      expect(component.customClass).toBe('fake-class');
      expect(component.customClass).toString();
    });

    it('Testing title property', () => {
      expect(component.title).toBe('Fake title');
      expect(component.title).toString();
    });

    it('Testing data property', () => {
      expect(component.data).toBe(data);
      expect(component.data.category).toString();
    });

  });

  describe('tests location', () => {

    it('Testing go back to previous page', () => {
      spyOn(location, 'back');
      component.goBack();
      expect(location.back).toHaveBeenCalled();
    });

  });

});
