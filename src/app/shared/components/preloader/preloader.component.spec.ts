import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PreloaderService } from '@services/preloader/preloader.service';

import { PreloaderComponent } from './preloader.component';

describe('PreloaderComponent', () => {
  let component: PreloaderComponent;
  let fixture: ComponentFixture<PreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloaderComponent ],
      imports: [IonicModule.forRoot()],
      providers: [PreloaderService]
    }).compileComponents();

    fixture = TestBed.createComponent(PreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoading must be a boolean', fakeAsync(() => {
    fixture.detectChanges();
    component.isLoading.subscribe(state => {
      fixture.detectChanges();
      expect(state).toEqual(jasmine.any(Boolean));
    });
  }));

});
