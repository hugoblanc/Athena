import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../provider/github.service';
import { Observable } from 'rxjs';
import { Issue } from '../../../models/github/github';

@Component({
  selector: 'ath-issue-details',
  templateUrl: './issue-details.page.html',
  styleUrls: ['./issue-details.page.scss'],
})
export class IssueDetailsPage implements OnInit {

  issue: Issue;

  constructor(private route: ActivatedRoute, private githuService: GithubService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const issueNumber = +params.get('issueNumber');
      this.githuService.getIssueByNumber(issueNumber)
        .subscribe((issue) => this.issue = issue);
    });
  }

}
