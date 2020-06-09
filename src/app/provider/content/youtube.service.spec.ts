import { TestBed } from '@angular/core/testing';

import { HttpService } from '../helper/http.service';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeService;
  beforeEach(() => {
    const httpServiceStub = () => ({ get: url => ({ pipe: () => ({}) }) });
    const metaMediaServiceStub = () => ({ currentMetaMedia: { key: {} } });
    TestBed.configureTestingModule({
      providers: [
        YoutubeService,
        { provide: HttpService, useFactory: httpServiceStub },
        { provide: MetaMediaService, useFactory: metaMediaServiceStub }
      ]
    });
    service = TestBed.get(YoutubeService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getContents', () => {
    it('makes expected calls', () => {
      const httpServiceStub: HttpService = TestBed.get(HttpService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      service.getContents();
      expect(httpServiceStub.get).toHaveBeenCalled();
    });
  });
  describe('loadMore', () => {
    it('makes expected calls', () => {
      const httpServiceStub: HttpService = TestBed.get(HttpService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      service.loadMore();
      expect(httpServiceStub.get).toHaveBeenCalled();
    });
  });
});
