import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { postMock } from '../../testing/postMock';
import { MetaMediaType } from '../models/meta-media/meta-media-type.enum';
import { ContentService } from '../provider/content/content.service';
import { ContentDetailsPage } from './content-details.page';
import { StyleService } from '../provider/style.service';
import { LinkService } from '../provider/helper/link.service';
import { Storage } from '@ionic/storage';
import { storageIonicMock } from '../../testing/storage-mock';


describe('ContentDetailsPage', () => {
  let component: ContentDetailsPage;
  let fixture: ComponentFixture<ContentDetailsPage>;

  const contentServiceSpy = jasmine.createSpyObj('ContentService', { getContentById: of(postMock) });

  const metaMediaSpyMethod = jasmine.createSpyObj('MetaMediaService', { getContentById: of(postMock) });
  metaMediaSpyMethod.currentMetaMedia = { type: MetaMediaType.WORDPRESS };

  const styleServiceSpy = jasmine.createSpyObj('StyleService', { initPage: null, leavePage: null });
  const linkServiceSpy = jasmine.createSpyObj('LinkService', { enableDynamicHyperlinks: null});

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ContentDetailsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: StyleService, useValue: styleServiceSpy},
        {provide: LinkService, useValue: linkServiceSpy},
        {provide: Storage, useValue: storageIonicMock}
      ],
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

  it('should restore style settings', async () => {
    await expect(styleServiceSpy.initPage).toHaveBeenCalled();
  });
});
