import { TestBed } from '@angular/core/testing';

import { CargarStylesService } from './cargar-styles.service';

describe('CargarStylesService', () => {
  let service: CargarStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
