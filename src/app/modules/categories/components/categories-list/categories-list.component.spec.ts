import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ICategory } from '@interfaces/category';
import { IonicModule } from '@ionic/angular';
import { CategoryMock } from '@mocks/category.mock';
import { CategoryModel } from '@models/category.model';
import { selectCategory } from '@modules/categories/store/selectors/categories.selectors';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let expectedCategories: CategoryModel[];
  let expectedCategory: ICategory;
  let itemDe: DebugElement;
  let itemEl;

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
    //itemDe = fixture.debugElement.query(By.css('#test'));
    //itemEl = itemDe.nativeElement;
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
      let selectedCategory;
      component.OnDeleteCategory.subscribe((category) => selectedCategory = category);
      itemDe.triggerEventHandler('click', null);
      expect(selectedCategory.id).toBe('1');
      // expect(selectedCategory).toEqual(expectedCategory);
    });*/

  });

});
