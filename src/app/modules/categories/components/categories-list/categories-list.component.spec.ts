import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ICategory } from '@interfaces/category';
import { IonicModule } from '@ionic/angular';
import { CategoryMock } from '@mocks/category.mock';
import { CategoryModel } from '@models/category.model';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let expectedCategories: CategoryModel[];
  let expectedCategory: ICategory | any;

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
    expectedCategory = { ...expectedCategories[0], createdDate: new Date() };
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

    /*it('Testing delete a category', () => {
      component.OnDeleteCategory.subscribe(selectedCategory => {
        expect(selectedCategory).toEqual(expectedCategory);
      });
      component.categoryDelete(expectedCategory);
    });*/

  });

});
