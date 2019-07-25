// tslint:disable: no-conditional-assignment
// tslint:disable: one-line

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
  title: string;
  inversionName2firstFrettedStringFingering = {};
  numberOfStrings: number;
  shapesForInversions = {};
  nutMarkings = new Array(6).fill(''); // enum X O

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    const instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    const tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    const note = this.activatedRoute.snapshot.paramMap.get('note').toUpperCase();
    const type = this.activatedRoute.snapshot.paramMap.get('type').toLowerCase();

    this.title = note + ' ' + type;

    console.log(instrument, tuning, note, type);

    const chordDbFrag = chordDb[instrument][tuning][note][type];
    this.numberOfStrings = instrumentTunings[instrument][tuning].length;

    this.shapesForInversions = this.initChords(chordDbFrag);
  }

  ngOnInit() { }

  initChords(chordDbFrag) {
    const shapesForInversions = {};

    Object.keys(chordDbFrag).forEach(inversionName => {
      shapesForInversions[inversionName] = [];

      const strings2frets: number[] = [];

      chordDbFrag[inversionName].forEach((fret2finger, stringNumber) => {
        const fingering = Object.keys(fret2finger)[0];
        if (fingering === 'x') {
          this.nutMarkings[stringNumber] = 'x';
        }
        else if (Number(fingering) === 0) {
          this.nutMarkings[stringNumber] = 'o';
          strings2frets[stringNumber] = 0;
        }
        else {
          strings2frets[stringNumber] = Number(fingering);
        }
      });

      const string2fretsNumbersOnly = (strings2frets.filter(_ => typeof _ !== 'undefined'));

      this.inversionName2firstFrettedStringFingering[inversionName] = Math.min(...string2fretsNumbersOnly);
      const lastFret = Math.max(...string2fretsNumbersOnly);

      for (let fret = this.inversionName2firstFrettedStringFingering[inversionName]; fret <= lastFret; fret++) {
        shapesForInversions[inversionName][fret] = [];

        for (let stringNumber = 0; stringNumber < this.numberOfStrings; stringNumber++) {
          shapesForInversions[inversionName][fret][stringNumber] = strings2frets[stringNumber] // === fret ?
            = chordDbFrag[inversionName][stringNumber][fret] || '';
        }
      }

      // while (shapesForInversions[inversionName].length < 3) {
      //   shapesForInversions[inversionName].push(new Array().fill(''));
      // }
    });

    return shapesForInversions;
  }
}
