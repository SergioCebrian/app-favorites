import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let expectedText;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    expectedText = { plural: 'Plural', single: 'Single' };
    component.text = expectedText;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test flag property', () => {
    
    it('Testing flag is a string', () => {
      component.flag = 'Flag';
      expect(component.flag).toEqual(jasmine.any(String));
    });

  });

  describe('test counter', () => {

    it('Testing counter is a number', () => {
      component.counter = 1;
      expect(component.counter).toEqual(jasmine.any(Number));
    });

  });

  describe('test message', () => {

    it('Testing message is single when counter is less or equal to one', () => {
      component.counter = 1;
      component.text = expectedText.single;
      expect(component.text).toBe(expectedText.single);
    });

    it('Testing message is plural when counter is more to one', () => {
      component.counter = 8;
      component.text = expectedText.plural;
      expect(component.text).toBe(expectedText.plural);
    });

  });

});
