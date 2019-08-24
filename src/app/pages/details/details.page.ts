import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  inversion: string;
  nutMarkings = {};
  shapesForInversions = {};
  inversionShape = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private chordService: ChordService
  ) { }

  ngOnInit() {
    this.instrument = this.activatedRoute.snapshot.paramMap.get('instrument');
    this.tuning = this.activatedRoute.snapshot.paramMap.get('tuning');
    this.note = (this.activatedRoute.snapshot.paramMap.get('note') || '').toUpperCase();
    this.type = (this.activatedRoute.snapshot.paramMap.get('type') || '').toLowerCase();
    this.inversion = (this.activatedRoute.snapshot.paramMap.get('inversion') || '').toLowerCase();

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

    this.inversionShape = this.shapesForInversions;
  }
}
