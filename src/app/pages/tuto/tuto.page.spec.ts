import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StorageService } from '../../provider/helper/storage.service';
import { TutoPage } from './tuto.page';



describe('TutoPage', () => {
  let component: TutoPage;
  let fixture: ComponentFixture<TutoPage>;
  const storageServiceSpy = jasmine.createSpyObj('StorageService', { initFirstLaunch: null });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TutoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: StorageService, useValue: storageServiceSpy }],
      imports: [RouterTestingModule]
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
