import { TestBed } from '@angular/core/testing';

import { HelpService } from './help.service';

describe('HelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpService = TestBed.get(HelpService);
    expect(service).toBeTruthy();
  });

  it('should contains a displayHelp method', () => {
    const service: HelpService = TestBed.get(HelpService);
    expect(service.displayHelp).toBeTruthy();
  });


});
