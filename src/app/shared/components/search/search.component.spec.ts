import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('by default term is an empty string', () => {
    expect(component.term).toBe('');
  });

  it('should click() search button', fakeAsync(() => {
    const buttonElement = fixture.debugElement.query(By.css('[name="search-outline"]'));

    spyOn(component, 'search');
    buttonElement.triggerEventHandler('click', null);
    tick();
    expect(component.search).toHaveBeenCalled();
  }));

  it('should raise OnSearch event when search button is clicked', () => {
    let buttonElement = fixture.debugElement.query(By.css('[name="search-outline"]')),
        expectedTerm = { term: 'term' },
        searchTerm;

    component.term = expectedTerm.term;
    component.OnSearch.subscribe(term => searchTerm = term);
    buttonElement.triggerEventHandler('click', null);
    expect(searchTerm).toEqual(expectedTerm);
  });

});
