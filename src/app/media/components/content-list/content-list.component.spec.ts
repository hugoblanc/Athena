import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentListComponent } from './content-list.component';
import { MetaMediaService } from '../../../provider/meta-media/meta-media.service';


describe('ContentListComponent', () => {
  let component: ContentListComponent;
  let fixture: ComponentFixture<ContentListComponent>;

  const metaMediaMock = {currentMetaMedia: {key: 'lvsl'}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: MetaMediaService, useValue: metaMediaMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
