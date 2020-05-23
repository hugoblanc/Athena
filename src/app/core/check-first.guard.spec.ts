import { inject, TestBed } from '@angular/core/testing';
import { CheckFirstGuard } from './check-first.guard';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


describe('CheckFirstGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFirstGuard, Storage, Router]
    });
  });

  it('should ...', inject([CheckFirstGuard], (guard: CheckFirstGuard) => {
    expect(guard).toBeTruthy();
  }));
});
