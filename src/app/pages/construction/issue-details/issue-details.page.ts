import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../../../models/idea/idea';
import { IdeaService } from '../../../provider/idea.service';

@Component({
  selector: 'ath-issue-details',
  templateUrl: './issue-details.page.html',
  styleUrls: ['./issue-details.page.scss'],
})
export class IssueDetailsPage implements OnInit {

  issue!: Issue;

  constructor(private route: ActivatedRoute, private ideaService: IdeaService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const issueNumber = +(params.get('issueNumber') ?? 0);
      this.ideaService.getIssueByNumber(issueNumber)
        .subscribe((issue) => this.issue = issue);
    });
  }

}
