import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create Alert with options', () => {
    expect(service.presentAlert(
      { cssClass: 'c-alert--danger', header: 'Fake Header', message: 'Fake Message', buttons: [] }
    )).toBeTruthy();
  });
});
