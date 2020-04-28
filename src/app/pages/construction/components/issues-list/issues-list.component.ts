import { Issue } from './../../../../models/github/github';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ath-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
})
export class IssuesListComponent implements OnInit {

  @Input() issues: Issue[] = [];
  @Output() claped = new EventEmitter<Issue>();

  constructor() { }

  ngOnInit() { }

  clapIssue(event, issue: Issue) {
    event.stopPropagation();
    this.claped.emit(issue);
  }

}
