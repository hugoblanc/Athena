import { TestBed, async, inject } from '@angular/core/testing';

import { CheckFirstGuard } from './check-first.guard';

describe('CheckFirstGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFirstGuard]
    });
  });

  it('should ...', inject([CheckFirstGuard], (guard: CheckFirstGuard) => {
    expect(guard).toBeTruthy();
  }));
});
