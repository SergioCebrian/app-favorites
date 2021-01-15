import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';

import { FavoriteService } from './favorite.service';
import { FavoriteMock } from '@mocks/favorite.mock';
import { AngularFirestore } from '@angular/fire/firestore';
import { FavoriteModel } from '@models/favorite.model';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule, 
        StoreModule.forRoot(appReducers),
        IonicModule.forRoot() 
      ]
    });
    service = TestBed.inject(FavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests Firestore calls', () => {

    const expectedFavorites: FavoriteModel[] = FavoriteMock,
          expectedFavorite: FavoriteModel = expectedFavorites[0];
    let afs: AngularFirestore;

    beforeEach(() => {
      afs = TestBed.inject(AngularFirestore);
    });

    it('Testing getAll return an Observable', () => {
      expect(service.getAll()).toEqual(jasmine.any(Observable));
    });

    it('Testing getOne return an Observable', () => {
      expect(service.getOne(expectedFavorite.id)).toEqual(jasmine.any(Observable));
    });

    it('Testing delete return a Promise', () => {
      expect(service.delete(expectedFavorite.id)).toEqual(jasmine.any(Promise));
    });

    it('Testing edit a favorite return a Promise', () => {
      const favoriteToEdit = {
        ...expectedFavorite,
        lastModifiedDate: new Date()
      };
      expect(service.edit(favoriteToEdit)).toEqual(jasmine.any(Promise));
    });

    it('Testing editPartial a favorite return a Promise', () => {
      const favoriteToEdit = {
        ...expectedFavorite,
        lastModifiedDate: new Date()
      };
      expect(service.editPartial(favoriteToEdit.id, favoriteToEdit)).toEqual(jasmine.any(Promise));
    });

    /*it('Testing create a favorite return a Promise', () => {
      const favoriteToSave = { 
        ...expectedFavorite, 
        createdDate: new Date(),
        lastModifiedDate: new Date()
      };
      expect(service.save(favoriteToSave)).toEqual(jasmine.any(Promise));
    });*/

  });

});
