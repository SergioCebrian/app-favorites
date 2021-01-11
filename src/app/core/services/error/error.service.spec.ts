import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*describe('Tests error service', () => {

    it('Testing get error code', () => {
      const fakeErrorMock = { code: 'Error code', message: 'Error message' }
      expect(service.get(fakeErrorMock)).toBe({ code: ['Error code'], message: fakeErrorMock.message });
    });

  });*/

});
