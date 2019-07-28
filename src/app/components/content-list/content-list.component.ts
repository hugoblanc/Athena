import { Component, OnInit, Input, Injector } from '@angular/core';

@Component({
  selector: 'ath-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
})
export class ContentListComponent implements OnInit {

  @Input() contents: any[];

  constructor(private injector: Injector) { }

  ngOnInit() {}

}
