import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Issue, Label } from '../../../../models/github/github';
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


  swiperConfig = { allowTouchMove: false };


  issue = { title: '', body: '' } as Issue;

  constructor() { }

  ngOnInit() {
    // Slides;
  }

  next() {
    this.slides.slideNext();
  }

  create() {
    this.issue.labels = [this.type as Label];
    this.issueCreated.emit(this.issue);
    this.slides.slideTo(0);
    this.issue = { title: '', body: '' };
  }
}
