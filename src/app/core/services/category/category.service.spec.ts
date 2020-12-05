import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@shared/store/reducers/app.reducers';
import { environment } from '@environments/environment';
import { SlugService } from '@helpers/slug/slug.service';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClientSpy: { getAll: jasmine.Spy };
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientTestingModule,
        RouterTestingModule, 
        StoreModule.forRoot(appReducers)
      ],
      providers: [ SlugService ]
    });
    service = TestBed.inject(CategoryService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['getAll']);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
