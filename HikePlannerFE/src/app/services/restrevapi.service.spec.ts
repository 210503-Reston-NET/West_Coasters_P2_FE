import { TestBed } from '@angular/core/testing';

import { RestRevApiService } from './restrevapi.service';

describe('RestrevapiService', () => {
  let service: RestRevApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestRevApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
