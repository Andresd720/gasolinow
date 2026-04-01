import { TestBed } from '@angular/core/testing';

import { DistanciaService } from './distancia.service';

describe('DistanciaService', () => {
  let service: DistanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
