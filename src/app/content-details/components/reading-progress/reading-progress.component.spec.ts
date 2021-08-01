import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingProgressComponent } from './reading-progress.component';

describe('ReadingProgressComponent', () => {
  let component: ReadingProgressComponent;
  let fixture: ComponentFixture<ReadingProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
