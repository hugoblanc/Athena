import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../provider/github.service';
import { Issue } from '../../models/github/github';
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

  initIssuesByType(type: string) {
    this.loading = true;
    this.githubService.getIssueByLabel(type)
      .subscribe((issues: Issue[]) => {
        this.issues = issues;
        this.loading = false;
      });
  }

  sendIssue(issue: Issue) {
    this.githubService.postIssue(issue)
      .subscribe((issueCreated: Issue) => {
        this.issues.push(issueCreated);
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


  private async initModal() {
    const createModal = await this.modalController.create({
      component: IssueModalPage,
      componentProps: { issueType: this.issueType }
    });
    return createModal;
  }

  issueTypeChanged(ev) {
    this.issueType = ev.target.value;
    this.initIssuesByType(this.issueType);
  }

}
