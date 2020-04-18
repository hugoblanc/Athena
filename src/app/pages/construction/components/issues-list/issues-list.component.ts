import { Issue } from './../../../../models/github/github';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ath-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
})
export class IssuesListComponent implements OnInit {

  @Input() issues: Issue[] =  [];

  constructor() { }

  ngOnInit() {}

}
