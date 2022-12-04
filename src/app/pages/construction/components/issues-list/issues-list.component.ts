import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from './../../../../models/github/github';

@Component({
  selector: 'ath-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
})
export class IssuesListComponent {

  @Input() issues: Issue[] = [];
  @Output() claped = new EventEmitter<Issue>();

  clapIssue(event: any, issue: Issue) {
    event.stopPropagation();
    this.claped.emit(issue);
  }
}
