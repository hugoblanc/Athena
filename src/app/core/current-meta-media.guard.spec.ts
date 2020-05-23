import { inject, TestBed } from '@angular/core/testing';
import { CurrentMetaMediaGuard } from './current-meta-media.guard';


describe('CurrentMetaMediaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentMetaMediaGuard]
    });
  });

  it('should ...', inject([CurrentMetaMediaGuard], (guard: CurrentMetaMediaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
