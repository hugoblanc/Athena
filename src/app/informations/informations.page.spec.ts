import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPage } from './informations.page';

describe('InformationsPage', () => {
  let component: InformationsPage;
  let fixture: ComponentFixture<InformationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
