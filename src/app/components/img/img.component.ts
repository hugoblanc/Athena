import { Component, OnInit, Input } from '@angular/core';
import { IimagedMedia } from '../../models/content/iimaged-media';

@Component({
  selector: 'ath-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {

  @Input() img: IimagedMedia;

  ratio = screen.width * 0.43;
  constructor() { }

  ngOnInit() {}

}
