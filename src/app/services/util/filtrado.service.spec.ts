import { TestBed } from '@angular/core/testing';

import { FiltradoService } from './filtrado.service';

describe('FiltradoService', () => {
  let service: FiltradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
