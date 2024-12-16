import { TestBed } from '@angular/core/testing';

import { WhislistService } from './whislist.service';

describe('WhislistService', () => {
  let service: WhislistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhislistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
