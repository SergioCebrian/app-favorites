import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesCreatePage } from './categories-create.page';

describe('CategoriesCreatePage', () => {
  let component: CategoriesCreatePage;
  let fixture: ComponentFixture<CategoriesCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
