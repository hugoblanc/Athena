import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import listMetaMediaData from '../../../assets/data/listMetaMediaData.json';
import { of } from 'rxjs';
import { MetaMediaService } from '../../provider/meta-media/meta-media.service';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const metaMediaMock = { listMetaMedia$: of(listMetaMediaData) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: MetaMediaService, useValue: metaMediaMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
