import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentDetailsPage } from './content-details.page';
import { postMock } from '../../testing/postMock';
import { ContentService } from '../provider/content/content.service';
import { of } from 'rxjs';


describe('ContentDetailsPage', () => {
  let component: ContentDetailsPage;
  let fixture: ComponentFixture<ContentDetailsPage>;

  const contentServiceSpy = jasmine.createSpyObj('ContentService', {getContentById:  of(postMock)});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: ContentService, useValue: contentServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
