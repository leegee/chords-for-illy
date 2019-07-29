import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { InstrumentsService } from './instruments.service';

const store = {};

const StorageMock: any = {
  get: (key: string) => Promise.resolve(store[key]),
  set: (key, value) => {
    store[key] = value;
  },
};

describe('InstrumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: Storage,
        useValue: StorageMock
      }
    ]
  }));

  it('should be created', () => {
    const service: InstrumentsService = TestBed.get(InstrumentsService);
    expect(service).toBeTruthy();
  });
});
