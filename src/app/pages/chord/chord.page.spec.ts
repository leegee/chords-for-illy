import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, provideRoutes } from '@angular/router';

import { routes } from '../../app-routing.module';
import { ChordPage } from './chord.page';

import chordDb from '../../../chords.json';

let location: Location;
let router: Router;


const fixtureData = {
  note: 'A',
  type: 'major'
};

describe('ChordPage', () => {
  let component: ChordPage;
  let fixture: ComponentFixture<ChordPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ChordPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideRoutes(routes)
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(ChordPage);
    // router.initialNavigation();
  });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('navigate to a chord', fakeAsync(() => {
    fixture.ngZone.run(() => {
      const url = `chord/guitar/standard/${fixtureData.note}/${fixtureData.type}`;
      console.log('NAVIGATE TO ', url);
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
