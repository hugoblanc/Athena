import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../provider/github.service';
import { Issue } from '../../models/github/github';

@Component({
  selector: 'ath-construction',
  templateUrl: './construction.page.html',
  styleUrls: ['./construction.page.scss'],
})
export class ConstructionPage implements OnInit {

  issues: Issue[] = [];
  loading = true;
  issueType = 'feature';


  constructor(private githubService: GithubService, ) { }

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
        this.issues.push(issue);
      });
  }

  issueTypeChanged(ev) {
    this.issueType = ev.target.value;
    this.initIssuesByType(this.issueType);
  }

}
