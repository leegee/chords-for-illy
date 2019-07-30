// tslint:disable: no-conditional-assignment
// tslint:disable: one-line
// tslint:disable: object-literal-key-quotes

import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

import chordDb from '../../../chords.json';
import instrumentTunings from '../../../instrument-tuning.json';
import chordTemplates from '../../../chord-templates.json';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-chord',
  templateUrl: './chord.page.html',
  styleUrls: ['./chord.page.scss'],
})
export class ChordPage implements OnInit {
  static note2interval = {
    'a': 0,
    'b♭': 1,
    'b': 2,
    'c': 3,
    'd♭': 4,
    'd': 5,
    'e♭': 6,
    'e': 7,
    'f': 8,
    'g♭': 9,
    'g': 10,
    'a♭': 11
  };

  title: string;
  inversionName2firstFrettedStringFingering = {};
  numberOfStrings: number;
  instrument: string;
  tuning: string;
  note: string;
  shapesForInversions = {};
  nutMarkings = {};

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    this.tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    this.note = (this.activatedRoute.snapshot.paramMap.get('note') || '').toUpperCase();
    const type = (this.activatedRoute.snapshot.paramMap.get('type') || '').toLowerCase();

    console.log('Chord page for ', this.instrument, this.tuning, this.note, type);

    if (!(this.instrument && this.tuning && this.note && type)) {
      throw new Error(
        // tslint:disable-next-line: max-line-length
        `Invalid URL: chord/${this.instrument || ':instrument'}/${this.tuning || ':tuning'}/${this.note || ':note'}/${type || '[major|minor]'}`
      );
    }

    this.title = this.note + ' ' + type;


    this.numberOfStrings = instrumentTunings[this.instrument][this.tuning].length;

    chordDb[this.instrument][this.tuning][this.note] = chordDb[this.instrument][this.tuning][this.note] || {
      major: [],
      minor: []
    };
    chordDb[this.instrument][this.tuning][this.note][type] = chordDb[this.instrument][this.tuning][this.note][type] || {};

    const chordDbFrag = this.computeChords(
      chordDb[this.instrument][this.tuning][this.note][type], type
    );
    this.initChords(chordDbFrag);
  }

  computeChords(chordDbFrag, type) {
    const thisNoteNumber = ChordPage.note2interval[this.note.toLowerCase()];

    chordTemplates[this.instrument][this.tuning]
      .filter(_ => _.majorminor === type)
      .forEach(template => {
        const fretsToAdd = (thisNoteNumber + Number(template.fretsToA));
        const newFret2finger = [];
        const fingersInChord = {};
        let fingersOver12fret = 0;

        template.frets2strings.forEach(fret2finger => {
          const fret = Object.keys(fret2finger)[0];
          const transposedFret = (!isNaN(Number(fret))) ? Number(fret) + fretsToAdd : fret;
          if (transposedFret > 14) {
            fingersOver12fret++;
          }

          if (fret !== 'x') {
            fingersInChord[fret2finger[fret]] = fingersInChord[fret2finger[fret]] || 0;
            fingersInChord[fret2finger[fret]]++;
          }

          newFret2finger.push({ [transposedFret]: fret2finger[fret] });
        });

        if (fingersOver12fret >= Object.keys(fingersInChord).length) {
          chordDbFrag[template.shapeName] = newFret2finger.map(
            _ => {
              const fret = Object.keys(_)[0];
              const finger = Object.values(_)[0];
              return {
                [
                  (!isNaN(Number(fret))) ? (Number(fret) - 12) : fret
                ]: finger
              };
            });
        }

        else {
          chordDbFrag[template.shapeName] = newFret2finger;
        }

      }); // Next template

    return chordDbFrag;
  }

  initChords(chordDbFrag) {
    this.shapesForInversions = {};

    Object.keys(chordDbFrag).forEach(inversionName => {
      this.shapesForInversions[inversionName] = [];
      this.nutMarkings[inversionName] = new Array(6).fill('');

      const strings2frets: number[] = [];

      chordDbFrag[inversionName].forEach((fret2finger, stringNumber) => {
        const fingering = Object.keys(fret2finger)[0];
        if (fingering === 'x') {
          this.nutMarkings[inversionName][stringNumber] = 'x';
        }
        else if (Number(fingering) === 0) {
          this.nutMarkings[inversionName][stringNumber] = 'o';
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
        this.shapesForInversions[inversionName][fret] = [];

        for (let stringNumber = 0; stringNumber < this.numberOfStrings; stringNumber++) {
          this.shapesForInversions[inversionName][fret][stringNumber] = strings2frets[stringNumber]
            = chordDbFrag[inversionName][stringNumber][fret] || '';
        }
      }

      // Add barre
      // let lastFinger = 0;
      // this.shapesForInversions[inversionName][
      //   this.inversionName2firstFrettedStringFingering[inversionName]
      // ].forEach((finger, index) => {
      //   if (finger !== 0 && finger === lastFinger && finger === '') {
      //     this.shapesForInversions[inversionName][
      //       this.inversionName2firstFrettedStringFingering[inversionName]
      //     ][index] = lastFinger;
      //   }

      //   if (finger !== '') {
      //     lastFinger = finger;
      //   }
      // });
    });
  }

  numeric = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return Number(a.key) > Number(b.key) ? 1 : (Number(b.key) > Number(a.key) ? -1 : 0);
  }

}
