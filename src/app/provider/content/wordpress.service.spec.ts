import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MetaMediaService } from '../meta-media/meta-media.service';
import { WordpressService } from './wordpress.service';


describe('WordpressService', () => {

  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: httpClientSpy}, MetaMediaService]
  }));

  it('should be created', () => {
    const service: WordpressService = TestBed.get(WordpressService);
    expect(service).toBeTruthy();
  });
});
