import { TestBed } from '@angular/core/testing';
import { ErrorConfig } from '@configs/error.config';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [ErrorConfig]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('return an error object', () => {
    service.get({ 'code' });
  });*/

});
