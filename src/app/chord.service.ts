// tslint:disable: no-conditional-assignment
// tslint:disable: one-line
// tslint:disable: object-literal-key-quotes

import { Injectable } from '@angular/core';

import chordDb from '../chords-open.json';
import instrumentTunings from '../instrument-tuning.json';
import chordTemplates from '../chord-templates.json';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChordService {
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

  static circleOfFifths = [
    'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F', 'C', 'G', 'D'
  ];

  title: string;
  inversionName2firstFrettedStringFingering = {};
  instrument: string;
  tuning: string;
  note: string;
  type: string;
  shapesForInversions = {};
  nutMarkings = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private chordService: ChordService
  ) { }

  computeChords(instrument: string, tuning: string, note: string, type: string, inversion?: string) {

    chordDb[instrument][tuning][note] = chordDb[instrument][tuning][note] || {
      major: [],
      minor: []
    };
    chordDb[instrument][tuning][note][type] = chordDb[instrument][tuning][note][type] || {};

    const chordDbFrag = chordDb[instrument][tuning][note][type];

    const thisNoteNumber = ChordService.note2interval[note.toLowerCase()];

    chordTemplates[instrument][tuning]
      .filter(_ => _.majorminor === type)
      .filter(_ => !inversion || _.shapeName === inversion)
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

  makeInversions(instrument: string, tuning: string, note: string, type: string, chordDbFrag, inversion?: string) {
    const shapesForInversions = {};
    const inversionName2firstFrettedStringFingering = {};
    const nutMarkings = {};

    const numberOfStrings = instrumentTunings[instrument][tuning] ? instrumentTunings[instrument][tuning].length : 6;

    Object.keys(chordDbFrag)  .forEach(inversionName => {

      if (inversion !== undefined && inversionName !== inversion) {
        return;
      }

      shapesForInversions[inversionName] = [];
      nutMarkings[inversionName] = new Array(6).fill('');

      const strings2frets: number[] = [];

      chordDbFrag[inversionName].forEach((fret2finger, stringNumber) => {
        const fingering = Object.keys(fret2finger)[0];
        if (fingering === 'x') {
          nutMarkings[inversionName][stringNumber] = 'x';
        }
        else if (Number(fingering) === 0) {
          nutMarkings[inversionName][stringNumber] = 'o';
          strings2frets[stringNumber] = 0;
        }
        else {
          strings2frets[stringNumber] = Number(fingering);
        }
      });

      const string2fretsNumbersOnly = (strings2frets.filter(_ => typeof _ !== 'undefined'));

      inversionName2firstFrettedStringFingering[inversionName] = Math.min(...string2fretsNumbersOnly);
      const lastFret = Math.max(...string2fretsNumbersOnly);

      for (let fret = inversionName2firstFrettedStringFingering[inversionName]; fret <= lastFret; fret++) {
        shapesForInversions[inversionName][fret] = [];

        for (let stringNumber = 0; stringNumber < numberOfStrings; stringNumber++) {
          shapesForInversions[inversionName][fret][stringNumber] = strings2frets[stringNumber]
            = chordDbFrag[inversionName][stringNumber][fret] || '';
        }
      }

      // Add barre
      // let lastFinger = 0;
      // shapesForInversions[inversionName][
      //   this.inversionName2firstFrettedStringFingering[inversionName]
      // ].forEach((finger, index) => {
      //   if (finger !== 0 && finger === lastFinger && finger === '') {
      //     shapesForInversions[inversionName][
      //       this.inversionName2firstFrettedStringFingering[inversionName]
      //     ][index] = lastFinger;
      //   }

      //   if (finger !== '') {
      //     lastFinger = finger;
      //   }
      // });
    });

    return [shapesForInversions, inversionName2firstFrettedStringFingering, nutMarkings];
  }

}
