import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DonationComponent } from './donation.component';
import { MetaMediaService } from '../../provider/meta-media/meta-media.service';
import { AlertController } from '@ionic/angular';


describe('DonationComponent', () => {
  let component: DonationComponent;
  let fixture: ComponentFixture<DonationComponent>;

  let metaMediaSpy, alertServiceSpy;
  metaMediaSpy = jasmine.createSpyObj('MetaMediaService', ['currentMetaMedia']);
  alertServiceSpy = jasmine.createSpyObj('AlertService', ['openExternalLink']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MetaMediaService, useValue: metaMediaSpy },
        { provide: AlertController, useValue: alertServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
