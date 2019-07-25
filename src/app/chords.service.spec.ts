import { TestBed } from '@angular/core/testing';

import { ChordsService } from './chords.service';

describe('ChordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChordsService = TestBed.get(ChordsService);
    expect(service).toBeTruthy();
  });
});
