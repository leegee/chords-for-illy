import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage';

import { routes } from '../../app-routing.module';
import { ChordPage } from './chord.page';

import chordDb from '../../../chords.json';

let location: Location;
let router: Router;

const fixtureData = {
  note: 'A',
  type: 'major'
};

// const StorageMock: any = {
//   get: (key: string) => {
//     console.log('***', key);
//     return Promise.resolve(fixtureData[key]);
//   },
//   set: () => {
//     throw new Error('unexpected call to Storage.ste')
//   }
// };

describe('ChordPage', () => {
  let component: ChordPage;
  let fixture: ComponentFixture<ChordPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ChordPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [
      //   {
      //     provide: Storage,
      //     useValue: StorageMock
      //   }
      // ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(ChordPage);
    router.initialNavigation();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to a chord', fakeAsync(() => {
    router.navigate([`chord/guitar/standard/${fixtureData.note}/${fixtureData.type}`]);
    tick();
    expect(location.path()).toBe('/chord/guitar/standard/${fixtureData.note}/${fixtureData.type}`');
  }));

  // it('should compute chords', () => {
  //   const chordDbFrag = this.computeChords(
  //     chordDb.guitar['standard'].A.major, 'major'
  //   );

  //   console.log(chordDbFrag);
  // });

});
