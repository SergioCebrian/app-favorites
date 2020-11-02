import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesFilterPage } from './favorites-filter.page';

describe('FavoritesFilterPage', () => {
  let component: FavoritesFilterPage;
  let fixture: ComponentFixture<FavoritesFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
