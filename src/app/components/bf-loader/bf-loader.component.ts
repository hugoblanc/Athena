import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bf-loader',
  templateUrl: './bf-loader.component.html',
  styleUrls: ['./bf-loader.component.scss'],
})
export class BfLoaderComponent implements OnInit {

  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
