import { TestBed } from '@angular/core/testing';

import { HPApiService } from './hpapi.service';

describe('RestRevApiService', () => {
  let service: HPApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HPApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
