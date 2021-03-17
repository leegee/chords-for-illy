import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';
import { ChordService } from 'src/app/chord.service.js';

@Component({
  selector: 'app-chord',
  templateUrl: './chord.page.html',
  styleUrls: ['./chord.page.scss'],
})
export class ChordPage implements OnInit {
  title: string;
  inversionName2firstFrettedStringFingering = {};
  instrument: string;
  tuning: string;
  note: string;
  type: string;
  nutMarkings = {};
  shapesForInversions = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private chordService: ChordService
  ) { }

  ngOnInit() {
    this.instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    this.tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    this.note = (this.activatedRoute.snapshot.paramMap.get('note') || '').toUpperCase();
    this.type = (this.activatedRoute.snapshot.paramMap.get('type') || '').toLowerCase();


    console.log('Chord page for ', this.instrument, this.tuning, this.note, this.type);

    if (!(this.instrument && this.tuning && this.note && this.type)) {
      throw new Error(
        // tslint:disable-next-line: max-line-length
        `Invalid URL: chord/${this.instrument || ':instrument'}/${this.tuning || ':tuning'}/${this.note || ':note'}/${this.type || '[major|minor]'}`
      );
    }

    this.title = this.note + ' ' + this.type;

    const chordDbFrag = this.chordService.computeChords(
      this.instrument, this.tuning, this.note, this.type
    );

    [this.shapesForInversions, this.inversionName2firstFrettedStringFingering, this.nutMarkings] =
      this.chordService.makeInversions(this.instrument, this.tuning, this.note, this.type, chordDbFrag);
  }

  numeric = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return Number(a.key) > Number(b.key) ? 1 : (Number(b.key) > Number(a.key) ? -1 : 0);
  }

  chordOrder = (a: KeyValue<string, string[]>, b: KeyValue<string, string[]>): number => {
    return Number(a.value.findIndex(_ => _ !== undefined)) > Number(b.value.findIndex(_ => _ !== undefined)) ? 1 : (Number(b.value.findIndex(_ => _ !== undefined)) > Number(a.value.findIndex(_ => _ !== undefined)) ? -1 : 0);
  }
}
