import { TestBed } from '@angular/core/testing';

import { StyleService } from './style.service';

describe('StyleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StyleService = TestBed.get(StyleService);
    expect(service).toBeTruthy();
  });
});
