import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Issue } from '../../models/github/github';
import { GithubService } from '../../provider/github.service';
import { IssueModalPage } from './components/issue/issue.modal';
import { StorageService } from '../../provider/helper/storage.service';
import { tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'ath-construction',
  templateUrl: './construction.page.html',
  styleUrls: ['./construction.page.scss'],
})
export class ConstructionPage implements OnInit {

  issues: Issue[] = [];
  loading = true;
  issueType = 'feature';


  constructor(
    private readonly githubService: GithubService,
    private readonly modalController: ModalController,
    private readonly storage: StorageService
  ) { }

  ngOnInit() {
    this.initIssuesByType(this.issueType);
  }

  issueTypeChanged(ev: any) {
    this.issueType = ev.target.value;
    this.loading = true;
    this.initIssuesByType(this.issueType);
  }


  clap(issue: Issue) {
    this.githubService.postClapComment(issue)
      .pipe(
        mergeMap(() => this.storage.addToArray(StorageService.CLAPPED_ISSUE, issue.id))
      )
      .subscribe(() => {
        issue.comments++;
        issue.hasBeenClapped = true;
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
    this.githubService.getIssuesByLabel(type)
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
