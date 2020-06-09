import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Issue } from '../../models/github/github';
import { GithubService } from '../../provider/github.service';
import { IssueModalPage } from './components/issue/issue.modal';

@Component({
  selector: 'ath-construction',
  templateUrl: './construction.page.html',
  styleUrls: ['./construction.page.scss'],
})
export class ConstructionPage implements OnInit {

  issues: Issue[] = [];
  loading = true;
  issueType = 'feature';


  constructor(private githubService: GithubService, private modalController: ModalController) { }

  ngOnInit() {
    this.initIssuesByType(this.issueType);
  }

  issueTypeChanged(ev) {
    this.issueType = ev.target.value;
    this.loading = true;
    this.initIssuesByType(this.issueType);
  }


  createClap(issue: Issue) {
    this.githubService.postClapComment(issue)
      .subscribe((comment) => {
        issue.comments++;
      });
  }


  async openCreateModal() {
    const createModal = await this.initModal();
    await createModal.present();

    const valueReturned = await createModal.onDidDismiss();
    const issue = valueReturned.data;

    if (issue != null) {
      this.sendIssue(issue);
    }
  }

  private initIssuesByType(type: string) {
    this.githubService.getIssueByLabel(type)
      .subscribe((issues: Issue[]) => {
        this.issues = issues;
        this.loading = false;
      });
  }

  private async initModal() {
    const createModal = await this.modalController.create({
      component: IssueModalPage,
      componentProps: { issueType: this.issueType }
    });
    return createModal;
  }

  private sendIssue(issue: Issue) {
    this.githubService.postIssue(issue)
      .subscribe((issueCreated: Issue) => {
        this.issues.push(issueCreated);
      });
  }



}
