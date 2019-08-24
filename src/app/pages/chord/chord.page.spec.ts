import { CUSTOM_ELEMENTS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordPage } from './chord.page';

import chordDb from '../../../chords-open.json';
import { TabsPageModule } from 'src/app/tabs/tabs.module';
import { ActivatedRoute } from '@angular/router';

const fixtureData = {
  note: 'a',
  type: 'major',
  instrument: 'guitar',
  tuning: 'standard'
};


describe('ChordPage', () => {
  let component: ChordPage;
  let fixture: ComponentFixture<ChordPage>;

  beforeEach(() => {
    const paramMap = new Map();
    Object.keys(fixtureData).forEach(key => paramMap.set(key, fixtureData[key]));

    TestBed.configureTestingModule(
      {
        declarations: [ChordPage],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
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
    fixture = TestBed.createComponent(ChordPage);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('navigate to a chord', () => {
    fixture.ngZone.run(() => {
      const url = `chord/guitar/standard/${fixtureData.note}/${fixtureData.type}`;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.numberOfStrings).toBe(6);
      });
    });
  });


  it('should compute chords', () => {
    const chordDbFrag = component.computeChords(
      chordDb.guitar.standard.A.major, 'major'
    );

    // tslint:disable
    // console.log(JSON.stringify( chordDbFrag, {}, 4 ));
  });

});
