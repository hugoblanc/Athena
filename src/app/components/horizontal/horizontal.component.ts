import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ath-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})
export class HorizontalComponent implements OnInit {

  @Input() title: string;

  width: number;
  constructor() { }

  ngOnInit() {
    this.width = screen.width;
  }

}
