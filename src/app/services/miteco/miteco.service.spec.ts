import { TestBed } from '@angular/core/testing';

import { MITECOService } from './miteco.service';

describe('MITECOService', () => {
  let service: MITECOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MITECOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
