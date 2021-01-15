import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CategoryMock } from '@mocks/category.mock';
import { CategoryModel } from '@models/category.model';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let expectedCategories: CategoryModel[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesListComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    expectedCategories = CategoryMock;
    component.allCategories = expectedCategories;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tests categories', () => {

    it('Testing categories', () => {
      expect(component.allCategories).toEqual(expectedCategories);
    });

    it('Testing count categories', () => {
      expect(component.allCategories.length).toEqual(2);
    });

  });

});
