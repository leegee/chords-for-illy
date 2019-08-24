import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { InstrumentSelectPage } from './instrumentSelect.page';

const StorageMock: any = {
  get: () => new Promise<any>((resolve, reject) => resolve('')),
  set: () => {}
};

describe('InstrumentSelectPage', () => {
  let component: InstrumentSelectPage;
  let fixture: ComponentFixture<InstrumentSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentSelectPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Storage,
          useValue: StorageMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
