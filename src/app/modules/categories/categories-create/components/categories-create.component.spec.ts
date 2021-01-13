import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthService } from '@auth/auth.service';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';

import { CategoriesCreateComponent } from './categories-create.component';
import { ICategory } from '@interfaces/category';
import { CategoryMock } from '@mocks/category.mock';
import { DebugElement } from '@angular/core';

describe('CategoriesCreateComponent', () => {
  let component: CategoriesCreateComponent;
  let fixture: ComponentFixture<CategoriesCreateComponent>;
  let service: AuthService;
  let expectedCategory: ICategory;
  let buttonDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCreateComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        IonicModule.forRoot(),
        StoreModule.forRoot(appReducers)
      ],
      providers: [ 
        AngularFireAuth,
        FormBuilder 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesCreateComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    expectedCategory = { ...CategoryMock[0], createdDate: new Date() };
    buttonDe = fixture.debugElement.query(By.css('#create-btn'));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test fields', () => {

    it('Testing form should be invalid', () => {
      component.createCategoryForm.controls['title'].setValue('');
      component.createCategoryForm.controls['description'].setValue('');
      component.createCategoryForm.controls['type'].setValue('');
      component.createCategoryForm.controls['image'].setValue('');
      expect(component.createCategoryForm.valid).toBeFalsy();
    });
  
    it('Testing form should be valid', () => {
      component.createCategoryForm.controls['title'].setValue('Fake title');
      component.createCategoryForm.controls['description'].setValue('Fake description');
      component.createCategoryForm.controls['type'].setValue('Fake type');
      component.createCategoryForm.controls['image'].setValue('fake-image.jpg');
      expect(component.createCategoryForm.valid).toBeTruthy();
    });

  });

  /*describe('tests submit button', () => {

    it('Testing submit button is enabled', () => {
      component.isLoading = false;
      fixture.detectChanges();
      expect(buttonDe.nativeElement.disabled).toBeTruthy();
    });

  });*/

 /* describe('tests new category', () => {

    it('Testing create a category', () => {
      let categoryNew;
      fixture.debugElement.query(By.css('#title')).nativeElement.value = 'Fake title';
      fixture.debugElement.query(By.css('#description')).nativeElement.value = 'Fake description';
      fixture.debugElement.query(By.css('#type')).nativeElement.value = 'Fake type';
      fixture.debugElement.query(By.css('#image')).nativeElement.value = 'fake-image.jpg';
      component.categoryNewValues.subscribe(category => categoryNew = category);
      buttonDe.triggerEventHandler('click', null);
      expect(categoryNew.id).toBe('1');
      expect(categoryNew.title).toBe('Title 1');
    });

  });*/

});
