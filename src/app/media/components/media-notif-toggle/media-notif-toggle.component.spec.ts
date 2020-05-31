import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
import { ContentService } from '../../../provider/content/content.service';
import { NotificationService } from '../../../provider/notification.service';
import { MediaNotifToggleComponent } from './media-notif-toggle.component';
import { of } from 'rxjs';


describe('MediaNotifToggleComponent', () => {
  let component: MediaNotifToggleComponent;
  let fixture: ComponentFixture<MediaNotifToggleComponent>;
  const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['isCategoryActivated']);
  const contentServiceSpy = jasmine.createSpyObj('ContentService',
  {getNotificationCategories: of([{ id: 1, name: 'Economie', slug: 'eco' }])}
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaNotifToggleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NotificationService, useValue: notificationServiceSpy },
        AlertController
      ]
    }).overrideComponent(MediaNotifToggleComponent, {
      set: {
        providers: [
          {provide: ContentService, useValue: contentServiceSpy}
        ]
      }
    }).compileComponents();
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
