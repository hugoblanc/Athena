import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Issue } from '../../../../models/github/github';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'ath-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss'],
})
export class CreateIssueComponent implements OnInit {

  @Output() issueCreated = new EventEmitter<Issue>();
  @Input() type: 'feature' | 'bug';
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;


  issue = {} as Issue;

  constructor() { }

  ngOnInit() { }

  next() {
    this.slides.slideNext();
  }
}
