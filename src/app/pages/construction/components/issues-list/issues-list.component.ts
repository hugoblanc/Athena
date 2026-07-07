import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Issue } from './../../../../models/idea/idea';

@Component({
  selector: 'ath-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
})
export class IssuesListComponent {

  @Input() issues: Issue[] = [];
  @Output() claped = new EventEmitter<Issue>();
  @Output() downvoted = new EventEmitter<Issue>();

  clapIssue(event: any, issue: Issue) {
    event.stopPropagation();
    this.claped.emit(issue);
  }

  downvoteIssue(event: any, issue: Issue) {
    event.stopPropagation();
    this.downvoted.emit(issue);
  }
}
