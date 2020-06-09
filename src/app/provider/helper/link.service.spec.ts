import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LinkService } from './link.service';
describe('LinkService', () => {
  let service: LinkService;
  beforeEach(() => {
    const elementRefStub = () => ({
      nativeElement: { querySelectorAll: () => ({ forEach: () => ({}) }) }
    });
    const inAppBrowserStub = () => ({ create: (link, string, opts) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        LinkService,
        { provide: ElementRef, useFactory: elementRefStub },
        { provide: InAppBrowser, useFactory: inAppBrowserStub }
      ]
    });
    service = TestBed.get(LinkService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
