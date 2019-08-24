import { Component, OnInit } from '@angular/core';

import { InstrumentsService } from '../instruments.service.js';
import { ChordsService } from '../chords.service';
import { ChordService } from '../chord.service.js';

@Component({
  selector: 'app-chordList',
  templateUrl: 'chordList.page.html',
  styleUrls: ['chordList.page.scss']
})
export class ChordListPage implements OnInit {
  chordDb;
  instrument: string;
  tuning: string;
  ready = false;
  circleOfFifths = ChordService.circleOfFifths;

  constructor(
    private instrumentService: InstrumentsService,
    private chordsService: ChordsService,
  ) {
    this.chordDb = this.chordsService.chordDb;
  }

  async ngOnInit() {
    console.log('Chord list init');
    await this.instrumentService.getInstrumentTuning();
    this.instrument = this.instrumentService.instrument;
    this.tuning = this.instrumentService.tuning;
    this.ready = true;
    console.log('Got ', this.instrument, this.tuning);
  }


}
