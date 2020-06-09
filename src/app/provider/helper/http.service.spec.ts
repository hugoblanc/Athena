import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';


describe('HttpService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [Platform, HTTP, { provide: HttpClient, useValue: httpClientSpy }]
  }));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
