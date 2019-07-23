import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

import chordDb from '../../../chords.json';

@Component({
  selector: 'app-chord',
  templateUrl: './chord.page.html',
  styleUrls: ['./chord.page.scss'],
})
export class ChordPage implements OnInit {
  chordDb;
  instrument;
  tuning;
  note;
  type;
  chordInversions = {};
  strings = [];

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.chordDb = chordDb;

    this.instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    this.tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    this.note = this.activatedRoute.snapshot.paramMap.get('note');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
  }

  ngOnInit() {
    console.log( 
      Object.keys(
        this.chordDb[this.instrument][this.tuning][this.note][this.type]['first inversion']
      )
    )
  }
}
