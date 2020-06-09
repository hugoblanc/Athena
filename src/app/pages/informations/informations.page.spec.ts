import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationsPage } from './informations.page';
import { LinkService } from '../../provider/helper/link.service';


describe('InformationsPage', () => {
  let component: InformationsPage;
  let fixture: ComponentFixture<InformationsPage>;
  const linkServiceSpy = jasmine.createSpyObj('LinkService', {launchInAppBrowser: null});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: LinkService, useValue:linkServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
