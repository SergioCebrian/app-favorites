import { TestBed } from '@angular/core/testing';

import { PreloaderService } from './preloader.service';

describe('PreloaderService', () => {
  let service: PreloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('if show() clicked must return true', () => {
    service.isLoading.subscribe(state => {
      expect(state).toBeTrue();
    });
    service.show();
  });

  it('if hide() clicked must return false', () => {
    service.isLoading.subscribe(state => {
      expect(state).toBeFalse();
    });
    service.hide();
  });

});
