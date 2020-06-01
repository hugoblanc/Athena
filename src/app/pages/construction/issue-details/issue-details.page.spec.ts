import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IssueDetailsPage } from './issue-details.page';
import { of } from 'rxjs';
import { issuesMock } from '../../../../testing/issuesMock';
import { GithubService } from '../../../provider/github.service';


describe('IssueDetailsPage', () => {
  let component: IssueDetailsPage;
  let fixture: ComponentFixture<IssueDetailsPage>;
  const mockGithubService = {getIssueByNumber: () => of(issuesMock[0])};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDetailsPage ],
      providers: [{provide: GithubService, useValue: mockGithubService}],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
