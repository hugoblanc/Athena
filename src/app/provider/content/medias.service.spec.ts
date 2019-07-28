import { TestBed } from '@angular/core/testing';

import { MediasService } from './medias.service';

describe('MediasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediasService = TestBed.get(MediasService);
    expect(service).toBeTruthy();
  });
});
