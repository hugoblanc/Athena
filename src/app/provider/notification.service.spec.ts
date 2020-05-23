import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { StorageService } from './helper/storage.service';
import { MetaMediaService } from './meta-media/meta-media.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Router } from '@angular/router';


describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [StorageService, MetaMediaService, FirebaseX, Router]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
