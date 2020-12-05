import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesFilterComponent } from './favorites-filter.component';

describe('FavoritesFilterComponent', () => {
  let component: FavoritesFilterComponent;
  let fixture: ComponentFixture<FavoritesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesFilterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
