import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*/*it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('counter must be a number', () => {
    component.counter = 10;
    expect(component.counter).toEqual(10);
    expect(component.counter).toEqual(jasmine.any(Number));
  });

  it('counter must have two properties: single and plural', () => {
    component.counter = 10;
    if (component.counter > 1) {
      component.text.plural = 'Plural';
    } else {
      component.text.single = 'Single';
    }
  });*/

});
