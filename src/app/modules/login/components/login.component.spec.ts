import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [IonicModule.forRoot()],
      providers: [ FormBuilder ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle password visibility', () => {
    expect(component.isPasswordVisible).toBe(false, 'false by default');
    component.toggleVisibility();
    expect(component.isPasswordVisible).toBe(true, 'now is true');
    component.toggleVisibility();
    expect(component.isPasswordVisible).toBe(false, 'now is false');
  });

  it('form should be invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('test12345');
    expect(component.loginForm.valid).toBeTruthy();
  });

});
