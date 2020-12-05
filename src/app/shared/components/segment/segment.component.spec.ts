import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { SegmentComponent } from './segment.component';

describe('SegmentComponent', () => {
  let component: SegmentComponent;
  let fixture: ComponentFixture<SegmentComponent>;
  let tabsList: string[] = ['visits', 'logs'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`default tab must be '${ tabsList[0] }'`, () => {
    component.defaultTabActive = tabsList[0];
    expect(component.defaultTabActive).toBe(tabsList[0]);
  });

  it('tabsList must be an array strings', () => {
    component.allTabs = tabsList;
    expect(component.allTabs).toEqual(tabsList);
  });

  it('should segmentChanged() event work', () => {
    const segmentElement = fixture.debugElement.query(By.css('ion-segment'));

    spyOn(component, 'segmentChanged');
    segmentElement.triggerEventHandler('ionChange', null);
    expect(component.segmentChanged).toHaveBeenCalled();
  });

  /*it('output OnCurrentTabActive when ion-segment change', () => {
    const segmentExpected = { tab: tabsList[1] };
    
    component.OnCurrentTabActive.subscribe(segment => expect(segment).toBe(segmentExpected));
    component.segmentChanged('logs');
  });*/

});
