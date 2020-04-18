import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConstructionPage } from './construction.page';

describe('ConstructionPage', () => {
  let component: ConstructionPage;
  let fixture: ComponentFixture<ConstructionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
