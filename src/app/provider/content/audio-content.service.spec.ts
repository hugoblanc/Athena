import { TestBed } from '@angular/core/testing';

import { AudioContentService } from './audio-content.service';

describe('AudioContentService', () => {
  let service: AudioContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
