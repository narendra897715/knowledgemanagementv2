import { TestBed } from '@angular/core/testing';

import { GlobalinterfaceserviceService } from './app.interface';

describe('GlobalinterfaceserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalinterfaceserviceService = TestBed.get(GlobalinterfaceserviceService);
    expect(service).toBeTruthy();
  });
});
