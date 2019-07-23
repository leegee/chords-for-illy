import { Component } from '@angular/core';

import chordDb from '../../chords.json';

@Component({
  selector: 'app-chordList',
  templateUrl: 'chordList.page.html',
  styleUrls: ['chordList.page.scss']
})
export class ChordListPage {
  chordDb;
  instrument = 'guitar';
  tuning = 'standard';

  constructor() {
    this.chordDb = chordDb;
  }


}
