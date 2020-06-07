import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { HelpService } from './help.service';
import { StorageService } from './storage.service';


describe('HelpService', () => {
  const validCode = 'content-details';
  const invalidCode = 'AZERTUIOPIUYREZA';

  let service: HelpService;
  beforeEach(() => {
    const alertServiceStub = () => ({
      classicAlert: (title, arg, text) => ({})
    });
    const storageServiceStub = () => ({
      addToArray: (lOCAL_HELP_KEY, code) => ({ toPromise: () => ({}) }),
      get: lOCAL_HELP_KEY => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        HelpService,
        { provide: AlertService, useFactory: alertServiceStub },
        { provide: StorageService, useFactory: storageServiceStub }
      ]
    });
    service = TestBed.get(HelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should contains a findHelpFromCode method', () => {
    expect(service.findHelpFromCode).toBeDefined();
  });


  it('should contains a findHelpFromCode method which return Help', () => {
    const help = service.findHelpFromCode(validCode);
    expect(help).toBeTruthy();
  });


  it('should contains a findHelpFromCode method which return Help', () => {
    expect(service.findHelpFromCode(invalidCode)).toThrowError();
  });


  it('should contains a displayHelp method', () => {
    expect(service.displayHelp).toBeDefined();
  });


  it('should contains a displayHelp method which construct corresponding alert', async () => {

    const help = service.findHelpFromCode(validCode);
    const alert = await service.displayHelp(validCode);

    expect(alert.title).toEqual(help.title);
    expect(alert.textContent).toEqual(help.text);
  });

});
