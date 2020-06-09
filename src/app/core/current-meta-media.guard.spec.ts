import { inject, TestBed } from '@angular/core/testing';
import { CurrentMetaMediaGuard } from './current-meta-media.guard';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';


describe('CurrentMetaMediaGuard', () => {
  const metaMediaSpy = jasmine.createSpyObj('MetaMediaService', { findAndSetMediaByKey: null });
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [CurrentMetaMediaGuard, { provide: MetaMediaService, useValue: metaMediaSpy }]
    });
  });

  it('should ...', inject([CurrentMetaMediaGuard], (guard: CurrentMetaMediaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
