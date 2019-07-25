import { Component, OnInit } from '@angular/core';

import { InstrumentsService } from '../instruments.service.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  tuning: string;
  instrument: string;
  instrumentDb: {};

  constructor(
    private instrumentService: InstrumentsService
  ) {
    this.instrumentDb = this.instrumentService.instrumentDb;
  }

  ngOnInit(){
    this.instrumentService.getInstrumentTuning();
  }

  setInstrumentTuning(instrument: string, tuning: string) {
    this.instrumentService.setInstrumentTuning(instrument, tuning);
  }
}
