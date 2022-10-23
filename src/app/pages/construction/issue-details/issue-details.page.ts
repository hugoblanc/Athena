import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../../models/github/github';
import { GithubService } from '../../../provider/github.service';

@Component({
  selector: 'ath-issue-details',
  templateUrl: './issue-details.page.html',
  styleUrls: ['./issue-details.page.scss'],
})
export class IssueDetailsPage implements OnInit {

  issue: Issue;

  constructor(private route: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const issueNumber = +params.get('issueNumber');
      this.githubService.getIssueByNumber(issueNumber)
        .subscribe((issue) => this.issue = issue);
    });
  }

}
