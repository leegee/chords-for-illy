import { Injectable } from '@angular/core';

import chordsDatabase from '../chords.json';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {
  chordDb = chordsDatabase;

  constructor() {
   }
}
