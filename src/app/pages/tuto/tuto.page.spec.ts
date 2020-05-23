import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TutoPage } from './tuto.page';
import { StorageService } from '../../provider/helper/storage.service';
import { Router } from '@angular/router';


describe('TutoPage', () => {
  let component: TutoPage;
  let fixture: ComponentFixture<TutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [StorageService, Router]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
