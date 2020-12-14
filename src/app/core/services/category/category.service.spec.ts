import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';
import { SlugService } from '@helpers/slug/slug.service';

import { CategoryService } from './category.service';
import { CategoryModel } from '@models/category.model';
import { CategoryMock } from '@mocks/category.mock';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientTestingModule,
        RouterTestingModule, 
        StoreModule.forRoot(appReducers)
      ],
      providers: [ 
        SlugService,
        AngularFirestore
      ]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests Http calls', () => {
    const expectedCategories: CategoryModel[] = CategoryMock;
    let afs: AngularFirestore;

    beforeEach(() => {
      afs = TestBed.inject(AngularFirestore);
    });

    it('Testing collection categories is an AngularFirestoreCollection', () => {
      const collection = afs.collection('categories');
      expect(collection instanceof AngularFirestoreCollection).toBe(true);
    });

  });

});
