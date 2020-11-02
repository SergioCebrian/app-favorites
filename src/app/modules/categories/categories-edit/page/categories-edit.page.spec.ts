import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesEditPage } from './categories-edit.page';

describe('CategoriesEditPage', () => {
  let component: CategoriesEditPage;
  let fixture: ComponentFixture<CategoriesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
