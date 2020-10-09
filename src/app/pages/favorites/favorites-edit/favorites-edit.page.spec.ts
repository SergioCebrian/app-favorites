import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesEditPage } from './favorites-edit.page';

describe('FavoritesEditPage', () => {
  let component: FavoritesEditPage;
  let fixture: ComponentFixture<FavoritesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
