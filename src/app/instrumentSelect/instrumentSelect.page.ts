import { Component, OnInit } from '@angular/core';

import { InstrumentsService } from '../instruments.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrumentSelect',
  templateUrl: 'instrumentSelect.page.html',
  styleUrls: ['instrumentSelect.page.scss']
})
export class InstrumentSelectPage implements OnInit {
  tuning: string;
  instrument: string;
  instrumentDb: {};

  constructor(
    private router: Router,
    private instrumentService: InstrumentsService
  ) {
    this.instrumentDb = this.instrumentService.instrumentDb;
  }

  ngOnInit() {
    this.instrumentService.getInstrumentTuning();
  }

  async setInstrumentTuning(instrument: string, tuning: string) {
    await this.instrumentService.setInstrumentTuning(instrument, tuning);
    console.log('Set ', instrument, tuning);
    this.router.navigate(['/']);
  }
}
