import { TestBed } from '@angular/core/testing';

import { ApiRestServiceService } from './api-rest-service.service';

describe('ApiRestServiceService', () => {
  let service: ApiRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
