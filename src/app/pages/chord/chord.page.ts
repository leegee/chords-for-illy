import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

import chordDb from '../../../chords.json';
import instrumentTunings from '../../../instrument-tuning.json';

@Component({
  selector: 'app-chord',
  templateUrl: './chord.page.html',
  styleUrls: ['./chord.page.scss'],
})
export class ChordPage implements OnInit {
  chordDbFrag;
  numberOfStrings;
  chordInversions = {};

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    const instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    const tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    const note = this.activatedRoute.snapshot.paramMap.get('note');
    const type = this.activatedRoute.snapshot.paramMap.get('type');

    this.chordDbFrag = chordDb[instrument][tuning][note][type];
    this.numberOfStrings = instrumentTunings[instrument][tuning].length;
  }

  ngOnInit() {
    Object.keys(this.chordDbFrag).forEach(inversionName => {
      console.log({inversionName});

      console.log(this.chordDbFrag[inversionName]);

      const strings2frets = [];
      this.chordDbFrag[inversionName].forEach(fret2finger => {
        // console.log(fret2finger);
        strings2frets.push(Number(Object.keys(fret2finger)[0]));
      });

        console.log('strings2frets', strings2frets);

        for (let fret = Math.min(chordDb[inversionName]); fret <= Math.max(chordDb[inversionName]); fret++) {
          for (let stringNumber = 0; stringNumber < this.numberOfStrings; stringNumber++) {

          }
        }

    });
  }
}
