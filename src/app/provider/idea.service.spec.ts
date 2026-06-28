import { TestBed } from '@angular/core/testing';
import { IdeaService } from './idea.service';
import { HttpService } from './helper/http.service';


describe('IdeaService', () => {
  let httpSpy;
  httpSpy = jasmine.createSpyObj('HttpService', ['get']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpService, useValue: httpSpy}]
  }));

  it('should be created', () => {
    const service: IdeaService = TestBed.get(IdeaService);
    expect(service).toBeTruthy();
  });
});
