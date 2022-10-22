import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import listMetaMediaData from '../assets/data/listMetaMediaData.json';
import { storageIonicMock } from '../testing/storage-mock';
import { AppComponent } from './app.component';
import { LinkService } from './provider/helper/link.service';
import { MetaMediaService } from './provider/meta-media/meta-media.service';
import { NotificationService } from './provider/notification.service';


describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, notifServiceSpy, linkServiceSpy;
  beforeEach(async(() => {

    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);

    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    const listMetaMedia$ = { listMetaMedia$: of(listMetaMediaData) };

    notifServiceSpy = jasmine.createSpyObj('NotificationService',
      { initData: of('notificationservice mock'), initOpenNotification: of('notificationservice mock') });


    linkServiceSpy = jasmine.createSpyObj('LinkService', ['launchInAppBrowser']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NotificationService, useValue: notifServiceSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: MetaMediaService, useValue: listMetaMedia$ },
        { provide: Storage, useValue: storageIonicMock },
        { provide: LinkService, useValue: linkServiceSpy }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;

    setTimeout(() => { // liée au bug du plugin, delay forcé 500 ms
      expect(statusBarSpy.overlaysWebView).toHaveBeenCalled();
      expect(splashScreenSpy.hide).toHaveBeenCalled();
    }, 500);
  });


});
