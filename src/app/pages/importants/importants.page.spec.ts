import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportantsPage } from './importants.page';

describe('ImportantsPage', () => {
  let component: ImportantsPage;
  let fixture: ComponentFixture<ImportantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
