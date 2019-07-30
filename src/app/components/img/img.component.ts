import { Component, OnInit, Input } from '@angular/core';
import { IContent } from '../../models/content/icontent';

@Component({
  selector: 'ath-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {

  @Input() img: IContent;

  @Input() icon?: string;

  ratio = screen.width * 0.43;
  constructor() { }

  ngOnInit() {}

}
