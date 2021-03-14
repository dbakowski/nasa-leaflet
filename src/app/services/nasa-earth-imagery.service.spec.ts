import { TestBed } from '@angular/core/testing';

import { NasaEarthImageryService } from './nasa-earth-imagery.service';

describe('NasaEarthImageryService', () => {
  let service: NasaEarthImageryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasaEarthImageryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
