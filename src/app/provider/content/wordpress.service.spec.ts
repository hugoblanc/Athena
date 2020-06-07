import { TestBed } from '@angular/core/testing';
import { HttpService } from '../helper/http.service';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { WordpressService } from './wordpress.service';
describe('WordpressService', () => {
  let service: WordpressService;
  beforeEach(() => {
    const httpServiceStub = () => ({
      get: (url, arg) => ({ pipe: () => ({}) })
    });
    const metaMediaServiceStub = () => ({ currentMetaMedia: { url: {} } });
    TestBed.configureTestingModule({
      providers: [
        WordpressService,
        { provide: HttpService, useFactory: httpServiceStub },
        { provide: MetaMediaService, useFactory: metaMediaServiceStub }
      ]
    });
    service = TestBed.get(WordpressService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it(`numberByPage has default value`, () => {
    expect(service.numberByPage).toEqual(8);
  });
  describe('getNotificationCategories', () => {
    it('makes expected calls', () => {
      const httpServiceStub: HttpService = TestBed.get(HttpService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      service.getNotificationCategories();
      expect(httpServiceStub.get).toHaveBeenCalled();
    });
  });
});
