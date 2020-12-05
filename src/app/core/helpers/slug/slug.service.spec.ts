import { TestBed } from '@angular/core/testing';

import { SlugService } from './slug.service';

describe('SlugService', () => {
  let service: SlugService;
  let chars: string = "!@#$^&%*()+=-[]\/{}|:<>?,.";
  let fakeTitle: string = 'Hello World!';
  let result: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SlugService ]
    });
    service = TestBed.inject(SlugService);
    result = service.create(fakeTitle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return a string', () => {
    expect(result).toEqual(jasmine.any(String));
  });

  it('should be lowercase', () => {
    expect(result).toEqual(result.toLowerCase());
  });

  it('should be contain a - symbol', () => {
    expect(result).toContain('-');
  });
});
