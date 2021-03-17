import { CUSTOM_ELEMENTS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentSelectPage } from './instrumentSelect.page';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const fixtureData = {
  note: 'a',
  type: 'major',
  instrument: 'guitar',
  tuning: 'standard'
};


describe('InstrumentSelectPage', () => {
  let component: InstrumentSelectPage;
  let fixture: ComponentFixture<InstrumentSelectPage>;

  beforeEach(() => {
    const paramMap = new Map();
    Object.keys(fixtureData).forEach(key => paramMap.set(key, fixtureData[key]));

    TestBed.configureTestingModule(
      {
        declarations: [InstrumentSelectPage],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [RouterTestingModule],
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

    fixture = TestBed.createComponent(InstrumentSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture = TestBed.createComponent(InstrumentSelectPage);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
