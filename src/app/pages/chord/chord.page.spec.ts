import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, provideRoutes, ActivatedRoute } from '@angular/router';

import { routes } from '../../app-routing.module';
import { ChordPage } from './chord.page';

import chordDb from '../../../chords.json';

const fixtureData = {
  note: 'a',
  type: 'major',
  instrument: 'guitar',
  tuning: 'standard'
};

let router: Router;
let location: Location;

describe('ChordPage', () => {
  let component: ChordPage;
  let fixture: ComponentFixture<ChordPage>;

  beforeEach(() => {
    const paramMap = new Map();
    Object.keys(fixtureData).forEach(key => paramMap.set(key, fixtureData[key]));

    TestBed.configureTestingModule(
      {
        imports: [RouterTestingModule.withRoutes(routes)],
        declarations: [ChordPage],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          provideRoutes(routes),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap
              }
            }
          }
        ]
      }
    ).compileComponents();

    fixture = TestBed.createComponent(ChordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ChordPage);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('navigate to a chord', fakeAsync(() => {
    fixture.ngZone.run(() => {
      const url = `chord/guitar/standard/${fixtureData.note}/${fixtureData.type}`;
      router.navigate([url]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // expect({ stuff }).toHaveBeenCalled();
        expect(1).toBe(1);
      });
    });
  }));


  // it('should compute chords', () => {
  //   const chordDbFrag = this.computeChords(
  //     chordDb.guitar['standard'].A.major, 'major'
  //   );

  //   console.log(chordDbFrag);
  // });

});
