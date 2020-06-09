import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPage } from './media.page';
import { postMock } from '../../testing/postMock';
import { of } from 'rxjs';
import { Post } from '../models/content/wordpress/post';
import { ContentService } from '../provider/content/content.service';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';


describe('MediaPage', () => {
  let component: MediaPage;
  let fixture: ComponentFixture<MediaPage>;
  const contentServiceSpy = jasmine.createSpyObj('ContentService', { getContents: of([new Post(postMock)]) });

  const metaMediaMock = {currentMetaMedia: {}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: MetaMediaService, useValue: metaMediaMock}],
      imports: [RouterTestingModule]
    }).overrideComponent(MediaPage, {
      set: {
        providers: [
          {
            provide: ContentService,
            useValue: contentServiceSpy
          }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
