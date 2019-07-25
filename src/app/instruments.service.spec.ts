import { TestBed } from '@angular/core/testing';

import { InstrumentsService } from './instruments.service';

describe('InstrumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstrumentsService = TestBed.get(InstrumentsService);
    expect(service).toBeTruthy();
  });
});
