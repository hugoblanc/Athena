import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IssueDetailsPage } from './issue-details.page';
import { of } from 'rxjs';
import { ideasMock } from '../../../../testing/ideasMock';
import { IdeaService } from '../../../provider/idea.service';


describe('IssueDetailsPage', () => {
  let component: IssueDetailsPage;
  let fixture: ComponentFixture<IssueDetailsPage>;
  const mockIdeaService = {getIssueByNumber: () => of(ideasMock[0])};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDetailsPage ],
      providers: [{provide: IdeaService, useValue: mockIdeaService}],
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
