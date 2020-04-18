import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ath-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {



  @Input() loading = false;

  constructor() {

  }

  ngOnInit() { }



}
