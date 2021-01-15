import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { FavoriteMock } from '@mocks/favorite.mock';
import { FavoriteModel } from '@models/favorite.model';
import { TruncatePipe } from '@pipes/truncate/truncate.pipe';

import { FavoritesListComponent } from './favorites-list.component';

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;
  let expectedFavorites: FavoriteModel[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FavoritesListComponent,
        TruncatePipe
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
    expectedFavorites = FavoriteMock;
    component.allFavorites = expectedFavorites;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tests favorites', () => {

    it('Testing favorites', () => {
      expect(component.allFavorites).toEqual(expectedFavorites);
    });

    it('Testing count favorites', () => {
      expect(component.allFavorites.length).toEqual(2);
    });

  });

});
