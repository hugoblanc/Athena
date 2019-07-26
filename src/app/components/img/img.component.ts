import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ath-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {

  @Input() img: any;

  ratio = screen.width * 0.43;
  constructor() { }

  ngOnInit() {}

}
