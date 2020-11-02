import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesCreatePage } from './favorites-create.page';

describe('FavoritesCreatePage', () => {
  let component: FavoritesCreatePage;
  let fixture: ComponentFixture<FavoritesCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
