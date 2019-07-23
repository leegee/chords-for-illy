import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordPage } from './chord.page';

describe('ChordPage', () => {
  let component: ChordPage;
  let fixture: ComponentFixture<ChordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
