// tslint:disable: no-conditional-assignment
// tslint:disable: one-line

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

import chordDb from '../../../chords.json';
import instrumentTunings from '../../../instrument-tuning.json';
import chordTemplates from '../../../chord-templates.json';

@Component({
  selector: 'app-chord',
  templateUrl: './chord.page.html',
  styleUrls: ['./chord.page.scss'],
})
export class ChordPage implements OnInit {
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
  ) {
    this.instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    this.tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    this.note = this.activatedRoute.snapshot.paramMap.get('note').toUpperCase();
    const type = this.activatedRoute.snapshot.paramMap.get('type').toLowerCase();

    this.title = this.note + ' ' + type;

    console.log('Chord page for ', this.instrument, this.tuning, this.note, type);

    this.numberOfStrings = instrumentTunings[this.instrument][this.tuning].length;

    const chordDbFrag = this.computeChords(
      chordDb[this.instrument][this.tuning][this.note][type], type
    );
    this.initChords(chordDbFrag);
  }

  ngOnInit() { }

  computeChords(chordDbFrag, type) {
    const thisNoteNumber = this.note.toLowerCase().charCodeAt(0) - 97;

    chordTemplates[this.instrument][this.tuning]
      .filter(_ => _.majorminor === type)
      .forEach(template => {
        const fretsToAdd = thisNoteNumber + template.fretsToA;

        chordDbFrag[template.shapeName] = [];

        let skip = false;
        template.frets2strings.forEach(fret2finger => {
          const fret = Object.keys(fret2finger)[0];
          const finger = fret2finger[fret];

          let transposedFret;
          let transposedFinger = finger;

          if (!isNaN(Number(fret))) {
            transposedFret = Number(fret) + fretsToAdd;
            if (transposedFret >= 12) {
              transposedFret -= 12;
            }
            if (transposedFret === 0) {
              skip = true;
            }
          } else {
            transposedFret = fret;
          }

          chordDbFrag[template.shapeName].push({
            [transposedFret]: transposedFinger
          });
        });

        if (skip) {
          delete chordDbFrag[template.shapeName];
        }

      });

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
          this.shapesForInversions[inversionName][fret][stringNumber] = strings2frets[stringNumber] // === fret ?
            = chordDbFrag[inversionName][stringNumber][fret] || '';
        }
      }
    });
  }
}
