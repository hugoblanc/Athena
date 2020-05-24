import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCardComponent } from './video-card.component';
import { ItemVideo } from '../../../models/content/youtube/item-video';
import { itemVideoMock } from '../../../../testing/itemVideoMock';


describe('VideoCardComponent', () => {
  let component: VideoCardComponent;
  let fixture: ComponentFixture<VideoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCardComponent);
    component = fixture.componentInstance;
    component.video = new ItemVideo(itemVideoMock as any);
    component.metaMediaKey = 'osonscauser';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
