import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import instrumentTunings from '../instrument-tuning.json';

// TODO get these values from the json
const DEFAULT_CHORD_SET = 'manouche';
const DEFAULT_INSTRUMENT = 'guitar';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {
  instrumentDb = instrumentTunings;

  tuning: string;
  instrument: string;

  constructor(private storage: Storage) { }

  setInstrumentTuning(instrument: string, tuning: string) {
    return Promise.all([
      this.storage.set('instrument', instrument),
      this.storage.set('tuning', tuning)
    ]);
  }

  getInstrumentTuning() {
    return Promise.all([
      this.storage.get('instrument').then((val) => this.instrument = val || DEFAULT_INSTRUMENT),
      this.storage.get('tuning').then((val) => this.tuning = val || DEFAULT_CHORD_SET)
    ]);
  }
}
