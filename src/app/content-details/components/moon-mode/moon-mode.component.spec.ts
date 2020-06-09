import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoonModeComponent } from './moon-mode.component';


describe('MoonModeComponent', () => {
  let component: MoonModeComponent;
  let fixture: ComponentFixture<MoonModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoonModeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
