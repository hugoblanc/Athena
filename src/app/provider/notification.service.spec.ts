import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MetaMedia } from '../models/meta-media/meta-media';
import { StorageService } from './helper/storage.service';
import { MetaMediaService } from './meta-media/meta-media.service';
import { NotificationService } from './notification.service';
describe('NotificationService', () => {
  let service: NotificationService;
  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: arg => ({}) });
    const firebaseXStub = () => ({
      getToken: () => ({ then: () => ({}) }),
      onMessageReceived: () => ({ subscribe: f => f({}) }),
      grantPermission: () => ({}),
      subscribe: f => f({}),
      unsubscribe: topic => ({})
    });
    const metaMediaStub = () => ({ notification: {}, key: {} });
    const storageServiceStub = () => ({
      get: nOTIFICATIONS_TOPICS_CATEGORIES => ({
        subscribe: f => f({}),
        pipe: () => ({})
      }),
      set: (
        nOTIFICATIONS_TOPICS_CATEGORIES,
        notificationTopicsCategories
      ) => ({}),
      editObject: (nOTIFICATIONS_TOPICS, topic, arg) => ({})
    });
    const metaMediaServiceStub = () => ({
      listMetaMedia: {},
      findAndSetMediaByKey: topic => ({ notification: {} })
    });
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: Router, useFactory: routerStub },
        { provide: MetaMedia, useFactory: metaMediaStub },
        { provide: StorageService, useFactory: storageServiceStub },
        { provide: MetaMediaService, useFactory: metaMediaServiceStub }
      ]
    });
    service = TestBed.get(NotificationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('initOpenNotification', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      service.initOpenNotification();
    });
  });
});
