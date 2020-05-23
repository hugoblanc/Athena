import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
import { ContentService } from '../../../provider/content/content.service';
import { NotificationService } from '../../../provider/notification.service';
import { MediaNotifToggleComponent } from './media-notif-toggle.component';


describe('MediaNotifToggleComponent', () => {
  let component: MediaNotifToggleComponent;
  let fixture: ComponentFixture<MediaNotifToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaNotifToggleComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [NotificationService, ContentService, AlertController]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaNotifToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
