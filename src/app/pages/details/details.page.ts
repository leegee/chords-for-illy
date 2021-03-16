import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';
import { ChordService } from '../../chord.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  title: string;
  inversionName2firstFrettedStringFingering = {};
  instrument: string;
  tuning: string;
  note: string;
  type: string;
  nutMarkings = {};
  shapesForInversions = {};
  inversion: string;
  inversionShape = {};
  barre: Array<string[]> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private chordService: ChordService
  ) { }

  ngOnInit() {
    this.instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    this.tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    this.note = (this.activatedRoute.snapshot.paramMap.get('note') || '').toUpperCase();
    this.type = (this.activatedRoute.snapshot.paramMap.get('type') || '').toLowerCase();
    this.inversion = (this.activatedRoute.snapshot.paramMap.get('inversion') || ''); // .toLowerCase();

    console.log('Detail page for ', this.instrument, this.tuning, this.note, this.type, this.inversion);

    if (!(this.instrument && this.tuning && this.note && this.type)) {
      throw new Error(
        // tslint:disable-next-line: max-line-length
        `Invalid URL: chord/${this.instrument || ':instrument'}/${this.tuning || ':tuning'}/${this.note || ':note'}/${this.type || '[major|minor]'}`
      );
    }

    this.title = [this.note, this.type, this.inversion].join(' ');

    const chordDbFrag = this.chordService.computeChords(
      this.instrument, this.tuning, this.note, this.type, this.inversion
    );

    [this.shapesForInversions, this.inversionName2firstFrettedStringFingering, this.nutMarkings] =
      this.chordService.makeInversions(this.instrument, this.tuning, this.note, this.type, chordDbFrag, this.inversion);


    // Maybe add barres: inelegant, to say the least.
    Object.keys(this.shapesForInversions).forEach((inversionShapeKey) => {

      for (let fretNumber = 0; fretNumber < this.shapesForInversions[inversionShapeKey].length; fretNumber++) {
        if (this.shapesForInversions[inversionShapeKey][fretNumber] === undefined) {
          continue;
        }

        const stringsAtFret = this.shapesForInversions[inversionShapeKey][fretNumber];

        // Identify barre - ie more than one string fretted by a finger
        const fingerCount: number[] = [];
        stringsAtFret.forEach((fingerOnString) => {
          if (typeof fingerOnString === "number") {
            fingerCount[fingerOnString] = fingerCount[fingerOnString] ? fingerCount[fingerOnString] + 1 : 1;
          }
        });

        // Add barre classes
        fingerCount.forEach(fingersOnString => {
          if (fingersOnString < 2) return;

          let fingersFrettingCount = 0;
          let firstStringForBarre;
          let lastStringForBarre;
          let barreFinger;

          stringsAtFret.forEach((fingerOnString, stringNumber) => {
            if (typeof fingerOnString === "number") {
              if (++fingersFrettingCount === 1) {
                this.barre[fretNumber] = [];
                this.barre[fretNumber][stringNumber] = 'start';
                firstStringForBarre = stringNumber;
                barreFinger = fingerOnString;
              } else if (fingerOnString === barreFinger) {
                this.barre[fretNumber][stringNumber] = 'mid';
                lastStringForBarre = stringNumber;
              }
            }
          });

          this.barre[fretNumber][lastStringForBarre] = 'end';

          // Add indicators for fingers missing in chord box data:
          stringsAtFret.forEach((fingerOnString, stringNumber) => {
            if (stringNumber > firstStringForBarre && stringNumber < lastStringForBarre) {
              stringsAtFret[stringNumber] = stringsAtFret[stringNumber] || barreFinger;
              this.barre[fretNumber][stringNumber] = 'mid';
            }
          });

        }); // Next finger
      }; // Next string
    }); // Next inversion
  }

  numeric = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return Number(a.key) > Number(b.key) ? 1 : (Number(b.key) > Number(a.key) ? -1 : 0);
  }
}
