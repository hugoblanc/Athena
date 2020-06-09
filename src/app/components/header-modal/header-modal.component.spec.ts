import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderModalComponent } from './header-modal.component';
import { ModalController } from '@ionic/angular';


describe('HeaderModalComponent', () => {
  let component: HeaderModalComponent;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  let fixture: ComponentFixture<HeaderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: ModalController, useValue: modalCtrlSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
