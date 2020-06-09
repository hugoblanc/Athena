import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpService } from './helper/http.service';


describe('GithubService', () => {
  let httpSpy;
  httpSpy = jasmine.createSpyObj('HttpService', ['get']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpService, useValue: httpSpy}]
  }));

  it('should be created', () => {
    const service: GithubService = TestBed.get(GithubService);
    expect(service).toBeTruthy();
  });
});
