import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ath-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
