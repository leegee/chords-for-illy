import { CUSTOM_ELEMENTS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordPage } from './chord.page';

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
        expect(component.tuning).toBe('standard');
        expect(component.note).toBe(fixtureData.note);
        expect(component.type).toBe(fixtureData.type);
      });
    });
  });

});
