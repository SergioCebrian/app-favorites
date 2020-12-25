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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tests counter property', () => {
    const expectedCounter: number = 8;

    it('counter is a number', () => {
      component.counter = expectedCounter;
      expect(component.counter).toEqual(jasmine.any(Number));
    });

    it('counter value is eight', () => {
      component.counter = expectedCounter;
      expect(component.counter).toBe(expectedCounter);
    });
  });

  /*describe('tests text property', () => {
    let expectedText: any;

    beforeEach(() => {
      expectedText = { plural: 'Plural', single: 'Single' };
      component.text = expectedText;
    })

    it('text value is plural', () => {
      component.counter = 10;
      expect(component.text.plural).toEqual(expectedText.plural)
    });

  });*/

  describe('tests flag property', () => {
    const expectedFlagText: string = 'Flag';
    
    it('flag value is a string', () => {
      component.flag = expectedFlagText;
      expect(component.flag).toBe(expectedFlagText);
    });
  });

});
