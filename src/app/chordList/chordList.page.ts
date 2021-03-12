import { Component, OnInit } from '@angular/core';

import { InstrumentsService } from '../instruments.service.js';
import { ChordService } from '../chord.service.js';

@Component({
  selector: 'app-chordList',
  templateUrl: 'chordList.page.html',
  styleUrls: ['chordList.page.scss']
})
export class ChordListPage implements OnInit {
  screenSize: string;
  instrument: string;
  tuning: string;
  ready = false;
  circleOfFifths = ChordService.circleOfFifths;

  constructor(
    private instrumentService: InstrumentsService
  ) {
    this.screenSize = screen.width > 900 ? 'desktop' : 'mobile';
    console.log('screenSize: ', this.screenSize);
  }

  async ngOnInit() {
    await this.instrumentService.getInstrumentTuning();
    this.instrument = this.instrumentService.instrument;
    this.tuning = this.instrumentService.tuning;
    this.ready = true;
    console.log('Chord list for ', this.instrument, this.tuning);
  }


}
