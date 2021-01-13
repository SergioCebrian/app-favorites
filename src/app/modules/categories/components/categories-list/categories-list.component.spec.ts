import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CategoryMock } from '@mocks/category.mock';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe('receives categories', () => {
    const expectedCategories = CategoryMock;

    beforeEach(() => {
      component.allCategories = expectedCategories;
    })

    it('if allCategories input property exist return true', () => {
      expect(component.allCategories).toBeTruthy();
    })

    it('should return two categories', () => {
      expect(component.allCategories.length).toEqual(2);
    })

    it('should return mock categories', () => {
      expect(component.allCategories).toBe(expectedCategories);
    })

  })*/

  /*describe('delete category', () => {
    const expectCategory = CategoryMock[0];

    beforeEach(() => {
      spyOn(component.OnDeleteCategory, 'emit');
      spyOn(component,'categoryDelete').and.callThrough();
    })

    it('if OnDeleteCategory output property exist return true', () => {
      expect(component.OnDeleteCategory).toBeTruthy();
    })

    it('emit category selected to delete', () => {
      component.categoryDelete(expectCategory);
      component.OnDeleteCategory.subscribe(category => {
        expect(category).toBe(expectCategory);
      });
    })

  })*/

});
