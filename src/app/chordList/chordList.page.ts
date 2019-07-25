import { Component, OnInit } from '@angular/core';

import { InstrumentsService } from '../instruments.service.js';
import { ChordsService } from '../chords.service';

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

  constructor(
    private instrumentService: InstrumentsService,
    private chordsService: ChordsService,
  ) {
    this.chordDb = this.chordsService.chordDb;
    console.log(this.chordDb);
  }

  async ngOnInit() {
    await this.instrumentService.getInstrumentTuning();
    this.instrument = this.instrumentService.instrument;
    this.tuning = this.instrumentService.tuning;
    this.ready = true;
    console.log(this.tuning, this.instrument);
  }


}
