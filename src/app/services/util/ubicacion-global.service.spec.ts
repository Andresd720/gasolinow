import { TestBed } from '@angular/core/testing';

import { UbicacionGlobalService } from './ubicacion-global.service';

describe('UbicacionGlobalService', () => {
  let service: UbicacionGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
