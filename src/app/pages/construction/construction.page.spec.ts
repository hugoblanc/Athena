import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ConstructionPage } from './construction.page';
import { ComponentsModule } from '../../components/components.module';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssueModule } from './components/issue/issue.module';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';
import { of } from 'rxjs';
import { IdeaService } from '../../provider/idea.service';
import { ideasMock } from '../../../testing/ideasMock';


describe('ConstructionPage', () => {
  let component: ConstructionPage;
  let fixture: ComponentFixture<ConstructionPage>;
  const mockIdeaService = {getIssueByLabel: () => of(ideasMock)};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionPage, IssuesListComponent, RouterLinkDirectiveStub ],
      providers: [ ModalController, {provide: IdeaService, useValue: mockIdeaService}],
      imports: [IonicModule.forRoot(), ComponentsModule, IssueModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
