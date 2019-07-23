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
  inversion2firstFret = {};
  numberOfStrings: number;
  shapesForInversions = {};

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    const instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    const tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    const note = this.activatedRoute.snapshot.paramMap.get('note');
    const type = this.activatedRoute.snapshot.paramMap.get('type');

    this.title = note + ' ' + type;

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
      chordDbFrag[inversionName].forEach(fret2finger => {
        strings2frets.push(Number(Object.keys(fret2finger)[0]));
      });

      this.inversion2firstFret[inversionName] = Math.min(...strings2frets);
      const lastFret = Math.max(...strings2frets);

      for (let fret = this.inversion2firstFret[inversionName]; fret <= lastFret; fret++) {
        shapesForInversions[inversionName][fret] = [];
        for (let stringNumber = 0; stringNumber < this.numberOfStrings; stringNumber++) {
          shapesForInversions[inversionName][fret][stringNumber] = strings2frets[stringNumber] // === fret ?
            = chordDbFrag[inversionName][stringNumber][fret] || '';

          // TODO Handle high inversions with open strings
          // if (strings2frets[stringNumber] === 0 && lastFret < 5) {
          // }
        }
      }
    });

    return shapesForInversions;
  }
}
