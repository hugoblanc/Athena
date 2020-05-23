import { TestBed } from '@angular/core/testing';

import { HelpService } from './help.service';

describe('HelpService', () => {
  const validCode = 'content-details';
  const invalidCode = 'AZERTUIOPIUYREZA';

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpService = TestBed.get(HelpService);
    expect(service).toBeTruthy();
  });


  it('should contains a findHelpFromCode method', () => {
    const service: HelpService = TestBed.get(HelpService);
    expect(service.findHelpFromCode).toBeTruthy();
  });


  it('should contains a findHelpFromCode method which return Help', () => {
    const service: HelpService = TestBed.get(HelpService);
    const help = service.findHelpFromCode(validCode);
    expect(help).toBeTruthy();
  });


  it('should contains a findHelpFromCode method which return Help', () => {
    const service: HelpService = TestBed.get(HelpService);
    expect(service.findHelpFromCode(invalidCode)).toThrowError();
  });


  it('should contains a displayHelp method', () => {
    const service: HelpService = TestBed.get(HelpService);
    expect(service.displayHelp).toBeTruthy();
  });


  it('should contains a displayHelp method which construct corresponding alert', async () => {
    const service: HelpService = TestBed.get(HelpService);

    const help = service.findHelpFromCode(validCode);
    const alert = await service.displayHelp(validCode);

    expect(alert.title).toEqual(help.title);
    expect(alert.textContent).toEqual(help.text);
  });

});
