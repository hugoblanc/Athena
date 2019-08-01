import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Slides3dComponent } from './slides3d.component';

describe('Slides3dComponent', () => {
  let component: Slides3dComponent;
  let fixture: ComponentFixture<Slides3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Slides3dComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Slides3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
