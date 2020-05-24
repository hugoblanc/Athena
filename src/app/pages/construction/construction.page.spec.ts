import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ConstructionPage } from './construction.page';
import { ComponentsModule } from '../../components/components.module';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssueModule } from './components/issue/issue.module';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';


describe('ConstructionPage', () => {
  let component: ConstructionPage;
  let fixture: ComponentFixture<ConstructionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionPage, IssuesListComponent, RouterLinkDirectiveStub ],
      imports: [IonicModule.forRoot(), ComponentsModule, IssueModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
