import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ath-loader',
  templateUrl: './ath-loader.component.html',
  styleUrls: ['./ath-loader.component.scss'],
})
export class AthLoaderComponent implements OnInit {

  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
