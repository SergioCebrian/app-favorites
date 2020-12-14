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

  describe('tests text property', () => {
    const expectedPluralText: { [key: string]: string } = { plural: 'Plural' },
          expectedSingleText: { [key: string]: string } = { single: 'single' };

    it('text value is plural', () => {
      component.text = expectedPluralText;
      expect(component.text).toBe(expectedPluralText);
    });

    it('text value is single', () => {
      component.text = expectedSingleText;
      expect(component.text).toBe(expectedSingleText);
    });
  });

  describe('tests flag property', () => {
    const expectedFlagText: string = 'Flag';
    
    it('flag value is a string', () => {
      component.flag = expectedFlagText;
      expect(component.flag).toBe(expectedFlagText);
    });
  });

});
