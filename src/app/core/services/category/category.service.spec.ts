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
import { Observable } from 'rxjs';

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

  describe('Tests Firestore calls', () => {
    const expectedCategories: CategoryModel[] = CategoryMock,
          expectedCategory: CategoryModel = expectedCategories[0];
    let afs: AngularFirestore;

    beforeEach(() => {
      afs = TestBed.inject(AngularFirestore);
    });

    it('Testing getAll return an Observable', () => {
      expect(service.getAll()).toEqual(jasmine.any(Observable));
    });

    it('Testing getOne return an Observable', () => {
      expect(service.getOne(expectedCategory.id)).toEqual(jasmine.any(Observable));
    });

    it('Testing delete return a Promise', () => {
      expect(service.delete(expectedCategory.id)).toEqual(jasmine.any(Promise));
    });

    it('Testing edit a category return a Promise', () => {
      const categoryToEdit = {
        ...expectedCategory,
        lastModifiedDate: new Date()
      };
      expect(service.edit(categoryToEdit)).toEqual(jasmine.any(Promise));
    });

    it('Testing editPartial a category return a Promise', () => {
      expect(service.editPartial(expectedCategory.id, expectedCategory)).toEqual(jasmine.any(Promise));
    });

    it('Testing create a category return a Promise', () => {
      const categoryToSave = { 
        ...expectedCategory, 
        createdDate: new Date(),
        lastModifiedDate: new Date()
      };
      expect(service.save(categoryToSave)).toEqual(jasmine.any(Promise));
    });

  });

});