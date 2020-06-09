import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { StorageService } from './storage.service';
import { storageIonicMock } from '../../../testing/storage-mock';
describe('StorageService', () => {
  let service: StorageService;
  beforeEach(() => {
    const storageStub = storageIonicMock;
    TestBed.configureTestingModule({
      providers: [StorageService, { provide: Storage, useValue: storageStub }]
    });
    service = TestBed.get(StorageService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it(`COUNT_KEY has default value`, () => {
    expect(StorageService.COUNT_KEY).toEqual(`COUNT_KEY`);
  });
  it(`INSTALLATION_DATE has default value`, () => {
    expect(StorageService.INSTALLATION_DATE).toEqual(`INSTALLATION_DATE`);
  });
  describe('initFirstLaunch', () => {
    it('makes expected calls', () => {
      spyOn(service, 'set').and.callThrough();
      service.initFirstLaunch();
      expect(service.set).toHaveBeenCalled();
    });
  });
  describe('isFirstLaunch', () => {
    it('makes expected calls', () => {
      spyOn(service, 'get').and.callThrough();
      service.isFirstLaunch();
      expect(service.get).toHaveBeenCalled();
    });
  });
});
