import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import instrumentTunings from '../instrument-tuning.json';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {
  instrumentDb = instrumentTunings;

  tuning: string;
  instrument: string;

  constructor(private storage: Storage) { }

  setInstrumentTuning(instrument: string, tuning: string) {
    this.storage.set('instrument', instrument);
    this.storage.set('tuning', tuning);
  }

  getInstrumentTuning() {
    return Promise.all([
      // TODO get these values from the json
      this.storage.get('instrument').then((val) => this.instrument = val || 'guitar'),
      this.storage.get('tuning').then((val) => this.tuning = val || 'standard')
    ]);
  }
}
