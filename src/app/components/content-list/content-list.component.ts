import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ath-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
})
export class ContentListComponent implements OnInit {

  @Input() contents: any[];
  @Input() mediaId: number;

  constructor() { }

  ngOnInit() {}

}
