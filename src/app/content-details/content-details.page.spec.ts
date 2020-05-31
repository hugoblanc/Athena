import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentDetailsPage } from './content-details.page';
import { postMock } from '../../testing/postMock';
import { ContentService } from '../provider/content/content.service';
import { of } from 'rxjs';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';
import { MetaMediaType } from '../models/meta-media/meta-media-type.enum';
import { RouterTestingModule } from '@angular/router/testing';


describe('ContentDetailsPage', () => {
  let component: ContentDetailsPage;
  let fixture: ComponentFixture<ContentDetailsPage>;

  const contentServiceSpy = jasmine.createSpyObj('ContentService', { getContentById: of(postMock) });

  const metaMediaSpyMethod = jasmine.createSpyObj('MetaMediaService', { getContentById: of(postMock) });
  metaMediaSpyMethod.currentMetaMedia = { type: MetaMediaType.WORDPRESS };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ContentDetailsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule]
    }).overrideComponent(ContentDetailsPage, {
      set: {
        providers: [
          {provide: ContentService, useValue: contentServiceSpy}
        ]
      }
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
