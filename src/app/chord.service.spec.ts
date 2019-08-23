import { TestBed } from '@angular/core/testing';

import { ChordService } from './chord.service';

describe('ChordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChordService = TestBed.get(ChordService);
    expect(service).toBeTruthy();
  });
});
