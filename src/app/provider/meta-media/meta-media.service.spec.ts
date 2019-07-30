import { TestBed } from '@angular/core/testing';

import { MetaMediaService } from './meta-media.service';

describe('MetaMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaMediaService = TestBed.get(MetaMediaService);
    expect(service).toBeTruthy();
  });
});
