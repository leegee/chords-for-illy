import { Injectable } from '@angular/core';

import chordsDatabase from '../chords-open.json';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {
  chordDb = chordsDatabase;

  constructor() {
   }
}
